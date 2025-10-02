import express from "express";
import userRouter from "./routers/user.router.js";
import cancionRouter from "./routers/cancion.router.js";
import escuchaRouter from "./routers/escucha.router.js";

const app = express();
app.use(express.json());

// montar routers
app.use("/api", userRouter);
app.use("/api", cancionRouter);
app.use("/api", escuchaRouter);

app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000");
});
