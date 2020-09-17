const { combineResolvers} = require ('graphql-resolvers'); 
const { graphql } = require('graphql');

const Ingredient = require('../database/models/ingredient');
const { isAuthenticated } = require ('./middleware'); 


module.exports = {
    Query: {
        getIngredients: combineResolvers (isAuthenticated, () => {
            try {
                const ingredients = Ingredient.find (); 
                return ingredients; 
            } catch (error) {
                console.log (error);
                throw error;
            }
        }),
        

        getOneIngredient: combineResolvers (isAuthenticated,async (_, { id }) => {
            try {
                const ingredient = await Ingredient.findById(id);
                return ingredient;
                
            } catch (error) {
                console.log (error);
                throw error;
            }

        }), 
     },
     Mutation: {
        createIngredient : combineResolvers (isAuthenticated, async (_, { input }) => {
            try {
            
               nameNewIngredient = input.name; 
               const findIngredient = await Ingredient.findOne ({name:nameNewIngredient});
               if (findIngredient){
                   throw new Error ('Ingredient already exist');
               }
               const  newIngredient = new Ingredient ({...input});
               const result = await newIngredient.save(); 
               return result;
               
           } catch (error) {
               console.log (error);
               throw error;
               
           }
           
       }),
       updateIngredient : combineResolvers (isAuthenticated, async(_, { id , input })=>{
           try {
                NewNameIngredientToUpdate = input.name; 
                const findIngredient = await Ingredient.findOne ({name:NewNameIngredientToUpdate});
                if (findIngredient){
                    throw new Error ('Ingredient already exist');
                }
               const ingredient = await Ingredient.findByIdAndUpdate (id, {...input}, {new:true});
               return ingredient
               
           } catch (error) {
            console.log (error);
            throw error;
           }
       }),
        
    },
    
};