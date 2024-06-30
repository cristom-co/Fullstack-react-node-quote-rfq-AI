import app from "./app";
import sequelize from "./connection";

const PORT = process.env.PORT || 3000;

sequelize
//   .sync({ force: true })
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
