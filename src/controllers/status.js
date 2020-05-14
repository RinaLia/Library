const statusModels = require('../models/status')

module.exports = {
  getStatus: async (request, response) => {
    try {
      const result = await statusModels.getStatus()
      return response.status(200).json({ status: 200, message: 'list all status data', data: result })
    } catch (error) {
      return response.status(500).json({ status: 500, message: error, data: [] })
    }
  },
  postStatus: async (request, response) => {
    try {
      const setData = request.body
      console.log(setData)
      const result = await statusModels.postStatus(setData)
      return response.status(200).json({ status: 200, message: 'create status data', data: result })
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] })
    }

    {
    };
  },
  putStatus: async function (request, response) {
    try {
      const setData = request.body
      const id = request.params.id
      const result = await statusModels.putStatus(setData, id)
      return response.status(200).json({ status: 200, message: 'update status data', data: result })

    } catch (error) {
      return response.status(500).json({ status: 500, data: [] })
    }


  },
  deleteStatus: async (request, response) => {
    try {
      const id = request.params.id
      const result = await statusModels.deleteStatus(id)
      return response.status(200).json({ status: 200, message: 'delete status data', data: result })
    } catch (error) {
      return response.status(500).json({ status: 500, data: [] })
    }
  },
}
