"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, username, email, _token, _tokenExpirationDate) {
        this.id = id;
        this.username = username;
        this.email = email;
        this._token = _token;
        this._tokenExpirationDate = _tokenExpirationDate;
    }
    Object.defineProperty(User.prototype, "token", {
        get: function () {
            if (this.isExpired()) {
                return null;
            }
            return this._token;
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.isExpired = function () {
        return (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate);
    };
    Object.defineProperty(User.prototype, "expirationDuration", {
        get: function () {
            if (this.isExpired()) {
                return 0;
            }
            return new Date(this._tokenExpirationDate).getTime() - new Date().getTime();
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.model.js.map