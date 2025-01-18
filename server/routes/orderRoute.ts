import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middelware/auth';
import { createOrder, getAllOrder } from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/create-order', isAuthenticated, createOrder);
orderRouter.get('/get-orders', isAuthenticated,authorizeRoles("admin"), getAllOrder);

export default orderRouter;