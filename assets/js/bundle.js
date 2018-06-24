/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var cardAttract = __webpack_require__(1);

	__webpack_require__(2);

	window.setTimeout(cardAttract, 600);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var mposit = [0, 0];

	document.onmousemove = handleMouseMove;

	function handleMouseMove(event) {
	  mposit = [event.pageX - 500, event.pageY - 500];
	}

	function cardAttract() {
	  var card = document.getElementById('mecard'),
	      shimmer = document.getElementById('shimmer');

	  function renderattract() {
	    card.style.transform = 'rotateX(' + mposit[1] * 0.01 + 'deg) rotateY(' + mposit[0] * -0.01 + 'deg)';
	    shimmer.style.transform = 'translateZ(0px) translateY(' + (mposit[1] * 0.1 - 100) + 'px) translateX(' + mposit[0] * 0.1 + 'px)';

	    window.requestAnimationFrame(renderattract);
	  }
	  window.requestAnimationFrame(renderattract);
	}

	module.exports = cardAttract;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box; }\n\nimg {\n  max-width: 100%; }\n\n:root {\n  background: #f0f0f0;\n  background-color: black;\n  font-family: abel,sans-serif;\n  line-height: 1.4;\n  background-image: linear-gradient(to bottom right, rgba(47, 228, 189, 0.9) 10%, rgba(50, 200, 230, 0.9), rgba(15, 36, 161, 0.9));\n  color: white;\n  color: white;\n  /* text-shadow:0 1px 0 black; */\n  text-fill-color: green; }\n\nh1, h2, h3, h4, h5, h6 {\n  letter-spacing: -1px; }\n\nbody {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 0;\n  margin: 0; }\n\n.threeD {\n  perspective: 400px; }\n\n.center_both {\n  margin: auto;\n  margin-top: auto;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n#shimmer {\n  display: block;\n  position: absolute;\n  top: -10%;\n  left: -20%;\n  right: -20%;\n  bottom: -10%;\n  border-radius: inherit;\n  z-index: 2;\n  transform: translateZ(0px) translateY(-2em);\n  background: radial-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.0001), rgba(255, 255, 255, 0.0001));\n  will-change: transform;\n  transition: transform 150ms; }\n\n.person {\n  border-radius: 200px;\n  position: relative;\n  animation: rotate-it-x .6s 1 ease-out;\n  overflow: hidden;\n  box-shadow: 0 9px 40px rgba(0, 0, 0, 0.2);\n  transform: translateZ(-50px); }\n\n.person img {\n  border-radius: 200px;\n  /* border-bottom-right-radius: 0; */\n  /* border-bottom-left-radius: 0; */\n  display: block; }\n\n.person::after {\n  /* box-shadow:inset 0 2px 1px rgba(0,0,0,.1),inset 0 0 3px 0px rgba(0,0,0,.2); */\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: inherit;\n  z-index: 2; }\n\n.person::before {\n  content: \"\";\n  background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.5) 22%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0));\n  display: block;\n  position: absolute;\n  top: -200px;\n  left: -200px;\n  right: -200px;\n  bottom: -200px;\n  /* z-index:4; */\n  animation: shiny .6s 1 linear;\n  animation-fill-mode: forwards;\n  border-radius: 200px; }\n\n@keyframes shiny {\n  0% {\n    transform: translateX(400px) translateY(400px);\n    opacity: 1; }\n  80% {\n    opacity: 1; }\n  100% {\n    transform: translateX(-100px) translateY(-100px);\n    opacity: 0; } }\n\nh1 {\n  margin: 1em 0 .5em;\n  text-align: center; }\n\n@keyframes in {\n  0% {\n    transform: scale(0.95) translateZ(-100px);\n    opacity: 0.00001; }\n  40% {\n    opacity: 0.0001; }\n  100% {\n    transform: scale(1) translateZ(0px);\n    opacity: 1; } }\n\n@keyframes rotate-it-x {\n  0% {\n    transform: rotateX(30deg) translateZ(-50px); }\n  100% {\n    transform: rotateX(0deg) translateZ(-50px); } }\n\n.card {\n  /* background:white; */\n  animation: in .6s 1 ease-out;\n  position: relative;\n  max-width: 100%;\n  perspective: 400px;\n  /* background:rgba(255,255,255,.1); */\n  border-radius: 4px;\n  margin: 20px;\n  /* padding:20px; */\n  padding-bottom: 20px;\n  /* box-shadow: 0 2px 30px rgba(0,0,0,.1); */\n  transition: transform 150ms;\n  perspective: 400px;\n  transform-style: preserve-3d; }\n\n.card_person {\n  border-top-left-radius: 200px;\n  border-top-right-radius: 200px;\n  border-radius: 200px; }\n\n.person_attributes {\n  list-style: none;\n  padding-left: 0;\n  text-align: center;\n  transform: translateZ(-10px);\n  perspective: 400px;\n  transform-style: preserve-3d; }\n\n.footer {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  /* margin-top:auto; */\n  width: 100%;\n  padding: 1em 1em;\n  -ms-flex-item-align: end;\n  align-self: flex-end;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n\n.footer a {\n  margin: 0 0.5em; }\n\na {\n  color: inherit;\n  opacity: 0.8;\n  text-decoration: none; }\n\nli {\n  transition: transform 150ms;\n  transform-style: preserve-3d;\n  transform: translateZ(-5px); }\n\nli:nth-child(1) {\n  transform: translateZ(-2px); }\n\nli:nth-child(2) {\n  transform: translateZ(-4px); }\n\nli:nth-child(3) {\n  transform: translateZ(-6px); }\n\nli:nth-child(4) {\n  transform: translateZ(-8px); }\n\nli:nth-child(5) {\n  transform: translateZ(-10px); }\n\nli:nth-child(6) {\n  transform: translateZ(-12px); }\n\nli:nth-child(7) {\n  transform: translateZ(-14px); }\n\nli:nth-child(8) {\n  transform: translateZ(-16px); }\n\nli:nth-child(9) {\n  transform: translateZ(-18px); }\n\nli:nth-child(10) {\n  transform: translateZ(-20px); }\n\nli:nth-child(11) {\n  transform: translateZ(-22px); }\n\nli:nth-child(12) {\n  transform: translateZ(-24px); }\n\nli:nth-child(13) {\n  transform: translateZ(-26px); }\n\nli:nth-child(14) {\n  transform: translateZ(-28px); }\n\nli:nth-child(15) {\n  transform: translateZ(-30px); }\n\nli:nth-child(16) {\n  transform: translateZ(-32px); }\n\nli:nth-child(17) {\n  transform: translateZ(-34px); }\n\nli:nth-child(18) {\n  transform: translateZ(-36px); }\n\nli:nth-child(19) {\n  transform: translateZ(-38px); }\n\nli:nth-child(20) {\n  transform: translateZ(-40px); }\n\nli:nth-child(21) {\n  transform: translateZ(-42px); }\n\nli:nth-child(22) {\n  transform: translateZ(-44px); }\n\nli:nth-child(23) {\n  transform: translateZ(-46px); }\n\nli:nth-child(24) {\n  transform: translateZ(-48px); }\n\nli:nth-child(25) {\n  transform: translateZ(-50px); }\n\nli:nth-child(26) {\n  transform: translateZ(-52px); }\n\nli:nth-child(27) {\n  transform: translateZ(-54px); }\n\nli:nth-child(28) {\n  transform: translateZ(-56px); }\n\nli:nth-child(29) {\n  transform: translateZ(-58px); }\n\nli:nth-child(30) {\n  transform: translateZ(-60px); }\n\nli:hover:nth-child(1) {\n  transform: translateZ(3px); }\n\nli:hover:nth-child(2) {\n  transform: translateZ(1px); }\n\nli:hover:nth-child(3) {\n  transform: translateZ(-1px); }\n\nli:hover:nth-child(4) {\n  transform: translateZ(-3px); }\n\nli:hover:nth-child(5) {\n  transform: translateZ(-5px); }\n\nli:hover:nth-child(6) {\n  transform: translateZ(-7px); }\n\nli:hover:nth-child(7) {\n  transform: translateZ(-9px); }\n\nli:hover:nth-child(8) {\n  transform: translateZ(-11px); }\n\nli:hover:nth-child(9) {\n  transform: translateZ(-13px); }\n\nli:hover:nth-child(10) {\n  transform: translateZ(-15px); }\n\nli:hover:nth-child(11) {\n  transform: translateZ(-17px); }\n\nli:hover:nth-child(12) {\n  transform: translateZ(-19px); }\n\nli:hover:nth-child(13) {\n  transform: translateZ(-21px); }\n\nli:hover:nth-child(14) {\n  transform: translateZ(-23px); }\n\nli:hover:nth-child(15) {\n  transform: translateZ(-25px); }\n\nli:hover:nth-child(16) {\n  transform: translateZ(-27px); }\n\nli:hover:nth-child(17) {\n  transform: translateZ(-29px); }\n\nli:hover:nth-child(18) {\n  transform: translateZ(-31px); }\n\nli:hover:nth-child(19) {\n  transform: translateZ(-33px); }\n\nli:hover:nth-child(20) {\n  transform: translateZ(-35px); }\n\nli:hover:nth-child(21) {\n  transform: translateZ(-37px); }\n\nli:hover:nth-child(22) {\n  transform: translateZ(-39px); }\n\nli:hover:nth-child(23) {\n  transform: translateZ(-41px); }\n\nli:hover:nth-child(24) {\n  transform: translateZ(-43px); }\n\nli:hover:nth-child(25) {\n  transform: translateZ(-45px); }\n\nli:hover:nth-child(26) {\n  transform: translateZ(-47px); }\n\nli:hover:nth-child(27) {\n  transform: translateZ(-49px); }\n\nli:hover:nth-child(28) {\n  transform: translateZ(-51px); }\n\nli:hover:nth-child(29) {\n  transform: translateZ(-53px); }\n\nli:hover:nth-child(30) {\n  transform: translateZ(-55px); }\n\na:hover {\n  opacity: 1; }\n\n.starstat {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n.starstat .text {\n  -ms-flex: 1 1 50%;\n  flex: 1 1 50%;\n  text-align: right;\n  margin-right: 0.5em; }\n\n.starstat .stars {\n  -ms-flex: 1 1 50%;\n  flex: 1 1 50%;\n  text-align: left; }\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ })
/******/ ]);