const projectService = require("../services/projects");

const projectss = require("../project.json");

exports.fetchAll = async (req, res, next) => {
  const projects = await projectService.fetchAll();
  res.json(projectss);
};
// "start": "nodemon src/app.js",
