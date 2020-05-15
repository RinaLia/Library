const bookModels = require("../models/books");
const multer = require("multer");
const config = require("../config/upload");
const upload = config.single("image");

module.exports = {
  getBooks: async (request, response) => {
    try {
      // const sort = request.query.sort;
      // const field = request.query.field;
      // const offset = request.query.offset;
      // const limit = request.query.limit;

      const { sort, field, limit, offset, title } = request.query;

      const db = await bookModels.getBooks(sort, field, limit, offset, title);
      return response.status(200).json({
        status: 200,
        message: "list all books data",
        data: db.result,
        pagination: db.pagination,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ status: 500, message: error, data: [] });
    }
  },
  postBooks: async function (request, response) {
    upload(request, response, async function (error) {
      if (error instanceof multer.MulterError) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      } else if (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      }

      try {
        if (!request.file) {
          return response.status(500).json({
            status: 500,
            message: "Please choosing files...",
            data: [],
          });
        } else {
          let setData = request.body;
          setData.image = `${process.env.URL}/image/${
            new Date().toISOString() + request.file.filename
          }`;
          console.log(setData);
          const result = await bookModels.postBooks(setData);
          return response
            .status(200)
            .json({ status: 200, message: "success", data: result });
        }
      } catch (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      }
    });
  },
  putBooks: async function (request, response) {
    upload(request, response, async function (error) {
      try {
        const setData = request.body;

        //const {title, description, image, author_id,
        //genre_id,status_id,created_at,updated_at} = request.id

        const id = request.params.id;
        //const{id} = request.params.id
        const result = await bookModels.putBooks(setData, id);
        return response
          .status(200)
          .json({ status: 200, message: "update books data", data: result });
      } catch (error) {
        //console.log(error);
        return response.status(500).json({ status: 500, data: [] });
      }
    });
  },
  deleteBooks: async (request, response) => {
    try {
      const id = request.params.id;
      const result = await bookModels.deleteBooks(id);
      return response
        .status(200)
        .json({ status: 200, message: "delete books data", data: result });
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] });
    }
  },
  //     try {

  //         const resCount = await booksModels.getCount()
  //         var totalPages = Math.ceil(resCount / request.query.limit) // pembulatan keatas, floor pembulatan kebawah
  //         const limit = parseInt(request.query.limit)
  //         if (request.query.page <= 0 || limit <= 0) {
  //             helper.response(response, 500, {
  //                 message: "limit or page must more than 0"
  //             })
  //         }
  //         if (request.query.page > totalPages) {
  //             request.query.page = totalPages
  //         }
  //         const page = parseInt(request.query.page)
  //         const startIndex = (page - 1) * limit

  //         const sort = request.query.orderBy
  //         const column = request.query.sortBy
  //         const result = await booksModels.getSortBook(limit, startIndex, column, sort)
  //         return helper.response(response, 200, result)

  //     } catch (error) {
  //         console.log(error)
  //         return helper.response(response, 500, error)

  //     }

  // },
};
