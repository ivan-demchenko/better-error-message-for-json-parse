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
    exports.buildErrorPointer = function (pos) {
        return exports.mkArray(pos - 1).map(function () { return '-'; }).join('') + '^';
    };
    exports.buildErrorFromJsonAndPosition = function (lines, context, position) {
        if (lines[position.l - 1]) {
            context.push(lines[position.l - 1]);
        }
        context.push(lines[position.l]);
        context.push(exports.buildErrorPointer(position.c));
        if (lines[position.l + 1]) {
            context.push(lines[position.l + 1]);
        }
        return context.join('\n');
    };
});
//# sourceMappingURL=helper.js.map