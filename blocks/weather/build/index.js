/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");





var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      break;
    }

    (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)();
  }

  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_3__.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1, points, index);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses) {
      var isNested = element.parent === children[0]; // in nested rules comments become children of the "auto-inserted" rule
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? children[0].children : // global rule at the root level
      children;

      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];

        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version


        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }

          break;
        }
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var defaultStylisPlugins = [stylis__WEBPACK_IMPORTED_MODULE_5__.prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify,  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_7__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : 0];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_5__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ __webpack_exports__["default"] = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ __webpack_exports__["default"] = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ __webpack_exports__["default"] = (isPropValid);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
});

/* harmony default export */ __webpack_exports__["default"] = (hoistNonReactStatics);


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": function() { return /* binding */ CacheProvider; },
/* harmony export */   "E": function() { return /* binding */ Emotion; },
/* harmony export */   "T": function() { return /* binding */ ThemeContext; },
/* harmony export */   "_": function() { return /* binding */ __unsafe_useEmotionCache; },
/* harmony export */   "a": function() { return /* binding */ ThemeProvider; },
/* harmony export */   "b": function() { return /* binding */ withTheme; },
/* harmony export */   "c": function() { return /* binding */ createEmotionProps; },
/* harmony export */   "h": function() { return /* binding */ hasOwnProperty; },
/* harmony export */   "u": function() { return /* binding */ useTheme; },
/* harmony export */   "w": function() { return /* binding */ withEmotionCache; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");









var hasOwnProperty = {}.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
  key: 'css'
}) : null);

if (true) {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    // the cache will never be null in the browser
    var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

if (true) {
  ThemeContext.displayName = 'EmotionThemeContext';
}

var useTheme = function useTheme() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (outerTheme) {
  return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return (0,_isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["default"])(WithTheme, Component);
}

var getLastPart = function getLastPart(functionName) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};

var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};

var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }

  return undefined;
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
  // the label hasn't already been computed

  if ( true && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.registerStyles)(cache, serialized, isStringTag);
  var rules = (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__.useInsertionEffectAlwaysWithSyncFallback)(function () {
    return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(registeredStyles, undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext));

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, newProps));
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}




/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheProvider": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.C; },
/* harmony export */   "ClassNames": function() { return /* binding */ ClassNames; },
/* harmony export */   "Global": function() { return /* binding */ Global; },
/* harmony export */   "ThemeContext": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T; },
/* harmony export */   "ThemeProvider": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.a; },
/* harmony export */   "__unsafe_useEmotionCache": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__._; },
/* harmony export */   "createElement": function() { return /* binding */ jsx; },
/* harmony export */   "css": function() { return /* binding */ css; },
/* harmony export */   "jsx": function() { return /* binding */ jsx; },
/* harmony export */   "keyframes": function() { return /* binding */ keyframes; },
/* harmony export */   "useTheme": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.u; },
/* harmony export */   "withEmotionCache": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w; },
/* harmony export */   "withTheme": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.b; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-6a883da9.browser.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");












var pkg = {
	name: "@emotion/react",
	version: "11.10.4",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	exports: {
		".": {
			module: {
				worker: "./dist/emotion-react.worker.esm.js",
				browser: "./dist/emotion-react.browser.esm.js",
				"default": "./dist/emotion-react.esm.js"
			},
			"default": "./dist/emotion-react.cjs.js"
		},
		"./jsx-runtime": {
			module: {
				worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
				browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
			},
			"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
		},
		"./_isolated-hnrs": {
			module: {
				worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
				browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
			},
			"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
		},
		"./jsx-dev-runtime": {
			module: {
				worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
				browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
			},
			"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
		},
		"./package.json": "./package.json",
		"./types/css-prop": "./types/css-prop.d.ts",
		"./macro": "./macro.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"_isolated-hnrs",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "Emotion Contributors",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.18.3",
		"@emotion/babel-plugin": "^11.10.0",
		"@emotion/cache": "^11.10.0",
		"@emotion/serialize": "^1.1.0",
		"@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
		"@emotion/utils": "^1.2.0",
		"@emotion/weak-memoize": "^0.3.0",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.18.5",
		"@definitelytyped/dtslint": "0.0.112",
		"@emotion/css": "11.10.0",
		"@emotion/css-prettifier": "1.1.0",
		"@emotion/server": "11.10.0",
		"@emotion/styled": "11.10.4",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1",
		typescript: "^4.5.5"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./_isolated-hnrs.js"
		],
		umdName: "emotionReact",
		exports: {
			envConditions: [
				"browser",
				"worker"
			],
			extra: {
				"./types/css-prop": "./types/css-prop.d.ts",
				"./macro": "./macro.js"
			}
		}
	}
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.h.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.E;
  createElementArgArray[1] = (0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)([styles], undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectWithLayoutFallback)(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectWithLayoutFallback)(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (true) {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if ( true && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  var rules = (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectAlwaysWithSyncFallback)(function () {

    for (var i = 0; i < serializedArr.length; i++) {
      var res = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serializedArr[i], false);
    }
  });

  return null;
};

var ClassNames = /* #__PURE__ */(0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.registerStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

if (true) {
  ClassNames.displayName = 'EmotionClassNames';
}

if (true) {
  var isBrowser = "object" !== 'undefined'; // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined';

  if (isBrowser && !isJest) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    var globalContext = // $FlowIgnore
    typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
    : isBrowser ? window : __webpack_require__.g;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}




/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": function() { return /* binding */ serializeStyles; }
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": function() { return /* binding */ StyleSheet; }
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");








var testOmitPropsOnStringTag = _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__["default"];

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.registerStyles)(cache, serialized, isStringTag);
  var rules = (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_5__.useInsertionEffectAlwaysWithSyncFallback)(function () {
    return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.insertStyles)(cache, serialized, isStringTag);
  });

  return null;
};

var createStyled = function createStyled(tag, options) {
  if (true) {
    if (tag === undefined) {
      throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
    }
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if ( true && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        if ( true && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_6__.w)(function (props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_emotion_react__WEBPACK_IMPORTED_MODULE_6__.T);
      }

      if (typeof props.className === 'string') {
        className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.getRegisteredStyles)(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if ( // $FlowFixMe
        finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;
      newProps.ref = ref;
      return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Insertion, {
        cache: cache,
        serialized: serialized,
        isStringTag: typeof FinalTag === 'string'
      }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "development" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };

    return Styled;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createStyled);


/***/ }),

/***/ "./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");
/* harmony import */ var _base_dist_emotion_styled_base_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/dist/emotion-styled-base.browser.esm.js */ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");









var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled = _base_dist_emotion_styled_base_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__["default"].bind();
tags.forEach(function (tagName) {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName);
});

/* harmony default export */ __webpack_exports__["default"] = (newStyled);


/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js ***!
  \***********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInsertionEffectAlwaysWithSyncFallback": function() { return /* binding */ useInsertionEffectAlwaysWithSyncFallback; },
/* harmony export */   "useInsertionEffectWithLayoutFallback": function() { return /* binding */ useInsertionEffectWithLayoutFallback; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);



var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback =  useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;




/***/ }),

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
/* harmony export */   "insertStyles": function() { return /* binding */ insertStyles; },
/* harmony export */   "registerStyles": function() { return /* binding */ registerStyles; }
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (weakMemoize);


/***/ }),

/***/ "./node_modules/@mui/base/ModalUnstyled/ModalManager.js":
/*!**************************************************************!*\
  !*** ./node_modules/@mui/base/ModalUnstyled/ModalManager.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ariaHidden": function() { return /* binding */ ariaHidden; },
/* harmony export */   "default": function() { return /* binding */ ModalManager; }
/* harmony export */ });
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/ownerDocument.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/ownerWindow.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/getScrollbarSize.js");


// Is a vertical scrollbar displayed?
function isOverflowing(container) {
  const doc = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"])(container);

  if (doc.body === container) {
    return (0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(container).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

function ariaHidden(element, show) {
  if (show) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(element) {
  return parseInt((0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(element).getComputedStyle(element).paddingRight, 10) || 0;
}

function isAriaHiddenForbiddenOnElement(element) {
  // The forbidden HTML tags are the ones from ARIA specification that
  // can be children of body and can't have aria-hidden attribute.
  // cf. https://www.w3.org/TR/html-aria/#docconformance
  const forbiddenTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE', 'LINK', 'MAP', 'META', 'NOSCRIPT', 'PICTURE', 'COL', 'COLGROUP', 'PARAM', 'SLOT', 'SOURCE', 'TRACK'];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === 'INPUT' && element.getAttribute('type') === 'hidden';
  return isForbiddenTagName || isInputHidden;
}

function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, element => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);

    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}

function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }

    return false;
  });
  return idx;
}

function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"])(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: 'padding-right',
        el: container
      }); // Use computed style, here to get the real padding to add our scrollbar width.

      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`; // .mui-fixed is a global helper.

      const fixedElements = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"])(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedElements, element => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: 'padding-right',
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }

    let scrollContainer;

    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"])(container).body;
    } else {
      // Improve Gatsby support
      // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
      const parent = container.parentElement;
      const containerWindow = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === 'HTML' && containerWindow.getComputedStyle(parent).overflowY === 'scroll' ? parent : container;
    } // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.


    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: 'overflow',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: 'overflow-x',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: 'overflow-y',
      el: scrollContainer
    });
    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, element => {
    if (element.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
class ModalManager {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }

  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);

    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal); // If the modal we are adding is already in the DOM.

    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, item => item.container === container);

    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }

  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(modal, ariaHiddenState = true) {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1); // If that was the last modal in a container, clean up the container.

    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, ariaHiddenState);
      }

      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1]; // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null

      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    return modalIndex;
  }

  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }

}

/***/ }),

/***/ "./node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/useForkRef.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/ownerDocument.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/useEventCallback.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/createChainedFunction.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/elementAcceptingRef.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/HTMLElementType.js");
/* harmony import */ var _composeClasses__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../composeClasses */ "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js");
/* harmony import */ var _Portal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Portal */ "./node_modules/@mui/base/Portal/Portal.js");
/* harmony import */ var _ModalManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ModalManager */ "./node_modules/@mui/base/ModalUnstyled/ModalManager.js");
/* harmony import */ var _TrapFocus__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../TrapFocus */ "./node_modules/@mui/base/TrapFocus/TrapFocus.js");
/* harmony import */ var _modalUnstyledClasses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modalUnstyledClasses */ "./node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils */ "./node_modules/@mui/base/utils/useSlotProps.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const _excluded = ["children", "classes", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "onTransitionEnter", "onTransitionExited"];












const useUtilityClasses = ownerState => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ['root', !open && exited && 'hidden']
  };
  return (0,_composeClasses__WEBPACK_IMPORTED_MODULE_4__["default"])(slots, _modalUnstyledClasses__WEBPACK_IMPORTED_MODULE_5__.getModalUtilityClass, classes);
};

function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
} // A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.


const defaultManager = new _ModalManager__WEBPACK_IMPORTED_MODULE_6__["default"]();
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/material-ui/api/dialog/)
 * - [Drawer](/material-ui/api/drawer/)
 * - [Menu](/material-ui/api/menu/)
 * - [Popover](/material-ui/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */

const ModalUnstyled = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function ModalUnstyled(props, ref) {
  var _props$ariaHidden;

  const {
    children,
    classes: classesProp,
    closeAfterTransition = false,
    component = 'div',
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    // private
    // eslint-disable-next-line react/prop-types
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onKeyDown,
    open,

    /* eslint-disable react/prop-types */
    onTransitionEnter,
    onTransitionExited
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, _excluded);

  const [exited, setExited] = react__WEBPACK_IMPORTED_MODULE_2__.useState(true);
  const modal = react__WEBPACK_IMPORTED_MODULE_2__.useRef({});
  const mountNodeRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(null);
  const modalRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(null);
  const handleRef = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_7__["default"])(modalRef, ref);
  const hasTransition = getHasTransition(props);
  const ariaHiddenProp = (_props$ariaHidden = props['aria-hidden']) != null ? _props$ariaHidden : true;

  const getDoc = () => (0,_mui_utils__WEBPACK_IMPORTED_MODULE_8__["default"])(mountNodeRef.current);

  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    }); // Fix a bug on Chrome where the scroll isn't initially 0.

    modalRef.current.scrollTop = 0;
  };

  const handleOpen = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_9__["default"])(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer); // The element was already mounted.

    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = react__WEBPACK_IMPORTED_MODULE_2__.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_9__["default"])(node => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (open && isTopModal()) {
      handleMounted();
    } else {
      (0,_ModalManager__WEBPACK_IMPORTED_MODULE_6__.ariaHidden)(modalRef.current, ariaHiddenProp);
    }
  });
  const handleClose = react__WEBPACK_IMPORTED_MODULE_2__.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [manager, ariaHiddenProp]);
  react__WEBPACK_IMPORTED_MODULE_2__.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  react__WEBPACK_IMPORTED_MODULE_2__.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted
  });

  const classes = useUtilityClasses(ownerState);

  const handleEnter = () => {
    setExited(false);

    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };

  const handleExited = () => {
    setExited(true);

    if (onTransitionExited) {
      onTransitionExited();
    }

    if (closeAfterTransition) {
      handleClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const handleKeyDown = event => {
    if (onKeyDown) {
      onKeyDown(event);
    } // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.


    if (event.key !== 'Escape' || !isTopModal()) {
      return;
    }

    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();

      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
    }
  };

  const childProps = {};

  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1';
  } // It's a Transition like component


  if (hasTransition) {
    childProps.onEnter = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_10__["default"])(handleEnter, children.props.onEnter);
    childProps.onExited = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_10__["default"])(handleExited, children.props.onExited);
  }

  const Root = components.Root || component;
  const rootProps = (0,_utils__WEBPACK_IMPORTED_MODULE_11__["default"])({
    elementType: Root,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRef,
      role: 'presentation',
      onKeyDown: handleKeyDown
    },
    className: classes.root,
    ownerState
  });
  const BackdropComponent = components.Backdrop;
  const backdropProps = (0,_utils__WEBPACK_IMPORTED_MODULE_11__["default"])({
    elementType: BackdropComponent,
    externalSlotProps: componentsProps.backdrop,
    additionalProps: {
      'aria-hidden': true,
      onClick: handleBackdropClick,
      open
    },
    ownerState
  });

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Portal__WEBPACK_IMPORTED_MODULE_12__["default"], {
    ref: handlePortalRef,
    container: container,
    disablePortal: disablePortal,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Root, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rootProps, {
      children: [!hideBackdrop && BackdropComponent ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(BackdropComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, backdropProps)) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TrapFocus__WEBPACK_IMPORTED_MODULE_13__["default"], {
        disableEnforceFocus: disableEnforceFocus,
        disableAutoFocus: disableAutoFocus,
        disableRestoreFocus: disableRestoreFocus,
        isEnabled: isTopModal,
        open: open,
        children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.cloneElement(children, childProps)
      })]
    }))
  });
});
 true ? ModalUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A single child content element.
   */
  children: _mui_utils__WEBPACK_IMPORTED_MODULE_14__["default"].isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object),

  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().elementType),

  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: prop_types__WEBPACK_IMPORTED_MODULE_15___default().shape({
    Backdrop: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().elementType),
    Root: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().elementType)
  }),

  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  componentsProps: prop_types__WEBPACK_IMPORTED_MODULE_15___default().shape({
    backdrop: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_15___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object)]),
    root: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_15___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object)])
  }),

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([_mui_utils__WEBPACK_IMPORTED_MODULE_16__["default"], (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func)]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func),

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func),

  /**
   * @ignore
   */
  onKeyDown: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func),

  /**
   * If `true`, the component is shown.
   */
  open: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool.isRequired)
} : 0;
/* harmony default export */ __webpack_exports__["default"] = (ModalUnstyled);

/***/ }),

/***/ "./node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getModalUtilityClass": function() { return /* binding */ getModalUtilityClass; }
/* harmony export */ });
/* harmony import */ var _generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../generateUtilityClasses */ "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js");
/* harmony import */ var _generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateUtilityClass */ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");


function getModalUtilityClass(slot) {
  return (0,_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__["default"])('MuiModal', slot);
}
const modalUnstyledClasses = (0,_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__["default"])('MuiModal', ['root', 'hidden']);
/* harmony default export */ __webpack_exports__["default"] = (modalUnstyledClasses);

/***/ }),

/***/ "./node_modules/@mui/base/Portal/Portal.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/base/Portal/Portal.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/useForkRef.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/useEnhancedEffect.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/setRef.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/HTMLElementType.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/exactProp.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}
/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */


const Portal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Portal(props, ref) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const handleRef = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children) ? children.ref : null, ref);
  (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(() => {
    if (mountNode && !disablePortal) {
      (0,_mui_utils__WEBPACK_IMPORTED_MODULE_5__["default"])(ref, mountNode);
      return () => {
        (0,_mui_utils__WEBPACK_IMPORTED_MODULE_5__["default"])(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, disablePortal]);

  if (disablePortal) {
    if ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, {
        ref: handleRef
      });
    }

    return children;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: mountNode ? /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(children, mountNode) : mountNode
  });
});
 true ? Portal.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The children to render into the `container`.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOfType([_mui_utils__WEBPACK_IMPORTED_MODULE_7__["default"], (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)]),

  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool)
} : 0;

if (true) {
  // eslint-disable-next-line
  Portal['propTypes' + ''] = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_8__["default"])(Portal.propTypes);
}

/* harmony default export */ __webpack_exports__["default"] = (Portal);

/***/ }),

/***/ "./node_modules/@mui/base/TrapFocus/TrapFocus.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mui/base/TrapFocus/TrapFocus.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/useForkRef.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/ownerDocument.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/elementAcceptingRef.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/exactProp.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* eslint-disable consistent-return, jsx-a11y/no-noninteractive-tabindex */


 // Inspired by https://github.com/focus-trap/tabbable



const candidatesSelector = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'].join(',');

function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  } // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.


  if (node.contentEditable === 'true' || (node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }

  return node.tabIndex;
}

function isNonTabbableRadio(node) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') {
    return false;
  }

  if (!node.name) {
    return false;
  }

  const getRadio = selector => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);

  let roving = getRadio(`[name="${node.name}"]:checked`);

  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }

  return roving !== node;
}

function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === 'INPUT' && node.type === 'hidden' || isNonTabbableRadio(node)) {
    return false;
  }

  return true;
}

function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);

    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }

    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map(a => a.node).concat(regularTabNodes);
}

function defaultIsEnabled() {
  return true;
}
/**
 * Utility component that locks focus inside the component.
 */


function TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  const sentinelStart = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const sentinelEnd = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const nodeToRestore = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const reactFocusEventTarget = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null); // This variable is useful when disableAutoFocus is true.
  // It waits for the active element to move into the component to activate.

  const activated = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const rootRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const handleRef = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__["default"])(children.ref, rootRef);
  const lastKeydown = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_3__["default"])(rootRef.current);

    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        if (true) {
          console.error(['MUI: The modal content node does not accept focus.', 'For the benefit of assistive technologies, ' + 'the tabIndex of the node is being set to "-1".'].join('\n'));
        }

        rootRef.current.setAttribute('tabIndex', -1);
      }

      if (activated.current) {
        rootRef.current.focus();
      }
    }

    return () => {
      // restoreLastFocus()
      if (!disableRestoreFocus) {
        // In IE11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE11 have a focus method.
        // Once IE11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }

        nodeToRestore.current = null;
      }
    }; // Missing `disableRestoreFocus` which is fine.
    // We don't support changing that prop on an open TrapFocus
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_3__["default"])(rootRef.current);

    const contain = nativeEvent => {
      const {
        current: rootElement
      } = rootRef; // Cleanup functions are executed lazily in React 17.
      // Contain can be called between the component being unmounted and its cleanup function being run.

      if (rootElement === null) {
        return;
      }

      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (!rootElement.contains(doc.activeElement)) {
        // if the focus event is not coming from inside the children's react tree, reset the refs
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }

        if (!activated.current) {
          return;
        }

        let tabbable = [];

        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }

        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;

          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === 'Tab');
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];

          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };

    const loopFocus = nativeEvent => {
      lastKeydown.current = nativeEvent;

      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== 'Tab') {
        return;
      } // Make sure the next tab starts from the right place.
      // doc.activeElement referes to the origin.


      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };

    doc.addEventListener('focusin', contain);
    doc.addEventListener('keydown', loopFocus, true); // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY element.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.

    const interval = setInterval(() => {
      if (doc.activeElement.tagName === 'BODY') {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener('focusin', contain);
      doc.removeEventListener('keydown', loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);

  const onFocus = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }

    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;

    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };

  const handleFocusSentinel = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }

    activated.current = true;
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}

 true ? TrapFocus.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A single child content element.
   */
  children: _mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"],

  /**
   * If `true`, the trap focus will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any trap focus children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),

  /**
   * If `true`, the trap focus will not prevent focus from leaving the trap focus while open.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),

  /**
   * If `true`, the trap focus will not restore focus to previously focused element once
   * trap focus is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),

  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),

  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple trap focus mounted at the same time.
   * @default function defaultIsEnabled() {
   *   return true;
   * }
   */
  isEnabled: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),

  /**
   * If `true`, focus is locked.
   */
  open: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool.isRequired)
} : 0;

if (true) {
  // eslint-disable-next-line
  TrapFocus['propTypes' + ''] = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_6__["default"])(TrapFocus.propTypes);
}

/* harmony default export */ __webpack_exports__["default"] = (TrapFocus);

/***/ }),

/***/ "./node_modules/@mui/base/utils/appendOwnerState.js":
/*!**********************************************************!*\
  !*** ./node_modules/@mui/base/utils/appendOwnerState.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ appendOwnerState; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _isHostComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isHostComponent */ "./node_modules/@mui/base/utils/isHostComponent.js");


/**
 * Type of the ownerState based on the type of an element it applies to.
 * This resolves to the provided OwnerState for React components and `undefined` for host components.
 * Falls back to `OwnerState | undefined` when the exact type can't be determined in development time.
 */

/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node, `ownerState` is not applied.
 * @param otherProps Props of the element.
 * @param ownerState
 */
function appendOwnerState(elementType, otherProps = {}, ownerState) {
  if ((0,_isHostComponent__WEBPACK_IMPORTED_MODULE_1__["default"])(elementType)) {
    return otherProps;
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, otherProps, {
    ownerState: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, otherProps.ownerState, ownerState)
  });
}

/***/ }),

/***/ "./node_modules/@mui/base/utils/extractEventHandlers.js":
/*!**************************************************************!*\
  !*** ./node_modules/@mui/base/utils/extractEventHandlers.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ extractEventHandlers; }
/* harmony export */ });
/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 * @param excludeKeys An array of keys to exclude from the returned object.
 */
function extractEventHandlers(object, excludeKeys = []) {
  if (object === undefined) {
    return {};
  }

  const result = {};
  Object.keys(object).filter(prop => prop.match(/^on[A-Z]/) && typeof object[prop] === 'function' && !excludeKeys.includes(prop)).forEach(prop => {
    result[prop] = object[prop];
  });
  return result;
}

/***/ }),

/***/ "./node_modules/@mui/base/utils/isHostComponent.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/base/utils/isHostComponent.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
function isHostComponent(element) {
  return typeof element === 'string';
}

/* harmony default export */ __webpack_exports__["default"] = (isHostComponent);

/***/ }),

/***/ "./node_modules/@mui/base/utils/mergeSlotProps.js":
/*!********************************************************!*\
  !*** ./node_modules/@mui/base/utils/mergeSlotProps.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergeSlotProps; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _extractEventHandlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractEventHandlers */ "./node_modules/@mui/base/utils/extractEventHandlers.js");
/* harmony import */ var _omitEventHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./omitEventHandlers */ "./node_modules/@mui/base/utils/omitEventHandlers.js");





/**
 * Merges the slot component internal props (usually coming from a hook)
 * with the externally provided ones.
 *
 * The merge order is (the latter overrides the former):
 * 1. The internal props (specified as a getter function to work with get*Props hook result)
 * 2. Additional props (specified internally on an unstyled component)
 * 3. External props specified on the owner component. These should only be used on a root slot.
 * 4. External props specified in the `componentsProps.*` prop.
 * 5. The `className` prop - combined from all the above.
 * @param parameters
 * @returns
 */
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;

  if (!getSlotProps) {
    // The simpler case - getSlotProps is not defined, so no internal event handlers are defined,
    // so we can simply merge all the props without having to worry about extracting event handlers.
    const joinedClasses = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className, className, additionalProps == null ? void 0 : additionalProps.className);

    const mergedStyle = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);

    const props = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, additionalProps, externalForwardedProps, externalSlotProps);

    if (joinedClasses.length > 0) {
      props.className = joinedClasses;
    }

    if (Object.keys(mergedStyle).length > 0) {
      props.style = mergedStyle;
    }

    return {
      props,
      internalRef: undefined
    };
  } // In this case, getSlotProps is responsible for calling the external event handlers.
  // We don't need to include them in the merged props because of this.


  const eventHandlers = (0,_extractEventHandlers__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = (0,_omitEventHandlers__WEBPACK_IMPORTED_MODULE_3__["default"])(externalSlotProps);
  const otherPropsWithoutEventHandlers = (0,_omitEventHandlers__WEBPACK_IMPORTED_MODULE_3__["default"])(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers); // The order of classes is important here.
  // Emotion (that we use in libraries consuming MUI Base) depends on this order
  // to properly override style. It requires the most important classes to be last
  // (see https://github.com/mui/material-ui/pull/33205) for the related discussion.

  const joinedClasses = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);

  const mergedStyle = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);

  const props = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);

  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }

  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }

  return {
    props,
    internalRef: internalSlotProps.ref
  };
}

/***/ }),

/***/ "./node_modules/@mui/base/utils/omitEventHandlers.js":
/*!***********************************************************!*\
  !*** ./node_modules/@mui/base/utils/omitEventHandlers.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ omitEventHandlers; }
/* harmony export */ });
/**
 * Removes event handlers from the given object.
 * A field is considered an event handler if it is a function with a name beginning with `on`.
 *
 * @param object Object to remove event handlers from.
 * @returns Object with event handlers removed.
 */
function omitEventHandlers(object) {
  if (object === undefined) {
    return {};
  }

  const result = {};
  Object.keys(object).filter(prop => !(prop.match(/^on[A-Z]/) && typeof object[prop] === 'function')).forEach(prop => {
    result[prop] = object[prop];
  });
  return result;
}

/***/ }),

/***/ "./node_modules/@mui/base/utils/resolveComponentProps.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mui/base/utils/resolveComponentProps.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ resolveComponentProps; }
/* harmony export */ });
/**
 * If `componentProps` is a function, calls it with the provided `ownerState`.
 * Otherwise, just returns `componentProps`.
 */
function resolveComponentProps(componentProps, ownerState) {
  if (typeof componentProps === 'function') {
    return componentProps(ownerState);
  }

  return componentProps;
}

/***/ }),

/***/ "./node_modules/@mui/base/utils/useSlotProps.js":
/*!******************************************************!*\
  !*** ./node_modules/@mui/base/utils/useSlotProps.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useSlotProps; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/useForkRef.js");
/* harmony import */ var _appendOwnerState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./appendOwnerState */ "./node_modules/@mui/base/utils/appendOwnerState.js");
/* harmony import */ var _mergeSlotProps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mergeSlotProps */ "./node_modules/@mui/base/utils/mergeSlotProps.js");
/* harmony import */ var _resolveComponentProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolveComponentProps */ "./node_modules/@mui/base/utils/resolveComponentProps.js");


const _excluded = ["elementType", "externalSlotProps", "ownerState"];





/**
 * Builds the props to be passed into the slot of an unstyled component.
 * It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
 * If the slot component is not a host component, it also merges in the `ownerState`.
 *
 * @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
 */
function useSlotProps(parameters) {
  var _parameters$additiona;

  const {
    elementType,
    externalSlotProps,
    ownerState
  } = parameters,
        rest = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(parameters, _excluded);

  const resolvedComponentsProps = (0,_resolveComponentProps__WEBPACK_IMPORTED_MODULE_2__["default"])(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = (0,_mergeSlotProps__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(internalRef, (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref));
  const props = (0,_appendOwnerState__WEBPACK_IMPORTED_MODULE_5__["default"])(elementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/Backdrop/Backdrop.js":
/*!*************************************************************!*\
  !*** ./node_modules/@mui/material/esm/Backdrop/Backdrop.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js");
/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/styled */ "./node_modules/@mui/material/esm/styles/styled.js");
/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/useThemeProps */ "./node_modules/@mui/material/esm/styles/useThemeProps.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Fade */ "./node_modules/@mui/material/esm/Fade/Fade.js");
/* harmony import */ var _backdropClasses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./backdropClasses */ "./node_modules/@mui/material/esm/Backdrop/backdropClasses.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const _excluded = ["children", "component", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];










const useUtilityClasses = ownerState => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ['root', invisible && 'invisible']
  };
  return (0,_mui_base__WEBPACK_IMPORTED_MODULE_5__["default"])(slots, _backdropClasses__WEBPACK_IMPORTED_MODULE_6__.getBackdropUtilityClass, classes);
};

const BackdropRoot = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_7__["default"])('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.invisible && styles.invisible];
  }
})(({
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent'
}, ownerState.invisible && {
  backgroundColor: 'transparent'
}));
const Backdrop = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Backdrop(inProps, ref) {
  var _components$Root, _componentsProps$root;

  const props = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_8__["default"])({
    props: inProps,
    name: 'MuiBackdrop'
  });

  const {
    children,
    component = 'div',
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = _Fade__WEBPACK_IMPORTED_MODULE_9__["default"]
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);

  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    component,
    invisible
  });

  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(TransitionComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BackdropRoot, {
      "aria-hidden": true,
      as: (_components$Root = components.Root) != null ? _components$Root : component,
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className),
      ownerState: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, ownerState, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState),
      classes: classes,
      ref: ref,
      children: children
    })
  }));
});
 true ? Backdrop.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().node),

  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object),

  /**
   * @ignore
   */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().string),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().elementType),

  /**
   * The components used for each slot inside the Backdrop.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: prop_types__WEBPACK_IMPORTED_MODULE_10___default().shape({
    Root: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().elementType)
  }),

  /**
   * The props used for each slot inside the Backdrop.
   * @default {}
   */
  componentsProps: prop_types__WEBPACK_IMPORTED_MODULE_10___default().shape({
    root: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object)
  }),

  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool),

  /**
   * If `true`, the component is shown.
   */
  open: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool.isRequired),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_10___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_10___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_10___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object)]),

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: prop_types__WEBPACK_IMPORTED_MODULE_10___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_10___default().number), prop_types__WEBPACK_IMPORTED_MODULE_10___default().shape({
    appear: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().number),
    enter: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().number),
    exit: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().number)
  })])
} : 0;
/* harmony default export */ __webpack_exports__["default"] = (Backdrop);

/***/ }),

/***/ "./node_modules/@mui/material/esm/Backdrop/backdropClasses.js":
/*!********************************************************************!*\
  !*** ./node_modules/@mui/material/esm/Backdrop/backdropClasses.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBackdropUtilityClass": function() { return /* binding */ getBackdropUtilityClass; }
/* harmony export */ });
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js");

function getBackdropUtilityClass(slot) {
  return (0,_mui_base__WEBPACK_IMPORTED_MODULE_0__["default"])('MuiBackdrop', slot);
}
const backdropClasses = (0,_mui_base__WEBPACK_IMPORTED_MODULE_1__["default"])('MuiBackdrop', ['root', 'invisible']);
/* harmony default export */ __webpack_exports__["default"] = (backdropClasses);

/***/ }),

/***/ "./node_modules/@mui/material/esm/Box/Box.js":
/*!***************************************************!*\
  !*** ./node_modules/@mui/material/esm/Box/Box.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/createBox.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _className__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../className */ "./node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles */ "./node_modules/@mui/material/esm/styles/createTheme.js");




const defaultTheme = (0,_styles__WEBPACK_IMPORTED_MODULE_0__["default"])();
const Box = (0,_mui_system__WEBPACK_IMPORTED_MODULE_1__["default"])({
  defaultTheme,
  defaultClassName: 'MuiBox-root',
  generateClassName: _className__WEBPACK_IMPORTED_MODULE_2__["default"].generate
});
 true ? Box.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().elementType),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_3___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)])
} : 0;
/* harmony default export */ __webpack_exports__["default"] = (Box);

/***/ }),

/***/ "./node_modules/@mui/material/esm/Fade/Fade.js":
/*!*****************************************************!*\
  !*** ./node_modules/@mui/material/esm/Fade/Fade.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/elementAcceptingRef.js");
/* harmony import */ var _styles_useTheme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/useTheme */ "./node_modules/@mui/material/esm/styles/useTheme.js");
/* harmony import */ var _transitions_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../transitions/utils */ "./node_modules/@mui/material/esm/transitions/utils.js");
/* harmony import */ var _utils_useForkRef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/useForkRef */ "./node_modules/@mui/material/esm/utils/useForkRef.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const _excluded = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];








const styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
/**
 * The Fade transition is used by the [Modal](/material-ui/react-modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

const Fade = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Fade(props, ref) {
  const theme = (0,_styles_useTheme__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = react_transition_group__WEBPACK_IMPORTED_MODULE_5__["default"]
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, _excluded);

  const enableStrictModeCompat = true;
  const nodeRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(null);
  const foreignRef = (0,_utils_useForkRef__WEBPACK_IMPORTED_MODULE_6__["default"])(children.ref, ref);
  const handleRef = (0,_utils_useForkRef__WEBPACK_IMPORTED_MODULE_6__["default"])(nodeRef, foreignRef);

  const normalizedTransitionCallback = callback => maybeIsAppearing => {
    if (callback) {
      const node = nodeRef.current; // onEnterXxx and onExitXxx callbacks have a different arguments.length value.

      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };

  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    (0,_transitions_utils__WEBPACK_IMPORTED_MODULE_7__.reflow)(node); // So the animation always start from the start.

    const transitionProps = (0,_transitions_utils__WEBPACK_IMPORTED_MODULE_7__.getTransitionProps)({
      style,
      timeout,
      easing
    }, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback(node => {
    const transitionProps = (0,_transitions_utils__WEBPACK_IMPORTED_MODULE_7__.getTransitionProps)({
      style,
      timeout,
      easing
    }, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);

  const handleAddEndListener = next => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next);
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TransitionComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    appear: appear,
    in: inProp,
    nodeRef: enableStrictModeCompat ? nodeRef : undefined,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout
  }, other, {
    children: (state, childProps) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.cloneElement(children, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        style: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          opacity: 0,
          visibility: state === 'exited' && !inProp ? 'hidden' : undefined
        }, styles[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
 true ? Fade.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),

  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /**
   * A single child content element.
   */
  children: _mui_utils__WEBPACK_IMPORTED_MODULE_9__["default"].isRequired,

  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_8___default().shape({
    enter: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),
    exit: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string)
  }), (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string)]),

  /**
   * If `true`, the component will transition in.
   */
  in: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /**
   * @ignore
   */
  onEnter: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),

  /**
   * @ignore
   */
  onEntered: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),

  /**
   * @ignore
   */
  onEntering: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),

  /**
   * @ignore
   */
  onExit: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),

  /**
   * @ignore
   */
  onExited: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),

  /**
   * @ignore
   */
  onExiting: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),

  /**
   * @ignore
   */
  style: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().object),

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_8___default().number), prop_types__WEBPACK_IMPORTED_MODULE_8___default().shape({
    appear: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().number),
    enter: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().number),
    exit: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().number)
  })])
} : 0;
/* harmony default export */ __webpack_exports__["default"] = (Fade);

/***/ }),

/***/ "./node_modules/@mui/material/esm/Modal/Modal.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mui/material/esm/Modal/Modal.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalClasses": function() { return /* binding */ modalClasses; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _mui_base_ModalUnstyled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/base/ModalUnstyled */ "./node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js");
/* harmony import */ var _mui_base_ModalUnstyled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/base/ModalUnstyled */ "./node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js");
/* harmony import */ var _mui_base_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/base/utils */ "./node_modules/@mui/base/utils/resolveComponentProps.js");
/* harmony import */ var _mui_base_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/base/utils */ "./node_modules/@mui/base/utils/isHostComponent.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/elementAcceptingRef.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/HTMLElementType.js");
/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/styled */ "./node_modules/@mui/material/esm/styles/styled.js");
/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/useThemeProps */ "./node_modules/@mui/material/esm/styles/useThemeProps.js");
/* harmony import */ var _Backdrop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Backdrop */ "./node_modules/@mui/material/esm/Backdrop/Backdrop.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const _excluded = ["BackdropComponent", "BackdropProps", "closeAfterTransition", "children", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "theme"];









const modalClasses = _mui_base_ModalUnstyled__WEBPACK_IMPORTED_MODULE_4__["default"];

const extendUtilityClasses = ownerState => {
  return ownerState.classes;
};

const ModalRoot = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_5__["default"])('div', {
  name: 'MuiModal',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.open && ownerState.exited && styles.hidden];
  }
})(({
  theme,
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
  position: 'fixed',
  zIndex: (theme.vars || theme).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: 'hidden'
}));
const ModalBackdrop = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_5__["default"])(_Backdrop__WEBPACK_IMPORTED_MODULE_6__["default"], {
  name: 'MuiModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => {
    return styles.backdrop;
  }
})({
  zIndex: -1
});
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/material-ui/api/dialog/)
 * - [Drawer](/material-ui/api/drawer/)
 * - [Menu](/material-ui/api/menu/)
 * - [Popover](/material-ui/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */

const Modal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Modal(inProps, ref) {
  var _ref, _components$Root;

  const props = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_7__["default"])({
    name: 'MuiModal',
    props: inProps
  });

  const {
    BackdropComponent = ModalBackdrop,
    BackdropProps,
    closeAfterTransition = false,
    children,
    component,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    // eslint-disable-next-line react/prop-types
    theme
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);

  const [exited, setExited] = react__WEBPACK_IMPORTED_MODULE_2__.useState(true);
  const commonProps = {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };

  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, commonProps, {
    exited
  });

  const classes = extendUtilityClasses(ownerState);
  const Root = (_ref = (_components$Root = components.Root) != null ? _components$Root : component) != null ? _ref : ModalRoot;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_base_ModalUnstyled__WEBPACK_IMPORTED_MODULE_8__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    components: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      Root,
      Backdrop: BackdropComponent
    }, components),
    componentsProps: {
      root: () => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, (0,_mui_base_utils__WEBPACK_IMPORTED_MODULE_9__["default"])(componentsProps.root, ownerState), !(0,_mui_base_utils__WEBPACK_IMPORTED_MODULE_10__["default"])(Root) && {
        as: component,
        theme
      }),
      backdrop: () => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, BackdropProps, (0,_mui_base_utils__WEBPACK_IMPORTED_MODULE_9__["default"])(componentsProps.backdrop, ownerState))
    },
    onTransitionEnter: () => setExited(false),
    onTransitionExited: () => setExited(true),
    ref: ref
  }, other, {
    classes: classes
  }, commonProps, {
    children: children
  }));
});
 true ? Modal.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `components.Backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `components.Backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType),

  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `componentsProps.backdrop` instead.
   */
  BackdropProps: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),

  /**
   * A single child content element.
   */
  children: _mui_utils__WEBPACK_IMPORTED_MODULE_12__["default"].isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),

  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType),

  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: prop_types__WEBPACK_IMPORTED_MODULE_11___default().shape({
    Backdrop: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType),
    Root: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType)
  }),

  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  componentsProps: prop_types__WEBPACK_IMPORTED_MODULE_11___default().shape({
    backdrop: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)]),
    root: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)])
  }),

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([_mui_utils__WEBPACK_IMPORTED_MODULE_13__["default"], (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func)]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func),

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func),

  /**
   * If `true`, the component is shown.
   */
  open: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool.isRequired),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)])
} : 0;
/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./node_modules/@mui/material/esm/Typography/Typography.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@mui/material/esm/Typography/Typography.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypographyRoot": function() { return /* binding */ TypographyRoot; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js");
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js");
/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/styled */ "./node_modules/@mui/material/esm/styles/styled.js");
/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/useThemeProps */ "./node_modules/@mui/material/esm/styles/useThemeProps.js");
/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/capitalize */ "./node_modules/@mui/material/esm/utils/capitalize.js");
/* harmony import */ var _typographyClasses__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./typographyClasses */ "./node_modules/@mui/material/esm/Typography/typographyClasses.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const _excluded = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];











const useUtilityClasses = ownerState => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && `align${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(align)}`, gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return (0,_mui_base__WEBPACK_IMPORTED_MODULE_6__["default"])(slots, _typographyClasses__WEBPACK_IMPORTED_MODULE_7__.getTypographyUtilityClass, classes);
};

const TypographyRoot = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__["default"])('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles[`align${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(({
  theme,
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
  margin: 0
}, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== 'inherit' && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}, ownerState.gutterBottom && {
  marginBottom: '0.35em'
}, ownerState.paragraph && {
  marginBottom: 16
}));
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
}; // TODO v6: deprecate these color values in v5.x and remove the transformation in v6

const colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};

const transformDeprecatedColors = color => {
  return colorTransformations[color] || color;
};

const Typography = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Typography(inProps, ref) {
  const themeProps = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_9__["default"])({
    props: inProps,
    name: 'MuiTypography'
  });
  const color = transformDeprecatedColors(themeProps.color);
  const props = (0,_mui_system__WEBPACK_IMPORTED_MODULE_10__["default"])((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, themeProps, {
    color
  }));

  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);

  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });

  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(TypographyRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    as: Component,
    ref: ref,
    ownerState: ownerState,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className)
  }, other));
});
 true ? Typography.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The content of the component.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().node),

  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),

  /**
   * @ignore
   */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType),

  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)]),

  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string)]),

  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)
} : 0;
/* harmony default export */ __webpack_exports__["default"] = (Typography);

/***/ }),

/***/ "./node_modules/@mui/material/esm/Typography/typographyClasses.js":
/*!************************************************************************!*\
  !*** ./node_modules/@mui/material/esm/Typography/typographyClasses.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTypographyUtilityClass": function() { return /* binding */ getTypographyUtilityClass; }
/* harmony export */ });
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js");

function getTypographyUtilityClass(slot) {
  return (0,_mui_base__WEBPACK_IMPORTED_MODULE_0__["default"])('MuiTypography', slot);
}
const typographyClasses = (0,_mui_base__WEBPACK_IMPORTED_MODULE_1__["default"])('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);
/* harmony default export */ __webpack_exports__["default"] = (typographyClasses);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/blue.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/blue.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#2962ff'
};
/* harmony default export */ __webpack_exports__["default"] = (blue);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/common.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/common.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const common = {
  black: '#000',
  white: '#fff'
};
/* harmony default export */ __webpack_exports__["default"] = (common);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/green.js":
/*!********************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/green.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const green = {
  50: '#e8f5e9',
  100: '#c8e6c9',
  200: '#a5d6a7',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  600: '#43a047',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20',
  A100: '#b9f6ca',
  A200: '#69f0ae',
  A400: '#00e676',
  A700: '#00c853'
};
/* harmony default export */ __webpack_exports__["default"] = (green);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/grey.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/grey.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#f5f5f5',
  A200: '#eeeeee',
  A400: '#bdbdbd',
  A700: '#616161'
};
/* harmony default export */ __webpack_exports__["default"] = (grey);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/lightBlue.js":
/*!************************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/lightBlue.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const lightBlue = {
  50: '#e1f5fe',
  100: '#b3e5fc',
  200: '#81d4fa',
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  600: '#039be5',
  700: '#0288d1',
  800: '#0277bd',
  900: '#01579b',
  A100: '#80d8ff',
  A200: '#40c4ff',
  A400: '#00b0ff',
  A700: '#0091ea'
};
/* harmony default export */ __webpack_exports__["default"] = (lightBlue);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/orange.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/orange.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const orange = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
  A100: '#ffd180',
  A200: '#ffab40',
  A400: '#ff9100',
  A700: '#ff6d00'
};
/* harmony default export */ __webpack_exports__["default"] = (orange);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/purple.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/purple.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const purple = {
  50: '#f3e5f5',
  100: '#e1bee7',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0',
  600: '#8e24aa',
  700: '#7b1fa2',
  800: '#6a1b9a',
  900: '#4a148c',
  A100: '#ea80fc',
  A200: '#e040fb',
  A400: '#d500f9',
  A700: '#aa00ff'
};
/* harmony default export */ __webpack_exports__["default"] = (purple);

/***/ }),

/***/ "./node_modules/@mui/material/esm/colors/red.js":
/*!******************************************************!*\
  !*** ./node_modules/@mui/material/esm/colors/red.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const red = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
  A100: '#ff8a80',
  A200: '#ff5252',
  A400: '#ff1744',
  A700: '#d50000'
};
/* harmony default export */ __webpack_exports__["default"] = (red);

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/createMixins.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/createMixins.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createMixins; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");

function createMixins(breakpoints, mixins) {
  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    toolbar: {
      minHeight: 56,
      [breakpoints.up('xs')]: {
        '@media (orientation: landscape)': {
          minHeight: 48
        }
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  }, mixins);
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/createPalette.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/createPalette.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dark": function() { return /* binding */ dark; },
/* harmony export */   "default": function() { return /* binding */ createPalette; },
/* harmony export */   "light": function() { return /* binding */ light; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/deepmerge.js");
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/colorManipulator.js");
/* harmony import */ var _colors_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../colors/common */ "./node_modules/@mui/material/esm/colors/common.js");
/* harmony import */ var _colors_grey__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../colors/grey */ "./node_modules/@mui/material/esm/colors/grey.js");
/* harmony import */ var _colors_purple__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../colors/purple */ "./node_modules/@mui/material/esm/colors/purple.js");
/* harmony import */ var _colors_red__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../colors/red */ "./node_modules/@mui/material/esm/colors/red.js");
/* harmony import */ var _colors_orange__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../colors/orange */ "./node_modules/@mui/material/esm/colors/orange.js");
/* harmony import */ var _colors_blue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../colors/blue */ "./node_modules/@mui/material/esm/colors/blue.js");
/* harmony import */ var _colors_lightBlue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../colors/lightBlue */ "./node_modules/@mui/material/esm/colors/lightBlue.js");
/* harmony import */ var _colors_green__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../colors/green */ "./node_modules/@mui/material/esm/colors/green.js");



const _excluded = ["mode", "contrastThreshold", "tonalOffset"];










const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: _colors_common__WEBPACK_IMPORTED_MODULE_2__["default"].white,
    default: _colors_common__WEBPACK_IMPORTED_MODULE_2__["default"].white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
const dark = {
  text: {
    primary: _colors_common__WEBPACK_IMPORTED_MODULE_2__["default"].white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212'
  },
  action: {
    active: _colors_common__WEBPACK_IMPORTED_MODULE_2__["default"].white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__.lighten)(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__.darken)(intent.main, tonalOffsetDark);
    }
  }
}

function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: _colors_blue__WEBPACK_IMPORTED_MODULE_4__["default"][200],
      light: _colors_blue__WEBPACK_IMPORTED_MODULE_4__["default"][50],
      dark: _colors_blue__WEBPACK_IMPORTED_MODULE_4__["default"][400]
    };
  }

  return {
    main: _colors_blue__WEBPACK_IMPORTED_MODULE_4__["default"][700],
    light: _colors_blue__WEBPACK_IMPORTED_MODULE_4__["default"][400],
    dark: _colors_blue__WEBPACK_IMPORTED_MODULE_4__["default"][800]
  };
}

function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: _colors_purple__WEBPACK_IMPORTED_MODULE_5__["default"][200],
      light: _colors_purple__WEBPACK_IMPORTED_MODULE_5__["default"][50],
      dark: _colors_purple__WEBPACK_IMPORTED_MODULE_5__["default"][400]
    };
  }

  return {
    main: _colors_purple__WEBPACK_IMPORTED_MODULE_5__["default"][500],
    light: _colors_purple__WEBPACK_IMPORTED_MODULE_5__["default"][300],
    dark: _colors_purple__WEBPACK_IMPORTED_MODULE_5__["default"][700]
  };
}

function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: _colors_red__WEBPACK_IMPORTED_MODULE_6__["default"][500],
      light: _colors_red__WEBPACK_IMPORTED_MODULE_6__["default"][300],
      dark: _colors_red__WEBPACK_IMPORTED_MODULE_6__["default"][700]
    };
  }

  return {
    main: _colors_red__WEBPACK_IMPORTED_MODULE_6__["default"][700],
    light: _colors_red__WEBPACK_IMPORTED_MODULE_6__["default"][400],
    dark: _colors_red__WEBPACK_IMPORTED_MODULE_6__["default"][800]
  };
}

function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: _colors_lightBlue__WEBPACK_IMPORTED_MODULE_7__["default"][400],
      light: _colors_lightBlue__WEBPACK_IMPORTED_MODULE_7__["default"][300],
      dark: _colors_lightBlue__WEBPACK_IMPORTED_MODULE_7__["default"][700]
    };
  }

  return {
    main: _colors_lightBlue__WEBPACK_IMPORTED_MODULE_7__["default"][700],
    light: _colors_lightBlue__WEBPACK_IMPORTED_MODULE_7__["default"][500],
    dark: _colors_lightBlue__WEBPACK_IMPORTED_MODULE_7__["default"][900]
  };
}

function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: _colors_green__WEBPACK_IMPORTED_MODULE_8__["default"][400],
      light: _colors_green__WEBPACK_IMPORTED_MODULE_8__["default"][300],
      dark: _colors_green__WEBPACK_IMPORTED_MODULE_8__["default"][700]
    };
  }

  return {
    main: _colors_green__WEBPACK_IMPORTED_MODULE_8__["default"][800],
    light: _colors_green__WEBPACK_IMPORTED_MODULE_8__["default"][500],
    dark: _colors_green__WEBPACK_IMPORTED_MODULE_8__["default"][900]
  };
}

function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: _colors_orange__WEBPACK_IMPORTED_MODULE_9__["default"][400],
      light: _colors_orange__WEBPACK_IMPORTED_MODULE_9__["default"][300],
      dark: _colors_orange__WEBPACK_IMPORTED_MODULE_9__["default"][700]
    };
  }

  return {
    main: '#ed6c02',
    // closest to orange[800] that pass 3:1.
    light: _colors_orange__WEBPACK_IMPORTED_MODULE_9__["default"][500],
    dark: _colors_orange__WEBPACK_IMPORTED_MODULE_9__["default"][900]
  };
}

function createPalette(palette) {
  const {
    mode = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(palette, _excluded);

  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode); // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54

  function getContrastText(background) {
    const contrastText = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__.getContrastRatio)(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;

    if (true) {
      const contrast = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__.getContrastRatio)(background, contrastText);

      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, 'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n'));
      }
    }

    return contrastText;
  }

  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, color);

    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }

    if (!color.hasOwnProperty('main')) {
      throw new Error( true ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : 0);
    }

    if (typeof color.main !== 'string') {
      throw new Error( true ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : 0);
    }

    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);

    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }

    return color;
  };

  const modes = {
    dark,
    light
  };

  if (true) {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }

  const paletteOutput = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_10__["default"])((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    // A collection of common colors.
    common: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _colors_common__WEBPACK_IMPORTED_MODULE_2__["default"]),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: 'primary'
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: 'secondary',
      mainShade: 'A400',
      lightShade: 'A200',
      darkShade: 'A700'
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: 'error'
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: 'warning'
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: 'info'
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: 'success'
    }),
    // The grey colors.
    grey: _colors_grey__WEBPACK_IMPORTED_MODULE_11__["default"],
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/createTheme.js":
/*!**************************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/createTheme.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMuiTheme": function() { return /* binding */ createMuiTheme; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/deepmerge.js");
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/createTheme/createTheme.js");
/* harmony import */ var _createMixins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createMixins */ "./node_modules/@mui/material/esm/styles/createMixins.js");
/* harmony import */ var _createPalette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPalette */ "./node_modules/@mui/material/esm/styles/createPalette.js");
/* harmony import */ var _createTypography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createTypography */ "./node_modules/@mui/material/esm/styles/createTypography.js");
/* harmony import */ var _shadows__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shadows */ "./node_modules/@mui/material/esm/styles/shadows.js");
/* harmony import */ var _createTransitions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./createTransitions */ "./node_modules/@mui/material/esm/styles/createTransitions.js");
/* harmony import */ var _zIndex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./zIndex */ "./node_modules/@mui/material/esm/styles/zIndex.js");



const _excluded = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];










function createTheme(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(options, _excluded);

  if (options.vars) {
    throw new Error( true ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : 0);
  }

  const palette = (0,_createPalette__WEBPACK_IMPORTED_MODULE_2__["default"])(paletteInput);
  const systemTheme = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__["default"])(options);
  let muiTheme = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(systemTheme, {
    mixins: (0,_createMixins__WEBPACK_IMPORTED_MODULE_5__["default"])(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: _shadows__WEBPACK_IMPORTED_MODULE_6__["default"].slice(),
    typography: (0,_createTypography__WEBPACK_IMPORTED_MODULE_7__["default"])(palette, typographyInput),
    transitions: (0,_createTransitions__WEBPACK_IMPORTED_MODULE_8__["default"])(transitionsInput),
    zIndex: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _zIndex__WEBPACK_IMPORTED_MODULE_9__["default"])
  });
  muiTheme = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(acc, argument), muiTheme);

  if (true) {
    const stateClasses = ['active', 'checked', 'completed', 'disabled', 'error', 'expanded', 'focused', 'focusVisible', 'required', 'selected'];

    const traverse = (node, component) => {
      let key; // eslint-disable-next-line guard-for-in, no-restricted-syntax

      for (key in node) {
        const child = node[key];

        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (true) {
            const stateClass = (0,_mui_base__WEBPACK_IMPORTED_MODULE_10__["default"])('', key);
            console.error([`MUI: The \`${component}\` component increases ` + `the CSS specificity of the \`${key}\` internal state.`, 'You can not override it like this: ', JSON.stringify(node, null, 2), '', `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), '', 'https://mui.com/r/state-classes-guide'].join('\n'));
          } // Remove the style to prevent global conflicts.


          node[key] = {};
        }
      }
    };

    Object.keys(muiTheme.components).forEach(component => {
      const styleOverrides = muiTheme.components[component].styleOverrides;

      if (styleOverrides && component.indexOf('Mui') === 0) {
        traverse(styleOverrides, component);
      }
    });
  }

  return muiTheme;
}

let warnedOnce = false;
function createMuiTheme(...args) {
  if (true) {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(['MUI: the createMuiTheme function was renamed to createTheme.', '', "You should use `import { createTheme } from '@mui/material/styles'`"].join('\n'));
    }
  }

  return createTheme(...args);
}
/* harmony default export */ __webpack_exports__["default"] = (createTheme);

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/createTransitions.js":
/*!********************************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/createTransitions.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createTransitions; },
/* harmony export */   "duration": function() { return /* binding */ duration; },
/* harmony export */   "easing": function() { return /* binding */ easing; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");


const _excluded = ["duration", "easing", "delay"];
// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
}; // Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing

const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};

function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}

function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }

  const constant = height / 36; // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10

  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

function createTransitions(inputTransitions) {
  const mergedEasing = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, easing, inputTransitions.easing);

  const mergedDuration = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, duration, inputTransitions.duration);

  const create = (props = ['all'], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options,
          other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(options, _excluded);

    if (true) {
      const isString = value => typeof value === 'string'; // IE11 support, replace with Number.isNaN
      // eslint-disable-next-line no-restricted-globals


      const isNumber = value => !isNaN(parseFloat(value));

      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }

      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }

      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }

      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }

      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(',')}].`);
      }
    }

    return (Array.isArray(props) ? props : [props]).map(animatedProp => `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`).join(',');
  };

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/createTypography.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/createTypography.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createTypography; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/deepmerge.js");


const _excluded = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];


function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const caseAllCaps = {
  textTransform: 'uppercase'
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
/**
 * @see @link{https://material.io/design/typography/the-type-system.html}
 * @see @link{https://material.io/design/typography/understanding-typography.html}
 */

function createTypography(palette, typography) {
  const _ref = typeof typography === 'function' ? typography(palette) : typography,
        {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2
  } = _ref,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  if (true) {
    if (typeof fontSize !== 'number') {
      console.error('MUI: `fontSize` is required to be a number.');
    }

    if (typeof htmlFontSize !== 'number') {
      console.error('MUI: `htmlFontSize` is required to be a number.');
    }
  }

  const coef = fontSize / 14;

  const pxToRem = pxToRem2 || (size => `${size / htmlFontSize * coef}rem`);

  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight
  }, fontFamily === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing / size)}em`
  } : {}, casing, allVariants);

  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return (0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false // No need to clone deep

  });
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/defaultTheme.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/defaultTheme.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTheme */ "./node_modules/@mui/material/esm/styles/createTheme.js");

const defaultTheme = (0,_createTheme__WEBPACK_IMPORTED_MODULE_0__["default"])();
/* harmony default export */ __webpack_exports__["default"] = (defaultTheme);

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/shadows.js":
/*!**********************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/shadows.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;

function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(',');
} // Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss


const shadows = ['none', createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
/* harmony default export */ __webpack_exports__["default"] = (shadows);

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/styled.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/styled.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rootShouldForwardProp": function() { return /* binding */ rootShouldForwardProp; },
/* harmony export */   "slotShouldForwardProp": function() { return /* binding */ slotShouldForwardProp; }
/* harmony export */ });
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/createStyled.js");
/* harmony import */ var _defaultTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultTheme */ "./node_modules/@mui/material/esm/styles/defaultTheme.js");


const rootShouldForwardProp = prop => (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.shouldForwardProp)(prop) && prop !== 'classes';
const slotShouldForwardProp = _mui_system__WEBPACK_IMPORTED_MODULE_0__.shouldForwardProp;
const styled = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])({
  defaultTheme: _defaultTheme__WEBPACK_IMPORTED_MODULE_1__["default"],
  rootShouldForwardProp
});
/* harmony default export */ __webpack_exports__["default"] = (styled);

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/useTheme.js":
/*!***********************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/useTheme.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useTheme; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/useTheme.js");
/* harmony import */ var _defaultTheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultTheme */ "./node_modules/@mui/material/esm/styles/defaultTheme.js");



function useTheme() {
  const theme = (0,_mui_system__WEBPACK_IMPORTED_MODULE_1__["default"])(_defaultTheme__WEBPACK_IMPORTED_MODULE_2__["default"]);

  if (true) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(theme);
  }

  return theme;
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/useThemeProps.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/useThemeProps.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useThemeProps; }
/* harmony export */ });
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/useThemeProps/useThemeProps.js");
/* harmony import */ var _defaultTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultTheme */ "./node_modules/@mui/material/esm/styles/defaultTheme.js");


function useThemeProps({
  props,
  name
}) {
  return (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])({
    props,
    name,
    defaultTheme: _defaultTheme__WEBPACK_IMPORTED_MODULE_1__["default"]
  });
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/styles/zIndex.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/material/esm/styles/zIndex.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// We need to centralize the zIndex definitions as they work
// like global values in the browser.
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
/* harmony default export */ __webpack_exports__["default"] = (zIndex);

/***/ }),

/***/ "./node_modules/@mui/material/esm/transitions/utils.js":
/*!*************************************************************!*\
  !*** ./node_modules/@mui/material/esm/transitions/utils.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTransitionProps": function() { return /* binding */ getTransitionProps; },
/* harmony export */   "reflow": function() { return /* binding */ reflow; }
/* harmony export */ });
const reflow = node => node.scrollTop;
function getTransitionProps(props, options) {
  var _style$transitionDura, _style$transitionTimi;

  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: (_style$transitionDura = style.transitionDuration) != null ? _style$transitionDura : typeof timeout === 'number' ? timeout : timeout[options.mode] || 0,
    easing: (_style$transitionTimi = style.transitionTimingFunction) != null ? _style$transitionTimi : typeof easing === 'object' ? easing[options.mode] : easing,
    delay: style.transitionDelay
  };
}

/***/ }),

/***/ "./node_modules/@mui/material/esm/utils/capitalize.js":
/*!************************************************************!*\
  !*** ./node_modules/@mui/material/esm/utils/capitalize.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/capitalize.js");

/* harmony default export */ __webpack_exports__["default"] = (_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/@mui/material/esm/utils/useForkRef.js":
/*!************************************************************!*\
  !*** ./node_modules/@mui/material/esm/utils/useForkRef.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/useForkRef.js");

/* harmony default export */ __webpack_exports__["default"] = (_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/@mui/private-theming/useTheme/ThemeContext.js":
/*!********************************************************************!*\
  !*** ./node_modules/@mui/private-theming/useTheme/ThemeContext.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ThemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

if (true) {
  ThemeContext.displayName = 'ThemeContext';
}

/* harmony default export */ __webpack_exports__["default"] = (ThemeContext);

/***/ }),

/***/ "./node_modules/@mui/private-theming/useTheme/useTheme.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mui/private-theming/useTheme/useTheme.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useTheme; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeContext */ "./node_modules/@mui/private-theming/useTheme/ThemeContext.js");


function useTheme() {
  const theme = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_ThemeContext__WEBPACK_IMPORTED_MODULE_1__["default"]);

  if (true) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(theme);
  }

  return theme;
}

/***/ }),

/***/ "./node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GlobalStyles; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

function GlobalStyles(props) {
  const {
    styles,
    defaultTheme = {}
  } = props;
  const globalStyles = typeof styles === 'function' ? themeInput => styles(isEmpty(themeInput) ? defaultTheme : themeInput) : styles;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_2__.Global, {
    styles: globalStyles
  });
}
 true ? GlobalStyles.propTypes = {
  defaultTheme: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object),
  styles: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func)])
} : 0;

/***/ }),

/***/ "./node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ StyledEngineProvider; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



 // prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.


const cache = (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
  key: 'css',
  prepend: true
});
function StyledEngineProvider(props) {
  const {
    injectFirst,
    children
  } = props;
  return injectFirst ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_3__.C, {
    value: cache,
    children: children
  }) : children;
}
 true ? StyledEngineProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().node),

  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool)
} : 0;

/***/ }),

/***/ "./node_modules/@mui/styled-engine/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@mui/styled-engine/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalStyles": function() { return /* reexport safe */ _GlobalStyles__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   "StyledEngineProvider": function() { return /* reexport safe */ _StyledEngineProvider__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "ThemeContext": function() { return /* reexport safe */ _emotion_react__WEBPACK_IMPORTED_MODULE_1__.T; },
/* harmony export */   "css": function() { return /* reexport safe */ _emotion_react__WEBPACK_IMPORTED_MODULE_2__.css; },
/* harmony export */   "default": function() { return /* binding */ styled; },
/* harmony export */   "internal_processStyles": function() { return /* binding */ internal_processStyles; },
/* harmony export */   "keyframes": function() { return /* reexport safe */ _emotion_react__WEBPACK_IMPORTED_MODULE_2__.keyframes; }
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _StyledEngineProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StyledEngineProvider */ "./node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js");
/* harmony import */ var _GlobalStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GlobalStyles */ "./node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js");
/** @license MUI v5.10.4
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-underscore-dangle */

function styled(tag, options) {
  const stylesFactory = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(tag, options);

  if (true) {
    return (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';

      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join('\n'));
      } else if (styles.some(style => style === undefined)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }

      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
} // eslint-disable-next-line @typescript-eslint/naming-convention

const internal_processStyles = (tag, processor) => {
  // Emotion attaches all the styles as `__emotion_styles`.
  // Ref: https://github.com/emotion-js/emotion/blob/16d971d0da229596d6bcc39d282ba9753c9ee7cf/packages/styled/src/base.js#L186
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
};




/***/ }),

/***/ "./node_modules/@mui/system/esm/borders.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/borders.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "border": function() { return /* binding */ border; },
/* harmony export */   "borderBottom": function() { return /* binding */ borderBottom; },
/* harmony export */   "borderBottomColor": function() { return /* binding */ borderBottomColor; },
/* harmony export */   "borderColor": function() { return /* binding */ borderColor; },
/* harmony export */   "borderLeft": function() { return /* binding */ borderLeft; },
/* harmony export */   "borderLeftColor": function() { return /* binding */ borderLeftColor; },
/* harmony export */   "borderRadius": function() { return /* binding */ borderRadius; },
/* harmony export */   "borderRight": function() { return /* binding */ borderRight; },
/* harmony export */   "borderRightColor": function() { return /* binding */ borderRightColor; },
/* harmony export */   "borderTop": function() { return /* binding */ borderTop; },
/* harmony export */   "borderTopColor": function() { return /* binding */ borderTopColor; }
/* harmony export */ });
/* harmony import */ var _responsivePropType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./responsivePropType */ "./node_modules/@mui/system/esm/responsivePropType.js");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");
/* harmony import */ var _spacing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spacing */ "./node_modules/@mui/system/esm/spacing.js");
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./breakpoints */ "./node_modules/@mui/system/esm/breakpoints.js");






function getBorder(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return `${value}px solid`;
}

const border = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder
});
const borderTop = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder
});
const borderRight = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder
});
const borderBottom = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder
});
const borderLeft = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder
});
const borderColor = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderColor',
  themeKey: 'palette'
});
const borderTopColor = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderTopColor',
  themeKey: 'palette'
});
const borderRightColor = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderRightColor',
  themeKey: 'palette'
});
const borderBottomColor = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderBottomColor',
  themeKey: 'palette'
});
const borderLeftColor = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'borderLeftColor',
  themeKey: 'palette'
});
const borderRadius = props => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = (0,_spacing__WEBPACK_IMPORTED_MODULE_1__.createUnaryUnit)(props.theme, 'shape.borderRadius', 4, 'borderRadius');

    const styleFromPropValue = propValue => ({
      borderRadius: (0,_spacing__WEBPACK_IMPORTED_MODULE_1__.getValue)(transformer, propValue)
    });

    return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_2__.handleBreakpoints)(props, props.borderRadius, styleFromPropValue);
  }

  return null;
};
borderRadius.propTypes =  true ? {
  borderRadius: _responsivePropType__WEBPACK_IMPORTED_MODULE_3__["default"]
} : 0;
borderRadius.filterProps = ['borderRadius'];
const borders = (0,_compose__WEBPACK_IMPORTED_MODULE_4__["default"])(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
/* harmony default export */ __webpack_exports__["default"] = (borders);

/***/ }),

/***/ "./node_modules/@mui/system/esm/breakpoints.js":
/*!*****************************************************!*\
  !*** ./node_modules/@mui/system/esm/breakpoints.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeBreakpointsBase": function() { return /* binding */ computeBreakpointsBase; },
/* harmony export */   "createEmptyBreakpointObject": function() { return /* binding */ createEmptyBreakpointObject; },
/* harmony export */   "handleBreakpoints": function() { return /* binding */ handleBreakpoints; },
/* harmony export */   "mergeBreakpointsInOrder": function() { return /* binding */ mergeBreakpointsInOrder; },
/* harmony export */   "removeUnusedBreakpoints": function() { return /* binding */ removeUnusedBreakpoints; },
/* harmony export */   "resolveBreakpointValues": function() { return /* binding */ resolveBreakpointValues; },
/* harmony export */   "values": function() { return /* binding */ values; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/deepmerge.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./merge */ "./node_modules/@mui/system/esm/merge.js");



 // The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.

const values = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screen

};
const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};

  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      // key is breakpoint
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }

      return acc;
    }, {});
  }

  const output = styleFromPropValue(propValue);
  return output;
}

function breakpoints(styleFunction) {
  const newStyleFunction = props => {
    const theme = props.theme || {};
    const base = styleFunction(props);
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    const extended = themeBreakpoints.keys.reduce((acc, key) => {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          theme
        }, props[key]));
      }

      return acc;
    }, null);
    return (0,_merge__WEBPACK_IMPORTED_MODULE_1__["default"])(base, extended);
  };

  newStyleFunction.propTypes =  true ? (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styleFunction.propTypes, {
    xs: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    sm: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    md: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    lg: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    xl: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object)
  }) : 0;
  newStyleFunction.filterProps = ['xs', 'sm', 'md', 'lg', 'xl', ...styleFunction.filterProps];
  return newStyleFunction;
}

function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;

  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;

    if (isBreakpointUnused) {
      delete acc[key];
    }

    return acc;
  }, style);
}
function mergeBreakpointsInOrder(breakpointsInput, ...styles) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce((prev, next) => (0,_mui_utils__WEBPACK_IMPORTED_MODULE_3__["default"])(prev, next), {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
} // compute base for responsive values; e.g.,
// [1,2,3] => {xs: true, sm: true, md: true}
// {xs: 1, sm: 2, md: 3} => {xs: true, sm: true, md: true}

function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  // fixed value
  if (typeof breakpointValues !== 'object') {
    return {};
  }

  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);

  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach(breakpoint => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }

  return base;
}
function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return breakpointValues;
  }

  let previous;
  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === 'object') {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }

    return acc;
  }, {});
}
/* harmony default export */ __webpack_exports__["default"] = (breakpoints);

/***/ }),

/***/ "./node_modules/@mui/system/esm/colorManipulator.js":
/*!**********************************************************!*\
  !*** ./node_modules/@mui/system/esm/colorManipulator.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alpha": function() { return /* binding */ alpha; },
/* harmony export */   "colorChannel": function() { return /* binding */ colorChannel; },
/* harmony export */   "darken": function() { return /* binding */ darken; },
/* harmony export */   "decomposeColor": function() { return /* binding */ decomposeColor; },
/* harmony export */   "emphasize": function() { return /* binding */ emphasize; },
/* harmony export */   "getContrastRatio": function() { return /* binding */ getContrastRatio; },
/* harmony export */   "getLuminance": function() { return /* binding */ getLuminance; },
/* harmony export */   "hexToRgb": function() { return /* binding */ hexToRgb; },
/* harmony export */   "hslToRgb": function() { return /* binding */ hslToRgb; },
/* harmony export */   "lighten": function() { return /* binding */ lighten; },
/* harmony export */   "recomposeColor": function() { return /* binding */ recomposeColor; },
/* harmony export */   "rgbToHex": function() { return /* binding */ rgbToHex; }
/* harmony export */ });


/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value, min = 0, max = 1) {
  if (true) {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }

  return Math.min(Math.max(min, value), max);
}
/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */


function hexToRgb(color) {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map(n => n + n);
  }

  return colors ? `rgb${colors.length === 4 ? 'a' : ''}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
  }).join(', ')})` : '';
}

function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */


function decomposeColor(color) {
  // Idempotent
  if (color.type) {
    return color;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error( true ? `MUI: Unsupported \`${color}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : 0);
  }

  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;

  if (type === 'color') {
    values = values.split(' ');
    colorSpace = values.shift();

    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].slice(1);
    }

    if (['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1) {
      throw new Error( true ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : 0);
    }
  } else {
    values = values.split(',');
  }

  values = values.map(value => parseFloat(value));
  return {
    type,
    values,
    colorSpace
  };
}
/**
 * Returns a channel created from the input color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {string} - The channel for the color, that can be used in rgba or hsla colors
 */

const colorChannel = color => {
  const decomposedColor = decomposeColor(color);
  return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.indexOf('hsl') !== -1 && idx !== 0 ? `${val}%` : val).join(' ');
};
/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */

function recomposeColor(color) {
  const {
    type,
    colorSpace
  } = color;
  let {
    values
  } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  if (type.indexOf('color') !== -1) {
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}
/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */

function rgbToHex(color) {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color;
  }

  const {
    values
  } = decomposeColor(color);
  return `#${values.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join('')}`;
}
/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */

function hslToRgb(color) {
  color = decomposeColor(color);
  const {
    values
  } = color;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);

  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (color.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({
    type,
    values: rgb
  });
}
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */

function getLuminance(color) {
  color = decomposeColor(color);
  let rgb = color.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map(val => {
    if (color.type !== 'color') {
      val /= 255; // normalized
    }

    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  }); // Truncate at 3 digits

  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */

function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function alpha(color, value) {
  color = decomposeColor(color);
  value = clamp(value);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }

  if (color.type === 'color') {
    color.values[3] = `/${value}`;
  } else {
    color.values[3] = value;
  }

  return recomposeColor(color);
}
/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }

  return recomposeColor(color);
}
/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  } else if (color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (1 - color.values[i]) * coefficient;
    }
  }

  return recomposeColor(color);
}
/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/compose.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/compose.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./merge */ "./node_modules/@mui/system/esm/merge.js");


function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach(prop => {
      acc[prop] = style;
    });
    return acc;
  }, {});

  const fn = props => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return (0,_merge__WEBPACK_IMPORTED_MODULE_0__["default"])(acc, handlers[prop](props));
      }

      return acc;
    }, {});
  };

  fn.propTypes =  true ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {}) : 0;
  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);
  return fn;
}

/* harmony default export */ __webpack_exports__["default"] = (compose);

/***/ }),

/***/ "./node_modules/@mui/system/esm/createBox.js":
/*!***************************************************!*\
  !*** ./node_modules/@mui/system/esm/createBox.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createBox; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _mui_styled_engine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/styled-engine */ "./node_modules/@mui/styled-engine/index.js");
/* harmony import */ var _styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styleFunctionSx */ "./node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");
/* harmony import */ var _styleFunctionSx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styleFunctionSx */ "./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js");
/* harmony import */ var _useTheme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useTheme */ "./node_modules/@mui/system/esm/useTheme.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const _excluded = ["className", "component"];






function createBox(options = {}) {
  const {
    defaultTheme,
    defaultClassName = 'MuiBox-root',
    generateClassName,
    styleFunctionSx = _styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__["default"]
  } = options;
  const BoxRoot = (0,_mui_styled_engine__WEBPACK_IMPORTED_MODULE_6__["default"])('div', {
    shouldForwardProp: prop => prop !== 'theme' && prop !== 'sx' && prop !== 'as'
  })(styleFunctionSx);
  const Box = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Box(inProps, ref) {
    const theme = (0,_useTheme__WEBPACK_IMPORTED_MODULE_7__["default"])(defaultTheme);

    const _extendSxProp = (0,_styleFunctionSx__WEBPACK_IMPORTED_MODULE_8__["default"])(inProps),
          {
      className,
      component = 'div'
    } = _extendSxProp,
          other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_extendSxProp, _excluded);

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BoxRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      as: component,
      ref: ref,
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: theme
    }, other));
  });
  return Box;
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/createStyled.js":
/*!******************************************************!*\
  !*** ./node_modules/@mui/system/esm/createStyled.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createStyled; },
/* harmony export */   "shouldForwardProp": function() { return /* binding */ shouldForwardProp; },
/* harmony export */   "systemDefaultTheme": function() { return /* binding */ systemDefaultTheme; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/styled-engine */ "./node_modules/@mui/styled-engine/index.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/getDisplayName.js");
/* harmony import */ var _createTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createTheme */ "./node_modules/@mui/system/esm/createTheme/createTheme.js");
/* harmony import */ var _propsToClassKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propsToClassKey */ "./node_modules/@mui/system/esm/propsToClassKey.js");
/* harmony import */ var _styleFunctionSx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styleFunctionSx */ "./node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");


const _excluded = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"],
      _excluded2 = ["theme"],
      _excluded3 = ["theme"];

/* eslint-disable no-underscore-dangle */






function isEmpty(obj) {
  return Object.keys(obj).length === 0;
} // https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40


function isStringTag(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96;
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const getVariantStyles = (name, theme) => {
  let variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};
  variants.forEach(definition => {
    const key = (0,_propsToClassKey__WEBPACK_IMPORTED_MODULE_2__["default"])(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;

  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(themeVariant => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach(key => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles.push(styles[(0,_propsToClassKey__WEBPACK_IMPORTED_MODULE_2__["default"])(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
}; // Update /system/styled/#api in case if this changes


function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}
const systemDefaultTheme = (0,_createTheme__WEBPACK_IMPORTED_MODULE_3__["default"])();

const lowercaseFirstLetter = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

function createStyled(input = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    styleFunctionSx = _styleFunctionSx__WEBPACK_IMPORTED_MODULE_4__["default"]
  } = input;

  const systemSx = props => {
    const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
    return styleFunctionSx((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
      theme
    }));
  };

  systemSx.__mui_systemSx = true;
  return (tag, inputOptions = {}) => {
    // Filter out the `sx` style function from the previous styled component to prevent unnecessary styles generated by the composite components.
    (0,_mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__.internal_processStyles)(tag, styles => styles.filter(style => !(style != null && style.__mui_systemSx)));

    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions,
          options = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(inputOptions, _excluded); // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.


    const skipVariantsResolver = inputSkipVariantsResolver !== undefined ? inputSkipVariantsResolver : componentSlot && componentSlot !== 'Root' || false;
    const skipSx = inputSkipSx || false;
    let label;

    if (true) {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption = shouldForwardProp;

    if (componentSlot === 'Root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }

    const defaultStyledResolver = (0,_mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__["default"])(tag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));

    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map(stylesArg => {
        // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        return typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg ? _ref => {
          let {
            theme: themeInput
          } = _ref,
              other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded2);

          return stylesArg((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);

          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === 'function' ? slotStyle((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
                theme
              })) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }

          return null;
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill(''); // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.

        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      styleArg.__emotion_real !== styleArg) {
        // If the type is function, we need to define the default theme.
        transformedStyleArg = _ref2 => {
          let {
            theme: themeInput
          } = _ref2,
              other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded3);

          return styleArg((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        };
      }

      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (true) {
        let displayName;

        if (componentName) {
          displayName = `${componentName}${componentSlot || ''}`;
        }

        if (displayName === undefined) {
          displayName = `Styled(${(0,_mui_utils__WEBPACK_IMPORTED_MODULE_6__["default"])(tag)})`;
        }

        Component.displayName = displayName;
      }

      return Component;
    };

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/createTheme/createBreakpoints.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mui/system/esm/createTheme/createBreakpoints.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "breakpointKeys": function() { return /* binding */ breakpointKeys; },
/* harmony export */   "default": function() { return /* binding */ createBreakpoints; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");


const _excluded = ["values", "unit", "step"];
// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'];

const sortBreakpointsValues = values => {
  const breakpointsAsArray = Object.keys(values).map(key => ({
    key,
    val: values[key]
  })) || []; // Sort in ascending order

  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
}; // Keep in mind that @media is inclusive by the CSS specification.


function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536 // large screen

    },
    unit = 'px',
    step = 5
  } = breakpoints,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(breakpoints, _excluded);

  const sortedValues = sortBreakpointsValues(values);
  const keys = Object.keys(sortedValues);

  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` + `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100}${unit})`;
  }

  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  function not(key) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);

    if (keyIndex === 0) {
      return up(keys[1]);
    }

    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }

    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/createTheme/createSpacing.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mui/system/esm/createTheme/createSpacing.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createSpacing; }
/* harmony export */ });
/* harmony import */ var _spacing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../spacing */ "./node_modules/@mui/system/esm/spacing.js");


/* tslint:enable:unified-signatures */
function createSpacing(spacingInput = 8) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  } // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage


  const transform = (0,_spacing__WEBPACK_IMPORTED_MODULE_0__.createUnarySpacing)({
    spacing: spacingInput
  });

  const spacing = (...argsInput) => {
    if (true) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }

    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map(argument => {
      const output = transform(argument);
      return typeof output === 'number' ? `${output}px` : output;
    }).join(' ');
  };

  spacing.mui = true;
  return spacing;
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/createTheme/createTheme.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@mui/system/esm/createTheme/createTheme.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/deepmerge.js");
/* harmony import */ var _createBreakpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createBreakpoints */ "./node_modules/@mui/system/esm/createTheme/createBreakpoints.js");
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shape */ "./node_modules/@mui/system/esm/createTheme/shape.js");
/* harmony import */ var _createSpacing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createSpacing */ "./node_modules/@mui/system/esm/createTheme/createSpacing.js");


const _excluded = ["breakpoints", "palette", "spacing", "shape"];





function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(options, _excluded);

  const breakpoints = (0,_createBreakpoints__WEBPACK_IMPORTED_MODULE_2__["default"])(breakpointsInput);
  const spacing = (0,_createSpacing__WEBPACK_IMPORTED_MODULE_3__["default"])(spacingInput);
  let muiTheme = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])({
    breakpoints,
    direction: 'ltr',
    components: {},
    // Inject component definitions.
    palette: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      mode: 'light'
    }, paletteInput),
    spacing,
    shape: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _shape__WEBPACK_IMPORTED_MODULE_5__["default"], shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => (0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__["default"])(acc, argument), muiTheme);
  return muiTheme;
}

/* harmony default export */ __webpack_exports__["default"] = (createTheme);

/***/ }),

/***/ "./node_modules/@mui/system/esm/createTheme/shape.js":
/*!***********************************************************!*\
  !*** ./node_modules/@mui/system/esm/createTheme/shape.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const shape = {
  borderRadius: 4
};
/* harmony default export */ __webpack_exports__["default"] = (shape);

/***/ }),

/***/ "./node_modules/@mui/system/esm/cssGrid.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/cssGrid.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "columnGap": function() { return /* binding */ columnGap; },
/* harmony export */   "gap": function() { return /* binding */ gap; },
/* harmony export */   "gridArea": function() { return /* binding */ gridArea; },
/* harmony export */   "gridAutoColumns": function() { return /* binding */ gridAutoColumns; },
/* harmony export */   "gridAutoFlow": function() { return /* binding */ gridAutoFlow; },
/* harmony export */   "gridAutoRows": function() { return /* binding */ gridAutoRows; },
/* harmony export */   "gridColumn": function() { return /* binding */ gridColumn; },
/* harmony export */   "gridRow": function() { return /* binding */ gridRow; },
/* harmony export */   "gridTemplateAreas": function() { return /* binding */ gridTemplateAreas; },
/* harmony export */   "gridTemplateColumns": function() { return /* binding */ gridTemplateColumns; },
/* harmony export */   "gridTemplateRows": function() { return /* binding */ gridTemplateRows; },
/* harmony export */   "rowGap": function() { return /* binding */ rowGap; }
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");
/* harmony import */ var _spacing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spacing */ "./node_modules/@mui/system/esm/spacing.js");
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./breakpoints */ "./node_modules/@mui/system/esm/breakpoints.js");
/* harmony import */ var _responsivePropType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./responsivePropType */ "./node_modules/@mui/system/esm/responsivePropType.js");





const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = (0,_spacing__WEBPACK_IMPORTED_MODULE_0__.createUnaryUnit)(props.theme, 'spacing', 8, 'gap');

    const styleFromPropValue = propValue => ({
      gap: (0,_spacing__WEBPACK_IMPORTED_MODULE_0__.getValue)(transformer, propValue)
    });

    return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.handleBreakpoints)(props, props.gap, styleFromPropValue);
  }

  return null;
};
gap.propTypes =  true ? {
  gap: _responsivePropType__WEBPACK_IMPORTED_MODULE_2__["default"]
} : 0;
gap.filterProps = ['gap'];
const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = (0,_spacing__WEBPACK_IMPORTED_MODULE_0__.createUnaryUnit)(props.theme, 'spacing', 8, 'columnGap');

    const styleFromPropValue = propValue => ({
      columnGap: (0,_spacing__WEBPACK_IMPORTED_MODULE_0__.getValue)(transformer, propValue)
    });

    return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.handleBreakpoints)(props, props.columnGap, styleFromPropValue);
  }

  return null;
};
columnGap.propTypes =  true ? {
  columnGap: _responsivePropType__WEBPACK_IMPORTED_MODULE_2__["default"]
} : 0;
columnGap.filterProps = ['columnGap'];
const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = (0,_spacing__WEBPACK_IMPORTED_MODULE_0__.createUnaryUnit)(props.theme, 'spacing', 8, 'rowGap');

    const styleFromPropValue = propValue => ({
      rowGap: (0,_spacing__WEBPACK_IMPORTED_MODULE_0__.getValue)(transformer, propValue)
    });

    return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.handleBreakpoints)(props, props.rowGap, styleFromPropValue);
  }

  return null;
};
rowGap.propTypes =  true ? {
  rowGap: _responsivePropType__WEBPACK_IMPORTED_MODULE_2__["default"]
} : 0;
rowGap.filterProps = ['rowGap'];
const gridColumn = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridColumn'
});
const gridRow = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridRow'
});
const gridAutoFlow = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridAutoFlow'
});
const gridAutoColumns = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridAutoColumns'
});
const gridAutoRows = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridAutoRows'
});
const gridTemplateColumns = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridTemplateColumns'
});
const gridTemplateRows = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridTemplateRows'
});
const gridTemplateAreas = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridTemplateAreas'
});
const gridArea = (0,_style__WEBPACK_IMPORTED_MODULE_3__["default"])({
  prop: 'gridArea'
});
const grid = (0,_compose__WEBPACK_IMPORTED_MODULE_4__["default"])(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
/* harmony default export */ __webpack_exports__["default"] = (grid);

/***/ }),

/***/ "./node_modules/@mui/system/esm/display.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/display.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayPrint": function() { return /* binding */ displayPrint; },
/* harmony export */   "displayRaw": function() { return /* binding */ displayRaw; },
/* harmony export */   "overflow": function() { return /* binding */ overflow; },
/* harmony export */   "textOverflow": function() { return /* binding */ textOverflow; },
/* harmony export */   "visibility": function() { return /* binding */ visibility; },
/* harmony export */   "whiteSpace": function() { return /* binding */ whiteSpace; }
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");


const displayPrint = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value
    }
  })
});
const displayRaw = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'display'
});
const overflow = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'overflow'
});
const textOverflow = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'textOverflow'
});
const visibility = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'visibility'
});
const whiteSpace = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'whiteSpace'
});
/* harmony default export */ __webpack_exports__["default"] = ((0,_compose__WEBPACK_IMPORTED_MODULE_1__["default"])(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace));

/***/ }),

/***/ "./node_modules/@mui/system/esm/flexbox.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/flexbox.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alignContent": function() { return /* binding */ alignContent; },
/* harmony export */   "alignItems": function() { return /* binding */ alignItems; },
/* harmony export */   "alignSelf": function() { return /* binding */ alignSelf; },
/* harmony export */   "flex": function() { return /* binding */ flex; },
/* harmony export */   "flexBasis": function() { return /* binding */ flexBasis; },
/* harmony export */   "flexDirection": function() { return /* binding */ flexDirection; },
/* harmony export */   "flexGrow": function() { return /* binding */ flexGrow; },
/* harmony export */   "flexShrink": function() { return /* binding */ flexShrink; },
/* harmony export */   "flexWrap": function() { return /* binding */ flexWrap; },
/* harmony export */   "justifyContent": function() { return /* binding */ justifyContent; },
/* harmony export */   "justifyItems": function() { return /* binding */ justifyItems; },
/* harmony export */   "justifySelf": function() { return /* binding */ justifySelf; },
/* harmony export */   "order": function() { return /* binding */ order; }
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");


const flexBasis = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'flexBasis'
});
const flexDirection = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'flexDirection'
});
const flexWrap = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'flexWrap'
});
const justifyContent = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'justifyContent'
});
const alignItems = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'alignItems'
});
const alignContent = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'alignContent'
});
const order = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'order'
});
const flex = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'flex'
});
const flexGrow = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'flexGrow'
});
const flexShrink = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'flexShrink'
});
const alignSelf = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'alignSelf'
});
const justifyItems = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'justifyItems'
});
const justifySelf = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'justifySelf'
});
const flexbox = (0,_compose__WEBPACK_IMPORTED_MODULE_1__["default"])(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
/* harmony default export */ __webpack_exports__["default"] = (flexbox);

/***/ }),

/***/ "./node_modules/@mui/system/esm/getThemeValue.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mui/system/esm/getThemeValue.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "propToStyleFunction": function() { return /* binding */ propToStyleFunction; },
/* harmony export */   "styleFunctionMapping": function() { return /* binding */ styleFunctionMapping; }
/* harmony export */ });
/* harmony import */ var _borders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./borders */ "./node_modules/@mui/system/esm/borders.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./node_modules/@mui/system/esm/display.js");
/* harmony import */ var _flexbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flexbox */ "./node_modules/@mui/system/esm/flexbox.js");
/* harmony import */ var _cssGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cssGrid */ "./node_modules/@mui/system/esm/cssGrid.js");
/* harmony import */ var _positions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./positions */ "./node_modules/@mui/system/esm/positions.js");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./palette */ "./node_modules/@mui/system/esm/palette.js");
/* harmony import */ var _shadows__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shadows */ "./node_modules/@mui/system/esm/shadows.js");
/* harmony import */ var _sizing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sizing */ "./node_modules/@mui/system/esm/sizing.js");
/* harmony import */ var _spacing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./spacing */ "./node_modules/@mui/system/esm/spacing.js");
/* harmony import */ var _typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./typography */ "./node_modules/@mui/system/esm/typography.js");










const filterPropsMapping = {
  borders: _borders__WEBPACK_IMPORTED_MODULE_0__["default"].filterProps,
  display: _display__WEBPACK_IMPORTED_MODULE_1__["default"].filterProps,
  flexbox: _flexbox__WEBPACK_IMPORTED_MODULE_2__["default"].filterProps,
  grid: _cssGrid__WEBPACK_IMPORTED_MODULE_3__["default"].filterProps,
  positions: _positions__WEBPACK_IMPORTED_MODULE_4__["default"].filterProps,
  palette: _palette__WEBPACK_IMPORTED_MODULE_5__["default"].filterProps,
  shadows: _shadows__WEBPACK_IMPORTED_MODULE_6__["default"].filterProps,
  sizing: _sizing__WEBPACK_IMPORTED_MODULE_7__["default"].filterProps,
  spacing: _spacing__WEBPACK_IMPORTED_MODULE_8__["default"].filterProps,
  typography: _typography__WEBPACK_IMPORTED_MODULE_9__["default"].filterProps
};
const styleFunctionMapping = {
  borders: _borders__WEBPACK_IMPORTED_MODULE_0__["default"],
  display: _display__WEBPACK_IMPORTED_MODULE_1__["default"],
  flexbox: _flexbox__WEBPACK_IMPORTED_MODULE_2__["default"],
  grid: _cssGrid__WEBPACK_IMPORTED_MODULE_3__["default"],
  positions: _positions__WEBPACK_IMPORTED_MODULE_4__["default"],
  palette: _palette__WEBPACK_IMPORTED_MODULE_5__["default"],
  shadows: _shadows__WEBPACK_IMPORTED_MODULE_6__["default"],
  sizing: _sizing__WEBPACK_IMPORTED_MODULE_7__["default"],
  spacing: _spacing__WEBPACK_IMPORTED_MODULE_8__["default"],
  typography: _typography__WEBPACK_IMPORTED_MODULE_9__["default"]
};
const propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach(propName => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});

function getThemeValue(prop, value, theme) {
  const inputProps = {
    [prop]: value,
    theme
  };
  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : {
    [prop]: value
  };
}

/* harmony default export */ __webpack_exports__["default"] = (getThemeValue);

/***/ }),

/***/ "./node_modules/@mui/system/esm/memoize.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/memoize.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ memoize; }
/* harmony export */ });
function memoize(fn) {
  const cache = {};
  return arg => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/merge.js":
/*!***********************************************!*\
  !*** ./node_modules/@mui/system/esm/merge.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/deepmerge.js");


function merge(acc, item) {
  if (!item) {
    return acc;
  }

  return (0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"])(acc, item, {
    clone: false // No need to clone deep, it's way faster.

  });
}

/* harmony default export */ __webpack_exports__["default"] = (merge);

/***/ }),

/***/ "./node_modules/@mui/system/esm/palette.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/palette.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "backgroundColor": function() { return /* binding */ backgroundColor; },
/* harmony export */   "bgcolor": function() { return /* binding */ bgcolor; },
/* harmony export */   "color": function() { return /* binding */ color; }
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");


const color = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'color',
  themeKey: 'palette'
});
const bgcolor = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette'
});
const backgroundColor = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'backgroundColor',
  themeKey: 'palette'
});
const palette = (0,_compose__WEBPACK_IMPORTED_MODULE_1__["default"])(color, bgcolor, backgroundColor);
/* harmony default export */ __webpack_exports__["default"] = (palette);

/***/ }),

/***/ "./node_modules/@mui/system/esm/positions.js":
/*!***************************************************!*\
  !*** ./node_modules/@mui/system/esm/positions.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bottom": function() { return /* binding */ bottom; },
/* harmony export */   "left": function() { return /* binding */ left; },
/* harmony export */   "position": function() { return /* binding */ position; },
/* harmony export */   "right": function() { return /* binding */ right; },
/* harmony export */   "top": function() { return /* binding */ top; },
/* harmony export */   "zIndex": function() { return /* binding */ zIndex; }
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");


const position = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'position'
});
const zIndex = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
const top = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'top'
});
const right = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'right'
});
const bottom = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'bottom'
});
const left = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'left'
});
/* harmony default export */ __webpack_exports__["default"] = ((0,_compose__WEBPACK_IMPORTED_MODULE_1__["default"])(position, zIndex, top, right, bottom, left));

/***/ }),

/***/ "./node_modules/@mui/system/esm/propsToClassKey.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/system/esm/propsToClassKey.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ propsToClassKey; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/capitalize.js");

const _excluded = ["variant"];


function isEmpty(string) {
  return string.length === 0;
}
/**
 * Generates string classKey based on the properties provided. It starts with the
 * variant if defined, and then it appends all other properties in alphabetical order.
 * @param {object} props - the properties for which the classKey should be created.
 */


function propsToClassKey(props) {
  const {
    variant
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);

  let classKey = variant || '';
  Object.keys(other).sort().forEach(key => {
    if (key === 'color') {
      classKey += isEmpty(classKey) ? props[key] : (0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(props[key]);
    } else {
      classKey += `${isEmpty(classKey) ? key : (0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(key)}${(0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(props[key].toString())}`;
    }
  });
  return classKey;
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/responsivePropType.js":
/*!************************************************************!*\
  !*** ./node_modules/@mui/system/esm/responsivePropType.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

const responsivePropType =  true ? prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().array)]) : 0;
/* harmony default export */ __webpack_exports__["default"] = (responsivePropType);

/***/ }),

/***/ "./node_modules/@mui/system/esm/shadows.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/shadows.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");

const boxShadow = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'boxShadow',
  themeKey: 'shadows'
});
/* harmony default export */ __webpack_exports__["default"] = (boxShadow);

/***/ }),

/***/ "./node_modules/@mui/system/esm/sizing.js":
/*!************************************************!*\
  !*** ./node_modules/@mui/system/esm/sizing.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boxSizing": function() { return /* binding */ boxSizing; },
/* harmony export */   "height": function() { return /* binding */ height; },
/* harmony export */   "maxHeight": function() { return /* binding */ maxHeight; },
/* harmony export */   "maxWidth": function() { return /* binding */ maxWidth; },
/* harmony export */   "minHeight": function() { return /* binding */ minHeight; },
/* harmony export */   "minWidth": function() { return /* binding */ minWidth; },
/* harmony export */   "sizeHeight": function() { return /* binding */ sizeHeight; },
/* harmony export */   "sizeWidth": function() { return /* binding */ sizeWidth; },
/* harmony export */   "width": function() { return /* binding */ width; }
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./breakpoints */ "./node_modules/@mui/system/esm/breakpoints.js");




function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

const width = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'width',
  transform
});
const maxWidth = props => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = propValue => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;

      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || _breakpoints__WEBPACK_IMPORTED_MODULE_1__.values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };

    return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.handleBreakpoints)(props, props.maxWidth, styleFromPropValue);
  }

  return null;
};
maxWidth.filterProps = ['maxWidth'];
const minWidth = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'minWidth',
  transform
});
const height = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'height',
  transform
});
const maxHeight = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'maxHeight',
  transform
});
const minHeight = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'minHeight',
  transform
});
const sizeWidth = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'size',
  cssProperty: 'width',
  transform
});
const sizeHeight = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'size',
  cssProperty: 'height',
  transform
});
const boxSizing = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'boxSizing'
});
const sizing = (0,_compose__WEBPACK_IMPORTED_MODULE_2__["default"])(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
/* harmony default export */ __webpack_exports__["default"] = (sizing);

/***/ }),

/***/ "./node_modules/@mui/system/esm/spacing.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/system/esm/spacing.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createUnarySpacing": function() { return /* binding */ createUnarySpacing; },
/* harmony export */   "createUnaryUnit": function() { return /* binding */ createUnaryUnit; },
/* harmony export */   "getStyleFromPropValue": function() { return /* binding */ getStyleFromPropValue; },
/* harmony export */   "getValue": function() { return /* binding */ getValue; },
/* harmony export */   "margin": function() { return /* binding */ margin; },
/* harmony export */   "padding": function() { return /* binding */ padding; }
/* harmony export */ });
/* harmony import */ var _responsivePropType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./responsivePropType */ "./node_modules/@mui/system/esm/responsivePropType.js");
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./breakpoints */ "./node_modules/@mui/system/esm/breakpoints.js");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./merge */ "./node_modules/@mui/system/esm/merge.js");
/* harmony import */ var _memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memoize */ "./node_modules/@mui/system/esm/memoize.js");





const properties = {
  m: 'margin',
  p: 'padding'
};
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom']
};
const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py'
}; // memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec

const getCssProperties = (0,_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(prop => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
});
const marginKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd'];
const paddingKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd', 'paddingBlock', 'paddingBlockStart', 'paddingBlockEnd'];
const spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;

  const themeSpacing = (_getPath = (0,_style__WEBPACK_IMPORTED_MODULE_1__.getPath)(theme, themeKey, false)) != null ? _getPath : defaultValue;

  if (typeof themeSpacing === 'number') {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (true) {
        if (typeof abs !== 'number') {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }

      return themeSpacing * abs;
    };
  }

  if (Array.isArray(themeSpacing)) {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (true) {
        if (!Number.isInteger(abs)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` + `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join('\n'));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join('\n'));
        }
      }

      return themeSpacing[abs];
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  if (true) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, 'It should be a number, an array or a function.'].join('\n'));
  }

  return () => undefined;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8, 'spacing');
}
function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }

  const abs = Math.abs(propValue);
  const transformed = transformer(abs);

  if (propValue >= 0) {
    return transformed;
  }

  if (typeof transformed === 'number') {
    return -transformed;
  }

  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return propValue => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}

function resolveCssProperty(props, keys, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (keys.indexOf(prop) === -1) {
    return null;
  }

  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_2__.handleBreakpoints)(props, propValue, styleFromPropValue);
}

function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map(prop => resolveCssProperty(props, keys, prop, transformer)).reduce(_merge__WEBPACK_IMPORTED_MODULE_3__["default"], {});
}

function margin(props) {
  return style(props, marginKeys);
}
margin.propTypes =  true ? marginKeys.reduce((obj, key) => {
  obj[key] = _responsivePropType__WEBPACK_IMPORTED_MODULE_4__["default"];
  return obj;
}, {}) : 0;
margin.filterProps = marginKeys;
function padding(props) {
  return style(props, paddingKeys);
}
padding.propTypes =  true ? paddingKeys.reduce((obj, key) => {
  obj[key] = _responsivePropType__WEBPACK_IMPORTED_MODULE_4__["default"];
  return obj;
}, {}) : 0;
padding.filterProps = paddingKeys;

function spacing(props) {
  return style(props, spacingKeys);
}

spacing.propTypes =  true ? spacingKeys.reduce((obj, key) => {
  obj[key] = _responsivePropType__WEBPACK_IMPORTED_MODULE_4__["default"];
  return obj;
}, {}) : 0;
spacing.filterProps = spacingKeys;
/* harmony default export */ __webpack_exports__["default"] = (spacing);

/***/ }),

/***/ "./node_modules/@mui/system/esm/style.js":
/*!***********************************************!*\
  !*** ./node_modules/@mui/system/esm/style.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPath": function() { return /* binding */ getPath; }
/* harmony export */ });
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/capitalize.js");
/* harmony import */ var _responsivePropType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./responsivePropType */ "./node_modules/@mui/system/esm/responsivePropType.js");
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./breakpoints */ "./node_modules/@mui/system/esm/breakpoints.js");



function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== 'string') {
    return null;
  } // Check if CSS variables are used


  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split('.').reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);

    if (val != null) {
      return val;
    }
  }

  return path.split('.').reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }

    return null;
  }, obj);
}

function getValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (transform) {
    value = transform(value);
  }

  return value;
}

function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;

  const fn = props => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};

    const styleFromPropValue = propValueFinal => {
      let value = getValue(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : (0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"])(propValueFinal)}`, propValueFinal);
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value
      };
    };

    return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.handleBreakpoints)(props, propValue, styleFromPropValue);
  };

  fn.propTypes =  true ? {
    [prop]: _responsivePropType__WEBPACK_IMPORTED_MODULE_2__["default"]
  } : 0;
  fn.filterProps = [prop];
  return fn;
}

/* harmony default export */ __webpack_exports__["default"] = (style);

/***/ }),

/***/ "./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ extendSxProp; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/deepmerge.js");
/* harmony import */ var _getThemeValue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getThemeValue */ "./node_modules/@mui/system/esm/getThemeValue.js");


const _excluded = ["sx"];



const splitProps = props => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach(prop => {
    if (_getThemeValue__WEBPACK_IMPORTED_MODULE_2__.propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};

function extendSxProp(props) {
  const {
    sx: inSx
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, _excluded);

  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;

  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === 'function') {
    finalSx = (...args) => {
      const result = inSx(...args);

      if (!(0,_mui_utils__WEBPACK_IMPORTED_MODULE_3__.isPlainObject)(result)) {
        return systemProps;
      }

      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, systemProps, result);
    };
  } else {
    finalSx = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, systemProps, inSx);
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, otherProps, {
    sx: finalSx
  });
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unstable_createStyleFunctionSx": function() { return /* binding */ unstable_createStyleFunctionSx; }
/* harmony export */ });
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../merge */ "./node_modules/@mui/system/esm/merge.js");
/* harmony import */ var _getThemeValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../getThemeValue */ "./node_modules/@mui/system/esm/getThemeValue.js");
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../breakpoints */ "./node_modules/@mui/system/esm/breakpoints.js");




function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
} // eslint-disable-next-line @typescript-eslint/naming-convention


function unstable_createStyleFunctionSx(styleFunctionMapping = _getThemeValue__WEBPACK_IMPORTED_MODULE_0__.styleFunctionMapping) {
  const propToStyleFunction = Object.keys(styleFunctionMapping).reduce((acc, styleFnName) => {
    styleFunctionMapping[styleFnName].filterProps.forEach(propName => {
      acc[propName] = styleFunctionMapping[styleFnName];
    });
    return acc;
  }, {});

  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }

  function styleFunctionSx(props) {
    const {
      sx,
      theme = {}
    } = props || {};

    if (!sx) {
      return null; // Emotion & styled-components will neglect null
    }
    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */


    function traverse(sxInput) {
      let sxObject = sxInput;

      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }

      if (!sxObject) {
        return null;
      }

      const emptyBreakpoints = (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.createEmptyBreakpointObject)(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css = emptyBreakpoints;
      Object.keys(sxObject).forEach(styleKey => {
        const value = callIfFn(sxObject[styleKey], theme);

        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (propToStyleFunction[styleKey]) {
              css = (0,_merge__WEBPACK_IMPORTED_MODULE_2__["default"])(css, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.handleBreakpoints)({
                theme
              }, value, x => ({
                [styleKey]: x
              }));

              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({
                  sx: value,
                  theme
                });
              } else {
                css = (0,_merge__WEBPACK_IMPORTED_MODULE_2__["default"])(css, breakpointsValues);
              }
            }
          } else {
            css = (0,_merge__WEBPACK_IMPORTED_MODULE_2__["default"])(css, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return (0,_breakpoints__WEBPACK_IMPORTED_MODULE_1__.removeUnusedBreakpoints)(breakpointsKeys, css);
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}
const styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ['sx'];
/* harmony default export */ __webpack_exports__["default"] = (styleFunctionSx);

/***/ }),

/***/ "./node_modules/@mui/system/esm/typography.js":
/*!****************************************************!*\
  !*** ./node_modules/@mui/system/esm/typography.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fontFamily": function() { return /* binding */ fontFamily; },
/* harmony export */   "fontSize": function() { return /* binding */ fontSize; },
/* harmony export */   "fontStyle": function() { return /* binding */ fontStyle; },
/* harmony export */   "fontWeight": function() { return /* binding */ fontWeight; },
/* harmony export */   "letterSpacing": function() { return /* binding */ letterSpacing; },
/* harmony export */   "lineHeight": function() { return /* binding */ lineHeight; },
/* harmony export */   "textAlign": function() { return /* binding */ textAlign; },
/* harmony export */   "textTransform": function() { return /* binding */ textTransform; },
/* harmony export */   "typographyVariant": function() { return /* binding */ typographyVariant; }
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose */ "./node_modules/@mui/system/esm/compose.js");


const fontFamily = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'fontFamily',
  themeKey: 'typography'
});
const fontSize = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'fontSize',
  themeKey: 'typography'
});
const fontStyle = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'fontStyle',
  themeKey: 'typography'
});
const fontWeight = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'fontWeight',
  themeKey: 'typography'
});
const letterSpacing = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'letterSpacing'
});
const textTransform = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'textTransform'
});
const lineHeight = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'lineHeight'
});
const textAlign = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'textAlign'
});
const typographyVariant = (0,_style__WEBPACK_IMPORTED_MODULE_0__["default"])({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography'
});
const typography = (0,_compose__WEBPACK_IMPORTED_MODULE_1__["default"])(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
/* harmony default export */ __webpack_exports__["default"] = (typography);

/***/ }),

/***/ "./node_modules/@mui/system/esm/useTheme.js":
/*!**************************************************!*\
  !*** ./node_modules/@mui/system/esm/useTheme.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "systemDefaultTheme": function() { return /* binding */ systemDefaultTheme; }
/* harmony export */ });
/* harmony import */ var _createTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTheme */ "./node_modules/@mui/system/esm/createTheme/createTheme.js");
/* harmony import */ var _useThemeWithoutDefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useThemeWithoutDefault */ "./node_modules/@mui/system/esm/useThemeWithoutDefault.js");


const systemDefaultTheme = (0,_createTheme__WEBPACK_IMPORTED_MODULE_0__["default"])();

function useTheme(defaultTheme = systemDefaultTheme) {
  return (0,_useThemeWithoutDefault__WEBPACK_IMPORTED_MODULE_1__["default"])(defaultTheme);
}

/* harmony default export */ __webpack_exports__["default"] = (useTheme);

/***/ }),

/***/ "./node_modules/@mui/system/esm/useThemeProps/getThemeProps.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@mui/system/esm/useThemeProps/getThemeProps.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getThemeProps; }
/* harmony export */ });
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/resolveProps.js");

function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;

  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }

  return (0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__["default"])(theme.components[name].defaultProps, props);
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/useThemeProps/useThemeProps.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@mui/system/esm/useThemeProps/useThemeProps.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useThemeProps; }
/* harmony export */ });
/* harmony import */ var _getThemeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getThemeProps */ "./node_modules/@mui/system/esm/useThemeProps/getThemeProps.js");
/* harmony import */ var _useTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../useTheme */ "./node_modules/@mui/system/esm/useTheme.js");


function useThemeProps({
  props,
  name,
  defaultTheme
}) {
  const theme = (0,_useTheme__WEBPACK_IMPORTED_MODULE_0__["default"])(defaultTheme);
  const mergedProps = (0,_getThemeProps__WEBPACK_IMPORTED_MODULE_1__["default"])({
    theme,
    name,
    props
  });
  return mergedProps;
}

/***/ }),

/***/ "./node_modules/@mui/system/esm/useThemeWithoutDefault.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mui/system/esm/useThemeWithoutDefault.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_private_theming__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/private-theming */ "./node_modules/@mui/private-theming/useTheme/useTheme.js");


function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useTheme(defaultTheme = null) {
  const contextTheme = (0,_mui_private_theming__WEBPACK_IMPORTED_MODULE_0__["default"])();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

/* harmony default export */ __webpack_exports__["default"] = (useTheme);

/***/ }),

/***/ "./node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const defaultGenerator = componentName => componentName;

const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },

    generate(componentName) {
      return generate(componentName);
    },

    reset() {
      generate = defaultGenerator;
    }

  };
};

const ClassNameGenerator = createClassNameGenerator();
/* harmony default export */ __webpack_exports__["default"] = (ClassNameGenerator);

/***/ }),

/***/ "./node_modules/@mui/utils/esm/HTMLElementType.js":
/*!********************************************************!*\
  !*** ./node_modules/@mui/utils/esm/HTMLElementType.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ HTMLElementType; }
/* harmony export */ });
function HTMLElementType(props, propName, componentName, location, propFullName) {
  if (false) {}

  const propValue = props[propName];
  const safePropName = propFullName || propName;

  if (propValue == null) {
    return null;
  }

  if (propValue && propValue.nodeType !== 1) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` + `Expected an HTMLElement.`);
  }

  return null;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/capitalize.js":
/*!***************************************************!*\
  !*** ./node_modules/@mui/utils/esm/capitalize.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ capitalize; }
/* harmony export */ });

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word in the sentence.
// We only handle the first word.
function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error( true ? `MUI: \`capitalize(string)\` expects a string argument.` : 0);
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/chainPropTypes.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mui/utils/esm/chainPropTypes.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ chainPropTypes; }
/* harmony export */ });
function chainPropTypes(propType1, propType2) {
  if (false) {}

  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mui/utils/esm/composeClasses/composeClasses.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ composeClasses; }
/* harmony export */ });
function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach( // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
  // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
  slot => {
    output[slot] = slots[slot].reduce((acc, key) => {
      if (key) {
        acc.push(getUtilityClass(key));

        if (classes && classes[key]) {
          acc.push(classes[key]);
        }
      }

      return acc;
    }, []).join(' ');
  });
  return output;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/createChainedFunction.js":
/*!**************************************************************!*\
  !*** ./node_modules/@mui/utils/esm/createChainedFunction.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createChainedFunction; }
/* harmony export */ });
/**
 * Safe chained function.
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 */
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }

    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {});
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/deepmerge.js":
/*!**************************************************!*\
  !*** ./node_modules/@mui/utils/esm/deepmerge.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ deepmerge; },
/* harmony export */   "isPlainObject": function() { return /* binding */ isPlainObject; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");

function isPlainObject(item) {
  return item !== null && typeof item === 'object' && item.constructor === Object;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, target) : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/elementAcceptingRef.js":
/*!************************************************************!*\
  !*** ./node_modules/@mui/utils/esm/elementAcceptingRef.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chainPropTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chainPropTypes */ "./node_modules/@mui/utils/esm/chainPropTypes.js");



function isClassComponent(elementType) {
  // elementType.prototype?.isReactComponent
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}

function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;

  if (element == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === 'undefined') {
    return null;
  }

  let warningHint;
  const elementType = element.type;
  /**
   * Blacklisting instead of whitelisting
   *
   * Blacklisting will miss some components, such as React.Fragment. Those will at least
   * trigger a warning in React.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. "Safe" means there's no public API.
   *
   */

  if (typeof elementType === 'function' && !isClassComponent(elementType)) {
    warningHint = 'Did you accidentally use a plain function component for an element instead?';
  }

  if (warningHint !== undefined) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` + `Expected an element that can hold a ref. ${warningHint} ` + 'For more information see https://mui.com/r/caveat-with-refs-guide');
  }

  return null;
}

const elementAcceptingRef = (0,_chainPropTypes__WEBPACK_IMPORTED_MODULE_0__["default"])((prop_types__WEBPACK_IMPORTED_MODULE_1___default().element), acceptingRef);
elementAcceptingRef.isRequired = (0,_chainPropTypes__WEBPACK_IMPORTED_MODULE_0__["default"])((prop_types__WEBPACK_IMPORTED_MODULE_1___default().element.isRequired), acceptingRef);
/* harmony default export */ __webpack_exports__["default"] = (elementAcceptingRef);

/***/ }),

/***/ "./node_modules/@mui/utils/esm/exactProp.js":
/*!**************************************************!*\
  !*** ./node_modules/@mui/utils/esm/exactProp.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ exactProp; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");

// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.
const specialProperty = 'exact-prop: \u200b';
function exactProp(propTypes) {
  if (false) {}

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, propTypes, {
    [specialProperty]: props => {
      const unsupportedProps = Object.keys(props).filter(prop => !propTypes.hasOwnProperty(prop));

      if (unsupportedProps.length > 0) {
        return new Error(`The following props are not supported: ${unsupportedProps.map(prop => `\`${prop}\``).join(', ')}. Please remove them.`);
      }

      return null;
    }
  });
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ generateUtilityClass; }
/* harmony export */ });
/* harmony import */ var _ClassNameGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ClassNameGenerator */ "./node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js");

const globalStateClassesMapping = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  required: 'required',
  selected: 'selected'
};
function generateUtilityClass(componentName, slot, globalStatePrefix = 'Mui') {
  const globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${_ClassNameGenerator__WEBPACK_IMPORTED_MODULE_0__["default"].generate(componentName)}-${slot}`;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ generateUtilityClasses; }
/* harmony export */ });
/* harmony import */ var _generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateUtilityClass */ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");

function generateUtilityClasses(componentName, slots, globalStatePrefix = 'Mui') {
  const result = {};
  slots.forEach(slot => {
    result[slot] = (0,_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__["default"])(componentName, slot, globalStatePrefix);
  });
  return result;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/getDisplayName.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mui/utils/esm/getDisplayName.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDisplayName; },
/* harmony export */   "getFunctionName": function() { return /* binding */ getFunctionName; }
/* harmony export */ });
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-is */ "./node_modules/@mui/utils/node_modules/react-is/index.js");
 // Simplified polyfill for IE11 support
// https://github.com/JamesMGreene/Function.name/blob/58b314d4a983110c3682f1228f845d39ccca1817/Function.name.js#L3

const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn) {
  const match = `${fn}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || '';
}

function getFunctionComponentName(Component, fallback = '') {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}

function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName);
}
/**
 * cherry-pick from
 * https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 * originally forked from recompose/getDisplayName with added IE11 support
 */


function getDisplayName(Component) {
  if (Component == null) {
    return undefined;
  }

  if (typeof Component === 'string') {
    return Component;
  }

  if (typeof Component === 'function') {
    return getFunctionComponentName(Component, 'Component');
  } // TypeScript can't have components as objects but they exist in the form of `memo` or `Suspense`


  if (typeof Component === 'object') {
    switch (Component.$$typeof) {
      case react_is__WEBPACK_IMPORTED_MODULE_0__.ForwardRef:
        return getWrappedName(Component, Component.render, 'ForwardRef');

      case react_is__WEBPACK_IMPORTED_MODULE_0__.Memo:
        return getWrappedName(Component, Component.type, 'memo');

      default:
        return undefined;
    }
  }

  return undefined;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/getScrollbarSize.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/utils/esm/getScrollbarSize.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getScrollbarSize; }
/* harmony export */ });
// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
function getScrollbarSize(doc) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/ownerDocument.js":
/*!******************************************************!*\
  !*** ./node_modules/@mui/utils/esm/ownerDocument.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ownerDocument; }
/* harmony export */ });
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/ownerWindow.js":
/*!****************************************************!*\
  !*** ./node_modules/@mui/utils/esm/ownerWindow.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ownerWindow; }
/* harmony export */ });
/* harmony import */ var _ownerDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ownerDocument */ "./node_modules/@mui/utils/esm/ownerDocument.js");

function ownerWindow(node) {
  const doc = (0,_ownerDocument__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  return doc.defaultView || window;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/resolveProps.js":
/*!*****************************************************!*\
  !*** ./node_modules/@mui/utils/esm/resolveProps.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ resolveProps; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");


/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */
function resolveProps(defaultProps, props) {
  const output = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props);

  Object.keys(defaultProps).forEach(propName => {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });
  return output;
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/setRef.js":
/*!***********************************************!*\
  !*** ./node_modules/@mui/utils/esm/setRef.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ setRef; }
/* harmony export */ });
/**
 * TODO v5: consider making it private
 *
 * passes {value} to {ref}
 *
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise, make sure to cleanup the previous {ref} if it changes. See
 * https://github.com/mui/material-ui/issues/13539
 *
 * Useful if you want to expose the ref of an inner component to the public API
 * while still using it inside the component.
 * @param ref A ref callback or ref object. If anything falsy, this is a no-op.
 */
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/useEnhancedEffect.js":
/*!**********************************************************!*\
  !*** ./node_modules/@mui/utils/esm/useEnhancedEffect.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useEnhancedEffect = typeof window !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
/* harmony default export */ __webpack_exports__["default"] = (useEnhancedEffect);

/***/ }),

/***/ "./node_modules/@mui/utils/esm/useEventCallback.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mui/utils/esm/useEventCallback.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useEventCallback; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useEnhancedEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useEnhancedEffect */ "./node_modules/@mui/utils/esm/useEnhancedEffect.js");


/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */

function useEventCallback(fn) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(fn);
  (0,_useEnhancedEffect__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
    ref.current = fn;
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback((...args) => // @ts-expect-error hide `this`
  // tslint:disable-next-line:ban-comma-operator
  (0, ref.current)(...args), []);
}

/***/ }),

/***/ "./node_modules/@mui/utils/esm/useForkRef.js":
/*!***************************************************!*\
  !*** ./node_modules/@mui/utils/esm/useForkRef.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useForkRef; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setRef */ "./node_modules/@mui/utils/esm/setRef.js");


function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return refValue => {
      (0,_setRef__WEBPACK_IMPORTED_MODULE_1__["default"])(refA, refValue);
      (0,_setRef__WEBPACK_IMPORTED_MODULE_1__["default"])(refB, refValue);
    };
  }, [refA, refB]);
}

/***/ }),

/***/ "./node_modules/@mui/utils/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@mui/utils/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_SERVER_CONTEXT_TYPE:
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false;
var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isConcurrentMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
      hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}
function isSuspenseList(object) {
  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
}

exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.SuspenseList = SuspenseList;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isSuspenseList = isSuspenseList;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/@mui/utils/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mui/utils/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/@mui/utils/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/more.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/more.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const more = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"
}));
/* harmony default export */ __webpack_exports__["default"] = (more);
//# sourceMappingURL=more.js.map

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/more.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/Box.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/Typography.js");
/* harmony import */ var _mui_material_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Modal */ "./node_modules/@mui/material/esm/Modal/Modal.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");









/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};
function Edit(_ref) {
  let {
    attributes,
    setAttributes
  } = _ref;
  const {
    location,
    temp
  } = attributes;
  const [open, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const weatherkey = "30ff45360c01437d910191039221702";
  const mapboxToken = "pk.eyJ1Ijoibnlhc3RlcmR6IiwiYSI6ImNsMmMydnoxeTAzZDAzbG1zbjYzY2VvbHkifQ.Xv-Ttwo7QIplmFRnRsOtlg";
  const [displayValue, setDisplayValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('none');
  const [allLocations, setAllLocations] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  const getLocation = async location => {
    if (location.length > 0) {
      setDisplayValue('block');
    } else {
      setDisplayValue('none');
    }

    var apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${mapboxToken}`;
    var data = await fetch(apiUrl);
    var result = await data.json();
    var locationArray = result.features.map(place => {
      return {
        name: place.text,
        fullName: place.place_name //coordinates: place.geometry.coordinates

      };
    });
    setAllLocations(locationArray);
  };

  const countryWeather = async event => {
    var location = event.target.attributes[0].value;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherkey}&q=${location}`;
    var data = await fetch(apiUrl);
    var result = await data.json();
    var temp = `${result.current.temp_c}°`;
    setAttributes({
      location: location
    });
    setAttributes({
      temp: temp
    });
    setOpen(false);
    setAllLocations([]);
    setDisplayValue('none');
  };

  return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Panel, {
    header: "Block Settings"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: "Weather",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: handleOpen
  }, "Choose the place"))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container-weather"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, location), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "temp__sky"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, temp), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sky"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sun"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cloud"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "circle-small"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "circle-tall"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "circle-medium"
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Modal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: style
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "modal-modal-title",
    variant: "h6",
    component: "h2"
  }, "Choose a place"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "modal-modal-description",
    sx: {
      mt: 2
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
    tagName: "h2",
    placeholder: "Type a name here",
    onChange: getLocation
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "display__countries",
    style: {
      display: displayValue
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, allLocations.map(item => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      "data-place": item.name,
      onClick: countryWeather,
      style: {
        marginLeft: "4px",
        fontWeight: "bold"
      }
    }, item.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        marginLeft: "4px"
      }
    }, item.fullName));
  })))))))];
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  title: _block_json__WEBPACK_IMPORTED_MODULE_4__.title,
  description: _block_json__WEBPACK_IMPORTED_MODULE_4__.description,
  icon: _block_json__WEBPACK_IMPORTED_MODULE_4__.icon,
  gategory: _block_json__WEBPACK_IMPORTED_MODULE_4__.category,
  attributes: {
    location: {
      type: "string",
      default: "Choose a location"
    },
    temp: {
      type: "string",
      default: "0°"
    }
  },

  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],

  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

function save(_ref) {
  let {
    attributes,
    setAttributes
  } = _ref;
  const {
    location,
    temp
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container-weather"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, location), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "temp__sky"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, temp), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sky"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sun"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cloud"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "circle-small"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "circle-tall"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "circle-medium"
  }))))));
}

/***/ }),

/***/ "./node_modules/clsx/dist/clsx.m.js":
/*!******************************************!*\
  !*** ./node_modules/clsx/dist/clsx.m.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clsx": function() { return /* binding */ clsx; }
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ __webpack_exports__["default"] = (clsx);

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-transition-group/esm/Transition.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/Transition.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ENTERED": function() { return /* binding */ ENTERED; },
/* harmony export */   "ENTERING": function() { return /* binding */ ENTERING; },
/* harmony export */   "EXITED": function() { return /* binding */ EXITED; },
/* harmony export */   "EXITING": function() { return /* binding */ EXITING; },
/* harmony export */   "UNMOUNTED": function() { return /* binding */ UNMOUNTED; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config */ "./node_modules/react-transition-group/esm/config.js");
/* harmony import */ var _utils_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/PropTypes */ "./node_modules/react-transition-group/esm/utils/PropTypes.js");
/* harmony import */ var _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TransitionGroupContext */ "./node_modules/react-transition-group/esm/TransitionGroupContext.js");
/* harmony import */ var _utils_reflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/reflow */ "./node_modules/react-transition-group/esm/utils/reflow.js");









var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : react_dom__WEBPACK_IMPORTED_MODULE_3___default().findDOMNode(this); // https://github.com/reactjs/react-transition-group/pull/749
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen,  we have to separate each rendering and avoid being processed as batched.

          if (node) (0,_utils_reflow__WEBPACK_IMPORTED_MODULE_4__.forceReflow)(node);
        }

        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [react_dom__WEBPACK_IMPORTED_MODULE_3___default().findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || _config__WEBPACK_IMPORTED_MODULE_5__["default"].disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : react_dom__WEBPACK_IMPORTED_MODULE_3___default().findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || _config__WEBPACK_IMPORTED_MODULE_5__["default"].disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : react_dom__WEBPACK_IMPORTED_MODULE_3___default().findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        _in = _this$props.in,
        _mountOnEnter = _this$props.mountOnEnter,
        _unmountOnExit = _this$props.unmountOnExit,
        _appear = _this$props.appear,
        _enter = _this$props.enter,
        _exit = _this$props.exit,
        _timeout = _this$props.timeout,
        _addEndListener = _this$props.addEndListener,
        _onEnter = _this$props.onEnter,
        _onEntering = _this$props.onEntering,
        _onEntered = _this$props.onEntered,
        _onExit = _this$props.onExit,
        _onExiting = _this$props.onExiting,
        _onExited = _this$props.onExited,
        _nodeRef = _this$props.nodeRef,
        childProps = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : react__WEBPACK_IMPORTED_MODULE_2___default().cloneElement(react__WEBPACK_IMPORTED_MODULE_2___default().Children.only(children), childProps))
    );
  };

  return Transition;
}((react__WEBPACK_IMPORTED_MODULE_2___default().Component));

Transition.contextType = _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"];
Transition.propTypes =  true ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: prop_types__WEBPACK_IMPORTED_MODULE_7___default().shape({
    current: typeof Element === 'undefined' ? (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any) : function (propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return prop_types__WEBPACK_IMPORTED_MODULE_7___default().instanceOf(value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),

  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_7___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_7___default().func.isRequired), (prop_types__WEBPACK_IMPORTED_MODULE_7___default().element.isRequired)]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * Enable or disable enter transitions.
   */
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * Enable or disable exit transitions.
   */
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_8__.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),

  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)
} : 0; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
/* harmony default export */ __webpack_exports__["default"] = (Transition);

/***/ }),

/***/ "./node_modules/react-transition-group/esm/TransitionGroupContext.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/TransitionGroupContext.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null));

/***/ }),

/***/ "./node_modules/react-transition-group/esm/config.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-transition-group/esm/config.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  disabled: false
});

/***/ }),

/***/ "./node_modules/react-transition-group/esm/utils/PropTypes.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/utils/PropTypes.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "classNamesShape": function() { return /* binding */ classNamesShape; },
/* harmony export */   "timeoutsShape": function() { return /* binding */ timeoutsShape; }
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var timeoutsShape =  true ? prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().number), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number)
}).isRequired]) : 0;
var classNamesShape =  true ? prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().string), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  active: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
}), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  enterDone: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  enterActive: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exitDone: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exitActive: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
})]) : 0;

/***/ }),

/***/ "./node_modules/react-transition-group/esm/utils/reflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/utils/reflow.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forceReflow": function() { return /* binding */ forceReflow; }
/* harmony export */ });
var forceReflow = function forceReflow(node) {
  return node.scrollTop;
};

/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");
var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
exports.Fragment = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_SCOPE_TYPE = 0xead7;
var REACT_OPAQUE_ID_TYPE = 0xeae0;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_OFFSCREEN_TYPE = 0xeae2;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  exports.Fragment = symbolFor('react.fragment');
  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
  REACT_PROFILER_TYPE = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  REACT_SCOPE_TYPE = symbolFor('react.scope');
  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

var enableScopeAPI = false; // Experimental Create Event Handle API.

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getContextName(type) {
  return type.displayName || 'Context';
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case exports.Fragment:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
        }
    }
  }

  return null;
}

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: _assign({}, props, {
          value: prevLog
        }),
        info: _assign({}, props, {
          value: prevInfo
        }),
        warn: _assign({}, props, {
          value: prevWarn
        }),
        error: _assign({}, props, {
          value: prevError
        }),
        group: _assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: _assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: _assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if (!fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_BLOCK_TYPE:
        return describeFunctionComponentFrame(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentName(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentName(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === exports.Fragment) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _inheritsLoose; }
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutPropertiesLoose; }
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _setPrototypeOf; }
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/stylis/src/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHARSET": function() { return /* binding */ CHARSET; },
/* harmony export */   "COMMENT": function() { return /* binding */ COMMENT; },
/* harmony export */   "COUNTER_STYLE": function() { return /* binding */ COUNTER_STYLE; },
/* harmony export */   "DECLARATION": function() { return /* binding */ DECLARATION; },
/* harmony export */   "DOCUMENT": function() { return /* binding */ DOCUMENT; },
/* harmony export */   "FONT_FACE": function() { return /* binding */ FONT_FACE; },
/* harmony export */   "FONT_FEATURE_VALUES": function() { return /* binding */ FONT_FEATURE_VALUES; },
/* harmony export */   "IMPORT": function() { return /* binding */ IMPORT; },
/* harmony export */   "KEYFRAMES": function() { return /* binding */ KEYFRAMES; },
/* harmony export */   "MEDIA": function() { return /* binding */ MEDIA; },
/* harmony export */   "MOZ": function() { return /* binding */ MOZ; },
/* harmony export */   "MS": function() { return /* binding */ MS; },
/* harmony export */   "NAMESPACE": function() { return /* binding */ NAMESPACE; },
/* harmony export */   "PAGE": function() { return /* binding */ PAGE; },
/* harmony export */   "RULESET": function() { return /* binding */ RULESET; },
/* harmony export */   "SUPPORTS": function() { return /* binding */ SUPPORTS; },
/* harmony export */   "VIEWPORT": function() { return /* binding */ VIEWPORT; },
/* harmony export */   "WEBKIT": function() { return /* binding */ WEBKIT; }
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'


/***/ }),

/***/ "./node_modules/stylis/src/Middleware.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": function() { return /* binding */ middleware; },
/* harmony export */   "namespace": function() { return /* binding */ namespace; },
/* harmony export */   "prefixer": function() { return /* binding */ prefixer; },
/* harmony export */   "rulesheet": function() { return /* binding */ rulesheet; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length)
					break
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
					return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
					if (element.length)
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
							switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/stylis/src/Parser.js":
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment": function() { return /* binding */ comment; },
/* harmony export */   "compile": function() { return /* binding */ compile; },
/* harmony export */   "declaration": function() { return /* binding */ declaration; },
/* harmony export */   "parse": function() { return /* binding */ parse; },
/* harmony export */   "ruleset": function() { return /* binding */ ruleset; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// (
			case 40:
				if (previous != 108 && characters.charCodeAt(length - 1) == 58) {
					if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset:
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/stylis/src/Prefixer.js":
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": function() { return /* binding */ prefix; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix (value, length) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// flex, flex-direction
		case 6828: case 4268:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/, '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length) + value : value
				}
			break
		// position: sticky
		case 4949:
			// (s)ticky?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1) !== 115)
				break
		// display: (flex|inline-flex)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 3 - (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, '!important') && 10))) {
				// stic(k)y
				case 107:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
				// (inline-)?fl(e)x
				case 101:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
			}
			break
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
			}

			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/stylis/src/Serializer.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": function() { return /* binding */ serialize; },
/* harmony export */   "stringify": function() { return /* binding */ stringify; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/stylis/src/Tokenizer.js":
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alloc": function() { return /* binding */ alloc; },
/* harmony export */   "caret": function() { return /* binding */ caret; },
/* harmony export */   "char": function() { return /* binding */ char; },
/* harmony export */   "character": function() { return /* binding */ character; },
/* harmony export */   "characters": function() { return /* binding */ characters; },
/* harmony export */   "column": function() { return /* binding */ column; },
/* harmony export */   "commenter": function() { return /* binding */ commenter; },
/* harmony export */   "copy": function() { return /* binding */ copy; },
/* harmony export */   "dealloc": function() { return /* binding */ dealloc; },
/* harmony export */   "delimit": function() { return /* binding */ delimit; },
/* harmony export */   "delimiter": function() { return /* binding */ delimiter; },
/* harmony export */   "escaping": function() { return /* binding */ escaping; },
/* harmony export */   "identifier": function() { return /* binding */ identifier; },
/* harmony export */   "length": function() { return /* binding */ length; },
/* harmony export */   "line": function() { return /* binding */ line; },
/* harmony export */   "next": function() { return /* binding */ next; },
/* harmony export */   "node": function() { return /* binding */ node; },
/* harmony export */   "peek": function() { return /* binding */ peek; },
/* harmony export */   "position": function() { return /* binding */ position; },
/* harmony export */   "prev": function() { return /* binding */ prev; },
/* harmony export */   "slice": function() { return /* binding */ slice; },
/* harmony export */   "token": function() { return /* binding */ token; },
/* harmony export */   "tokenize": function() { return /* binding */ tokenize; },
/* harmony export */   "tokenizer": function() { return /* binding */ tokenizer; },
/* harmony export */   "whitespace": function() { return /* binding */ whitespace; }
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/stylis/src/Utility.js":
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": function() { return /* binding */ abs; },
/* harmony export */   "append": function() { return /* binding */ append; },
/* harmony export */   "assign": function() { return /* binding */ assign; },
/* harmony export */   "charat": function() { return /* binding */ charat; },
/* harmony export */   "combine": function() { return /* binding */ combine; },
/* harmony export */   "from": function() { return /* binding */ from; },
/* harmony export */   "hash": function() { return /* binding */ hash; },
/* harmony export */   "indexof": function() { return /* binding */ indexof; },
/* harmony export */   "match": function() { return /* binding */ match; },
/* harmony export */   "replace": function() { return /* binding */ replace; },
/* harmony export */   "sizeof": function() { return /* binding */ sizeof; },
/* harmony export */   "strlen": function() { return /* binding */ strlen; },
/* harmony export */   "substr": function() { return /* binding */ substr; },
/* harmony export */   "trim": function() { return /* binding */ trim; }
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gw/weather-block","version":"0.1.0","title":"Weather","category":"widgets","icon":"admin-site-alt3","description":"A simple block for weather","supports":{"html":false},"textdomain":"weather","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkweather"] = self["webpackChunkweather"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map