import { Nodular, Inject } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import * as JsonDB from 'node-json-db';
import * as path from 'path';
import * as bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from './types';
import { getResolvers } from './resolvers';

module GraphQLModule {
    @HttpController()
    export class GraphQLHttp {
        @Inject(ServerModule.ServerConfig) protected config: any;        

        onInit() {
            var filename = path.resolve(__dirname, 'db.json');
            const db = new JsonDB(filename, true, true); 

            const resolvers = getResolvers(db);

            const schema = makeExecutableSchema({
                typeDefs,
                resolvers
            });

            const homePath = '/graphiql'    

            this.config.bind((app) => {
                app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
                app.use(homePath, graphiqlExpress({ endpointURL: '/graphql' }))
            });            
        }
    }
}

// var filename = path.resolve(__dirname, 'db.json');
// console.log(filename);
// this.db = new JsonDB(filename, true, true);

@Nodular([ServerModule, HttpModule, HttpController, GraphQLModule])
class Start {}