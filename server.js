var express = require('express')
var app = express()

app.set('port', process.env.PORT || 1234)
app.locals.title = 'Quantified Self'

app.get('/', function(request, response) {
  response.send('Quantified Self Enpoints')
})

app.get('/api/foods/:id', function(request, response){
  response.json({
    id: request.params.id
  })
})

if(!module.parent){
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}


module.exports = app
