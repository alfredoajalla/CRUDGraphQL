const { combineResolvers } = require('graphql-resolvers');
const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');
const Category = require('../database/models/category');
const { isAuthenticated, isRecipeOwner } = require('./middleware');

module.exports = {
  Query: {

    getMyRecipes: combineResolvers(isAuthenticated, async (_, { cursor, limit = 10 }, { loggedInUserId }) => {
      try {
        const query = { user: loggedInUserId };
        if (cursor) {
          query._id = {
            $lt: cursor,
          };
        }
        const recipes = await Recipe.find(query).sort({ _id: -1 }).limit(limit);
        return recipes;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    getOneRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id }) => {
      try {
        const recipe = await Recipe.findById(id);
        return recipe;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    getRecipes: () => {
      try {
        const recipes = Recipe.find();
        return recipes;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

  },

  Mutation: {
    createRecipe: combineResolvers(isAuthenticated, async (_, { input }, { email }) => {
      try {
        const user = await User.findOne({ email });
        const newRecipe = new Recipe({ ...input, user: user.id });
        const result = await newRecipe.save();
        user.recipes.push(result.id);
        await user.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),

    updateRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id, input }) => {
      try {
        const recipe = await Recipe.findByIdAndUpdate(id, { ...input }, { new: true });
        return recipe;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),

    deleteRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id }, { loggedInUserId }) => {
      try {
        const recipe = await Recipe.findByIdAndDelete(id);
        await User.updateOne({ _id: loggedInUserId }, { $pull: { recipes: recipe.id } });
        return recipe;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  },
  Recipe: {
    user: async ({ user }) => {
      try {
        const userById = await User.findById(user);
        return userById;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    category: async ({ category }) => {
      try {
        const categoryById = await Category.findById(category);
        return categoryById;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

  },
};
