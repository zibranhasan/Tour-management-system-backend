import { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { envVars } from "./app/config/env.js";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`server is listening to port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

//unhandledRejection
process.on("unhandledRejection", (err) => {
  console.log("unhadled rejection detected ..... server shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//uncaught rejection error
// process.on("uncaught Rejection", (err) => {
//   console.log("uncaught rejection detected ..... server shutting down...", err);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// Promise.reject(new Error("I forget to catch this promise "));
// throw new Error("I forgot to handle this local error");

//sigterm error
// process.on("SUGTERM", (err) => {
//   console.log("SIGTERM SIGNAL RECEIVED ..... server shutting down...", err);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });
