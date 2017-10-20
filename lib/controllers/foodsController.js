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
}//close createFood

const editFood = (request, response) => {
  let id          = request.params.id
  let newName     = request.param("name")
  let newCalories = parseInt(request.param("calories"))
  console.log(id, newName, newCalories)
  if (!newName && !newCalories) {
    return response.status(422).send({ error: "One food property missing!"})
  }

  Food.updateFood(newName, newCalories, id)
    .then(function(data){
      response.status(201).json(data.rows[0])
    })
    .catch()
} //close editFood

const showFood = (request, response) => {
    let id = request.params.id

    if (!id) {
      return response.status(422).send({ error: "no food id provided!"})
    }

    Food.findOneFood(id)
      .then(function(data){
        response.status(201).json(data.rows)
      })
      .catch()
} //close showFood


const indexFood = (request, response) => {
    Food.findAllFoods()
      .then(function(data){
        response.status(201).json(data.rows)
      })
      .catch()
}


module.exports = { createFood, showFood, indexFood, editFood }
