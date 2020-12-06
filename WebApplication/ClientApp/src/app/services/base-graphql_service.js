"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGraphQLService = void 0;
var rxjs_1 = require("rxjs");
var apollo_angular_1 = require("apollo-angular");
var BaseGraphQLService = /** @class */ (function () {
    function BaseGraphQLService(apollo, modalService, exceptionHandlerService, useCache) {
        if (useCache === void 0) { useCache = true; }
        this.apollo = apollo;
        this.modalService = modalService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.useCache = useCache;
        this.const_confirmDelete = "Are you sure to delete this item?";
        this.onUploadFinished = new rxjs_1.Subject();
    }
    //protected httpGetCount(): Observable<number> {
    //  return this.httpGet<number>('CountAsync');
    //}
    //private query: QueryRef<any>;
    BaseGraphQLService.prototype.requestQuery = function (name, query, variables) {
        if (variables === void 0) { variables = {}; }
        //const client = new ApolloClient({
        //  uri: "http://localhost:4200/graphql" 
        //});
        return this.apollo.query({
            query: apollo_angular_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query ", " { ", " }"], ["query ", " { ", " }"])), name, query),
            fetchPolicy: (this.useCache ? "network-only" : "no-cache"),
            variables: variables
        });
    };
    BaseGraphQLService.prototype.requestMutation = function (name, mutation) {
        return this.apollo.mutate({
            mutation: apollo_angular_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["mutation ", " { ", " }"], ["mutation ", " { ", " }"])), name, mutation)
        });
    };
    BaseGraphQLService.prototype.confirmDelete = function () {
        return this.modalService.showConfirm(this.const_confirmDelete);
    };
    BaseGraphQLService.prototype.showError = function (error) {
        console.warn('showError');
        console.error(error);
        this.exceptionHandlerService.showModalException(error);
    };
    return BaseGraphQLService;
}());
exports.BaseGraphQLService = BaseGraphQLService;
var templateObject_1, templateObject_2;
//# sourceMappingURL=base-graphql_service.js.map