import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middelware/auth';
import { createOrder, getAllOrder, newPayment, sendStripePublishableKey } from '../controllers/orderController';
import { updateAccessToken } from '../controllers/userController';

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.get("/get-orders", isAuthenticated,authorizeRoles("admin"), getAllOrder);

orderRouter.get("/payment/stripepublishablekey",sendStripePublishableKey);

orderRouter.post("/payment",isAuthenticated,newPayment)

export default orderRouter;