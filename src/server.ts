import { Server } from "http";
import mongoose from "mongoose";
console.log("1️⃣ Before importing app");

import app from "./app.js";

console.log("2️⃣ After importing app");
import { envVars } from "./app/config/env.js";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin.js";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!!");

    await seedSuperAdmin();

    server = app.listen(envVars.PORT, () => {
      console.log(`server is listening to port ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("🔥 SERVER START ERROR:", error);
  }
};

startServer();
