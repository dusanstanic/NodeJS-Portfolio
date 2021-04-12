const db = require("../util/database");
const path = require("path");

const technologyService = require("./technology.js");

exports.fetchAll = () => {
  return db
    .execute(`select * from project;`)
    .then(async (result) => {
      const projects = result[0];

      for (project of projects) {
        project.technologies = await this.fetchTechnologyByProjectId(
          project.id
        );

        project.images = await this.fetchImagesByProjectId(project.id);
      }

      return projects;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchTechnologyByProjectId = (id) => {
  return db
    .execute(
      `
      select t.id, t.name
      from project as p
      join project_technology as pt on p.id = pt.project_id
      join technology as t on pt.technology_id = t.id
      where p.id = ${id}; 
    `
    )
    .then(async (result) => {
      const technologies = result[0];

      return technologies;
    })
    .catch((err) => {
      console.err(err);
    });
};

exports.fetchImagesByProjectId = (id) => {
  return db
    .execute(
      `
      select i.name
      from project as p
      join image as i on p.id = i.project_id
      where p.id = ${id}; 
    `
    )
    .then(async (result) => {
      const images = result[0];

      for (image of images) {
        //     console.log(path.join(__dirname, "public"));
        image.name = `images/${image.name}`;
      }

      console.log(image);

      return images;
    })
    .catch((err) => {
      console.log(err);
    });
};
