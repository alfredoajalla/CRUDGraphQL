const {gql} = require ('apollo-server-express');

module.exports  = gql`
    extend type Query {
        getRecipes (cursor:String, limit:Int):[Recipe!]
        getOneRecipe (id:ID!):Recipe
        getMyRecipes(cursor:String, limit:Int):[Recipe!]
            }
    
    input createRecipeInput {
        name:String!
        description:String
        category:ID!
        }

    input updateRecipeInput {
        name:String!
        description:String
        category:ID

        }

    extend type Mutation {
        createRecipe (input:createRecipeInput!):Recipe
        updateRecipe (id:ID!, input:updateRecipeInput):Recipe
        deleteRecipe (id:ID!):Recipe   
        
        
    }
    
    type Recipe {
        id:ID!
        name:String!
        description:String
        ingredients:[Ingredient!]
        category:Category
        user:User!
        createdAt:Date!
        updatedAt:Date!
    }
    `;
