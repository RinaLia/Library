const authorModels = require("../models/authors");
// const
module.exports = {
  getAuthors: async (request, response) => {
    try {
      const result = await authorModels.getAuthor();
      return response
        .status(200)
        .json({ status: 200, message: "list all authors data", data: result });
    } catch (error) {
      return response
        .status(500)
        .json({ status: 500, message: error, data: [] });
    }
  },
  postAuthors: async (request, response) => {
    try {
      const setData = request.body;
      console.log(setData);
      const result = await authorModels.postAuthor(setData);
      return response
        .status(200)
        .json({ status: 200, message: "create authors data", data: result });
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] });
    }
  },
  putAuthors: async (request, response) => {
    try {
      const setData = request.body; // {name: "", desc: ""}
      //const {name} = request.body
      // console.log(name); // name

      const id = request.params.id;
      //const {id} = request.params.id

      const result = await authorModels.putAuthor(setData, id);
      return response
        .status(200)
        .json({ status: 200, message: "update authors data", data: result }); //data:setData
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] });
    }
  },
  deleteAuthors: async (request, response) => {
    try {
      const id = request.params.id;
      const result = await authorModels.deleteAuthor(id);
      return response
        .status(200)
        .json({ status: 200, message: "delete authors data", data: result });
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] });
    }
  },
};
