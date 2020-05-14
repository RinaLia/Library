const connection = require('../config/db')

module.exports = {
  getAuthor: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM genres', function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  postGenres: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO genres SET ?', setData, function (error, result) {
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
  putGenres: (setData, id) => {
    return new Promise(function (resolve, reject) {
      connection.query('UPDATE genres SET ? WHERE id = ?', [setData, id], function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteGenres: (id) => {
    return new Promise(function (resolve, reject) {
      connection.query('DELETE FROM genres WHERE id = ?', id, function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }

}