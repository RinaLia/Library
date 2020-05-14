const connection = require("../config/db");

module.exports = {
  getAuthor: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM authors", function (error, result) {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  postAuthor: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO authors SET ?", setData, function (
        error,
        result
      ) {
        if (!error) {
          const newData = {
            id: result.insertId,
            ...setData,
          };
          resolve(newData);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  putAuthor: (setData, id) => {
    return new Promise(function (resolve, reject) {
      connection.query(
        "UPDATE authors SET ? WHERE id = ?",
        [setData, id],
        function (error, result) {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  deleteAuthor: (id) => {
    return new Promise(function (resolve, reject) {
      connection.query("DELETE FROM authors WHERE id = ?", id, function (
        error,
        result
      ) {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
