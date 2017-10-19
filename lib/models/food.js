const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const createFood = (name, calories) => {
  return database.raw(
    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id, name, calories',
    [name, calories, new Date]
  )
};

const getOneFood = (id) => {
  return database.raw("SELECT * FROM foods WHERE id=?", [id])
}

const getAllFoods = () => {
  return database.raw("SELECT * FROM foods")
}

const destroyAllFoods = () => {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  createFood, destroyAllFoods, getOneFood, getAllFoods
}
