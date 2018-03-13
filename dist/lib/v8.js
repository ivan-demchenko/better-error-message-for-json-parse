(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var helper_1 = require("./helper");
    exports.extractErrorPositionFromErrorMsg = function (msg) {
        var res = /Unexpected string in JSON at position (\d+)/.exec(msg);
        return res ? parseInt(res[1], 10) : null;
    };
    exports.getErrorPlaceContext = function (rawJson, position) {
        return rawJson.substring(position - 20, position + 20);
    };
    exports.buildMessageForSyntaxException = function (rawJson, e) {
        var context = [];
        var pos = exports.extractErrorPositionFromErrorMsg(e.message);
        if (pos) {
            context.push(exports.getErrorPlaceContext(rawJson, pos));
            context.push(helper_1.buildErrorPointer(pos));
        }
        return [e.message, context.join('\n')].join('\n');
    };
    exports.safeJsonParse = function (raw, reviver) {
        try {
            return JSON.parse(raw, reviver);
        }
        catch (e) {
            throw new SyntaxError(exports.buildMessageForSyntaxException(raw, e));
        }
    };
});
//# sourceMappingURL=v8.js.map