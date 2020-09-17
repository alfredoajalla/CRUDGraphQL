const {gql} = require ('apollo-server-express');
const userTypeDefs = require ('./user');
const recipeTypeDefs = require ('./recipe');
const ingredientTypeDefs = require ('./ingredient');
const categoryTypeDefs = require ('./category');

const TypeDefs = gql`
    scalar Date
    type Query {
        _:String
    }
    type Mutation {
        _:String
    }
`;

module.exports = [
    TypeDefs,
    userTypeDefs, 
    recipeTypeDefs, 
    ingredientTypeDefs, 
    categoryTypeDefs
]