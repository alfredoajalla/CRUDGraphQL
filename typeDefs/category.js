const {gql} = require ('apollo-server-express');

module.exports  = gql`

extend type Query {
    getCategories:[Category!]
    getOneCategory (id:ID!):Category
}

input createCategoryInput {
    name:String!
}

input updateCategoryInput {
    name:String!
}



extend type Mutation {
    createCategory (input:createCategoryInput!):Category
    updateCategory (id:ID!, input:updateCategoryInput):Category
    deleteCategory (id:ID!): Category
    
}

type Category {
    id:ID!
    name:String
    createdAt:Date!
    updatedAt:Date!
}

`;
