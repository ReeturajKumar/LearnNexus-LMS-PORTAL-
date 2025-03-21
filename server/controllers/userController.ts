require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/userModel";
import ErroHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middelware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMails";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import { getAllUsersService, getUserById, updateUserRoleService } from "../Services/userService";
import cloudinary from 'cloudinary';

//register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErroHandler("Email already exist", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your Account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email : ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErroHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);


// genrating activation token
interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

//activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErroHandler("Invalid activation code", 400));
      }

      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });

      if (existUser) {
        return next(new ErroHandler("Email already exist", 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);

// Login User
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErroHandler("Please enter email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErroHandler("Invalid email or password", 400));
      }

      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErroHandler("Invalid email or password", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);

//logout user
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = req.user?._id || "";
      redis.del(userId);
      res.status(200).json({
        success: true,
        message: "Logged out Successfully",
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);

//update access token
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      const message = "Could not refresh token";
      if (!decoded) {
        return next(new ErroHandler(message, 400));
      }
      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(new ErroHandler('Please login to access this resource', 400));
      }
      const user = JSON.parse(session);
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);


      await redis.set(user._id, JSON.stringify(user), "EX",604800)

      



     next();
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);

//get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErroHandler("User not authenticated", 401));
    }
    try {
      await getUserById(userId, res);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

// social auth
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      let user = await userModel.findOne({ email });

      // If user does not exist, create a new one
      if (!user) {
        user = await userModel.create({ email, name, avatar });
      }

      // If user was deleted or some issue occurs, return an error
      if (!user) {
        return res.status(404).json({ message: "User not found. Please sign up again." });
      }

      // Send token and login user
      sendToken(user, 200, res);
    } catch (error: any) {
      console.error("Social Auth Error:", error);
      return next(new ErroHandler(error.message || "Authentication failed", 400));
    }
  }
);


//update user info

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name} = req.body as IUpdateUserInfo;
    const userId = req.user?._id as string;

    const user = await userModel.findById(userId);
    if (!user) {
      return next(new ErroHandler("User not found", 404));
    }

    if (name) {
      user.name = name;
    }

    await user.save();
    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  }
);


// update user password
interface IUpdatePassword {
  oldPassword: string,
  newPassword: string,
}

export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (!oldPassword || !newPassword) {
        return next(new ErroHandler("Please enter old and new password", 400));
      }

      const user = await userModel.findById(req.user?._id).select("+password");

      if (!user || !user.password) {
        return next(new ErroHandler("Invalid user", 400));
      }

      const isPasswordMatch = await user.comparePassword(oldPassword);


      if (!isPasswordMatch) {
        return next(new ErroHandler("Invalid old password", 400));
      }

      user.password = newPassword;
      await user.save();

      await redis.set(req.user?._id as string, JSON.stringify(user));

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);


//update user profile picture
interface IUpdateProfilePicture{
  avatar: string,
}
export const updateProfilePicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {avatar} = req.body;

      const userId = req.user?._id;

      const user = await userModel.findById(userId);

      if(avatar && user){
        if(user?.avatar?.public_id){
          // first delete the old image
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar={
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          }
        } else{
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar={
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          }
        }
      }

      await user?.save();
      await redis.set(userId as string,JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      })
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
})



// get all users -- admin
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
)


// update user role -- admin
export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.body;
    updateUserRoleService( res,id, role);
  } catch (error: any) {
    return next(new ErroHandler(error.message, 400));
  }
})


// Delete user -- admin
export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErroHandler("User not found", 404));
      }

      await user.deleteOne({id});
      await redis.del(id);

      res.status(200).json({
        success: true,  
        message: "User deleted successfully",  
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
)