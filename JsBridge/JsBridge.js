/**
 * 函数描述：js调用webview事件
 *
 * jsBridge.callHandler(method, data, callBack(response));
 * @param method {string} 方法名
 * @param data {Object} 参数
 * @return {Object} 回调
 */

/**
 * 函数描述：webView调用JS事件
 *
 * jsBridge.registerHandler(method, callBack(response));
 * @param method {string} 方法名
 * @return {Object} 回调
 */

/*
* 方法名通常需要与安卓和苹果规定好
*
* */

var JsBridge = {
    init: function(callback) {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (!isiOS) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady',
                    function() {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        } else {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
    },

    first: function() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (!isiOS) {
            var _this = this;
            _this.init(function(bridge) {
                bridge.init(function(message, responseCallback) {
                    responseCallback(data);
                })
            })
        }
    },

    registerHandler: function(name, fun) {
        var _this = this;
        _this.init(function(bridge) {
            bridge.registerHandler(name, fun);
        })
    },

    callHandler: function(name, data, fun) {
        var _this = this;
        _this.init(function(bridge) {
            bridge.callHandler(name, data, fun);
        })
    }
}

JsBridge.first();

export {
    JsBridge
};