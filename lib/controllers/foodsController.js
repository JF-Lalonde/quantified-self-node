let Food = require('../models/food')

const postFood = (request, response, next) => {
    let name      = request.body.name
    let calories  = request.body.calories

    if (!name || !calories) {
      return response.status(422).send({ error: "One or both food properties missing!"})
    }

    Food.create(message)
      .then(function(data){
        response.status(201).json(data.rows[0])
      })
}


module.exports = { postFood }
