(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/spiderMonkey"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var spiderMonkey_1 = require("../lib/spiderMonkey");
    describe('spiderMonkey', function () {
        describe('bulding message', function () {
            it('should parse position', function () {
                // given
                var err = new SyntaxError('JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data');
                // expected
                var expecetd = {
                    l: 3,
                    c: 8
                };
                expect(spiderMonkey_1.extractErrorPositionFromErrorMsg(err.message)).toEqual(expecetd);
            });
            describe('build up error message', function () {
                it('case 1', function () {
                    // given
                    var testJson = [
                        '{',
                        '   "a": 4,',
                        '   "b": 5,',
                        '   "c: 5',
                        '}'
                    ].join('\n');
                    var err = new SyntaxError('JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data');
                    // expected
                    var expected = [
                        'JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data',
                        '   "b": 5,',
                        '   "c: 5',
                        '-------^',
                        '}'
                    ].join('\n');
                    // then
                    expect(spiderMonkey_1.showFancySyntaxException(testJson, err))
                        .toEqual(expected);
                });
                it('case 2', function () {
                    // given
                    var testJson = [
                        '{"',
                        '   "a": 4,',
                        '   "b": 5,',
                        '   "c": 5',
                        '}'
                    ].join('\n');
                    var err = new SyntaxError('JSON.parse: bad control character in string literal at line 1 column 3 of the JSON data');
                    // expected
                    var expected = [
                        'JSON.parse: bad control character in string literal at line 1 column 3 of the JSON data',
                        '{"',
                        '-^',
                        '   "a": 4,'
                    ].join('\n');
                    // then
                    expect(spiderMonkey_1.showFancySyntaxException(testJson, err))
                        .toEqual(expected);
                });
            });
        });
    });
});
//# sourceMappingURL=spiderMonkey.spec.js.map