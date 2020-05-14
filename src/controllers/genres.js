const genresModels = require('../models/genres')
module.exports = {
  getGenres: async (request, response) => {
    try {
      const result = await genresModels.getAuthor()
      return response.status(200).json({ status: 200, message: 'list all genres data', data: result })
    } catch (error) {
      return response.status(500).json({ status: 500, message: error, data: [] })
    }
  },
  postGenres: async (request, response) => {
    try {
      const setData = request.body
      console.log(setData)
      const result = await genresModels.postGenres(setData)
      return response.status(200).json({ status: 200, message: 'create genres data', data: result })
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] })
    }
  },
  putGenres: async function (request, response) {
    try {
      const setData = request.body
      const id = request.params.id
      const result = await genresModels.putGenres(setData, id)
      return response.status(200).json({ status: 200, message: 'update genres data', data: result })

    } catch (error) {
      return response.status(500).json({ status: 500, data: [] })
    }


  },
  deleteGenres: async (request, response) => {
    try {
      const id = request.params.id
      const result = await genresModels.deleteGenres(id)
      return response.status(200).json({ status: 200, message: 'delete genres data', data: result })
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] })
    }
  },
}

