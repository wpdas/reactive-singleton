Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var Singleton = (function () {
    function Singleton() {
    }
    return Singleton;
}());

var Observable = (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.subscribe = function (handler) {
        this.observers.push(handler);
    };
    Observable.prototype.unsubbscribe = function (handler) {
        this.observers = this.observers.filter(function (subscriber) { return subscriber !== handler; });
    };
    Observable.prototype.notify = function (data) {
        this.observers.forEach(function (observer) { return observer(data); });
    };
    return Observable;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var observableKeys = {};
var getObservable = function (key) {
    return observableKeys[key];
};
var addObservable = function (key, observable) {
    var _a;
    observableKeys = __assign(__assign({}, observableKeys), (_a = {}, _a[key] = observable, _a));
};
var getObservablesKeys = function () { return Object.keys(observableKeys); };

var uniqueId = function () {
    return "_" + Math.random()
        .toString(36)
        .substr(2, 9);
};

var singletonKeys = {};
var addSingleton = function (key, singletonManager) {
    var _a;
    singletonKeys = __assign(__assign({}, singletonKeys), (_a = {}, _a[key] = singletonManager, _a));
};
var getSingleton = function (key) {
    return singletonKeys[key];
};

var SingletonManager = (function () {
    function SingletonManager() {
        this.status = 'ready';
        this.key = uniqueId();
        addObservable(this.key, new Observable());
    }
    SingletonManager.prototype.setValue = function (singletonManager) {
        var ref = singletonManager;
        var properties = Object.getOwnPropertyNames(ref);
        if (properties.indexOf('getInstance') < 0) {
            throw new Error('You must create a public static method called getInstance for initiate the Singleton.');
        }
        if (properties.indexOf('instance') < 0) {
            throw new Error('You must create a public static prop called instance that will be used to store the singleton instance itself.');
        }
        this.singletonManager = ref;
    };
    SingletonManager.prototype.getProps = function () {
        return {
            singleton: this.singletonManager,
            status: this.status,
            key: this.key,
        };
    };
    return SingletonManager;
}());
function createSingleton() {
    var newSingleton = new SingletonManager();
    return {
        useWatcher: function (method) {
            var observable = getObservable(newSingleton.key);
            newSingleton.status = 'in_progress';
            observable.notify(newSingleton.status);
            method(function () {
                newSingleton.status = 'ready';
                observable.notify(newSingleton.status);
            });
        },
        setValue: function (classValue) {
            newSingleton.setValue(classValue);
            addSingleton(classValue.name, newSingleton);
        },
    };
}

var defaultProps = {
    status: 'ready',
};
var SingletonContext = React.createContext(defaultProps);
var SingletonProvider = function (_a) {
    var children = _a.children;
    var _b = React.useState(defaultProps.status), status = _b[0], setStatus = _b[1];
    var observablesKeys = getObservablesKeys();
    React.useEffect(function () {
        observablesKeys.forEach(function (observableKey) {
            var currentObservable = getObservable(observableKey);
            currentObservable.subscribe(function (statusData) {
                setStatus(statusData);
            });
        });
    }, []);
    return (React__default.createElement(SingletonContext.Provider, { value: { status: status } }, children));
};

function getSingletonManager(singletonManager) {
    var singletonKey = singletonManager.name;
    var currentSingleton = getSingleton(singletonKey);
    if (!currentSingleton) {
        throw new Error(singletonKey + " singleton was not correctly initialized or doesn't exist! Please, create your Singleton using createSingleton()'s setValue.");
    }
    var _a = currentSingleton.getProps(), singleton = _a.singleton, status = _a.status, key = _a.key;
    return {
        singleton: singleton,
        status: status,
        observable: getObservable(key),
    };
}

function useSingleton(singletonManager) {
    var singletonManagerStatus = React.useContext(SingletonContext).status;
    var _a = getSingletonManager(singletonManager), singleton = _a.singleton, status = _a.status, observable = _a.observable;
    return {
        singleton: singleton,
        singletonStatus: status,
        singletonStatusObservable: observable,
        managerStatus: singletonManagerStatus,
    };
}

exports.Singleton = Singleton;
exports.SingletonContext = SingletonContext;
exports.SingletonManager = SingletonManager;
exports.SingletonProvider = SingletonProvider;
exports.createSingleton = createSingleton;
exports.useSingleton = useSingleton;
//# sourceMappingURL=index.js.map
