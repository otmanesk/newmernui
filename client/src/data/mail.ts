const Resourcer = require("redux-rest-resource");

export const { types, actions, rootReducer } = Resourcer.createResource({
  name: "mail",
  url: `http://5c94b106498269001487f0c7.mockapi.io/projects`
});
