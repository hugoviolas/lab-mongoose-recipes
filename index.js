const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      /**
       * Iteration2
       */
      const newRecipe = await Recipe.create({
        title: "Pizza",
        level: "Amateur Chef",
        ingredients: [
          "flour",
          "water",
          "sourdough",
          "olive oil",
          "salt",
          "tomatoes",
          "mozzarella",
          "spices",
        ],
        cuisine: "Italian",
        dishType: "main_course",
        image:
          "https://cdn.sortiraparis.com/images/80/91742/579478-pizzeria-bijou.jpg",
        duration: 240,
        creator: "Italian guy",
      });
      console.log(newRecipe.title);

      /**
       * Iteration 3
       */
      const manyRecipe = await Recipe.insertMany(data);
      manyRecipe.forEach((recipe) => {
        console.log(recipe.title);
      });

      /**
       * Iteration 4
       */
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
      console.log(updatedRecipe);

      /**
       * Iteration 5
       */

      const deletedCarrotCake = await Recipe.deleteOne({
        title: "Carrot Cake",
      });
      if (deletedCarrotCake.deletedCount === 1) {
        console.log("Deleted Carrot Cake !");
      }
    } catch (error) {
      console.log(error);
    }
  })
  .then(async () => {
    await mongoose.disconnect();
    console.log(`Disconnected`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
