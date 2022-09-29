import db from "./models";
import server from "./server";

const PORT = 8080;
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
