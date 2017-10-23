
let Food = require('../models/food')

const deleteFood = (request, response) => {
  let id = request.params.id

  Food.destroyFood(id)
    .then(function(data){
      response.status(203).json(data.rows)
      })
    .catch();
}

const createFood = (request, response) => {
  let name      = request.body.name
  let calories  = request.body.calories
  console.log(request.body)
  /*if (!name || !calories) {*/
    //return response.status(422).send({ error: "One or both food properties missing!"})
  /*}*/

  Food.newFood(name, calories)
    .then(function(data){
      response.status(201).json(data.rows)
    })
}//close createFood

const editFood = (request, response) => {

  let id        = request.params.id
  let food      = request.body

  if (!newName && !newCalories) {
    return response.status(422).send({ error: "One food property missing!"})
  }

  Food.updateFood(food, id)
    .then(function(data){
      response.status(201).json(data.rows[0])
    })
    .catch(function(error){
      console.error(error)
    })
} // close editFood

const showFood = (request, response) => {
    let id = request.params.id

    if (!id) {
      return response.status(422).send({ error: "no food id provided!"})
    }

    Food.findOneFood(id)
      .then(function(data){
        response.status(201).json(data.rows)
      })
      .catch(function(error){
        console.error(error)
      })
} //close showFood


const indexFood = (request, response) => {
    Food.findAllFoods()
      .then(function(data){
        response.status(201).json(data.rows)
      })
      .catch()
}

module.exports = { createFood, showFood, indexFood, editFood, deleteFood }
