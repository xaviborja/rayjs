Array.prototype.forEach||(Array.prototype.forEach=function(t,n){"use strict";var i,e;if(null==this)throw new TypeError("this is null or not defined");var o,r=Object(this),s=r.length>>>0;if("[object Function]"!=={}.toString.call(t))throw new TypeError(t+" is not a function");for(arguments.length>=2&&(i=n),e=0;s>e;)e in r&&(o=r[e],t.call(i,o,e,r)),e++}),function(t){t.RayNS=t.RayNS||{};var n=function(t){this.callbacks=[],this.eventNamesToListen=t;var n=this;this._notified=!1,this.listener=function(){n._notifyReady(n.callbacks)}};n.prototype.begin=function(){document.addEventListener(this.eventNamesToListen.document,this.listener),window.addEventListener(this.eventNamesToListen.window,this.listener)},n.prototype.end=function(){this._notified=!1,document.removeEventListener(this.eventNamesToListen.document,this.listener),window.removeEventListener(this.eventNamesToListen.window,this.listener),this.callbacks=[]},n.prototype.ready=function(t){this.callbacks.push(t)},n.prototype._notifyReady=function(t){this._notified||(this._notified=!0,t.forEach(function(t){t()}),t=[])},n.prototype._documentIsReady=function(){var t=document.readyState,n=document.documentElement.doScroll,i="complete"===t,e="loading"===t;return i?!0:e||n?!1:!0},t.RayNS.Document=n}(window),function(t){t.RayNS=t.RayNS||{};var n=function(t){function n(t){var n=t.split(".");return n.pop()}function i(t){var n=t.split(".");n.pop();var i=window;return n.forEach(function(t){i=i[t]}),i}var e="data-ray-component";return document.querySelectorAll("["+e+"]").forEach(function(o){var r=o.getAttribute(e),s=n(r),a=i(r),c=a[s],u={DOMElement:o,bus:t};new c(u)})};t.RayNS.Watcher=n}(window),function(t){t.RayNS=t.RayNS||{};var n=function(){this._init()};n.prototype._init=function(){this.topics={},this.id=0},n.prototype.on=function(t,n){return this.topics[t]||(this.topics[t]=[]),this.id++,this.topics[t].push({id:this.id,callback:n}),this.id},n.prototype.off=function(t){for(var n in this.topics){if(!this.topics[n])return!1;for(var i=0,e=this.topics[n].length;e>i;i++)if(this.topics[n][i].id===t)return this.topics[n].splice(i,1),!0}return!1},n.prototype.end=function(){this._init()},n.prototype.trigger=function(t,n){if(!this.topics[t])return!1;var i=this;return setTimeout(function(){var e=i.topics[t];e&&e.forEach(function(t){t.callback(n)})},0),!0},t.RayNS.EventBus=n}(window),function(t){t.RayNS=t.RayNS||{};var n=function(t){this.eventNamesToListen=t||{document:"DOMContentLoaded",window:"load"},this.raydocument=new RayNS.Document(this.eventNamesToListen),this.eventBus=new RayNS.EventBus};n.prototype.begin=function(){this.raydocument.begin();var t=this;this.raydocument.ready(function(){new RayNS.Watcher(t.eventBus)})},n.prototype.end=function(){this.raydocument.end(),this.eventBus.end()},t.RayNS.Ray=n}(window);var ray=new RayNS.Ray;ray.begin();