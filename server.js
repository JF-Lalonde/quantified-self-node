let FoodsController = require('./lib/controllers/foodsController')
let Food            = require('./lib/models/food')
let express         = require('express')
let app             = express()
let bodyParser      = require('body-parser')

const environment   = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database      = require('knex')(configuration);

app.set('port', process.env.PORT || 1234)
app.locals.title = 'Quantified Self'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.send('Quantified Self Enpoints')
})

if(!module.parent){
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}

// verb, routes, controller, controller action
app.get('/api/v1/foods/:id', FoodsController.showFood)
app.get('/api/v1/foods', FoodsController.indexFood)
app.post('/api/v1/foods', FoodsController.createFood)
// app.patch('/api/v1/foods/:id', FoodsController.editFood)
// app.delete('/api/v1/foods/:id', FoodsController.deleteFood)

module.exports = app
