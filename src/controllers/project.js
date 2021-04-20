const projectService = require("../services/projects");

exports.fetchAll = async (req, res, next) => {
  const projects = await projectService.fetchAll();
  res.json(projects);
};
