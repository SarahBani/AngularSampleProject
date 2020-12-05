"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGraphQLService = void 0;
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var apollo_angular_1 = require("apollo-angular");
//import gql from 'graphql-tag';
//import { Apollo, gql } from 'apollo-angular';
//import { ApolloClient,InMemoryCache } from '@apollo/client';
//import { HttpLink } from 'apollo-angular-link-http';
//import { gql } from 'graphql-tag';
var BaseGraphQLService = /** @class */ (function () {
    function BaseGraphQLService(apollo, httpClient, modalService, exceptionHandlerService
    //, private httpLink: HttpLink
    ) {
        this.apollo = apollo;
        this.httpClient = httpClient;
        this.modalService = modalService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.const_confirmDelete = "Are you sure to delete this item?";
        this.onUploadFinished = new rxjs_1.Subject();
        //this.apollo.create({
        // // link: this.httpLink.create({ uri: 'https://localhost:4200/graphql' }),
        //  cache: new InMemoryCache()
        //})
    }
    //private getInitialUrl(): string {
    //  return this.baseUrl + this.controllerName + '/';
    //}
    BaseGraphQLService.prototype.getHeaders = function () {
        return {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            responseType: 'json'
        };
    };
    BaseGraphQLService.prototype.httpPost = function (query) {
        //const client = new ApolloClient({
        //  uri: "http://localhost:4200/graphql" 
        //});
        return this.apollo.query({
            query: apollo_angular_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query GraphQLRequest \n      { ", " }"], ["query GraphQLRequest \n      { ", " }"])), query)
        });
        //this.apollo.watchQuery({
        //  query: gql`
        //      {
        //        hotels {
        //            id
        //            name
        //          }
        //      }
        //    `,
        //  })
        //  .valueChanges.subscribe((result: any) => {
        //    console.log( result?.data?.rates);
        //    console.log(  result.loading);
        //    console.log(  result.error);
        //  });
        //this.query = this.apollo.watchQuery({      
        //  query: My_QUERY,
        //  variables: {}
        //});
        //this.apollo.watchQuery({
        //  query: gql`query GraphQLRequest { ${query} }`
        //});
        //return this.apollo.query({
        //  query: gql`query GraphQLRequest { ${query} }`
        //});
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
var templateObject_1;
//# sourceMappingURL=base-graphql_service.js.map