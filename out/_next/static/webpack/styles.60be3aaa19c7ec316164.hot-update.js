webpackHotUpdate("styles",{

/***/ "./components/Item/styles.scss":
/*!*************************************!*\
  !*** ./components/Item/styles.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"item":"_1nszNH63BOOWFZCs3Hwupg","fa":"_169iyazV_e68o8n0gfl58S","bgWhite":"_3ngu_k70B0DPHtAceWwHm9"};;
    if (true) {
      var injectCss = function injectCss(prev, href) {
        var link = prev.cloneNode();
        link.href = href;
        link.onload = function() {
          prev.parentNode.removeChild(prev);
        };
        prev.stale = true;
        prev.parentNode.insertBefore(link, prev);
      };
      module.hot.dispose(function() {
        window.__webpack_reload_css__ = true;
      });
      if (window.__webpack_reload_css__) {
        module.hot.__webpack_reload_css__ = false;
        console.log("[HMR] Reloading stylesheets...");
        var prefix = document.location.protocol + '//' + document.location.host;
        document
          .querySelectorAll("link[href][rel=stylesheet]")
          .forEach(function(link) {
            if (!link.href.match(prefix) || link.stale) return;
            injectCss(link, link.href.split("?")[0] + "?unix=1599182941384");
          });
      }
    }
  

/***/ })

})
//# sourceMappingURL=styles.60be3aaa19c7ec316164.hot-update.js.map