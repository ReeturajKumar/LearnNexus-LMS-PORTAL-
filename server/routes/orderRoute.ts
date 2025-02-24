import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middelware/auth';
import { createOrder, getAllOrder } from '../controllers/orderController';
import { updateAccessToken } from '../controllers/userController';

const orderRouter = express.Router();

orderRouter.post('/create-order',updateAccessToken, isAuthenticated, createOrder);
orderRouter.get('/get-orders',updateAccessToken, isAuthenticated,authorizeRoles("admin"), getAllOrder);

export default orderRouter;