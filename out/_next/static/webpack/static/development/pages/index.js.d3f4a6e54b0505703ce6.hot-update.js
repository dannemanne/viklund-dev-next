webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout/index.js");
/* harmony import */ var _components_Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Grid */ "./components/Grid/index.js");
/* harmony import */ var _components_Item__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Item */ "./components/Item/index.js");





var _jsxFileName = "/Users/daniel/Programmering/viklund-dev-next/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;





var Index =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Index, _React$Component);

  function Index() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Index);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Index).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Index, [{
    key: "render",
    value: function render() {
      return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: this
      }, __jsx("div", {
        style: {
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '0.2rem'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: this
      }, __jsx("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: this
      }, "My Dev Sandbox ", __jsx("small", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: this
      }, "by Daniel Viklund (@dannemanne)"))), __jsx("h2", {
        style: {
          margin: '2rem 0 1rem'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      }, "My Projects"), __jsx(_components_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      }, __jsx(_components_Item__WEBPACK_IMPORTED_MODULE_8__["default"], {
        href: "https://heroic-heritage.viklund.dev",
        icon: "far fa-hand-pointer",
        text: "Click / Idle Game",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      })), __jsx("h2", {
        style: {
          margin: '2rem 0 1rem'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        __self: this
      }, "Server Status"), __jsx(_components_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      }, __jsx(_components_Item__WEBPACK_IMPORTED_MODULE_8__["default"], {
        href: "https://fwgp5pffti.execute-api.ap-east-1.amazonaws.com/default/getServerStatus",
        imageSrc: "/terraria.svg",
        imageWhite: true,
        text: "Terraria",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      })), __jsx("h2", {
        style: {
          margin: '2rem 0 1rem'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }, "Other Sites"), __jsx(_components_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, __jsx(_components_Item__WEBPACK_IMPORTED_MODULE_8__["default"], {
        href: "http://www.dannemanne.com",
        icon: "fa fa-blog",
        text: "My Blog",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      }), __jsx(_components_Item__WEBPACK_IMPORTED_MODULE_8__["default"], {
        href: "https://wiklund.dev",
        icon: "fas fa-user-friends",
        text: "My Brother.dev",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      })));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=index.js.d3f4a6e54b0505703ce6.hot-update.js.map