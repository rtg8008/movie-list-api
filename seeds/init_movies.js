/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Mean Girls', iswatched: false},
    {title: 'Hackers', iswatched: false},
    {title: 'The Grey', iswatched: false},
    {title: 'Sunshine', iswatched: true},
    {title: 'Ex Machina', iswatched: false},
  ]);
};
