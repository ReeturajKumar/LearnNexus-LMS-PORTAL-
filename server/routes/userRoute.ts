import express from 'express';
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth,  updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from '../controllers/userController';
import { authorizeRoles, isAuthenticated } from '../middelware/auth';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, logoutUser);
userRouter.get('/refresh',);
userRouter.get('/me',  isAuthenticated, getUserInfo);
userRouter.post('/social-auth',socialAuth);
userRouter.put('/update-user-info',isAuthenticated, updateUserInfo);
userRouter.put('/update-user-password',isAuthenticated, updatePassword);
userRouter.put('/update-user-avatar', isAuthenticated, updateProfilePicture);

userRouter.get('/get-users', isAuthenticated,authorizeRoles("admin"), getAllUsers);

userRouter.put('/update-user-role',isAuthenticated,authorizeRoles("admin"), updateUserRole);


userRouter.delete('/delete-user/:id', isAuthenticated,authorizeRoles("admin"), deleteUser);
export default userRouter;