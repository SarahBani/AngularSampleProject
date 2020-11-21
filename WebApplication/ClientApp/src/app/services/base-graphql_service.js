"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGraphQLService = void 0;
var rxjs_1 = require("rxjs");
var BaseGraphQLService = /** @class */ (function () {
    function BaseGraphQLService(httpClient, modalService, exceptionHandlerService) {
        this.httpClient = httpClient;
        this.modalService = modalService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.const_confirmDelete = "Are you sure to delete this item?";
        this.onUploadFinished = new rxjs_1.Subject();
    }
    //private getInitialUrl(): string {
    //  return this.baseUrl + this.controllerName + '/';
    //}
    //private getHeaders(): {
    //  headers?: HttpHeaders; responseType: 'json';
    //} {
    //  return {
    //    headers: new HttpHeaders({
    //      'Content-Type': 'application/json; charset=utf-8'
    //    }),
    //    responseType: 'json'
    //  };
    //}
    //protected httpGetCount(): Observable<number> {
    //  return this.httpGet<number>('CountAsync');
    //}
    BaseGraphQLService.prototype.httpGet = function (query) {
        return this.httpClient.get("graphql/query=" + query);
    };
    //protected httpPost<T>(remainedUrl: string, body: T): Observable<ICustomActionResult> {
    //  return this.httpClient.post<ICustomActionResult>(
    //    this.getInitialUrl() + remainedUrl,
    //    body,
    //    this.getHeaders())
    //    .pipe(map((response: ICustomActionResult) => {
    //      return response;
    //    }));
    //}
    //protected httpPut<T>(remainedUrl: string, body: T): Observable<ICustomActionResult> {
    //  return this.httpClient.put<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
    //    body,
    //    this.getHeaders())
    //    //.toPromise()
    //    //.map(res => res.json().data )
    //    .pipe(map((response: ICustomActionResult) => {
    //      return response;
    //    }));
    //}
    //protected httpDelete(remainedUrl: string): Observable<ICustomActionResult> {
    //  return this.httpClient.delete<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
    //    this.getHeaders())
    //    .pipe(map((response: ICustomActionResult) => {
    //      return response;
    //    }));
    //}
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
//# sourceMappingURL=base-graphql_service.js.map