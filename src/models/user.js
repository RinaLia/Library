const connection = require("../config/db");

module.exports = {
  postSignUp: function (setData) {
    return new Promise(function (resolve, reject) {
      connection.query("INSERT INTO users SET ?", setData, function (
        error,
        result
      ) {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  postSignIn: function (getData) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM users WHERE email=?",
        [getData.email],
        function (error, result) {
          if (!error) {
            resolve(result[0]);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
