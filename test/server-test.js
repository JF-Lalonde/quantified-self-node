let assert      = require('chai').assert
let app         = require('../router')
let request     = require('request')
let Food      = require('../lib/models/food.js')
let Meal      = require('../lib/models/meal.js')

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

// test server is running
describe('Server', function() {
  before(function(done) {
   this.port = 9876

    this.server = app.listen(this.port, function(err, result) {
      if (err) { return done(err) }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })
  after(function() {
    this.server.close()
  })

  it('should exist', function() {
    assert(app)
  })
// test base URL default
  describe('GET /', function() {
    it('should return a 200 status', function(done) {
      this.request.get('/', (error, response) => {
        if(error) { return done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should have a body with the name of the application', function(done) {
      let title = "something"

      this.request.get('/', function(error, response) {
        if(error) { return done(error) }
        assert(response.body.includes(title),
        `${response.body} does not include ${title}.`)
        done()
      })
    })
  })


//GET /api/v1/foods - returns all foods currently in the database
//GET /api/v1/foods/:id - returns the food object with the specific :id you've passed in or 404 if the food is not found
  describe('GET /api/foods/:id', function(){
    beforeEach(function(done) {
      Food.create("oatmeal", 150)
        .then(function() { done() })
      })

    afterEach(function(done) {
      Food.destroyAll()
        .then(function() { done() })
      })
// try to get food with id that doesn't exist yet
    it('should return 404 if resource is not found', function(done) {
      this.request.get('/api/foods/122', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should return the id, name and calories from the resource found', function(done) {
      this.request.get('/api/foods/1', function(error, response) {
        if (error) { done(error) }

        const id       = 1
        const name     = "apple"
        const calories = 90

        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.message, message)
        assert.ok(parsedFood.created_at)
        done()
      })
    })
  })

  // POST /api/v1/foods - allows creating a new food with the parameters:
  // { food: { name: "Name of food here", calories: "Calories here"} }
  // If food is successfully created, the food item will be returned. If the food is not successfully created, a 400 status code will be returned. Both name and calories are required fields.
  describe('POST /api/foods', function(){
    beforeEach(function(done) {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(function() { done() })
    })

    it('should receive and store new food item', function(done){
      let food = {
        name: 'bagel',
        calories: 250
      }

    this.request.post('/api/foods', { form: food }, function(error, response){
      if (error) { done(error) }
      var parsedFood = JSON.parse(response.body)
      assert.equal("bagel", parsedFood.name)
      assert.equal(250, parsedFood.calories)
      assert.equal(response.statusCode, 201)
      done()
    })
  })
})
})
