let assert = require('chai').assert
let app = require('../server')
let request = require('request')

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
})
