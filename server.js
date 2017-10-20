let mealsController = require('./lib/controllers/mealsController')
let express = require('express')
let app = express()

app.set('port', process.env.PORT || 1234)
app.locals.title = 'Quantified Self'

app.get('/', function(request, response) {
  response.send('Quantified Self Enpoints')
})


if(!module.parent){
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}

app.get('/api/v1/meals', mealsController.getMeals)
app.get('/api/v1/meals/:id/foods', mealsController.getMeal)
app.delete('/api/v1/meals/:meal_id/foods/:id', mealsController.deleteFood)

module.exports = app
