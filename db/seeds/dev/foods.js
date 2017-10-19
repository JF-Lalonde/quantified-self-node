
exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE foods RESTART IDENTITY")
  .then(function(){
    return Promise.all([
      knex.raw(
        "INSERT INTO foods(name, calories, created_at) VALUES (?, ?, ?)",
        ["apple", 90, new Date]
      ),
      knex.raw(
        "INSERT INTO foods(name, calories, created_at) VALUES (?, ?, ?)",
        ["banana", 80, new Date]
      )
    ])
  })
};
