/*! init-lib | MIT (c) @mjeightyfive  */

(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.InitJSLib = factory();
    }
})(this, function() {
    'use strict';

    // merge options in
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

    // built-in options
    var options = {
        name: 'InitJSLib',
        type: 'none'
    };

    // the constructor
    function InitJSLib(o) {
        var opts = merge(o || {}, InitJSLib.options, options);

        var getOptions = function() {
            return opts;
        };

        return {
            getOptions: getOptions
        };

    }

    return InitJSLib;
});