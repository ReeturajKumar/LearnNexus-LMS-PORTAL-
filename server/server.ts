import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
import http from 'http';
import connectDB from './utils/db';
import { initSocketServer } from "./socketServer";
require("dotenv").config();

const server = http.createServer(app);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Initialize socket server
initSocketServer(server);

// Set the port, fallback to 5000 if not provided
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
