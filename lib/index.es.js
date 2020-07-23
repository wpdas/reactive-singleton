import React, { createContext, useState, useEffect, useContext } from 'react';

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

var singletonManagerKeys = {};
var addSingletonManager = function (key, singletonManager) {
    var _a;
    singletonManagerKeys = __assign(__assign({}, singletonManagerKeys), (_a = {}, _a[key] = singletonManager, _a));
};
var getSingletonManager = function (key) {
    return singletonManagerKeys[key];
};
var getSingletonManagersKeys = function () { return Object.keys(singletonManagerKeys); };

var defaultProps = {
    status: 'ready',
};
var SingletonContext = createContext(defaultProps);

var SingletonProvider = function (_a) {
    var children = _a.children;
    var _b = useState(defaultProps.status), status = _b[0], setStatus = _b[1];
    useEffect(function () {
        var observablesKeys = getObservablesKeys();
        observablesKeys.forEach(function (observableKey) {
            var currentObservable = getObservable(observableKey);
            currentObservable.subscribe(function (statusData) {
                if (status === statusData) {
                    setStatus('next_status');
                }
                setStatus(statusData);
            });
        });
    }, []);
    useEffect(function () {
        var singletonsKeys = getSingletonManagersKeys();
        singletonsKeys.forEach(function (singletonKey) {
            var currentSingletonManager = getSingletonManager(singletonKey);
            if (currentSingletonManager.status !== 'ready') {
                setStatus(currentSingletonManager.status);
            }
        });
    }, []);
    return (React.createElement(SingletonContext.Provider, { value: { status: status } }, children));
};

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

var uniqueId = function () {
    return "_" + Math.random()
        .toString(36)
        .substr(2, 9);
};

var SingletonManager = (function () {
    function SingletonManager() {
        this.status = 'ready';
        this.key = uniqueId();
        addObservable(this.key, new Observable());
    }
    SingletonManager.prototype.setValue = function (singletonClass) {
        var ref = singletonClass;
        this.singletonClass = ref;
    };
    SingletonManager.prototype.getProps = function () {
        return {
            singleton: this.singletonClass,
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
            addSingletonManager(classValue.name, newSingleton);
        },
    };
}

function getSingletonManager$1(singletonManager) {
    var singletonKey = singletonManager.name;
    var currentSingleton = getSingletonManager(singletonKey);
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

function useSingletonProps(singletonClass) {
    useContext(SingletonContext);
    var _a = getSingletonManager$1(singletonClass), status = _a.status, observable = _a.observable;
    return {
        status: status,
        statusObservable: observable,
    };
}

function useSingletonStatus(singletonClass) {
    var status = useSingletonProps(singletonClass).status;
    return status;
}

function useSingletonObservable(singletonClass) {
    var statusObservable = useSingletonProps(singletonClass).statusObservable;
    return statusObservable;
}

function useWasDataUpdated(singletonClass) {
    var observable = useSingletonObservable(singletonClass);
    var _a = useState(false), hasUpdatedData = _a[0], setHasUpdatedData = _a[1];
    useEffect(function () {
        var handleOnUpdate = function (status) {
            if (status === 'ready') {
                setHasUpdatedData(true);
                observable.unsubbscribe(handleOnUpdate);
            }
        };
        observable.subscribe(handleOnUpdate);
        return function () {
            observable.unsubbscribe(handleOnUpdate);
        };
    }, []);
    return hasUpdatedData;
}

export { SingletonProvider, createSingleton, useSingletonStatus, useWasDataUpdated };
