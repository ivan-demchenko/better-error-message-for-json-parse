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
    exports.mkArray = function (lim) {
        return Array.from(Array(lim), function (a, i) { return i; });
    };
    exports.extractErrorPositionFromErrorMsg = function (msg) {
        var res = /Unexpected string in JSON at position (\d+)/.exec(msg);
        return res ? parseInt(res[1], 10) : null;
    };
    exports.extractErrorPlace = function (rawJson, position, context) {
        return rawJson.substring(position - context, position + context);
    };
    exports.showFancySyntaxException = function (rawJson, e) {
        var context = [];
        var pos = exports.extractErrorPositionFromErrorMsg(e.message);
        if (pos) {
            context.push(exports.extractErrorPlace(rawJson, pos, 20));
            context.push(exports.mkArray(pos - 1).map(function () { return '-'; }).join('') + '^');
        }
        return [
            e.message,
            context.join('\n')
        ].join('\n');
    };
    exports.safeJsonParse = function (raw) {
        try {
            return JSON.parse(raw);
        }
        catch (e) {
            throw new Error(exports.showFancySyntaxException(raw, e));
        }
    };
});
//# sourceMappingURL=main.js.map