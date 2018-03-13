(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.safeJsonParse = function (raw, reviver) {
        try {
            // So, for Webkit it is a bit trickier as Webkit shows the place in JS file, not in JSON
            return JSON.parse(raw, reviver);
        }
        catch (e) {
            throw e;
        }
    };
});
//# sourceMappingURL=webkit.js.map