(function() {

    'use strict';

    var expect = chai.expect;

    describe('display app name passed by the user', function() {
        it('should have a different to default name', function() {
            var initjslib = new InitJSLib({
                name: 'NewAppName'
            });
            expect(initjslib.getOptions().name).to.equal('NewAppName');
        });
    });
}());