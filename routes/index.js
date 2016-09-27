var express = require('express');
var router  = express.Router();
var data    = require('../data.json');


var categories      = data.categories;
var recipes         = data.recipes;
var ordered_recipes = {};

categories.forEach(function(cat){
  ordered_recipes[cat.id] = findRecipesByCategory(cat.id);
});

function findRecipesByCategory(cat){
  return recipes.filter(function(rec){ return rec.category === cat });
}

function findRecipesById(id){
  var recipe = recipes.filter(function(rec){ return rec.id == id });
  if(!recipe) return null;
  return recipe[0];
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    categories: data.categories,
    recipes: ordered_recipes
  });
});

router.get('/test', function(req, res) {
  res.render('test', {

  });
});

router.get('/recipe/:id', function(req, res) {
  res.render('recipe', {
    recipe: findRecipesById(req.param("id"))
  });
});

module.exports = router;
