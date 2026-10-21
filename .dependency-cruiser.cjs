/** Reglas de arquitectura (fitness functions) del proyecto. */
module.exports = {
  forbidden: [
    {
      name: "dominio-sin-infraestructura",
      severity: "error",
      comment: "El dominio no puede depender de infraestructura (base de datos, HTTP).",
      from: { path: "^src/domain" },
      to: { path: "^src/infra" },
    },
    {
      name: "dominio-sin-aplicacion",
      severity: "error",
      comment: "El dominio no conoce los casos de uso.",
      from: { path: "^src/domain" },
      to: { path: "^src/application" },
    },
    {
      name: "aplicacion-sin-infraestructura",
      severity: "error",
      comment: "Los casos de uso hablan con puertos (interfaces del dominio), no con la base de datos.",
      from: { path: "^src/application" },
      to: { path: "^src/infra" },
    },
    {
      name: "sin-dependencias-circulares",
      severity: "error",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
  },
};
