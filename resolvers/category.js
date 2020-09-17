const { combineResolvers } = require('graphql-resolvers');
const { graphql } = require('graphql');


const Category = require('../database/models/category');
const Recipe = require ('../database/models/recipe'); 
const { isAuthenticated } = require('./middleware');
const { makeRemoteExecutableSchema } = require('apollo-server-express');

module.exports = {

    Query: {
        getCategories: combineResolvers(isAuthenticated, () => {
            try {
                const categories = Category.find();
                return categories;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        ),

        getOneCategory: combineResolvers(isAuthenticated, async (_, { id }) => {
            try {
                const category = await Category.findById(id);
                return category;

            } catch (error) {
                console.log(error);
                throw error;
            }

        }),
    },
    Mutation: {
        createCategory: combineResolvers(isAuthenticated, async (_, { input }) => {
            try {

                nameNewCategory = input.name;
                const findCategory = await Category.findOne({ name: nameNewCategory });
                if (findCategory) {
                    throw new Error('Category already exist');
                }
                const newCategory = new Category({ ...input });
                const result = await newCategory.save();
                return result;

            } catch (error) {
                console.log(error);
                throw error;

            }

        }),
        updateCategory: combineResolvers(isAuthenticated, async (_, { id, input }) => {
            try {
                NewNameCategoryToUpdate = input.name;
                const findCategory = await Category.findOne({ name: NewNameCategoryToUpdate });
                if (findCategory) {
                    throw new Error('Category already exist');
                }
                const category = await Category.findByIdAndUpdate(id, { ...input }, { new: true });
                return category

            } catch (error) {
                console.log(error);
                throw error;
            }
        }),

        deleteCategory: combineResolvers (isAuthenticated, async (_, { id })=>{
            try {
                const categoryDefault = await Category.findOne ({name:"Without Category"}); 
                const category = await Category.findByIdAndDelete(id);
                await Recipe.updateMany ({category: id}, {$set: {category: categoryDefault._id}} );  
                
                return category
                
            } catch (error) {
                console.log(error);
                throw error;
            }

        }),
    },

}