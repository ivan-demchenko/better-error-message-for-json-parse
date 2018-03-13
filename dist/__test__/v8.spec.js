(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/v8"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var v8_1 = require("../lib/v8");
    describe('V8', function () {
        describe('bulding message', function () {
            it('should show fancy error message', function () {
                // given
                var testJson = '{"some": "json" "that-is": "wrong"}';
                var err = new SyntaxError('Unexpected string in JSON at position 16');
                // expected
                var expected = ['Unexpected string in JSON at position 16',
                    '{"some": "json" "that-is": "wrong"}',
                    '---------------^'
                ].join('\n');
                // then
                expect(v8_1.buildMessageForSyntaxException(testJson, err))
                    .toEqual(expected);
            });
        });
    });
});
//# sourceMappingURL=v8.spec.js.map