const jwt = require ('jsonwebtoken');
const { graphql } = require('graphql');
const { combineResolvers} = require ('graphql-resolvers'); 
const bcrypt = require ('bcrypt'); 


const User = require('../database/models/user');
const Recipe = require ('../database/models/recipe');
const { isAuthenticated, isUserOwner } = require ('./middleware'); 

module.exports = {
    
    Query: {
        getUsers: combineResolvers (isAuthenticated, async () => {return await User.find ()}),
        getOneUser: combineResolvers (isAuthenticated, async (_, __, { email }) => {
            try {
                const user = await User.findOne ({email});
                if (!user) {
                    throw new Error ('User not found!');
                }
                return user; 
            } catch (error) {
                console.log (error); 
                throw error; 
            }
        }),

    },                         
           
    Mutation: {
        signup: async (_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                
                if (user) {
                    throw new Error ('Email already in use');
                };
                const hashedPassword = await bcrypt.hash (input.password,12);
                const newUser = new User ({...input, password:hashedPassword});
                const result = await newUser.save ();
                return result;

            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        login: async (_, { input }) =>{
            try {
                const user = await User.findOne ({ email: input.email});
                if (!user){
                    throw new Error ('User not found');
                }
                const isPasswordValid = await bcrypt.compare (input.password, user.password);
                if (!isPasswordValid){
                    throw new Error ('Incorrect Password');
                };
                const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';                
                const token = jwt.sign ({email: user.email}, secret, {expiresIn:'1d'});
                return { token }; 
                
            } catch (error) {
                console.log (error);
                throw error;                 
            }

        },
        updateUser: combineResolvers(isAuthenticated, isUserOwner, async (_, {id, input})=>{
            try {
                const hashedPassword = await bcrypt.hash (input.password,12);
                const user = await User.findByIdAndUpdate (id, {...input, password:hashedPassword}, {new: true }); 
                return user;
                
            } catch (error) {
                console.log(error);
                throw error;
            }
        }),
    },

    User: {
        recipes: async ({ id })=> {
            try {
                const recipes = await Recipe.find ({ user: id });
                return recipes; 
                
                
            } catch (error) {
                console.log (error); 
                throw error;
            }
        }
        
    },

}