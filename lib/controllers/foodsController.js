let Food = require('../models/food')

  const createFood = (request, response) => {
    let name      = request.param("name")
    let calories  = request.param("calories")

    if (!name || !calories) {
      return response.status(422).send({ error: "One or both food properties missing!"})
    }

    Food.newFood(name, calories)
      .then(function(data){
        response.status(201).json(data.rows)
      })
    }

const showFood = (request, response, next) => {
    let id = request.params.id

    if (!id) {
      return response.status(422).send({ error: "no food id provided!"})
    }

    Food.findOneFood(id)
      .then(function(data){
        response.status(201).json(data.rows)
      })
      .catch
}


const indexFood = (request, response) => {
    Food.findAllFoods()
      .then(function(data){
        response.status(201).json(data.rows)
      })
      .catch()
}


module.exports = { createFood, showFood, indexFood }
