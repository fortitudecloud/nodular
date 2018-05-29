export const typeDefs = [`
    type Query {
        user(username: String): User
        users: [User]
    }
    type User {
        id: String
        username: String
        name: String        
    }    
    type Mutation {
        createUser(username: String, name: String): User        
    }
    schema {
        query: Query
        mutation: Mutation
    }
`];