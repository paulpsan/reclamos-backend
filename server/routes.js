"use strict";

export default app => {
  app.use("/api/solicitudes", require("./routes/solicitud"));
  app.use("/api/tipologias", require("./routes/tipologia"));

  app.use("/api/autenticacion", require("./routes/autenticacion"));
  app.use("/api/usuarios", require("./routes/usuario"));
  app.use("/api/unidades-educativas", require("./routes/ue"));
  app.use("/api/reclamos", require("./routes/reclamo"));

  app.use("/api/interacciones", require("./routes/interaccion"));
  app.use("/api/instancias", require("./routes/instancia"));
};
