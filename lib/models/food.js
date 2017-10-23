const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const newFood = (name, calories) => {
  return database.raw(
      "INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING id, name, calories",
    [name, calories]
  )
};

const updateFood = (food, id) => {
  return database.raw(
    "UPDATE foods SET name=?, calories=? WHERE id=? RETURNING id, name, calories", [food.name, food.calories, id])
}

const findOneFood = (id) => {
  return database.raw("SELECT * FROM foods WHERE id=?", [id])
}

const findAllFoods = () => {
  return database.raw("SELECT * FROM foods")
}

const destroyFood = (id) => {
  return database.raw("DELETE FROM foods WHERE id=?", [id])
}

const destroyAllFoods = () => {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  newFood, destroyAllFoods, findOneFood, findAllFoods, updateFood, destroyFood
}

