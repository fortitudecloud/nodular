export function getResolvers(db) {
    return {
        Query: {
          user: async (root, {username}) => {
            return db.getData('/users/' + username)            
          },
          users: async () => {
            var users = []; 
            var dbUsers = db.getData('/users')
            for(var user in dbUsers) {
                users.push(dbUsers[user]);
            }
            return users;
          }
        },
        Mutation: {
          createUser: async (root, args, context, info) => {            
            const res = db.push("/users/" + args.username, args, false);
            return db.getData('/users/' + args.username);
          }
        },
    }
}