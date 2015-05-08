/*! init-lib | MIT (c) @mjeightyfive  */

'use strict';

(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.InitJSLib = factory();
    }
})(this, function() {

    function merge(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var def = arguments[i];
            for (var n in def) {
                if (obj[n] === undefined) {
                    obj[n] = def[n];
                }
            }
        }
        return obj;
    }

    var options = {
        name: 'InitJSLib',
        type: 'none'
    };

    function InitJSLib(o) {
        var opts = merge(o || {}, InitJSLib.options, options);

        /**
         * Get options
         * @method getOptions
         * @returns {Object} user's options
         */
        var getOptions = function() {
            return opts;
        };

        return {
            getOptions: getOptions
        };

    }

    return InitJSLib;
});