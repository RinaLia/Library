const bookModels = require("../models/books");
const multer = require("multer");
const config = require("../config/upload");
const upload = config.single("image");
const qs = require("querystring");

// const getPage= (_page) => {
//   const page = parseInt(_page)
//   if (page && page > 0) {
//       return page
//   } else {
//       return 1
//   }

// },
// const getPerPage= (_perPage) => {
//   const perPage = parseInt(_perPage)
//   if (perPage && perPage > 0) {
//       return perPage
//   } else {
//       return 5
//   }
// },
// const getNextLink= (page, totalPage, currentQuery) => {
//   if (page < totalPage) {
//       const generatePage = {
//           page: page + 1
//       }
//       return qs.stringify({ ...currentQuery, ...generatePage })
//   } else {
//       return null
//   }
// },
// const getPrevLink= (page, currentQuery) => {
//   if (page > 1) {
//       const generatePage = {
//           page: page -1
//       }
//       return qs.stringify({ ...currentQuery, ...generatePage })
//   } else {
//       return null
//   }
// }

const getPage = (_page) => {
  const page = parseInt(_page);
  if (page && page > 0) {
    return page;
  } else {
    return 1;
  }
};

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage);
  if (perPage && perPage > 0) {
    return perPage;
  } else {
    return 5;
  }
};

const getNextLinkQueryString = (page, totalPage, currentQuery) => {
  //page = parseInt(page);
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    return qs.stringify({ ...currentQuery, ...generatedPage });
  } else {
    return null;
  }
};

const getPrevLinkQueryString = (page, currentQuery) => {
  //page = parseInt(page);
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    return qs.stringify({ ...currentQuery, ...generatedPage });
  } else {
    return null;
  }
};

module.exports = {
  getBooks: async (request, response) => {
    try {
      const { page, limit, search, sort } = request.query;
      const condition = {
        search,
        sort,
      };

      const sliceStart = getPage(page) * getPerPage(limit) - getPerPage(limit);
      const sliceEnd = getPage(page) * getPerPage(limit);
      const totalData = await bookModels.getBooksCount(condition);
      //const totalDataConds = await book.countData(pagination)
      // console.log(totalData)
      const totalPage = Math.ceil(totalData / getPerPage(limit));
      console.log(totalPage);

      const prevLink = getPrevLinkQueryString(getPage(page), request.query);
      const nextLink = getNextLinkQueryString(
        getPage(page),
        totalPage,
        request.query
      );

      const result = await bookModels.getBooks(sliceStart, sliceEnd, condition);
      return response.status(200).json({
        status: 200,
        msg: "List all book data",
        data: result,
        pageInfo: {
          page: getPage(page),
          totalPage,
          perPage: getPerPage(limit),
          totalData,
          nextLink: nextLink && `${process.env.URL}/books?${nextLink}`,
          prevLink: prevLink && `${process.env.URL}/books?${prevLink}`,
        },
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ status: 500, msg: error, data: [] });
    }
  },

  // const sort = request.query.sort;
  // const field = request.query.field;
  // const offset = request.query.offset;
  // const limit = request.query.limit;

  //     const { sort, field, limit, offset, title } = request.query;

  //     const db = await bookModels.getBooks(sort, field, limit, offset, title);
  //     return response.status(200).json({
  //       status: 200,
  //       message: "list all books data",
  //       data: db.result,
  //       pagination: db.pagination,
  //     });
  //   } catch (error) {
  //     return response
  //       .status(500)
  //       .json({ status: 500, message: error, data: [] });
  //   }
  // },
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
          const id = request.params.id;
          setData.image = `${process.env.URL}:${process.env.PORT}/image/${request.file.filename}`;
          console.log(setData);
          const result = await bookModels.putBooks(setData, id);
          return response
            .status(200)
            .json({ status: 200, message: "success", data: setData });
        }
      } catch (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
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
