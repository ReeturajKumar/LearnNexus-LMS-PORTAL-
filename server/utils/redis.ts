import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

let redis: Redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    tls: {}, // 👈 REQUIRED for Upstash
    maxRetriesPerRequest: null, // avoids retry-limit error
    reconnectOnError: () => true, // auto reconnect
  });

  redis.on("connect", () => {
    console.log("✅ Redis connected");
  });

  redis.on("error", (err) => {
    console.error("❌ Redis connection error:", err.message);
  });
} else {
  throw new Error("❌ Redis connection failed: REDIS_URL missing in .env");
}

export { redis };
