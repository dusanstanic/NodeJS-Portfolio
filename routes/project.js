const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project");

router.get("/project", projectController.fetchAll);

module.exports = router;
