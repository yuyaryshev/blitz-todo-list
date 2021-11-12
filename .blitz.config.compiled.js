// blitz.config.js
var {sessionMiddleware, simpleRolesIsAuthorized} = require("blitz");
module.exports = {
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized
    })
  ]
};
