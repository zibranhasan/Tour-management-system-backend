import { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { envVars } from "./app/config/env.js";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin.js";
import { connectRedis } from "./app/config/redis.config.js";
let server;
const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log("Connected to DB!!");
        await seedSuperAdmin();
        await connectRedis();
        server = app.listen(envVars.PORT, () => {
            console.log(`server is listening to port ${envVars.PORT}`);
        });
    }
    catch (error) {
        console.error("🔥 SERVER START ERROR:", error);
    }
};
startServer();
//# sourceMappingURL=server.js.map