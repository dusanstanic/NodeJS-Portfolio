const db = require("../util/database");

exports.fetchById = (id) => {
  return db
    .execute("select * from technology where technology.id = " + id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
    });
};
