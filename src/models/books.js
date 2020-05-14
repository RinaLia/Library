const connection = require("../config/db");

module.exports = {
  getBooks: (sort, field, limit = 10, offset = 0, title) => {
    let total = `SELECT COUNT(id) as total FROM books `;
    let sql = `SELECT * FROM books`;

    if (title) {
      sql += ` WHERE title LIKE '%${title}%'`;
      total += ` WHERE title LIKE '%${title}%'`;
    }

    if (sort && field) {
      sql += ` ORDER BY ${field} ${sort}`;
    }

    sql += ` LIMIT ${Number(limit) || 10} OFFSET ${Number(offset) || 0};`;

    return new Promise((resolve, reject) => {
      connection.query(total, (error, data) => {
        const page = offset / limit + 1;
        const totalData = data.map((i) => i.total)[0];
        const hasNext = totalData - page * limit > 0 ? true : false;
        const pagination = {
          page,
          hasNext,
          total: totalData,
        };

        connection.query(sql, function (error, result) {
          if (!error) {
            resolve({ result, pagination });
          } else {
            reject(new Error(error));
          }
        });
      });
    });
  },
  postBooks: function (setData) {
    return new Promise(function (resolve, reject) {
      connection.query("INSERT INTO books SET ?", setData, function (
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
  putBooks: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE books SET ? WHERE id = ?",
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
  deleteBooks: (id) => {
    return new Promise(function (resolve, reject) {
      connection.query("DELETE FROM books WHERE id = ?", id, function (
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
  getSearchBooks: function (name) {
    console.log(name);
    return new Promise(function (resolve, reject) {
      connection.query(
        `SELECT * from books WHERE title LIKE '%${name}%'`,
        function (error, result) {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  //Get Sort Data Book
  // getSortBook: function (name) {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `SELECT booksid, books.title, books.description, books.image,
  //       genres.name as genres, authors.name as authors, books.status,
  //       books.created_at, books.updated_at FROM books`
  //     );
  //   });
  // },

  // getSortBook: function (limit, startIndex, column, sort) {
  //   return new Promise(function (resolve, reject) {
  //     if (sort == "asc") {
  //       connection.query(
  //         `SELECT books.id, books.title, books.description, books.image,
  //         genres.name as genres, authors.name as authors, books.status,
  //         books.created_at, books.updated_at FROM books LEFT JOIN authors
  //         ON authors.id=books.author_id INNER JOIN genres ON genres.id=books.genre_id ORDER BY ?? asc  LIMIT ? OFFSET ?"`,
  //         [column, limit, startIndex],
  //         function (error, result) {
  //           //id, title, description, image, ied_genre, id_author, id_status, created_at, updated_at
  //           if (!error) {
  //             resolve(result);
  //           } else {
  //             reject(new Error(error));
  //           }
  //         }
  //       );
  //     } else {
  //       connection.query(
  //         `SELECT books.id, books.title, books.description,
  //                 books.image, genres.name as genre, authors.name as author,
  //                 books.status, books.created_at, books.updated_at
  //                 FROM books
  //                 LEFT JOIN authors ON authors.id=books.author_id
  //                 INNER JOIN genres ON genres.id=books.genre_id
  //                 ORDER BY ?? desc
  //                 LIMIT ? OFFSET ?`,
  //         [column, limit, startIndex],
  //         function (error, result) {
  //           if (!error) {
  //             resolve(result);
  //           } else {
  //             reject(new Error(error));
  //           }
  //         }
  //       );
  //     }
  //   });
  // },

  //Get Sort Data Pagination
  // getBooksPagination: function (limit, startIndex) {
  //     return new Promise(function (resolve, reject) {
  //         connection.query('SELECT books.id, books.title, books.description, books.image, genre.genre as genre, author.genre as author, books.status, books.created_at, books.updated_at FROM books LEFT JOIN author ON author.id=books.author_id INNER JOIN genre ON genre.id=books.genre_id ORDER BY ?? LIMIT ? OFFSET ?', [limit, startIndex], function (error, result) {
  //             if (!error) {
  //                 resolve(result)
  //             } else {
  //                 reject(new Error(error))
  //             }
  //         })
  //     })
  // },

  // getCount: function () {
  //     return new Promise(function (resolve, reject) {
  //         connection.query('SELECT COUNT(*) as count from books', function (error, result) {
  //             if (!error) {
  //                 resolve(result[0].count)
  //             } else {
  //                 reject(new Error(error))
  //             }
  //         })
  //     })
  // },
  // }
};
