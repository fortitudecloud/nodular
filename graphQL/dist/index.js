"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("nodular");
var nodular_server_1 = require("nodular-server");
var JsonDB = require("node-json-db");
var path = require("path");
var bodyParser = require("body-parser");
var graphql_server_express_1 = require("graphql-server-express");
var graphql_tools_1 = require("graphql-tools");
var types_1 = require("./types");
var resolvers_1 = require("./resolvers");
var GraphQLModule;
(function (GraphQLModule) {
    var GraphQLHttp = /** @class */ (function () {
        function GraphQLHttp() {
        }
        GraphQLHttp.prototype.onInit = function () {
            var filename = path.resolve(__dirname, 'db.json');
            var db = new JsonDB(filename, true, true);
            var resolvers = resolvers_1.getResolvers(db);
            var schema = graphql_tools_1.makeExecutableSchema({
                typeDefs: types_1.typeDefs,
                resolvers: resolvers
            });
            var homePath = '/graphiql';
            this.config.bind(function (app) {
                app.use('/graphql', bodyParser.json(), graphql_server_express_1.graphqlExpress({ schema: schema }));
                app.use(homePath, graphql_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
            });
        };
        __decorate([
            nodular_1.Inject(nodular_server_1.ServerModule.ServerConfig),
            __metadata("design:type", Object)
        ], GraphQLHttp.prototype, "config", void 0);
        GraphQLHttp = __decorate([
            nodular_server_1.HttpController()
        ], GraphQLHttp);
        return GraphQLHttp;
    }());
    GraphQLModule.GraphQLHttp = GraphQLHttp;
})(GraphQLModule || (GraphQLModule = {}));
// var filename = path.resolve(__dirname, 'db.json');
// console.log(filename);
// this.db = new JsonDB(filename, true, true);
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([nodular_server_1.ServerModule, nodular_server_1.HttpModule, nodular_server_1.HttpController, GraphQLModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=index.js.map