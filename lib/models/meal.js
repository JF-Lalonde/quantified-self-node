const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const getAllMeals = () => {
  return database.raw("SELECT meals.*, json_agg(foods) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id GROUP BY meals.id")
}

const getOneMeal = (request, response) => {
  let id = request.params.id
  return database.raw("SELECT meals.*, json_agg(foods) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id WHERE meals.id = ? GROUP BY meals.id", [id])
}

const addFoodtoAMeal = (request, response) => {
  let food_id = parseInt(request.params.id)
  let meal_id = parseInt(request.params.meal_id)
  return database.raw("INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)", [food_id, meal_id])
}

const deleteAFood = (request, response) => {
  let food_id = request.params.id
  let meal_id = request.params.meal_id
  return database.raw("DELETE FROM meal_foods WHERE meal_id = ? AND food_id = ?", [meal_id, food_id])
}

let destroyAll = () => {
  return database.raw('TRUNCATE secrets RESTART IDENTITY')
}

module.exports = {
  getAllMeals,
  getOneMeal,
  addFoodtoAMeal,
  deleteAFood
}
