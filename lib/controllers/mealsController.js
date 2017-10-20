const Meal = require('../models/meal')

const getMeals = (request, response) => {
  Meal.getAllMeals()
  .then(function(data) {
    response.status(201).json(data.rows)
  })
}

const getMeal = (request, response) => {
  Meal.getOneMeal(request)
  .then(function(data) {
    response.status(201).json(data.rows[0])
  })
}

const addFoodToMeal = (request, response) => {
  Meal.addFoodtoAMeal(request)
  .then(function(data) {
    response.status(201)
  })
}
const deleteFood = (request, response) => {
  Meal.deleteAFood(request)
  .then(function() {
    response.status(203)
  })
}

module.exports = {
  getMeals,
  getMeal,
  addFoodToMeal,
  deleteFood
}
