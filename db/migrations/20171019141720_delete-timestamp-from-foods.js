exports.up = function(knex, Promise) {
 let createQuery = (`ALTER TABLE foods DROP COLUMN created_at`)
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = (`DROP TABLE foods`)
  return knex.raw(dropQuery)
};
