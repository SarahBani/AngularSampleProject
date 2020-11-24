"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGraphQLService = void 0;
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var graphql_tag_1 = require("graphql-tag");
var BaseGraphQLService = /** @class */ (function () {
    function BaseGraphQLService(apollo, httpClient, modalService, exceptionHandlerService) {
        this.apollo = apollo;
        this.httpClient = httpClient;
        this.modalService = modalService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.const_confirmDelete = "Are you sure to delete this item?";
        this.onUploadFinished = new rxjs_1.Subject();
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
    //protected httpGetCount(): Observable<number> {
    //  return this.httpGet<number>('CountAsync');
    //}
    //protected httpGet(query: string): Observable<{ data, extensions }> {
    //  return this.httpClient.get<{ data, extensions }>(`graphql/query=QueryContent ${query}`);
    //}
    BaseGraphQLService.prototype.httpPost = function (query) {
        console.log(graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query QueryContent { ", " }"], ["query QueryContent { ", " }"])), query));
        //return this.httpClient.post('graphql', gql`query QueryContent { ${query} }`, this.getHeaders());
        this.apollo.watchQuery({
            query: graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query QueryContent { ", " }"], ["query QueryContent { ", " }"])), query)
        });
        return this.apollo.query({
            query: graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query QueryContent { ", " }"], ["query QueryContent { ", " }"])), query)
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
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=base-graphql_service.js.map