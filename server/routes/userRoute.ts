import express from 'express';
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from '../controllers/userController';
import { authorizeRoles, isAuthenticated } from '../middelware/auth';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout',updateAccessToken, isAuthenticated, logoutUser);
userRouter.get('/refresh',updateAccessToken);
userRouter.get('/me',updateAccessToken,  isAuthenticated, getUserInfo);
userRouter.post('/social-auth',socialAuth);
userRouter.put('/update-user-info',isAuthenticated, updateUserInfo);
userRouter.put('/update-user-password',isAuthenticated, updatePassword);
userRouter.put('/update-user-avatar', isAuthenticated, updateProfilePicture);

userRouter.get('/get-users',updateAccessToken, isAuthenticated,authorizeRoles("admin"), getAllUsers);

userRouter.put('/update-user-role',updateAccessToken,isAuthenticated,authorizeRoles("admin"), updateUserRole);


userRouter.delete('/delete-user/:id',updateAccessToken, isAuthenticated,authorizeRoles("admin"), deleteUser);
export default userRouter;