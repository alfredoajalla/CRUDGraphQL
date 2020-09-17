const {gql} = require ('apollo-server-express');

module.exports  = gql`

extend type Query {
    getIngredients:[Ingredient!]
    getOneIngredient(id:ID!):Ingredient
}

input createIngredientInput{
    name:String!
}

input updateIngredientInput{
    name:String!
}


extend type Mutation {
    createIngredient (input:createIngredientInput!):Ingredient
    updateIngredient (id:ID!, input:updateIngredientInput):Ingredient
}

type Ingredient {
    id:ID!
    name:String
    createdAt:Date!
    updatedAt:Date!
}

`;
