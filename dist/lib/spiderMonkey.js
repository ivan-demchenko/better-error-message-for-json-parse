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
        var res = /at line (\d+) column (\d+)/.exec(msg);
        return res
            ? {
                l: parseInt(res[1], 10) - 1,
                c: parseInt(res[2], 10) - 1
            }
            : null;
    };
    exports.showFancySyntaxException = function (rawJson, e) {
        var context = [e.message];
        var position = exports.extractErrorPositionFromErrorMsg(e.message);
        return position
            ? helper_1.buildErrorFromJsonAndPosition(rawJson.split('\n'), context, position)
            : "";
    };
    exports.safeJsonParse = function (raw, reviver) {
        try {
            return JSON.parse(raw, reviver);
        }
        catch (e) {
            throw new SyntaxError(exports.showFancySyntaxException(raw, e));
        }
    };
});
//# sourceMappingURL=spiderMonkey.js.map