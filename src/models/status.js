const connection = require('../config/db')


module.exports = {
  getStatus: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM status', function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  postStatus: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO status SET ?', setData, function (error, result) {
        if (!error) {
          const newData = {
            id: result.insertId,
            ...setData
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }

      })
    })
  },
  putStatus: (setData, id) => {
    return new Promise(function (resolve, reject) {
      connection.query('UPDATE status SET ? WHERE id = ?', [setData, id], function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteStatus: (id) => {
    return new Promise(function (resolve, reject) {
      connection.query('DELETE FROM status WHERE id = ?', id, function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}