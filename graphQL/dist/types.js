"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = ["\n    type Query {\n        user(username: String): User\n        users: [User]\n    }\n    type User {\n        id: String\n        username: String\n        name: String        \n    }    \n    type Mutation {\n        createUser(username: String, name: String): User        \n    }\n    schema {\n        query: Query\n        mutation: Mutation\n    }\n"];
//# sourceMappingURL=types.js.map