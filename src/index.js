const app = require("./app");
const { serverConfig } = require("./config");
const { db } = require("./sequelize");

db.sync()
  .then(() => {
    console.log("Database connected");
    app.listen(serverConfig.port, () => {
      console.log(`Server is running on port ${serverConfig.port}`);
    });
  })
  .catch((err) => {
    console.log("server error:", err);
    process.exit(1);
  });
