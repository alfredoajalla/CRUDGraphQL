const {gql} = require ('apollo-server-express');

module.exports  = gql`
extend type Query {
    getUsers: [User!]
    getOneUser:User
}

extend type Mutation {
    signup (input:signupInput):User
    login (input:loginInput):Token
    updateUser (id: ID!, input:updateUserInput):User 
}

input loginInput {
    email: String!
    password:String!
}

input updateUserInput {
    name: String!
    email: String!
    password:String!
}

type  Token {
    token:String!
}

input signupInput {   
    name: String!
    email:String!
    password:String!
    
}

type User {
    id: ID!
    name: String!
    email:String!
    password:String!
    recipes:[Recipe!]
    createdAt:Date!
    updatedAt:Date!
}
`;
