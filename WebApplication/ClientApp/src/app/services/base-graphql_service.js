"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGraphQLService = void 0;
var apollo_angular_1 = require("apollo-angular");
var base_service_1 = require("./base-service");
var BaseGraphQLService = /** @class */ (function (_super) {
    __extends(BaseGraphQLService, _super);
    function BaseGraphQLService(apollo, modalService, exceptionHandlerService, useCache) {
        if (useCache === void 0) { useCache = true; }
        var _this = _super.call(this, modalService, exceptionHandlerService) || this;
        _this.apollo = apollo;
        _this.useCache = useCache;
        return _this;
    }
    //protected httpGetCount(): Observable<number> {
    //  return this.httpGet<number>('CountAsync');
    //}
    //private query: QueryRef<any>;
    BaseGraphQLService.prototype.requestQuery = function (name, query, variables) {
        if (variables === void 0) { variables = {}; }
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
    return BaseGraphQLService;
}(base_service_1.BaseService));
exports.BaseGraphQLService = BaseGraphQLService;
var templateObject_1, templateObject_2;
//# sourceMappingURL=base-graphql_service.js.map