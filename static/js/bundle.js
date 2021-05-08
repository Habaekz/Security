(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
  * Bootstrap v4.6.0 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, (function (exports, $, Popper) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Popper__default = /*#__PURE__*/_interopDefaultLegacy(Popper);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($__default['default'](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $__default['default'](this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $__default['default'].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default['default'].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (_) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $__default['default'](element).css('transition-duration');
      var transitionDelay = $__default['default'](element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $__default['default'](element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $__default['default'].fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.6.0';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $__default['default'](element).closest("." + CLASS_NAME_ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $__default['default'].Event(EVENT_CLOSE);
      $__default['default'](element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $__default['default'](element).removeClass(CLASS_NAME_SHOW);

      if (!$__default['default'](element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $__default['default'](element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $__default['default'](element).detach().trigger(EVENT_CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME] = Alert._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = Alert;

  $__default['default'].fn[NAME].noConflict = function () {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.6.0';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_BUTTON = '.btn';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $__default['default'](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

              if (activeElement) {
                $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default['default'](input).trigger('change');
            }
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }

        if (triggerChangeEvent) {
          $__default['default'](this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY$1, data);
        }

        data.shouldAvoidTriggerChange = avoidTriggerChange;

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;

    if (!$__default['default'](button).hasClass(CLASS_NAME_BUTTON)) {
      button = $__default['default'](button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
        Button._jQueryInterface.call($__default['default'](button), 'toggle', initialButton.tagName === 'INPUT');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $__default['default'](event.target).closest(SELECTOR_BUTTON)[0];
    $__default['default'](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $__default['default'](window).on(EVENT_LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$1] = Button._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = Button;

  $__default['default'].fn[NAME$1].noConflict = function () {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.6.0';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      var $element = $__default['default'](this._element); // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible

      if (!document.hidden && $element.is(':visible') && $element.css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $__default['default'](this._element).one(EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $__default['default'](this._element).off(EVENT_KEY$2);
      $__default['default'].removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $__default['default'](this._element).on(EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $__default['default'](this._element).on(EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $__default['default'](this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $__default['default'](this._element).on(EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default['default'](this._element).on(EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $__default['default'].Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $__default['default'](this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default['default'](indicators).removeClass(CLASS_NAME_ACTIVE$1);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $__default['default'](nextIndicator).addClass(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._updateInterval = function _updateInterval() {
      var element = this._activeElement || this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      if (!element) {
        return;
      }

      var elementInterval = parseInt(element.getAttribute('data-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default['default'](nextElement).hasClass(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;
      var slidEvent = $__default['default'].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default['default'](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default['default'](nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $__default['default'](activeElement).addClass(directionalClassName);
        $__default['default'](nextElement).addClass(directionalClassName);
        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $__default['default'](activeElement).one(Util.TRANSITION_END, function () {
          $__default['default'](nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE$1);
          $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1 + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $__default['default'](_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1);
        $__default['default'](nextElement).addClass(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        $__default['default'](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$2);

        var _config = _extends({}, Default, $__default['default'](this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default['default'](this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $__default['default'](selector)[0];

      if (!target || !$__default['default'](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default['default'](target), config);

      if (slideIndex) {
        $__default['default'](target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $__default['default'](window).on(EVENT_LOAD_DATA_API$1, function () {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $__default['default'](carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$2] = Carousel._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = Carousel;

  $__default['default'].fn[NAME$2].noConflict = function () {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.6.0';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$1));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $__default['default'](actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $__default['default'].Event(EVENT_SHOW);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default['default'](actives).not(this._selector), 'hide');

        if (!activesData) {
          $__default['default'](actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $__default['default'](this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default['default'](this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $__default['default'](_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $__default['default'](_this._element).trigger(EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var startEvent = $__default['default'].Event(EVENT_HIDE);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $__default['default'](this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $__default['default']([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(CLASS_NAME_SHOW$1)) {
              $__default['default'](trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $__default['default'](_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $__default['default'](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $__default['default'](children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $__default['default'](element).hasClass(CLASS_NAME_SHOW$1);

      if (triggerArray.length) {
        $__default['default'](triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$3);

        var _config = _extends({}, Default$1, $element.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $__default['default'](this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $__default['default'](selectors).each(function () {
      var $target = $__default['default'](this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$3] = Collapse._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = Collapse;

  $__default['default'].fn[NAME$3].noConflict = function () {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.6.0';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $__default['default'].Event(EVENT_SHOW$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Totally disable Popper for Dropdowns in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper__default['default'] === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $__default['default'](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper__default['default'](referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $__default['default'](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_SHOWN$1, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || !$__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$4);
      $__default['default'](this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $__default['default'](this._element).on(EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $__default['default'](this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $__default['default'](this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $__default['default'](this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default['default'](this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $__default['default'](toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$__default['default'](parent).hasClass(CLASS_NAME_SHOW$2)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $__default['default'].contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);
        $__default['default'](parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default['default'](dropdownMenu).removeClass(CLASS_NAME_SHOW$2);
        $__default['default'](parent).removeClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $__default['default'](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || $__default['default'](this).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $__default['default'](parent).hasClass(CLASS_NAME_SHOW$2);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE) {
        if (event.which === ESCAPE_KEYCODE) {
          $__default['default'](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default['default'](this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
        return $__default['default'](item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$4 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default['default'](this), 'toggle');
  }).on(EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$4] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Dropdown;

  $__default['default'].fn[NAME$4].noConflict = function () {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.6.0';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$3 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
        this._isTransitioning = true;
      }

      var showEvent = $__default['default'].Event(EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      $__default['default'](this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $__default['default'](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function () {
        $__default['default'](_this._element).one(EVENT_MOUSEUP_DISMISS, function (event) {
          if ($__default['default'](event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$2);
      $__default['default'](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'](this._element).removeClass(CLASS_NAME_SHOW$3);
      $__default['default'](this._element).off(EVENT_CLICK_DISMISS);
      $__default['default'](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $__default['default'](htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'].removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      var hideEventPrevented = $__default['default'].Event(EVENT_HIDE_PREVENTED);
      $__default['default'](this._element).trigger(hideEventPrevented);

      if (hideEventPrevented.isDefaultPrevented()) {
        return;
      }

      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      var modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
      $__default['default'](this._element).off(Util.TRANSITION_END);
      $__default['default'](this._element).one(Util.TRANSITION_END, function () {
        _this3._element.classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          $__default['default'](_this3._element).one(Util.TRANSITION_END, function () {
            _this3._element.style.overflowY = '';
          }).emulateTransitionEnd(_this3._element, modalTransitionDuration);
        }
      }).emulateTransitionEnd(modalTransitionDuration);

      this._element.focus();
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);
      var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      if ($__default['default'](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default['default'](this._element).addClass(CLASS_NAME_SHOW$3);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $__default['default'].Event(EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $__default['default'](_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $__default['default'](document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
      .on(EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $__default['default'](_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $__default['default'](this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this6.hide();
          } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default['default'](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $__default['default'](window).on(EVENT_RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $__default['default'](window).off(EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $__default['default'](document.body).removeClass(CLASS_NAME_OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $__default['default'](_this8._element).trigger(EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $__default['default'](this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default['default'](this._backdrop).appendTo(document.body);
        $__default['default'](this._element).on(EVENT_CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this9._config.backdrop === 'static') {
            _this9._triggerBackdropTransition();
          } else {
            _this9.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $__default['default'](this._backdrop).addClass(CLASS_NAME_SHOW$3);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $__default['default'](this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default['default'](this._backdrop).removeClass(CLASS_NAME_SHOW$3);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default['default'](this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

        $__default['default'](fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $__default['default'](element).css('padding-right');
          $__default['default'](element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $__default['default'](stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $__default['default'](element).css('margin-right');
          $__default['default'](element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $__default['default'](document.body).css('padding-right');
        $__default['default'](document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $__default['default'](document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default['default'](fixedContent).each(function (index, element) {
        var padding = $__default['default'](element).data('padding-right');
        $__default['default'](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
      $__default['default'](elements).each(function (index, element) {
        var margin = $__default['default'](element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $__default['default'](element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $__default['default'](document.body).data('padding-right');
      $__default['default'](document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$5);

        var _config = _extends({}, Default$3, $__default['default'](this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $__default['default'](this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $__default['default'](target).data(DATA_KEY$5) ? 'toggle' : _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $__default['default'](target).one(EVENT_SHOW$2, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(EVENT_HIDDEN$2, function () {
        if ($__default['default'](_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default['default'](target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$5] = Modal._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = Modal;

  $__default['default'].fn[NAME$5].noConflict = function () {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.6.0';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var Event = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $__default['default'](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $__default['default'](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default['default'](this.getTipElement()).hasClass(CLASS_NAME_SHOW$4)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $__default['default'].removeData(this.element, this.constructor.DATA_KEY);
      $__default['default'](this.element).off(this.constructor.EVENT_KEY);
      $__default['default'](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default['default'](this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($__default['default'](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $__default['default'].Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $__default['default'](this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $__default['default'].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $__default['default'](tip).addClass(CLASS_NAME_FADE$2);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $__default['default'](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default['default'].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default['default'](tip).appendTo(container);
        }

        $__default['default'](this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper__default['default'](this.element, tip, this._getPopperConfig(attachment));
        $__default['default'](tip).addClass(CLASS_NAME_SHOW$4);
        $__default['default'](tip).addClass(this.config.customClass); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $__default['default'](_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $__default['default'](this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $__default['default'].Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $__default['default'](_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default['default'](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $__default['default'](tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($__default['default'](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2 + " " + CLASS_NAME_SHOW$4);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default['default'](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default['default'](content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $__default['default'](this.config.container);
      }

      return $__default['default'](document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $__default['default'](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $__default['default'](_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $__default['default'](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if ($__default['default'](context.getTipElement()).hasClass(CLASS_NAME_SHOW$4) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $__default['default'](this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$6] = Tooltip._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Tooltip;

  $__default['default'].fn[NAME$6].noConflict = function () {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.6.0';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $__default['default'](this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$5);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default['default'](this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$7] = Popover._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = Popover;

  $__default['default'].fn[NAME$7].noConflict = function () {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.6.0';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default['default'](this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default['default'](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$8);
      $__default['default'](this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        var id = $__default['default'](config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $__default['default'](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default['default']([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE$2);
        $link.addClass(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$2); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE$2); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE$2);
      }

      $__default['default'](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default['default'](this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API$2, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default['default'](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$8] = ScrollSpy._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = ScrollSpy;

  $__default['default'].fn[NAME$8].noConflict = function () {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.6.0';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$2 = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default['default'](this._element).hasClass(CLASS_NAME_ACTIVE$3) || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var target;
      var previous;
      var listElement = $__default['default'](this._element).closest(SELECTOR_NAV_LIST_GROUP$1)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$2;
        previous = $__default['default'].makeArray($__default['default'](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$3, {
        relatedTarget: this._element
      });
      var showEvent = $__default['default'].Event(EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (previous) {
        $__default['default'](previous).trigger(hideEvent);
      }

      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $__default['default'].Event(EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default['default'].Event(EVENT_SHOWN$3, {
          relatedTarget: previous
        });
        $__default['default'](previous).trigger(hiddenEvent);
        $__default['default'](_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default['default'](container).find(SELECTOR_ACTIVE_UL) : $__default['default'](container).children(SELECTOR_ACTIVE$2);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default['default'](active).hasClass(CLASS_NAME_FADE$4);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $__default['default'](active).removeClass(CLASS_NAME_SHOW$6).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default['default'](active).removeClass(CLASS_NAME_ACTIVE$3);
        var dropdownChild = $__default['default'](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $__default['default'](dropdownChild).removeClass(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default['default'](element).addClass(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$4)) {
        element.classList.add(CLASS_NAME_SHOW$6);
      }

      if (element.parentNode && $__default['default'](element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default['default'](element).closest(SELECTOR_DROPDOWN$1)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE$1));
          $__default['default'](dropdownToggleList).addClass(CLASS_NAME_ACTIVE$3);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $__default['default'](this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($__default['default'](this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$9] = Tab._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = Tab;

  $__default['default'].fn[NAME$9].noConflict = function () {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.6.0';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $__default['default'].Event(EVENT_SHOW$4);
      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$5);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$7);

        $__default['default'](_this._element).trigger(EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      Util.reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$4);
      $__default['default'](this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        this._element.classList.remove(CLASS_NAME_SHOW$7);
      }

      $__default['default'](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default['default'].removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, $__default['default'](this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        $__default['default'](_this3._element).trigger(EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$a] = Toast._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = Toast;

  $__default['default'].fn[NAME$a].noConflict = function () {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));


},{"jquery":2,"popper.js":3}],2:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],3:[function(require,module,exports){
(function (global){(function (){
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
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

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var adjacency_graphs;

adjacency_graphs = {
  qwerty: {
    "!": ["`~", null, null, "2@", "qQ", null],
    "\"": [";:", "[{", "]}", null, null, "/?"],
    "#": ["2@", null, null, "4$", "eE", "wW"],
    "$": ["3#", null, null, "5%", "rR", "eE"],
    "%": ["4$", null, null, "6^", "tT", "rR"],
    "&": ["6^", null, null, "8*", "uU", "yY"],
    "'": [";:", "[{", "]}", null, null, "/?"],
    "(": ["8*", null, null, "0)", "oO", "iI"],
    ")": ["9(", null, null, "-_", "pP", "oO"],
    "*": ["7&", null, null, "9(", "iI", "uU"],
    "+": ["-_", null, null, null, "]}", "[{"],
    ",": ["mM", "kK", "lL", ".>", null, null],
    "-": ["0)", null, null, "=+", "[{", "pP"],
    ".": [",<", "lL", ";:", "/?", null, null],
    "/": [".>", ";:", "'\"", null, null, null],
    "0": ["9(", null, null, "-_", "pP", "oO"],
    "1": ["`~", null, null, "2@", "qQ", null],
    "2": ["1!", null, null, "3#", "wW", "qQ"],
    "3": ["2@", null, null, "4$", "eE", "wW"],
    "4": ["3#", null, null, "5%", "rR", "eE"],
    "5": ["4$", null, null, "6^", "tT", "rR"],
    "6": ["5%", null, null, "7&", "yY", "tT"],
    "7": ["6^", null, null, "8*", "uU", "yY"],
    "8": ["7&", null, null, "9(", "iI", "uU"],
    "9": ["8*", null, null, "0)", "oO", "iI"],
    ":": ["lL", "pP", "[{", "'\"", "/?", ".>"],
    ";": ["lL", "pP", "[{", "'\"", "/?", ".>"],
    "<": ["mM", "kK", "lL", ".>", null, null],
    "=": ["-_", null, null, null, "]}", "[{"],
    ">": [",<", "lL", ";:", "/?", null, null],
    "?": [".>", ";:", "'\"", null, null, null],
    "@": ["1!", null, null, "3#", "wW", "qQ"],
    "A": [null, "qQ", "wW", "sS", "zZ", null],
    "B": ["vV", "gG", "hH", "nN", null, null],
    "C": ["xX", "dD", "fF", "vV", null, null],
    "D": ["sS", "eE", "rR", "fF", "cC", "xX"],
    "E": ["wW", "3#", "4$", "rR", "dD", "sS"],
    "F": ["dD", "rR", "tT", "gG", "vV", "cC"],
    "G": ["fF", "tT", "yY", "hH", "bB", "vV"],
    "H": ["gG", "yY", "uU", "jJ", "nN", "bB"],
    "I": ["uU", "8*", "9(", "oO", "kK", "jJ"],
    "J": ["hH", "uU", "iI", "kK", "mM", "nN"],
    "K": ["jJ", "iI", "oO", "lL", ",<", "mM"],
    "L": ["kK", "oO", "pP", ";:", ".>", ",<"],
    "M": ["nN", "jJ", "kK", ",<", null, null],
    "N": ["bB", "hH", "jJ", "mM", null, null],
    "O": ["iI", "9(", "0)", "pP", "lL", "kK"],
    "P": ["oO", "0)", "-_", "[{", ";:", "lL"],
    "Q": [null, "1!", "2@", "wW", "aA", null],
    "R": ["eE", "4$", "5%", "tT", "fF", "dD"],
    "S": ["aA", "wW", "eE", "dD", "xX", "zZ"],
    "T": ["rR", "5%", "6^", "yY", "gG", "fF"],
    "U": ["yY", "7&", "8*", "iI", "jJ", "hH"],
    "V": ["cC", "fF", "gG", "bB", null, null],
    "W": ["qQ", "2@", "3#", "eE", "sS", "aA"],
    "X": ["zZ", "sS", "dD", "cC", null, null],
    "Y": ["tT", "6^", "7&", "uU", "hH", "gG"],
    "Z": [null, "aA", "sS", "xX", null, null],
    "[": ["pP", "-_", "=+", "]}", "'\"", ";:"],
    "\\": ["]}", null, null, null, null, null],
    "]": ["[{", "=+", null, "\\|", null, "'\""],
    "^": ["5%", null, null, "7&", "yY", "tT"],
    "_": ["0)", null, null, "=+", "[{", "pP"],
    "`": [null, null, null, "1!", null, null],
    "a": [null, "qQ", "wW", "sS", "zZ", null],
    "b": ["vV", "gG", "hH", "nN", null, null],
    "c": ["xX", "dD", "fF", "vV", null, null],
    "d": ["sS", "eE", "rR", "fF", "cC", "xX"],
    "e": ["wW", "3#", "4$", "rR", "dD", "sS"],
    "f": ["dD", "rR", "tT", "gG", "vV", "cC"],
    "g": ["fF", "tT", "yY", "hH", "bB", "vV"],
    "h": ["gG", "yY", "uU", "jJ", "nN", "bB"],
    "i": ["uU", "8*", "9(", "oO", "kK", "jJ"],
    "j": ["hH", "uU", "iI", "kK", "mM", "nN"],
    "k": ["jJ", "iI", "oO", "lL", ",<", "mM"],
    "l": ["kK", "oO", "pP", ";:", ".>", ",<"],
    "m": ["nN", "jJ", "kK", ",<", null, null],
    "n": ["bB", "hH", "jJ", "mM", null, null],
    "o": ["iI", "9(", "0)", "pP", "lL", "kK"],
    "p": ["oO", "0)", "-_", "[{", ";:", "lL"],
    "q": [null, "1!", "2@", "wW", "aA", null],
    "r": ["eE", "4$", "5%", "tT", "fF", "dD"],
    "s": ["aA", "wW", "eE", "dD", "xX", "zZ"],
    "t": ["rR", "5%", "6^", "yY", "gG", "fF"],
    "u": ["yY", "7&", "8*", "iI", "jJ", "hH"],
    "v": ["cC", "fF", "gG", "bB", null, null],
    "w": ["qQ", "2@", "3#", "eE", "sS", "aA"],
    "x": ["zZ", "sS", "dD", "cC", null, null],
    "y": ["tT", "6^", "7&", "uU", "hH", "gG"],
    "z": [null, "aA", "sS", "xX", null, null],
    "{": ["pP", "-_", "=+", "]}", "'\"", ";:"],
    "|": ["]}", null, null, null, null, null],
    "}": ["[{", "=+", null, "\\|", null, "'\""],
    "~": [null, null, null, "1!", null, null]
  },
  dvorak: {
    "!": ["`~", null, null, "2@", "'\"", null],
    "\"": [null, "1!", "2@", ",<", "aA", null],
    "#": ["2@", null, null, "4$", ".>", ",<"],
    "$": ["3#", null, null, "5%", "pP", ".>"],
    "%": ["4$", null, null, "6^", "yY", "pP"],
    "&": ["6^", null, null, "8*", "gG", "fF"],
    "'": [null, "1!", "2@", ",<", "aA", null],
    "(": ["8*", null, null, "0)", "rR", "cC"],
    ")": ["9(", null, null, "[{", "lL", "rR"],
    "*": ["7&", null, null, "9(", "cC", "gG"],
    "+": ["/?", "]}", null, "\\|", null, "-_"],
    ",": ["'\"", "2@", "3#", ".>", "oO", "aA"],
    "-": ["sS", "/?", "=+", null, null, "zZ"],
    ".": [",<", "3#", "4$", "pP", "eE", "oO"],
    "/": ["lL", "[{", "]}", "=+", "-_", "sS"],
    "0": ["9(", null, null, "[{", "lL", "rR"],
    "1": ["`~", null, null, "2@", "'\"", null],
    "2": ["1!", null, null, "3#", ",<", "'\""],
    "3": ["2@", null, null, "4$", ".>", ",<"],
    "4": ["3#", null, null, "5%", "pP", ".>"],
    "5": ["4$", null, null, "6^", "yY", "pP"],
    "6": ["5%", null, null, "7&", "fF", "yY"],
    "7": ["6^", null, null, "8*", "gG", "fF"],
    "8": ["7&", null, null, "9(", "cC", "gG"],
    "9": ["8*", null, null, "0)", "rR", "cC"],
    ":": [null, "aA", "oO", "qQ", null, null],
    ";": [null, "aA", "oO", "qQ", null, null],
    "<": ["'\"", "2@", "3#", ".>", "oO", "aA"],
    "=": ["/?", "]}", null, "\\|", null, "-_"],
    ">": [",<", "3#", "4$", "pP", "eE", "oO"],
    "?": ["lL", "[{", "]}", "=+", "-_", "sS"],
    "@": ["1!", null, null, "3#", ",<", "'\""],
    "A": [null, "'\"", ",<", "oO", ";:", null],
    "B": ["xX", "dD", "hH", "mM", null, null],
    "C": ["gG", "8*", "9(", "rR", "tT", "hH"],
    "D": ["iI", "fF", "gG", "hH", "bB", "xX"],
    "E": ["oO", ".>", "pP", "uU", "jJ", "qQ"],
    "F": ["yY", "6^", "7&", "gG", "dD", "iI"],
    "G": ["fF", "7&", "8*", "cC", "hH", "dD"],
    "H": ["dD", "gG", "cC", "tT", "mM", "bB"],
    "I": ["uU", "yY", "fF", "dD", "xX", "kK"],
    "J": ["qQ", "eE", "uU", "kK", null, null],
    "K": ["jJ", "uU", "iI", "xX", null, null],
    "L": ["rR", "0)", "[{", "/?", "sS", "nN"],
    "M": ["bB", "hH", "tT", "wW", null, null],
    "N": ["tT", "rR", "lL", "sS", "vV", "wW"],
    "O": ["aA", ",<", ".>", "eE", "qQ", ";:"],
    "P": [".>", "4$", "5%", "yY", "uU", "eE"],
    "Q": [";:", "oO", "eE", "jJ", null, null],
    "R": ["cC", "9(", "0)", "lL", "nN", "tT"],
    "S": ["nN", "lL", "/?", "-_", "zZ", "vV"],
    "T": ["hH", "cC", "rR", "nN", "wW", "mM"],
    "U": ["eE", "pP", "yY", "iI", "kK", "jJ"],
    "V": ["wW", "nN", "sS", "zZ", null, null],
    "W": ["mM", "tT", "nN", "vV", null, null],
    "X": ["kK", "iI", "dD", "bB", null, null],
    "Y": ["pP", "5%", "6^", "fF", "iI", "uU"],
    "Z": ["vV", "sS", "-_", null, null, null],
    "[": ["0)", null, null, "]}", "/?", "lL"],
    "\\": ["=+", null, null, null, null, null],
    "]": ["[{", null, null, null, "=+", "/?"],
    "^": ["5%", null, null, "7&", "fF", "yY"],
    "_": ["sS", "/?", "=+", null, null, "zZ"],
    "`": [null, null, null, "1!", null, null],
    "a": [null, "'\"", ",<", "oO", ";:", null],
    "b": ["xX", "dD", "hH", "mM", null, null],
    "c": ["gG", "8*", "9(", "rR", "tT", "hH"],
    "d": ["iI", "fF", "gG", "hH", "bB", "xX"],
    "e": ["oO", ".>", "pP", "uU", "jJ", "qQ"],
    "f": ["yY", "6^", "7&", "gG", "dD", "iI"],
    "g": ["fF", "7&", "8*", "cC", "hH", "dD"],
    "h": ["dD", "gG", "cC", "tT", "mM", "bB"],
    "i": ["uU", "yY", "fF", "dD", "xX", "kK"],
    "j": ["qQ", "eE", "uU", "kK", null, null],
    "k": ["jJ", "uU", "iI", "xX", null, null],
    "l": ["rR", "0)", "[{", "/?", "sS", "nN"],
    "m": ["bB", "hH", "tT", "wW", null, null],
    "n": ["tT", "rR", "lL", "sS", "vV", "wW"],
    "o": ["aA", ",<", ".>", "eE", "qQ", ";:"],
    "p": [".>", "4$", "5%", "yY", "uU", "eE"],
    "q": [";:", "oO", "eE", "jJ", null, null],
    "r": ["cC", "9(", "0)", "lL", "nN", "tT"],
    "s": ["nN", "lL", "/?", "-_", "zZ", "vV"],
    "t": ["hH", "cC", "rR", "nN", "wW", "mM"],
    "u": ["eE", "pP", "yY", "iI", "kK", "jJ"],
    "v": ["wW", "nN", "sS", "zZ", null, null],
    "w": ["mM", "tT", "nN", "vV", null, null],
    "x": ["kK", "iI", "dD", "bB", null, null],
    "y": ["pP", "5%", "6^", "fF", "iI", "uU"],
    "z": ["vV", "sS", "-_", null, null, null],
    "{": ["0)", null, null, "]}", "/?", "lL"],
    "|": ["=+", null, null, null, null, null],
    "}": ["[{", null, null, null, "=+", "/?"],
    "~": [null, null, null, "1!", null, null]
  },
  keypad: {
    "*": ["/", null, null, null, "-", "+", "9", "8"],
    "+": ["9", "*", "-", null, null, null, null, "6"],
    "-": ["*", null, null, null, null, null, "+", "9"],
    ".": ["0", "2", "3", null, null, null, null, null],
    "/": [null, null, null, null, "*", "9", "8", "7"],
    "0": [null, "1", "2", "3", ".", null, null, null],
    "1": [null, null, "4", "5", "2", "0", null, null],
    "2": ["1", "4", "5", "6", "3", ".", "0", null],
    "3": ["2", "5", "6", null, null, null, ".", "0"],
    "4": [null, null, "7", "8", "5", "2", "1", null],
    "5": ["4", "7", "8", "9", "6", "3", "2", "1"],
    "6": ["5", "8", "9", "+", null, null, "3", "2"],
    "7": [null, null, null, "/", "8", "5", "4", null],
    "8": ["7", null, "/", "*", "9", "6", "5", "4"],
    "9": ["8", "/", "*", "-", "+", null, "6", "5"]
  },
  mac_keypad: {
    "*": ["/", null, null, null, null, null, "-", "9"],
    "+": ["6", "9", "-", null, null, null, null, "3"],
    "-": ["9", "/", "*", null, null, null, "+", "6"],
    ".": ["0", "2", "3", null, null, null, null, null],
    "/": ["=", null, null, null, "*", "-", "9", "8"],
    "0": [null, "1", "2", "3", ".", null, null, null],
    "1": [null, null, "4", "5", "2", "0", null, null],
    "2": ["1", "4", "5", "6", "3", ".", "0", null],
    "3": ["2", "5", "6", "+", null, null, ".", "0"],
    "4": [null, null, "7", "8", "5", "2", "1", null],
    "5": ["4", "7", "8", "9", "6", "3", "2", "1"],
    "6": ["5", "8", "9", "-", "+", null, "3", "2"],
    "7": [null, null, null, "=", "8", "5", "4", null],
    "8": ["7", null, "=", "/", "9", "6", "5", "4"],
    "9": ["8", "=", "/", "*", "-", "+", "6", "5"],
    "=": [null, null, null, null, "/", "9", "8", "7"]
  }
};

module.exports = adjacency_graphs;



},{}],5:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var feedback, scoring;

scoring = require('./scoring');

feedback = {
  default_feedback: {
    warning: '',
    suggestions: ["Use a few words, avoid common phrases", "No need for symbols, digits, or uppercase letters"]
  },
  get_feedback: function(score, sequence) {
    var extra_feedback, i, len, longest_match, match, ref;
    if (sequence.length === 0) {
      return this.default_feedback;
    }
    if (score > 2) {
      return {
        warning: '',
        suggestions: []
      };
    }
    longest_match = sequence[0];
    ref = sequence.slice(1);
    for (i = 0, len = ref.length; i < len; i++) {
      match = ref[i];
      if (match.token.length > longest_match.token.length) {
        longest_match = match;
      }
    }
    feedback = this.get_match_feedback(longest_match, sequence.length === 1);
    extra_feedback = 'Add another word or two. Uncommon words are better.';
    if (feedback != null) {
      feedback.suggestions.unshift(extra_feedback);
      if (feedback.warning == null) {
        feedback.warning = '';
      }
    } else {
      feedback = {
        warning: '',
        suggestions: [extra_feedback]
      };
    }
    return feedback;
  },
  get_match_feedback: function(match, is_sole_match) {
    var layout, warning;
    switch (match.pattern) {
      case 'dictionary':
        return this.get_dictionary_match_feedback(match, is_sole_match);
      case 'spatial':
        layout = match.graph.toUpperCase();
        warning = match.turns === 1 ? 'Straight rows of keys are easy to guess' : 'Short keyboard patterns are easy to guess';
        return {
          warning: warning,
          suggestions: ['Use a longer keyboard pattern with more turns']
        };
      case 'repeat':
        warning = match.base_token.length === 1 ? 'Repeats like "aaa" are easy to guess' : 'Repeats like "abcabcabc" are only slightly harder to guess than "abc"';
        return {
          warning: warning,
          suggestions: ['Avoid repeated words and characters']
        };
      case 'sequence':
        return {
          warning: "Sequences like abc or 6543 are easy to guess",
          suggestions: ['Avoid sequences']
        };
      case 'regex':
        if (match.regex_name === 'recent_year') {
          return {
            warning: "Recent years are easy to guess",
            suggestions: ['Avoid recent years', 'Avoid years that are associated with you']
          };
        }
        break;
      case 'date':
        return {
          warning: "Dates are often easy to guess",
          suggestions: ['Avoid dates and years that are associated with you']
        };
    }
  },
  get_dictionary_match_feedback: function(match, is_sole_match) {
    var ref, result, suggestions, warning, word;
    warning = match.dictionary_name === 'passwords' ? is_sole_match && !match.l33t && !match.reversed ? match.rank <= 10 ? 'This is a top-10 common password' : match.rank <= 100 ? 'This is a top-100 common password' : 'This is a very common password' : match.guesses_log10 <= 4 ? 'This is similar to a commonly used password' : void 0 : match.dictionary_name === 'english_wikipedia' ? is_sole_match ? 'A word by itself is easy to guess' : void 0 : (ref = match.dictionary_name) === 'surnames' || ref === 'male_names' || ref === 'female_names' ? is_sole_match ? 'Names and surnames by themselves are easy to guess' : 'Common names and surnames are easy to guess' : '';
    suggestions = [];
    word = match.token;
    if (word.match(scoring.START_UPPER)) {
      suggestions.push("Capitalization doesn't help very much");
    } else if (word.match(scoring.ALL_UPPER) && word.toLowerCase() !== word) {
      suggestions.push("All-uppercase is almost as easy to guess as all-lowercase");
    }
    if (match.reversed && match.token.length >= 4) {
      suggestions.push("Reversed words aren't much harder to guess");
    }
    if (match.l33t) {
      suggestions.push("Predictable substitutions like '@' instead of 'a' don't help very much");
    }
    result = {
      warning: warning,
      suggestions: suggestions
    };
    return result;
  }
};

module.exports = feedback;



},{"./scoring":9}],6:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var frequency_lists;

frequency_lists = {
  passwords: "123456,password,12345678,qwerty,123456789,12345,1234,111111,1234567,dragon,123123,baseball,abc123,football,monkey,letmein,shadow,master,696969,mustang,666666,qwertyuiop,123321,1234567890,pussy,superman,654321,1qaz2wsx,7777777,fuckyou,qazwsx,jordan,123qwe,000000,killer,trustno1,hunter,harley,zxcvbnm,asdfgh,buster,batman,soccer,tigger,charlie,sunshine,iloveyou,fuckme,ranger,hockey,computer,starwars,asshole,pepper,klaster,112233,zxcvbn,freedom,princess,maggie,pass,ginger,11111111,131313,fuck,love,cheese,159753,summer,chelsea,dallas,biteme,matrix,yankees,6969,corvette,austin,access,thunder,merlin,secret,diamond,hello,hammer,fucker,1234qwer,silver,gfhjkm,internet,samantha,golfer,scooter,test,orange,cookie,q1w2e3r4t5,maverick,sparky,phoenix,mickey,bigdog,snoopy,guitar,whatever,chicken,camaro,mercedes,peanut,ferrari,falcon,cowboy,welcome,sexy,samsung,steelers,smokey,dakota,arsenal,boomer,eagles,tigers,marina,nascar,booboo,gateway,yellow,porsche,monster,spider,diablo,hannah,bulldog,junior,london,purple,compaq,lakers,iceman,qwer1234,hardcore,cowboys,money,banana,ncc1701,boston,tennis,q1w2e3r4,coffee,scooby,123654,nikita,yamaha,mother,barney,brandy,chester,fuckoff,oliver,player,forever,rangers,midnight,chicago,bigdaddy,redsox,angel,badboy,fender,jasper,slayer,rabbit,natasha,marine,bigdick,wizard,marlboro,raiders,prince,casper,fishing,flower,jasmine,iwantu,panties,adidas,winter,winner,gandalf,password1,enter,ghbdtn,1q2w3e4r,golden,cocacola,jordan23,winston,madison,angels,panther,blowme,sexsex,bigtits,spanky,bitch,sophie,asdfasdf,horny,thx1138,toyota,tiger,dick,canada,12344321,blowjob,8675309,muffin,liverpoo,apples,qwerty123,passw0rd,abcd1234,pokemon,123abc,slipknot,qazxsw,123456a,scorpion,qwaszx,butter,startrek,rainbow,asdfghjkl,razz,newyork,redskins,gemini,cameron,qazwsxedc,florida,liverpool,turtle,sierra,viking,booger,butthead,doctor,rocket,159357,dolphins,captain,bandit,jaguar,packers,pookie,peaches,789456,asdf,dolphin,helpme,blue,theman,maxwell,qwertyui,shithead,lovers,maddog,giants,nirvana,metallic,hotdog,rosebud,mountain,warrior,stupid,elephant,suckit,success,bond007,jackass,alexis,porn,lucky,scorpio,samson,q1w2e3,azerty,rush2112,driver,freddy,1q2w3e4r5t,sydney,gators,dexter,red123,123456q,12345a,bubba,creative,voodoo,golf,trouble,america,nissan,gunner,garfield,bullshit,asdfghjk,5150,fucking,apollo,1qazxsw2,2112,eminem,legend,airborne,bear,beavis,apple,brooklyn,godzilla,skippy,4815162342,buddy,qwert,kitten,magic,shelby,beaver,phantom,asdasd,xavier,braves,darkness,blink182,copper,platinum,qweqwe,tomcat,01012011,girls,bigboy,102030,animal,police,online,11223344,voyager,lifehack,12qwaszx,fish,sniper,315475,trinity,blazer,heaven,lover,snowball,playboy,loveme,bubbles,hooters,cricket,willow,donkey,topgun,nintendo,saturn,destiny,pakistan,pumpkin,digital,sergey,redwings,explorer,tits,private,runner,therock,guinness,lasvegas,beatles,789456123,fire,cassie,christin,qwerty1,celtic,asdf1234,andrey,broncos,007007,babygirl,eclipse,fluffy,cartman,michigan,carolina,testing,alexande,birdie,pantera,cherry,vampire,mexico,dickhead,buffalo,genius,montana,beer,minecraft,maximus,flyers,lovely,stalker,metallica,doggie,snickers,speedy,bronco,lol123,paradise,yankee,horses,magnum,dreams,147258369,lacrosse,ou812,goober,enigma,qwertyu,scotty,pimpin,bollocks,surfer,cock,poohbear,genesis,star,asd123,qweasdzxc,racing,hello1,hawaii,eagle1,viper,poopoo,einstein,boobies,12345q,bitches,drowssap,simple,badger,alaska,action,jester,drummer,111222,spitfire,forest,maryjane,champion,diesel,svetlana,friday,hotrod,147258,chevy,lucky1,westside,security,google,badass,tester,shorty,thumper,hitman,mozart,zaq12wsx,boobs,reddog,010203,lizard,a123456,123456789a,ruslan,eagle,1232323q,scarface,qwerty12,147852,a12345,buddha,porno,420420,spirit,money1,stargate,qwe123,naruto,mercury,liberty,12345qwert,semperfi,suzuki,popcorn,spooky,marley,scotland,kitty,cherokee,vikings,simpsons,rascal,qweasd,hummer,loveyou,michael1,patches,russia,jupiter,penguin,passion,cumshot,vfhbyf,honda,vladimir,sandman,passport,raider,bastard,123789,infinity,assman,bulldogs,fantasy,sucker,1234554321,horney,domino,budlight,disney,ironman,usuckballz1,softball,brutus,redrum,bigred,mnbvcxz,fktrcfylh,karina,marines,digger,kawasaki,cougar,fireman,oksana,monday,cunt,justice,nigger,super,wildcats,tinker,logitech,dancer,swordfis,avalon,everton,alexandr,motorola,patriots,hentai,madonna,pussy1,ducati,colorado,connor,juventus,galore,smooth,freeuser,warcraft,boogie,titanic,wolverin,elizabet,arizona,valentin,saints,asdfg,accord,test123,password123,christ,yfnfif,stinky,slut,spiderma,naughty,chopper,hello123,ncc1701d,extreme,skyline,poop,zombie,pearljam,123qweasd,froggy,awesome,vision,pirate,fylhtq,dreamer,bullet,predator,empire,123123a,kirill,charlie1,panthers,penis,skipper,nemesis,rasdzv3,peekaboo,rolltide,cardinal,psycho,danger,mookie,happy1,wanker,chevelle,manutd,goblue,9379992,hobbes,vegeta,fyfcnfcbz,852456,picard,159951,windows,loverboy,victory,vfrcbv,bambam,serega,123654789,turkey,tweety,galina,hiphop,rooster,changeme,berlin,taurus,suckme,polina,electric,avatar,134679,maksim,raptor,alpha1,hendrix,newport,bigcock,brazil,spring,a1b2c3,madmax,alpha,britney,sublime,darkside,bigman,wolfpack,classic,hercules,ronaldo,letmein1,1q2w3e,741852963,spiderman,blizzard,123456789q,cheyenne,cjkysirj,tiger1,wombat,bubba1,pandora,zxc123,holiday,wildcat,devils,horse,alabama,147852369,caesar,12312,buddy1,bondage,pussycat,pickle,shaggy,catch22,leather,chronic,a1b2c3d4,admin,qqq111,qaz123,airplane,kodiak,freepass,billybob,sunset,katana,phpbb,chocolat,snowman,angel1,stingray,firebird,wolves,zeppelin,detroit,pontiac,gundam,panzer,vagina,outlaw,redhead,tarheels,greenday,nastya,01011980,hardon,engineer,dragon1,hellfire,serenity,cobra,fireball,lickme,darkstar,1029384756,01011,mustang1,flash,124578,strike,beauty,pavilion,01012000,bobafett,dbrnjhbz,bigmac,bowling,chris1,ytrewq,natali,pyramid,rulez,welcome1,dodgers,apache,swimming,whynot,teens,trooper,fuckit,defender,precious,135790,packard,weasel,popeye,lucifer,cancer,icecream,142536,raven,swordfish,presario,viktor,rockstar,blonde,james1,wutang,spike,pimp,atlanta,airforce,thailand,casino,lennon,mouse,741852,hacker,bluebird,hawkeye,456123,theone,catfish,sailor,goldfish,nfnmzyf,tattoo,pervert,barbie,maxima,nipples,machine,trucks,wrangler,rocks,tornado,lights,cadillac,bubble,pegasus,madman,longhorn,browns,target,666999,eatme,qazwsx123,microsoft,dilbert,christia,baller,lesbian,shooter,xfiles,seattle,qazqaz,cthutq,amateur,prelude,corona,freaky,malibu,123qweasdzxc,assassin,246810,atlantis,integra,pussies,iloveu,lonewolf,dragons,monkey1,unicorn,software,bobcat,stealth,peewee,openup,753951,srinivas,zaqwsx,valentina,shotgun,trigger,veronika,bruins,coyote,babydoll,joker,dollar,lestat,rocky1,hottie,random,butterfly,wordpass,smiley,sweety,snake,chipper,woody,samurai,devildog,gizmo,maddie,soso123aljg,mistress,freedom1,flipper,express,hjvfirf,moose,cessna,piglet,polaris,teacher,montreal,cookies,wolfgang,scully,fatboy,wicked,balls,tickle,bunny,dfvgbh,foobar,transam,pepsi,fetish,oicu812,basketba,toshiba,hotstuff,sunday,booty,gambit,31415926,impala,stephani,jessica1,hooker,lancer,knicks,shamrock,fuckyou2,stinger,314159,redneck,deftones,squirt,siemens,blaster,trucker,subaru,renegade,ibanez,manson,swinger,reaper,blondie,mylove,galaxy,blahblah,enterpri,travel,1234abcd,babylon5,indiana,skeeter,master1,sugar,ficken,smoke,bigone,sweetpea,fucked,trfnthbyf,marino,escort,smitty,bigfoot,babes,larisa,trumpet,spartan,valera,babylon,asdfghj,yankees1,bigboobs,stormy,mister,hamlet,aardvark,butterfl,marathon,paladin,cavalier,manchester,skater,indigo,hornet,buckeyes,01011990,indians,karate,hesoyam,toronto,diamonds,chiefs,buckeye,1qaz2wsx3edc,highland,hotsex,charger,redman,passwor,maiden,drpepper,storm,pornstar,garden,12345678910,pencil,sherlock,timber,thuglife,insane,pizza,jungle,jesus1,aragorn,1a2b3c,hamster,david1,triumph,techno,lollol,pioneer,catdog,321654,fktrctq,morpheus,141627,pascal,shadow1,hobbit,wetpussy,erotic,consumer,blabla,justme,stones,chrissy,spartak,goforit,burger,pitbull,adgjmptw,italia,barcelona,hunting,colors,kissme,virgin,overlord,pebbles,sundance,emerald,doggy,racecar,irina,element,1478963,zipper,alpine,basket,goddess,poison,nipple,sakura,chichi,huskers,13579,pussys,q12345,ultimate,ncc1701e,blackie,nicola,rommel,matthew1,caserta,omega,geronimo,sammy1,trojan,123qwe123,philips,nugget,tarzan,chicks,aleksandr,bassman,trixie,portugal,anakin,dodger,bomber,superfly,madness,q1w2e3r4t5y6,loser,123asd,fatcat,ybrbnf,soldier,warlock,wrinkle1,desire,sexual,babe,seminole,alejandr,951753,11235813,westham,andrei,concrete,access14,weed,letmein2,ladybug,naked,christop,trombone,tintin,bluesky,rhbcnbyf,qazxswedc,onelove,cdtnkfyf,whore,vfvjxrf,titans,stallion,truck,hansolo,blue22,smiles,beagle,panama,kingkong,flatron,inferno,mongoose,connect,poiuyt,snatch,qawsed,juice,blessed,rocker,snakes,turbo,bluemoon,sex4me,finger,jamaica,a1234567,mulder,beetle,fuckyou1,passat,immortal,plastic,123454321,anthony1,whiskey,dietcoke,suck,spunky,magic1,monitor,cactus,exigen,planet,ripper,teen,spyder,apple1,nolimit,hollywoo,sluts,sticky,trunks,1234321,14789632,pickles,sailing,bonehead,ghbdtnbr,delta,charlott,rubber,911911,112358,molly1,yomama,hongkong,jumper,william1,ilovesex,faster,unreal,cumming,memphis,1123581321,nylons,legion,sebastia,shalom,pentium,geheim,werewolf,funtime,ferret,orion,curious,555666,niners,cantona,sprite,philly,pirates,abgrtyu,lollipop,eternity,boeing,super123,sweets,cooldude,tottenha,green1,jackoff,stocking,7895123,moomoo,martini,biscuit,drizzt,colt45,fossil,makaveli,snapper,satan666,maniac,salmon,patriot,verbatim,nasty,shasta,asdzxc,shaved,blackcat,raistlin,qwerty12345,punkrock,cjkywt,01012010,4128,waterloo,crimson,twister,oxford,musicman,seinfeld,biggie,condor,ravens,megadeth,wolfman,cosmos,sharks,banshee,keeper,foxtrot,gn56gn56,skywalke,velvet,black1,sesame,dogs,squirrel,privet,sunrise,wolverine,sucks,legolas,grendel,ghost,cats,carrot,frosty,lvbnhbq,blades,stardust,frog,qazwsxed,121314,coolio,brownie,groovy,twilight,daytona,vanhalen,pikachu,peanuts,licker,hershey,jericho,intrepid,ninja,1234567a,zaq123,lobster,goblin,punisher,strider,shogun,kansas,amadeus,seven7,jason1,neptune,showtime,muscle,oldman,ekaterina,rfrfirf,getsome,showme,111222333,obiwan,skittles,danni,tanker,maestro,tarheel,anubis,hannibal,anal,newlife,gothic,shark,fighter,blue123,blues,123456z,princes,slick,chaos,thunder1,sabine,1q2w3e4r5t6y,python,test1,mirage,devil,clover,tequila,chelsea1,surfing,delete,potato,chubby,panasonic,sandiego,portland,baggins,fusion,sooners,blackdog,buttons,californ,moscow,playtime,mature,1a2b3c4d,dagger,dima,stimpy,asdf123,gangster,warriors,iverson,chargers,byteme,swallow,liquid,lucky7,dingdong,nymets,cracker,mushroom,456852,crusader,bigguy,miami,dkflbvbh,bugger,nimrod,tazman,stranger,newpass,doodle,powder,gotcha,guardian,dublin,slapshot,septembe,147896325,pepsi1,milano,grizzly,woody1,knights,photos,2468,nookie,charly,rammstein,brasil,123321123,scruffy,munchkin,poopie,123098,kittycat,latino,walnut,1701,thegame,viper1,1passwor,kolobok,picasso,robert1,barcelon,bananas,trance,auburn,coltrane,eatshit,goodluck,starcraft,wheels,parrot,postal,blade,wisdom,pink,gorilla,katerina,pass123,andrew1,shaney14,dumbass,osiris,fuck_inside,oakland,discover,ranger1,spanking,lonestar,bingo,meridian,ping,heather1,dookie,stonecol,megaman,192837465,rjntyjr,ledzep,lowrider,25802580,richard1,firefly,griffey,racerx,paradox,ghjcnj,gangsta,zaq1xsw2,tacobell,weezer,sirius,halflife,buffett,shiloh,123698745,vertigo,sergei,aliens,sobaka,keyboard,kangaroo,sinner,soccer1,0.0.000,bonjour,socrates,chucky,hotboy,sprint,0007,sarah1,scarlet,celica,shazam,formula1,sommer,trebor,qwerasdf,jeep,mailcreated5240,bollox,asshole1,fuckface,honda1,rebels,vacation,lexmark,penguins,12369874,ragnarok,formula,258456,tempest,vfhecz,tacoma,qwertz,colombia,flames,rockon,duck,prodigy,wookie,dodgeram,mustangs,123qaz,sithlord,smoker,server,bang,incubus,scoobydo,oblivion,molson,kitkat,titleist,rescue,zxcv1234,carpet,1122,bigballs,tardis,jimbob,xanadu,blueeyes,shaman,mersedes,pooper,pussy69,golfing,hearts,mallard,12312312,kenwood,patrick1,dogg,cowboys1,oracle,123zxc,nuttertools,102938,topper,1122334455,shemale,sleepy,gremlin,yourmom,123987,gateway1,printer,monkeys,peterpan,mikey,kingston,cooler,analsex,jimbo,pa55word,asterix,freckles,birdman,frank1,defiant,aussie,stud,blondes,tatyana,445566,aspirine,mariners,jackal,deadhead,katrin,anime,rootbeer,frogger,polo,scooter1,hallo,noodles,thomas1,parola,shaolin,celine,11112222,plymouth,creampie,justdoit,ohyeah,fatass,assfuck,amazon,1234567q,kisses,magnus,camel,nopass,bosco,987456,6751520,harley1,putter,champs,massive,spidey,lightnin,camelot,letsgo,gizmodo,aezakmi,bones,caliente,12121,goodtime,thankyou,raiders1,brucelee,redalert,aquarius,456654,catherin,smokin,pooh,mypass,astros,roller,porkchop,sapphire,qwert123,kevin1,a1s2d3f4,beckham,atomic,rusty1,vanilla,qazwsxedcrfv,hunter1,kaktus,cxfcnmt,blacky,753159,elvis1,aggies,blackjac,bangkok,scream,123321q,iforgot,power1,kasper,abc12,buster1,slappy,shitty,veritas,chevrole,amber1,01012001,vader,amsterdam,jammer,primus,spectrum,eduard,granny,horny1,sasha1,clancy,usa123,satan,diamond1,hitler,avenger,1221,spankme,123456qwerty,simba,smudge,scrappy,labrador,john316,syracuse,front242,falcons,husker,candyman,commando,gator,pacman,delta1,pancho,krishna,fatman,clitoris,pineappl,lesbians,8j4ye3uz,barkley,vulcan,punkin,boner,celtics,monopoly,flyboy,romashka,hamburg,123456aa,lick,gangbang,223344,area51,spartans,aaa111,tricky,snuggles,drago,homerun,vectra,homer1,hermes,topcat,cuddles,infiniti,1234567890q,cosworth,goose,phoenix1,killer1,ivanov,bossman,qawsedrf,peugeot,exigent,doberman,durango,brandon1,plumber,telefon,horndog,laguna,rbhbkk,dawg,webmaster,breeze,beast,porsche9,beefcake,leopard,redbull,oscar1,topdog,godsmack,theking,pics,omega1,speaker,viktoria,fuckers,bowler,starbuck,gjkbyf,valhalla,anarchy,blacks,herbie,kingpin,starfish,nokia,loveit,achilles,906090,labtec,ncc1701a,fitness,jordan1,brando,arsenal1,bull,kicker,napass,desert,sailboat,bohica,tractor,hidden,muppet,jackson1,jimmy1,terminator,phillies,pa55w0rd,terror,farside,swingers,legacy,frontier,butthole,doughboy,jrcfyf,tuesday,sabbath,daniel1,nebraska,homers,qwertyuio,azamat,fallen,agent007,striker,camels,iguana,looker,pinkfloy,moloko,qwerty123456,dannyboy,luckydog,789654,pistol,whocares,charmed,skiing,select,franky,puppy,daniil,vladik,vette,vfrcbvrf,ihateyou,nevada,moneys,vkontakte,mandingo,puppies,666777,mystic,zidane,kotenok,dilligaf,budman,bunghole,zvezda,123457,triton,golfball,technics,trojans,panda,laptop,rookie,01011991,15426378,aberdeen,gustav,jethro,enterprise,igor,stripper,filter,hurrican,rfnthbyf,lespaul,gizmo1,butch,132435,dthjybrf,1366613,excalibu,963852,nofear,momoney,possum,cutter,oilers,moocow,cupcake,gbpltw,batman1,splash,svetik,super1,soleil,bogdan,melissa1,vipers,babyboy,tdutybq,lancelot,ccbill,keystone,passwort,flamingo,firefox,dogman,vortex,rebel,noodle,raven1,zaphod,killme,pokemon1,coolman,danila,designer,skinny,kamikaze,deadman,gopher,doobie,warhammer,deeznuts,freaks,engage,chevy1,steve1,apollo13,poncho,hammers,azsxdc,dracula,000007,sassy,bitch1,boots,deskjet,12332,macdaddy,mighty,rangers1,manchest,sterlin,casey1,meatball,mailman,sinatra,cthulhu,summer1,bubbas,cartoon,bicycle,eatpussy,truelove,sentinel,tolkien,breast,capone,lickit,summit,123456k,peter1,daisy1,kitty1,123456789z,crazy1,jamesbon,texas1,sexygirl,362436,sonic,billyboy,redhot,microsof,microlab,daddy1,rockets,iloveyo,fernand,gordon24,danie,cutlass,polska,star69,titties,pantyhos,01011985,thekid,aikido,gofish,mayday,1234qwe,coke,anfield,sony,lansing,smut,scotch,sexx,catman,73501505,hustler,saun,dfkthbz,passwor1,jenny1,azsxdcfv,cheers,irish1,gabrie,tinman,orioles,1225,charlton,fortuna,01011970,airbus,rustam,xtreme,bigmoney,zxcasd,retard,grumpy,huskies,boxing,4runner,kelly1,ultima,warlord,fordf150,oranges,rotten,asdfjkl,superstar,denali,sultan,bikini,saratoga,thor,figaro,sixers,wildfire,vladislav,128500,sparta,mayhem,greenbay,chewie,music1,number1,cancun,fabie,mellon,poiuytrewq,cloud9,crunch,bigtime,chicken1,piccolo,bigbird,321654987,billy1,mojo,01011981,maradona,sandro,chester1,bizkit,rjirfrgbde,789123,rightnow,jasmine1,hyperion,treasure,meatloaf,armani,rovers,jarhead,01011986,cruise,coconut,dragoon,utopia,davids,cosmo,rfhbyf,reebok,1066,charli,giorgi,sticks,sayang,pass1234,exodus,anaconda,zaqxsw,illini,woofwoof,emily1,sandy1,packer,poontang,govols,jedi,tomato,beaner,cooter,creamy,lionking,happy123,albatros,poodle,kenworth,dinosaur,greens,goku,happyday,eeyore,tsunami,cabbage,holyshit,turkey50,memorex,chaser,bogart,orgasm,tommy1,volley,whisper,knopka,ericsson,walleye,321123,pepper1,katie1,chickens,tyler1,corrado,twisted,100000,zorro,clemson,zxcasdqwe,tootsie,milana,zenith,fktrcfylhf,shania,frisco,polniypizdec0211,crazybab,junebug,fugazi,rereirf,vfvekz,1001,sausage,vfczyz,koshka,clapton,justin1,anhyeuem,condom,fubar,hardrock,skywalker,tundra,cocks,gringo,150781,canon,vitalik,aspire,stocks,samsung1,applepie,abc12345,arjay,gandalf1,boob,pillow,sparkle,gmoney,rockhard,lucky13,samiam,everest,hellyeah,bigsexy,skorpion,rfrnec,hedgehog,australi,candle,slacker,dicks,voyeur,jazzman,america1,bobby1,br0d3r,wolfie,vfksirf,1qa2ws3ed,13243546,fright,yosemite,temp,karolina,fart,barsik,surf,cheetah,baddog,deniska,starship,bootie,milena,hithere,kume,greatone,dildo,50cent,0.0.0.000,albion,amanda1,midget,lion,maxell,football1,cyclone,freeporn,nikola,bonsai,kenshin,slider,balloon,roadkill,killbill,222333,jerkoff,78945612,dinamo,tekken,rambler,goliath,cinnamon,malaka,backdoor,fiesta,packers1,rastaman,fletch,sojdlg123aljg,stefano,artemis,calico,nyjets,damnit,robotech,duchess,rctybz,hooter,keywest,18436572,hal9000,mechanic,pingpong,operator,presto,sword,rasputin,spank,bristol,faggot,shado,963852741,amsterda,321456,wibble,carrera,alibaba,majestic,ramses,duster,route66,trident,clipper,steeler,wrestlin,divine,kipper,gotohell,kingfish,snake1,passwords,buttman,pompey,viagra,zxcvbnm1,spurs,332211,slutty,lineage2,oleg,macross,pooter,brian1,qwert1,charles1,slave,jokers,yzerman,swimmer,ne1469,nwo4life,solnce,seamus,lolipop,pupsik,moose1,ivanova,secret1,matador,love69,420247,ktyjxrf,subway,cinder,vermont,pussie,chico,florian,magick,guiness,allsop,ghetto,flash1,a123456789,typhoon,dfkthf,depeche,skydive,dammit,seeker,fuckthis,crysis,kcj9wx5n,umbrella,r2d2c3po,123123q,snoopdog,critter,theboss,ding,162534,splinter,kinky,cyclops,jayhawk,456321,caramel,qwer123,underdog,caveman,onlyme,grapes,feather,hotshot,fuckher,renault,george1,sex123,pippen,000001,789987,floppy,cunts,megapass,1000,pornos,usmc,kickass,great1,quattro,135246,wassup,helloo,p0015123,nicole1,chivas,shannon1,bullseye,java,fishes,blackhaw,jamesbond,tunafish,juggalo,dkflbckfd,123789456,dallas1,translator,122333,beanie,alucard,gfhjkm123,supersta,magicman,ashley1,cohiba,xbox360,caligula,12131415,facial,7753191,dfktynbyf,cobra1,cigars,fang,klingon,bob123,safari,looser,10203,deepthroat,malina,200000,tazmania,gonzo,goalie,jacob1,monaco,cruiser,misfit,vh5150,tommyboy,marino13,yousuck,sharky,vfhufhbnf,horizon,absolut,brighton,123456r,death1,kungfu,maxx,forfun,mamapapa,enter1,budweise,banker,getmoney,kostya,qazwsx12,bigbear,vector,fallout,nudist,gunners,royals,chainsaw,scania,trader,blueboy,walrus,eastside,kahuna,qwerty1234,love123,steph,01011989,cypress,champ,undertaker,ybrjkfq,europa,snowboar,sabres,moneyman,chrisbln,minime,nipper,groucho,whitey,viewsonic,penthous,wolf359,fabric,flounder,coolguy,whitesox,passme,smegma,skidoo,thanatos,fucku2,snapple,dalejr,mondeo,thesims,mybaby,panasoni,sinbad,thecat,topher,frodo,sneakers,q123456,z1x2c3,alfa,chicago1,taylor1,ghjcnjnfr,cat123,olivier,cyber,titanium,0420,madison1,jabroni,dang,hambone,intruder,holly1,gargoyle,sadie1,static,poseidon,studly,newcastl,sexxxx,poppy,johannes,danzig,beastie,musica,buckshot,sunnyday,adonis,bluedog,bonkers,2128506,chrono,compute,spawn,01011988,turbo1,smelly,wapbbs,goldstar,ferrari1,778899,quantum,pisces,boomboom,gunnar,1024,test1234,florida1,nike,superman1,multiplelo,custom,motherlode,1qwerty,westwood,usnavy,apple123,daewoo,korn,stereo,sasuke,sunflowe,watcher,dharma,555777,mouse1,assholes,babyblue,123qwerty,marius,walmart,snoop,starfire,tigger1,paintbal,knickers,aaliyah,lokomotiv,theend,winston1,sapper,rover,erotica,scanner,racer,zeus,sexy69,doogie,bayern,joshua1,newbie,scott1,losers,droopy,outkast,martin1,dodge1,wasser,ufkbyf,rjycnfynby,thirteen,12345z,112211,hotred,deejay,hotpussy,192837,jessic,philippe,scout,panther1,cubbies,havefun,magpie,fghtkm,avalanch,newyork1,pudding,leonid,harry1,cbr600,audia4,bimmer,fucku,01011984,idontknow,vfvfgfgf,1357,aleksey,builder,01011987,zerocool,godfather,mylife,donuts,allmine,redfish,777888,sascha,nitram,bounce,333666,smokes,1x2zkg8w,rodman,stunner,zxasqw12,hoosier,hairy,beretta,insert,123456s,rtyuehe,francesc,tights,cheese1,micron,quartz,hockey1,gegcbr,searay,jewels,bogey,paintball,celeron,padres,bing,syncmaster,ziggy,simon1,beaches,prissy,diehard,orange1,mittens,aleksandra,queens,02071986,biggles,thongs,southpark,artur,twinkle,gretzky,rabota,cambiami,monalisa,gollum,chuckles,spike1,gladiator,whisky,spongebob,sexy1,03082006,mazafaka,meathead,4121,ou8122,barefoot,12345678q,cfitymrf,bigass,a1s2d3,kosmos,blessing,titty,clevelan,terrapin,ginger1,johnboy,maggot,clarinet,deeznutz,336699,stumpy,stoney,footbal,traveler,volvo,bucket,snapon,pianoman,hawkeyes,futbol,casanova,tango,goodboy,scuba,honey1,sexyman,warthog,mustard,abc1234,nickel,10203040,meowmeow,1012,boricua,prophet,sauron,12qwas,reefer,andromeda,crystal1,joker1,90210,goofy,loco,lovesex,triangle,whatsup,mellow,bengals,monster1,maste,01011910,lover1,love1,123aaa,sunshin,smeghead,hokies,sting,welder,rambo,cerberus,bunny1,rockford,monke,1q2w3e4r5,goldwing,gabriell,buzzard,crjhgbjy,james007,rainman,groove,tiberius,purdue,nokia6300,hayabusa,shou,jagger,diver,zigzag,poochie,usarmy,phish,redwood,redwing,12345679,salamander,silver1,abcd123,sputnik,boobie,ripple,eternal,12qw34er,thegreat,allstar,slinky,gesperrt,mishka,whiskers,pinhead,overkill,sweet1,rhfcjnrf,montgom240,sersolution,jamie1,starman,proxy,swords,nikolay,bacardi,rasta,badgirl,rebecca1,wildman,penny1,spaceman,1007,10101,logan1,hacked,bulldog1,helmet,windsor,buffy1,runescape,trapper,123451,banane,dbrnjh,ripken,12345qwe,frisky,shun,fester,oasis,lightning,ib6ub9,cicero,kool,pony,thedog,784512,01011992,megatron,illusion,edward1,napster,11223,squash,roadking,woohoo,19411945,hoosiers,01091989,tracker,bagira,midway,leavemealone,br549,14725836,235689,menace,rachel1,feng,laser,stoned,realmadrid,787898,balloons,tinkerbell,5551212,maria1,pobeda,heineken,sonics,moonlight,optimus,comet,orchid,02071982,jaybird,kashmir,12345678a,chuang,chunky,peach,mortgage,rulezzz,saleen,chuckie,zippy,fishing1,gsxr750,doghouse,maxim,reader,shai,buddah,benfica,chou,salomon,meister,eraser,blackbir,bigmike,starter,pissing,angus,deluxe,eagles1,hardcock,135792468,mian,seahawks,godfathe,bookworm,gregor,intel,talisman,blackjack,babyface,hawaiian,dogfood,zhong,01011975,sancho,ludmila,medusa,mortimer,123456654321,roadrunn,just4me,stalin,01011993,handyman,alphabet,pizzas,calgary,clouds,password2,cgfhnfr,f**k,cubswin,gong,lexus,max123,xxx123,digital1,gfhjkm1,7779311,missy1,michae,beautifu,gator1,1005,pacers,buddie,chinook,heckfy,dutchess,sally1,breasts,beowulf,darkman,jenn,tiffany1,zhei,quan,qazwsx1,satana,shang,idontkno,smiths,puddin,nasty1,teddybea,valkyrie,passwd,chao,boxster,killers,yoda,cheater,inuyasha,beast1,wareagle,foryou,dragonball,mermaid,bhbirf,teddy1,dolphin1,misty1,delphi,gromit,sponge,qazzaq,fytxrf,gameover,diao,sergi,beamer,beemer,kittykat,rancid,manowar,adam12,diggler,assword,austin1,wishbone,gonavy,sparky1,fisting,thedude,sinister,1213,venera,novell,salsero,jayden,fuckoff1,linda1,vedder,02021987,1pussy,redline,lust,jktymrf,02011985,dfcbkbq,dragon12,chrome,gamecube,titten,cong,bella1,leng,02081988,eureka,bitchass,147369,banner,lakota,123321a,mustafa,preacher,hotbox,02041986,z1x2c3v4,playstation,01011977,claymore,electra,checkers,zheng,qing,armagedon,02051986,wrestle,svoboda,bulls,nimbus,alenka,madina,newpass6,onetime,aa123456,bartman,02091987,silverad,electron,12345t,devil666,oliver1,skylar,rhtdtlrj,gobucks,johann,12011987,milkman,02101985,camper,thunderb,bigbutt,jammin,davide,cheeks,goaway,lighter,claudi,thumbs,pissoff,ghostrider,cocaine,teng,squall,lotus,hootie,blackout,doitnow,subzero,02031986,marine1,02021988,pothead,123456qw,skate,1369,peng,antoni,neng,miao,bcfields,1492,marika,794613,musashi,tulips,nong,piao,chai,ruan,southpar,02061985,nude,mandarin,654123,ninjas,cannabis,jetski,xerxes,zhuang,kleopatra,dickie,bilbo,pinky,morgan1,1020,1017,dieter,baseball1,tottenham,quest,yfnfkmz,dirtbike,1234567890a,mango,jackson5,ipswich,iamgod,02011987,tdutybz,modena,qiao,slippery,qweasd123,bluefish,samtron,toon,111333,iscool,02091986,petrov,fuzzy,zhou,1357924680,mollydog,deng,02021986,1236987,pheonix,zhun,ghblehjr,othello,starcraf,000111,sanfran,a11111,cameltoe,badman,vasilisa,jiang,1qaz2ws,luan,sveta,12qw12,akira,chuai,369963,cheech,beatle,pickup,paloma,01011983,caravan,elizaveta,gawker,banzai,pussey,mullet,seng,bingo1,bearcat,flexible,farscape,borussia,zhuai,templar,guitar1,toolman,yfcntymrf,chloe1,xiang,slave1,guai,nuggets,02081984,mantis,slim,scorpio1,fyutkbyf,thedoors,02081987,02061986,123qq123,zappa,fergie,7ugd5hip2j,huai,asdfzxcv,sunflower,pussyman,deadpool,bigtit,01011982,love12,lassie,skyler,gatorade,carpedie,jockey,mancity,spectre,02021984,cameron1,artemka,reng,02031984,iomega,jing,moritz,spice,rhino,spinner,heater,zhai,hover,talon,grease,qiong,corleone,ltybcrf,tian,cowboy1,hippie,chimera,ting,alex123,02021985,mickey1,corsair,sonoma,aaron1,xxxpass,bacchus,webmaste,chuo,xyz123,chrysler,spurs1,artem,shei,cosmic,01020304,deutsch,gabriel1,123455,oceans,987456321,binladen,latinas,a12345678,speedo,buttercu,02081989,21031988,merlot,millwall,ceng,kotaku,jiong,dragonba,2580,stonecold,snuffy,01011999,02011986,hellos,blaze,maggie1,slapper,istanbul,bonjovi,babylove,mazda,bullfrog,phoeni,meng,porsche1,nomore,02061989,bobdylan,capslock,orion1,zaraza,teddybear,ntktajy,myname,rong,wraith,mets,niao,02041984,smokie,chevrolet,dialog,gfhjkmgfhjkm,dotcom,vadim,monarch,athlon,mikey1,hamish,pian,liang,coolness,chui,thoma,ramones,ciccio,chippy,eddie1,house1,ning,marker,cougars,jackpot,barbados,reds,pdtplf,knockers,cobalt,amateurs,dipshit,napoli,kilroy,pulsar,jayhawks,daemon,alexey,weng,shuang,9293709b13,shiner,eldorado,soulmate,mclaren,golfer1,andromed,duan,50spanks,sexyboy,dogshit,02021983,shuo,kakashka,syzygy,111111a,yeahbaby,qiang,netscape,fulham,120676,gooner,zhui,rainbow6,laurent,dog123,halifax,freeway,carlitos,147963,eastwood,microphone,monkey12,1123,persik,coldbeer,geng,nuan,danny1,fgtkmcby,entropy,gadget,just4fun,sophi,baggio,carlito,1234567891,02021989,02041983,specialk,piramida,suan,bigblue,salasana,hopeful,mephisto,bailey1,hack,annie1,generic,violetta,spencer1,arcadia,02051983,hondas,9562876,trainer,jones1,smashing,liao,159632,iceberg,rebel1,snooker,temp123,zang,matteo,fastball,q2w3e4r5,bamboo,fuckyo,shutup,astro,buddyboy,nikitos,redbird,maxxxx,shitface,02031987,kuai,kissmyass,sahara,radiohea,1234asdf,wildcard,maxwell1,patric,plasma,heynow,bruno1,shao,bigfish,misfits,sassy1,sheng,02011988,02081986,testpass,nanook,cygnus,licking,slavik,pringles,xing,1022,ninja1,submit,dundee,tiburon,pinkfloyd,yummy,shuai,guang,chopin,obelix,insomnia,stroker,1a2s3d4f,1223,playboy1,lazarus,jorda,spider1,homerj,sleeper,02041982,darklord,cang,02041988,02041987,tripod,magician,jelly,telephon,15975,vsjasnel12,pasword,iverson3,pavlov,homeboy,gamecock,amigo,brodie,budapest,yjdsqgfhjkm,reckless,02011980,pang,tiger123,2469,mason1,orient,01011979,zong,cdtnbr,maksimka,1011,bushido,taxman,giorgio,sphinx,kazantip,02101984,concorde,verizon,lovebug,georg,sam123,seadoo,qazwsxedc123,jiao,jezebel,pharmacy,abnormal,jellybea,maxime,puffy,islander,bunnies,jiggaman,drakon,010180,pluto,zhjckfd,12365,classics,crusher,mordor,hooligan,strawberry,02081985,scrabble,hawaii50,1224,wg8e3wjf,cthtuf,premium,arrow,123456qwe,mazda626,ramrod,tootie,rhjrjlbk,ghost1,1211,bounty,niang,02071984,goat,killer12,sweetnes,porno1,masamune,426hemi,corolla,mariposa,hjccbz,doomsday,bummer,blue12,zhao,bird33,excalibur,samsun,kirsty,buttfuck,kfhbcf,zhuo,marcello,ozzy,02021982,dynamite,655321,master12,123465,lollypop,stepan,1qa2ws,spiker,goirish,callum,michael2,moonbeam,attila,henry1,lindros,andrea1,sporty,lantern,12365478,nextel,violin,volcom,998877,water1,imation,inspiron,dynamo,citadel,placebo,clowns,tiao,02061988,tripper,dabears,haggis,merlin1,02031985,anthrax,amerika,iloveme,vsegda,burrito,bombers,snowboard,forsaken,katarina,a1a2a3,woofer,tigger2,fullmoon,tiger2,spock,hannah1,snoopy1,sexxxy,sausages,stanislav,cobain,robotics,exotic,green123,mobydick,senators,pumpkins,fergus,asddsa,147741,258852,windsurf,reddevil,vfitymrf,nevermind,nang,woodland,4417,mick,shui,q1q2q3,wingman,69696,superb,zuan,ganesh,pecker,zephyr,anastasiya,icu812,larry1,02081982,broker,zalupa,mihail,vfibyf,dogger,7007,paddle,varvara,schalke,1z2x3c,presiden,yankees2,tuning,poopy,02051982,concord,vanguard,stiffy,rjhjktdf,felix1,wrench,firewall,boxer,bubba69,popper,02011984,temppass,gobears,cuan,tipper,fuckme1,kamila,thong,puss,bigcat,drummer1,02031982,sowhat,digimon,tigers1,rang,jingle,bian,uranus,soprano,mandy1,dusty1,fandango,aloha,pumpkin1,postman,02061980,dogcat,bombay,pussy123,onetwo,highheel,pippo,julie1,laura1,pepito,beng,smokey1,stylus,stratus,reload,duckie,karen1,jimbo1,225588,369258,krusty,snappy,asdf12,electro,111qqq,kuang,fishin,clit,abstr,christma,qqqqq1,1234560,carnage,guyver,boxers,kittens,zeng,1000000,qwerty11,toaster,cramps,yugioh,02061987,icehouse,zxcvbnm123,pineapple,namaste,harrypotter,mygirl,falcon1,earnhard,fender1,spikes,nutmeg,01081989,dogboy,02091983,369852,softail,mypassword,prowler,bigboss,1112,harvest,heng,jubilee,killjoy,basset,keng,zaqxswcde,redsox1,biao,titan,misfit99,robot,wifey,kidrock,02101987,gameboy,enrico,1z2x3c4v,broncos1,arrows,havana,banger,cookie1,chriss,123qw,platypus,cindy1,lumber,pinball,foxy,london1,1023,05051987,02041985,password12,superma,longbow,radiohead,nigga,12051988,spongebo,qwert12345,abrakadabra,dodgers1,02101989,chillin,niceguy,pistons,hookup,santafe,bigben,jets,1013,vikings1,mankind,viktoriya,beardog,hammer1,02071980,reddwarf,magelan,longjohn,jennife,gilles,carmex2,02071987,stasik,bumper,doofus,slamdunk,pixies,garion,steffi,alessandro,beerman,niceass,warrior1,honolulu,134679852,visa,johndeer,mother1,windmill,boozer,oatmeal,aptiva,busty,delight,tasty,slick1,bergkamp,badgers,guitars,puffin,02091981,nikki1,irishman,miller1,zildjian,123000,airwolf,magnet,anai,install,02041981,02061983,astra,romans,megan1,mudvayne,freebird,muscles,dogbert,02091980,02091984,snowflak,01011900,mang,joseph1,nygiants,playstat,junior1,vjcrdf,qwer12,webhompas,giraffe,pelican,jefferso,comanche,bruiser,monkeybo,kjkszpj,123456l,micro,albany,02051987,angel123,epsilon,aladin,death666,hounddog,josephin,altima,chilly,02071988,78945,ultra,02041979,gasman,thisisit,pavel,idunno,kimmie,05051985,paulie,ballin,medion,moondog,manolo,pallmall,climber,fishbone,genesis1,153624,toffee,tbone,clippers,krypton,jerry1,picturs,compass,111111q,02051988,1121,02081977,sairam,getout,333777,cobras,22041987,bigblock,severin,booster,norwich,whiteout,ctrhtn,123456m,02061984,hewlett,shocker,fuckinside,02031981,chase1,white1,versace,123456789s,basebal,iloveyou2,bluebell,08031986,anthon,stubby,foreve,undertak,werder,saiyan,mama123,medic,chipmunk,mike123,mazdarx7,qwe123qwe,bowwow,kjrjvjnbd,celeb,choochoo,demo,lovelife,02051984,colnago,lithium,02051989,15051981,zzzxxx,welcom,anastasi,fidelio,franc,26061987,roadster,stone55,drifter,hookem,hellboy,1234qw,cbr900rr,sinned,good123654,storm1,gypsy,zebra,zachary1,toejam,buceta,02021979,testing1,redfox,lineage,mike1,highbury,koroleva,nathan1,washingt,02061982,02091985,vintage,redbaron,dalshe,mykids,11051987,macbeth,julien,james123,krasotka,111000,10011986,987123,pipeline,tatarin,sensei,codered,komodo,frogman,7894561230,nascar24,juicy,01031988,redrose,mydick,pigeon,tkbpfdtnf,smirnoff,1215,spam,winner1,flyfish,moskva,81fukkc,21031987,olesya,starligh,summer99,13041988,fishhead,freesex,super12,06061986,azazel,scoobydoo,02021981,cabron,yogibear,sheba1,konstantin,tranny,chilli,terminat,ghbywtccf,slowhand,soccer12,cricket1,fuckhead,1002,seagull,achtung,blam,bigbob,bdsm,nostromo,survivor,cnfybckfd,lemonade,boomer1,rainbow1,rober,irinka,cocksuck,peaches1,itsme,sugar1,zodiac,upyours,dinara,135791,sunny1,chiara,johnson1,02041989,solitude,habibi,sushi,markiz,smoke1,rockies,catwoman,johnny1,qwerty7,bearcats,username,01011978,wanderer,ohshit,02101986,sigma,stephen1,paradigm,02011989,flanker,sanity,jsbach,spotty,bologna,fantasia,chevys,borabora,cocker,74108520,123ewq,12021988,01061990,gtnhjdbx,02071981,01011960,sundevil,3000gt,mustang6,gagging,maggi,armstron,yfnfkb,13041987,revolver,02021976,trouble1,madcat,jeremy1,jackass1,volkswag,30051985,corndog,pool6123,marines1,03041991,pizza1,piggy,sissy,02031979,sunfire,angelus,undead,24061986,14061991,wildbill,shinobi,45m2do5bs,123qwer,21011989,cleopatr,lasvega,hornets,amorcit,11081989,coventry,nirvana1,destin,sidekick,20061988,02081983,gbhfvblf,sneaky,bmw325,22021989,nfytxrf,sekret,kalina,zanzibar,hotone,qazws,wasabi,heidi1,highlander,blues1,hitachi,paolo,23041987,slayer1,simba1,02011981,tinkerbe,kieran,01121986,172839,boiler,1125,bluesman,waffle,asdfgh01,threesom,conan,1102,reflex,18011987,nautilus,everlast,fatty,vader1,01071986,cyborg,ghbdtn123,birddog,rubble,02071983,suckers,02021973,skyhawk,12qw12qw,dakota1,joebob,nokia6233,woodie,longdong,lamer,troll,ghjcnjgfhjkm,420000,boating,nitro,armada,messiah,1031,penguin1,02091989,americ,02071989,redeye,asdqwe123,07071987,monty1,goten,spikey,sonata,635241,tokiohotel,sonyericsson,citroen,compaq1,1812,umpire,belmont,jonny,pantera1,nudes,palmtree,14111986,fenway,bighead,razor,gryphon,andyod22,aaaaa1,taco,10031988,enterme,malachi,dogface,reptile,01041985,dindom,handball,marseille,candy1,19101987,torino,tigge,matthias,viewsoni,13031987,stinker,evangelion,24011985,123456123,rampage,sandrine,02081980,thecrow,astral,28041987,sprinter,private1,seabee,shibby,02101988,25081988,fearless,junkie,01091987,aramis,antelope,draven,fuck1,mazda6,eggman,02021990,barselona,buddy123,19061987,fyfnjkbq,nancy1,12121990,10071987,sluggo,kille,hotties,irishka,zxcasdqwe123,shamus,fairlane,honeybee,soccer10,13061986,fantomas,17051988,10051987,20111986,gladiato,karachi,gambler,gordo,01011995,biatch,matthe,25800852,papito,excite,buffalo1,bobdole,cheshire,player1,28021992,thewho,10101986,pinky1,mentor,tomahawk,brown1,03041986,bismillah,bigpoppa,ijrjkfl,01121988,runaway,08121986,skibum,studman,helper,squeak,holycow,manfred,harlem,glock,gideon,987321,14021985,yellow1,wizard1,margarit,success1,medved,sf49ers,lambda,pasadena,johngalt,quasar,1776,02031980,coldplay,amand,playa,bigpimp,04041991,capricorn,elefant,sweetness,bruce1,luca,dominik,10011990,biker,09051945,datsun,elcamino,trinitro,malice,audi,voyager1,02101983,joe123,carpente,spartan1,mario1,glamour,diaper,12121985,22011988,winter1,asimov,callisto,nikolai,pebble,02101981,vendetta,david123,boytoy,11061985,02031989,iloveyou1,stupid1,cayman,casper1,zippo,yamahar1,wildwood,foxylady,calibra,02041980,27061988,dungeon,leedsutd,30041986,11051990,bestbuy,antares,dominion,24680,01061986,skillet,enforcer,derparol,01041988,196969,29071983,f00tball,purple1,mingus,25031987,21031990,remingto,giggles,klaste,3x7pxr,01011994,coolcat,29051989,megane,20031987,02051980,04041988,synergy,0000007,macman,iforget,adgjmp,vjqgfhjkm,28011987,rfvfcenhf,16051989,25121987,16051987,rogue,mamamia,08051990,20091991,1210,carnival,bolitas,paris1,dmitriy,dimas,05051989,papillon,knuckles,29011985,hola,tophat,28021990,100500,cutiepie,devo,415263,ducks,ghjuhfvvf,asdqwe,22021986,freefall,parol,02011983,zarina,buste,vitamin,warez,bigones,17061988,baritone,jamess,twiggy,mischief,bitchy,hetfield,1003,dontknow,grinch,sasha_007,18061990,12031985,12031987,calimero,224466,letmei,15011987,acmilan,alexandre,02031977,08081988,whiteboy,21051991,barney1,02071978,money123,18091985,bigdawg,02031988,cygnusx1,zoloto,31011987,firefigh,blowfish,screamer,lfybbk,20051988,chelse,11121986,01031989,harddick,sexylady,30031988,02041974,auditt,pizdec,kojak,kfgjxrf,20091988,123456ru,wp2003wp,1204,15051990,slugger,kordell1,03031986,swinging,01011974,02071979,rockie,dimples,1234123,1dragon,trucking,rusty2,roger1,marijuana,kerouac,02051978,08031985,paco,thecure,keepout,kernel,noname123,13121985,francisc,bozo,02011982,22071986,02101979,obsidian,12345qw,spud,tabasco,02051985,jaguars,dfktynby,kokomo,popova,notused,sevens,4200,magneto,02051976,roswell,15101986,21101986,lakeside,bigbang,aspen,little1,14021986,loki,suckmydick,strawber,carlos1,nokian73,dirty1,joshu,25091987,16121987,02041975,advent,17011987,slimshady,whistler,10101990,stryker,22031984,15021985,01031985,blueball,26031988,ksusha,bahamut,robocop,w_pass,chris123,impreza,prozac,bookie,bricks,13021990,alice1,cassandr,11111q,john123,4ever,korova,02051973,142857,25041988,paramedi,eclipse1,salope,07091990,1124,darkangel,23021986,999666,nomad,02051981,smackdow,01021990,yoyoma,argentin,moonligh,57chevy,bootys,hardone,capricor,galant,spanker,dkflbr,24111989,magpies,krolik,21051988,cevthrb,cheddar,22041988,bigbooty,scuba1,qwedsa,duffman,bukkake,acura,johncena,sexxy,p@ssw0rd,258369,cherries,12345s,asgard,leopold,fuck123,mopar,lalakers,dogpound,matrix1,crusty,spanner,kestrel,fenris,universa,peachy,assasin,lemmein,eggplant,hejsan,canucks,wendy1,doggy1,aikman,tupac,turnip,godlike,fussball,golden1,19283746,april1,django,petrova,captain1,vincent1,ratman,taekwondo,chocha,serpent,perfect1,capetown,vampir,amore,gymnast,timeout,nbvjatq,blue32,ksenia,k.lvbkf,nazgul,budweiser,clutch,mariya,sylveste,02051972,beaker,cartman1,q11111,sexxx,forever1,loser1,marseill,magellan,vehpbr,sexgod,jktxrf,hallo123,132456,liverpool1,southpaw,seneca,camden,357159,camero,tenchi,johndoe,145236,roofer,741963,vlad,02041978,fktyrf,zxcv123,wingnut,wolfpac,notebook,pufunga7782,brandy1,biteme1,goodgirl,redhat,02031978,challeng,millenium,hoops,maveric,noname,angus1,gaell,onion,olympus,sabrina1,ricard,sixpack,gratis,gagged,camaross,hotgirls,flasher,02051977,bubba123,goldfing,moonshin,gerrard,volkov,sonyfuck,mandrake,258963,tracer,lakers1,asians,susan1,money12,helmut,boater,diablo2,1234zxcv,dogwood,bubbles1,happy2,randy1,aries,beach1,marcius2,navigator,goodie,hellokitty,fkbyjxrf,earthlink,lookout,jumbo,opendoor,stanley1,marie1,12345m,07071977,ashle,wormix,murzik,02081976,lakewood,bluejays,loveya,commande,gateway2,peppe,01011976,7896321,goth,oreo,slammer,rasmus,faith1,knight1,stone1,redskin,ironmaiden,gotmilk,destiny1,dejavu,1master,midnite,timosha,espresso,delfin,toriamos,oberon,ceasar,markie,1a2s3d,ghhh47hj7649,vjkjrj,daddyo,dougie,disco,auggie,lekker,therock1,ou8123,start1,noway,p4ssw0rd,shadow12,333444,saigon,2fast4u,capecod,23skidoo,qazxcv,beater,bremen,aaasss,roadrunner,peace1,12345qwer,02071975,platon,bordeaux,vbkfirf,135798642,test12,supernov,beatles1,qwert40,optimist,vanessa1,prince1,ilovegod,nightwish,natasha1,alchemy,bimbo,blue99,patches1,gsxr1000,richar,hattrick,hott,solaris,proton,nevets,enternow,beavis1,amigos,159357a,ambers,lenochka,147896,suckdick,shag,intercourse,blue1234,spiral,02061977,tosser,ilove,02031975,cowgirl,canuck,q2w3e4,munch,spoons,waterboy,123567,evgeniy,savior,zasada,redcar,mamacita,terefon,globus,doggies,htubcnhfwbz,1008,cuervo,suslik,azertyui,limewire,houston1,stratfor,steaua,coors,tennis1,12345qwerty,stigmata,derf,klondike,patrici,marijuan,hardball,odyssey,nineinch,boston1,pass1,beezer,sandr,charon,power123,a1234,vauxhall,875421,awesome1,reggae,boulder,funstuff,iriska,krokodil,rfntymrf,sterva,champ1,bball,peeper,m123456,toolbox,cabernet,sheepdog,magic32,pigpen,02041977,holein1,lhfrjy,banan,dabomb,natalie1,jennaj,montana1,joecool,funky,steven1,ringo,junio,sammy123,qqqwww,baltimor,footjob,geezer,357951,mash4077,cashmone,pancake,monic,grandam,bongo,yessir,gocubs,nastia,vancouve,barley,dragon69,watford,ilikepie,02071976,laddie,123456789m,hairball,toonarmy,pimpdadd,cvthnm,hunte,davinci,lback,sophie1,firenze,q1234567,admin1,bonanza,elway7,daman,strap,azert,wxcvbn,afrika,theforce,123456t,idefix,wolfen,houdini,scheisse,default,beech,maserati,02061976,sigmachi,dylan1,bigdicks,eskimo,mizzou,02101976,riccardo,egghead,111777,kronos,ghbrjk,chaos1,jomama,rfhnjirf,rodeo,dolemite,cafc91,nittany,pathfind,mikael,password9,vqsablpzla,purpl,gabber,modelsne,myxworld,hellsing,punker,rocknrol,fishon,fuck69,02041976,lolol,twinkie,tripleh,cirrus,redbone,killer123,biggun,allegro,gthcbr,smith1,wanking,bootsy,barry1,mohawk,koolaid,5329,futurama,samoht,klizma,996633,lobo,honeys,peanut1,556677,zxasqw,joemama,javelin,samm,223322,sandra1,flicks,montag,nataly,3006,tasha1,1235789,dogbone,poker1,p0o9i8u7,goodday,smoothie,toocool,max333,metroid,archange,vagabond,billabon,22061941,tyson1,02031973,darkange,skateboard,evolutio,morrowind,wizards,frodo1,rockin,cumslut,plastics,zaqwsxcde,5201314,doit,outback,bumble,dominiqu,persona,nevermore,alinka,02021971,forgetit,sexo,all4one,c2h5oh,petunia,sheeba,kenny1,elisabet,aolsucks,woodstoc,pumper,02011975,fabio,granada,scrapper,123459,minimoni,q123456789,breaker,1004,02091976,ncc74656,slimshad,friendster,austin31,wiseguy,donner,dilbert1,132465,blackbird,buffet,jellybean,barfly,behappy,01011971,carebear,fireblad,02051975,boxcar,cheeky,kiteboy,hello12,panda1,elvisp,opennow,doktor,alex12,02101977,pornking,flamengo,02091975,snowbird,lonesome,robin1,11111a,weed420,baracuda,bleach,12345abc,nokia1,metall,singapor,mariner,herewego,dingo,tycoon,cubs,blunts,proview,123456789d,kamasutra,lagnaf,vipergts,navyseal,starwar,masterbate,wildone,peterbil,cucumber,butkus,123qwert,climax,deniro,gotribe,cement,scooby1,summer69,harrier,shodan,newyear,02091977,starwars1,romeo1,sedona,harald,doubled,sasha123,bigguns,salami,awnyce,kiwi,homemade,pimping,azzer,bradley1,warhamme,linkin,dudeman,qwe321,pinnacle,maxdog,flipflop,lfitymrf,fucker1,acidburn,esquire,sperma,fellatio,jeepster,thedon,sexybitch,pookey,spliff,widget,vfntvfnbrf,trinity1,mutant,samuel1,meliss,gohome,1q2q3q,mercede,comein,grin,cartoons,paragon,henrik,rainyday,pacino,senna,bigdog1,alleycat,12345qaz,narnia,mustang2,tanya1,gianni,apollo11,wetter,clovis,escalade,rainbows,freddy1,smart1,daisydog,s123456,cocksucker,pushkin,lefty,sambo,fyutkjxtr,hiziad,boyz,whiplash,orchard,newark,adrenalin,1598753,bootsie,chelle,trustme,chewy,golfgti,tuscl,ambrosia,5wr2i7h8,penetration,shonuf,jughead,payday,stickman,gotham,kolokol,johnny5,kolbasa,stang,puppydog,charisma,gators1,mone,jakarta,draco,nightmar,01011973,inlove,laetitia,02091973,tarpon,nautica,meadow,0192837465,luckyone,14881488,chessie,goldeney,tarakan,69camaro,bungle,wordup,interne,fuckme2,515000,dragonfl,sprout,02081974,gerbil,bandit1,02071971,melanie1,phialpha,camber,kathy1,adriano,gonzo1,10293847,bigjohn,bismarck,7777777a,scamper,12348765,rabbits,222777,bynthytn,dima123,alexander1,mallorca,dragster,favorite6,beethove,burner,cooper1,fosters,hello2,normandy,777999,sebring,1michael,lauren1,blake1,killa,02091971,nounours,trumpet1,thumper1,playball,xantia,rugby1,rocknroll,guillaum,angela1,strelok,prosper,buttercup,masterp,dbnfkbr,cambridg,venom,treefrog,lumina,1234566,supra,sexybabe,freee,shen,frogs,driller,pavement,grace1,dicky,checker,smackdown,pandas,cannibal,asdffdsa,blue42,zyjxrf,nthvbyfnjh,melrose,neon,jabber,gamma,369258147,aprilia,atticus,benessere,catcher,skipper1,azertyuiop,sixty9,thierry,treetop,jello,melons,123456789qwe,tantra,buzzer,catnip,bouncer,computer1,sexyone,ananas,young1,olenka,sexman,mooses,kittys,sephiroth,contra,hallowee,skylark,sparkles,777333,1qazxsw23edc,lucas1,q1w2e3r,gofast,hannes,amethyst,ploppy,flower2,hotass,amatory,volleyba,dixie1,bettyboo,ticklish,02061974,frenchy,phish1,murphy1,trustno,02061972,leinad,mynameis,spooge,jupiter1,hyundai,frosch,junkmail,abacab,marbles,32167,casio,sunshine1,wayne1,longhair,caster,snicker,02101973,gannibal,skinhead,hansol,gatsby,segblue2,montecar,plato,gumby,kaboom,matty,bosco1,888999,jazzy,panter,jesus123,charlie2,giulia,candyass,sex69,travis1,farmboy,special1,02041973,letsdoit,password01,allison1,abcdefg1,notredam,ilikeit,789654123,liberty1,rugger,uptown,alcatraz,123456w,airman,007bond,navajo,kenobi,terrier,stayout,grisha,frankie1,fluff,1qazzaq1,1234561,virginie,1234568,tango1,werdna,octopus,fitter,dfcbkbcf,blacklab,115599,montrose,allen1,supernova,frederik,ilovepussy,justice1,radeon,playboy2,blubber,sliver,swoosh,motocros,lockdown,pearls,thebear,istheman,pinetree,biit,1234rewq,rustydog,tampabay,titts,babycake,jehovah,vampire1,streaming,collie,camil,fidelity,calvin1,stitch,gatit,restart,puppy1,budgie,grunt,capitals,hiking,dreamcas,zorro1,321678,riffraff,makaka,playmate,napalm,rollin,amstel,zxcvb123,samanth,rumble,fuckme69,jimmys,951357,pizzaman,1234567899,tralala,delpiero,alexi,yamato,itisme,1million,vfndtq,kahlua,londo,wonderboy,carrots,tazz,ratboy,rfgecnf,02081973,nico,fujitsu,tujhrf,sergbest,blobby,02051970,sonic1,1357911,smirnov,video1,panhead,bucky,02031974,44332211,duffer,cashmoney,left4dead,bagpuss,salman,01011972,titfuck,66613666,england1,malish,dresden,lemans,darina,zapper,123456as,123456qqq,met2002,02041972,redstar,blue23,1234509876,pajero,booyah,please1,tetsuo,semper,finder,hanuman,sunlight,123456n,02061971,treble,cupoi,password99,dimitri,3ip76k2,popcorn1,lol12345,stellar,nympho,shark1,keith1,saskia,bigtruck,revoluti,rambo1,asd222,feelgood,phat,gogators,bismark,cola,puck,furball,burnout,slonik,bowtie,mommy1,icecube,fabienn,mouser,papamama,rolex,giants1,blue11,trooper1,momdad,iklo,morten,rhubarb,gareth,123456d,blitz,canada1,r2d2,brest,tigercat,usmarine,lilbit,benny1,azrael,lebowski,12345r,madagaskar,begemot,loverman,dragonballz,italiano,mazda3,naughty1,onions,diver1,cyrano,capcom,asdfg123,forlife,fisherman,weare138,requiem,mufasa,alpha123,piercing,hellas,abracadabra,duckman,caracas,macintos,02011971,jordan2,crescent,fduecn,hogtied,eatmenow,ramjet,18121812,kicksass,whatthe,discus,rfhfvtkmrf,rufus1,sqdwfe,mantle,vegitto,trek,dan123,paladin1,rudeboy,liliya,lunchbox,riversid,acapulco,libero,dnsadm,maison,toomuch,boobear,hemlock,sextoy,pugsley,misiek,athome,migue,altoids,marcin,123450,rhfcfdbwf,jeter2,rhinos,rjhjkm,mercury1,ronaldinho,shampoo,makayla,kamilla,masterbating,tennesse,holger,john1,matchbox,hores,poptart,parlament,goodyear,asdfgh1,02081970,hardwood,alain,erection,hfytnrb,highlife,implants,benjami,dipper,jeeper,bendover,supersonic,babybear,laserjet,gotenks,bama,natedogg,aol123,pokemo,rabbit1,raduga,sopranos,cashflow,menthol,pharao,hacking,334455,ghjcnbnenrf,lizzy,muffin1,pooky,penis1,flyer,gramma,dipset,becca,ireland1,diana1,donjuan,pong,ziggy1,alterego,simple1,cbr900,logger,111555,claudia1,cantona7,matisse,ljxtymrf,victori,harle,mamas,encore,mangos,iceman1,diamon,alexxx,tiamat,5000,desktop,mafia,smurf,princesa,shojou,blueberr,welkom,maximka,123890,123q123,tammy1,bobmarley,clips,demon666,ismail,termite,laser1,missie,altair,donna1,bauhaus,trinitron,mogwai,flyers88,juniper,nokia5800,boroda,jingles,qwerasdfzxcv,shakur,777666,legos,mallrats,1qazxsw,goldeneye,tamerlan,julia1,backbone,spleen,49ers,shady,darkone,medic1,justi,giggle,cloudy,aisan,douche,parkour,bluejay,huskers1,redwine,1qw23er4,satchmo,1231234,nineball,stewart1,ballsack,probes,kappa,amiga,flipper1,dortmund,963258,trigun,1237895,homepage,blinky,screwy,gizzmo,belkin,chemist,coolhand,chachi,braves1,thebest,greedisgood,pro100,banana1,101091m,123456g,wonderfu,barefeet,8inches,1111qqqq,kcchiefs,qweasdzxc123,metal1,jennifer1,xian,asdasd123,pollux,cheerleaers,fruity,mustang5,turbos,shopper,photon,espana,hillbill,oyster,macaroni,gigabyte,jesper,motown,tuxedo,buster12,triplex,cyclones,estrell,mortis,holla,456987,fiddle,sapphic,jurassic,thebeast,ghjcnjq,baura,spock1,metallica1,karaoke,nemrac58,love1234,02031970,flvbybcnhfnjh,frisbee,diva,ajax,feathers,flower1,soccer11,allday,mierda,pearl1,amature,marauder,333555,redheads,womans,egorka,godbless,159263,nimitz,aaaa1111,sashka,madcow,socce,greywolf,baboon,pimpdaddy,123456789r,reloaded,lancia,rfhfylfi,dicker,placid,grimace,22446688,olemiss,whores,culinary,wannabe,maxi,1234567aa,amelie,riley1,trample,phantom1,baberuth,bramble,asdfqwer,vides,4you,abc123456,taichi,aztnm,smother,outsider,hakr,blackhawk,bigblack,girlie,spook,valeriya,gianluca,freedo,1q2q3q4q,handbag,lavalamp,cumm,pertinant,whatup,nokia123,redlight,patrik,111aaa,poppy1,dfytxrf,aviator,sweeps,kristin1,cypher,elway,yinyang,access1,poophead,tucson,noles1,monterey,waterfal,dank,dougal,918273,suede,minnesot,legman,bukowski,ganja,mammoth,riverrat,asswipe,daredevi,lian,arizona1,kamikadze,alex1234,smile1,angel2,55bgates,bellagio,0001,wanrltw,stiletto,lipton,arsena,biohazard,bbking,chappy,tetris,as123456,darthvad,lilwayne,nopassword,7412369,123456789987654321,natchez,glitter,14785236,mytime,rubicon,moto,pyon,wazzup,tbird,shane1,nightowl,getoff,beckham7,trueblue,hotgirl,nevermin,deathnote,13131,taffy,bigal,copenhag,apricot,gallaries,dtkjcbgtl,totoro,onlyone,civicsi,jesse1,baby123,sierra1,festus,abacus,sickboy,fishtank,fungus,charle,golfpro,teensex,mario66,seaside,aleksei,rosewood,blackberry,1020304050,bedlam,schumi,deerhunt,contour,darkelf,surveyor,deltas,pitchers,741258963,dipstick,funny1,lizzard,112233445566,jupiter2,softtail,titman,greenman,z1x2c3v4b5,smartass,12345677,notnow,myworld,nascar1,chewbacc,nosferatu,downhill,dallas22,kuan,blazers,whales,soldat,craving,powerman,yfcntyf,hotrats,cfvceyu,qweasdzx,princess1,feline,qqwwee,chitown,1234qaz,mastermind,114477,dingbat,care1839,standby,kismet,atreides,dogmeat,icarus,monkeyboy,alex1,mouses,nicetits,sealteam,chopper1,crispy,winter99,rrpass1,myporn,myspace1,corazo,topolino,ass123,lawman,muffy,orgy,1love,passord,hooyah,ekmzyf,pretzel,amonra,nestle,01011950,jimbeam,happyman,z12345,stonewal,helios,manunited,harcore,dick1,gaymen,2hot4u,light1,qwerty13,kakashi,pjkjnj,alcatel,taylo,allah,buddydog,ltkmaby,mongo,blonds,start123,audia6,123456v,civilwar,bellaco,turtles,mustan,deadspin,aaa123,fynjirf,lucky123,tortoise,amor,summe,waterski,zulu,drag0n,dtxyjcnm,gizmos,strife,interacial,pusyy,goose1,bear1,equinox,matri,jaguar1,tobydog,sammys,nachos,traktor,bryan1,morgoth,444555,dasani,miami1,mashka,xxxxxx1,ownage,nightwin,hotlips,passmast,cool123,skolko,eldiablo,manu,1357908642,screwyou,badabing,foreplay,hydro,kubrick,seductive,demon1,comeon,galileo,aladdin,metoo,happines,902100,mizuno,caddy,bizzare,girls1,redone,ohmygod,sable,bonovox,girlies,hamper,opus,gizmodo1,aaabbb,pizzahut,999888,rocky2,anton1,kikimora,peavey,ocelot,a1a2a3a4,2wsx3edc,jackie1,solace,sprocket,galary,chuck1,volvo1,shurik,poop123,locutus,virago,wdtnjxtr,tequier,bisexual,doodles,makeitso,fishy,789632145,nothing1,fishcake,sentry,libertad,oaktree,fivestar,adidas1,vegitta,mississi,spiffy,carme,neutron,vantage,agassi,boners,123456789v,hilltop,taipan,barrage,kenneth1,fister,martian,willem,lfybkf,bluestar,moonman,ntktdbpjh,paperino,bikers,daffy,benji,quake,dragonfly,suckcock,danilka,lapochka,belinea,calypso,asshol,camero1,abraxas,mike1234,womam,q1q2q3q4q5,youknow,maxpower,pic\'s,audi80,sonora,raymond1,tickler,tadpole,belair,crazyman,finalfantasy,999000,jonatha,paisley,kissmyas,morgana,monste,mantra,spunk,magic123,jonesy,mark1,alessand,741258,baddest,ghbdtnrfrltkf,zxccxz,tictac,augustin,racers,7grout,foxfire,99762000,openit,nathanie,1z2x3c4v5b,seadog,gangbanged,lovehate,hondacbr,harpoon,mamochka,fisherma,bismilla,locust,wally1,spiderman1,saffron,utjhubq,123456987,20spanks,safeway,pisser,bdfyjd,kristen1,bigdick1,magenta,vfhujif,anfisa,friday13,qaz123wsx,0987654321q,tyrant,guan,meggie,kontol,nurlan,ayanami,rocket1,yaroslav,websol76,mutley,hugoboss,websolutions,elpaso,gagarin,badboys,sephirot,918273645,newuser,qian,edcrfv,booger1,852258,lockout,timoxa94,mazda323,firedog,sokolova,skydiver,jesus777,1234567890z,soulfly,canary,malinka,guillerm,hookers,dogfart,surfer1,osprey,india123,rhjkbr,stoppedby,nokia5530,123456789o,blue1,werter,divers,3000,123456f,alpina,cali,whoknows,godspeed,986532,foreskin,fuzzy1,heyyou,didier,slapnuts,fresno,rosebud1,sandman1,bears1,blade1,honeybun,queen1,baronn,pakista,philipp,9111961,topsecret,sniper1,214365,slipper,letsfuck,pippen33,godawgs,mousey,qw123456,scrotum,loveis,lighthou,bp2002,nancy123,jeffrey1,susieq,buddy2,ralphie,trout1,willi,antonov,sluttey,rehbwf,marty1,darian,losangeles,letme1n,12345d,pusssy,godiva,ender,golfnut,leonidas,a1b2c3d4e5,puffer,general1,wizzard,lehjxrf,racer1,bigbucks,cool12,buddys,zinger,esprit,vbienrf,josep,tickling,froggie,987654321a,895623,daddys,crumbs,gucci,mikkel,opiate,tracy1,christophe,came11,777555,petrovich,humbug,dirtydog,allstate,horatio,wachtwoord,creepers,squirts,rotary,bigd,georgia1,fujifilm,2sweet,dasha,yorkie,slimjim,wiccan,kenzie,system1,skunk,b12345,getit,pommes,daredevil,sugars,bucker,piston,lionheart,1bitch,515051,catfight,recon,icecold,fantom,vodafone,kontakt,boris1,vfcnth,canine,01011961,valleywa,faraon,chickenwing101,qq123456,livewire,livelife,roosters,jeepers,ilya1234,coochie,pavlik,dewalt,dfhdfhf,architec,blackops,1qaz2wsx3edc4rfv,rhfcjnf,wsxedc,teaser,sebora,25252,rhino1,ankara,swifty,decimal,redleg,shanno,nermal,candies,smirnova,dragon01,photo1,ranetki,a1s2d3f4g5,axio,wertzu,maurizio,6uldv8,zxcvasdf,punkass,flowe,graywolf,peddler,3rjs1la7qe,mpegs,seawolf,ladyboy,pianos,piggies,vixen,alexus,orpheus,gdtrfb,z123456,macgyver,hugetits,ralph1,flathead,maurici,mailru,goofball,nissan1,nikon,stopit,odin,big1,smooch,reboot,famil,bullit,anthony7,gerhard,methos,124038,morena,eagle2,jessica2,zebras,getlost,gfynthf,123581321,sarajevo,indon,comets,tatjana,rfgbnjirf,joystick,batman12,123456c,sabre,beerme,victory1,kitties,1475369,badboy1,booboo1,comcast,slava,squid,saxophon,lionhear,qaywsx,bustle,nastena,roadway,loader,hillside,starlight,24681012,niggers,access99,bazooka,molly123,blackice,bandi,cocacol,nfhfrfy,timur,muschi,horse1,quant4307s,squerting,oscars,mygirls,flashman,tangerin,goofy1,p0o9i8,housewifes,newness,monkey69,escorpio,password11,hippo,warcraft3,qazxsw123,qpalzm,ribbit,ghbdtndctv,bogota,star123,258000,lincoln1,bigjim,lacoste,firestorm,legenda,indain,ludacris,milamber,1009,evangeli,letmesee,a111111,hooters1,bigred1,shaker,husky,a4tech,cnfkrth,argyle,rjhjdf,nataha,0o9i8u7y,gibson1,sooners1,glendale,archery,hoochie,stooge,aaaaaa1,scorpions,school1,vegas1,rapier,mike23,bassoon,groupd2013,macaco,baker1,labia,freewill,santiag,silverado,butch1,vflfufcrfh,monica1,rugrat,cornhole,aerosmit,bionicle,gfgfvfvf,daniel12,virgo,fmale,favorite2,detroit1,pokey,shredder,baggies,wednesda,cosmo1,mimosa,sparhawk,firehawk,romario,911turbo,funtimes,fhntvrf,nexus6,159753456,timothy1,bajingan,terry1,frenchie,raiden,1mustang,babemagnet,74123698,nadejda,truffles,rapture,douglas1,lamborghini,motocross,rjcvjc,748596,skeeter1,dante1,angel666,telecom,carsten,pietro,bmw318,astro1,carpediem,samir,orang,helium,scirocco,fuzzball,rushmore,rebelz,hotspur,lacrimosa,chevys10,madonna1,domenico,yfnfirf,jachin,shelby1,bloke,dawgs,dunhill,atlanta1,service1,mikado,devilman,angelit,reznor,euphoria,lesbain,checkmat,browndog,phreak,blaze1,crash1,farida,mutter,luckyme,horsemen,vgirl,jediknig,asdas,cesare,allnight,rockey,starlite,truck1,passfan,close-up,samue,cazzo,wrinkles,homely,eatme1,sexpot,snapshot,dima1995,asthma,thetruth,ducky,blender,priyanka,gaucho,dutchman,sizzle,kakarot,651550,passcode,justinbieber,666333,elodie,sanjay,110442,alex01,lotus1,2300mj,lakshmi,zoomer,quake3,12349876,teapot,12345687,ramada,pennywis,striper,pilot1,chingon,optima,nudity,ethan1,euclid,beeline,loyola,biguns,zaq12345,bravo1,disney1,buffa,assmunch,vivid,6661313,wellingt,aqwzsx,madala11,9874123,sigmar,pictere,tiptop,bettyboop,dinero,tahiti,gregory1,bionic,speed1,fubar1,lexus1,denis1,hawthorn,saxman,suntzu,bernhard,dominika,camaro1,hunter12,balboa,bmw2002,seville,diablo1,vfhbyjxrf,1234abc,carling,lockerroom,punani,darth,baron1,vaness,1password,libido,picher,232425,karamba,futyn007,daydream,11001001,dragon123,friends1,bopper,rocky123,chooch,asslover,shimmer,riddler,openme,tugboat,sexy123,midori,gulnara,christo,swatch,laker,offroad,puddles,hackers,mannheim,manager1,horseman,roman1,dancer1,komputer,pictuers,nokia5130,ejaculation,lioness,123456y,evilone,nastenka,pushok,javie,lilman,3141592,mjolnir,toulouse,pussy2,bigworm,smoke420,fullback,extensa,dreamcast,belize,delboy,willie1,casablanca,csyjxtr,ricky1,bonghit,salvator,basher,pussylover,rosie1,963258741,vivitron,cobra427,meonly,armageddon,myfriend,zardoz,qwedsazxc,kraken,fzappa,starfox,333999,illmatic,capoeira,weenie,ramzes,freedom2,toasty,pupkin,shinigami,fhvfutljy,nocturne,churchil,thumbnils,tailgate,neworder,sexymama,goarmy,cerebus,michelle1,vbifyz,surfsup,earthlin,dabulls,basketbal,aligator,mojojojo,saibaba,welcome2,wifes,wdtnjr,12345w,slasher,papabear,terran,footman,hocke,153759,texans,tom123,sfgiants,billabong,aassdd,monolith,xxx777,l3tm31n,ticktock,newone,hellno,japanees,contortionist,admin123,scout1,alabama1,divx1,rochard,privat,radar1,bigdad,fhctybq,tortuga,citrus,avanti,fantasy1,woodstock,s12345,fireman1,embalmer,woodwork,bonzai,konyor,newstart,jigga,panorama,goats,smithy,rugrats,hotmama,daedalus,nonstop,fruitbat,lisenok,quaker,violator,12345123,my3sons,cajun,fraggle,gayboy,oldfart,vulva,knickerless,orgasms,undertow,binky,litle,kfcnjxrf,masturbation,bunnie,alexis1,planner,transexual,sparty,leeloo,monies,fozzie,stinger1,landrove,anakonda,scoobie,yamaha1,henti,star12,rfhlbyfk,beyonce,catfood,cjytxrf,zealots,strat,fordtruc,archangel,silvi,sativa,boogers,miles1,bigjoe,tulip,petite,greentea,shitter,jonboy,voltron,morticia,evanescence,3edc4rfv,longshot,windows1,serge,aabbcc,starbucks,sinful,drywall,prelude1,www123,camel1,homebrew,marlins,123412,letmeinn,domini,swampy,plokij,fordf350,webcam,michele1,bolivi,27731828,wingzero,qawsedrftg,shinji,sverige,jasper1,piper1,cummer,iiyama,gocats,amour,alfarome,jumanji,mike69,fantasti,1monkey,w00t88,shawn1,lorien,1a2s3d4f5g,koleso,murph,natascha,sunkist,kennwort,emine,grinder,m12345,q1q2q3q4,cheeba,money2,qazwsxedc1,diamante,prosto,pdiddy,stinky1,gabby1,luckys,franci,pornographic,moochie,gfhjdjp,samdog,empire1,comicbookdb,emili,motdepasse,iphone,braveheart,reeses,nebula,sanjose,bubba2,kickflip,arcangel,superbow,porsche911,xyzzy,nigger1,dagobert,devil1,alatam,monkey2,barbara1,12345v,vfpfafrf,alessio,babemagn,aceman,arrakis,kavkaz,987789,jasons,berserk,sublime1,rogue1,myspace,buckwhea,csyekz,pussy4me,vette1,boots1,boingo,arnaud,budlite,redstorm,paramore,becky1,imtheman,chango,marley1,milkyway,666555,giveme,mahalo,lux2000,lucian,paddy,praxis,shimano,bigpenis,creeper,newproject2004,rammstei,j3qq4h7h2v,hfljcnm,lambchop,anthony2,bugman,gfhjkm12,dreamer1,stooges,cybersex,diamant,cowboyup,maximus1,sentra,615243,goethe,manhatta,fastcar,selmer,1213141516,yfnfitymrf,denni,chewey,yankee1,elektra,123456789p,trousers,fishface,topspin,orwell,vorona,sodapop,motherfu,ibilltes,forall,kookie,ronald1,balrog,maximilian,mypasswo,sonny1,zzxxcc,tkfkdg,magoo,mdogg,heeled,gitara,lesbos,marajade,tippy,morozova,enter123,lesbean,pounded,asd456,fialka,scarab,sharpie,spanky1,gstring,sachin,12345asd,princeto,hellohel,ursitesux,billows,1234kekc,kombat,cashew,duracell,kseniya,sevenof9,kostik,arthur1,corvet07,rdfhnbhf,songoku,tiberian,needforspeed,1qwert,dropkick,kevin123,panache,libra,a123456a,kjiflm,vfhnsirf,cntgfy,iamcool,narut,buffer,sk8ordie,urlaub,fireblade,blanked,marishka,gemini1,altec,gorillaz,chief1,revival47,ironman1,space1,ramstein,doorknob,devilmaycry,nemesis1,sosiska,pennstat,monday1,pioner,shevchenko,detectiv,evildead,blessed1,aggie,coffees,tical,scotts,bullwink,marsel,krypto,adrock,rjitxrf,asmodeus,rapunzel,theboys,hotdogs,deepthro,maxpayne,veronic,fyyeirf,otter,cheste,abbey1,thanos,bedrock,bartok,google1,xxxzzz,rodent,montecarlo,hernande,mikayla,123456789l,bravehea,12locked,ltymub,pegasus1,ameteur,saltydog,faisal,milfnew,momsuck,everques,ytngfhjkz,m0nkey,businessbabe,cooki,custard,123456ab,lbvjxrf,outlaws,753357,qwerty78,udacha,insider,chees,fuckmehard,shotokan,katya,seahorse,vtldtlm,turtle1,mike12,beebop,heathe,everton1,darknes,barnie,rbcekz,alisher,toohot,theduke,555222,reddog1,breezy,bulldawg,monkeyman,baylee,losangel,mastermi,apollo1,aurelie,zxcvb12345,cayenne,bastet,wsxzaq,geibcnbr,yello,fucmy69,redwall,ladybird,bitchs,cccccc1,rktjgfnhf,ghjdthrf,quest1,oedipus,linus,impalass,fartman,12345k,fokker,159753a,optiplex,bbbbbb1,realtor,slipkno,santacru,rowdy,jelena,smeller,3984240,ddddd1,sexyme,janet1,3698741,eatme69,cazzone,today1,poobear,ignatius,master123,newpass1,heather2,snoopdogg,blondinka,pass12,honeydew,fuckthat,890098890,lovem,goldrush,gecko,biker1,llama,pendejo,avalanche,fremont,snowman1,gandolf,chowder,1a2b3c4d5e,flyguy,magadan,1fuck,pingvin,nokia5230,ab1234,lothar,lasers,bignuts,renee1,royboy,skynet,12340987,1122334,dragrace,lovely1,22334455,booter,12345612,corvett,123456qq,capital1,videoes,funtik,wyvern,flange,sammydog,hulkster,13245768,not4you,vorlon,omegared,l58jkdjp!,filippo,123mudar,samadams,petrus,chris12,charlie123,123456789123,icetea,sunderla,adrian1,123qweas,kazanova,aslan,monkey123,fktyeirf,goodsex,123ab,lbtest,banaan,bluenose,837519,asd12345,waffenss,whateve,1a2a3a4a,trailers,vfhbirf,bhbcrf,klaatu,turk182,monsoon,beachbum,sunbeam,succes,clyde1,viking1,rawhide,bubblegum,princ,mackenzi,hershey1,222555,dima55,niggaz,manatee,aquila,anechka,pamel,bugsbunn,lovel,sestra,newport1,althor,hornyman,wakeup,zzz111,phishy,cerber,torrent,thething,solnishko,babel,buckeye1,peanu,ethernet,uncencored,baraka,665544,chris2,rb26dett,willy1,choppers,texaco,biggirl,123456b,anna2614,sukebe,caralho,callofduty,rt6ytere,jesus7,angel12,1money,timelord,allblack,pavlova,romanov,tequiero,yitbos,lookup,bulls23,snowflake,dickweed,barks,lever,irisha,firestar,fred1234,ghjnjnbg,danman,gatito,betty1,milhouse,kbctyjr,masterbaiting,delsol,papit,doggys,123698741,bdfyjdf,invictus,bloods,kayla1,yourmama,apple2,angelok,bigboy1,pontiac1,verygood,yeshua,twins2,porn4me,141516,rasta69,james2,bosshog,candys,adventur,stripe,djkjlz,dokken,austin316,skins,hogwarts,vbhevbh,navigato,desperado,xxx666,cneltyn,vasiliy,hazmat,daytek,eightbal,fred1,four20,74227422,fabia,aerosmith,manue,wingchun,boohoo,hombre,sanity72,goatboy,fuckm,partizan,avrora,utahjazz,submarin,pussyeat,heinlein,control1,costaric,smarty,chuan,triplets,snowy,snafu,teacher1,vangogh,vandal,evergree,cochise,qwerty99,pyramid1,saab900,sniffer,qaz741,lebron23,mark123,wolvie,blackbelt,yoshi,feeder,janeway,nutella,fuking,asscock,deepak,poppie,bigshow,housewife,grils,tonto,cynthia1,temptress,irakli,belle1,russell1,manders,frank123,seabass,gforce,songbird,zippy1,naught,brenda1,chewy1,hotshit,topaz,43046721,girfriend,marinka,jakester,thatsme,planeta,falstaff,patrizia,reborn,riptide,cherry1,shuan,nogard,chino,oasis1,qwaszx12,goodlife,davis1,1911a1,harrys,shitfuck,12345678900,russian7,007700,bulls1,porshe,danil,dolphi,river1,sabaka,gobigred,deborah1,volkswagen,miamo,alkaline,muffdive,1letmein,fkbyrf,goodguy,hallo1,nirvan,ozzie,cannonda,cvbhyjdf,marmite,germany1,joeblow,radio1,love11,raindrop,159852,jacko,newday,fathead,elvis123,caspe,citibank,sports1,deuce,boxter,fakepass,golfman,snowdog,birthday4,nonmembe,niklas,parsifal,krasota,theshit,1235813,maganda,nikita1,omicron,cassie1,columbo,buick,sigma1,thistle,bassin,rickster,apteka,sienna,skulls,miamor,coolgirl,gravis,1qazxc,virgini,hunter2,akasha,batma,motorcyc,bambino,tenerife,fordf250,zhuan,iloveporn,markiza,hotbabes,becool,fynjybyf,wapapapa,forme,mamont,pizda,dragonz,sharon1,scrooge,mrbill,pfloyd,leeroy,natedog,ishmael,777111,tecumseh,carajo,nfy.irf,0000000000o,blackcock,fedorov,antigone,feanor,novikova,bobert,peregrin,spartan117,pumkin,rayman,manuals,tooltime,555333,bonethug,marina1,bonnie1,tonyhawk,laracroft,mahalkita,18273645,terriers,gamer,hoser,littlema,molotok,glennwei,lemon1,caboose,tater,12345654321,brians,fritz1,mistral,jigsaw,fuckshit,hornyguy,southside,edthom,antonio1,bobmarle,pitures,ilikesex,crafty,nexus,boarder,fulcrum,astonvil,yanks1,yngwie,account1,zooropa,hotlegs,sammi,gumbo,rover1,perkele,maurolarastefy,lampard,357753,barracud,dmband,abcxyz,pathfinder,335577,yuliya,micky,jayman,asdfg12345,1596321,halcyon,rerfhtre,feniks,zaxscd,gotyoass,jaycee,samson1,jamesb,vibrate,grandpri,camino,colossus,davidb,mamo4ka,nicky1,homer123,pinguin,watermelon,shadow01,lasttime,glider,823762,helen1,pyramids,tulane,osama,rostov,john12,scoote,bhbyrf,gohan,galeries,joyful,bigpussy,tonka,mowgli,astalavista,zzz123,leafs,dalejr8,unicorn1,777000,primal,bigmama,okmijn,killzone,qaz12345,snookie,zxcvvcxz,davidc,epson,rockman,ceaser,beanbag,katten,3151020,duckhunt,segreto,matros,ragnar,699669,sexsexse,123123z,fuckyeah,bigbutts,gbcmrf,element1,marketin,saratov,elbereth,blaster1,yamahar6,grime,masha,juneau,1230123,pappy,lindsay1,mooner,seattle1,katzen,lucent,polly1,lagwagon,pixie,misiaczek,666666a,smokedog,lakers24,eyeball,ironhors,ametuer,volkodav,vepsrf,kimmy,gumby1,poi098,ovation,1q2w3,drinker,penetrating,summertime,1dallas,prima,modles,takamine,hardwork,macintosh,tahoe,passthie,chiks,sundown,flowers1,boromir,music123,phaedrus,albert1,joung,malakas,gulliver,parker1,balder,sonne,jessie1,domainlock2005,express1,vfkbyf,youandme,raketa,koala,dhjnvytyjub,nhfrnjh,testibil,ybrbnjc,987654321q,axeman,pintail,pokemon123,dogggg,shandy,thesaint,11122233,x72jhhu3z,theclash,raptors,zappa1,djdjxrf,hell666,friday1,vivaldi,pluto1,lance1,guesswho,jeadmi,corgan,skillz,skippy1,mango1,gymnastic,satori,362514,theedge,cxfcnkbdfz,sparkey,deicide,bagels,lololol,lemmings,r4e3w2q1,silve,staind,schnuffi,dazzle,basebal1,leroy1,bilbo1,luckie,qwerty2,goodfell,hermione,peaceout,davidoff,yesterda,killah,flippy,chrisb,zelda1,headless,muttley,fuckof,tittys,catdaddy,photog,beeker,reaver,ram1500,yorktown,bolero,tryagain,arman,chicco,learjet,alexei,jenna1,go2hell,12s3t4p55,momsanaladventure,mustang9,protoss,rooter,ginola,dingo1,mojave,erica1,1qazse4,marvin1,redwolf,sunbird,dangerou,maciek,girsl,hawks1,packard1,excellen,dashka,soleda,toonces,acetate,nacked,jbond007,alligator,debbie1,wellhung,monkeyma,supers,rigger,larsson,vaseline,rjnzhf,maripos,123456asd,cbr600rr,doggydog,cronic,jason123,trekker,flipmode,druid,sonyvaio,dodges,mayfair,mystuff,fun4me,samanta,sofiya,magics,1ranger,arcane,sixtynin,222444,omerta,luscious,gbyudby,bobcats,envision,chance1,seaweed,holdem,tomate,mensch,slicer,acura1,goochi,qweewq,punter,repoman,tomboy,never1,cortina,gomets,147896321,369852147,dogma,bhjxrf,loglatin,eragon,strato,gazelle,growler,885522,klaudia,payton34,fuckem,butchie,scorpi,lugano,123456789k,nichola,chipper1,spide,uhbujhbq,rsalinas,vfylfhby,longhorns,bugatti,everquest,!qaz2wsx,blackass,999111,snakeman,p455w0rd,fanatic,family1,pfqxbr,777vlad,mysecret,marat,phoenix2,october1,genghis,panties1,cooker,citron,ace123,1234569,gramps,blackcoc,kodiak1,hickory,ivanhoe,blackboy,escher,sincity,beaks,meandyou,spaniel,canon1,timmy1,lancaste,polaroid,edinburg,fuckedup,hotman,cueball,golfclub,gopack,bookcase,worldcup,dkflbvbhjdbx,twostep,17171717aa,letsplay,zolushka,stella1,pfkegf,kingtut,67camaro,barracuda,wiggles,gjhjkm,prancer,patata,kjifhf,theman1,romanova,sexyass,copper1,dobber,sokolov,pomidor,algernon,cadman,amoremio,william2,silly1,bobbys,hercule,hd764nw5d7e1vb1,defcon,deutschland,robinhood,alfalfa,machoman,lesbens,pandora1,easypay,tomservo,nadezhda,goonies,saab9000,jordyn,f15eagle,dbrecz,12qwerty,greatsex,thrawn,blunted,baywatch,doggystyle,loloxx,chevy2,january1,kodak,bushel,78963214,ub6ib9,zz8807zpl,briefs,hawker,224488,first1,bonzo,brent1,erasure,69213124,sidewind,soccer13,622521,mentos,kolibri,onepiece,united1,ponyboy,keksa12,wayer,mypussy,andrej,mischa,mille,bruno123,garter,bigpun,talgat,familia,jazzy1,mustang8,newjob,747400,bobber,blackbel,hatteras,ginge,asdfjkl;,camelot1,blue44,rebbyt34,ebony1,vegas123,myboys,aleksander,ijrjkflrf,lopata,pilsner,lotus123,m0nk3y,andreev,freiheit,balls1,drjynfrnt,mazda1,waterpolo,shibumi,852963,123bbb,cezer121,blondie1,volkova,rattler,kleenex,ben123,sanane,happydog,satellit,qazplm,qazwsxedcrfvtgb,meowmix,badguy,facefuck,spice1,blondy,major1,25000,anna123,654321a,sober1,deathrow,patterso,china1,naruto1,hawkeye1,waldo1,butchy,crayon,5tgb6yhn,klopik,crocodil,mothra,imhorny,pookie1,splatter,slippy,lizard1,router,buratino,yahweh,123698,dragon11,123qwe456,peepers,trucker1,ganjaman,1hxboqg2,cheyanne,storys,sebastie,zztop,maddison,4rfv3edc,darthvader,jeffro,iloveit,victor1,hotty,delphin,lifeisgood,gooseman,shifty,insertions,dude123,abrupt,123masha,boogaloo,chronos,stamford,pimpster,kthjxrf,getmein,amidala,flubber,fettish,grapeape,dantes,oralsex,jack1,foxcg33,winchest,francis1,getin,archon,cliffy,blueman,1basebal,sport1,emmitt22,porn123,bignasty,morga,123hfjdk147,ferrar,juanito,fabiol,caseydog,steveo,peternorth,paroll,kimchi,bootleg,gaijin,secre,acacia,eatme2,amarillo,monkey11,rfhfgep,tylers,a1a2a3a4a5,sweetass,blower,rodina,babushka,camilo,cimbom,tiffan,vfnbkmlf,ohbaby,gotigers,lindsey1,dragon13,romulus,qazxsw12,zxcvbn1,dropdead,hitman47,snuggle,eleven11,bloopers,357mag,avangard,bmw320,ginscoot,dshade,masterkey,voodoo1,rootedit,caramba,leahcim,hannover,8phrowz622,tim123,cassius,000000a,angelito,zzzzz1,badkarma,star1,malaga,glenwood,footlove,golf1,summer12,helpme1,fastcars,titan1,police1,polinka,k.jdm,marusya,augusto,shiraz,pantyhose,donald1,blaise,arabella,brigada,c3por2d2,peter01,marco1,hellow,dillweed,uzumymw,geraldin,loveyou2,toyota1,088011,gophers,indy500,slainte,5hsu75kpot,teejay,renat,racoon,sabrin,angie1,shiznit,harpua,sexyred,latex,tucker1,alexandru,wahoo,teamwork,deepblue,goodison,rundmc,r2d2c3p0,puppys,samba,ayrton,boobed,999777,topsecre,blowme1,123321z,loudog,random1,pantie,drevil,mandolin,121212q,hottub,brother1,failsafe,spade1,matvey,open1234,carmen1,priscill,schatzi,kajak,gooddog,trojans1,gordon1,kayak,calamity,argent,ufhvjybz,seviyi,penfold,assface,dildos,hawkwind,crowbar,yanks,ruffles,rastus,luv2epus,open123,aquafina,dawns,jared1,teufel,12345c,vwgolf,pepsi123,amores,passwerd,01478520,boliva,smutty,headshot,password3,davidd,zydfhm,gbgbcmrf,pornpass,insertion,ceckbr,test2,car123,checkit,dbnfkbq,niggas,nyyankee,muskrat,nbuhtyjr,gunner1,ocean1,fabienne,chrissy1,wendys,loveme89,batgirl,cerveza,igorek,steel1,ragman,boris123,novifarm,sexy12,qwerty777,mike01,giveitup,123456abc,fuckall,crevice,hackerz,gspot,eight8,assassins,texass,swallows,123458,baldur,moonshine,labatt,modem,sydney1,voland,dbnfkz,hotchick,jacker,princessa,dawgs1,holiday1,booper,reliant,miranda1,jamaica1,andre1,badnaamhere,barnaby,tiger7,david12,margaux,corsica,085tzzqi,universi,thewall,nevermor,martin6,qwerty77,cipher,apples1,0102030405,seraphim,black123,imzadi,gandon,ducati99,1shadow,dkflbvbhjdyf,44magnum,bigbad,feedme,samantha1,ultraman,redneck1,jackdog,usmc0311,fresh1,monique1,tigre,alphaman,cool1,greyhoun,indycar,crunchy,55chevy,carefree,willow1,063dyjuy,xrated,assclown,federica,hilfiger,trivia,bronco1,mamita,100200300,simcity,lexingky,akatsuki,retsam,johndeere,abudfv,raster,elgato,businka,satanas,mattingl,redwing1,shamil,patate,mannn,moonstar,evil666,b123456,bowl300,tanechka,34523452,carthage,babygir,santino,bondarenko,jesuss,chico1,numlock,shyguy,sound1,kirby1,needit,mostwanted,427900,funky1,steve123,passions,anduril,kermit1,prospero,lusty,barakuda,dream1,broodwar,porky,christy1,mahal,yyyyyy1,allan1,1sexy,flintsto,capri,cumeater,heretic,robert2,hippos,blindax,marykay,collecti,kasumi,1qaz!qaz,112233q,123258,chemistr,coolboy,0o9i8u,kabuki,righton,tigress,nessie,sergej,andrew12,yfafyz,ytrhjvfyn,angel7,victo,mobbdeep,lemming,transfor,1725782,myhouse,aeynbr,muskie,leno4ka,westham1,cvbhyjd,daffodil,pussylicker,pamela1,stuffer,warehous,tinker1,2w3e4r,pluton,louise1,polarbea,253634,prime1,anatoliy,januar,wysiwyg,cobraya,ralphy,whaler,xterra,cableguy,112233a,porn69,jamesd,aqualung,jimmy123,lumpy,luckyman,kingsize,golfing1,alpha7,leeds1,marigold,lol1234,teabag,alex11,10sne1,saopaulo,shanny,roland1,basser,3216732167,carol1,year2005,morozov,saturn1,joseluis,bushed,redrock,memnoch,lalaland,indiana1,lovegod,gulnaz,buffalos,loveyou1,anteater,pattaya,jaydee,redshift,bartek,summerti,coffee1,ricochet,incest,schastie,rakkaus,h2opolo,suikoden,perro,dance1,loveme1,whoopass,vladvlad,boober,flyers1,alessia,gfcgjhn,pipers,papaya,gunsling,coolone,blackie1,gonads,gfhjkzytn,foxhound,qwert12,gangrel,ghjvtntq,bluedevi,mywife,summer01,hangman,licorice,patter,vfr750,thorsten,515253,ninguna,dakine,strange1,mexic,vergeten,12345432,8phrowz624,stampede,floyd1,sailfish,raziel,ananda,giacomo,freeme,crfprf,74185296,allstars,master01,solrac,gfnhbjn,bayliner,bmw525,3465xxx,catter,single1,michael3,pentium4,nitrox,mapet123456,halibut,killroy,xxxxx1,phillip1,poopsie,arsenalfc,buffys,kosova,all4me,32165498,arslan,opensesame,brutis,charles2,pochta,nadegda,backspac,mustang0,invis,gogeta,654321q,adam25,niceday,truckin,gfdkbr,biceps,sceptre,bigdave,lauras,user345,sandys,shabba,ratdog,cristiano,natha,march13,gumball,getsdown,wasdwasd,redhead1,dddddd1,longlegs,13572468,starsky,ducksoup,bunnys,omsairam,whoami,fred123,danmark,flapper,swanky,lakings,yfhenj,asterios,rainier,searcher,dapper,ltdjxrf,horsey,seahawk,shroom,tkfkdgo,aquaman,tashkent,number9,messi10,1asshole,milenium,illumina,vegita,jodeci,buster01,bareback,goldfinger,fire1,33rjhjds,sabian,thinkpad,smooth1,sully,bonghits,sushi1,magnavox,colombi,voiture,limpone,oldone,aruba,rooster1,zhenya,nomar5,touchdow,limpbizkit,rhfcfdxbr,baphomet,afrodita,bball1,madiso,ladles,lovefeet,matthew2,theworld,thunderbird,dolly1,123rrr,forklift,alfons,berkut,speedy1,saphire,oilman,creatine,pussylov,bastard1,456258,wicked1,filimon,skyline1,fucing,yfnfkbz,hot123,abdulla,nippon,nolimits,billiard,booty1,buttplug,westlife,coolbean,aloha1,lopas,asasin,1212121,october2,whodat,good4u,d12345,kostas,ilya1992,regal,pioneer1,volodya,focus1,bastos,nbvjif,fenix,anita1,vadimka,nickle,jesusc,123321456,teste,christ1,essendon,evgenii,celticfc,adam1,forumwp,lovesme,26exkp,chillout,burly,thelast1,marcus1,metalgear,test11,ronaldo7,socrate,world1,franki,mommie,vicecity,postov1000,charlie3,oldschool,333221,legoland,antoshka,counterstrike,buggy,mustang3,123454,qwertzui,toons,chesty,bigtoe,tigger12,limpopo,rerehepf,diddle,nokia3250,solidsnake,conan1,rockroll,963369,titanic1,qwezxc,cloggy,prashant,katharin,maxfli,takashi,cumonme,michael9,mymother,pennstate,khalid,48151623,fightclub,showboat,mateusz,elrond,teenie,arrow1,mammamia,dustydog,dominator,erasmus,zxcvb1,1a2a3a,bones1,dennis1,galaxie,pleaseme,whatever1,junkyard,galadriel,charlies,2wsxzaq1,crimson1,behemoth,teres,master11,fairway,shady1,pass99,1batman,joshua12,baraban,apelsin,mousepad,melon,twodogs,123321qwe,metalica,ryjgrf,pipiska,rerfhfxf,lugnut,cretin,iloveu2,powerade,aaaaaaa1,omanko,kovalenko,isabe,chobits,151nxjmt,shadow11,zcxfcnkbdf,gy3yt2rgls,vfhbyrf,159753123,bladerunner,goodone,wonton,doodie,333666999,fuckyou123,kitty123,chisox,orlando1,skateboa,red12345,destroye,snoogans,satan1,juancarlo,goheels,jetson,scottt,fuckup,aleksa,gfhfljrc,passfind,oscar123,derrick1,hateme,viper123,pieman,audi100,tuffy,andover,shooter1,10000,makarov,grant1,nighthaw,13576479,browneye,batigol,nfvfhf,chocolate1,7hrdnw23,petter,bantam,morlii,jediknight,brenden,argonaut,goodstuf,wisconsi,315920,abigail1,dirtbag,splurge,k123456,lucky777,valdepen,gsxr600,322223,ghjnjrjk,zaq1xsw2cde3,schwanz,walter1,letmein22,nomads,124356,codeblue,nokian70,fucke,footbal1,agyvorc,aztecs,passw0r,smuggles,femmes,ballgag,krasnodar,tamuna,schule,sixtynine,empires,erfolg,dvader,ladygaga,elite1,venezuel,nitrous,kochamcie,olivia1,trustn01,arioch,sting1,131415,tristar,555000,maroon,135799,marsik,555556,fomoco,natalka,cwoui,tartan,davecole,nosferat,hotsauce,dmitry,horus,dimasik,skazka,boss302,bluebear,vesper,ultras,tarantul,asd123asd,azteca,theflash,8ball,1footbal,titlover,lucas123,number6,sampson1,789852,party1,dragon99,adonai,carwash,metropol,psychnau,vthctltc,hounds,firework,blink18,145632,wildcat1,satchel,rice80,ghtktcnm,sailor1,cubano,anderso,rocks1,mike11,famili,dfghjc,besiktas,roygbiv,nikko,bethan,minotaur,rakesh,orange12,hfleuf,jackel,myangel,favorite7,1478520,asssss,agnieszka,haley1,raisin,htubyf,1buster,cfiekz,derevo,1a2a3a4a5a,baltika,raffles,scruffy1,clitlick,louis1,buddha1,fy.nrf,walker1,makoto,shadow2,redbeard,vfvfvskfhfve,mycock,sandydog,lineman,network1,favorite8,longdick,mustangg,mavericks,indica,1killer,cisco1,angelofwar,blue69,brianna1,bubbaa,slayer666,level42,baldrick,brutus1,lowdown,haribo,lovesexy,500000,thissuck,picker,stephy,1fuckme,characte,telecast,1bigdog,repytwjdf,thematrix,hammerhe,chucha,ganesha,gunsmoke,georgi,sheltie,1harley,knulla,sallas,westie,dragon7,conker,crappie,margosha,lisboa,3e2w1q,shrike,grifter,ghjcnjghjcnj,asdfg1,mnbvcxz1,myszka,posture,boggie,rocketman,flhtyfkby,twiztid,vostok,pi314159,force1,televizor,gtkmvtym,samhain,imcool,jadzia,dreamers,strannik,k2trix,steelhea,nikitin,commodor,brian123,chocobo,whopper,ibilljpf,megafon,ararat,thomas12,ghbrjkbcn,q1234567890,hibernia,kings1,jim123,redfive,68camaro,iawgk2,xavier1,1234567u,d123456,ndirish,airborn,halfmoon,fluffy1,ranchero,sneaker,soccer2,passion1,cowman,birthday1,johnn,razzle,glock17,wsxqaz,nubian,lucky2,jelly1,henderso,eric1,123123e,boscoe01,fuck0ff,simpson1,sassie,rjyjgkz,nascar3,watashi,loredana,janus,wilso,conman,david2,mothe,iloveher,snikers,davidj,fkmnthyfnbdf,mettss,ratfink,123456h,lostsoul,sweet16,brabus,wobble,petra1,fuckfest,otters,sable1,svetka,spartacu,bigstick,milashka,1lover,pasport,champagn,papichul,hrvatska,hondacivic,kevins,tacit,moneybag,gohogs,rasta1,246813579,ytyfdbcnm,gubber,darkmoon,vitaliy,233223,playboys,tristan1,joyce1,oriflame,mugwump,access2,autocad,thematri,qweqwe123,lolwut,ibill01,multisyn,1233211,pelikan,rob123,chacal,1234432,griffon,pooch,dagestan,geisha,satriani,anjali,rocketma,gixxer,pendrago,vincen,hellokit,killyou,ruger,doodah,bumblebe,badlands,galactic,emachines,foghorn,jackso,jerem,avgust,frontera,123369,daisymae,hornyboy,welcome123,tigger01,diabl,angel13,interex,iwantsex,rockydog,kukolka,sawdust,online1,3234412,bigpapa,jewboy,3263827,dave123,riches,333222,tony1,toggle,farter,124816,tities,balle,brasilia,southsid,micke,ghbdtn12,patit,ctdfcnjgjkm,olds442,zzzzzz1,nelso,gremlins,gypsy1,carter1,slut69,farcry,7415963,michael8,birdie1,charl,123456789abc,100001,aztec,sinjin,bigpimpi,closeup,atlas1,nvidia,doggone,classic1,manana,malcolm1,rfkbyf,hotbabe,rajesh,dimebag,ganjubas,rodion,jagr68,seren,syrinx,funnyman,karapuz,123456789n,bloomin,admin18533362,biggdogg,ocarina,poopy1,hellome,internet1,booties,blowjobs,matt1,donkey1,swede,1jennife,evgeniya,lfhbyf,coach1,444777,green12,patryk,pinewood,justin12,271828,89600506779,notredame,tuborg,lemond,sk8ter,million1,wowser,pablo1,st0n3,jeeves,funhouse,hiroshi,gobucs,angeleye,bereza,winter12,catalin,qazedc,andros,ramazan,vampyre,sweethea,imperium,murat,jamest,flossy,sandeep,morgen,salamandra,bigdogg,stroller,njdevils,nutsack,vittorio,%%passwo,playful,rjyatnrf,tookie,ubnfhf,michi,777444,shadow13,devils1,radiance,toshiba1,beluga,amormi,dandfa,trust1,killemall,smallville,polgara,billyb,landscap,steves,exploite,zamboni,damage11,dzxtckfd,trader12,pokey1,kobe08,damager,egorov,dragon88,ckfdbr,lisa69,blade2,audis4,nelson1,nibbles,23176djivanfros,mutabor,artofwar,matvei,metal666,hrfzlz,schwinn,poohbea,seven77,thinker,123456789qwerty,sobriety,jakers,karamelka,vbkfyf,volodin,iddqd,dale03,roberto1,lizaveta,qqqqqq1,cathy1,08154711,davidm,quixote,bluenote,tazdevil,katrina1,bigfoot1,bublik,marma,olechka,fatpussy,marduk,arina,nonrev67,qqqq1111,camill,wtpfhm,truffle,fairview,mashina,voltaire,qazxswedcvfr,dickface,grassy,lapdance,bosstone,crazy8,yackwin,mobil,danielit,mounta1n,player69,bluegill,mewtwo,reverb,cnthdf,pablito,a123321,elena1,warcraft1,orland,ilovemyself,rfntyjr,joyride,schoo,dthjxrf,thetachi,goodtimes,blacksun,humpty,chewbacca,guyute,123xyz,lexicon,blue45,qwe789,galatasaray,centrino,hendrix1,deimos,saturn5,craig1,vlad1996,sarah123,tupelo,ljrnjh,hotwife,bingos,1231231,nicholas1,flamer,pusher,1233210,heart1,hun999,jiggy,giddyup,oktober,123456zxc,budda,galahad,glamur,samwise,oneton,bugsbunny,dominic1,scooby2,freetime,internat,159753852,sc00ter,wantit,mazinger,inflames,laracrof,greedo,014789,godofwar,repytwjd,water123,fishnet,venus1,wallace1,tenpin,paula1,1475963,mania,novikov,qwertyasdfgh,goldmine,homies,777888999,8balls,holeinon,paper1,samael,013579,mansur,nikit,ak1234,blueline,polska1,hotcock,laredo,windstar,vbkbwbz,raider1,newworld,lfybkrf,catfish1,shorty1,piranha,treacle,royale,2234562,smurfs,minion,cadence,flapjack,123456p,sydne,135531,robinhoo,nasdaq,decatur,cyberonline,newage,gemstone,jabba,touchme,hooch,pigdog,indahous,fonzie,zebra1,juggle,patrick2,nihongo,hitomi,oldnavy,qwerfdsa,ukraina,shakti,allure,kingrich,diane1,canad,piramide,hottie1,clarion,college1,5641110,connect1,therion,clubber,velcro,dave1,astra1,13579-,astroboy,skittle,isgreat,photoes,cvzefh1gkc,001100,2cool4u,7555545,ginger12,2wsxcde3,camaro69,invader,domenow,asd1234,colgate,qwertasdfg,jack123,pass01,maxman,bronte,whkzyc,peter123,bogie,yecgaa,abc321,1qay2wsx,enfield,camaroz2,trashman,bonefish,system32,azsxdcfvgb,peterose,iwantyou,dick69,temp1234,blastoff,capa200,connie1,blazin,12233445,sexybaby,123456j,brentfor,pheasant,hommer,jerryg,thunders,august1,lager,kapusta,boobs1,nokia5300,rocco1,xytfu7,stars1,tugger,123sas,blingbling,1bubba,0wnsyo0,1george,baile,richard2,habana,1diamond,sensatio,1golfer,maverick1,1chris,clinton1,michael7,dragons1,sunrise1,pissant,fatim,mopar1,levani,rostik,pizzapie,987412365,oceans11,748159263,cum4me,palmetto,4r3e2w1q,paige1,muncher,arsehole,kratos,gaffer,banderas,billys,prakash,crabby,bungie,silver12,caddis,spawn1,xboxlive,sylvania,littlebi,524645,futura,valdemar,isacs155,prettygirl,big123,555444,slimer,chicke,newstyle,skypilot,sailormoon,fatluvr69,jetaime,sitruc,jesuschrist,sameer,bear12,hellion,yendor,country1,etnies,conejo,jedimast,darkknight,toobad,yxcvbn,snooks,porn4life,calvary,alfaromeo,ghostman,yannick,fnkfynblf,vatoloco,homebase,5550666,barret,1111111111zz,odysseus,edwardss,favre4,jerrys,crybaby,xsw21qaz,firestor,spanks,indians1,squish,kingair,babycakes,haters,sarahs,212223,teddyb,xfactor,cumload,rhapsody,death123,three3,raccoon,thomas2,slayer66,1q2q3q4q5q,thebes,mysterio,thirdeye,orkiox.,nodoubt,bugsy,schweiz,dima1996,angels1,darkwing,jeronimo,moonpie,ronaldo9,peaches2,mack10,manish,denise1,fellowes,carioca,taylor12,epaulson,makemoney,oc247ngucz,kochanie,3edcvfr4,vulture,1qw23e,1234567z,munchie,picard1,xthtgfirf,sportste,psycho1,tahoe1,creativ,perils,slurred,hermit,scoob,diesel1,cards1,wipeout,weeble,integra1,out3xf,powerpc,chrism,kalle,ariadne,kailua,phatty,dexter1,fordman,bungalow,paul123,compa,train1,thejoker,jys6wz,pussyeater,eatmee,sludge,dominus,denisa,tagheuer,yxcvbnm,bill1,ghfdlf,300zx,nikita123,carcass,semaj,ramone,muenchen,animal1,greeny,annemari,dbrf134,jeepcj7,mollys,garten,sashok,ironmaid,coyotes,astoria,george12,westcoast,primetim,123456o,panchito,rafae,japan1,framer,auralo,tooshort,egorova,qwerty22,callme,medicina,warhawk,w1w2w3w4,cristia,merli,alex22,kawaii,chatte,wargames,utvols,muaddib,trinket,andreas1,jjjjj1,cleric,scooters,cuntlick,gggggg1,slipknot1,235711,handcuff,stussy,guess1,leiceste,ppppp1,passe,lovegun,chevyman,hugecock,driver1,buttsex,psychnaut1,cyber1,black2,alpha12,melbourn,man123,metalman,yjdsqujl,blondi,bungee,freak1,stomper,caitlin1,nikitina,flyaway,prikol,begood,desperad,aurelius,john1234,whosyourdaddy,slimed123,bretagne,den123,hotwheel,king123,roodypoo,izzicam,save13tx,warpten,nokia3310,samolet,ready1,coopers,scott123,bonito,1aaaaa,yomomma,dawg1,rache,itworks,asecret,fencer,451236,polka,olivetti,sysadmin,zepplin,sanjuan,479373,lickem,hondacrx,pulamea,future1,naked1,sexyguy,w4g8at,lollol1,declan,runner1,rumple,daddy123,4snz9g,grandprix,calcio,whatthefuck,nagrom,asslick,pennst,negrit,squiggy,1223334444,police22,giovann,toronto1,tweet,yardbird,seagate,truckers,554455,scimitar,pescator,slydog,gaysex,dogfish,fuck777,12332112,qazxswed,morkovka,daniela1,imback,horny69,789123456,123456789w,jimmy2,bagger,ilove69,nikolaus,atdhfkm,rebirth,1111aaaa,pervasive,gjgeufq,dte4uw,gfhnbpfy,skeletor,whitney1,walkman,delorean,disco1,555888,as1234,ishikawa,fuck12,reaper1,dmitrii,bigshot,morrisse,purgen,qwer4321,itachi,willys,123123qwe,kisska,roma123,trafford,sk84life,326159487,pedros,idiom,plover,bebop,159875321,jailbird,arrowhea,qwaszx123,zaxscdvf,catlover,bakers,13579246,bones69,vermont1,helloyou,simeon,chevyz71,funguy,stargaze,parolparol,steph1,bubby,apathy,poppet,laxman,kelly123,goodnews,741236,boner1,gaetano,astonvilla,virtua,luckyboy,rocheste,hello2u,elohim,trigger1,cstrike,pepsicola,miroslav,96385274,fistfuck,cheval,magyar,svetlanka,lbfyjxrf,mamedov,123123123q,ronaldo1,scotty1,1nicole,pittbull,fredd,bbbbb1,dagwood,gfhkfvtyn,ghblehrb,logan5,1jordan,sexbomb,omega2,montauk,258741,dtythf,gibbon,winamp,thebomb,millerli,852654,gemin,baldy,halflife2,dragon22,mulberry,morrigan,hotel6,zorglub,surfin,951159,excell,arhangel,emachine,moses1,968574,reklama,bulldog2,cuties,barca,twingo,saber,elite11,redtruck,casablan,ashish,moneyy,pepper12,cnhtktw,rjcnbr,arschloch,phenix,cachorro,sunita,madoka,joselui,adams1,mymoney,hemicuda,fyutkjr,jake12,chicas,eeeee1,sonnyboy,smarties,birdy,kitten1,cnfcbr,island1,kurosaki,taekwond,konfetka,bennett1,omega3,jackson2,fresca,minako,octavian,kban667,feyenoord,muaythai,jakedog,fktrcfylhjdyf,1357911q,phuket,sexslave,fktrcfylhjdbx,asdfjk,89015173454,qwerty00,kindbud,eltoro,sex6969,nyknicks,12344321q,caballo,evenflow,hoddle,love22,metro1,mahalko,lawdog,tightass,manitou,buckie,whiskey1,anton123,335533,password4,primo,ramair,timbo,brayden,stewie,pedro1,yorkshir,ganster,hellothe,tippy1,direwolf,genesi,rodrig,enkeli,vaz21099,sorcerer,winky,oneshot,boggle,serebro,badger1,japanes,comicbook,kamehame,alcat,denis123,echo45,sexboy,gr8ful,hondo,voetbal,blue33,2112rush,geneviev,danni1,moosey,polkmn,matthew7,ironhead,hot2trot,ashley12,sweeper,imogen,blue21,retep,stealth1,guitarra,bernard1,tatian,frankfur,vfnhbwf,slacking,haha123,963741,asdasdas,katenok,airforce1,123456789qaz,shotgun1,12qwasz,reggie1,sharo,976431,pacifica,dhip6a,neptun,kardon,spooky1,beaut,555555a,toosweet,tiedup,11121314,startac,lover69,rediska,pirata,vfhrbp,1234qwerty,energize,hansolo1,playbo,larry123,oemdlg,cnjvfnjkju,a123123,alexan,gohawks,antonius,fcbayern,mambo,yummy1,kremlin,ellen1,tremere,vfiekz,bellevue,charlie9,izabella,malishka,fermat,rotterda,dawggy,becket,chasey,kramer1,21125150,lolit,cabrio,schlong,arisha,verity,3some,favorit,maricon,travelle,hotpants,red1234,garrett1,home123,knarf,seven777,figment,asdewq,canseco,good2go,warhol,thomas01,pionee,al9agd,panacea,chevy454,brazzers,oriole,azerty123,finalfan,patricio,northsta,rebelde,bulldo,stallone,boogie1,7uftyx,cfhfnjd,compusa,cornholi,config,deere,hoopster,sepultura,grasshop,babygurl,lesbo,diceman,proverbs,reddragon,nurbek,tigerwoo,superdup,buzzsaw,kakaroto,golgo13,edwar,123qaz123,butter1,sssss1,texas2,respekt,ou812ic,123456qaz,55555a,doctor1,mcgwire,maria123,aol999,cinders,aa1234,joness,ghbrjkmyj,makemone,sammyboy,567765,380zliki,theraven,testme,mylene,elvira26,indiglo,tiramisu,shannara,baby1,123666,gfhreh,papercut,johnmish,orange8,bogey1,mustang7,bagpipes,dimarik,vsijyjr,4637324,ravage,cogito,seven11,natashka,warzone,hr3ytm,4free,bigdee,000006,243462536,bigboi,123333,trouts,sandy123,szevasz,monica2,guderian,newlife1,ratchet,r12345,razorbac,12345i,piazza31,oddjob,beauty1,fffff1,anklet,nodrog,pepit,olivi,puravida,robert12,transam1,portman,bubbadog,steelers1,wilson1,eightball,mexico1,superboy,4rfv5tgb,mzepab,samurai1,fuckslut,colleen1,girdle,vfrcbvec,q1w2e3r4t,soldier1,19844891,alyssa1,a12345a,fidelis,skelter,nolove,mickeymouse,frehley,password69,watermel,aliska,soccer15,12345e,ladybug1,abulafia,adagio,tigerlil,takehana,hecate,bootneck,junfan,arigato,wonkette,bobby123,trustnoone,phantasm,132465798,brianjo,w12345,t34vfrc1991,deadeye,1robert,1daddy,adida,check1,grimlock,muffi,airwalk,prizrak,onclick,longbeac,ernie1,eadgbe,moore1,geniu,shadow123,bugaga,jonathan1,cjrjkjdf,orlova,buldog,talon1,westport,aenima,541233432442,barsuk,chicago2,kellys,hellbent,toughguy,iskander,skoal,whatisit,jake123,scooter2,fgjrfkbgcbc,ghandi,love13,adelphia,vjhrjdrf,adrenali,niunia,jemoeder,rainbo,all4u8,anime1,freedom7,seraph,789321,tommys,antman,firetruc,neogeo,natas,bmwm3,froggy1,paul1,mamit,bayview,gateways,kusanagi,ihateu,frederi,rock1,centurion,grizli,biggin,fish1,stalker1,3girls,ilovepor,klootzak,lollo,redsox04,kirill123,jake1,pampers,vasya,hammers1,teacup,towing,celtic1,ishtar,yingyang,4904s677075,dahc1,patriot1,patrick9,redbirds,doremi,rebecc,yoohoo,makarova,epiphone,rfgbnfy,milesd,blister,chelseafc,katana1,blackrose,1james,primrose,shock5,hard1,scooby12,c6h12o6,dustoff,boing,chisel,kamil,1william,defiant1,tyvugq,mp8o6d,aaa340,nafets,sonnet,flyhigh,242526,crewcom,love23,strike1,stairway,katusha,salamand,cupcake1,password0,007james,sunnie,multisync,harley01,tequila1,fred12,driver8,q8zo8wzq,hunter01,mozzer,temporar,eatmeraw,mrbrownxx,kailey,sycamore,flogger,tincup,rahasia,ganymede,bandera,slinger,1111122222,vander,woodys,1cowboy,khaled,jamies,london12,babyboo,tzpvaw,diogenes,budice,mavrick,135797531,cheeta,macros,squonk,blackber,topfuel,apache1,falcon16,darkjedi,cheeze,vfhvtkfl,sparco,change1,gfhfif,freestyl,kukuruza,loveme2,12345f,kozlov,sherpa,marbella,44445555,bocephus,1winner,alvar,hollydog,gonefish,iwantin,barman,godislove,amanda18,rfpfynbg,eugen,abcdef1,redhawk,thelema,spoonman,baller1,harry123,475869,tigerman,cdtnjxrf,marillio,scribble,elnino,carguy,hardhead,l2g7k3,troopers,selen,dragon76,antigua,ewtosi,ulysse,astana,paroli,cristo,carmex,marjan,bassfish,letitbe,kasparov,jay123,19933991,blue13,eyecandy,scribe,mylord,ukflbjkec,ellie1,beaver1,destro,neuken,halfpint,ameli,lilly1,satanic,xngwoj,12345trewq,asdf1,bulldogg,asakura,jesucrist,flipside,packers4,biggy,kadett,biteme69,bobdog,silverfo,saint1,bobbo,packman,knowledg,foolio,fussbal,12345g,kozerog,westcoas,minidisc,nbvcxw,martini1,alastair,rasengan,superbee,memento,porker,lena123,florenc,kakadu,bmw123,getalife,bigsky,monkee,people1,schlampe,red321,memyself,0147896325,12345678900987654321,soccer14,realdeal,gfgjxrf,bella123,juggs,doritos,celtics1,peterbilt,ghbdtnbrb,gnusmas,xcountry,ghbdtn1,batman99,deusex,gtnhjdf,blablabl,juster,marimba,love2,rerjkrf,alhambra,micros,siemens1,assmaste,moonie,dashadasha,atybrc,eeeeee1,wildrose,blue55,davidl,xrp23q,skyblue,leo123,ggggg1,bestfriend,franny,1234rmvb,fun123,rules1,sebastien,chester2,hakeem,winston2,fartripper,atlant,07831505,iluvsex,q1a2z3,larrys,009900,ghjkju,capitan,rider1,qazxsw21,belochka,andy123,hellya,chicca,maximal,juergen,password1234,howard1,quetzal,daniel123,qpwoeiruty,123555,bharat,ferrari3,numbnuts,savant,ladydog,phipsi,lovepussy,etoile,power2,mitten,britneys,chilidog,08522580,2fchbg,kinky1,bluerose,loulo,ricardo1,doqvq3,kswbdu,013cpfza,timoha,ghbdtnghbdtn,3stooges,gearhead,browns1,g00ber,super7,greenbud,kitty2,pootie,toolshed,gamers,coffe,ibill123,freelove,anasazi,sister1,jigger,natash,stacy1,weronika,luzern,soccer7,hoopla,dmoney,valerie1,canes,razdvatri,washere,greenwoo,rfhjkbyf,anselm,pkxe62,maribe,daniel2,maxim1,faceoff,carbine,xtkjdtr,buddy12,stratos,jumpman,buttocks,aqswdefr,pepsis,sonechka,steeler1,lanman,nietzsch,ballz,biscuit1,wrxsti,goodfood,juventu,federic,mattman,vika123,strelec,jledfyxbr,sideshow,4life,fredderf,bigwilly,12347890,12345671,sharik,bmw325i,fylhtqrf,dannon4,marky,mrhappy,drdoom,maddog1,pompier,cerbera,goobers,howler,jenny69,evely,letitrid,cthuttdyf,felip,shizzle,golf12,t123456,yamah,bluearmy,squishy,roxan,10inches,dollface,babygirl1,blacksta,kaneda,lexingto,canadien,222888,kukushka,sistema,224422,shadow69,ppspankp,mellons,barbie1,free4all,alfa156,lostone,2w3e4r5t,painkiller,robbie1,binger,8dihc6,jaspe,rellik,quark,sogood,hoopstar,number2,snowy1,dad2ownu,cresta,qwe123asd,hjvfyjdf,gibsonsg,qbg26i,dockers,grunge,duckling,lfiekz,cuntsoup,kasia1,1tigger,woaini,reksio,tmoney,firefighter,neuron,audia3,woogie,powerboo,powermac,fatcock,12345666,upnfmc,lustful,porn1,gotlove,amylee,kbytqrf,11924704,25251325,sarasota,sexme,ozzie1,berliner,nigga1,guatemal,seagulls,iloveyou!,chicken2,qwerty21,010203040506,1pillow,libby1,vodoley,backlash,piglets,teiubesc,019283,vonnegut,perico,thunde,buckey,gtxtymrf,manunite,iiiii1,lost4815162342,madonn,270873_,britney1,kevlar,piano1,boondock,colt1911,salamat,doma77ns,anuradha,cnhjqrf,rottweil,newmoon,topgun1,mauser,fightclu,birthday21,reviewpa,herons,aassddff,lakers32,melissa2,vredina,jiujitsu,mgoblue,shakey,moss84,12345zxcvb,funsex,benji1,garci,113322,chipie,windex,nokia5310,pwxd5x,bluemax,cosita,chalupa,trotsky,new123,g3ujwg,newguy,canabis,gnaget,happydays,felixx,1patrick,cumface,sparkie,kozlova,123234,newports,broncos7,golf18,recycle,hahah,harrypot,cachondo,open4me,miria,guessit,pepsione,knocker,usmc1775,countach,playe,wiking,landrover,cracksevi,drumline,a7777777,smile123,manzana,panty,liberta,pimp69,dolfan,quality1,schnee,superson,elaine22,webhompass,mrbrownx,deepsea,4wheel,mamasita,rockport,rollie,myhome,jordan12,kfvgjxrf,hockey12,seagrave,ford1,chelsea2,samsara,marissa1,lamesa,mobil1,piotrek,tommygun,yyyyy1,wesley1,billy123,homersim,julies,amanda12,shaka,maldini,suzenet,springst,iiiiii1,yakuza,111111aa,westwind,helpdesk,annamari,bringit,hopefull,hhhhhhh1,saywhat,mazdarx8,bulova,jennife1,baikal,gfhjkmxbr,victoria1,gizmo123,alex99,defjam,2girls,sandrock,positivo,shingo,syncmast,opensesa,silicone,fuckina,senna1,karlos,duffbeer,montagne,gehrig,thetick,pepino,hamburge,paramedic,scamp,smokeweed,fabregas,phantoms,venom121293,2583458,badone,porno69,manwhore,vfvf123,notagain,vbktyf,rfnthbyrf,wildblue,kelly001,dragon66,camell,curtis1,frolova,1212123,dothedew,tyler123,reddrago,planetx,promethe,gigolo,1001001,thisone,eugeni,blackshe,cruzazul,incognito,puller,joonas,quick1,spirit1,gazza,zealot,gordito,hotrod1,mitch1,pollito,hellcat,mythos,duluth,383pdjvl,easy123,hermos,binkie,its420,lovecraf,darien,romina,doraemon,19877891,syclone,hadoken,transpor,ichiro,intell,gargamel,dragon2,wavpzt,557744,rjw7x4,jennys,kickit,rjynfrn,likeit,555111,corvus,nec3520,133113,mookie1,bochum,samsung2,locoman0,154ugeiu,vfvfbgfgf,135792,[start],tenni,20001,vestax,hufmqw,neveragain,wizkid,kjgfnf,nokia6303,tristen,saltanat,louie1,gandalf2,sinfonia,alpha3,tolstoy,ford150,f00bar,1hello,alici,lol12,riker1,hellou,333888,1hunter,qw1234,vibrator,mets86,43211234,gonzale,cookies1,sissy1,john11,bubber,blue01,cup2006,gtkmvtyb,nazareth,heybaby,suresh,teddie,mozilla,rodeo1,madhouse,gamera,123123321,naresh,dominos,foxtrot1,taras,powerup,kipling,jasonb,fidget,galena,meatman,alpacino,bookmark,farting,humper,titsnass,gorgon,castaway,dianka,anutka,gecko1,fucklove,connery,wings1,erika1,peoria,moneymaker,ichabod,heaven1,paperboy,phaser,breakers,nurse1,westbrom,alex13,brendan1,123asd123,almera,grubber,clarkie,thisisme,welkom01,51051051051,crypto,freenet,pflybwf,black12,testme2,changeit,autobahn,attica,chaoss,denver1,tercel,gnasher23,master2,vasilii,sherman1,gomer,bigbuck,derek1,qwerzxcv,jumble,dragon23,art131313,numark,beasty,cxfcnmttcnm,updown,starion,glist,sxhq65,ranger99,monkey7,shifter,wolves1,4r5t6y,phone1,favorite5,skytommy,abracada,1martin,102030405060,gatech,giulio,blacktop,cheer1,africa1,grizzly1,inkjet,shemales,durango1,booner,11223344q,supergirl,vanyarespekt,dickless,srilanka,weaponx,6string,nashvill,spicey,boxer1,fabien,2sexy2ho,bowhunt,jerrylee,acrobat,tawnee,ulisse,nolimit8,l8g3bkde,pershing,gordo1,allover,gobrowns,123432,123444,321456987,spoon1,hhhhh1,sailing1,gardenia,teache,sexmachine,tratata,pirate1,niceone,jimbos,314159265,qsdfgh,bobbyy,ccccc1,carla1,vjkjltw,savana,biotech,frigid,123456789g,dragon10,yesiam,alpha06,oakwood,tooter,winsto,radioman,vavilon,asnaeb,google123,nariman,kellyb,dthyjcnm,password6,parol1,golf72,skate1,lthtdj,1234567890s,kennet,rossia,lindas,nataliya,perfecto,eminem1,kitana,aragorn1,rexona,arsenalf,planot,coope,testing123,timex,blackbox,bullhead,barbarian,dreamon,polaris1,cfvjktn,frdfhbev,gametime,slipknot666,nomad1,hfgcjlbz,happy69,fiddler,brazil1,joeboy,indianali,113355,obelisk,telemark,ghostrid,preston1,anonim,wellcome,verizon1,sayangku,censor,timeport,dummies,adult1,nbnfybr,donger,thales,iamgay,sexy1234,deadlift,pidaras,doroga,123qwe321,portuga,asdfgh12,happys,cadr14nu,pi3141,maksik,dribble,cortland,darken,stepanova,bommel,tropic,sochi2014,bluegras,shahid,merhaba,nacho,2580456,orange44,kongen,3cudjz,78girl,my3kids,marcopol,deadmeat,gabbie,saruman,jeepman,freddie1,katie123,master99,ronal,ballbag,centauri,killer7,xqgann,pinecone,jdeere,geirby,aceshigh,55832811,pepsimax,rayden,razor1,tallyho,ewelina,coldfire,florid,glotest,999333,sevenup,bluefin,limaperu,apostol,bobbins,charmed1,michelin,sundin,centaur,alphaone,christof,trial1,lions1,45645,just4you,starflee,vicki1,cougar1,green2,jellyfis,batman69,games1,hihje863,crazyzil,w0rm1,oklick,dogbite,yssup,sunstar,paprika,postov10,124578963,x24ik3,kanada,buckster,iloveamy,bear123,smiler,nx74205,ohiostat,spacey,bigbill,doudo,nikolaeva,hcleeb,sex666,mindy1,buster11,deacons,boness,njkcnsq,candy2,cracker1,turkey1,qwertyu1,gogreen,tazzzz,edgewise,ranger01,qwerty6,blazer1,arian,letmeinnow,cigar1,jjjjjj1,grigio,frien,tenchu,f9lmwd,imissyou,filipp,heathers,coolie,salem1,woodduck,scubadiv,123kat,raffaele,nikolaev,dapzu455,skooter,9inches,lthgfhjkm,gr8one,ffffff1,zujlrf,amanda69,gldmeo,m5wkqf,rfrltkf,televisi,bonjou,paleale,stuff1,cumalot,fuckmenow,climb7,mark1234,t26gn4,oneeye,george2,utyyflbq,hunting1,tracy71,ready2go,hotguy,accessno,charger1,rudedog,kmfdm,goober1,sweetie1,wtpmjgda,dimensio,ollie1,pickles1,hellraiser,mustdie,123zzz,99887766,stepanov,verdun,tokenbad,anatol,bartende,cidkid86,onkelz,timmie,mooseman,patch1,12345678c,marta1,dummy1,bethany1,myfamily,history1,178500,lsutiger,phydeaux,moren,dbrnjhjdbx,gnbxrf,uniden,drummers,abpbrf,godboy,daisy123,hogan1,ratpack,irland,tangerine,greddy,flore,sqrunch,billyjoe,q55555,clemson1,98745632,marios,ishot,angelin,access12,naruto12,lolly,scxakv,austin12,sallad,cool99,rockit,mongo1,mark22,ghbynth,ariadna,senha,docto,tyler2,mobius,hammarby,192168,anna12,claire1,pxx3eftp,secreto,greeneye,stjabn,baguvix,satana666,rhbcnbyjxrf,dallastx,garfiel,michaelj,1summer,montan,1234ab,filbert,squids,fastback,lyudmila,chucho,eagleone,kimberle,ar3yuk3,jake01,nokids,soccer22,1066ad,ballon,cheeto,review69,madeira,taylor2,sunny123,chubbs,lakeland,striker1,porche,qwertyu8,digiview,go1234,ferari,lovetits,aditya,minnow,green3,matman,cellphon,fortytwo,minni,pucara,69a20a,roman123,fuente,12e3e456,paul12,jacky,demian,littleman,jadakiss,vlad1997,franca,282860,midian,nunzio,xaccess2,colibri,jessica0,revilo,654456,harvey1,wolf1,macarena,corey1,husky1,arsen,milleniu,852147,crowes,redcat,combat123654,hugger,psalms,quixtar,ilovemom,toyot,ballss,ilovekim,serdar,james23,avenger1,serendip,malamute,nalgas,teflon,shagger,letmein6,vyjujnjxbt,assa1234,student1,dixiedog,gznybwf13,fuckass,aq1sw2de3,robroy,hosehead,sosa21,123345,ias100,teddy123,poppin,dgl70460,zanoza,farhan,quicksilver,1701d,tajmahal,depechemode,paulchen,angler,tommy2,recoil,megamanx,scarecro,nicole2,152535,rfvtgb,skunky,fatty1,saturno,wormwood,milwauke,udbwsk,sexlover,stefa,7bgiqk,gfnhbr,omar10,bratan,lbyfvj,slyfox,forest1,jambo,william3,tempus,solitari,lucydog,murzilka,qweasdzxc1,vehpbkrf,12312345,fixit,woobie,andre123,123456789x,lifter,zinaida,soccer17,andone,foxbat,torsten,apple12,teleport,123456i,leglover,bigcocks,vologda,dodger1,martyn,d6o8pm,naciona,eagleeye,maria6,rimshot,bentley1,octagon,barbos,masaki,gremio,siemen,s1107d,mujeres,bigtits1,cherr,saints1,mrpink,simran,ghzybr,ferrari2,secret12,tornado1,kocham,picolo,deneme,onelove1,rolan,fenster,1fuckyou,cabbie,pegaso,nastyboy,password5,aidana,mine2306,mike13,wetone,tigger69,ytreza,bondage1,myass,golova,tolik,happyboy,poilkj,nimda2k,rammer,rubies,hardcore1,jetset,hoops1,jlaudio,misskitt,1charlie,google12,theone1,phred,porsch,aalborg,luft4,charlie5,password7,gnosis,djgabbab,1daniel,vinny,borris,cumulus,member1,trogdor,darthmau,andrew2,ktjybl,relisys,kriste,rasta220,chgobndg,weener,qwerty66,fritter,followme,freeman1,ballen,blood1,peache,mariso,trevor1,biotch,gtfullam,chamonix,friendste,alligato,misha1,1soccer,18821221,venkat,superd,molotov,bongos,mpower,acun3t1x,dfcmrf,h4x3d,rfhfufylf,tigran,booyaa,plastic1,monstr,rfnhby,lookatme,anabolic,tiesto,simon123,soulman,canes1,skyking,tomcat1,madona,bassline,dasha123,tarheel1,dutch1,xsw23edc,qwerty123456789,imperator,slaveboy,bateau,paypal,house123,pentax,wolf666,drgonzo,perros,digger1,juninho,hellomoto,bladerun,zzzzzzz1,keebler,take8422,fffffff1,ginuwine,israe,caesar1,crack1,precious1,garand,magda1,zigazaga,321ewq,johnpaul,mama1234,iceman69,sanjeev,treeman,elric,rebell,1thunder,cochon,deamon,zoltan,straycat,uhbyuj,luvfur,mugsy,primer,wonder1,teetime,candycan,pfchfytw,fromage,gitler,salvatio,piggy1,23049307,zafira,chicky,sergeev,katze,bangers,andriy,jailbait,vaz2107,ghbhjlf,dbjktnnf,aqswde,zaratustra,asroma,1pepper,alyss,kkkkk1,ryan1,radish,cozumel,waterpol,pentium1,rosebowl,farmall,steinway,dbrekz,baranov,jkmuf,another1,chinacat,qqqqqqq1,hadrian,devilmaycry4,ratbag,teddy2,love21,pullings,packrat,robyn1,boobo,qw12er34,tribe1,rosey,celestia,nikkie,fortune12,olga123,danthema,gameon,vfrfhjys,dilshod,henry14,jenova,redblue,chimaera,pennywise,sokrates,danimal,qqaazz,fuaqz4,killer2,198200,tbone1,kolyan,wabbit,lewis1,maxtor,egoist,asdfas,spyglass,omegas,jack12,nikitka,esperanz,doozer,matematika,wwwww1,ssssss1,poiu0987,suchka,courtney1,gungho,alpha2,fktyjxrf,summer06,bud420,devildriver,heavyd,saracen,foucault,choclate,rjdfktyrj,goblue1,monaro,jmoney,dcpugh,efbcapa201,qqh92r,pepsicol,bbb747,ch5nmk,honeyb,beszoptad,tweeter,intheass,iseedeadpeople,123dan,89231243658s,farside1,findme,smiley1,55556666,sartre,ytcnjh,kacper,costarica,134679258,mikeys,nolimit9,vova123,withyou,5rxypn,love143,freebie,rescue1,203040,michael6,12monkey,redgreen,steff,itstime,naveen,good12345,acidrain,1dawg,miramar,playas,daddio,orion2,852741,studmuff,kobe24,senha123,stephe,mehmet,allalone,scarface1,helloworld,smith123,blueyes,vitali,memphis1,mybitch,colin1,159874,1dick,podaria,d6wnro,brahms,f3gh65,dfcbkmtd,xxxman,corran,ugejvp,qcfmtz,marusia,totem,arachnid,matrix2,antonell,fgntrf,zemfira,christos,surfing1,naruto123,plato1,56qhxs,madzia,vanille,043aaa,asq321,mutton,ohiostate,golde,cdznjckfd,rhfcysq,green5,elephan,superdog,jacqueli,bollock,lolitas,nick12,1orange,maplelea,july23,argento,waldorf,wolfer,pokemon12,zxcvbnmm,flicka,drexel,outlawz,harrie,atrain,juice2,falcons1,charlie6,19391945,tower1,dragon21,hotdamn,dirtyboy,love4ever,1ginger,thunder2,virgo1,alien1,bubblegu,4wwvte,123456789qqq,realtime,studio54,passss,vasilek,awsome,giorgia,bigbass,2002tii,sunghile,mosdef,simbas,count0,uwrl7c,summer05,lhepmz,ranger21,sugarbea,principe,5550123,tatanka,9638v,cheerios,majere,nomercy,jamesbond007,bh90210,7550055,jobber,karaganda,pongo,trickle,defamer,6chid8,1q2a3z,tuscan,nick123,.adgjm,loveyo,hobbes1,note1234,shootme,171819,loveporn,9788960,monty123,fabrice,macduff,monkey13,shadowfa,tweeker,hanna1,madball,telnet,loveu2,qwedcxzas,thatsit,vfhcbr,ptfe3xxp,gblfhfcs,ddddddd1,hakkinen,liverune,deathsta,misty123,suka123,recon1,inferno1,232629,polecat,sanibel,grouch,hitech,hamradio,rkfdbfnehf,vandam,nadin,fastlane,shlong,iddqdidkfa,ledzeppelin,sexyfeet,098123,stacey1,negras,roofing,lucifer1,ikarus,tgbyhn,melnik,barbaria,montego,twisted1,bigal1,jiggle,darkwolf,acerview,silvio,treetops,bishop1,iwanna,pornsite,happyme,gfccdjhl,114411,veritech,batterse,casey123,yhntgb,mailto,milli,guster,q12345678,coronet,sleuth,fuckmeha,armadill,kroshka,geordie,lastochka,pynchon,killall,tommy123,sasha1996,godslove,hikaru,clticic,cornbrea,vfkmdbyf,passmaster,123123123a,souris,nailer,diabolo,skipjack,martin12,hinata,mof6681,brookie,dogfight,johnso,karpov,326598,rfvbrflpt,travesti,caballer,galaxy1,wotan,antoha,art123,xakep1234,ricflair,pervert1,p00kie,ambulanc,santosh,berserker,larry33,bitch123,a987654321,dogstar,angel22,cjcbcrf,redhouse,toodles,gold123,hotspot,kennedy1,glock21,chosen1,schneide,mainman,taffy1,3ki42x,4zqauf,ranger2,4meonly,year2000,121212a,kfylsi,netzwerk,diese,picasso1,rerecz,225522,dastan,swimmer1,brooke1,blackbea,oneway,ruslana,dont4get,phidelt,chrisp,gjyxbr,xwing,kickme,shimmy,kimmy1,4815162342lost,qwerty5,fcporto,jazzbo,mierd,252627,basses,sr20det,00133,florin,howdy1,kryten,goshen,koufax,cichlid,imhotep,andyman,wrest666,saveme,dutchy,anonymou,semprini,siempre,mocha1,forest11,wildroid,aspen1,sesam,kfgekz,cbhbec,a55555,sigmanu,slash1,giggs11,vatech,marias,candy123,jericho1,kingme,123a123,drakula,cdjkjxm,mercur,oneman,hoseman,plumper,ilovehim,lancers,sergey1,takeshi,goodtogo,cranberr,ghjcnj123,harvick,qazxs,1972chev,horsesho,freedom3,letmein7,saitek,anguss,vfvfgfgfz,300000,elektro,toonporn,999111999q,mamuka,q9umoz,edelweis,subwoofer,bayside,disturbe,volition,lucky3,12345678z,3mpz4r,march1,atlantida,strekoza,seagrams,090909t,yy5rbfsc,jack1234,sammy12,sampras,mark12,eintrach,chaucer,lllll1,nochance,whitepower,197000,lbvekz,passer,torana,12345as,pallas,koolio,12qw34,nokia8800,findout,1thomas,mmmmm1,654987,mihaela,chinaman,superduper,donnas,ringo1,jeroen,gfdkjdf,professo,cdtnrf,tranmere,tanstaaf,himera,ukflbfnjh,667788,alex32,joschi,w123456,okidoki,flatline,papercli,super8,doris1,2good4u,4z34l0ts,pedigree,freeride,gsxr1100,wulfgar,benjie,ferdinan,king1,charlie7,djdxbr,fhntvbq,ripcurl,2wsx1qaz,kingsx,desade,sn00py,loveboat,rottie,evgesha,4money,dolittle,adgjmpt,buzzers,brett1,makita,123123qweqwe,rusalka,sluts1,123456e,jameson1,bigbaby,1z2z3z,ckjybr,love4u,fucker69,erhfbyf,jeanluc,farhad,fishfood,merkin,giant1,golf69,rfnfcnhjaf,camera1,stromb,smoothy,774411,nylon,juice1,rfn.irf,newyor,123456789t,marmot,star11,jennyff,jester1,hisashi,kumquat,alex777,helicopt,merkur,dehpye,cummin,zsmj2v,kristjan,april12,englan,honeypot,badgirls,uzumaki,keines,p12345,guita,quake1,duncan1,juicer,milkbone,hurtme,123456789b,qq123456789,schwein,p3wqaw,54132442,qwertyytrewq,andreeva,ruffryde,punkie,abfkrf,kristinka,anna1987,ooooo1,335533aa,umberto,amber123,456123789,456789123,beelch,manta,peeker,1112131415,3141592654,gipper,wrinkle5,katies,asd123456,james11,78n3s5af,michael0,daboss,jimmyb,hotdog1,david69,852123,blazed,sickan,eljefe,2n6wvq,gobills,rfhfcm,squeaker,cabowabo,luebri,karups,test01,melkor,angel777,smallvil,modano,olorin,4rkpkt,leslie1,koffie,shadows1,littleon,amiga1,topeka,summer20,asterix1,pitstop,aloysius,k12345,magazin,joker69,panocha,pass1word,1233214,ironpony,368ejhih,88keys,pizza123,sonali,57np39,quake2,1234567890qw,1020304,sword1,fynjif,abcde123,dfktyjr,rockys,grendel1,harley12,kokakola,super2,azathoth,lisa123,shelley1,girlss,ibragim,seven1,jeff24,1bigdick,dragan,autobot,t4nvp7,omega123,900000,hecnfv,889988,nitro1,doggie1,fatjoe,811pahc,tommyt,savage1,pallino,smitty1,jg3h4hfn,jamielee,1qazwsx,zx123456,machine1,asdfgh123,guinnes,789520,sharkman,jochen,legend1,sonic2,extreme1,dima12,photoman,123459876,nokian95,775533,vaz2109,april10,becks,repmvf,pooker,qwer12345,themaster,nabeel,monkey10,gogetit,hockey99,bbbbbbb1,zinedine,dolphin2,anelka,1superma,winter01,muggsy,horny2,669966,kuleshov,jesusis,calavera,bullet1,87t5hdf,sleepers,winkie,vespa,lightsab,carine,magister,1spider,shitbird,salavat,becca1,wc18c2,shirak,galactus,zaskar,barkley1,reshma,dogbreat,fullsail,asasa,boeder,12345ta,zxcvbnm12,lepton,elfquest,tony123,vkaxcs,savatage,sevilia1,badkitty,munkey,pebbles1,diciembr,qapmoc,gabriel2,1qa2ws3e,cbcmrb,welldone,nfyufh,kaizen,jack11,manisha,grommit,g12345,maverik,chessman,heythere,mixail,jjjjjjj1,sylvia1,fairmont,harve,skully,global1,youwish,pikachu1,badcat,zombie1,49527843,ultra1,redrider,offsprin,lovebird,153426,stymie,aq1sw2,sorrento,0000001,r3ady41t,webster1,95175,adam123,coonass,159487,slut1,gerasim,monkey99,slutwife,159963,1pass1page,hobiecat,bigtymer,all4you,maggie2,olamide,comcast1,infinit,bailee,vasileva,.ktxrf,asdfghjkl1,12345678912,setter,fuckyou7,nnagqx,lifesuck,draken,austi,feb2000,cable1,1234qwerasdf,hax0red,zxcv12,vlad7788,nosaj,lenovo,underpar,huskies1,lovegirl,feynman,suerte,babaloo,alskdjfhg,oldsmobi,bomber1,redrover,pupuce,methodman,phenom,cutegirl,countyli,gretsch,godisgood,bysunsu,hardhat,mironova,123qwe456rty,rusty123,salut,187211,555666777,11111z,mahesh,rjntyjxtr,br00klyn,dunce1,timebomb,bovine,makelove,littlee,shaven,rizwan,patrick7,42042042,bobbijo,rustem,buttmunc,dongle,tiger69,bluecat,blackhol,shirin,peaces,cherub,cubase,longwood,lotus7,gwju3g,bruin,pzaiu8,green11,uyxnyd,seventee,dragon5,tinkerbel,bluess,bomba,fedorova,joshua2,bodyshop,peluche,gbpacker,shelly1,d1i2m3a4,ghtpbltyn,talons,sergeevna,misato,chrisc,sexmeup,brend,olddog,davros,hazelnut,bridget1,hzze929b,readme,brethart,wild1,ghbdtnbr1,nortel,kinger,royal1,bucky1,allah1,drakkar,emyeuanh,gallaghe,hardtime,jocker,tanman,flavio,abcdef123,leviatha,squid1,skeet,sexse,123456x,mom4u4mm,lilred,djljktq,ocean11,cadaver,baxter1,808state,fighton,primavera,1andrew,moogle,limabean,goddess1,vitalya,blue56,258025,bullride,cicci,1234567d,connor1,gsxr11,oliveoil,leonard1,legsex,gavrik,rjnjgtc,mexicano,2bad4u,goodfellas,ornw6d,mancheste,hawkmoon,zlzfrh,schorsch,g9zns4,bashful,rossi46,stephie,rfhfntkm,sellout,123fuck,stewar1,solnze,00007,thor5200,compaq12,didit,bigdeal,hjlbyf,zebulon,wpf8eu,kamran,emanuele,197500,carvin,ozlq6qwm,3syqo15hil,pennys,epvjb6,asdfghjkl123,198000,nfbcbz,jazzer,asfnhg66,zoloft,albundy,aeiou,getlaid,planet1,gjkbyjxrf,alex2000,brianb,moveon,maggie11,eieio,vcradq,shaggy1,novartis,cocoloco,dunamis,554uzpad,sundrop,1qwertyu,alfie,feliks,briand,123www,red456,addams,fhntv1998,goodhead,theway,javaman,angel01,stratoca,lonsdale,15987532,bigpimpin,skater1,issue43,muffie,yasmina,slowride,crm114,sanity729,himmel,carolcox,bustanut,parabola,masterlo,computador,crackhea,dynastar,rockbott,doggysty,wantsome,bigten,gaelle,juicy1,alaska1,etower,sixnine,suntan,froggies,nokia7610,hunter11,njnets,alicante,buttons1,diosesamo,elizabeth1,chiron,trustnoo,amatuers,tinytim,mechta,sammy2,cthulu,trs8f7,poonam,m6cjy69u35,cookie12,blue25,jordans,santa1,kalinka,mikey123,lebedeva,12345689,kissss,queenbee,vjybnjh,ghostdog,cuckold,bearshare,rjcntyrj,alinochka,ghjcnjrdfibyj,aggie1,teens1,3qvqod,dauren,tonino,hpk2qc,iqzzt580,bears85,nascar88,theboy,njqcw4,masyanya,pn5jvw,intranet,lollone,shadow99,00096462,techie,cvtifhbrb,redeemed,gocanes,62717315,topman,intj3a,cobrajet,antivirus,whyme,berserke,ikilz083,airedale,brandon2,hopkig,johanna1,danil8098,gojira,arthu,vision1,pendragon,milen,chrissie,vampiro,mudder,chris22,blowme69,omega7,surfers,goterps,italy1,baseba11,diego1,gnatsum,birdies,semenov,joker123,zenit2011,wojtek,cab4ma99,watchmen,damia,forgotte,fdm7ed,strummer,freelanc,cingular,orange77,mcdonalds,vjhjpjdf,kariya,tombston,starlet,hawaii1,dantheman,megabyte,nbvjirf,anjing,ybrjkftdbx,hotmom,kazbek,pacific1,sashimi,asd12,coorslig,yvtte545,kitte,elysium,klimenko,cobblers,kamehameha,only4me,redriver,triforce,sidorov,vittoria,fredi,dank420,m1234567,fallout2,989244342a,crazy123,crapola,servus,volvos,1scooter,griffin1,autopass,ownzyou,deviant,george01,2kgwai,boeing74,simhrq,hermosa,hardcor,griffy,rolex1,hackme,cuddles1,master3,bujhtr,aaron123,popolo,blader,1sexyred,gerry1,cronos,ffvdj474,yeehaw,bob1234,carlos2,mike77,buckwheat,ramesh,acls2h,monster2,montess,11qq22ww,lazer,zx123456789,chimpy,masterch,sargon,lochness,archana,1234qwert,hbxfhl,sarahb,altoid,zxcvbn12,dakot,caterham,dolomite,chazz,r29hqq,longone,pericles,grand1,sherbert,eagle3,pudge,irontree,synapse,boome,nogood,summer2,pooki,gangsta1,mahalkit,elenka,lbhtrnjh,dukedog,19922991,hopkins1,evgenia,domino1,x123456,manny1,tabbycat,drake1,jerico,drahcir,kelly2,708090a,facesit,11c645df,mac123,boodog,kalani,hiphop1,critters,hellothere,tbirds,valerka,551scasi,love777,paloalto,mrbrown,duke3d,killa1,arcturus,spider12,dizzy1,smudger,goddog,75395,spammy,1357997531,78678,datalife,zxcvbn123,1122112211,london22,23dp4x,rxmtkp,biggirls,ownsu,lzbs2twz,sharps,geryfe,237081a,golakers,nemesi,sasha1995,pretty1,mittens1,d1lakiss,speedrac,gfhjkmm,sabbat,hellrais,159753258,qwertyuiop123,playgirl,crippler,salma,strat1,celest,hello5,omega5,cheese12,ndeyl5,edward12,soccer3,cheerio,davido,vfrcbr,gjhjctyjr,boscoe,inessa,shithole,ibill,qwepoi,201jedlz,asdlkj,davidk,spawn2,ariel1,michael4,jamie123,romantik,micro1,pittsbur,canibus,katja,muhtar,thomas123,studboy,masahiro,rebrov,patrick8,hotboys,sarge1,1hammer,nnnnn1,eistee,datalore,jackdani,sasha2010,mwq6qlzo,cmfnpu,klausi,cnhjbntkm,andrzej,ilovejen,lindaa,hunter123,vvvvv1,novembe,hamster1,x35v8l,lacey1,1silver,iluvporn,valter,herson,alexsandr,cojones,backhoe,womens,777angel,beatit,klingon1,ta8g4w,luisito,benedikt,maxwel,inspecto,zaq12ws,wladimir,bobbyd,peterj,asdfg12,hellspawn,bitch69,nick1234,golfer23,sony123,jello1,killie,chubby1,kodaira52,yanochka,buckfast,morris1,roaddogg,snakeeye,sex1234,mike22,mmouse,fucker11,dantist,brittan,vfrfhjdf,doc123,plokijuh,emerald1,batman01,serafim,elementa,soccer9,footlong,cthuttdbx,hapkido,eagle123,getsmart,getiton,batman2,masons,mastiff,098890,cfvfhf,james7,azalea,sherif,saun24865709,123red,cnhtrjpf,martina1,pupper,michael5,alan12,shakir,devin1,ha8fyp,palom,mamulya,trippy,deerhunter,happyone,monkey77,3mta3,123456789f,crownvic,teodor,natusik,0137485,vovchik,strutter,triumph1,cvetok,moremone,sonnen,screwbal,akira1,sexnow,pernille,independ,poopies,samapi,kbcbxrf,master22,swetlana,urchin,viper2,magica,slurpee,postit,gilgames,kissarmy,clubpenguin,limpbizk,timber1,celin,lilkim,fuckhard,lonely1,mom123,goodwood,extasy,sdsadee23,foxglove,malibog,clark1,casey2,shell1,odense,balefire,dcunited,cubbie,pierr,solei,161718,bowling1,areyukesc,batboy,r123456,1pionee,marmelad,maynard1,cn42qj,cfvehfq,heathrow,qazxcvbn,connecti,secret123,newfie,xzsawq21,tubitzen,nikusha,enigma1,yfcnz123,1austin,michaelc,splunge,wanger,phantom2,jason2,pain4me,primetime21,babes1,liberte,sugarray,undergro,zonker,labatts,djhjyf,watch1,eagle5,madison2,cntgfirf,sasha2,masterca,fiction7,slick50,bruins1,sagitari,12481632,peniss,insuranc,2b8riedt,12346789,mrclean,ssptx452,tissot,q1w2e3r4t5y6u7,avatar1,comet1,spacer,vbrjkf,pass11,wanker1,14vbqk9p,noshit,money4me,sayana,fish1234,seaways,pipper,romeo123,karens,wardog,ab123456,gorilla1,andrey123,lifesucks,jamesr,4wcqjn,bearman,glock22,matt11,dflbvrf,barbi,maine1,dima1997,sunnyboy,6bjvpe,bangkok1,666666q,rafiki,letmein0,0raziel0,dalla,london99,wildthin,patrycja,skydog,qcactw,tmjxn151,yqlgr667,jimmyd,stripclub,deadwood,863abgsg,horses1,qn632o,scatman,sonia1,subrosa,woland,kolya,charlie4,moleman,j12345,summer11,angel11,blasen,sandal,mynewpas,retlaw,cambria,mustang4,nohack04,kimber45,fatdog,maiden1,bigload,necron,dupont24,ghost123,turbo2,.ktymrf,radagast,balzac,vsevolod,pankaj,argentum,2bigtits,mamabear,bumblebee,mercury7,maddie1,chomper,jq24nc,snooky,pussylic,1lovers,taltos,warchild,diablo66,jojo12,sumerki,aventura,gagger,annelies,drumset,cumshots,azimut,123580,clambake,bmw540,birthday54,psswrd,paganini,wildwest,filibert,teaseme,1test,scampi,thunder5,antosha,purple12,supersex,hhhhhh1,brujah,111222333a,13579a,bvgthfnjh,4506802a,killians,choco,qqqwwweee,raygun,1grand,koetsu13,sharp1,mimi92139,fastfood,idontcare,bluered,chochoz,4z3al0ts,target1,sheffiel,labrat,stalingrad,147123,cubfan,corvett1,holden1,snapper1,4071505,amadeo,pollo,desperados,lovestory,marcopolo,mumbles,familyguy,kimchee,marcio,support1,tekila,shygirl1,trekkie,submissi,ilaria,salam,loveu,wildstar,master69,sales1,netware,homer2,arseniy,gerrity1,raspberr,atreyu,stick1,aldric,tennis12,matahari,alohomora,dicanio,michae1,michaeld,666111,luvbug,boyscout,esmerald,mjordan,admiral1,steamboa,616913,ybhdfyf,557711,555999,sunray,apokalipsis,theroc,bmw330,buzzy,chicos,lenusik,shadowma,eagles05,444222,peartree,qqq123,sandmann,spring1,430799,phatass,andi03,binky1,arsch,bamba,kenny123,fabolous,loser123,poop12,maman,phobos,tecate,myxworld4,metros,cocorico,nokia6120,johnny69,hater,spanked,313233,markos,love2011,mozart1,viktoriy,reccos,331234,hornyone,vitesse,1um83z,55555q,proline,v12345,skaven,alizee,bimini,fenerbahce,543216,zaqqaz,poi123,stabilo,brownie1,1qwerty1,dinesh,baggins1,1234567t,davidkin,friend1,lietuva,octopuss,spooks,12345qq,myshit,buttface,paradoxx,pop123,golfin,sweet69,rfghbp,sambuca,kayak1,bogus1,girlz,dallas12,millers,123456zx,operatio,pravda,eternal1,chase123,moroni,proust,blueduck,harris1,redbarch,996699,1010101,mouche,millenni,1123456,score1,1234565,1234576,eae21157,dave12,pussyy,gfif1991,1598741,hoppy,darrian,snoogins,fartface,ichbins,vfkbyrf,rusrap,2741001,fyfrjylf,aprils,favre,thisis,bannana,serval,wiggum,satsuma,matt123,ivan123,gulmira,123zxc123,oscar2,acces,annie2,dragon0,emiliano,allthat,pajaro,amandine,rawiswar,sinead,tassie,karma1,piggys,nokias,orions,origami,type40,mondo,ferrets,monker,biteme2,gauntlet,arkham,ascona,ingram01,klem1,quicksil,bingo123,blue66,plazma,onfire,shortie,spjfet,123963,thered,fire777,lobito,vball,1chicken,moosehea,elefante,babe23,jesus12,parallax,elfstone,number5,shrooms,freya,hacker1,roxette,snoops,number7,fellini,dtlmvf,chigger,mission1,mitsubis,kannan,whitedog,james01,ghjgecr,rfnfgekmnf,everythi,getnaked,prettybo,sylvan,chiller,carrera4,cowbo,biochem,azbuka,qwertyuiop1,midnight1,informat,audio1,alfred1,0range,sucker1,scott2,russland,1eagle,torben,djkrjlfd,rocky6,maddy1,bonobo,portos,chrissi,xjznq5,dexte,vdlxuc,teardrop,pktmxr,iamtheone,danijela,eyphed,suzuki1,etvww4,redtail,ranger11,mowerman,asshole2,coolkid,adriana1,bootcamp,longcut,evets,npyxr5,bighurt,bassman1,stryder,giblet,nastja,blackadd,topflite,wizar,cumnow,technolo,bassboat,bullitt,kugm7b,maksimus,wankers,mine12,sunfish,pimpin1,shearer9,user1,vjzgjxnf,tycobb,80070633pc,stanly,vitaly,shirley1,cinzia,carolyn1,angeliqu,teamo,qdarcv,aa123321,ragdoll,bonit,ladyluck,wiggly,vitara,jetbalance,12345600,ozzman,dima12345,mybuddy,shilo,satan66,erebus,warrio,090808qwe,stupi,bigdan,paul1234,chiapet,brooks1,philly1,dually,gowest,farmer1,1qa2ws3ed4rf,alberto1,beachboy,barne,aa12345,aliyah,radman,benson1,dfkthbq,highball,bonou2,i81u812,workit,darter,redhook,csfbr5yy,buttlove,episode1,ewyuza,porthos,lalal,abcd12,papero,toosexy,keeper1,silver7,jujitsu,corset,pilot123,simonsay,pinggolf,katerinka,kender,drunk1,fylhjvtlf,rashmi,nighthawk,maggy,juggernaut,larryb,cabibble,fyabcf,247365,gangstar,jaybee,verycool,123456789qw,forbidde,prufrock,12345zxc,malaika,blackbur,docker,filipe,koshechka,gemma1,djamaal,dfcbkmtdf,gangst,9988aa,ducks1,pthrfkj,puertorico,muppets,griffins,whippet,sauber,timofey,larinso,123456789zxc,quicken,qsefth,liteon,headcase,bigdadd,zxc321,maniak,jamesc,bassmast,bigdogs,1girls,123xxx,trajan,lerochka,noggin,mtndew,04975756,domin,wer123,fumanchu,lambada,thankgod,june22,kayaking,patchy,summer10,timepass,poiu1234,kondor,kakka,lament,zidane10,686xqxfg,l8v53x,caveman1,nfvthkfy,holymoly,pepita,alex1996,mifune,fighter1,asslicker,jack22,abc123abc,zaxxon,midnigh,winni,psalm23,punky,monkey22,password13,mymusic,justyna,annushka,lucky5,briann,495rus19,withlove,almaz,supergir,miata,bingbong,bradpitt,kamasutr,yfgjktjy,vanman,pegleg,amsterdam1,123a321,letmein9,shivan,korona,bmw520,annette1,scotsman,gandal,welcome12,sc00by,qpwoei,fred69,m1sf1t,hamburg1,1access,dfkmrbhbz,excalibe,boobies1,fuckhole,karamel,starfuck,star99,breakfas,georgiy,ywvxpz,smasher,fatcat1,allanon,12345n,coondog,whacko,avalon1,scythe,saab93,timon,khorne,atlast,nemisis,brady12,blenheim,52678677,mick7278,9skw5g,fleetwoo,ruger1,kissass,pussy7,scruff,12345l,bigfun,vpmfsz,yxkck878,evgeny,55667788,lickher,foothill,alesis,poppies,77777778,californi,mannie,bartjek,qhxbij,thehulk,xirt2k,angelo4ek,rfkmrekznjh,tinhorse,1david,sparky12,night1,luojianhua,bobble,nederland,rosemari,travi,minou,ciscokid,beehive,565hlgqo,alpine1,samsung123,trainman,xpress,logistic,vw198m2n,hanter,zaqwsx123,qwasz,mariachi,paska,kmg365,kaulitz,sasha12,north1,polarbear,mighty1,makeksa11,123456781,one4all,gladston,notoriou,polniypizdec110211,gosia,grandad,xholes,timofei,invalidp,speaker1,zaharov,maggiema,loislane,gonoles,br5499,discgolf,kaskad,snooper,newman1,belial,demigod,vicky1,pridurok,alex1990,tardis1,cruzer,hornie,sacramen,babycat,burunduk,mark69,oakland1,me1234,gmctruck,extacy,sexdog,putang,poppen,billyd,1qaz2w,loveable,gimlet,azwebitalia,ragtop,198500,qweas,mirela,rock123,11bravo,sprewell,tigrenok,jaredleto,vfhbif,blue2,rimjob,catwalk,sigsauer,loqse,doromich,jack01,lasombra,jonny5,newpassword,profesor,garcia1,123as123,croucher,demeter,4_life,rfhfvtkm,superman2,rogues,assword1,russia1,jeff1,mydream,z123456789,rascal1,darre,kimberl,pickle1,ztmfcq,ponchik,lovesporn,hikari,gsgba368,pornoman,chbjun,choppy,diggity,nightwolf,viktori,camar,vfhecmrf,alisa1,minstrel,wishmaster,mulder1,aleks,gogirl,gracelan,8womys,highwind,solstice,dbrnjhjdyf,nightman,pimmel,beertje,ms6nud,wwfwcw,fx3tuo,poopface,asshat,dirtyd,jiminy,luv2fuck,ptybnxtvgbjy,dragnet,pornogra,10inch,scarlet1,guido1,raintree,v123456,1aaaaaaa,maxim1935,hotwater,gadzooks,playaz,harri,brando1,defcon1,ivanna,123654a,arsenal2,candela,nt5d27,jaime1,duke1,burton1,allstar1,dragos,newpoint,albacore,1236987z,verygoodbot,1wildcat,fishy1,ptktysq,chris11,puschel,itdxtyrj,7kbe9d,serpico,jazzie,1zzzzz,kindbuds,wenef45313,1compute,tatung,sardor,gfyfcjybr,test99,toucan,meteora,lysander,asscrack,jowgnx,hevnm4,suckthis,masha123,karinka,marit,oqglh565,dragon00,vvvbbb,cheburashka,vfrfrf,downlow,unforgiven,p3e85tr,kim123,sillyboy,gold1,golfvr6,quicksan,irochka,froglegs,shortsto,caleb1,tishka,bigtitts,smurfy,bosto,dropzone,nocode,jazzbass,digdug,green7,saltlake,therat,dmitriev,lunita,deaddog,summer0,1212qq,bobbyg,mty3rh,isaac1,gusher,helloman,sugarbear,corvair,extrem,teatime,tujazopi,titanik,efyreg,jo9k2jw2,counchac,tivoli,utjvtnhbz,bebit,jacob6,clayton1,incubus1,flash123,squirter,dima2010,cock1,rawks,komatsu,forty2,98741236,cajun1,madelein,mudhoney,magomed,q111111,qaswed,consense,12345b,bakayaro,silencer,zoinks,bigdic,werwolf,pinkpuss,96321478,alfie1,ali123,sarit,minette,musics,chato,iaapptfcor,cobaka,strumpf,datnigga,sonic123,yfnecbr,vjzctvmz,pasta1,tribbles,crasher,htlbcrf,1tiger,shock123,bearshar,syphon,a654321,cubbies1,jlhanes,eyespy,fucktheworld,carrie1,bmw325is,suzuk,mander,dorina,mithril,hondo1,vfhnbyb,sachem,newton1,12345x,7777755102q,230857z,xxxsex,scubapro,hayastan,spankit,delasoul,searock6,fallout3,nilrem,24681357,pashka,voluntee,pharoh,willo,india1,badboy69,roflmao,gunslinger,lovergir,mama12,melange,640xwfkv,chaton,darkknig,bigman1,aabbccdd,harleyd,birdhouse,giggsy,hiawatha,tiberium,joker7,hello1234,sloopy,tm371855,greendog,solar1,bignose,djohn11,espanol,oswego,iridium,kavitha,pavell,mirjam,cyjdsvujljv,alpha5,deluge,hamme,luntik,turismo,stasya,kjkbnf,caeser,schnecke,tweety1,tralfaz,lambrett,prodigy1,trstno1,pimpshit,werty1,karman,bigboob,pastel,blackmen,matthew8,moomin,q1w2e,gilly,primaver,jimmyg,house2,elviss,15975321,1jessica,monaliza,salt55,vfylfhbyrf,harley11,tickleme,murder1,nurgle,kickass1,theresa1,fordtruck,pargolf,managua,inkognito,sherry1,gotit,friedric,metro2033,slk230,freeport,cigarett,492529,vfhctkm,thebeach,twocats,bakugan,yzerman1,charlieb,motoko,skiman,1234567w,pussy3,love77,asenna,buffie,260zntpc,kinkos,access20,mallard1,fuckyou69,monami,rrrrr1,bigdog69,mikola,1boomer,godzila,ginger2,dima2000,skorpion39,dima1234,hawkdog79,warrior2,ltleirf,supra1,jerusale,monkey01,333z333,666888,kelsey1,w8gkz2x1,fdfnfh,msnxbi,qwe123rty,mach1,monkey3,123456789qq,c123456,nezabudka,barclays,nisse,dasha1,12345678987654321,dima1993,oldspice,frank2,rabbitt,prettyboy,ov3ajy,iamthema,kawasak,banjo1,gtivr6,collants,gondor,hibees,cowboys2,codfish,buster2,purzel,rubyred,kayaker,bikerboy,qguvyt,masher,sseexx,kenshiro,moonglow,semenova,rosari,eduard1,deltaforce,grouper,bongo1,tempgod,1taylor,goldsink,qazxsw1,1jesus,m69fg2w,maximili,marysia,husker1,kokanee,sideout,googl,south1,plumber1,trillian,00001,1357900,farkle,1xxxxx,pascha,emanuela,bagheera,hound1,mylov,newjersey,swampfox,sakic19,torey,geforce,wu4etd,conrail,pigman,martin2,ber02,nascar2,angel69,barty,kitsune,cornet,yes90125,goomba,daking,anthea,sivart,weather1,ndaswf,scoubidou,masterchief,rectum,3364068,oranges1,copter,1samanth,eddies,mimoza,ahfywbz,celtic88,86mets,applemac,amanda11,taliesin,1angel,imhere,london11,bandit12,killer666,beer1,06225930,psylocke,james69,schumach,24pnz6kc,endymion,wookie1,poiu123,birdland,smoochie,lastone,rclaki,olive1,pirat,thunder7,chris69,rocko,151617,djg4bb4b,lapper,ajcuivd289,colole57,shadow7,dallas21,ajtdmw,executiv,dickies,omegaman,jason12,newhaven,aaaaaas,pmdmscts,s456123789,beatri,applesauce,levelone,strapon,benladen,creaven,ttttt1,saab95,f123456,pitbul,54321a,sex12345,robert3,atilla,mevefalkcakk,1johnny,veedub,lilleke,nitsuj,5t6y7u8i,teddys,bluefox,nascar20,vwjetta,buffy123,playstation3,loverr,qweasd12,lover2,telekom,benjamin1,alemania,neutrino,rockz,valjean,testicle,trinity3,realty,firestarter,794613852,ardvark,guadalup,philmont,arnold1,holas,zw6syj,birthday299,dover1,sexxy1,gojets,741236985,cance,blue77,xzibit,qwerty88,komarova,qweszxc,footer,rainger,silverst,ghjcnb,catmando,tatooine,31217221027711,amalgam,69dude,qwerty321,roscoe1,74185,cubby,alfa147,perry1,darock,katmandu,darknight,knicks1,freestuff,45454,kidman,4tlved,axlrose,cutie1,quantum1,joseph10,ichigo,pentium3,rfhectkm,rowdy1,woodsink,justforfun,sveta123,pornografia,mrbean,bigpig,tujheirf,delta9,portsmou,hotbod,kartal,10111213,fkbyf001,pavel1,pistons1,necromancer,verga,c7lrwu,doober,thegame1,hatesyou,sexisfun,1melissa,tuczno18,bowhunte,gobama,scorch,campeon,bruce2,fudge1,herpderp,bacon1,redsky,blackeye,19966991,19992000,ripken8,masturba,34524815,primax,paulina1,vp6y38,427cobra,4dwvjj,dracon,fkg7h4f3v6,longview,arakis,panama1,honda2,lkjhgfdsaz,razors,steels,fqkw5m,dionysus,mariajos,soroka,enriqu,nissa,barolo,king1234,hshfd4n279,holland1,flyer1,tbones,343104ky,modems,tk421,ybrbnrf,pikapp,sureshot,wooddoor,florida2,mrbungle,vecmrf,catsdogs,axolotl,nowayout,francoi,chris21,toenail,hartland,asdjkl,nikkii,onlyyou,buckskin,fnord,flutie,holen1,rincewind,lefty1,ducky1,199000,fvthbrf,redskin1,ryno23,lostlove,19mtpgam19,abercrom,benhur,jordan11,roflcopter,ranma,phillesh,avondale,igromania,p4ssword,jenny123,tttttt1,spycams,cardigan,2112yyz,sleepy1,paris123,mopars,lakers34,hustler1,james99,matrix3,popimp,12pack,eggbert,medvedev,testit,performa,logitec,marija,sexybeast,supermanboy,iwantit,rjktcj,jeffer,svarog,halo123,whdbtp,nokia3230,heyjoe,marilyn1,speeder,ibxnsm,prostock,bennyboy,charmin,codydog,parol999,ford9402,jimmer,crayola,159357258,alex77,joey1,cayuga,phish420,poligon,specops,tarasova,caramelo,draconis,dimon,cyzkhw,june29,getbent,1guitar,jimjam,dictiona,shammy,flotsam,0okm9ijn,crapper,technic,fwsadn,rhfdxtyrj,zaq11qaz,anfield1,159753q,curious1,hip-hop,1iiiii,gfhjkm2,cocteau,liveevil,friskie,crackhead,b1afra,elektrik,lancer1,b0ll0cks,jasond,z1234567,tempest1,alakazam,asdfasd,duffy1,oneday,dinkle,qazedctgb,kasimir,happy7,salama,hondaciv,nadezda,andretti,cannondale,sparticu,znbvjd,blueice,money01,finster,eldar,moosie,pappa,delta123,neruda,bmw330ci,jeanpaul,malibu1,alevtina,sobeit,travolta,fullmetal,enamorad,mausi,boston12,greggy,smurf1,ratrace,ichiban,ilovepus,davidg,wolf69,villa1,cocopuff,football12,starfury,zxc12345,forfree,fairfiel,dreams1,tayson,mike2,dogday,hej123,oldtimer,sanpedro,clicker,mollycat,roadstar,golfe,lvbnhbq1,topdevice,a1b2c,sevastopol,calli,milosc,fire911,pink123,team3x,nolimit5,snickers1,annies,09877890,jewel1,steve69,justin11,autechre,killerbe,browncow,slava1,christer,fantomen,redcloud,elenberg,beautiful1,passw0rd1,nazira,advantag,cockring,chaka,rjpzdrf,99941,az123456,biohazar,energie,bubble1,bmw323,tellme,printer1,glavine,1starwar,coolbeans,april17,carly1,quagmire,admin2,djkujuhfl,pontoon,texmex,carlos12,thermo,vaz2106,nougat,bob666,1hockey,1john,cricke,qwerty10,twinz,totalwar,underwoo,tijger,lildevil,123q321,germania,freddd,1scott,beefy,5t4r3e2w1q,fishbait,nobby,hogger,dnstuff,jimmyc,redknapp,flame1,tinfloor,balla,nfnfhby,yukon1,vixens,batata,danny123,1zxcvbnm,gaetan,homewood,greats,tester1,green99,1fucker,sc0tland,starss,glori,arnhem,goatman,1234asd,supertra,bill123,elguapo,sexylegs,jackryan,usmc69,innow,roaddog,alukard,winter11,crawler,gogiants,rvd420,alessandr,homegrow,gobbler,esteba,valeriy,happy12,1joshua,hawking,sicnarf,waynes,iamhappy,bayadera,august2,sashas,gotti,dragonfire,pencil1,halogen,borisov,bassingw,15975346,zachar,sweetp,soccer99,sky123,flipyou,spots3,xakepy,cyclops1,dragon77,rattolo58,motorhea,piligrim,helloween,dmb2010,supermen,shad0w,eatcum,sandokan,pinga,ufkfrnbrf,roksana,amista,pusser,sony1234,azerty1,1qasw2,ghbdt,q1w2e3r4t5y6u7i8,ktutylf,brehznev,zaebali,shitass,creosote,gjrtvjy,14938685,naughtyboy,pedro123,21crack,maurice1,joesakic,nicolas1,matthew9,lbyfhf,elocin,hfcgbplzq,pepper123,tiktak,mycroft,ryan11,firefly1,arriva,cyecvevhbr,loreal,peedee,jessica8,lisa01,anamari,pionex,ipanema,airbag,frfltvbz,123456789aa,epwr49,casper12,sweethear,sanandreas,wuschel,cocodog,france1,119911,redroses,erevan,xtvgbjy,bigfella,geneve,volvo850,evermore,amy123,moxie,celebs,geeman,underwor,haslo1,joy123,hallow,chelsea0,12435687,abarth,12332145,tazman1,roshan,yummie,genius1,chrisd,ilovelife,seventy7,qaz1wsx2,rocket88,gaurav,bobbyboy,tauchen,roberts1,locksmit,masterof,www111,d9ungl,volvos40,asdasd1,golfers,jillian1,7xm5rq,arwpls4u,gbhcf2,elloco,football2,muerte,bob101,sabbath1,strider1,killer66,notyou,lawnboy,de7mdf,johnnyb,voodoo2,sashaa,homedepo,bravos,nihao123,braindea,weedhead,rajeev,artem1,camille1,rockss,bobbyb,aniston,frnhbcf,oakridge,biscayne,cxfcnm,dressage,jesus3,kellyann,king69,juillet,holliste,h00ters,ripoff,123645,1999ar,eric12,123777,tommi,dick12,bilder,chris99,rulezz,getpaid,chicubs,ender1,byajhvfnbrf,milkshak,sk8board,freakshow,antonella,monolit,shelb,hannah01,masters1,pitbull1,1matthew,luvpussy,agbdlcid,panther2,alphas,euskadi,8318131,ronnie1,7558795,sweetgirl,cookie59,sequoia,5552555,ktyxbr,4500455,money7,severus,shinobu,dbityrf,phisig,rogue2,fractal,redfred,sebastian1,nelli,b00mer,cyberman,zqjphsyf6ctifgu,oldsmobile,redeemer,pimpi,lovehurts,1slayer,black13,rtynfdh,airmax,g00gle,1panther,artemon,nopasswo,fuck1234,luke1,trinit,666000,ziadma,oscardog,davex,hazel1,isgood,demond,james5,construc,555551,january2,m1911a1,flameboy,merda,nathan12,nicklaus,dukester,hello99,scorpio7,leviathan,dfcbktr,pourquoi,vfrcbv123,shlomo,rfcgth,rocky3,ignatz,ajhneyf,roger123,squeek,4815162342a,biskit,mossimo,soccer21,gridlock,lunker,popstar,ghhh47hj764,chutney,nitehawk,vortec,gamma1,codeman,dragula,kappasig,rainbow2,milehigh,blueballs,ou8124me,rulesyou,collingw,mystere,aster,astrovan,firetruck,fische,crawfish,hornydog,morebeer,tigerpaw,radost,144000,1chance,1234567890qwe,gracie1,myopia,oxnard,seminoles,evgeni,edvard,partytim,domani,tuffy1,jaimatadi,blackmag,kzueirf,peternor,mathew1,maggie12,henrys,k1234567,fasted,pozitiv,cfdtkbq,jessica7,goleafs,bandito,girl78,sharingan,skyhigh,bigrob,zorros,poopers,oldschoo,pentium2,gripper,norcal,kimba,artiller,moneymak,00197400,272829,shadow1212,thebull,handbags,all4u2c,bigman2,civics,godisgoo,section8,bandaid,suzanne1,zorba,159123,racecars,i62gbq,rambo123,ironroad,johnson2,knobby,twinboys,sausage1,kelly69,enter2,rhjirf,yessss,james12,anguilla,boutit,iggypop,vovochka,06060,budwiser,romuald,meditate,good1,sandrin,herkules,lakers8,honeybea,11111111a,miche,rangers9,lobster1,seiko,belova,midcon,mackdadd,bigdaddy1,daddie,sepultur,freddy12,damon1,stormy1,hockey2,bailey12,hedimaptfcor,dcowboys,sadiedog,thuggin,horny123,josie1,nikki2,beaver69,peewee1,mateus,viktorija,barrys,cubswin1,matt1234,timoxa,rileydog,sicilia,luckycat,candybar,julian1,abc456,pussylip,phase1,acadia,catty,246800,evertonf,bojangle,qzwxec,nikolaj,fabrizi,kagome,noncapa0,marle,popol,hahaha1,cossie,carla10,diggers,spankey,sangeeta,cucciolo,breezer,starwar1,cornholio,rastafari,spring99,yyyyyyy1,webstar,72d5tn,sasha1234,inhouse,gobuffs,civic1,redstone,234523,minnie1,rivaldo,angel5,sti2000,xenocide,11qq11,1phoenix,herman1,holly123,tallguy,sharks1,madri,superbad,ronin,jalal123,hardbody,1234567r,assman1,vivahate,buddylee,38972091,bonds25,40028922,qrhmis,wp2005,ceejay,pepper01,51842543,redrum1,renton,varadero,tvxtjk7r,vetteman,djhvbrc,curly1,fruitcak,jessicas,maduro,popmart,acuari,dirkpitt,buick1,bergerac,golfcart,pdtpljxrf,hooch1,dudelove,d9ebk7,123452000,afdjhbn,greener,123455432,parachut,mookie12,123456780,jeepcj5,potatoe,sanya,qwerty2010,waqw3p,gotika,freaky1,chihuahu,buccanee,ecstacy,crazyboy,slickric,blue88,fktdnbyf,2004rj,delta4,333222111,calient,ptbdhw,1bailey,blitz1,sheila1,master23,hoagie,pyf8ah,orbita,daveyboy,prono1,delta2,heman,1horny,tyrik123,ostrov,md2020,herve,rockfish,el546218,rfhbyjxrf,chessmaster,redmoon,lenny1,215487,tomat,guppy,amekpass,amoeba,my3girls,nottingh,kavita,natalia1,puccini,fabiana,8letters,romeos,netgear,casper2,taters,gowings,iforgot1,pokesmot,pollit,lawrun,petey1,rosebuds,007jr,gthtcnhjqrf,k9dls02a,neener,azertyu,duke11,manyak,tiger01,petros,supermar,mangas,twisty,spotter,takagi,dlanod,qcmfd454,tusymo,zz123456,chach,navyblue,gilbert1,2kash6zq,avemaria,1hxboqg2s,viviane,lhbjkjubz2957704,nowwowtg,1a2b3c4,m0rn3,kqigb7,superpuper,juehtw,gethigh,theclown,makeme,pradeep,sergik,deion21,nurik,devo2706,nbvibt,roman222,kalima,nevaeh,martin7,anathema,florian1,tamwsn3sja,dinmamma,133159,123654q,slicks,pnp0c08,yojimbo,skipp,kiran,pussyfuck,teengirl,apples12,myballs,angeli,1234a,125678,opelastra,blind1,armagedd,fish123,pitufo,chelseaf,thedevil,nugget1,cunt69,beetle1,carter15,apolon,collant,password00,fishboy,djkrjdf,deftone,celti,three11,cyrus1,lefthand,skoal1,ferndale,aries1,fred01,roberta1,chucks,cornbread,lloyd1,icecrea,cisco123,newjerse,vfhrbpf,passio,volcom1,rikimaru,yeah11,djembe,facile,a1l2e3x4,batman7,nurbol,lorenzo1,monica69,blowjob1,998899,spank1,233391,n123456,1bear,bellsout,999998,celtic67,sabre1,putas,y9enkj,alfabeta,heatwave,honey123,hard4u,insane1,xthysq,magnum1,lightsaber,123qweqwe,fisher1,pixie1,precios,benfic,thegirls,bootsman,4321rewq,nabokov,hightime,djghjc,1chelsea,junglist,august16,t3fkvkmj,1232123,lsdlsd12,chuckie1,pescado,granit,toogood,cathouse,natedawg,bmw530,123kid,hajime,198400,engine1,wessonnn,kingdom1,novembre,1rocks,kingfisher,qwerty89,jordan22,zasranec,megat,sucess,installutil,fetish01,yanshi1982,1313666,1314520,clemence,wargod,time1,newzealand,snaker,13324124,cfrehf,hepcat,mazahaka,bigjay,denisov,eastwest,1yellow,mistydog,cheetos,1596357,ginger11,mavrik,bubby1,bhbyf,pyramide,giusepp,luthien,honda250,andrewjackie,kentavr,lampoon,zaq123wsx,sonicx,davidh,1ccccc,gorodok,windsong,programm,blunt420,vlad1995,zxcvfdsa,tarasov,mrskin,sachas,mercedes1,koteczek,rawdog,honeybear,stuart1,kaktys,richard7,55555n,azalia,hockey10,scouter,francy,1xxxxxx,julie456,tequilla,penis123,schmoe,tigerwoods,1ferrari,popov,snowdrop,matthieu,smolensk,cornflak,jordan01,love2000,23wesdxc,kswiss,anna2000,geniusnet,baby2000,33ds5x,waverly,onlyone4,networkingpe,raven123,blesse,gocards,wow123,pjflkork,juicey,poorboy,freeee,billybo,shaheen,zxcvbnm.,berlit,truth1,gepard,ludovic,gunther1,bobby2,bob12345,sunmoon,septembr,bigmac1,bcnjhbz,seaking,all4u,12qw34er56ty,bassie,nokia5228,7355608,sylwia,charvel,billgate,davion,chablis,catsmeow,kjiflrf,amylynn,rfvbkkf,mizredhe,handjob,jasper12,erbol,solara,bagpipe,biffer,notime,erlan,8543852,sugaree,oshkosh,fedora,bangbus,5lyedn,longball,teresa1,bootyman,aleksand,qazwsxedc12,nujbhc,tifosi,zpxvwy,lights1,slowpoke,tiger12,kstate,password10,alex69,collins1,9632147,doglover,baseball2,security1,grunts,orange2,godloves,213qwe879,julieb,1qazxsw23edcvfr4,noidea,8uiazp,betsy1,junior2,parol123,123456zz,piehonkii,kanker,bunky,hingis,reese1,qaz123456,sidewinder,tonedup,footsie,blackpoo,jalapeno,mummy1,always1,josh1,rockyboy,plucky,chicag,nadroj,blarney,blood123,wheaties,packer1,ravens1,mrjones,gfhjkm007,anna2010,awatar,guitar12,hashish,scale1,tomwaits,amrita,fantasma,rfpfym,pass2,tigris,bigair,slicker,sylvi,shilpa,cindylou,archie1,bitches1,poppys,ontime,horney1,camaroz28,alladin,bujhm,cq2kph,alina1,wvj5np,1211123a,tetons,scorelan,concordi,morgan2,awacs,shanty,tomcat14,andrew123,bear69,vitae,fred99,chingy,octane,belgario,fatdaddy,rhodan,password23,sexxes,boomtown,joshua01,war3demo,my2kids,buck1,hot4you,monamour,12345aa,yumiko,parool,carlton1,neverland,rose12,right1,sociald,grouse,brandon0,cat222,alex00,civicex,bintang,malkav,arschloc,dodgeviper,qwerty666,goduke,dante123,boss1,ontheroc,corpsman,love14,uiegu451,hardtail,irondoor,ghjrehfnehf,36460341,konijn,h2slca,kondom25,123456ss,cfytxrf,btnjey,nando,freemail,comander,natas666,siouxsie,hummer1,biomed,dimsum,yankees0,diablo666,lesbian1,pot420,jasonm,glock23,jennyb,itsmine,lena2010,whattheh,beandip,abaddon,kishore,signup,apogee,biteme12,suzieq,vgfun4,iseeyou,rifleman,qwerta,4pussy,hawkman,guest1,june17,dicksuck,bootay,cash12,bassale,ktybyuhfl,leetch,nescafe,7ovtgimc,clapton1,auror,boonie,tracker1,john69,bellas,cabinboy,yonkers,silky1,ladyffesta,drache,kamil1,davidp,bad123,snoopy12,sanche,werthvfy,achille,nefertiti,gerald1,slage33,warszawa,macsan26,mason123,kotopes,welcome8,nascar99,kiril,77778888,hairy1,monito,comicsans,81726354,killabee,arclight,yuo67,feelme,86753099,nnssnn,monday12,88351132,88889999,websters,subito,asdf12345,vaz2108,zvbxrpl,159753456852,rezeda,multimed,noaccess,henrique,tascam,captiva,zadrot,hateyou,sophie12,123123456,snoop1,charlie8,birmingh,hardline,libert,azsxdcf,89172735872,rjpthju,bondar,philips1,olegnaruto,myword,yakman,stardog,banana12,1234567890w,farout,annick,duke01,rfj422,billard,glock19,shaolin1,master10,cinderel,deltaone,manning1,biggreen,sidney1,patty1,goforit1,766rglqy,sevendus,aristotl,armagedo,blumen,gfhfyjz,kazakov,lekbyxxx,accord1,idiota,soccer16,texas123,victoire,ololo,chris01,bobbbb,299792458,eeeeeee1,confiden,07070,clarks,techno1,kayley,stang1,wwwwww1,uuuuu1,neverdie,jasonr,cavscout,481516234,mylove1,shaitan,1qazxcvb,barbaros,123456782000,123wer,thissucks,7seven,227722,faerie,hayduke,dbacks,snorkel,zmxncbv,tiger99,unknown1,melmac,polo1234,sssssss1,1fire,369147,bandung,bluejean,nivram,stanle,ctcnhf,soccer20,blingbli,dirtball,alex2112,183461,skylin,boobman,geronto,brittany1,yyz2112,gizmo69,ktrcec,dakota12,chiken,sexy11,vg08k714,bernadet,1bulldog,beachs,hollyb,maryjoy,margo1,danielle1,chakra,alexand,hullcity,matrix12,sarenna,pablos,antler,supercar,chomsky,german1,airjordan,545ettvy,camaron,flight1,netvideo,tootall,valheru,481516,1234as,skimmer,redcross,inuyash,uthvfy,1012nw,edoardo,bjhgfi,golf11,9379992a,lagarto,socball,boopie,krazy,.adgjmptw,gaydar,kovalev,geddylee,firstone,turbodog,loveee,135711,badbo,trapdoor,opopop11,danny2,max2000,526452,kerry1,leapfrog,daisy2,134kzbip,1andrea,playa1,peekab00,heskey,pirrello,gsewfmck,dimon4ik,puppie,chelios,554433,hypnodanny,fantik,yhwnqc,ghbdtngjrf,anchorag,buffett1,fanta,sappho,024680,vialli,chiva,lucylu,hashem,exbntkm,thema,23jordan,jake11,wildside,smartie,emerica,2wj2k9oj,ventrue,timoth,lamers,baerchen,suspende,boobis,denman85,1adam12,otello,king12,dzakuni,qsawbbs,isgay,porno123,jam123,daytona1,tazzie,bunny123,amaterasu,jeffre,crocus,mastercard,bitchedup,chicago7,aynrand,intel1,tamila,alianza,mulch,merlin12,rose123,alcapone,mircea,loveher,joseph12,chelsea6,dorothy1,wolfgar,unlimite,arturik,qwerty3,paddy1,piramid,linda123,cooool,millie1,warlock1,forgotit,tort02,ilikeyou,avensis,loveislife,dumbass1,clint1,2110se,drlove,olesia,kalinina,sergey123,123423,alicia1,markova,tri5a3,media1,willia1,xxxxxxx1,beercan,smk7366,jesusislord,motherfuck,smacker,birthday5,jbaby,harley2,hyper1,a9387670a,honey2,corvet,gjmptw,rjhjkmbien,apollon,madhuri,3a5irt,cessna17,saluki,digweed,tamia1,yja3vo,cfvlehfr,1111111q,martyna,stimpy1,anjana,yankeemp,jupiler,idkfa,1blue,fromv,afric,3xbobobo,liverp00l,nikon1,amadeus1,acer123,napoleo,david7,vbhjckfdf,mojo69,percy1,pirates1,grunt1,alenushka,finbar,zsxdcf,mandy123,1fred,timewarp,747bbb,druids,julia123,123321qq,spacebar,dreads,fcbarcelona,angela12,anima,christopher1,stargazer,123123s,hockey11,brewski,marlbor,blinker,motorhead,damngood,werthrf,letmein3,moremoney,killer99,anneke,eatit,pilatus,andrew01,fiona1,maitai,blucher,zxgdqn,e5pftu,nagual,panic1,andron,openwide,alphabeta,alison1,chelsea8,fende,mmm666,1shot2,a19l1980,123456@,1black,m1chael,vagner,realgood,maxxx,vekmnbr,stifler,2509mmh,tarkan,sherzod,1234567b,gunners1,artem2010,shooby,sammie1,p123456,piggie,abcde12345,nokia6230,moldir,piter,1qaz3edc,frequenc,acuransx,1star,nikeair,alex21,dapimp,ranjan,ilovegirls,anastasiy,berbatov,manso,21436587,leafs1,106666,angelochek,ingodwetrust,123456aaa,deano,korsar,pipetka,thunder9,minka,himura,installdevic,1qqqqq,digitalprodu,suckmeoff,plonker,headers,vlasov,ktr1996,windsor1,mishanya,garfield1,korvin,littlebit,azaz09,vandamme,scripto,s4114d,passward,britt1,r1chard,ferrari5,running1,7xswzaq,falcon2,pepper76,trademan,ea53g5,graham1,volvos80,reanimator,micasa,1234554321q,kairat,escorpion,sanek94,karolina1,kolovrat,karen2,1qaz@wsx,racing1,splooge,sarah2,deadman1,creed1,nooner,minicoop,oceane,room112,charme,12345ab,summer00,wetcunt,drewman,nastyman,redfire,appels,merlin69,dolfin,bornfree,diskette,ohwell,12345678qwe,jasont,madcap,cobra2,dolemit1,whatthehell,juanit,voldemar,rocke,bianc,elendil,vtufgjkbc,hotwheels,spanis,sukram,pokerface,k1ller,freakout,dontae,realmadri,drumss,gorams,258789,snakey,jasonn,whitewolf,befree,johnny99,pooka,theghost,kennys,vfvektxrf,toby1,jumpman23,deadlock,barbwire,stellina,alexa1,dalamar,mustanggt,northwes,tesoro,chameleo,sigtau,satoshi,george11,hotcum,cornell1,golfer12,geek01d,trololo,kellym,megapolis,pepsi2,hea666,monkfish,blue52,sarajane,bowler1,skeets,ddgirls,hfccbz,bailey01,isabella1,dreday,moose123,baobab,crushme,000009,veryhot,roadie,meanone,mike18,henriett,dohcvtec,moulin,gulnur,adastra,angel9,western1,natura,sweetpe,dtnfkm,marsbar,daisys,frogger1,virus1,redwood1,streetball,fridolin,d78unhxq,midas,michelob,cantik,sk2000,kikker,macanudo,rambone,fizzle,20000,peanuts1,cowpie,stone32,astaroth,dakota01,redso,mustard1,sexylove,giantess,teaparty,bobbin,beerbong,monet1,charles3,anniedog,anna1988,cameleon,longbeach,tamere,qpful542,mesquite,waldemar,12345zx,iamhere,lowboy,canard,granp,daisymay,love33,moosejaw,nivek,ninjaman,shrike01,aaa777,88002000600,vodolei,bambush,falcor,harley69,alphaomega,severine,grappler,bosox,twogirls,gatorman,vettes,buttmunch,chyna,excelsio,crayfish,birillo,megumi,lsia9dnb9y,littlebo,stevek,hiroyuki,firehous,master5,briley2,gangste,chrisk,camaleon,bulle,troyboy,froinlaven,mybutt,sandhya,rapala,jagged,crazycat,lucky12,jetman,wavmanuk,1heather,beegee,negril,mario123,funtime1,conehead,abigai,mhorgan,patagoni,travel1,backspace,frenchfr,mudcat,dashenka,baseball3,rustys,741852kk,dickme,baller23,griffey1,suckmycock,fuhrfzgc,jenny2,spuds,berlin1,justfun,icewind,bumerang,pavlusha,minecraft123,shasta1,ranger12,123400,twisters,buthead,miked,finance1,dignity7,hello9,lvjdp383,jgthfnjh,dalmatio,paparoach,miller31,2bornot2b,fathe,monterre,theblues,satans,schaap,jasmine2,sibelius,manon,heslo,jcnhjd,shane123,natasha2,pierrot,bluecar,iloveass,harriso,red12,london20,job314,beholder,reddawg,fuckyou!,pussylick,bologna1,austintx,ole4ka,blotto,onering,jearly,balbes,lightbul,bighorn,crossfir,lee123,prapor,1ashley,gfhjkm22,wwe123,09090,sexsite,marina123,jagua,witch1,schmoo,parkview,dragon3,chilango,ultimo,abramova,nautique,2bornot2,duende,1arthur,nightwing,surfboar,quant4307,15s9pu03,karina1,shitball,walleye1,wildman1,whytesha,1morgan,my2girls,polic,baranova,berezuckiy,kkkkkk1,forzima,fornow,qwerty02,gokart,suckit69,davidlee,whatnow,edgard,tits1,bayshore,36987412,ghbphfr,daddyy,explore1,zoidberg,5qnzjx,morgane,danilov,blacksex,mickey12,balsam,83y6pv,sarahc,slaye,all4u2,slayer69,nadia1,rlzwp503,4cranker,kaylie,numberon,teremok,wolf12,deeppurple,goodbeer,aaa555,66669999,whatif,harmony1,ue8fpw,3tmnej,254xtpss,dusty197,wcksdypk,zerkalo,dfnheirf,motorol,digita,whoareyou,darksoul,manics,rounders,killer11,d2000lb,cegthgfhjkm,catdog1,beograd,pepsico,julius1,123654987,softbal,killer23,weasel1,lifeson,q123456q,444555666,bunches,andy1,darby1,service01,bear11,jordan123,amega,duncan21,yensid,lerxst,rassvet,bronco2,fortis,pornlove,paiste,198900,asdflkjh,1236547890,futur,eugene1,winnipeg261,fk8bhydb,seanjohn,brimston,matthe1,bitchedu,crisco,302731,roxydog,woodlawn,volgograd,ace1210,boy4u2ownnyc,laura123,pronger,parker12,z123456z,andrew13,longlife,sarang,drogba,gobruins,soccer4,holida,espace,almira,murmansk,green22,safina,wm00022,1chevy,schlumpf,doroth,ulises,golf99,hellyes,detlef,mydog,erkina,bastardo,mashenka,sucram,wehttam,generic1,195000,spaceboy,lopas123,scammer,skynyrd,daddy2,titani,ficker,cr250r,kbnthfnehf,takedown,sticky1,davidruiz,desant,nremtp,painter1,bogies,agamemno,kansas1,smallfry,archi,2b4dnvsx,1player,saddie,peapod,6458zn7a,qvw6n2,gfxqx686,twice2,sh4d0w3d,mayfly,375125,phitau,yqmbevgk,89211375759,kumar1,pfhfpf,toyboy,way2go,7pvn4t,pass69,chipster,spoony,buddycat,diamond3,rincewin,hobie,david01,billbo,hxp4life,matild,pokemon2,dimochka,clown1,148888,jenmt3,cuxldv,cqnwhy,cde34rfv,simone1,verynice,toobig,pasha123,mike00,maria2,lolpop,firewire,dragon9,martesana,a1234567890,birthday3,providen,kiska,pitbulls,556655,misawa,damned69,martin11,goldorak,gunship,glory1,winxclub,sixgun,splodge,agent1,splitter,dome69,ifghjb,eliza1,snaiper,wutang36,phoenix7,666425,arshavin,paulaner,namron,m69fg1w,qwert1234,terrys,zesyrmvu,joeman,scoots,dwml9f,625vrobg,sally123,gostoso,symow8,pelota,c43qpul5rz,majinbuu,lithium1,bigstuff,horndog1,kipelov,kringle,1beavis,loshara,octobe,jmzacf,12342000,qw12qw,runescape1,chargers1,krokus,piknik,jessy,778811,gjvbljh,474jdvff,pleaser,misskitty,breaker1,7f4df451,dayan,twinky,yakumo,chippers,matia,tanith,len2ski1,manni,nichol1,f00b4r,nokia3110,standart,123456789i,shami,steffie,larrywn,chucker,john99,chamois,jjjkkk,penmouse,ktnj2010,gooners,hemmelig,rodney1,merlin01,bearcat1,1yyyyy,159753z,1fffff,1ddddd,thomas11,gjkbyrf,ivanka,f1f2f3,petrovna,phunky,conair,brian2,creative1,klipsch,vbitymrf,freek,breitlin,cecili,westwing,gohabsgo,tippmann,1steve,quattro6,fatbob,sp00ky,rastas,1123581,redsea,rfnmrf,jerky1,1aaaaaa,spk666,simba123,qwert54321,123abcd,beavis69,fyfyfc,starr1,1236547,peanutbutter,sintra,12345abcde,1357246,abcde1,climbon,755dfx,mermaids,monte1,serkan,geilesau,777win,jasonc,parkside,imagine1,rockhead,producti,playhard,principa,spammer,gagher,escada,tsv1860,dbyjuhfl,cruiser1,kennyg,montgome,2481632,pompano,cum123,angel6,sooty,bear01,april6,bodyhamm,pugsly,getrich,mikes,pelusa,fosgate,jasonp,rostislav,kimberly1,128mo,dallas11,gooner1,manuel1,cocacola1,imesh,5782790,password8,daboys,1jones,intheend,e3w2q1,whisper1,madone,pjcgujrat,1p2o3i,jamesp,felicida,nemrac,phikap,firecat,jrcfyjxrf,matt12,bigfan,doedel,005500,jasonx,1234567k,badfish,goosey,utjuhfabz,wilco,artem123,igor123,spike123,jor23dan,dga9la,v2jmsz,morgan12,avery1,dogstyle,natasa,221195ws,twopac,oktober7,karthik,poop1,mightymo,davidr,zermatt,jehova,aezakmi1,dimwit,monkey5,serega123,qwerty111,blabl,casey22,boy123,1clutch,asdfjkl1,hariom,bruce10,jeep95,1smith,sm9934,karishma,bazzzz,aristo,669e53e1,nesterov,kill666,fihdfv,1abc2,anna1,silver11,mojoman,telefono,goeagles,sd3lpgdr,rfhfynby,melinda1,llcoolj,idteul,bigchief,rocky13,timberwo,ballers,gatekeep,kashif,hardass,anastasija,max777,vfuyjkbz,riesling,agent99,kappas,dalglish,tincan,orange3,turtoise,abkbvjy,mike24,hugedick,alabala,geolog,aziza,devilboy,habanero,waheguru,funboy,freedom5,natwest,seashore,impaler,qwaszx1,pastas,bmw535,tecktonik,mika00,jobsearc,pinche,puntang,aw96b6,1corvett,skorpio,foundati,zzr1100,gembird,vfnhjcrby,soccer18,vaz2110,peterp,archer1,cross1,samedi,dima1992,hunter99,lipper,hotbody,zhjckfdf,ducati1,trailer1,04325956,cheryl1,benetton,kononenko,sloneczko,rfgtkmrf,nashua,balalaika,ampere,eliston,dorsai,digge,flyrod,oxymoron,minolta,ironmike,majortom,karimov,fortun,putaria,an83546921an13,blade123,franchis,mxaigtg5,dynxyu,devlt4,brasi,terces,wqmfuh,nqdgxz,dale88,minchia,seeyou,housepen,1apple,1buddy,mariusz,bighouse,tango2,flimflam,nicola1,qwertyasd,tomek1,shumaher,kartoshka,bassss,canaries,redman1,123456789as,preciosa,allblacks,navidad,tommaso,beaudog,forrest1,green23,ryjgjxrf,go4it,ironman2,badnews,butterba,1grizzly,isaeva,rembrand,toront,1richard,bigjon,yfltymrf,1kitty,4ng62t,littlejo,wolfdog,ctvtyjd,spain1,megryan,tatertot,raven69,4809594q,tapout,stuntman,a131313,lagers,hotstuf,lfdbl11,stanley2,advokat,boloto,7894561,dooker,adxel187,cleodog,4play,0p9o8i,masterb,bimota,charlee,toystory,6820055,6666667,crevette,6031769,corsa,bingoo,dima1990,tennis11,samuri,avocado,melissa6,unicor,habari,metart,needsex,cockman,hernan,3891576,3334444,amigo1,gobuffs2,mike21,allianz,2835493,179355,midgard,joey123,oneluv,ellis1,towncar,shonuff,scouse,tool69,thomas19,chorizo,jblaze,lisa1,dima1999,sophia1,anna1989,vfvekbxrf,krasavica,redlegs,jason25,tbontb,katrine,eumesmo,vfhufhbnrf,1654321,asdfghj1,motdepas,booga,doogle,1453145,byron1,158272,kardinal,tanne,fallen1,abcd12345,ufyljy,n12345,kucing,burberry,bodger,1234578,februar,1234512,nekkid,prober,harrison1,idlewild,rfnz90,foiegras,pussy21,bigstud,denzel,tiffany2,bigwill,1234567890zzz,hello69,compute1,viper9,hellspaw,trythis,gococks,dogballs,delfi,lupine,millenia,newdelhi,charlest,basspro,1mike,joeblack,975310,1rosebud,batman11,misterio,fucknut,charlie0,august11,juancho,ilonka,jigei743ks,adam1234,889900,goonie,alicat,ggggggg1,1zzzzzzz,sexywife,northstar,chris23,888111,containe,trojan1,jason5,graikos,1ggggg,1eeeee,tigers01,indigo1,hotmale,jacob123,mishima,richard3,cjxb2014,coco123,meagain,thaman,wallst,edgewood,bundas,1power,matilda1,maradon,hookedup,jemima,r3vi3wpass,2004-10-,mudman,taz123,xswzaq,emerson1,anna21,warlord1,toering,pelle,tgwdvu,masterb8,wallstre,moppel,priora,ghjcnjrdfif,yoland,12332100,1j9e7f6f,jazzzz,yesman,brianm,42qwerty42,12345698,darkmanx,nirmal,john31,bb123456,neuspeed,billgates,moguls,fj1200,hbhlair,shaun1,ghbdfn,305pwzlr,nbu3cd,susanb,pimpdad,mangust6403,joedog,dawidek,gigante,708090,703751,700007,ikalcr,tbivbn,697769,marvi,iyaayas,karen123,jimmyboy,dozer1,e6z8jh,bigtime1,getdown,kevin12,brookly,zjduc3,nolan1,cobber,yr8wdxcq,liebe,m1garand,blah123,616879,action1,600000,sumitomo,albcaz,asian1,557799,dave69,556699,sasa123,streaker,michel1,karate1,buddy7,daulet,koks888,roadtrip,wapiti,oldguy,illini1,1234qq,mrspock,kwiatek,buterfly,august31,jibxhq,jackin,taxicab,tristram,talisker,446655,444666,chrisa,freespace,vfhbfyyf,chevell,444333,notyours,442244,christian1,seemore,sniper12,marlin1,joker666,multik,devilish,crf450,cdfoli,eastern1,asshead,duhast,voyager2,cyberia,1wizard,cybernet,iloveme1,veterok,karandash,392781,looksee,diddy,diabolic,foofight,missey,herbert1,bmw318i,premier1,zsfmpv,eric1234,dun6sm,fuck11,345543,spudman,lurker,bitem,lizzy1,ironsink,minami,339311,s7fhs127,sterne,332233,plankton,galax,azuywe,changepa,august25,mouse123,sikici,killer69,xswqaz,quovadis,gnomik,033028pw,777777a,barrakuda,spawn666,goodgod,slurp,morbius,yelnats,cujo31,norman1,fastone,earwig,aureli,wordlife,bnfkbz,yasmi,austin123,timberla,missy2,legalize,netcom,liljon,takeit,georgin,987654321z,warbird,vitalina,all4u3,mmmmmm1,bichon,ellobo,wahoos,fcazmj,aksarben,lodoss,satnam,vasili,197800,maarten,sam138989,0u812,ankita,walte,prince12,anvils,bestia,hoschi,198300,univer,jack10,ktyecbr,gr00vy,hokie,wolfman1,fuckwit,geyser,emmanue,ybrjkftd,qwerty33,karat,dblock,avocat,bobbym,womersle,1please,nostra,dayana,billyray,alternat,iloveu1,qwerty69,rammstein1,mystikal,winne,drawde,executor,craxxxs,ghjcnjnf,999888777,welshman,access123,963214785,951753852,babe69,fvcnthlfv,****me,666999666,testing2,199200,nintendo64,oscarr,guido8,zhanna,gumshoe,jbird,159357456,pasca,123452345,satan6,mithrand,fhbirf,aa1111aa,viggen,ficktjuv,radial9,davids1,rainbow7,futuro,hipho,platin,poppy123,rhenjq,fulle,rosit,chicano,scrumpy,lumpy1,seifer,uvmrysez,autumn1,xenon,susie1,7u8i9o0p,gamer1,sirene,muffy1,monkeys1,kalinin,olcrackmaster,hotmove,uconn,gshock,merson,lthtdyz,pizzaboy,peggy1,pistache,pinto1,fishka,ladydi,pandor,baileys,hungwell,redboy,rookie1,amanda01,passwrd,clean1,matty1,tarkus,jabba1,bobster,beer30,solomon1,moneymon,sesamo,fred11,sunnysid,jasmine5,thebears,putamadre,workhard,flashbac,counter1,liefde,magnat,corky1,green6,abramov,lordik,univers,shortys,david3,vip123,gnarly,1234567s,billy2,honkey,deathstar,grimmy,govinda,direktor,12345678s,linus1,shoppin,rekbrjdf,santeria,prett,berty75,mohican,daftpunk,uekmyfhf,chupa,strats,ironbird,giants56,salisbur,koldun,summer04,pondscum,jimmyj,miata1,george3,redshoes,weezie,bartman1,0p9o8i7u,s1lver,dorkus,125478,omega9,sexisgood,mancow,patric1,jetta1,074401,ghjuhtcc,gfhjk,bibble,terry2,123213,medicin,rebel2,hen3ry,4freedom,aldrin,lovesyou,browny,renwod,winnie1,belladon,1house,tyghbn,blessme,rfhfrfnbwf,haylee,deepdive,booya,phantasy,gansta,cock69,4mnveh,gazza1,redapple,structur,anakin1,manolito,steve01,poolman,chloe123,vlad1998,qazwsxe,pushit,random123,ontherocks,o236nq,brain1,dimedrol,agape,rovnogod,1balls,knigh,alliso,love01,wolf01,flintstone,beernuts,tuffguy,isengard,highfive,alex23,casper99,rubina,getreal,chinita,italian1,airsoft,qwerty23,muffdiver,willi1,grace123,orioles1,redbull1,chino1,ziggy123,breadman,estefan,ljcneg,gotoit,logan123,wideglid,mancity1,treess,qwe123456,kazumi,qweasdqwe,oddworld,naveed,protos,towson,a801016,godislov,at_asp,bambam1,soccer5,dark123,67vette,carlos123,hoser1,scouser,wesdxc,pelus,dragon25,pflhjn,abdula,1freedom,policema,tarkin,eduardo1,mackdad,gfhjkm11,lfplhfgthvf,adilet,zzzzxxxx,childre,samarkand,cegthgegth,shama,fresher,silvestr,greaser,allout,plmokn,sexdrive,nintendo1,fantasy7,oleander,fe126fd,crumpet,pingzing,dionis,hipster,yfcnz,requin,calliope,jerome1,housecat,abc123456789,doghot,snake123,augus,brillig,chronic1,gfhjkbot,expediti,noisette,master7,caliban,whitetai,favorite3,lisamari,educatio,ghjhjr,saber1,zcegth,1958proman,vtkrbq,milkdud,imajica,thehip,bailey10,hockey19,dkflbdjcnjr,j123456,bernar,aeiouy,gamlet,deltachi,endzone,conni,bcgfybz,brandi1,auckland2010,7653ajl1,mardigra,testuser,bunko18,camaro67,36936,greenie,454dfmcq,6xe8j2z4,mrgreen,ranger5,headhunt,banshee1,moonunit,zyltrc,hello3,pussyboy,stoopid,tigger11,yellow12,drums1,blue02,kils123,junkman,banyan,jimmyjam,tbbucs,sportster,badass1,joshie,braves10,lajolla,1amanda,antani,78787,antero,19216801,chich,rhett32,sarahm,beloit,sucker69,corkey,nicosnn,rccola,caracol,daffyduc,bunny2,mantas,monkies,hedonist,cacapipi,ashton1,sid123,19899891,patche,greekgod,cbr1000,leader1,19977991,ettore,chongo,113311,picass,cfif123,rhtfnbd,frances1,andy12,minnette,bigboy12,green69,alices,babcia,partyboy,javabean,freehand,qawsed123,xxx111,harold1,passwo,jonny1,kappa1,w2dlww3v5p,1merlin,222999,tomjones,jakeman,franken,markhegarty,john01,carole1,daveman,caseys,apeman,mookey,moon123,claret,titans1,residentevil,campari,curitiba,dovetail,aerostar,jackdaniels,basenji,zaq12w,glencoe,biglove,goober12,ncc170,far7766,monkey21,eclipse9,1234567v,vanechka,aristote,grumble,belgorod,abhishek,neworleans,pazzword,dummie,sashadog,diablo11,mst3000,koala1,maureen1,jake99,isaiah1,funkster,gillian1,ekaterina20,chibears,astra123,4me2no,winte,skippe,necro,windows9,vinograd,demolay,vika2010,quiksilver,19371ayj,dollar1,shecky,qzwxecrv,butterfly1,merrill1,scoreland,1crazy,megastar,mandragora,track1,dedhed,jacob2,newhope,qawsedrftgyh,shack1,samvel,gatita,shyster,clara1,telstar,office1,crickett,truls,nirmala,joselito,chrisl,lesnik,aaaabbbb,austin01,leto2010,bubbie,aaa12345,widder,234432,salinger,mrsmith,qazsedcft,newshoes,skunks,yt1300,bmw316,arbeit,smoove,123321qweewq,123qazwsx,22221111,seesaw,0987654321a,peach1,1029384756q,sereda,gerrard8,shit123,batcave,energy1,peterb,mytruck,peter12,alesya,tomato1,spirou,laputaxx,magoo1,omgkremidia,knight12,norton1,vladislava,shaddy,austin11,jlbyjxrf,kbdthgekm,punheta,fetish69,exploiter,roger2,manstein,gtnhjd,32615948worms,dogbreath,ujkjdjkjvrf,vodka1,ripcord,fatrat,kotek1,tiziana,larrybir,thunder3,nbvfnb,9kyq6fge,remembe,likemike,gavin1,shinigam,yfcnfcmz,13245678,jabbar,vampyr,ane4ka,lollipo,ashwin,scuderia,limpdick,deagle,3247562,vishenka,fdhjhf,alex02,volvov70,mandys,bioshock,caraca,tombraider,matrix69,jeff123,13579135,parazit,black3,noway1,diablos,hitmen,garden1,aminor,decembe,august12,b00ger,006900,452073t,schach,hitman1,mariner1,vbnmrf,paint1,742617000027,bitchboy,pfqxjyjr,5681392,marryher,sinnet,malik1,muffin12,aninha,piolin,lady12,traffic1,cbvjyf,6345789,june21,ivan2010,ryan123,honda99,gunny,coorslight,asd321,hunter69,7224763,sonofgod,dolphins1,1dolphin,pavlenko,woodwind,lovelov,pinkpant,gblfhfcbyf,hotel1,justinbiebe,vinter,jeff1234,mydogs,1pizza,boats1,parrothe,shawshan,brooklyn1,cbrown,1rocky,hemi426,dragon64,redwings1,porsches,ghostly,hubbahub,buttnut,b929ezzh,sorokina,flashg,fritos,b7mguk,metatron,treehous,vorpal,8902792,marcu,free123,labamba,chiefs1,zxc123zxc,keli_14,hotti,1steeler,money4,rakker,foxwoods,free1,ahjkjd,sidorova,snowwhit,neptune1,mrlover,trader1,nudelamb,baloo,power7,deltasig,bills1,trevo,7gorwell,nokia6630,nokia5320,madhatte,1cowboys,manga1,namtab,sanjar,fanny1,birdman1,adv12775,carlo1,dude1998,babyhuey,nicole11,madmike,ubvyfpbz,qawsedr,lifetec,skyhook,stalker123,toolong,robertso,ripazha,zippy123,1111111a,manol,dirtyman,analslut,jason3,dutches,minhasenha,cerise,fenrir,jayjay1,flatbush,franka,bhbyjxrf,26429vadim,lawntrax,198700,fritzy,nikhil,ripper1,harami,truckman,nemvxyheqdd5oqxyxyzi,gkfytnf,bugaboo,cableman,hairpie,xplorer,movado,hotsex69,mordred,ohyeah1,patrick3,frolov,katieh,4311111q,mochaj,presari,bigdo,753951852,freedom4,kapitan,tomas1,135795,sweet123,pokers,shagme,tane4ka,sentinal,ufgyndmv,jonnyb,skate123,123456798,123456788,very1,gerrit,damocles,dollarbi,caroline1,lloyds,pizdets,flatland,92702689,dave13,meoff,ajnjuhfabz,achmed,madison9,744744z,amonte,avrillavigne,elaine1,norma1,asseater,everlong,buddy23,cmgang1,trash1,mitsu,flyman,ulugbek,june27,magistr,fittan,sebora64,dingos,sleipnir,caterpil,cindys,212121qaz,partys,dialer,gjytltkmybr,qweqaz,janvier,rocawear,lostboy,aileron,sweety1,everest1,pornman,boombox,potter1,blackdic,44448888,eric123,112233aa,2502557i,novass,nanotech,yourname,x12345,indian1,15975300,1234567l,carla51,chicago0,coleta,cxzdsaewq,qqwweerr,marwan,deltic,hollys,qwerasd,pon32029,rainmake,nathan0,matveeva,legioner,kevink,riven,tombraid,blitzen,a54321,jackyl,chinese1,shalimar,oleg1995,beaches1,tommylee,eknock,berli,monkey23,badbob,pugwash,likewhoa,jesus2,yujyd360,belmar,shadow22,utfp5e,angelo1,minimax,pooder,cocoa1,moresex,tortue,lesbia,panthe,snoopy2,drumnbass,alway,gmcz71,6jhwmqku,leppard,dinsdale,blair1,boriqua,money111,virtuagirl,267605,rattlesn,1sunshin,monica12,veritas1,newmexic,millertime,turandot,rfvxfnrf,jaydog,kakawka,bowhunter,booboo12,deerpark,erreway,taylorma,rfkbybyf,wooglin,weegee,rexdog,iamhorny,cazzo1,vhou812,bacardi1,dctktyyfz,godpasi,peanut12,bertha1,fuckyoubitch,ghosty,altavista,jertoot,smokeit,ghjcnbvtyz,fhnehxbr,rolsen,qazxcdews,maddmaxx,redrocke,qazokm,spencer2,thekiller,asdf11,123sex,tupac1,p1234567,dbrown,1biteme,tgo4466,316769,sunghi,shakespe,frosty1,gucci1,arcana,bandit01,lyubov,poochy,dartmout,magpies1,sunnyd,mouseman,summer07,chester7,shalini,danbury,pigboy,dave99,deniss,harryb,ashley11,pppppp1,01081988m,balloon1,tkachenko,bucks1,master77,pussyca,tricky1,zzxxccvv,zoulou,doomer,mukesh,iluv69,supermax,todays,thefox,don123,dontask,diplom,piglett,shiney,fahbrf,qaz12wsx,temitope,reggin,project1,buffy2,inside1,lbpfqyth,vanilla1,lovecock,u4slpwra,fylh.irf,123211,7ertu3ds,necroman,chalky,artist1,simpso,4x7wjr,chaos666,lazyacres,harley99,ch33s3,marusa,eagle7,dilligas,computadora,lucky69,denwer,nissan350z,unforgiv,oddball,schalke0,aztec1,borisova,branden1,parkave,marie123,germa,lafayett,878kckxy,405060,cheeseca,bigwave,fred22,andreea,poulet,mercutio,psycholo,andrew88,o4izdmxu,sanctuar,newhome,milion,suckmydi,rjvgm.nth,warior,goodgame,1qwertyuiop,6339cndh,scorpio2,macker,southbay,crabcake,toadie,paperclip,fatkid,maddo,cliff1,rastafar,maries,twins1,geujdrf,anjela,wc4fun,dolina,mpetroff,rollout,zydeco,shadow3,pumpki,steeda,volvo240,terras,blowjo,blue2000,incognit,badmojo,gambit1,zhukov,station1,aaronb,graci,duke123,clipper1,qazxsw2,ledzeppe,kukareku,sexkitte,cinco,007008,lakers12,a1234b,acmilan1,afhfjy,starrr,slutty3,phoneman,kostyan,bonzo1,sintesi07,ersatz,cloud1,nephilim,nascar03,rey619,kairos,123456789e,hardon1,boeing1,juliya,hfccdtn,vgfun8,polizei,456838,keithb,minouche,ariston,savag,213141,clarkken,microwav,london2,santacla,campeo,qr5mx7,464811,mynuts,bombo,1mickey,lucky8,danger1,ironside,carter12,wyatt1,borntorun,iloveyou123,jose1,pancake1,tadmichaels,monsta,jugger,hunnie,triste,heat7777,ilovejesus,queeny,luckycharm,lieben,gordolee85,jtkirk,forever21,jetlag,skylane,taucher,neworlea,holera,000005,anhnhoem,melissa7,mumdad,massimiliano,dima1994,nigel1,madison3,slicky,shokolad,serenit,jmh1978,soccer123,chris3,drwho,rfpzdrf,1qasw23ed,free4me,wonka,sasquatc,sanan,maytag,verochka,bankone,molly12,monopoli,xfqybr,lamborgini,gondolin,candycane,needsome,jb007,scottie1,brigit,0147258369,kalamazo,lololyo123,bill1234,ilovejes,lol123123,popkorn,april13,567rntvm,downunde,charle1,angelbab,guildwars,homeworld,qazxcvbnm,superma1,dupa123,kryptoni,happyy,artyom,stormie,cool11,calvin69,saphir,konovalov,jansport,october8,liebling,druuna,susans,megans,tujhjdf,wmegrfux,jumbo1,ljb4dt7n,012345678910,kolesnik,speculum,at4gftlw,kurgan,93pn75,cahek0980,dallas01,godswill,fhifdby,chelsea4,jump23,barsoom,catinhat,urlacher,angel99,vidadi1,678910,lickme69,topaz1,westend,loveone,c12345,gold12,alex1959,mamon,barney12,1maggie,alex12345,lp2568cskt,s1234567,gjikbdctyf,anthony0,browns99,chips1,sunking,widespre,lalala1,tdutif,fucklife,master00,alino4ka,stakan,blonde1,phoebus,tenore,bvgthbz,brunos,suzjv8,uvdwgt,revenant,1banana,veroniqu,sexfun,sp1der,4g3izhox,isakov,shiva1,scooba,bluefire,wizard12,dimitris,funbags,perseus,hoodoo,keving,malboro,157953,a32tv8ls,latics,animate,mossad,yejntb,karting,qmpq39zr,busdrive,jtuac3my,jkne9y,sr20dett,4gxrzemq,keylargo,741147,rfktylfhm,toast1,skins1,xcalibur,gattone,seether,kameron,glock9mm,julio1,delenn,gameday,tommyd,str8edge,bulls123,66699,carlsberg,woodbird,adnama,45auto,codyman,truck2,1w2w3w4w,pvjegu,method1,luetdi,41d8cd98f00b,bankai,5432112345,94rwpe,reneee,chrisx,melvins,775577,sam2000,scrappy1,rachid,grizzley,margare,morgan01,winstons,gevorg,gonzal,crawdad,gfhfdjp,babilon,noneya,pussy11,barbell,easyride,c00li0,777771,311music,karla1,golions,19866891,peejay,leadfoot,hfvbkm,kr9z40sy,cobra123,isotwe,grizz,sallys,****you,aaa123a,dembel,foxs14,hillcres,webman,mudshark,alfredo1,weeded,lester1,hovepark,ratface,000777fffa,huskie,wildthing,elbarto,waikiki,masami,call911,goose2,regin,dovajb,agricola,cjytxrj,andy11,penny123,family01,a121212,1braves,upupa68,happy100,824655,cjlove,firsttim,kalel,redhair,dfhtymt,sliders,bananna,loverbo,fifa2008,crouton,chevy350,panties2,kolya1,alyona,hagrid,spagetti,q2w3e4r,867530,narkoman,nhfdvfnjkju123,1ccccccc,napolean,0072563,allay,w8sted,wigwam,jamesk,state1,parovoz,beach69,kevinb,rossella,logitech1,celula,gnocca,canucks1,loginova,marlboro1,aaaa1,kalleanka,mester,mishutka,milenko,alibek,jersey1,peterc,1mouse,nedved,blackone,ghfplybr,682regkh,beejay,newburgh,ruffian,clarets,noreaga,xenophon,hummerh2,tenshi,smeagol,soloyo,vfhnby,ereiamjh,ewq321,goomie,sportin,cellphone,sonnie,jetblack,saudan,gblfhfc,matheus,uhfvjnf,alicja,jayman1,devon1,hexagon,bailey2,vtufajy,yankees7,salty1,908070,killemal,gammas,eurocard,sydney12,tuesday1,antietam,wayfarer,beast666,19952009sa,aq12ws,eveli,hockey21,haloreach,dontcare,xxxx1,andrea11,karlmarx,jelszo,tylerb,protools,timberwolf,ruffneck,pololo,1bbbbb,waleed,sasami,twinss,fairlady,illuminati,alex007,sucks1,homerjay,scooter7,tarbaby,barmaley,amistad,vanes,randers,tigers12,dreamer2,goleafsg,googie,bernie1,as12345,godeep,james3,phanto,gwbush,cumlover,2196dc,studioworks,995511,golf56,titova,kaleka,itali,socks1,kurwamac,daisuke,hevonen,woody123,daisie,wouter,henry123,gostosa,guppie,porpoise,iamsexy,276115,paula123,1020315,38gjgeuftd,rjrfrjkf,knotty,idiot1,sasha12345,matrix13,securit,radical1,ag764ks,jsmith,coolguy1,secretar,juanas,sasha1988,itout,00000001,tiger11,1butthea,putain,cavalo,basia1,kobebryant,1232323,12345asdfg,sunsh1ne,cyfqgth,tomkat,dorota,dashit,pelmen,5t6y7u,whipit,smokeone,helloall,bonjour1,snowshoe,nilknarf,x1x2x3,lammas,1234599,lol123456,atombomb,ironchef,noclue,alekseev,gwbush1,silver2,12345678m,yesican,fahjlbnf,chapstic,alex95,open1,tiger200,lisichka,pogiako,cbr929,searchin,tanya123,alex1973,phil413,alex1991,dominati,geckos,freddi,silenthill,egroeg,vorobey,antoxa,dark666,shkola,apple22,rebellio,shamanking,7f8srt,cumsucker,partagas,bill99,22223333,arnster55,fucknuts,proxima,silversi,goblues,parcells,vfrcbvjdf,piloto,avocet,emily2,1597530,miniskir,himitsu,pepper2,juiceman,venom1,bogdana,jujube,quatro,botafogo,mama2010,junior12,derrickh,asdfrewq,miller2,chitarra,silverfox,napol,prestigio,devil123,mm111qm,ara123,max33484,sex2000,primo1,sephan,anyuta,alena2010,viborg,verysexy,hibiscus,terps,josefin,oxcart,spooker,speciali,raffaello,partyon,vfhvtkflrf,strela,a123456z,worksuck,glasss,lomonosov,dusty123,dukeblue,1winter,sergeeva,lala123,john22,cmc09,sobolev,bettylou,dannyb,gjkrjdybr,hagakure,iecnhbr,awsedr,pmdmsctsk,costco,alekseeva,fktrcttd,bazuka,flyingv,garuda,buffy16,gutierre,beer12,stomatolog,ernies,palmeiras,golf123,love269,n.kmgfy,gjkysqgbpltw,youare,joeboo,baksik,lifeguar,111a111,nascar8,mindgame,dude1,neopets,frdfkfyu,june24,phoenix8,penelopa,merlin99,mercenar,badluck,mishel,bookert,deadsexy,power9,chinchil,1234567m,alex10,skunk1,rfhkcjy,sammycat,wright1,randy2,marakesh,temppassword,elmer251,mooki,patrick0,bonoedge,1tits,chiar,kylie1,graffix,milkman1,cornel,mrkitty,nicole12,ticketmaster,beatles4,number20,ffff1,terps1,superfre,yfdbufnjh,jake1234,flblfc,1111qq,zanuda,jmol01,wpoolejr,polopol,nicolett,omega13,cannonba,123456789.,sandy69,ribeye,bo243ns,marilena,bogdan123,milla,redskins1,19733791,alias1,movie1,ducat,marzena,shadowru,56565,coolman1,pornlover,teepee,spiff,nafanya,gateway3,fuckyou0,hasher,34778,booboo69,staticx,hang10,qq12345,garnier,bosco123,1234567qw,carson1,samso,1xrg4kcq,cbr929rr,allan123,motorbik,andrew22,pussy101,miroslava,cytujdbr,camp0017,cobweb,snusmumrik,salmon1,cindy2,aliya,serendipity,co437at,tincouch,timmy123,hunter22,st1100,vvvvvv1,blanka,krondor,sweeti,nenit,kuzmich,gustavo1,bmw320i,alex2010,trees1,kyliem,essayons,april26,kumari,sprin,fajita,appletre,fghbjhb,1green,katieb,steven2,corrado1,satelite,1michell,123456789c,cfkfvfylhf,acurarsx,slut543,inhere,bob2000,pouncer,k123456789,fishie,aliso,audia8,bluetick,soccer69,jordan99,fromhell,mammoth1,fighting54,mike25,pepper11,extra1,worldwid,chaise,vfr800,sordfish,almat,nofate,listopad,hellgate,dctvghbdf,jeremia,qantas,lokiju,honker,sprint1,maral,triniti,compaq3,sixsix6,married1,loveman,juggalo1,repvtyrj,zxcasdqw,123445,whore1,123678,monkey6,west123,warcraf,pwnage,mystery1,creamyou,ant123,rehjgfnrf,corona1,coleman1,steve121,alderaan,barnaul,celeste1,junebug1,bombshel,gretzky9,tankist,targa,cachou,vaz2101,playgolf,boneyard,strateg,romawka,iforgotit,pullup,garbage1,irock,archmage,shaft1,oceano,sadies,alvin1,135135ab,psalm69,lmfao,ranger02,zaharova,33334444,perkman,realman,salguod,cmoney,astonmartin,glock1,greyfox,viper99,helpm,blackdick,46775575,family5,shazbot,dewey1,qwertyas,shivani,black22,mailman1,greenday1,57392632,red007,stanky,sanchez1,tysons,daruma,altosax,krayzie,85852008,1forever,98798798,irock.,123456654,142536789,ford22,brick1,michela,preciou,crazy4u,01telemike01,nolife,concac,safety1,annie123,brunswic,destini,123456qwer,madison0,snowball1,137946,1133557799,jarule,scout2,songohan,thedead,00009999,murphy01,spycam,hirsute,aurinko,associat,1miller,baklan,hermes1,2183rm,martie,kangoo,shweta,yvonne1,westsid,jackpot1,rotciv,maratik,fabrika,claude1,nursultan,noentry,ytnhjufnm,electra1,ghjcnjnfr1,puneet,smokey01,integrit,bugeye,trouble2,14071789,paul01,omgwtf,dmh415,ekilpool,yourmom1,moimeme,sparky11,boludo,ruslan123,kissme1,demetrio,appelsin,asshole3,raiders2,bunns,fynjybj,billygoa,p030710p$e4o,macdonal,248ujnfk,acorns,schmidt1,sparrow1,vinbylrj,weasle,jerom,ycwvrxxh,skywalk,gerlinde,solidus,postal1,poochie1,1charles,rhianna,terorist,rehnrf,omgwtfbbq,assfucke,deadend,zidan,jimboy,vengence,maroon5,7452tr,dalejr88,sombra,anatole,elodi,amazonas,147789,q12345q,gawker1,juanma,kassidy,greek1,bruces,bilbob,mike44,0o9i8u7y6t,kaligula,agentx,familie,anders1,pimpjuice,0128um,birthday10,lawncare,hownow,grandorgue,juggerna,scarfac,kensai,swatteam,123four,motorbike,repytxbr,other1,celicagt,pleomax,gen0303,godisgreat,icepick,lucifer666,heavy1,tea4two,forsure,02020,shortdog,webhead,chris13,palenque,3techsrl,knights1,orenburg,prong,nomarg,wutang1,80637852730,laika,iamfree,12345670,pillow1,12343412,bigears,peterg,stunna,rocky5,12123434,damir,feuerwehr,7418529630,danone,yanina,valenci,andy69,111222q,silvia1,1jjjjj,loveforever,passwo1,stratocaster,8928190a,motorolla,lateralu,ujujkm,chubba,ujkjdf,signon,123456789zx,serdce,stevo,wifey200,ololo123,popeye1,1pass,central1,melena,luxor,nemezida,poker123,ilovemusic,qaz1234,noodles1,lakeshow,amarill,ginseng,billiam,trento,321cba,fatback,soccer33,master13,marie2,newcar,bigtop,dark1,camron,nosgoth,155555,biglou,redbud,jordan7,159789,diversio,actros,dazed,drizzit,hjcnjd,wiktoria,justic,gooses,luzifer,darren1,chynna,tanuki,11335577,icculus,boobss,biggi,firstson,ceisi123,gatewa,hrothgar,jarhead1,happyjoy,felipe1,bebop1,medman,athena1,boneman,keiths,djljgfl,dicklick,russ120,mylady,zxcdsa,rock12,bluesea,kayaks,provista,luckies,smile4me,bootycal,enduro,123123f,heartbre,ern3sto,apple13,bigpappa,fy.njxrf,bigtom,cool69,perrito,quiet1,puszek,cious,cruella,temp1,david26,alemap,aa123123,teddies,tricolor,smokey12,kikiriki,mickey01,robert01,super5,ranman,stevenso,deliciou,money777,degauss,mozar,susanne1,asdasd12,shitbag,mommy123,wrestle1,imfree,fuckyou12,barbaris,florent,ujhijr,f8yruxoj,tefjps,anemone,toltec,2gether,left4dead2,ximen,gfkmvf,dunca,emilys,diana123,16473a,mark01,bigbro,annarbor,nikita2000,11aa11,tigres,llllll1,loser2,fbi11213,jupite,qwaszxqw,macabre,123ert,rev2000,mooooo,klapaucius,bagel1,chiquit,iyaoyas,bear101,irocz28,vfktymrfz,smokey2,love99,rfhnbyf,dracul,keith123,slicko,peacock1,orgasmic,thesnake,solder,wetass,doofer,david5,rhfcyjlfh,swanny,tammys,turkiye,tubaman,estefani,firehose,funnyguy,servo,grace17,pippa1,arbiter,jimmy69,nfymrf,asdf67nm,rjcnzy,demon123,thicknes,sexysex,kristall,michail,encarta,banderos,minty,marchenko,de1987ma,mo5kva,aircav,naomi1,bonni,tatoo,cronaldo,49ers1,mama1963,1truck,telecaster,punksnotdead,erotik,1eagles,1fender,luv269,acdeehan,tanner1,freema,1q3e5t7u,linksys,tiger6,megaman1,neophyte,australia1,mydaddy,1jeffrey,fgdfgdfg,gfgekz,1986irachka,keyman,m0b1l3,dfcz123,mikeyg,playstation2,abc125,slacker1,110491g,lordsoth,bhavani,ssecca,dctvghbdtn,niblick,hondacar,baby01,worldcom,4034407,51094didi,3657549,3630000,3578951,sweetpussy,majick,supercoo,robert11,abacabb,panda123,gfhjkm13,ford4x4,zippo1,lapin,1726354,lovesong,dude11,moebius,paravoz,1357642,matkhau,solnyshko,daniel4,multiplelog,starik,martusia,iamtheman,greentre,jetblue,motorrad,vfrcbvev,redoak,dogma1,gnorman,komlos,tonka1,1010220,666satan,losenord,lateralus,absinthe,command1,jigga1,iiiiiii1,pants1,jungfrau,926337,ufhhbgjnnth,yamakasi,888555,sunny7,gemini69,alone1,zxcvbnmz,cabezon,skyblues,zxc1234,456123a,zero00,caseih,azzurra,legolas1,menudo,murcielago,785612,779977,benidorm,viperman,dima1985,piglet1,hemligt,hotfeet,7elephants,hardup,gamess,a000000,267ksyjf,kaitlynn,sharkie,sisyphus,yellow22,667766,redvette,666420,mets69,ac2zxdty,hxxrvwcy,cdavis,alan1,noddy,579300,druss,eatshit1,555123,appleseed,simpleplan,kazak,526282,fynfyfyfhbde,birthday6,dragon6,1pookie,bluedevils,omg123,hj8z6e,x5dxwp,455445,batman23,termin,chrisbrown,animals1,lucky9,443322,kzktxrf,takayuki,fermer,assembler,zomu9q,sissyboy,sergant,felina,nokia6230i,eminem12,croco,hunt4red,festina,darknigh,cptnz062,ndshnx4s,twizzler,wnmaz7sd,aamaax,gfhfcjkmrf,alabama123,barrynov,happy5,punt0it,durandal,8xuuobe4,cmu9ggzh,bruno12,316497,crazyfrog,vfvfktyf,apple3,kasey1,mackdaddy,anthon1,sunnys,angel3,cribbage,moon1,donal,bryce1,pandabear,mwss474,whitesta,freaker,197100,bitche,p2ssw0rd,turnb,tiktonik,moonlite,ferret1,jackas,ferrum,bearclaw,liberty2,1diablo,caribe,snakeeyes,janbam,azonic,rainmaker,vetalik,bigeasy,baby1234,sureno13,blink1,kluivert,calbears,lavanda,198600,dhtlbyf,medvedeva,fox123,whirling,bonscott,freedom9,october3,manoman,segredo,cerulean,robinso,bsmith,flatus,dannon,password21,rrrrrr1,callista,romai,rainman1,trantor,mickeymo,bulldog7,g123456,pavlin,pass22,snowie,hookah,7ofnine,bubba22,cabible,nicerack,moomoo1,summer98,yoyo123,milan1,lieve27,mustang69,jackster,exocet,nadege,qaz12,bahama,watson1,libras,eclipse2,bahram,bapezm,up9x8rww,ghjcnjz,themaste,deflep27,ghost16,gattaca,fotograf,junior123,gilber,gbjyth,8vjzus,rosco1,begonia,aldebara,flower12,novastar,buzzman,manchild,lopez1,mama11,william7,yfcnz1,blackstar,spurs123,moom4242,1amber,iownyou,tightend,07931505,paquito,1johnson,smokepot,pi31415,snowmass,ayacdc,jessicam,giuliana,5tgbnhy6,harlee,giuli,bigwig,tentacle,scoubidou2,benelli,vasilina,nimda,284655,jaihind,lero4ka,1tommy,reggi,ididit,jlbyjxtcndj,mike26,qbert,wweraw,lukasz,loosee123,palantir,flint1,mapper,baldie,saturne,virgin1,meeeee,elkcit,iloveme2,blue15,themoon,radmir,number3,shyanne,missle,hannelor,jasmina,karin1,lewie622,ghjcnjqgfhjkm,blasters,oiseau,sheela,grinders,panget,rapido,positiv,twink,fltkbyf,kzsfj874,daniel01,enjoyit,nofags,doodad,rustler,squealer,fortunat,peace123,khushi,devils2,7inches,candlebo,topdawg,armen,soundman,zxcqweasd,april7,gazeta,netman,hoppers,bear99,ghbjhbntn,mantle7,bigbo,harpo,jgordon,bullshi,vinny1,krishn,star22,thunderc,galinka,phish123,tintable,nightcrawler,tigerboy,rbhgbx,messi,basilisk,masha1998,nina123,yomamma,kayla123,geemoney,0000000000d,motoman,a3jtni,ser123,owen10,italien,vintelok,12345rewq,nightime,jeepin,ch1tt1ck,mxyzptlk,bandido,ohboy,doctorj,hussar,superted,parfilev,grundle,1jack,livestrong,chrisj,matthew3,access22,moikka,fatone,miguelit,trivium,glenn1,smooches,heiko,dezember,spaghett,stason,molokai,bossdog,guitarma,waderh,boriska,photosho,path13,hfrtnf,audre,junior24,monkey24,silke,vaz21093,bigblue1,trident1,candide,arcanum,klinker,orange99,bengals1,rosebu,mjujuj,nallepuh,mtwapa1a,ranger69,level1,bissjop,leica,1tiffany,rutabega,elvis77,kellie1,sameas,barada,karabas,frank12,queenb,toutoune,surfcity,samanth1,monitor1,littledo,kazakova,fodase,mistral1,april22,carlit,shakal,batman123,fuckoff2,alpha01,5544332211,buddy3,towtruck,kenwood1,vfiekmrf,jkl123,pypsik,ranger75,sitges,toyman,bartek1,ladygirl,booman,boeing77,installsqlst,222666,gosling,bigmack,223311,bogos,kevin2,gomez1,xohzi3g4,kfnju842,klubnika,cubalibr,123456789101,kenpo,0147852369,raptor1,tallulah,boobys,jjones,1q2s3c,moogie,vid2600,almas,wombat1,extra300,xfiles1,green77,sexsex1,heyjude,sammyy,missy123,maiyeuem,nccpl25282,thicluv,sissie,raven3,fldjrfn,buster22,broncos2,laurab,letmein4,harrydog,solovey,fishlips,asdf4321,ford123,superjet,norwegen,movieman,psw333333,intoit,postbank,deepwate,ola123,geolog323,murphys,eshort,a3eilm2s2y,kimota,belous,saurus,123321qaz,i81b4u,aaa12,monkey20,buckwild,byabybnb,mapleleafs,yfcnzyfcnz,baby69,summer03,twista,246890,246824,ltcnhjth,z1z2z3,monika1,sad123,uto29321,bathory,villan,funkey,poptarts,spam967888,705499fh,sebast,porn1234,earn381,1porsche,whatthef,123456789y,polo12,brillo,soreilly,waters1,eudora,allochka,is_a_bot,winter00,bassplay,531879fiz,onemore,bjarne,red911,kot123,artur1,qazxdr,c0rvette,diamond7,matematica,klesko,beaver12,2enter,seashell,panam,chaching,edward2,browni,xenogear,cornfed,aniram,chicco22,darwin1,ancella2,sophie2,vika1998,anneli,shawn41,babie,resolute,pandora2,william8,twoone,coors1,jesusis1,teh012,cheerlea,renfield,tessa1,anna1986,madness1,bkmlfh,19719870,liebherr,ck6znp42,gary123,123654z,alsscan,eyedoc,matrix7,metalgea,chinito,4iter,falcon11,7jokx7b9du,bigfeet,tassadar,retnuh,muscle1,klimova,darion,batistuta,bigsur,1herbier,noonie,ghjrehjh,karimova,faustus,snowwhite,1manager,dasboot,michael12,analfuck,inbed,dwdrums,jaysoncj,maranell,bsheep75,164379,rolodex,166666,rrrrrrr1,almaz666,167943,russel1,negrito,alianz,goodpussy,veronik,1w2q3r4e,efremov,emb377,sdpass,william6,alanfahy,nastya1995,panther5,automag,123qwe12,vfvf2011,fishe,1peanut,speedie,qazwsx1234,pass999,171204j,ketamine,sheena1,energizer,usethis1,123abc123,buster21,thechamp,flvbhfk,frank69,chane,hopeful1,claybird,pander,anusha,bigmaxxx,faktor,housebed,dimidrol,bigball,shashi,derby1,fredy,dervish,bootycall,80988218126,killerb,cheese2,pariss,mymail,dell123,catbert,christa1,chevytru,gjgjdf,00998877,overdriv,ratten,golf01,nyyanks,dinamite,bloembol,gismo,magnus1,march2,twinkles,ryan22,duckey,118a105b,kitcat,brielle,poussin,lanzarot,youngone,ssvegeta,hero63,battle1,kiler,fktrcfylh1,newera,vika1996,dynomite,oooppp,beer4me,foodie,ljhjuf,sonshine,godess,doug1,constanc,thinkbig,steve2,damnyou,autogod,www333,kyle1,ranger7,roller1,harry2,dustin1,hopalong,tkachuk,b00bies,bill2,deep111,stuffit,fire69,redfish1,andrei123,graphix,1fishing,kimbo1,mlesp31,ifufkbyf,gurkan,44556,emily123,busman,and123,8546404,paladine,1world,bulgakov,4294967296,bball23,1wwwww,mycats,elain,delta6,36363,emilyb,color1,6060842,cdtnkfyrf,hedonism,gfgfrfhkj,5551298,scubad,gostate,sillyme,hdbiker,beardown,fishers,sektor,00000007,newbaby,rapid1,braves95,gator2,nigge,anthony3,sammmy,oou812,heffer,phishin,roxanne1,yourass,hornet1,albator,2521659,underwat,tanusha,dianas,3f3fpht7op,dragon20,bilbobag,cheroke,radiatio,dwarf1,majik,33st33,dochka,garibald,robinh,sham69,temp01,wakeboar,violet1,1w2w3w,registr,tonite,maranello,1593570,parolamea,galatasara,loranthos,1472583,asmodean,1362840,scylla,doneit,jokerr,porkypig,kungen,mercator,koolhaas,come2me,debbie69,calbear,liverpoolfc,yankees4,12344321a,kennyb,madma,85200258,dustin23,thomas13,tooling,mikasa,mistic,crfnbyf,112233445,sofia1,heinz57,colts1,price1,snowey,joakim,mark11,963147,cnhfcnm,kzinti,1bbbbbbb,rubberdu,donthate,rupert1,sasha1992,regis1,nbuhbwf,fanboy,sundial,sooner1,wayout,vjnjhjkf,deskpro,arkangel,willie12,mikeyb,celtic1888,luis1,buddy01,duane1,grandma1,aolcom,weeman,172839456,basshead,hornball,magnu,pagedown,molly2,131517,rfvtgbyhn,astonmar,mistery,madalina,cash1,1happy,shenlong,matrix01,nazarova,369874125,800500,webguy,rse2540,ashley2,briank,789551,786110,chunli,j0nathan,greshnik,courtne,suckmyco,mjollnir,789632147,asdfg1234,754321,odelay,ranma12,zebedee,artem777,bmw318is,butt1,rambler1,yankees9,alabam,5w76rnqp,rosies,mafioso,studio1,babyruth,tranzit,magical123,gfhjkm135,12345$,soboleva,709394,ubique,drizzt1,elmers,teamster,pokemons,1472583690,1597532486,shockers,merckx,melanie2,ttocs,clarisse,earth1,dennys,slobber,flagman,farfalla,troika,4fa82hyx,hakan,x4ww5qdr,cumsuck,leather1,forum1,july20,barbel,zodiak,samuel12,ford01,rushfan,bugsy1,invest1,tumadre,screwme,a666666,money5,henry8,tiddles,sailaway,starburs,100years,killer01,comando,hiromi,ranetka,thordog,blackhole,palmeira,verboten,solidsna,q1w1e1,humme,kevinc,gbrfxe,gevaudan,hannah11,peter2,vangar,sharky7,talktome,jesse123,chuchi,pammy,!qazxsw2,siesta,twenty1,wetwilly,477041,natural1,sun123,daniel3,intersta,shithead1,hellyea,bonethugs,solitair,bubbles2,father1,nick01,444000,adidas12,dripik,cameron2,442200,a7nz8546,respublika,fkojn6gb,428054,snoppy,rulez1,haslo,rachael1,purple01,zldej102,ab12cd34,cytuehjxrf,madhu,astroman,preteen,handsoff,mrblonde,biggio,testin,vfdhif,twolves,unclesam,asmara,kpydskcw,lg2wmgvr,grolsch,biarritz,feather1,williamm,s62i93,bone1,penske,337733,336633,taurus1,334433,billet,diamondd,333000,nukem,fishhook,godogs,thehun,lena1982,blue00,smelly1,unb4g9ty,65pjv22,applegat,mikehunt,giancarlo,krillin,felix123,december1,soapy,46doris,nicole23,bigsexy1,justin10,pingu,bambou,falcon12,dgthtl,1surfer,qwerty01,estrellit,nfqcjy,easygo,konica,qazqwe,1234567890m,stingers,nonrev,3e4r5t,champio,bbbbbb99,196400,allen123,seppel,simba2,rockme,zebra3,tekken3,endgame,sandy2,197300,fitte,monkey00,eldritch,littleone,rfyfgkz,1member,66chevy,oohrah,cormac,hpmrbm41,197600,grayfox,elvis69,celebrit,maxwell7,rodders,krist,1camaro,broken1,kendall1,silkcut,katenka,angrick,maruni,17071994a,tktyf,kruemel,snuffles,iro4ka,baby12,alexis01,marryme,vlad1994,forward1,culero,badaboom,malvin,hardtoon,hatelove,molley,knopo4ka,duchess1,mensuck,cba321,kickbutt,zastava,wayner,fuckyou6,eddie123,cjkysir,john33,dragonfi,cody1,jabell,cjhjrf,badseed,sweden1,marihuana,brownlov,elland,nike1234,kwiettie,jonnyboy,togepi,billyk,robert123,bb334,florenci,ssgoku,198910,bristol1,bob007,allister,yjdujhjl,gauloise,198920,bellaboo,9lives,aguilas,wltfg4ta,foxyroxy,rocket69,fifty50,babalu,master21,malinois,kaluga,gogosox,obsessio,yeahrigh,panthers1,capstan,liza2000,leigh1,paintball1,blueskie,cbr600f3,bagdad,jose98,mandreki,shark01,wonderbo,muledeer,xsvnd4b2,hangten,200001,grenden,anaell,apa195,model1,245lufpq,zip100,ghjcgtrn,wert1234,misty2,charro,juanjose,fkbcrf,frostbit,badminto,buddyy,1doctor,vanya,archibal,parviz,spunky1,footboy,dm6tzsgp,legola,samadhi,poopee,ytdxz2ca,hallowboy,dposton,gautie,theworm,guilherme,dopehead,iluvtits,bobbob1,ranger6,worldwar,lowkey,chewbaca,oooooo99,ducttape,dedalus,celular,8i9o0p,borisenko,taylor01,111111z,arlingto,p3nnywiz,rdgpl3ds,boobless,kcmfwesg,blacksab,mother2,markus1,leachim,secret2,s123456789,1derful,espero,russell2,tazzer,marykate,freakme,mollyb,lindros8,james00,gofaster,stokrotka,kilbosik,aquamann,pawel1,shedevil,mousie,slot2009,october6,146969,mm259up,brewcrew,choucho,uliana,sexfiend,fktirf,pantss,vladimi,starz,sheeps,12341234q,bigun,tiggers,crjhjcnm,libtech,pudge1,home12,zircon,klaus1,jerry2,pink1,lingus,monkey66,dumass,polopolo09,feuerweh,rjyatnf,chessy,beefer,shamen,poohbear1,4jjcho,bennevis,fatgirls,ujnbrf,cdexswzaq,9noize9,rich123,nomoney,racecar1,hacke,clahay,acuario,getsum,hondacrv,william0,cheyenn,techdeck,atljhjdf,wtcacq,suger,fallenangel,bammer,tranquil,carla123,relayer,lespaul1,portvale,idontno,bycnbnen,trooper2,gennadiy,pompon,billbob,amazonka,akitas,chinatow,atkbrc,busters,fitness1,cateye,selfok2013,1murphy,fullhous,mucker,bajskorv,nectarin,littlebitch,love24,feyenoor,bigal37,lambo1,pussybitch,icecube1,biged,kyocera,ltybcjdf,boodle,theking1,gotrice,sunset1,abm1224,fromme,sexsells,inheat,kenya1,swinger1,aphrodit,kurtcobain,rhind101,poidog,poiulkjh,kuzmina,beantown,tony88,stuttgar,drumer,joaqui,messenge,motorman,amber2,nicegirl,rachel69,andreia,faith123,studmuffin,jaiden,red111,vtkmybr,gamecocks,gumper,bosshogg,4me2know,tokyo1,kleaner,roadhog,fuckmeno,phoenix3,seeme,buttnutt,boner69,andreyka,myheart,katerin,rugburn,jvtuepip,dc3ubn,chile1,ashley69,happy99,swissair,balls2,fylhttdf,jimboo,55555d,mickey11,voronin,m7hsqstm,stufff,merete,weihnachte,dowjones,baloo1,freeones,bears34,auburn1,beverl,timberland,1elvis,guinness1,bombadil,flatron1,logging7,telefoon,merl1n,masha1,andrei1,cowabung,yousuck1,1matrix,peopl,asd123qwe,sweett,mirror1,torrente,joker12,diamond6,jackaroo,00000a,millerlite,ironhorse,2twins,stryke,gggg1,zzzxxxccc,roosevel,8363eddy,angel21,depeche1,d0ct0r,blue14,areyou,veloce,grendal,frederiksberg,cbcntvf,cb207sl,sasha2000,was.here,fritzz,rosedale,spinoza,cokeisit,gandalf3,skidmark,ashley01,12345j,1234567890qaz,sexxxxxx,beagles,lennart,12345789,pass10,politic,max007,gcheckou,12345611,tiffy,lightman,mushin,velosiped,brucewayne,gauthie,elena123,greenegg,h2oski,clocker,nitemare,123321s,megiddo,cassidy1,david13,boywonde,flori,peggy12,pgszt6md,batterie,redlands,scooter6,bckhere,trueno,bailey11,maxwell2,bandana,timoth1,startnow,ducati74,tiern,maxine1,blackmetal,suzyq,balla007,phatfarm,kirsten1,titmouse,benhogan,culito,forbin,chess1,warren1,panman,mickey7,24lover,dascha,speed2,redlion,andrew10,johnwayn,nike23,chacha1,bendog,bullyboy,goldtree,spookie,tigger99,1cookie,poutine,cyclone1,woodpony,camaleun,bluesky1,dfadan,eagles20,lovergirl,peepshow,mine1,dima1989,rjdfkmxer,11111aaaaa,machina,august17,1hhhhh,0773417k,1monster,freaksho,jazzmin,davidw,kurupt,chumly,huggies,sashenka,ccccccc1,bridge1,giggalo,cincinna,pistol1,hello22,david77,lightfoo,lucky6,jimmy12,261397,lisa12,tabaluga,mysite,belo4ka,greenn,eagle99,punkrawk,salvado,slick123,wichsen,knight99,dummys,fefolico,contrera,kalle1,anna1984,delray,robert99,garena,pretende,racefan,alons,serenada,ludmilla,cnhtkjr,l0swf9gx,hankster,dfktynbyrf,sheep1,john23,cv141ab,kalyani,944turbo,crystal2,blackfly,zrjdktdf,eus1sue1,mario5,riverplate,harddriv,melissa3,elliott1,sexybitc,cnhfyybr,jimdavis,bollix,beta1,amberlee,skywalk1,natala,1blood,brattax,shitty1,gb15kv99,ronjon,rothmans,thedoc,joey21,hotboi,firedawg,bimbo38,jibber,aftermat,nomar,01478963,phishing,domodo,anna13,materia,martha1,budman1,gunblade,exclusiv,sasha1997,anastas,rebecca2,fackyou,kallisti,fuckmyass,norseman,ipswich1,151500,1edward,intelinside,darcy1,bcrich,yjdjcnbf,failte,buzzzz,cream1,tatiana1,7eleven,green8,153351,1a2s3d4f5g6h,154263,milano1,bambi1,bruins77,rugby2,jamal1,bolita,sundaypunch,bubba12,realmadr,vfyxtcnth,iwojima,notlob,black666,valkiria,nexus1,millerti,birthday100,swiss1,appollo,gefest,greeneyes,celebrat,tigerr,slava123,izumrud,bubbabub,legoman,joesmith,katya123,sweetdream,john44,wwwwwww1,oooooo1,socal,lovespor,s5r8ed67s,258147,heidis,cowboy22,wachovia,michaelb,qwe1234567,i12345,255225,goldie1,alfa155,45colt,safeu851,antonova,longtong,1sparky,gfvznm,busen,hjlbjy,whateva,rocky4,cokeman,joshua3,kekskek1,sirocco,jagman,123456qwert,phinupi,thomas10,loller,sakur,vika2011,fullred,mariska,azucar,ncstate,glenn74,halima,aleshka,ilovemylife,verlaat,baggie,scoubidou6,phatboy,jbruton,scoop1,barney11,blindman,def456,maximus2,master55,nestea,11223355,diego123,sexpistols,sniffy,philip1,f12345,prisonbreak,nokia2700,ajnjuhfa,yankees3,colfax,ak470000,mtnman,bdfyeirf,fotball,ichbin,trebla,ilusha,riobravo,beaner1,thoradin,polkaudi,kurosawa,honda123,ladybu,valerik,poltava,saviola,fuckyouguys,754740g0,anallove,microlab1,juris01,ncc1864,garfild,shania1,qagsud,makarenko,cindy69,lebedev,andrew11,johnnybo,groovy1,booster1,sanders1,tommyb,johnson4,kd189nlcih,hondaman,vlasova,chick1,sokada,sevisgur,bear2327,chacho,sexmania,roma1993,hjcnbckfd,valley1,howdie,tuppence,jimandanne,strike3,y4kuz4,nhfnfnf,tsubasa,19955991,scabby,quincunx,dima1998,uuuuuu1,logica,skinner1,pinguino,lisa1234,xpressmusic,getfucked,qqqq1,bbbb1,matulino,ulyana,upsman,johnsmith,123579,co2000,spanner1,todiefor,mangoes,isabel1,123852,negra,snowdon,nikki123,bronx1,booom,ram2500,chuck123,fireboy,creek1,batman13,princesse,az12345,maksat,1knight,28infern,241455,r7112s,muselman,mets1986,katydid,vlad777,playme,kmfdm1,asssex,1prince,iop890,bigbroth,mollymoo,waitron,lizottes,125412,juggler,quinta,0sister0,zanardi,nata123,heckfyxbr,22q04w90e,engine2,nikita95,zamira,hammer22,lutscher,carolina1,zz6319,sanman,vfuflfy,buster99,rossco,kourniko,aggarwal,tattoo1,janice1,finger1,125521,19911992,shdwlnds,rudenko,vfvfgfgf123,galatea,monkeybu,juhani,premiumcash,classact,devilmay,helpme2,knuddel,hardpack,ramil,perrit,basil1,zombie13,stockcar,tos8217,honeypie,nowayman,alphadog,melon1,talula,125689,tiribon12,tornike,haribol,telefone,tiger22,sucka,lfytxrf,chicken123,muggins,a23456,b1234567,lytdybr,otter1,pippa,vasilisk,cooking1,helter,78978,bestboy,viper7,ahmed1,whitewol,mommys,apple5,shazam1,chelsea7,kumiko,masterma,rallye,bushmast,jkz123,entrar,andrew6,nathan01,alaric,tavasz,heimdall,gravy1,jimmy99,cthlwt,powerr,gthtrhtcnjr,canesfan,sasha11,ybrbnf_25,august9,brucie,artichok,arnie1,superdude,tarelka,mickey22,dooper,luners,holeshot,good123,gettysbu,bicho,hammer99,divine5,1zxcvbn,stronzo,q22222,disne,bmw750il,godhead,hallodu,aerith,nastik,differen,cestmoi,amber69,5string,pornosta,dirtygirl,ginger123,formel1,scott12,honda200,hotspurs,johnatha,firstone123,lexmark1,msconfig,karlmasc,l123456,123qweasdzx,baldman,sungod,furka,retsub,9811020,ryder1,tcglyued,astron,lbvfcbr,minddoc,dirt49,baseball12,tbear,simpl,schuey,artimus,bikman,plat1num,quantex,gotyou,hailey1,justin01,ellada,8481068,000002,manimal,dthjybxrf,buck123,dick123,6969696,nospam,strong1,kodeord,bama12,123321w,superman123,gladiolus,nintend,5792076,dreamgirl,spankme1,gautam,arianna1,titti,tetas,cool1234,belladog,importan,4206969,87e5nclizry,teufelo7,doller,yfl.irf,quaresma,3440172,melis,bradle,nnmaster,fast1,iverso,blargh,lucas12,chrisg,iamsam,123321az,tomjerry,kawika,2597174,standrew,billyg,muskan,gizmodo2,rz93qpmq,870621345,sathya,qmezrxg4,januari,marthe,moom4261,cum2me,hkger286,lou1988,suckit1,croaker,klaudia1,753951456,aidan1,fsunoles,romanenko,abbydog,isthebes,akshay,corgi,fuck666,walkman555,ranger98,scorpian,hardwareid,bluedragon,fastman,2305822q,iddqdiddqd,1597532,gopokes,zvfrfcb,w1234567,sputnik1,tr1993,pa$$w0rd,2i5fdruv,havvoc,1357913,1313131,bnm123,cowd00d,flexscan,thesims2,boogiema,bigsexxy,powerstr,ngc4565,joshman,babyboy1,123jlb,funfunfu,qwe456,honor1,puttana,bobbyj,daniel21,pussy12,shmuck,1232580,123578951,maxthedo,hithere1,bond0007,gehenna,nomames,blueone,r1234567,bwana,gatinho,1011111,torrents,cinta,123451234,tiger25,money69,edibey,pointman,mmcm19,wales1,caffreys,phaedra,bloodlus,321ret32,rufuss,tarbit,joanna1,102030405,stickboy,lotrfotr34,jamshid,mclarenf1,ataman,99ford,yarrak,logan2,ironlung,pushistik,dragoon1,unclebob,tigereye,pinokio,tylerj,mermaid1,stevie1,jaylen,888777,ramana,roman777,brandon7,17711771s,thiago,luigi1,edgar1,brucey,videogam,classi,birder,faramir,twiddle,cubalibre,grizzy,fucky,jjvwd4,august15,idinahui,ranita,nikita1998,123342,w1w2w3,78621323,4cancel,789963,(null,vassago,jaydog472,123452,timt42,canada99,123589,rebenok,htyfnf,785001,osipov,maks123,neverwinter,love2010,777222,67390436,eleanor1,bykemo,aquemini,frogg,roboto,thorny,shipmate,logcabin,66005918,nokian,gonzos,louisian,1abcdefg,triathlo,ilovemar,couger,letmeino,supera,runvs,fibonacci,muttly,58565254,5thgbqi,vfnehsv,electr,jose12,artemis1,newlove,thd1shr,hawkey,grigoryan,saisha,tosca,redder,lifesux,temple1,bunnyman,thekids,sabbeth,tarzan1,182838,158uefas,dell50,1super,666222,47ds8x,jackhamm,mineonly,rfnfhbyf,048ro,665259,kristina1,bombero,52545856,secure1,bigloser,peterk,alex2,51525354,anarchy1,superx,teenslut,money23,sigmapi,sanfrancisco,acme34,private5,eclips,qwerttrewq,axelle,kokain,hardguy,peter69,jesuschr,dyanna,dude69,sarah69,toyota91,amberr,45645645,bugmenot,bigted,44556677,556644,wwr8x9pu,alphaome,harley13,kolia123,wejrpfpu,revelati,nairda,sodoff,cityboy,pinkpussy,dkalis,miami305,wow12345,triplet,tannenbau,asdfasdf1,darkhors,527952,retired1,soxfan,nfyz123,37583867,goddes,515069,gxlmxbewym,1warrior,36925814,dmb2011,topten,karpova,89876065093rax,naturals,gateway9,cepseoun,turbot,493949,cock22,italia1,sasafras,gopnik,stalke,1qazxdr5,wm2006,ace1062,alieva,blue28,aracel,sandia,motoguzz,terri1,emmajane,conej,recoba,alex1995,jerkyboy,cowboy12,arenrone,precisio,31415927,scsa316,panzer1,studly1,powerhou,bensam,mashoutq,billee,eeyore1,reape,thebeatl,rul3z,montesa,doodle1,cvzefh1gk,424365,a159753,zimmerma,gumdrop,ashaman,grimreap,icandoit,borodina,branca,dima2009,keywest1,vaders,bubluk,diavolo,assss,goleta,eatass,napster1,382436,369741,5411pimo,lenchik,pikach,gilgamesh,kalimera,singer1,gordon2,rjycnbnewbz,maulwurf,joker13,2much4u,bond00,alice123,robotec,fuckgirl,zgjybz,redhorse,margaret1,brady1,pumpkin2,chinky,fourplay,1booger,roisin,1brandon,sandan,blackheart,cheez,blackfin,cntgfyjdf,mymoney1,09080706,goodboss,sebring1,rose1,kensingt,bigboner,marcus12,ym3cautj,struppi,thestone,lovebugs,stater,silver99,forest99,qazwsx12345,vasile,longboar,mkonji,huligan,rhfcbdfz,airmail,porn11,1ooooo,sofun,snake2,msouthwa,dougla,1iceman,shahrukh,sharona,dragon666,france98,196800,196820,ps253535,zjses9evpa,sniper01,design1,konfeta,jack99,drum66,good4you,station2,brucew,regedit,school12,mvtnr765,pub113,fantas,tiburon1,king99,ghjcnjgbpltw,checkito,308win,1ladybug,corneliu,svetasveta,197430,icicle,imaccess,ou81269,jjjdsl,brandon6,bimbo1,smokee,piccolo1,3611jcmg,children2,cookie2,conor1,darth1,margera,aoi856,paully,ou812345,sklave,eklhigcz,30624700,amazing1,wahooo,seau55,1beer,apples2,chulo,dolphin9,heather6,198206,198207,hergood,miracle1,njhyflj,4real,milka,silverfi,fabfive,spring12,ermine,mammy,jumpjet,adilbek,toscana,caustic,hotlove,sammy69,lolita1,byoung,whipme,barney01,mistys,tree1,buster3,kaylin,gfccgjhn,132333,aishiteru,pangaea,fathead1,smurph,198701,ryslan,gasto,xexeylhf,anisimov,chevyss,saskatoo,brandy12,tweaker,irish123,music2,denny1,palpatin,outlaw1,lovesuck,woman1,mrpibb,diadora,hfnfneq,poulette,harlock,mclaren1,cooper12,newpass3,bobby12,rfgecnfcerf,alskdjfh,mini14,dukers,raffael,199103,cleo123,1234567qwertyu,mossberg,scoopy,dctulf,starline,hjvjxrf,misfits1,rangers2,bilbos,blackhea,pappnase,atwork,purple2,daywalker,summoner,1jjjjjjj,swansong,chris10,laluna,12345qqq,charly1,lionsden,money99,silver33,hoghead,bdaddy,199430,saisg002,nosaints,tirpitz,1gggggg,jason13,kingss,ernest1,0cdh0v99ue,pkunzip,arowana,spiri,deskjet1,armine,lances,magic2,thetaxi,14159265,cacique,14142135,orange10,richard0,backdraf,255ooo,humtum,kohsamui,c43dae874d,wrestling1,cbhtym,sorento,megha,pepsiman,qweqwe12,bliss7,mario64,korolev,balls123,schlange,gordit,optiquest,fatdick,fish99,richy,nottoday,dianne1,armyof1,1234qwerasdfzxcv,bbonds,aekara,lidiya,baddog1,yellow5,funkie,ryan01,greentree,gcheckout,marshal1,liliput,000000z,rfhbyrf,gtogto43,rumpole,tarado,marcelit,aqwzsxedc,kenshin1,sassydog,system12,belly1,zilla,kissfan,tools1,desember,donsdad,nick11,scorpio6,poopoo1,toto99,steph123,dogfuck,rocket21,thx113,dude12,sanek,sommar,smacky,pimpsta,letmego,k1200rs,lytghjgtnhjdcr,abigale,buddog,deles,baseball9,roofus,carlsbad,hamzah,hereiam,genial,schoolgirlie,yfz450,breads,piesek,washear,chimay,apocalyp,nicole18,gfgf1234,gobulls,dnevnik,wonderwall,beer1234,1moose,beer69,maryann1,adpass,mike34,birdcage,hottuna,gigant,penquin,praveen,donna123,123lol123,thesame,fregat,adidas11,selrahc,pandoras,test3,chasmo,111222333000,pecos,daniel11,ingersol,shana1,mama12345,cessna15,myhero,1simpson,nazarenko,cognit,seattle2,irina1,azfpc310,rfycthdf,hardy1,jazmyn,sl1200,hotlanta,jason22,kumar123,sujatha,fsd9shtyu,highjump,changer,entertai,kolding,mrbig,sayuri,eagle21,qwertzu,jorge1,0101dd,bigdong,ou812a,sinatra1,htcnjhfy,oleg123,videoman,pbyfblf,tv612se,bigbird1,kenaidog,gunite,silverma,ardmore,123123qq,hotbot,cascada,cbr600f4,harakiri,chico123,boscos,aaron12,glasgow1,kmn5hc,lanfear,1light,liveoak,fizika,ybrjkftdyf,surfside,intermilan,multipas,redcard,72chevy,balata,coolio1,schroede,kanat,testerer,camion,kierra,hejmeddig,antonio2,tornados,isidor,pinkey,n8skfswa,ginny1,houndog,1bill,chris25,hastur,1marine,greatdan,french1,hatman,123qqq,z1z2z3z4,kicker1,katiedog,usopen,smith22,mrmagoo,1234512i,assa123,7seven7,monster7,june12,bpvtyf,149521,guenter,alex1985,voronina,mbkugegs,zaqwsxcderfv,rusty5,mystic1,master0,abcdef12,jndfkb,r4zpm3,cheesey,skripka,blackwhite,sharon69,dro8smwq,lektor,techman,boognish,deidara,heckfyf,quietkey,authcode,monkey4,jayboy,pinkerto,merengue,chulita,bushwick,turambar,kittykit,joseph2,dad123,kristo,pepote,scheiss,hambone1,bigballa,restaura,tequil,111luzer,euro2000,motox,denhaag,chelsi,flaco1,preeti,lillo,1001sin,passw,august24,beatoff,555555d,willis1,kissthis,qwertyz,rvgmw2gl,iloveboobies,timati,kimbo,msinfo,dewdrop,sdbaker,fcc5nky2,messiah1,catboy,small1,chode,beastie1,star77,hvidovre,short1,xavie,dagobah,alex1987,papageno,dakota2,toonami,fuerte,jesus33,lawina,souppp,dirtybir,chrish,naturist,channel1,peyote,flibble,gutentag,lactate,killem,zucchero,robinho,ditka,grumpy1,avr7000,boxxer,topcop,berry1,mypass1,beverly1,deuce1,9638527410,cthuttdf,kzkmrf,lovethem,band1t,cantona1,purple11,apples123,wonderwo,123a456,fuzzie,lucky99,dancer2,hoddling,rockcity,winner12,spooty,mansfiel,aimee1,287hf71h,rudiger,culebra,god123,agent86,daniel0,bunky1,notmine,9ball,goofus,puffy1,xyh28af4,kulikov,bankshot,vurdf5i2,kevinm,ercole,sexygirls,razvan,october7,goater,lollie,raissa,thefrog,mdmaiwa3,mascha,jesussaves,union1,anthony9,crossroa,brother2,areyuke,rodman91,toonsex,dopeman,gericom,vaz2115,cockgobbler,12356789,12345699,signatur,alexandra1,coolwhip,erwin1,awdrgyjilp,pens66,ghjrjgtyrj,linkinpark,emergenc,psych0,blood666,bootmort,wetworks,piroca,johnd,iamthe1,supermario,homer69,flameon,image1,bebert,fylhtq1,annapoli,apple11,hockey22,10048,indahouse,mykiss,1penguin,markp,misha123,foghat,march11,hank1,santorin,defcon4,tampico,vbnhjafy,robert22,bunkie,athlon64,sex777,nextdoor,koskesh,lolnoob,seemnemaailm,black23,march15,yeehaa,chiqui,teagan,siegheil,monday2,cornhusk,mamusia,chilis,sthgrtst,feldspar,scottm,pugdog,rfghjy,micmac,gtnhjdyf,terminato,1jackson,kakosja,bogomol,123321aa,rkbvtyrj,tresor,tigertig,fuckitall,vbkkbjy,caramon,zxc12,balin,dildo1,soccer09,avata,abby123,cheetah1,marquise,jennyc,hondavfr,tinti,anna1985,dennis2,jorel,mayflowe,icema,hal2000,nikkis,bigmouth,greenery,nurjan,leonov,liberty7,fafnir,larionov,sat321321,byteme1,nausicaa,hjvfynbrf,everto,zebra123,sergio1,titone,wisdom1,kahala,104328q,marcin1,salima,pcitra,1nnnnn,nalini,galvesto,neeraj,rick1,squeeky,agnes1,jitterbu,agshar,maria12,0112358,traxxas,stivone,prophet1,bananza,sommer1,canoneos,hotfun,redsox11,1bigmac,dctdjkjl,legion1,everclea,valenok,black9,danny001,roxie1,1theman,mudslide,july16,lechef,chula,glamis,emilka,canbeef,ioanna,cactus1,rockshox,im2cool,ninja9,thvfrjdf,june28,milo17,missyou,micky1,nbibyf,nokiaa,goldi,mattias,fuckthem,asdzxc123,ironfist,junior01,nesta,crazzy,killswit,hygge,zantac,kazama,melvin1,allston,maandag,hiccup,prototyp,specboot,dwl610,hello6,159456,baldhead,redwhite,calpoly,whitetail,agile1,cousteau,matt01,aust1n,malcolmx,gjlfhjr,semperf1,ferarri,a1b2c3d,vangelis,mkvdari,bettis36,andzia,comand,tazzman,morgaine,pepluv,anna1990,inandout,anetka,anna1997,wallpape,moonrake,huntress,hogtie,cameron7,sammy7,singe11,clownboy,newzeala,wilmar,safrane,rebeld,poopi,granat,hammertime,nermin,11251422,xyzzy1,bogeys,jkmxbr,fktrcfyl,11223311,nfyrbcn,11223300,powerpla,zoedog,ybrbnbyf,zaphod42,tarawa,jxfhjdfirf,dude1234,g5wks9,goobe,czekolada,blackros,amaranth,medical1,thereds,julija,nhecsyfujkjdt,promopas,buddy4,marmalad,weihnachten,tronic,letici,passthief,67mustan,ds7zamnw,morri,w8woord,cheops,pinarell,sonofsam,av473dv,sf161pn,5c92v5h6,purple13,tango123,plant1,1baby,xufrgemw,fitta,1rangers,spawns,kenned,taratata,19944991,11111118,coronas,4ebouux8,roadrash,corvette1,dfyjdf846,marley12,qwaszxerdfcv,68stang,67stang,racin,ellehcim,sofiko,nicetry,seabass1,jazzman1,zaqwsx1,laz2937,uuuuuuu1,vlad123,rafale,j1234567,223366,nnnnnn1,226622,junkfood,asilas,cer980,daddymac,persepho,neelam,00700,shithappens,255555,qwertyy,xbox36,19755791,qweasd1,bearcub,jerryb,a1b1c1,polkaudio,basketball1,456rty,1loveyou,marcus2,mama1961,palace1,transcend,shuriken,sudhakar,teenlove,anabelle,matrix99,pogoda,notme,bartend,jordana,nihaoma,ataris,littlegi,ferraris,redarmy,giallo,fastdraw,accountbloc,peludo,pornostar,pinoyako,cindee,glassjaw,dameon,johnnyd,finnland,saudade,losbravo,slonko,toplay,smalltit,nicksfun,stockhol,penpal,caraj,divedeep,cannibus,poppydog,pass88,viktory,walhalla,arisia,lucozade,goldenbo,tigers11,caball,ownage123,tonna,handy1,johny,capital5,faith2,stillher,brandan,pooky1,antananarivu,hotdick,1justin,lacrimos,goathead,bobrik,cgtwbfkbcn,maywood,kamilek,gbplf123,gulnar,beanhead,vfvjyn,shash,viper69,ttttttt1,hondacr,kanako,muffer,dukies,justin123,agapov58,mushka,bad11bad,muleman,jojo123,andreika,makeit,vanill,boomers,bigals,merlin11,quacker,aurelien,spartak1922,ligeti,diana2,lawnmowe,fortune1,awesom,rockyy,anna1994,oinker,love88,eastbay,ab55484,poker0,ozzy666,papasmurf,antihero,photogra,ktm250,painkill,jegr2d2,p3orion,canman,dextur,qwest123,samboy,yomismo,sierra01,herber,vfrcbvvfrcbv,gloria1,llama1,pie123,bobbyjoe,buzzkill,skidrow,grabber,phili,javier1,9379992q,geroin,oleg1994,sovereig,rollover,zaq12qaz,battery1,killer13,alina123,groucho1,mario12,peter22,butterbean,elise1,lucycat,neo123,ferdi,golfer01,randie,gfhfyjbr,ventura1,chelsea3,pinoy,mtgox,yrrim7,shoeman,mirko,ffggyyo,65mustan,ufdibyjd,john55,suckfuck,greatgoo,fvfnjhb,mmmnnn,love20,1bullshi,sucesso,easy1234,robin123,rockets1,diamondb,wolfee,nothing0,joker777,glasnost,richar1,guille,sayan,koresh,goshawk,alexx,batman21,a123456b,hball,243122,rockandr,coolfool,isaia,mary1,yjdbrjdf,lolopc,cleocat,cimbo,lovehina,8vfhnf,passking,bonapart,diamond2,bigboys,kreator,ctvtyjdf,sassy123,shellac,table54781,nedkelly,philbert,sux2bu,nomis,sparky99,python1,littlebear,numpty,silmaril,sweeet,jamesw,cbufhtnf,peggysue,wodahs,luvsex,wizardry,venom123,love4you,bama1,samat,reviewpass,ned467,cjkjdtq,mamula,gijoe,amersham,devochka,redhill,gisel,preggo,polock,cando,rewster,greenlantern,panasonik,dave1234,mikeee,1carlos,miledi,darkness1,p0o9i8u7y6,kathryn1,happyguy,dcp500,assmaster,sambuka,sailormo,antonio3,logans,18254288,nokiax2,qwertzuiop,zavilov,totti,xenon1,edward11,targa1,something1,tony_t,q1w2e3r4t5y6u7i8o9p0,02551670,vladimir1,monkeybutt,greenda,neel21,craiger,saveliy,dei008,honda450,fylhtq95,spike2,fjnq8915,passwordstandard,vova12345,talonesi,richi,gigemags,pierre1,westin,trevoga,dorothee,bastogne,25563o,brandon3,truegrit,krimml,iamgreat,servis,a112233,paulinka,azimuth,corperfmonsy,358hkyp,homerun1,dogbert1,eatmyass,cottage1,savina,baseball7,bigtex,gimmesum,asdcxz,lennon1,a159357,1bastard,413276191q,pngfilt,pchealth,netsnip,bodiroga,1matt,webtvs,ravers,adapters,siddis,mashamasha,coffee2,myhoney,anna1982,marcia1,fairchil,maniek,iloveluc,batmonh,wildon,bowie1,netnwlnk,fancy1,tom204,olga1976,vfif123,queens1,ajax01,lovess,mockba,icam4usb,triada,odinthor,rstlne,exciter,sundog,anchorat,girls69,nfnmzyrf,soloma,gti16v,shadowman,ottom,rataros,tonchin,vishal,chicken0,pornlo,christiaan,volante,likesit,mariupol,runfast,gbpltw123,missys,villevalo,kbpjxrf,ghibli,calla,cessna172,kinglear,dell11,swift1,walera,1cricket,pussy5,turbo911,tucke,maprchem56458,rosehill,thekiwi1,ygfxbkgt,mandarinka,98xa29,magnit,cjfrf,paswoord,grandam1,shenmue,leedsuni,hatrick,zagadka,angeldog,michaell,dance123,koichi,bballs,29palms,xanth,228822,ppppppp1,1kkkkk,1lllll,mynewbots,spurss,madmax1,224455,city1,mmmmmmm1,nnnnnnn1,biedronka,thebeatles,elessar,f14tomcat,jordan18,bobo123,ayi000,tedbear,86chevyx,user123,bobolink,maktub,elmer1,flyfishi,franco1,gandalf0,traxdata,david21,enlighte,dmitrij,beckys,1giants,flippe,12345678w,jossie,rugbyman,snowcat,rapeme,peanut11,gemeni,udders,techn9ne,armani1,chappie,war123,vakantie,maddawg,sewanee,jake5253,tautt1,anthony5,letterma,jimbo2,kmdtyjr,hextall,jessica6,amiga500,hotcunt,phoenix9,veronda,saqartvelo,scubas,sixer3,williamj,nightfal,shihan,melnikova,kosssss,handily,killer77,jhrl0821,march17,rushman,6gcf636i,metoyou,irina123,mine11,primus1,formatters,matthew5,infotech,gangster1,jordan45,moose69,kompas,motoxxx,greatwhi,cobra12,kirpich,weezer1,hello23,montse,tracy123,connecte,cjymrf,hemingwa,azreal,gundam00,mobila,boxman,slayers1,ravshan,june26,fktrcfylhjd,bermuda1,tylerd,maersk,qazwsx11,eybdthcbntn,ash123,camelo,kat123,backd00r,cheyenne1,1king,jerkin,tnt123,trabant,warhammer40k,rambos,punto,home77,pedrito,1frank,brille,guitarman,george13,rakas,tgbxtcrbq,flute1,bananas1,lovezp1314,thespot,postie,buster69,sexytime,twistys,zacharia,sportage,toccata,denver7,terry123,bogdanova,devil69,higgins1,whatluck,pele10,kkk666,jeffery1,1qayxsw2,riptide1,chevy11,munchy,lazer1,hooker1,ghfgjh,vergesse,playgrou,4077mash,gusev,humpin,oneputt,hydepark,monster9,tiger8,tangsoo,guy123,hesoyam1,uhtqneyu,thanku,lomond,ortezza,kronik,geetha,rabbit66,killas,qazxswe,alabaste,1234567890qwerty,capone1,andrea12,geral,beatbox,slutfuck,booyaka,jasmine7,ostsee,maestro1,beatme,tracey1,buster123,donaldduck,ironfish,happy6,konnichi,gintonic,momoney1,dugan1,today2,enkidu,destiny2,trim7gun,katuha,fractals,morganstanley,polkadot,gotime,prince11,204060,fifa2010,bobbyt,seemee,amanda10,airbrush,bigtitty,heidie,layla1,cotton1,5speed,fyfnjkmtdyf,flynavy,joxury8f,meeko,akuma,dudley1,flyboy1,moondog1,trotters,mariami,signin,chinna,legs11,pussy4,1s1h1e1f1,felici,optimus1,iluvu,marlins1,gavaec,balance1,glock40,london01,kokot,southwes,comfort1,sammy11,rockbottom,brianc,litebeer,homero,chopsuey,greenlan,charit,freecell,hampster,smalldog,viper12,blofeld,1234567890987654321,realsex,romann,cartman2,cjdthitycndj,nelly1,bmw528,zwezda,masterba,jeep99,turtl,america2,sunburst,sanyco,auntjudy,125wm,blue10,qwsazx,cartma,toby12,robbob,red222,ilovecock,losfix16,1explore,helge,vaz2114,whynotme,baba123,mugen,1qazwsxedc,albertjr,0101198,sextime,supras,nicolas2,wantsex,pussy6,checkm8,winam,24gordon,misterme,curlew,gbljhfcs,medtech,franzi,butthea,voivod,blackhat,egoiste,pjkeirf,maddog69,pakalolo,hockey4,igor1234,rouges,snowhite,homefree,sexfreak,acer12,dsmith,blessyou,199410,vfrcbvjd,falco02,belinda1,yaglasph,april21,groundho,jasmin1,nevergiveup,elvir,gborv526,c00kie,emma01,awesome2,larina,mike12345,maximu,anupam,bltynbabrfwbz,tanushka,sukkel,raptor22,josh12,schalke04,cosmodog,fuckyou8,busybee,198800,bijoux,frame1,blackmor,giveit,issmall,bear13,123-123,bladez,littlegirl,ultra123,fletch1,flashnet,loploprock,rkelly,12step,lukas1,littlewhore,cuntfinger,stinkyfinger,laurenc,198020,n7td4bjl,jackie69,camel123,ben1234,1gateway,adelheid,fatmike,thuglove,zzaaqq,chivas1,4815162342q,mamadou,nadano,james22,benwin,andrea99,rjirf,michou,abkbgg,d50gnn,aaazzz,a123654,blankman,booboo11,medicus,bigbone,197200,justine1,bendix,morphius,njhvjp,44mag,zsecyus56,goodbye1,nokiadermo,a333444,waratsea,4rzp8ab7,fevral,brillian,kirbys,minim,erathia,grazia,zxcvb1234,dukey,snaggle,poppi,hymen,1video,dune2000,jpthjdf,cvbn123,zcxfcnkbdfz,astonv,ginnie,316271,engine3,pr1ncess,64chevy,glass1,laotzu,hollyy,comicbooks,assasins,nuaddn9561,scottsda,hfcnfvfy,accobra,7777777z,werty123,metalhead,romanson,redsand,365214,shalo,arsenii,1989cc,sissi,duramax,382563,petera,414243,mamapap,jollymon,field1,fatgirl,janets,trompete,matchbox20,rambo2,nepenthe,441232,qwertyuiop10,bozo123,phezc419hv,romantika,lifestyl,pengui,decembre,demon6,panther6,444888,scanman,ghjcnjabkz,pachanga,buzzword,indianer,spiderman3,tony12,startre,frog1,fyutk,483422,tupacshakur,albert12,1drummer,bmw328i,green17,aerdna,invisibl,summer13,calimer,mustaine,lgnu9d,morefun,hesoyam123,escort1,scrapland,stargat,barabbas,dead13,545645,mexicali,sierr,gfhfpbn,gonchar,moonstafa,searock,counte,foster1,jayhawk1,floren,maremma,nastya2010,softball1,adaptec,halloo,barrabas,zxcasd123,hunny,mariana1,kafedra,freedom0,green420,vlad1234,method7,665566,tooting,hallo12,davinchi,conducto,medias,666444,invernes,madhatter,456asd,12345678i,687887,le33px,spring00,help123,bellybut,billy5,vitalik1,river123,gorila,bendis,power666,747200,footslav,acehigh,qazxswedc123,q1a1z1,richard9,peterburg,tabletop,gavrilov,123qwe1,kolosov,fredrau,run4fun,789056,jkbvgbflf,chitra,87654321q,steve22,wideopen,access88,surfe,tdfyutkbjy,impossib,kevin69,880888,cantina,887766,wxcvb,dontforg,qwer1209,asslicke,mamma123,indig,arkasha,scrapp,morelia,vehxbr,jones2,scratch1,cody11,cassie12,gerbera,dontgotm,underhil,maks2010,hollywood1,hanibal,elena2010,jason11,1010321,stewar,elaman,fireplug,goodby,sacrific,babyphat,bobcat12,bruce123,1233215,tony45,tiburo,love15,bmw750,wallstreet,2h0t4me,1346795,lamerz,munkee,134679q,granvill,1512198,armastus,aiden1,pipeutvj,g1234567,angeleyes,usmc1,102030q,putangina,brandnew,shadowfax,eagles12,1falcon,brianw,lokomoti,2022958,scooper,pegas,jabroni1,2121212,buffal,siffredi,wewiz,twotone,rosebudd,nightwis,carpet1,mickey2,2525252,sleddog,red333,jamesm,2797349,jeff12,onizuka,felixxxx,rf6666,fine1,ohlala,forplay,chicago5,muncho,scooby11,ptichka,johnnn,19851985p,dogphil3650,totenkopf,monitor2,macross7,3816778,dudder,semaj1,bounder,racerx1,5556633,7085506,ofclr278,brody1,7506751,nantucke,hedj2n4q,drew1,aessedai,trekbike,pussykat,samatron,imani,9124852,wiley1,dukenukem,iampurehaha2,9556035,obvious1,mccool24,apache64,kravchenko,justforf,basura,jamese,s0ccer,safado,darksta,surfer69,damian1,gjpbnbd,gunny1,wolley,sananton,zxcvbn123456,odt4p6sv8,sergei1,modem1,mansikka,zzzz1,rifraf,dima777,mary69,looking4,donttell,red100,ninjutsu,uaeuaeman,bigbri,brasco,queenas8151,demetri,angel007,bubbl,kolort,conny,antonia1,avtoritet,kaka22,kailayu,sassy2,wrongway,chevy3,1nascar,patriots1,chrisrey,mike99,sexy22,chkdsk,sd3utre7,padawan,a6pihd,doming,mesohorny,tamada,donatello,emma22,eather,susan69,pinky123,stud69,fatbitch,pilsbury,thc420,lovepuss,1creativ,golf1234,hurryup,1honda,huskerdu,marino1,gowron,girl1,fucktoy,gtnhjpfdjlcr,dkjfghdk,pinkfl,loreli,7777777s,donkeykong,rockytop,staples1,sone4ka,xxxjay,flywheel,toppdogg,bigbubba,aaa123456,2letmein,shavkat,paule,dlanor,adamas,0147852,aassaa,dixon1,bmw328,mother12,ilikepussy,holly2,tsmith,excaliber,fhutynbyf,nicole3,tulipan,emanue,flyvholm,currahee,godsgift,antonioj,torito,dinky1,sanna,yfcnzvjz,june14,anime123,123321456654,hanswurst,bandman,hello101,xxxyyy,chevy69,technica,tagada,arnol,v00d00,lilone,filles,drumandbass,dinamit,a1234a,eatmeat,elway07,inout,james6,dawid1,thewolf,diapason,yodaddy,qscwdv,fuckit1,liljoe,sloeber,simbacat,sascha1,qwe1234,1badger,prisca,angel17,gravedig,jakeyboy,longboard,truskawka,golfer11,pyramid7,highspee,pistola,theriver,hammer69,1packers,dannyd,alfonse,qwertgfdsa,11119999,basket1,ghjtrn,saralee,12inches,paolo1,zse4xdr5,taproot,sophieh6,grizzlie,hockey69,danang,biggums,hotbitch,5alive,beloved1,bluewave,dimon95,koketka,multiscan,littleb,leghorn,poker2,delite,skyfir,bigjake,persona1,amberdog,hannah12,derren,ziffle,1sarah,1assword,sparky01,seymur,tomtom1,123321qw,goskins,soccer19,luvbekki,bumhole,2balls,1muffin,borodin,monkey9,yfeiybrb,1alex,betmen,freder,nigger123,azizbek,gjkzrjdf,lilmike,1bigdadd,1rock,taganrog,snappy1,andrey1,kolonka,bunyan,gomango,vivia,clarkkent,satur,gaudeamus,mantaray,1month,whitehea,fargus,andrew99,ray123,redhawks,liza2009,qw12345,den12345,vfhnsyjdf,147258369a,mazepa,newyorke,1arsenal,hondas2000,demona,fordgt,steve12,birthday2,12457896,dickster,edcwsxqaz,sahalin,pantyman,skinny1,hubertus,cumshot1,chiro,kappaman,mark3434,canada12,lichking,bonkers1,ivan1985,sybase,valmet,doors1,deedlit,kyjelly,bdfysx,ford11,throatfuck,backwood,fylhsq,lalit,boss429,kotova,bricky,steveh,joshua19,kissa,imladris,star1234,lubimka,partyman,crazyd,tobias1,ilike69,imhome,whome,fourstar,scanner1,ujhjl312,anatoli,85bears,jimbo69,5678ytr,potapova,nokia7070,sunday1,kalleank,1996gta,refinnej,july1,molodec,nothanks,enigm,12play,sugardog,nhfkbdfkb,larousse,cannon1,144444,qazxcdew,stimorol,jhereg,spawn7,143000,fearme,hambur,merlin21,dobie,is3yeusc,partner1,dekal,varsha,478jfszk,flavi,hippo1,9hmlpyjd,july21,7imjfstw,lexxus,truelov,nokia5200,carlos6,anais,mudbone,anahit,taylorc,tashas,larkspur,animal2000,nibiru,jan123,miyvarxar,deflep,dolore,communit,ifoptfcor,laura2,anadrol,mamaliga,mitzi1,blue92,april15,matveev,kajlas,wowlook1,1flowers,shadow14,alucard1,1golf,bantha,scotlan,singapur,mark13,manchester1,telus01,superdav,jackoff1,madnes,bullnuts,world123,clitty,palmer1,david10,spider10,sargsyan,rattlers,david4,windows2,sony12,visigoth,qqqaaa,penfloor,cabledog,camilla1,natasha123,eagleman,softcore,bobrov,dietmar,divad,sss123,d1234567,tlbyjhju,1q1q1q1,paraiso,dav123,lfiekmrf,drachen,lzhan16889,tplate,gfghbrf,casio1,123boots1,123test,sys64738,heavymetal,andiamo,meduza,soarer,coco12,negrita,amigas,heavymet,bespin,1asdfghj,wharfrat,wetsex,tight1,janus1,sword123,ladeda,dragon98,austin2,atep1,jungle1,12345abcd,lexus300,pheonix1,alex1974,123qw123,137955,bigtim,shadow88,igor1994,goodjob,arzen,champ123,121ebay,changeme1,brooksie,frogman1,buldozer,morrowin,achim,trish1,lasse,festiva,bubbaman,scottb,kramit,august22,tyson123,passsword,oompah,al123456,fucking1,green45,noodle1,looking1,ashlynn,al1716,stang50,coco11,greese,bob111,brennan1,jasonj,1cherry,1q2345,1xxxxxxx,fifa2011,brondby,zachar1,satyam,easy1,magic7,1rainbow,cheezit,1eeeeeee,ashley123,assass1,amanda123,jerbear,1bbbbbb,azerty12,15975391,654321z,twinturb,onlyone1,denis1988,6846kg3r,jumbos,pennydog,dandelion,haileris,epervier,snoopy69,afrodite,oldpussy,green55,poopypan,verymuch,katyusha,recon7,mine69,tangos,contro,blowme2,jade1,skydive1,fiveiron,dimo4ka,bokser,stargirl,fordfocus,tigers2,platina,baseball11,raque,pimper,jawbreak,buster88,walter34,chucko,penchair,horizon1,thecure1,scc1975,adrianna1,kareta,duke12,krille,dumbfuck,cunt1,aldebaran,laverda,harumi,knopfler,pongo1,pfhbyf,dogman1,rossigno,1hardon,scarlets,nuggets1,ibelieve,akinfeev,xfhkbr,athene,falcon69,happie,billly,nitsua,fiocco,qwerty09,gizmo2,slava2,125690,doggy123,craigs,vader123,silkeborg,124365,peterm,123978,krakatoa,123699,123592,kgvebmqy,pensacol,d1d2d3,snowstor,goldenboy,gfg65h7,ev700,church1,orange11,g0dz1ll4,chester3,acheron,cynthi,hotshot1,jesuschris,motdepass,zymurgy,one2one,fietsbel,harryp,wisper,pookster,nn527hp,dolla,milkmaid,rustyboy,terrell1,epsilon1,lillian1,dale3,crhbgrf,maxsim,selecta,mamada,fatman1,ufkjxrf,shinchan,fuckuall,women1,000008,bossss,greta1,rbhjxrf,mamasboy,purple69,felicidade,sexy21,cathay,hunglow,splatt,kahless,shopping1,1gandalf,themis,delta7,moon69,blue24,parliame,mamma1,miyuki,2500hd,jackmeof,razer,rocker1,juvis123,noremac,boing747,9z5ve9rrcz,icewater,titania,alley1,moparman,christo1,oliver2,vinicius,tigerfan,chevyy,joshua99,doda99,matrixx,ekbnrf,jackfrost,viper01,kasia,cnfhsq,triton1,ssbt8ae2,rugby8,ramman,1lucky,barabash,ghtlfntkm,junaid,apeshit,enfant,kenpo1,shit12,007000,marge1,shadow10,qwerty789,richard8,vbitkm,lostboys,jesus4me,richard4,hifive,kolawole,damilola,prisma,paranoya,prince2,lisaann,happyness,cardss,methodma,supercop,a8kd47v5,gamgee,polly123,irene1,number8,hoyasaxa,1digital,matthew0,dclxvi,lisica,roy123,2468013579,sparda,queball,vaffanculo,pass1wor,repmvbx,999666333,freedom8,botanik,777555333,marcos1,lubimaya,flash2,einstei,08080,123456789j,159951159,159357123,carrot1,alina1995,sanjos,dilara,mustang67,wisteria,jhnjgtl12,98766789,darksun,arxangel,87062134,creativ1,malyshka,fuckthemall,barsic,rocksta,2big4u,5nizza,genesis2,romance1,ofcourse,1horse,latenite,cubana,sactown,789456123a,milliona,61808861,57699434,imperia,bubba11,yellow3,change12,55495746,flappy,jimbo123,19372846,19380018,cutlass1,craig123,klepto,beagle1,solus,51502112,pasha1,19822891,46466452,19855891,petshop,nikolaevna,119966,nokia6131,evenpar,hoosier1,contrasena,jawa350,gonzo123,mouse2,115511,eetfuk,gfhfvgfvgfv,1crystal,sofaking,coyote1,kwiatuszek,fhrflbq,valeria1,anthro,0123654789,alltheway,zoltar,maasikas,wildchil,fredonia,earlgrey,gtnhjczy,matrix123,solid1,slavko,12monkeys,fjdksl,inter1,nokia6500,59382113kevinp,spuddy,cachero,coorslit,password!,kiba1z,karizma,vova1994,chicony,english1,bondra12,1rocket,hunden,jimbob1,zpflhjn1,th0mas,deuce22,meatwad,fatfree,congas,sambora,cooper2,janne,clancy1,stonie,busta,kamaz,speedy2,jasmine3,fahayek,arsenal0,beerss,trixie1,boobs69,luansantana,toadman,control2,ewing33,maxcat,mama1964,diamond4,tabaco,joshua0,piper2,music101,guybrush,reynald,pincher,katiebug,starrs,pimphard,frontosa,alex97,cootie,clockwor,belluno,skyeseth,booty69,chaparra,boochie,green4,bobcat1,havok,saraann,pipeman,aekdb,jumpshot,wintermu,chaika,1chester,rjnjatq,emokid,reset1,regal1,j0shua,134679a,asmodey,sarahh,zapidoo,ciccione,sosexy,beckham23,hornets1,alex1971,delerium,manageme,connor11,1rabbit,sane4ek,caseyboy,cbljhjdf,redsox20,tttttt99,haustool,ander,pantera6,passwd1,journey1,9988776655,blue135,writerspace,xiaoyua123,justice2,niagra,cassis,scorpius,bpgjldsgjldthnf,gamemaster,bloody1,retrac,stabbin,toybox,fight1,ytpyf.,glasha,va2001,taylor11,shameles,ladylove,10078,karmann,rodeos,eintritt,lanesra,tobasco,jnrhjqcz,navyman,pablit,leshka,jessica3,123vika,alena1,platinu,ilford,storm7,undernet,sasha777,1legend,anna2002,kanmax1994,porkpie,thunder0,gundog,pallina,easypass,duck1,supermom,roach1,twincam,14028,tiziano,qwerty32,123654789a,evropa,shampoo1,yfxfkmybr,cubby1,tsunami1,fktrcttdf,yasacrac,17098,happyhap,bullrun,rodder,oaktown,holde,isbest,taylor9,reeper,hammer11,julias,rolltide1,compaq123,fourx4,subzero1,hockey9,7mary3,busines,ybrbnjcbr,wagoneer,danniash,portishead,digitex,alex1981,david11,infidel,1snoopy,free30,jaden,tonto1,redcar27,footie,moskwa,thomas21,hammer12,burzum,cosmo123,50000,burltree,54343,54354,vwpassat,jack5225,cougars1,burlpony,blackhorse,alegna,petert,katemoss,ram123,nels0n,ferrina,angel77,cstock,1christi,dave55,abc123a,alex1975,av626ss,flipoff,folgore,max1998,science1,si711ne,yams7,wifey1,sveiks,cabin1,volodia,ox3ford,cartagen,platini,picture1,sparkle1,tiedomi,service321,wooody,christi1,gnasher,brunob,hammie,iraffert,bot2010,dtcyeirf,1234567890p,cooper11,alcoholi,savchenko,adam01,chelsea5,niewiem,icebear,lllooottt,ilovedick,sweetpus,money8,cookie13,rfnthbyf1988,booboo2,angus123,blockbus,david9,chica1,nazaret,samsung9,smile4u,daystar,skinnass,john10,thegirl,sexybeas,wasdwasd1,sigge1,1qa2ws3ed4rf5tg,czarny,ripley1,chris5,ashley19,anitha,pokerman,prevert,trfnthby,tony69,georgia2,stoppedb,qwertyuiop12345,miniclip,franky1,durdom,cabbages,1234567890o,delta5,liudmila,nhfycajhvths,court1,josiew,abcd1,doghead,diman,masiania,songline,boogle,triston,deepika,sexy4me,grapple,spacebal,ebonee,winter0,smokewee,nargiza,dragonla,sassys,andy2000,menards,yoshio,massive1,suckmy1k,passat99,sexybo,nastya1996,isdead,stratcat,hokuto,infix,pidoras,daffyduck,cumhard,baldeagl,kerberos,yardman,shibainu,guitare,cqub6553,tommyy,bk.irf,bigfoo,hecto,july27,james4,biggus,esbjerg,isgod,1irish,phenmarr,jamaic,roma1990,diamond0,yjdbrjd,girls4me,tampa1,kabuto,vaduz,hanse,spieng,dianochka,csm101,lorna1,ogoshi,plhy6hql,2wsx4rfv,cameron0,adebayo,oleg1996,sharipov,bouboule,hollister1,frogss,yeababy,kablam,adelante,memem,howies,thering,cecilia1,onetwo12,ojp123456,jordan9,msorcloledbr,neveraga,evh5150,redwin,1august,canno,1mercede,moody1,mudbug,chessmas,tiikeri,stickdaddy77,alex15,kvartira,7654321a,lollol123,qwaszxedc,algore,solana,vfhbyfvfhbyf,blue72,misha1111,smoke20,junior13,mogli,threee,shannon2,fuckmylife,kevinh,saransk,karenw,isolde,sekirarr,orion123,thomas0,debra1,laketaho,alondra,curiva,jazz1234,1tigers,jambos,lickme2,suomi,gandalf7,028526,zygote,brett123,br1ttany,supafly,159000,kingrat,luton1,cool-ca,bocman,thomasd,skiller,katter,mama777,chanc,tomass,1rachel,oldno7,rfpfyjdf,bigkev,yelrah,primas,osito,kipper1,msvcr71,bigboy11,thesun,noskcaj,chicc,sonja1,lozinka,mobile1,1vader,ummagumma,waves1,punter12,tubgtn,server1,irina1991,magic69,dak001,pandemonium,dead1,berlingo,cherrypi,1montana,lohotron,chicklet,asdfgh123456,stepside,ikmvw103,icebaby,trillium,1sucks,ukrnet,glock9,ab12345,thepower,robert8,thugstools,hockey13,buffon,livefree,sexpics,dessar,ja0000,rosenrot,james10,1fish,svoloch,mykitty,muffin11,evbukb,shwing,artem1992,andrey1992,sheldon1,passpage,nikita99,fubar123,vannasx,eight888,marial,max2010,express2,violentj,2ykn5ccf,spartan11,brenda69,jackiech,abagail,robin2,grass1,andy76,bell1,taison,superme,vika1995,xtr451,fred20,89032073168,denis1984,2000jeep,weetabix,199020,daxter,tevion,panther8,h9iymxmc,bigrig,kalambur,tsalagi,12213443,racecar02,jeffrey4,nataxa,bigsam,purgator,acuracl,troutbum,potsmoke,jimmyz,manutd1,nytimes,pureevil,bearss,cool22,dragonage,nodnarb,dbrbyu,4seasons,freude,elric1,werule,hockey14,12758698,corkie,yeahright,blademan,tafkap,clave,liziko,hofner,jeffhardy,nurich,runne,stanisla,lucy1,monk3y,forzaroma,eric99,bonaire,blackwoo,fengshui,1qaz0okm,newmoney,pimpin69,07078,anonymer,laptop1,cherry12,ace111,salsa1,wilbur1,doom12,diablo23,jgtxzbhr,under1,honda01,breadfan,megan2,juancarlos,stratus1,ackbar,love5683,happytim,lambert1,cbljhtyrj,komarov,spam69,nfhtkrf,brownn,sarmat,ifiksr,spike69,hoangen,angelz,economia,tanzen,avogadro,1vampire,spanners,mazdarx,queequeg,oriana,hershil,sulaco,joseph11,8seconds,aquariu,cumberla,heather9,anthony8,burton12,crystal0,maria3,qazwsxc,snow123,notgood,198520,raindog,heehaw,consulta,dasein,miller01,cthulhu1,dukenuke,iubire,baytown,hatebree,198505,sistem,lena12,welcome01,maraca,middleto,sindhu,mitsou,phoenix5,vovan,donaldo,dylandog,domovoy,lauren12,byrjuybnj,123llll,stillers,sanchin,tulpan,smallvill,1mmmmm,patti1,folgers,mike31,colts18,123456rrr,njkmrjz,phoenix0,biene,ironcity,kasperok,password22,fitnes,matthew6,spotligh,bujhm123,tommycat,hazel5,guitar11,145678,vfcmrf,compass1,willee,1barney,jack2000,littleminge,shemp,derrek,xxx12345,littlefuck,spuds1,karolinka,camneely,qwertyu123,142500,brandon00,munson15,falcon3,passssap,z3cn2erv,goahead,baggio10,141592,denali1,37kazoo,copernic,123456789asd,orange88,bravada,rush211,197700,pablo123,uptheass,samsam1,demoman,mattylad10,heydude,mister2,werken,13467985,marantz,a22222,f1f2f3f4,fm12mn12,gerasimova,burrito1,sony1,glenny,baldeagle,rmfidd,fenomen,verbati,forgetme,5element,wer138,chanel1,ooicu812,10293847qp,minicooper,chispa,myturn,deisel,vthrehbq,boredboi4u,filatova,anabe,poiuyt1,barmalei,yyyy1,fourkids,naumenko,bangbros,pornclub,okaykk,euclid90,warrior3,kornet,palevo,patatina,gocart,antanta,jed1054,clock1,111111w,dewars,mankind1,peugeot406,liten,tahira,howlin,naumov,rmracing,corone,cunthole,passit,rock69,jaguarxj,bumsen,197101,sweet2,197010,whitecat,sawadee,money100,yfhrjnbrb,andyboy,9085603566,trace1,fagget,robot1,angel20,6yhn7ujm,specialinsta,kareena,newblood,chingada,boobies2,bugger1,squad51,133andre,call06,ashes1,ilovelucy,success2,kotton,cavalla,philou,deebee,theband,nine09,artefact,196100,kkkkkkk1,nikolay9,onelov,basia,emilyann,sadman,fkrjujkbr,teamomuch,david777,padrino,money21,firdaus,orion3,chevy01,albatro,erdfcv,2legit,sarah7,torock,kevinn,holio,soloy,enron714,starfleet,qwer11,neverman,doctorwh,lucy11,dino12,trinity7,seatleon,o123456,pimpman,1asdfgh,snakebit,chancho,prorok,bleacher,ramire,darkseed,warhorse,michael123,1spanky,1hotdog,34erdfcv,n0th1ng,dimanche,repmvbyf,michaeljackson,login1,icequeen,toshiro,sperme,racer2,veget,birthday26,daniel9,lbvekmrf,charlus,bryan123,wspanic,schreibe,1andonly,dgoins,kewell,apollo12,egypt1,fernie,tiger21,aa123456789,blowj,spandau,bisquit,12345678d,deadmau5,fredie,311420,happyface,samant,gruppa,filmstar,andrew17,bakesale,sexy01,justlook,cbarkley,paul11,bloodred,rideme,birdbath,nfkbcvfy,jaxson,sirius1,kristof,virgos,nimrod1,hardc0re,killerbee,1abcdef,pitcher1,justonce,vlada,dakota99,vespucci,wpass,outside1,puertori,rfvbkf,teamlosi,vgfun2,porol777,empire11,20091989q,jasong,webuivalidat,escrima,lakers08,trigger2,addpass,342500,mongini,dfhtybr,horndogg,palermo1,136900,babyblu,alla98,dasha2010,jkelly,kernow,yfnecz,rockhopper,toeman,tlaloc,silver77,dave01,kevinr,1234567887654321,135642,me2you,8096468644q,remmus,spider7,jamesa,jilly,samba1,drongo,770129ji,supercat,juntas,tema1234,esthe,1234567892000,drew11,qazqaz123,beegees,blome,rattrace,howhigh,tallboy,rufus2,sunny2,sou812,miller12,indiana7,irnbru,patch123,letmeon,welcome5,nabisco,9hotpoin,hpvteb,lovinit,stormin,assmonke,trill,atlanti,money1234,cubsfan,mello1,stars2,ueptkm,agate,dannym88,lover123,wordz,worldnet,julemand,chaser1,s12345678,pissword,cinemax,woodchuc,point1,hotchkis,packers2,bananana,kalender,420666,penguin8,awo8rx3wa8t,hoppie,metlife,ilovemyfamily,weihnachtsbau,pudding1,luckystr,scully1,fatboy1,amizade,dedham,jahbless,blaat,surrende,****er,1panties,bigasses,ghjuhfvbcn,asshole123,dfktyrb,likeme,nickers,plastik,hektor,deeman,muchacha,cerebro,santana5,testdrive,dracula1,canalc,l1750sq,savannah1,murena,1inside,pokemon00,1iiiiiii,jordan20,sexual1,mailliw,calipso,014702580369,1zzzzzz,1jjjjjj,break1,15253545,yomama1,katinka,kevin11,1ffffff,martijn,sslazio,daniel5,porno2,nosmas,leolion,jscript,15975312,pundai,kelli1,kkkddd,obafgkm,marmaris,lilmama,london123,rfhfnt,elgordo,talk87,daniel7,thesims3,444111,bishkek,afrika2002,toby22,1speedy,daishi,2children,afroman,qqqqwwww,oldskool,hawai,v55555,syndicat,pukimak,fanatik,tiger5,parker01,bri5kev6,timexx,wartburg,love55,ecosse,yelena03,madinina,highway1,uhfdbwfgf,karuna,buhjvfybz,wallie,46and2,khalif,europ,qaz123wsx456,bobbybob,wolfone,falloutboy,manning18,scuba10,schnuff,ihateyou1,lindam,sara123,popcor,fallengun,divine1,montblanc,qwerty8,rooney10,roadrage,bertie1,latinus,lexusis,rhfvfnjhcr,opelgt,hitme,agatka,1yamaha,dmfxhkju,imaloser,michell1,sb211st,silver22,lockedup,andrew9,monica01,sassycat,dsobwick,tinroof,ctrhtnyj,bultaco,rhfcyjzhcr,aaaassss,14ss88,joanne1,momanddad,ahjkjdf,yelhsa,zipdrive,telescop,500600,1sexsex,facial1,motaro,511647,stoner1,temujin,elephant1,greatman,honey69,kociak,ukqmwhj6,altezza,cumquat,zippos,kontiki,123max,altec1,bibigon,tontos,qazsew,nopasaran,militar,supratt,oglala,kobayash,agathe,yawetag,dogs1,cfiekmrf,megan123,jamesdea,porosenok,tiger23,berger1,hello11,seemann,stunner1,walker2,imissu,jabari,minfd,lollol12,hjvfy,1-oct,stjohns,2278124q,123456789qwer,alex1983,glowworm,chicho,mallards,bluedevil,explorer1,543211,casita,1time,lachesis,alex1982,airborn1,dubesor,changa,lizzie1,captaink,socool,bidule,march23,1861brr,k.ljxrf,watchout,fotze,1brian,keksa2,aaaa1122,matrim,providian,privado,dreame,merry1,aregdone,davidt,nounour,twenty2,play2win,artcast2,zontik,552255,shit1,sluggy,552861,dr8350,brooze,alpha69,thunder6,kamelia2011,caleb123,mmxxmm,jamesh,lfybkjd,125267,125000,124536,bliss1,dddsss,indonesi,bob69,123888,tgkbxfgy,gerar,themack,hijodeputa,good4now,ddd123,clk430,kalash,tolkien1,132forever,blackb,whatis,s1s2s3s4,lolkin09,yamahar,48n25rcc,djtiesto,111222333444555,bigbull,blade55,coolbree,kelse,ichwill,yamaha12,sakic,bebeto,katoom,donke,sahar,wahine,645202,god666,berni,starwood,june15,sonoio,time123,llbean,deadsoul,lazarev,cdtnf,ksyusha,madarchod,technik,jamesy,4speed,tenorsax,legshow,yoshi1,chrisbl,44e3ebda,trafalga,heather7,serafima,favorite4,havefun1,wolve,55555r,james13,nosredna,bodean,jlettier,borracho,mickael,marinus,brutu,sweet666,kiborg,rollrock,jackson6,macross1,ousooner,9085084232,takeme,123qwaszx,firedept,vfrfhjd,jackfros,123456789000,briane,cookie11,baby22,bobby18,gromova,systemofadown,martin01,silver01,pimaou,darthmaul,hijinx,commo,chech,skyman,sunse,2vrd6,vladimirovna,uthvfybz,nicole01,kreker,bobo1,v123456789,erxtgb,meetoo,drakcap,vfvf12,misiek1,butane,network2,flyers99,riogrand,jennyk,e12345,spinne,avalon11,lovejone,studen,maint,porsche2,qwerty100,chamberl,bluedog1,sungam,just4u,andrew23,summer22,ludic,musiclover,aguil,beardog1,libertin,pippo1,joselit,patito,bigberth,digler,sydnee,jockstra,poopo,jas4an,nastya123,profil,fuesse,default1,titan2,mendoz,kpcofgs,anamika,brillo021,bomberman,guitar69,latching,69pussy,blues2,phelge,ninja123,m7n56xo,qwertasd,alex1976,cunningh,estrela,gladbach,marillion,mike2000,258046,bypop,muffinman,kd5396b,zeratul,djkxbwf,john77,sigma2,1linda,selur,reppep,quartz1,teen1,freeclus,spook1,kudos4ever,clitring,sexiness,blumpkin,macbook,tileman,centra,escaflowne,pentable,shant,grappa,zverev,1albert,lommerse,coffee11,777123,polkilo,muppet1,alex74,lkjhgfdsazx,olesica,april14,ba25547,souths,jasmi,arashi,smile2,2401pedro,mybabe,alex111,quintain,pimp1,tdeir8b2,makenna,122333444455555,%e2%82%ac,tootsie1,pass111,zaqxsw123,gkfdfybt,cnfnbcnbrf,usermane,iloveyou12,hard69,osasuna,firegod,arvind,babochka,kiss123,cookie123,julie123,kamakazi,dylan2,223355,tanguy,nbhtqa,tigger13,tubby1,makavel,asdflkj,sambo1,mononoke,mickeys,gayguy,win123,green33,wcrfxtvgbjy,bigsmall,1newlife,clove,babyfac,bigwaves,mama1970,shockwav,1friday,bassey,yarddog,codered1,victory7,bigrick,kracker,gulfstre,chris200,sunbanna,bertuzzi,begemotik,kuolema,pondus,destinee,123456789zz,abiodun,flopsy,amadeusptfcor,geronim,yggdrasi,contex,daniel6,suck1,adonis1,moorea,el345612,f22raptor,moviebuf,raunchy,6043dkf,zxcvbnm123456789,eric11,deadmoin,ratiug,nosliw,fannies,danno,888889,blank1,mikey2,gullit,thor99,mamiya,ollieb,thoth,dagger1,websolutionssu,bonker,prive,1346798520,03038,q1234q,mommy2,contax,zhipo,gwendoli,gothic1,1234562000,lovedick,gibso,digital2,space199,b26354,987654123,golive,serious1,pivkoo,better1,824358553,794613258,nata1980,logout,fishpond,buttss,squidly,good4me,redsox19,jhonny,zse45rdx,matrixxx,honey12,ramina,213546879,motzart,fall99,newspape,killit,gimpy,photowiz,olesja,thebus,marco123,147852963,bedbug,147369258,hellbound,gjgjxrf,123987456,lovehurt,five55,hammer01,1234554321a,alina2011,peppino,ang238,questor,112358132,alina1994,alina1998,money77,bobjones,aigerim,cressida,madalena,420smoke,tinchair,raven13,mooser,mauric,lovebu,adidas69,krypton1,1111112,loveline,divin,voshod,michaelm,cocotte,gbkbuhbv,76689295,kellyj,rhonda1,sweetu70,steamforums,geeque,nothere,124c41,quixotic,steam181,1169900,rfcgthcrbq,rfvbkm,sexstuff,1231230,djctvm,rockstar1,fulhamfc,bhecbr,rfntyf,quiksilv,56836803,jedimaster,pangit,gfhjkm777,tocool,1237654,stella12,55378008,19216811,potte,fender12,mortalkombat,ball1,nudegirl,palace22,rattrap,debeers,lickpussy,jimmy6,not4u2c,wert12,bigjuggs,sadomaso,1357924,312mas,laser123,arminia,branford,coastie,mrmojo,19801982,scott11,banaan123,ingres,300zxtt,hooters6,sweeties,19821983,19831985,19833891,sinnfein,welcome4,winner69,killerman,tachyon,tigre1,nymets1,kangol,martinet,sooty1,19921993,789qwe,harsingh,1597535,thecount,phantom3,36985214,lukas123,117711,pakistan1,madmax11,willow01,19932916,fucker12,flhrci,opelagila,theword,ashley24,tigger3,crazyj,rapide,deadfish,allana,31359092,sasha1993,sanders2,discman,zaq!2wsx,boilerma,mickey69,jamesg,babybo,jackson9,orion7,alina2010,indien,breeze1,atease,warspite,bazongaz,1celtic,asguard,mygal,fitzgera,1secret,duke33,cyklone,dipascuc,potapov,1escobar2,c0l0rad0,kki177hk,1little,macondo,victoriya,peter7,red666,winston6,kl?benhavn,muneca,jackme,jennan,happylife,am4h39d8nh,bodybuil,201980,dutchie,biggame,lapo4ka,rauchen,black10,flaquit,water12,31021364,command2,lainth88,mazdamx5,typhon,colin123,rcfhlfc,qwaszx11,g0away,ramir,diesirae,hacked1,cessna1,woodfish,enigma2,pqnr67w5,odgez8j3,grisou,hiheels,5gtgiaxm,2580258,ohotnik,transits,quackers,serjik,makenzie,mdmgatew,bryana,superman12,melly,lokit,thegod,slickone,fun4all,netpass,penhorse,1cooper,nsync,asdasd22,otherside,honeydog,herbie1,chiphi,proghouse,l0nd0n,shagg,select1,frost1996,casper123,countr,magichat,greatzyo,jyothi,3bears,thefly,nikkita,fgjcnjk,nitros,hornys,san123,lightspe,maslova,kimber1,newyork2,spammm,mikejone,pumpk1n,bruiser1,bacons,prelude9,boodie,dragon4,kenneth2,love98,power5,yodude,pumba,thinline,blue30,sexxybj,2dumb2live,matt21,forsale,1carolin,innova,ilikeporn,rbgtkjd,a1s2d3f,wu9942,ruffus,blackboo,qwerty999,draco1,marcelin,hideki,gendalf,trevon,saraha,cartmen,yjhbkmcr,time2go,fanclub,ladder1,chinni,6942987,united99,lindac,quadra,paolit,mainstre,beano002,lincoln7,bellend,anomie,8520456,bangalor,goodstuff,chernov,stepashka,gulla,mike007,frasse,harley03,omnislash,8538622,maryjan,sasha2011,gineok,8807031,hornier,gopinath,princesit,bdr529,godown,bosslady,hakaone,1qwe2,madman1,joshua11,lovegame,bayamon,jedi01,stupid12,sport123,aaa666,tony44,collect1,charliem,chimaira,cx18ka,trrim777,chuckd,thedream,redsox99,goodmorning,delta88,iloveyou11,newlife2,figvam,chicago3,jasonk,12qwer,9875321,lestat1,satcom,conditio,capri50,sayaka,9933162,trunks1,chinga,snooch,alexand1,findus,poekie,cfdbyf,kevind,mike1969,fire13,leftie,bigtuna,chinnu,silence1,celos1,blackdra,alex24,gfgfif,2boobs,happy8,enolagay,sataniv1993,turner1,dylans,peugeo,sasha1994,hoppel,conno,moonshot,santa234,meister1,008800,hanako,tree123,qweras,gfitymrf,reggie31,august29,supert,joshua10,akademia,gbljhfc,zorro123,nathalia,redsox12,hfpdjl,mishmash,nokiae51,nyyankees,tu190022,strongbo,none1,not4u2no,katie2,popart,harlequi,santan,michal1,1therock,screwu,csyekmrf,olemiss1,tyrese,hoople,sunshin1,cucina,starbase,topshelf,fostex,california1,castle1,symantec,pippolo,babare,turntabl,1angela,moo123,ipvteb,gogolf,alex88,cycle1,maxie1,phase2,selhurst,furnitur,samfox,fromvermine,shaq34,gators96,captain2,delonge,tomatoe,bisous,zxcvbnma,glacius,pineapple1,cannelle,ganibal,mko09ijn,paraklast1974,hobbes12,petty43,artema,junior8,mylover,1234567890d,fatal1ty,prostreet,peruan,10020,nadya,caution1,marocas,chanel5,summer08,metal123,111lox,scrapy,thatguy,eddie666,washingto,yannis,minnesota_hp,lucky4,playboy6,naumova,azzurro,patat,dale33,pa55wd,speedster,zemanova,saraht,newto,tony22,qscesz,arkady,1oliver,death6,vkfwx046,antiflag,stangs,jzf7qf2e,brianp,fozzy,cody123,startrek1,yoda123,murciela,trabajo,lvbnhbtdf,canario,fliper,adroit,henry5,goducks,papirus,alskdj,soccer6,88mike,gogetter,tanelorn,donking,marky1,leedsu,badmofo,al1916,wetdog,akmaral,pallet,april24,killer00,nesterova,rugby123,coffee12,browseui,ralliart,paigow,calgary1,armyman,vtldtltd,frodo2,frxtgb,iambigal,benno,jaytee,2hot4you,askar,bigtee,brentwoo,palladin,eddie2,al1916w,horosho,entrada,ilovetits,venture1,dragon19,jayde,chuvak,jamesl,fzr600,brandon8,vjqvbh,snowbal,snatch1,bg6njokf,pudder,karolin,candoo,pfuflrf,satchel1,manteca,khongbiet,critter1,partridg,skyclad,bigdon,ginger69,brave1,anthony4,spinnake,chinadol,passout,cochino,nipples1,15058,lopesk,sixflags,lloo999,parkhead,breakdance,cia123,fidodido,yuitre12,fooey,artem1995,gayathri,medin,nondriversig,l12345,bravo7,happy13,kazuya,camster,alex1998,luckyy,zipcode,dizzle,boating1,opusone,newpassw,movies23,kamikazi,zapato,bart316,cowboys0,corsair1,kingshit,hotdog12,rolyat,h200svrm,qwerty4,boofer,rhtyltkm,chris999,vaz21074,simferopol,pitboss,love3,britania,tanyshka,brause,123qwerty123,abeille,moscow1,ilkaev,manut,process1,inetcfg,dragon05,fortknox,castill,rynner,mrmike,koalas,jeebus,stockpor,longman,juanpabl,caiman,roleplay,jeremi,26058,prodojo,002200,magical1,black5,bvlgari,doogie1,cbhtqa,mahina,a1s2d3f4g5h6,jblpro,usmc01,bismilah,guitar01,april9,santana1,1234aa,monkey14,sorokin,evan1,doohan,animalsex,pfqxtyjr,dimitry,catchme,chello,silverch,glock45,dogleg,litespee,nirvana9,peyton18,alydar,warhamer,iluvme,sig229,minotavr,lobzik,jack23,bushwack,onlin,football123,joshua5,federov,winter2,bigmax,fufnfrhbcnb,hfpldfnhb,1dakota,f56307,chipmonk,4nick8,praline,vbhjh123,king11,22tango,gemini12,street1,77879,doodlebu,homyak,165432,chuluthu,trixi,karlito,salom,reisen,cdtnkzxjr,pookie11,tremendo,shazaam,welcome0,00000ty,peewee51,pizzle,gilead,bydand,sarvar,upskirt,legends1,freeway1,teenfuck,ranger9,darkfire,dfymrf,hunt0802,justme1,buffy1ma,1harry,671fsa75yt,burrfoot,budster,pa437tu,jimmyp,alina2006,malacon,charlize,elway1,free12,summer02,gadina,manara,gomer1,1cassie,sanja,kisulya,money3,pujols,ford50,midiland,turga,orange6,demetriu,freakboy,orosie1,radio123,open12,vfufpby,mustek,chris33,animes,meiling,nthtvjr,jasmine9,gfdkjd,oligarh,marimar,chicago9,.kzirf,bugssgub,samuraix,jackie01,pimpjuic,macdad,cagiva,vernost,willyboy,fynjyjdf,tabby1,privet123,torres9,retype,blueroom,raven11,q12we3,alex1989,bringiton,ridered,kareltje,ow8jtcs8t,ciccia,goniners,countryb,24688642,covingto,24861793,beyblade,vikin,badboyz,wlafiga,walstib,mirand,needajob,chloes,balaton,kbpfdtnf,freyja,bond9007,gabriel12,stormbri,hollage,love4eve,fenomeno,darknite,dragstar,kyle123,milfhunter,ma123123123,samia,ghislain,enrique1,ferien12,xjy6721,natalie2,reglisse,wilson2,wesker,rosebud7,amazon1,robertr,roykeane,xtcnth,mamatata,crazyc,mikie,savanah,blowjob69,jackie2,forty1,1coffee,fhbyjxrf,bubbah,goteam,hackedit,risky1,logoff,h397pnvr,buck13,robert23,bronc,st123st,godflesh,pornog,iamking,cisco69,septiembr,dale38,zhongguo,tibbar,panther9,buffa1,bigjohn1,mypuppy,vehvfycr,april16,shippo,fire1234,green15,q123123,gungadin,steveg,olivier1,chinaski,magnoli,faithy,storm12,toadfrog,paul99,78791,august20,automati,squirtle,cheezy,positano,burbon,nunya,llebpmac,kimmi,turtle2,alan123,prokuror,violin1,durex,pussygal,visionar,trick1,chicken6,29024,plowboy,rfybreks,imbue,sasha13,wagner1,vitalogy,cfymrf,thepro,26028,gorbunov,dvdcom,letmein5,duder,fastfun,pronin,libra1,conner1,harley20,stinker1,20068,20038,amitech,syoung,dugway,18068,welcome7,jimmypag,anastaci,kafka1,pfhfnecnhf,catsss,campus100,shamal,nacho1,fire12,vikings2,brasil1,rangerover,mohamma,peresvet,14058,cocomo,aliona,14038,qwaser,vikes,cbkmdf,skyblue1,ou81234,goodlove,dfkmltvfh,108888,roamer,pinky2,static1,zxcv4321,barmen,rock22,shelby2,morgans,1junior,pasword1,logjam,fifty5,nhfrnjhbcn,chaddy,philli,nemesis2,ingenier,djkrjd,ranger3,aikman8,knothead,daddy69,love007,vsythb,ford350,tiger00,renrut,owen11,energy12,march14,alena123,robert19,carisma,orange22,murphy11,podarok,prozak,kfgeirf,wolf13,lydia1,shazza,parasha,akimov,tobbie,pilote,heather4,baster,leones,gznfxjr,megama,987654321g,bullgod,boxster1,minkey,wombats,vergil,colegiata,lincol,smoothe,pride1,carwash1,latrell,bowling3,fylhtq123,pickwick,eider,bubblebox,bunnies1,loquit,slipper1,nutsac,purina,xtutdfhf,plokiju,1qazxs,uhjpysq,zxcvbasdfg,enjoy1,1pumpkin,phantom7,mama22,swordsma,wonderbr,dogdays,milker,u23456,silvan,dfkthbr,slagelse,yeahman,twothree,boston11,wolf100,dannyg,troll1,fynjy123,ghbcnfd,bftest,ballsdeep,bobbyorr,alphasig,cccdemo,fire123,norwest,claire2,august10,lth1108,problemas,sapito,alex06,1rusty,maccom,goirish1,ohyes,bxdumb,nabila,boobear1,rabbit69,princip,alexsander,travail,chantal1,dogggy,greenpea,diablo69,alex2009,bergen09,petticoa,classe,ceilidh,vlad2011,kamakiri,lucidity,qaz321,chileno,cexfhf,99ranger,mcitra,estoppel,volvos60,carter80,webpass,temp12,touareg,fcgbhby,bubba8,sunitha,200190ru,bitch2,shadow23,iluvit,nicole0,ruben1,nikki69,butttt,shocker1,souschef,lopotok01,kantot,corsano,cfnfyf,riverat,makalu,swapna,all4u9,cdtnkfy,ntktgepbr,ronaldo99,thomasj,bmw540i,chrisw,boomba,open321,z1x2c3v4b5n6m7,gaviota,iceman44,frosya,chris100,chris24,cosette,clearwat,micael,boogyman,pussy9,camus1,chumpy,heccrbq,konoplya,chester8,scooter5,ghjgfufylf,giotto,koolkat,zero000,bonita1,ckflrbq,j1964,mandog,18n28n24a,renob,head1,shergar,ringo123,tanita,sex4free,johnny12,halberd,reddevils,biolog,dillinge,fatb0y,c00per,hyperlit,wallace2,spears1,vitamine,buheirf,sloboda,alkash,mooman,marion1,arsenal7,sunder,nokia5610,edifier,pippone,fyfnjkmtdbx,fujimo,pepsi12,kulikova,bolat,duetto,daimon,maddog01,timoshka,ezmoney,desdemon,chesters,aiden,hugues,patrick5,aikman08,robert4,roenick,nyranger,writer1,36169544,foxmulder,118801,kutter,shashank,jamjar,118811,119955,aspirina,dinkus,1sailor,nalgene,19891959,snarf,allie1,cracky,resipsa,45678912,kemerovo,19841989,netware1,alhimik,19801984,nicole123,19761977,51501984,malaka1,montella,peachfuz,jethro1,cypress1,henkie,holdon,esmith,55443322,1friend,quique,bandicoot,statistika,great123,death13,ucht36,master4,67899876,bobsmith,nikko1,jr1234,hillary1,78978978,rsturbo,lzlzdfcz,bloodlust,shadow00,skagen,bambina,yummies,88887777,91328378,matthew4,itdoes,98256518,102938475,alina2002,123123789,fubared,dannys,123456321,nikifor,suck69,newmexico,scubaman,rhbcnb,fifnfy,puffdadd,159357852,dtheyxbr,theman22,212009164,prohor,shirle,nji90okm,newmedia,goose5,roma1995,letssee,iceman11,aksana,wirenut,pimpdady,1212312121,tamplier,pelican1,domodedovo,1928374655,fiction6,duckpond,ybrecz,thwack,onetwo34,gunsmith,murphydo,fallout1,spectre1,jabberwo,jgjesq,turbo6,bobo12,redryder,blackpus,elena1971,danilova,antoin,bobo1234,bobob,bobbobbo,dean1,222222a,jesusgod,matt23,musical1,darkmage,loppol,werrew,josepha,rebel12,toshka,gadfly,hawkwood,alina12,dnomyar,sexaddict,dangit,cool23,yocrack,archimed,farouk,nhfkzkz,lindalou,111zzzzz,ghjatccjh,wethepeople,m123456789,wowsers,kbkbxrf,bulldog5,m_roesel,sissinit,yamoon6,123ewqasd,dangel,miruvor79,kaytee,falcon7,bandit11,dotnet,dannii,arsenal9,miatamx5,1trouble,strip4me,dogpile,sexyred1,rjdfktdf,google10,shortman,crystal7,awesome123,cowdog,haruka,birthday28,jitter,diabolik,boomer12,dknight,bluewate,hockey123,crm0624,blueboys,willy123,jumpup,google2,cobra777,llabesab,vicelord,hopper1,gerryber,remmah,j10e5d4,qqqqqqw,agusti,fre_ak8yj,nahlik,redrobin,scott3,epson1,dumpy,bundao,aniolek,hola123,jergens,itsasecret,maxsam,bluelight,mountai1,bongwater,1london,pepper14,freeuse,dereks,qweqw,fordgt40,rfhfdfy,raider12,hunnybun,compac,splicer,megamon,tuffgong,gymnast1,butter11,modaddy,wapbbs_1,dandelio,soccer77,ghjnbdjcnjzybt,123xyi2,fishead,x002tp00,whodaman,555aaa,oussama,brunodog,technici,pmtgjnbl,qcxdw8ry,schweden,redsox3,throbber,collecto,japan10,dbm123dm,hellhoun,tech1,deadzone,kahlan,wolf123,dethklok,xzsawq,bigguy1,cybrthc,chandle,buck01,qq123123,secreta,williams1,c32649135,delta12,flash33,123joker,spacejam,polopo,holycrap,daman1,tummybed,financia,nusrat,euroline,magicone,jimkirk,ameritec,daniel26,sevenn,topazz,kingpins,dima1991,macdog,spencer5,oi812,geoffre,music11,baffle,123569,usagi,cassiope,polla,lilcrowe,thecakeisalie,vbhjndjhtw,vthokies,oldmans,sophie01,ghoster,penny2,129834,locutus1,meesha,magik,jerry69,daddysgirl,irondesk,andrey12,jasmine123,vepsrfyn,likesdick,1accord,jetboat,grafix,tomuch,showit,protozoa,mosias98,taburetka,blaze420,esenin,anal69,zhv84kv,puissant,charles0,aishwarya,babylon6,bitter1,lenina,raleigh1,lechat,access01,kamilka,fynjy,sparkplu,daisy3112,choppe,zootsuit,1234567j,rubyrose,gorilla9,nightshade,alternativa,cghfdjxybr,snuggles1,10121v,vova1992,leonardo1,dave2,matthewd,vfhfnbr,1986mets,nobull,bacall,mexican1,juanjo,mafia1,boomer22,soylent,edwards1,jordan10,blackwid,alex86,gemini13,lunar2,dctvcjcfnm,malaki,plugger,eagles11,snafu2,1shelly,cintaku,hannah22,tbird1,maks5843,irish88,homer22,amarok,fktrcfylhjdf,lincoln2,acess,gre69kik,need4speed,hightech,core2duo,blunt1,ublhjgjybrf,dragon33,1autopas,autopas1,wwww1,15935746,daniel20,2500aa,massim,1ggggggg,96ford,hardcor1,cobra5,blackdragon,vovan_lt,orochimaru,hjlbntkb,qwertyuiop12,tallen,paradoks,frozenfish,ghjuhfvvbcn,gerri1,nuggett,camilit,doright,trans1,serena1,catch2,bkmyeh,fireston,afhvfwtdn,purple3,figure8,fuckya,scamp1,laranja,ontheoutside,louis123,yellow7,moonwalk,mercury2,tolkein,raide,amenra,a13579,dranreb,5150vh,harish,tracksta,sexking,ozzmosis,katiee,alomar,matrix19,headroom,jahlove,ringding,apollo8,132546,132613,12345672000,saretta,135798,136666,thomas7,136913,onetwothree,hockey33,calida,nefertit,bitwise,tailhook,boop4,kfgecbr,bujhmbujhm,metal69,thedark,meteoro,felicia1,house12,tinuviel,istina,vaz2105,pimp13,toolfan,nina1,tuesday2,maxmotives,lgkp500,locksley,treech,darling1,kurama,aminka,ramin,redhed,dazzler,jager1,stpiliot,cardman,rfvtym,cheeser,14314314,paramoun,samcat,plumpy,stiffie,vsajyjr,panatha,qqq777,car12345,098poi,asdzx,keegan1,furelise,kalifornia,vbhjckfd,beast123,zcfvfzkexifz,harry5,1birdie,96328i,escola,extra330,henry12,gfhfyjqz,14u2nv,max1234,templar1,1dave,02588520,catrin,pangolin,marhaba,latin1,amorcito,dave22,escape1,advance1,yasuhiro,grepw,meetme,orange01,ernes,erdna,zsergn,nautica1,justinb,soundwav,miasma,greg78,nadine1,sexmad,lovebaby,promo1,excel1,babys,dragonma,camry1,sonnenschein,farooq,wazzkaprivet,magal,katinas,elvis99,redsox24,rooney1,chiefy,peggys,aliev,pilsung,mudhen,dontdoit,dennis12,supercal,energia,ballsout,funone,claudiu,brown2,amoco,dabl1125,philos,gjdtkbntkm,servette,13571113,whizzer,nollie,13467982,upiter,12string,bluejay1,silkie,william4,kosta1,143333,connor12,sustanon,06068,corporat,ssnake,laurita,king10,tahoes,arsenal123,sapato,charless,jeanmarc,levent,algerie,marine21,jettas,winsome,dctvgbplf,1701ab,xxxp455w0rd5,lllllll1,ooooooo1,monalis,koufax32,anastasya,debugger,sarita2,jason69,ufkxjyjr,gjlcnfdf,1jerry,daniel10,balinor,sexkitten,death2,qwertasdfgzxcvb,s9te949f,vegeta1,sysman,maxxam,dimabilan,mooose,ilovetit,june23,illest,doesit,mamou,abby12,longjump,transalp,moderato,littleguy,magritte,dilnoza,hawaiiguy,winbig,nemiroff,kokaine,admira,myemail,dream2,browneyes,destiny7,dragonss,suckme1,asa123,andranik,suckem,fleshbot,dandie,timmys,scitra,timdog,hasbeen,guesss,smellyfe,arachne,deutschl,harley88,birthday27,nobody1,papasmur,home1,jonass,bunia3,epatb1,embalm,vfvekmrf,apacer,12345656,estreet,weihnachtsbaum,mrwhite,admin12,kristie1,kelebek,yoda69,socken,tima123,bayern1,fktrcfylth,tamiya,99strenght,andy01,denis2011,19delta,stokecit,aotearoa,stalker2,nicnac,conrad1,popey,agusta,bowl36,1bigfish,mossyoak,1stunner,getinnow,jessejames,gkfnjy,drako,1nissan,egor123,hotness,1hawaii,zxc123456,cantstop,1peaches,madlen,west1234,jeter1,markis,judit,attack1,artemi,silver69,153246,crazy2,green9,yoshimi,1vette,chief123,jasper2,1sierra,twentyon,drstrang,aspirant,yannic,jenna123,bongtoke,slurpy,1sugar,civic97,rusty21,shineon,james19,anna12345,wonderwoman,1kevin,karol1,kanabis,wert21,fktif6115,evil1,kakaha,54gv768,826248s,tyrone1,1winston,sugar2,falcon01,adelya,mopar440,zasxcd,leecher,kinkysex,mercede1,travka,11234567,rebon,geekboy".split(","),
  female_names: "mary,patricia,linda,barbara,elizabeth,jennifer,maria,susan,margaret,dorothy,lisa,nancy,karen,betty,helen,sandra,donna,carol,ruth,sharon,michelle,laura,sarah,kimberly,deborah,jessica,shirley,cynthia,angela,melissa,brenda,amy,anna,rebecca,virginia,kathleen,pamela,martha,debra,amanda,stephanie,carolyn,christine,marie,janet,catherine,frances,ann,joyce,diane,alice,julie,heather,teresa,doris,gloria,evelyn,jean,cheryl,mildred,katherine,joan,ashley,judith,rose,janice,kelly,nicole,judy,christina,kathy,theresa,beverly,denise,tammy,irene,jane,lori,rachel,marilyn,andrea,kathryn,louise,sara,anne,jacqueline,wanda,bonnie,julia,ruby,lois,tina,phyllis,norma,paula,diana,annie,lillian,emily,robin,peggy,crystal,gladys,rita,dawn,connie,florence,tracy,edna,tiffany,carmen,rosa,cindy,grace,wendy,victoria,edith,kim,sherry,sylvia,josephine,thelma,shannon,sheila,ethel,ellen,elaine,marjorie,carrie,charlotte,monica,esther,pauline,emma,juanita,anita,rhonda,hazel,amber,eva,debbie,april,leslie,clara,lucille,jamie,joanne,eleanor,valerie,danielle,megan,alicia,suzanne,michele,gail,bertha,darlene,veronica,jill,erin,geraldine,lauren,cathy,joann,lorraine,lynn,sally,regina,erica,beatrice,dolores,bernice,audrey,yvonne,annette,marion,dana,stacy,ana,renee,ida,vivian,roberta,holly,brittany,melanie,loretta,yolanda,jeanette,laurie,katie,kristen,vanessa,alma,sue,elsie,beth,jeanne,vicki,carla,tara,rosemary,eileen,terri,gertrude,lucy,tonya,ella,stacey,wilma,gina,kristin,jessie,natalie,agnes,vera,charlene,bessie,delores,melinda,pearl,arlene,maureen,colleen,allison,tamara,joy,georgia,constance,lillie,claudia,jackie,marcia,tanya,nellie,minnie,marlene,heidi,glenda,lydia,viola,courtney,marian,stella,caroline,dora,vickie,mattie,maxine,irma,mabel,marsha,myrtle,lena,christy,deanna,patsy,hilda,gwendolyn,jennie,nora,margie,nina,cassandra,leah,penny,kay,priscilla,naomi,carole,olga,billie,dianne,tracey,leona,jenny,felicia,sonia,miriam,velma,becky,bobbie,violet,kristina,toni,misty,mae,shelly,daisy,ramona,sherri,erika,katrina,claire,lindsey,lindsay,geneva,guadalupe,belinda,margarita,sheryl,cora,faye,ada,sabrina,isabel,marguerite,hattie,harriet,molly,cecilia,kristi,brandi,blanche,sandy,rosie,joanna,iris,eunice,angie,inez,lynda,madeline,amelia,alberta,genevieve,monique,jodi,janie,kayla,sonya,jan,kristine,candace,fannie,maryann,opal,alison,yvette,melody,luz,susie,olivia,flora,shelley,kristy,mamie,lula,lola,verna,beulah,antoinette,candice,juana,jeannette,pam,kelli,whitney,bridget,karla,celia,latoya,patty,shelia,gayle,della,vicky,lynne,sheri,marianne,kara,jacquelyn,erma,blanca,myra,leticia,pat,krista,roxanne,angelica,robyn,adrienne,rosalie,alexandra,brooke,bethany,sadie,bernadette,traci,jody,kendra,nichole,rachael,mable,ernestine,muriel,marcella,elena,krystal,angelina,nadine,kari,estelle,dianna,paulette,lora,mona,doreen,rosemarie,desiree,antonia,janis,betsy,christie,freda,meredith,lynette,teri,cristina,eula,leigh,meghan,sophia,eloise,rochelle,gretchen,cecelia,raquel,henrietta,alyssa,jana,gwen,jenna,tricia,laverne,olive,tasha,silvia,elvira,delia,kate,patti,lorena,kellie,sonja,lila,lana,darla,mindy,essie,mandy,lorene,elsa,josefina,jeannie,miranda,dixie,lucia,marta,faith,lela,johanna,shari,camille,tami,shawna,elisa,ebony,melba,ora,nettie,tabitha,ollie,winifred,kristie,alisha,aimee,rena,myrna,marla,tammie,latasha,bonita,patrice,ronda,sherrie,addie,francine,deloris,stacie,adriana,cheri,abigail,celeste,jewel,cara,adele,rebekah,lucinda,dorthy,effie,trina,reba,sallie,aurora,lenora,etta,lottie,kerri,trisha,nikki,estella,francisca,josie,tracie,marissa,karin,brittney,janelle,lourdes,laurel,helene,fern,elva,corinne,kelsey,ina,bettie,elisabeth,aida,caitlin,ingrid,iva,eugenia,christa,goldie,maude,jenifer,therese,dena,lorna,janette,latonya,candy,consuelo,tamika,rosetta,debora,cherie,polly,dina,jewell,fay,jillian,dorothea,nell,trudy,esperanza,patrica,kimberley,shanna,helena,cleo,stefanie,rosario,ola,janine,mollie,lupe,alisa,lou,maribel,susanne,bette,susana,elise,cecile,isabelle,lesley,jocelyn,paige,joni,rachelle,leola,daphne,alta,ester,petra,graciela,imogene,jolene,keisha,lacey,glenna,gabriela,keri,ursula,lizzie,kirsten,shana,adeline,mayra,jayne,jaclyn,gracie,sondra,carmela,marisa,rosalind,charity,tonia,beatriz,marisol,clarice,jeanine,sheena,angeline,frieda,lily,shauna,millie,claudette,cathleen,angelia,gabrielle,autumn,katharine,jodie,staci,lea,christi,justine,elma,luella,margret,dominique,socorro,martina,margo,mavis,callie,bobbi,maritza,lucile,leanne,jeannine,deana,aileen,lorie,ladonna,willa,manuela,gale,selma,dolly,sybil,abby,ivy,dee,winnie,marcy,luisa,jeri,magdalena,ofelia,meagan,audra,matilda,leila,cornelia,bianca,simone,bettye,randi,virgie,latisha,barbra,georgina,eliza,leann,bridgette,rhoda,haley,adela,nola,bernadine,flossie,ila,greta,ruthie,nelda,minerva,lilly,terrie,letha,hilary,estela,valarie,brianna,rosalyn,earline,catalina,ava,mia,clarissa,lidia,corrine,alexandria,concepcion,tia,sharron,rae,dona,ericka,jami,elnora,chandra,lenore,neva,marylou,melisa,tabatha,serena,avis,allie,sofia,jeanie,odessa,nannie,harriett,loraine,penelope,milagros,emilia,benita,allyson,ashlee,tania,esmeralda,eve,pearlie,zelma,malinda,noreen,tameka,saundra,hillary,amie,althea,rosalinda,lilia,alana,clare,alejandra,elinor,lorrie,jerri,darcy,earnestine,carmella,noemi,marcie,liza,annabelle,louisa,earlene,mallory,carlene,nita,selena,tanisha,katy,julianne,lakisha,edwina,maricela,margery,kenya,dollie,roxie,roslyn,kathrine,nanette,charmaine,lavonne,ilene,tammi,suzette,corine,kaye,chrystal,lina,deanne,lilian,juliana,aline,luann,kasey,maryanne,evangeline,colette,melva,lawanda,yesenia,nadia,madge,kathie,ophelia,valeria,nona,mitzi,mari,georgette,claudine,fran,alissa,roseann,lakeisha,susanna,reva,deidre,chasity,sheree,elvia,alyce,deirdre,gena,briana,araceli,katelyn,rosanne,wendi,tessa,berta,marva,imelda,marietta,marci,leonor,arline,sasha,madelyn,janna,juliette,deena,aurelia,josefa,augusta,liliana,lessie,amalia,savannah,anastasia,vilma,natalia,rosella,lynnette,corina,alfreda,leanna,amparo,coleen,tamra,aisha,wilda,karyn,maura,mai,evangelina,rosanna,hallie,erna,enid,mariana,lacy,juliet,jacklyn,freida,madeleine,mara,cathryn,lelia,casandra,bridgett,angelita,jannie,dionne,annmarie,katina,beryl,millicent,katheryn,diann,carissa,maryellen,liz,lauri,helga,gilda,rhea,marquita,hollie,tisha,tamera,angelique,francesca,kaitlin,lolita,florine,rowena,reyna,twila,fanny,janell,ines,concetta,bertie,alba,brigitte,alyson,vonda,pansy,elba,noelle,letitia,deann,brandie,louella,leta,felecia,sharlene,lesa,beverley,isabella,herminia,terra,celina,tori,octavia,jade,denice,germaine,michell,cortney,nelly,doretha,deidra,monika,lashonda,judi,chelsey,antionette,margot,adelaide,leeann,elisha,dessie,libby,kathi,gayla,latanya,mina,mellisa,kimberlee,jasmin,renae,zelda,elda,justina,gussie,emilie,camilla,abbie,rocio,kaitlyn,edythe,ashleigh,selina,lakesha,geri,allene,pamala,michaela,dayna,caryn,rosalia,jacquline,rebeca,marybeth,krystle,iola,dottie,belle,griselda,ernestina,elida,adrianne,demetria,delma,jaqueline,arleen,virgina,retha,fatima,tillie,eleanore,cari,treva,wilhelmina,rosalee,maurine,latrice,jena,taryn,elia,debby,maudie,jeanna,delilah,catrina,shonda,hortencia,theodora,teresita,robbin,danette,delphine,brianne,nilda,danna,cindi,bess,iona,winona,vida,rosita,marianna,racheal,guillermina,eloisa,celestine,caren,malissa,lona,chantel,shellie,marisela,leora,agatha,soledad,migdalia,ivette,christen,athena,janel,veda,pattie,tessie,tera,marilynn,lucretia,karrie,dinah,daniela,alecia,adelina,vernice,shiela,portia,merry,lashawn,dara,tawana,verda,alene,zella,sandi,rafaela,maya,kira,candida,alvina,suzan,shayla,lettie,samatha,oralia,matilde,larissa,vesta,renita,delois,shanda,phillis,lorri,erlinda,cathrine,barb,isabell,ione,gisela,roxanna,mayme,kisha,ellie,mellissa,dorris,dalia,bella,annetta,zoila,reta,reina,lauretta,kylie,christal,pilar,charla,elissa,tiffani,tana,paulina,leota,breanna,jayme,carmel,vernell,tomasa,mandi,dominga,santa,melodie,lura,alexa,tamela,mirna,kerrie,venus,felicita,cristy,carmelita,berniece,annemarie,tiara,roseanne,missy,cori,roxana,pricilla,kristal,jung,elyse,haydee,aletha,bettina,marge,gillian,filomena,zenaida,harriette,caridad,vada,aretha,pearline,marjory,marcela,flor,evette,elouise,alina,damaris,catharine,belva,nakia,marlena,luanne,lorine,karon,dorene,danita,brenna,tatiana,louann,julianna,andria,philomena,lucila,leonora,dovie,romona,mimi,jacquelin,gaye,tonja,misti,chastity,stacia,roxann,micaela,velda,marlys,johnna,aura,ivonne,hayley,nicki,majorie,herlinda,yadira,perla,gregoria,antonette,shelli,mozelle,mariah,joelle,cordelia,josette,chiquita,trista,laquita,georgiana,candi,shanon,hildegard,stephany,magda,karol,gabriella,tiana,roma,richelle,oleta,jacque,idella,alaina,suzanna,jovita,tosha,nereida,marlyn,kyla,delfina,tena,stephenie,sabina,nathalie,marcelle,gertie,darleen,thea,sharonda,shantel,belen,venessa,rosalina,genoveva,clementine,rosalba,renate,renata,georgianna,floy,dorcas,ariana,tyra,theda,mariam,juli,jesica,vikki,verla,roselyn,melvina,jannette,ginny,debrah,corrie,violeta,myrtis,latricia,collette,charleen,anissa,viviana,twyla,nedra,latonia,hellen,fabiola,annamarie,adell,sharyn,chantal,niki,maud,lizette,lindy,kesha,jeana,danelle,charline,chanel,valorie,dortha,cristal,sunny,leone,leilani,gerri,debi,andra,keshia,eulalia,easter,dulce,natividad,linnie,kami,georgie,catina,brook,alda,winnifred,sharla,ruthann,meaghan,magdalene,lissette,adelaida,venita,trena,shirlene,shameka,elizebeth,dian,shanta,latosha,carlotta,windy,rosina,mariann,leisa,jonnie,dawna,cathie,astrid,laureen,janeen,holli,fawn,vickey,teressa,shante,rubye,marcelina,chanda,terese,scarlett,marnie,lulu,lisette,jeniffer,elenor,dorinda,donita,carman,bernita,altagracia,aleta,adrianna,zoraida,lyndsey,janina,starla,phylis,phuong,kyra,charisse,blanch,sanjuanita,rona,nanci,marilee,maranda,brigette,sanjuana,marita,kassandra,joycelyn,felipa,chelsie,bonny,mireya,lorenza,kyong,ileana,candelaria,sherie,lucie,leatrice,lakeshia,gerda,edie,bambi,marylin,lavon,hortense,garnet,evie,tressa,shayna,lavina,kyung,jeanetta,sherrill,shara,phyliss,mittie,anabel,alesia,thuy,tawanda,joanie,tiffanie,lashanda,karissa,enriqueta,daria,daniella,corinna,alanna,abbey,roxane,roseanna,magnolia,lida,joellen,coral,carleen,tresa,peggie,novella,nila,maybelle,jenelle,carina,nova,melina,marquerite,margarette,josephina,evonne,cinthia,albina,toya,tawnya,sherita,myriam,lizabeth,lise,keely,jenni,giselle,cheryle,ardith,ardis,alesha,adriane,shaina,linnea,karolyn,felisha,dori,darci,artie,armida,zola,xiomara,vergie,shamika,nena,nannette,maxie,lovie,jeane,jaimie,inge,farrah,elaina,caitlyn,felicitas,cherly,caryl,yolonda,yasmin,teena,prudence,pennie,nydia,mackenzie,orpha,marvel,lizbeth,laurette,jerrie,hermelinda,carolee,tierra,mirian,meta,melony,kori,jennette,jamila,yoshiko,susannah,salina,rhiannon,joleen,cristine,ashton,aracely,tomeka,shalonda,marti,lacie,kala,jada,ilse,hailey,brittani,zona,syble,sherryl,nidia,marlo,kandice,kandi,alycia,ronna,norene,mercy,ingeborg,giovanna,gemma,christel,audry,zora,vita,trish,stephaine,shirlee,shanika,melonie,mazie,jazmin,inga,hettie,geralyn,fonda,estrella,adella,sarita,rina,milissa,maribeth,golda,evon,ethelyn,enedina,cherise,chana,velva,tawanna,sade,mirta,karie,jacinta,elna,davina,cierra,ashlie,albertha,tanesha,nelle,mindi,lorinda,larue,florene,demetra,dedra,ciara,chantelle,ashly,suzy,rosalva,noelia,lyda,leatha,krystyna,kristan,karri,darline,darcie,cinda,cherrie,awilda,almeda,rolanda,lanette,jerilyn,gisele,evalyn,cyndi,cleta,carin,zina,zena,velia,tanika,charissa,talia,margarete,lavonda,kaylee,kathlene,jonna,irena,ilona,idalia,candis,candance,brandee,anitra,alida,sigrid,nicolette,maryjo,linette,hedwig,christiana,alexia,tressie,modesta,lupita,lita,gladis,evelia,davida,cherri,cecily,ashely,annabel,agustina,wanita,shirly,rosaura,hulda,yetta,verona,thomasina,sibyl,shannan,mechelle,leandra,lani,kylee,kandy,jolynn,ferne,eboni,corene,alysia,zula,nada,moira,lyndsay,lorretta,jammie,hortensia,gaynell,adria,vina,vicenta,tangela,stephine,norine,nella,liana,leslee,kimberely,iliana,glory,felica,emogene,elfriede,eden,eartha,carma,ocie,lennie,kiara,jacalyn,carlota,arielle,otilia,kirstin,kacey,johnetta,joetta,jeraldine,jaunita,elana,dorthea,cami,amada,adelia,vernita,tamar,siobhan,renea,rashida,ouida,nilsa,meryl,kristyn,julieta,danica,breanne,aurea,anglea,sherron,odette,malia,lorelei,leesa,kenna,kathlyn,fiona,charlette,suzie,shantell,sabra,racquel,myong,mira,martine,lucienne,lavada,juliann,elvera,delphia,christiane,charolette,carri,asha,angella,paola,ninfa,leda,stefani,shanell,palma,machelle,lissa,kecia,kathryne,karlene,julissa,jettie,jenniffer,corrina,carolann,alena,rosaria,myrtice,marylee,liane,kenyatta,judie,janey,elmira,eldora,denna,cristi,cathi,zaida,vonnie,viva,vernie,rosaline,mariela,luciana,lesli,karan,felice,deneen,adina,wynona,tarsha,sheron,shanita,shani,shandra,randa,pinkie,nelida,marilou,lyla,laurene,laci,janene,dorotha,daniele,dani,carolynn,carlyn,berenice,ayesha,anneliese,alethea,thersa,tamiko,rufina,oliva,mozell,marylyn,kristian,kathyrn,kasandra,kandace,janae,domenica,debbra,dannielle,chun,arcelia,zenobia,sharen,sharee,lavinia,kacie,jackeline,huong,felisa,emelia,eleanora,cythia,cristin,claribel,anastacia,zulma,zandra,yoko,tenisha,susann,sherilyn,shay,shawanda,romana,mathilda,linsey,keiko,joana,isela,gretta,georgetta,eugenie,desirae,delora,corazon,antonina,anika,willene,tracee,tamatha,nichelle,mickie,maegan,luana,lanita,kelsie,edelmira,bree,afton,teodora,tamie,shena,linh,keli,kaci,danyelle,arlette,albertine,adelle,tiffiny,simona,nicolasa,nichol,nakisha,maira,loreen,kizzy,fallon,christene,bobbye,ying,vincenza,tanja,rubie,roni,queenie,margarett,kimberli,irmgard,idell,hilma,evelina,esta,emilee,dennise,dania,carie,risa,rikki,particia,masako,luvenia,loree,loni,lien,gigi,florencia,denita,billye,tomika,sharita,rana,nikole,neoma,margarite,madalyn,lucina,laila,kali,jenette,gabriele,evelyne,elenora,clementina,alejandrina,zulema,violette,vannessa,thresa,retta,patience,noella,nickie,jonell,chaya,camelia,bethel,anya,suzann,mila,lilla,laverna,keesha,kattie,georgene,eveline,estell,elizbeth,vivienne,vallie,trudie,stephane,magaly,madie,kenyetta,karren,janetta,hermine,drucilla,debbi,celestina,candie,britni,beckie,amina,zita,yolande,vivien,vernetta,trudi,pearle,patrina,ossie,nicolle,loyce,letty,katharina,joselyn,jonelle,jenell,iesha,heide,florinda,florentina,elodia,dorine,brunilda,brigid,ashli,ardella,twana,tarah,shavon,serina,rayna,ramonita,margurite,lucrecia,kourtney,kati,jesenia,crista,ayana,alica,alia,vinnie,suellen,romelia,rachell,olympia,michiko,kathaleen,jolie,jessi,janessa,hana,elease,carletta,britany,shona,salome,rosamond,regena,raina,ngoc,nelia,louvenia,lesia,latrina,laticia,larhonda,jina,jacki,emmy,deeann,coretta,arnetta,thalia,shanice,neta,mikki,micki,lonna,leana,lashunda,kiley,joye,jacqulyn,ignacia,hyun,hiroko,henriette,elayne,delinda,dahlia,coreen,consuela,conchita,babette,ayanna,anette,albertina,shawnee,shaneka,quiana,pamelia,merri,merlene,margit,kiesha,kiera,kaylene,jodee,jenise,erlene,emmie,dalila,daisey,casie,belia,babara,versie,vanesa,shelba,shawnda,nikia,naoma,marna,margeret,madaline,lawana,kindra,jutta,jazmine,janett,hannelore,glendora,gertrud,garnett,freeda,frederica,florance,flavia,carline,beverlee,anjanette,valda,tamala,shonna,sarina,oneida,merilyn,marleen,lurline,lenna,katherin,jeni,gracia,glady,farah,enola,dominque,devona,delana,cecila,caprice,alysha,alethia,vena,theresia,tawny,shakira,samara,sachiko,rachele,pamella,marni,mariel,maren,malisa,ligia,lera,latoria,larae,kimber,kathern,karey,jennefer,janeth,halina,fredia,delisa,debroah,ciera,angelika,andree,altha,vivan,terresa,tanna,sudie,signe,salena,ronni,rebbecca,myrtie,malika,maida,leonarda,kayleigh,ethyl,ellyn,dayle,cammie,brittni,birgit,avelina,asuncion,arianna,akiko,venice,tyesha,tonie,tiesha,takisha,steffanie,sindy,meghann,manda,macie,kellye,kellee,joslyn,inger,indira,glinda,glennis,fernanda,faustina,eneida,elicia,digna,dell,arletta,willia,tammara,tabetha,sherrell,sari,rebbeca,pauletta,natosha,nakita,mammie,kenisha,kazuko,kassie,earlean,daphine,corliss,clotilde,carolyne,bernetta,augustina,audrea,annis,annabell,tennille,tamica,selene,rosana,regenia,qiana,markita,macy,leeanne,laurine,jessenia,janita,georgine,genie,emiko,elvie,deandra,dagmar,corie,collen,cherish,romaine,porsha,pearlene,micheline,merna,margorie,margaretta,lore,jenine,hermina,fredericka,elke,drusilla,dorathy,dione,celena,brigida,allegra,tamekia,synthia,sook,slyvia,rosann,reatha,raye,marquetta,margart,ling,layla,kymberly,kiana,kayleen,katlyn,karmen,joella,emelda,eleni,detra,clemmie,cheryll,chantell,cathey,arnita,arla,angle,angelic,alyse,zofia,thomasine,tennie,sherly,sherley,sharyl,remedios,petrina,nickole,myung,myrle,mozella,louanne,lisha,latia,krysta,julienne,jeanene,jacqualine,isaura,gwenda,earleen,cleopatra,carlie,audie,antonietta,alise,verdell,tomoko,thao,talisha,shemika,savanna,santina,rosia,raeann,odilia,nana,minna,magan,lynelle,karma,joeann,ivana,inell,ilana,gudrun,dreama,crissy,chante,carmelina,arvilla,annamae,alvera,aleida,yanira,vanda,tianna,stefania,shira,nicol,nancie,monserrate,melynda,melany,lovella,laure,kacy,jacquelynn,hyon,gertha,eliana,christena,christeen,charise,caterina,carley,candyce,arlena,ammie,willette,vanita,tuyet,syreeta,penney,nyla,maryam,marya,magen,ludie,loma,livia,lanell,kimberlie,julee,donetta,diedra,denisha,deane,dawne,clarine,cherryl,bronwyn,alla,valery,tonda,sueann,soraya,shoshana,shela,sharleen,shanelle,nerissa,meridith,mellie,maye,maple,magaret,lili,leonila,leonie,leeanna,lavonia,lavera,kristel,kathey,kathe,jann,ilda,hildred,hildegarde,genia,fumiko,evelin,ermelinda,elly,dung,doloris,dionna,danae,berneice,annice,alix,verena,verdie,shawnna,shawana,shaunna,rozella,randee,ranae,milagro,lynell,luise,loida,lisbeth,karleen,junita,jona,isis,hyacinth,hedy,gwenn,ethelene,erline,donya,domonique,delicia,dannette,cicely,branda,blythe,bethann,ashlyn,annalee,alline,yuko,vella,trang,towanda,tesha,sherlyn,narcisa,miguelina,meri,maybell,marlana,marguerita,madlyn,lory,loriann,leonore,leighann,laurice,latesha,laronda,katrice,kasie,kaley,jadwiga,glennie,gearldine,francina,epifania,dyan,dorie,diedre,denese,demetrice,delena,cristie,cleora,catarina,carisa,barbera,almeta,trula,tereasa,solange,sheilah,shavonne,sanora,rochell,mathilde,margareta,maia,lynsey,lawanna,launa,kena,keena,katia,glynda,gaylene,elvina,elanor,danuta,danika,cristen,cordie,coletta,clarita,carmon,brynn,azucena,aundrea,angele,verlie,verlene,tamesha,silvana,sebrina,samira,reda,raylene,penni,norah,noma,mireille,melissia,maryalice,laraine,kimbery,karyl,karine,jolanda,johana,jesusa,jaleesa,jacquelyne,iluminada,hilaria,hanh,gennie,francie,floretta,exie,edda,drema,delpha,barbar,assunta,ardell,annalisa,alisia,yukiko,yolando,wonda,waltraud,veta,temeka,tameika,shirleen,shenita,piedad,ozella,mirtha,marilu,kimiko,juliane,jenice,janay,jacquiline,hilde,elois,echo,devorah,chau,brinda,betsey,arminda,aracelis,apryl,annett,alishia,veola,usha,toshiko,theola,tashia,talitha,shery,renetta,reiko,rasheeda,obdulia,mika,melaine,meggan,marlen,marget,marceline,mana,magdalen,librada,lezlie,latashia,lasandra,kelle,isidra,inocencia,gwyn,francoise,erminia,erinn,dimple,devora,criselda,armanda,arie,ariane,angelena,aliza,adriene,adaline,xochitl,twanna,tomiko,tamisha,taisha,susy,rutha,rhona,noriko,natashia,merrie,marinda,mariko,margert,loris,lizzette,leisha,kaila,joannie,jerrica,jene,jannet,janee,jacinda,herta,elenore,doretta,delaine,daniell,claudie,britta,apolonia,amberly,alease,yuri,waneta,tomi,sharri,sandie,roselle,reynalda,raguel,phylicia,patria,olimpia,odelia,mitzie,minda,mignon,mica,mendy,marivel,maile,lynetta,lavette,lauryn,latrisha,lakiesha,kiersten,kary,josphine,jolyn,jetta,janise,jacquie,ivelisse,glynis,gianna,gaynelle,danyell,danille,dacia,coralee,cher,ceola,arianne,aleshia,yung,williemae,trinh,thora,sherika,shemeka,shaunda,roseline,ricki,melda,mallie,lavonna,latina,laquanda,lala,lachelle,klara,kandis,johna,jeanmarie,jaye,grayce,gertude,emerita,ebonie,clorinda,ching,chery,carola,breann,blossom,bernardine,becki,arletha,argelia,alita,yulanda,yessenia,tobi,tasia,sylvie,shirl,shirely,shella,shantelle,sacha,rebecka,providencia,paulene,misha,miki,marline,marica,lorita,latoyia,lasonya,kerstin,kenda,keitha,kathrin,jaymie,gricelda,ginette,eryn,elina,elfrieda,danyel,cheree,chanelle,barrie,aurore,annamaria,alleen,ailene,aide,yasmine,vashti,treasa,tiffaney,sheryll,sharie,shanae,raisa,neda,mitsuko,mirella,milda,maryanna,maragret,mabelle,luetta,lorina,letisha,latarsha,lanelle,lajuana,krissy,karly,karena,jessika,jerica,jeanelle,jalisa,jacelyn,izola,euna,etha,domitila,dominica,daina,creola,carli,camie,brittny,ashanti,anisha,aleen,adah,yasuko,valrie,tona,tinisha,terisa,taneka,simonne,shalanda,serita,ressie,refugia,olene,margherita,mandie,maire,lyndia,luci,lorriane,loreta,leonia,lavona,lashawnda,lakia,kyoko,krystina,krysten,kenia,kelsi,jeanice,isobel,georgiann,genny,felicidad,eilene,deloise,deedee,conception,clora,cherilyn,calandra,armandina,anisa,tiera,theressa,stephania,sima,shyla,shonta,shera,shaquita,shala,rossana,nohemi,nery,moriah,melita,melida,melani,marylynn,marisha,mariette,malorie,madelene,ludivina,loria,lorette,loralee,lianne,lavenia,laurinda,lashon,kimi,keila,katelynn,jone,joane,jayna,janella,hertha,francene,elinore,despina,delsie,deedra,clemencia,carolin,bulah,brittanie,blondell,bibi,beaulah,beata,annita,agripina,virgen,valene,twanda,tommye,tarra,tari,tammera,shakia,sadye,ruthanne,rochel,rivka,pura,nenita,natisha,ming,merrilee,melodee,marvis,lucilla,leena,laveta,larita,lanie,keren,ileen,georgeann,genna,frida,eufemia,emely,edyth,deonna,deadra,darlena,chanell,cathern,cassondra,cassaundra,bernarda,berna,arlinda,anamaria,vertie,valeri,torri,stasia,sherise,sherill,sanda,ruthe,rosy,robbi,ranee,quyen,pearly,palmira,onita,nisha,niesha,nida,merlyn,mayola,marylouise,marth,margene,madelaine,londa,leontine,leoma,leia,lauralee,lanora,lakita,kiyoko,keturah,katelin,kareen,jonie,johnette,jenee,jeanett,izetta,hiedi,heike,hassie,giuseppina,georgann,fidela,fernande,elwanda,ellamae,eliz,dusti,dotty,cyndy,coralie,celesta,alverta,xenia,wava,vanetta,torrie,tashina,tandy,tambra,tama,stepanie,shila,shaunta,sharan,shaniqua,shae,setsuko,serafina,sandee,rosamaria,priscila,olinda,nadene,muoi,michelina,mercedez,maryrose,marcene,magali,mafalda,lannie,kayce,karoline,kamilah,kamala,justa,joline,jennine,jacquetta,iraida,georgeanna,franchesca,emeline,elane,ehtel,earlie,dulcie,dalene,classie,chere,charis,caroyln,carmina,carita,bethanie,ayako,arica,alysa,alessandra,akilah,adrien,zetta,youlanda,yelena,yahaira,xuan,wendolyn,tijuana,terina,teresia,suzi,sherell,shavonda,shaunte,sharda,shakita,sena,ryann,rubi,riva,reginia,rachal,parthenia,pamula,monnie,monet,michaele,melia,malka,maisha,lisandra,lekisha,lean,lakendra,krystin,kortney,kizzie,kittie,kera,kendal,kemberly,kanisha,julene,jule,johanne,jamee,halley,gidget,fredricka,fleta,fatimah,eusebia,elza,eleonore,dorthey,doria,donella,dinorah,delorse,claretha,christinia,charlyn,bong,belkis,azzie,andera,aiko,adena,yajaira,vania,ulrike,toshia,tifany,stefany,shizue,shenika,shawanna,sharolyn,sharilyn,shaquana,shantay,rozanne,roselee,remona,reanna,raelene,phung,petronila,natacha,nancey,myrl,miyoko,miesha,merideth,marvella,marquitta,marhta,marchelle,lizeth,libbie,lahoma,ladawn,kina,katheleen,katharyn,karisa,kaleigh,junie,julieann,johnsie,janean,jaimee,jackqueline,hisako,herma,helaine,gwyneth,gita,eustolia,emelina,elin,edris,donnette,donnetta,dierdre,denae,darcel,clarisa,cinderella,chia,charlesetta,charita,celsa,cassy,cassi,carlee,bruna,brittaney,brande,billi,antonetta,angla,angelyn,analisa,alane,wenona,wendie,veronique,vannesa,tobie,tempie,sumiko,sulema,somer,sheba,sharice,shanel,shalon,rosio,roselia,renay,rema,reena,ozie,oretha,oralee,ngan,nakesha,milly,marybelle,margrett,maragaret,manie,lurlene,lillia,lieselotte,lavelle,lashaunda,lakeesha,kaycee,kalyn,joya,joette,jenae,janiece,illa,grisel,glayds,genevie,gala,fredda,eleonor,debera,deandrea,corrinne,cordia,contessa,colene,cleotilde,chantay,cecille,beatris,azalee,arlean,ardath,anjelica,anja,alfredia,aleisha,zada,yuonne,xiao,willodean,vennie,vanna,tyisha,tova,torie,tonisha,tilda,tien,sirena,sherril,shanti,shan,senaida,samella,robbyn,renda,reita,phebe,paulita,nobuko,nguyet,neomi,mikaela,melania,maximina,marg,maisie,lynna,lilli,lashaun,lakenya,lael,kirstie,kathline,kasha,karlyn,karima,jovan,josefine,jennell,jacqui,jackelyn,hien,grazyna,florrie,floria,eleonora,dwana,dorla,delmy,deja,dede,dann,crysta,clelia,claris,chieko,cherlyn,cherelle,charmain,chara,cammy,arnette,ardelle,annika,amiee,amee,allena,yvone,yuki,yoshie,yevette,yael,willetta,voncile,venetta,tula,tonette,timika,temika,telma,teisha,taren,stacee,shawnta,saturnina,ricarda,pasty,onie,nubia,marielle,mariella,marianela,mardell,luanna,loise,lisabeth,lindsy,lilliana,lilliam,lelah,leigha,leanora,kristeen,khalilah,keeley,kandra,junko,joaquina,jerlene,jani,jamika,hsiu,hermila,genevive,evia,eugena,emmaline,elfreda,elene,donette,delcie,deeanna,darcey,clarinda,cira,chae,celinda,catheryn,casimira,carmelia,camellia,breana,bobette,bernardina,bebe,basilia,arlyne,amal,alayna,zonia,zenia,yuriko,yaeko,wynell,willena,vernia,tora,terrilyn,terica,tenesha,tawna,tajuana,taina,stephnie,sona,sina,shondra,shizuko,sherlene,sherice,sharika,rossie,rosena,rima,rheba,renna,natalya,nancee,melodi,meda,matha,marketta,maricruz,marcelene,malvina,luba,louetta,leida,lecia,lauran,lashawna,laine,khadijah,katerine,kasi,kallie,julietta,jesusita,jestine,jessia,jeffie,janyce,isadora,georgianne,fidelia,evita,eura,eulah,estefana,elsy,eladia,dodie,denisse,deloras,delila,daysi,crystle,concha,claretta,charlsie,charlena,carylon,bettyann,asley,ashlea,amira,agueda,agnus,yuette,vinita,victorina,tynisha,treena,toccara,tish,thomasena,tegan,soila,shenna,sharmaine,shantae,shandi,saran,sarai,sana,rosette,rolande,regine,otelia,olevia,nicholle,necole,naida,myrta,myesha,mitsue,minta,mertie,margy,mahalia,madalene,loura,lorean,lesha,leonida,lenita,lavone,lashell,lashandra,lamonica,kimbra,katherina,karry,kanesha,jong,jeneva,jaquelyn,gilma,ghislaine,gertrudis,fransisca,fermina,ettie,etsuko,ellan,elidia,edra,dorethea,doreatha,denyse,deetta,daine,cyrstal,corrin,cayla,carlita,camila,burma,bula,buena,barabara,avril,alaine,zana,wilhemina,wanetta,verline,vasiliki,tonita,tisa,teofila,tayna,taunya,tandra,takako,sunni,suanne,sixta,sharell,seema,rosenda,robena,raymonde,pamila,ozell,neida,mistie,micha,merissa,maurita,maryln,maryetta,marcell,malena,makeda,lovetta,lourie,lorrine,lorilee,laurena,lashay,larraine,laree,lacresha,kristle,keva,keira,karole,joie,jinny,jeannetta,jama,heidy,gilberte,gema,faviola,evelynn,enda,elli,ellena,divina,dagny,collene,codi,cindie,chassidy,chasidy,catrice,catherina,cassey,caroll,carlena,candra,calista,bryanna,britteny,beula,bari,audrie,audria,ardelia,annelle,angila,alona,allyn".split(","),
  surnames: "smith,johnson,williams,jones,brown,davis,miller,wilson,moore,taylor,anderson,jackson,white,harris,martin,thompson,garcia,martinez,robinson,clark,rodriguez,lewis,lee,walker,hall,allen,young,hernandez,king,wright,lopez,hill,green,adams,baker,gonzalez,nelson,carter,mitchell,perez,roberts,turner,phillips,campbell,parker,evans,edwards,collins,stewart,sanchez,morris,rogers,reed,cook,morgan,bell,murphy,bailey,rivera,cooper,richardson,cox,howard,ward,torres,peterson,gray,ramirez,watson,brooks,sanders,price,bennett,wood,barnes,ross,henderson,coleman,jenkins,perry,powell,long,patterson,hughes,flores,washington,butler,simmons,foster,gonzales,bryant,alexander,griffin,diaz,hayes,myers,ford,hamilton,graham,sullivan,wallace,woods,cole,west,owens,reynolds,fisher,ellis,harrison,gibson,mcdonald,cruz,marshall,ortiz,gomez,murray,freeman,wells,webb,simpson,stevens,tucker,porter,hicks,crawford,boyd,mason,morales,kennedy,warren,dixon,ramos,reyes,burns,gordon,shaw,holmes,rice,robertson,hunt,black,daniels,palmer,mills,nichols,grant,knight,ferguson,stone,hawkins,dunn,perkins,hudson,spencer,gardner,stephens,payne,pierce,berry,matthews,arnold,wagner,willis,watkins,olson,carroll,duncan,snyder,hart,cunningham,lane,andrews,ruiz,harper,fox,riley,armstrong,carpenter,weaver,greene,elliott,chavez,sims,peters,kelley,franklin,lawson,fields,gutierrez,schmidt,carr,vasquez,castillo,wheeler,chapman,montgomery,richards,williamson,johnston,banks,meyer,bishop,mccoy,howell,alvarez,morrison,hansen,fernandez,garza,harvey,burton,nguyen,jacobs,reid,fuller,lynch,garrett,romero,welch,larson,frazier,burke,hanson,mendoza,moreno,bowman,medina,fowler,brewer,hoffman,carlson,silva,pearson,holland,fleming,jensen,vargas,byrd,davidson,hopkins,herrera,wade,soto,walters,neal,caldwell,lowe,jennings,barnett,graves,jimenez,horton,shelton,barrett,obrien,castro,sutton,mckinney,lucas,miles,rodriquez,chambers,holt,lambert,fletcher,watts,bates,hale,rhodes,pena,beck,newman,haynes,mcdaniel,mendez,bush,vaughn,parks,dawson,santiago,norris,hardy,steele,curry,powers,schultz,barker,guzman,page,munoz,ball,keller,chandler,weber,walsh,lyons,ramsey,wolfe,schneider,mullins,benson,sharp,bowen,barber,cummings,hines,baldwin,griffith,valdez,hubbard,salazar,reeves,warner,stevenson,burgess,santos,tate,cross,garner,mann,mack,moss,thornton,mcgee,farmer,delgado,aguilar,vega,glover,manning,cohen,harmon,rodgers,robbins,newton,blair,higgins,ingram,reese,cannon,strickland,townsend,potter,goodwin,walton,rowe,hampton,ortega,patton,swanson,goodman,maldonado,yates,becker,erickson,hodges,rios,conner,adkins,webster,malone,hammond,flowers,cobb,moody,quinn,pope,osborne,mccarthy,guerrero,estrada,sandoval,gibbs,gross,fitzgerald,stokes,doyle,saunders,wise,colon,gill,alvarado,greer,padilla,waters,nunez,ballard,schwartz,mcbride,houston,christensen,klein,pratt,briggs,parsons,mclaughlin,zimmerman,buchanan,moran,copeland,pittman,brady,mccormick,holloway,brock,poole,logan,bass,marsh,drake,wong,jefferson,morton,abbott,sparks,norton,huff,massey,figueroa,carson,bowers,roberson,barton,tran,lamb,harrington,boone,cortez,clarke,mathis,singleton,wilkins,cain,underwood,hogan,mckenzie,collier,luna,phelps,mcguire,bridges,wilkerson,nash,summers,atkins,wilcox,pitts,conley,marquez,burnett,cochran,chase,davenport,hood,gates,ayala,sawyer,vazquez,dickerson,hodge,acosta,flynn,espinoza,nicholson,monroe,wolf,morrow,whitaker,oconnor,skinner,ware,molina,kirby,huffman,gilmore,dominguez,oneal,lang,combs,kramer,hancock,gallagher,gaines,shaffer,wiggins,mathews,mcclain,fischer,wall,melton,hensley,bond,dyer,grimes,contreras,wyatt,baxter,snow,mosley,shepherd,larsen,hoover,beasley,petersen,whitehead,meyers,garrison,shields,horn,savage,olsen,schroeder,hartman,woodard,mueller,kemp,deleon,booth,patel,calhoun,wiley,eaton,cline,navarro,harrell,humphrey,parrish,duran,hutchinson,hess,dorsey,bullock,robles,beard,dalton,avila,rich,blackwell,johns,blankenship,trevino,salinas,campos,pruitt,callahan,montoya,hardin,guerra,mcdowell,stafford,gallegos,henson,wilkinson,booker,merritt,atkinson,orr,decker,hobbs,tanner,knox,pacheco,stephenson,glass,rojas,serrano,marks,hickman,sweeney,strong,mcclure,conway,roth,maynard,farrell,lowery,hurst,nixon,weiss,trujillo,ellison,sloan,juarez,winters,mclean,boyer,villarreal,mccall,gentry,carrillo,ayers,lara,sexton,pace,hull,leblanc,browning,velasquez,leach,chang,sellers,herring,noble,foley,bartlett,mercado,landry,durham,walls,barr,mckee,bauer,rivers,bradshaw,pugh,velez,rush,estes,dodson,morse,sheppard,weeks,camacho,bean,barron,livingston,middleton,spears,branch,blevins,chen,kerr,mcconnell,hatfield,harding,solis,frost,giles,blackburn,pennington,woodward,finley,mcintosh,koch,mccullough,blanchard,rivas,brennan,mejia,kane,benton,buckley,valentine,maddox,russo,mcknight,buck,moon,mcmillan,crosby,berg,dotson,mays,roach,chan,richmond,meadows,faulkner,oneill,knapp,kline,ochoa,jacobson,gay,hendricks,horne,shepard,hebert,cardenas,mcintyre,waller,holman,donaldson,cantu,morin,gillespie,fuentes,tillman,bentley,peck,key,salas,rollins,gamble,dickson,santana,cabrera,cervantes,howe,hinton,hurley,spence,zamora,yang,mcneil,suarez,petty,gould,mcfarland,sampson,carver,bray,macdonald,stout,hester,melendez,dillon,farley,hopper,galloway,potts,joyner,stein,aguirre,osborn,mercer,bender,franco,rowland,sykes,pickett,sears,mayo,dunlap,hayden,wilder,mckay,coffey,mccarty,ewing,cooley,vaughan,bonner,cotton,holder,stark,ferrell,cantrell,fulton,lott,calderon,pollard,hooper,burch,mullen,fry,riddle,levy,duke,odonnell,britt,daugherty,berger,dillard,alston,frye,riggs,chaney,odom,duffy,fitzpatrick,valenzuela,mayer,alford,mcpherson,acevedo,barrera,cote,reilly,compton,mooney,mcgowan,craft,clemons,wynn,nielsen,baird,stanton,snider,rosales,bright,witt,hays,holden,rutledge,kinney,clements,castaneda,slater,hahn,burks,delaney,pate,lancaster,sharpe,whitfield,talley,macias,burris,ratliff,mccray,madden,kaufman,beach,goff,cash,bolton,mcfadden,levine,byers,kirkland,kidd,workman,carney,mcleod,holcomb,finch,sosa,haney,franks,sargent,nieves,downs,rasmussen,bird,hewitt,foreman,valencia,oneil,delacruz,vinson,dejesus,hyde,forbes,gilliam,guthrie,wooten,huber,barlow,boyle,mcmahon,buckner,rocha,puckett,langley,knowles,cooke,velazquez,whitley,vang,shea,rouse,hartley,mayfield,elder,rankin,hanna,cowan,lucero,arroyo,slaughter,haas,oconnell,minor,boucher,archer,boggs,dougherty,andersen,newell,crowe,wang,friedman,bland,swain,holley,pearce,childs,yarbrough,galvan,proctor,meeks,lozano,mora,rangel,bacon,villanueva,schaefer,rosado,helms,boyce,goss,stinson,ibarra,hutchins,covington,crowley,hatcher,mackey,bunch,womack,polk,dodd,childress,childers,villa,springer,mahoney,dailey,belcher,lockhart,griggs,costa,brandt,walden,moser,tatum,mccann,akers,lutz,pryor,orozco,mcallister,lugo,davies,shoemaker,rutherford,newsome,magee,chamberlain,blanton,simms,godfrey,flanagan,crum,cordova,escobar,downing,sinclair,donahue,krueger,mcginnis,gore,farris,webber,corbett,andrade,starr,lyon,yoder,hastings,mcgrath,spivey,krause,harden,crabtree,kirkpatrick,arrington,ritter,mcghee,bolden,maloney,gagnon,dunbar,ponce,pike,mayes,beatty,mobley,kimball,butts,montes,eldridge,braun,hamm,gibbons,moyer,manley,herron,plummer,elmore,cramer,rucker,pierson,fontenot,rubio,goldstein,elkins,wills,novak,hickey,worley,gorman,katz,dickinson,broussard,woodruff,crow,britton,nance,lehman,bingham,zuniga,whaley,shafer,coffman,steward,delarosa,neely,mata,davila,mccabe,kessler,hinkle,welsh,pagan,goldberg,goins,crouch,cuevas,quinones,mcdermott,hendrickson,samuels,denton,bergeron,ivey,locke,haines,snell,hoskins,byrne,arias,corbin,beltran,chappell,downey,dooley,tuttle,couch,payton,mcelroy,crockett,groves,cartwright,dickey,mcgill,dubois,muniz,tolbert,dempsey,cisneros,sewell,latham,vigil,tapia,rainey,norwood,stroud,meade,tipton,kuhn,hilliard,bonilla,teague,gunn,greenwood,correa,reece,pineda,phipps,frey,kaiser,ames,gunter,schmitt,milligan,espinosa,bowden,vickers,lowry,pritchard,costello,piper,mcclellan,lovell,sheehan,hatch,dobson,singh,jeffries,hollingsworth,sorensen,meza,fink,donnelly,burrell,tomlinson,colbert,billings,ritchie,helton,sutherland,peoples,mcqueen,thomason,givens,crocker,vogel,robison,dunham,coker,swartz,keys,ladner,richter,hargrove,edmonds,brantley,albright,murdock,boswell,muller,quintero,padgett,kenney,daly,connolly,inman,quintana,lund,barnard,villegas,simons,huggins,tidwell,sanderson,bullard,mcclendon,duarte,draper,marrero,dwyer,abrams,stover,goode,fraser,crews,bernal,godwin,conklin,mcneal,baca,esparza,crowder,bower,brewster,mcneill,rodrigues,leal,coates,raines,mccain,mccord,miner,holbrook,swift,dukes,carlisle,aldridge,ackerman,starks,ricks,holliday,ferris,hairston,sheffield,lange,fountain,doss,betts,kaplan,carmichael,bloom,ruffin,penn,kern,bowles,sizemore,larkin,dupree,seals,metcalf,hutchison,henley,farr,mccauley,hankins,gustafson,curran,waddell,ramey,cates,pollock,cummins,messer,heller,funk,cornett,palacios,galindo,cano,hathaway,pham,enriquez,salgado,pelletier,painter,wiseman,blount,feliciano,houser,doherty,mead,mcgraw,swan,capps,blanco,blackmon,thomson,mcmanus,burkett,gleason,dickens,cormier,voss,rushing,rosenberg,hurd,dumas,benitez,arellano,marin,caudill,bragg,jaramillo,huerta,gipson,colvin,biggs,vela,platt,cassidy,tompkins,mccollum,dolan,daley,crump,sneed,kilgore,grove,grimm,davison,brunson,prater,marcum,devine,dodge,stratton,rosas,choi,tripp,ledbetter,hightower,feldman,epps,yeager,posey,scruggs,cope,stubbs,richey,overton,trotter,sprague,cordero,butcher,stiles,burgos,woodson,horner,bassett,purcell,haskins,akins,ziegler,spaulding,hadley,grubbs,sumner,murillo,zavala,shook,lockwood,driscoll,dahl,thorpe,redmond,putnam,mcwilliams,mcrae,romano,joiner,sadler,hedrick,hager,hagen,fitch,coulter,thacker,mansfield,langston,guidry,ferreira,corley,conn,rossi,lackey,baez,saenz,mcnamara,mcmullen,mckenna,mcdonough,link,engel,browne,roper,peacock,eubanks,drummond,stringer,pritchett,parham,mims,landers,grayson,schafer,egan,timmons,ohara,keen,hamlin,finn,cortes,mcnair,nadeau,moseley,michaud,rosen,oakes,kurtz,jeffers,calloway,beal,bautista,winn,suggs,stern,stapleton,lyles,laird,montano,dawkins,hagan,goldman,bryson,barajas,lovett,segura,metz,lockett,langford,hinson,eastman,hooks,smallwood,shapiro,crowell,whalen,triplett,chatman,aldrich,cahill,youngblood,ybarra,stallings,sheets,reeder,connelly,bateman,abernathy,winkler,wilkes,masters,hackett,granger,gillis,schmitz,sapp,napier,souza,lanier,gomes,weir,otero,ledford,burroughs,babcock,ventura,siegel,dugan,bledsoe,atwood,wray,varner,spangler,anaya,staley,kraft,fournier,belanger,wolff,thorne,bynum,burnette,boykin,swenson,purvis,pina,khan,duvall,darby,xiong,kauffman,healy,engle,benoit,valle,steiner,spicer,shaver,randle,lundy,chin,calvert,staton,neff,kearney,darden,oakley,medeiros,mccracken,crenshaw,perdue,dill,whittaker,tobin,washburn,hogue,goodrich,easley,bravo,dennison,shipley,kerns,jorgensen,crain,villalobos,maurer,longoria,keene,coon,witherspoon,staples,pettit,kincaid,eason,madrid,echols,lusk,stahl,currie,thayer,shultz,mcnally,seay,maher,gagne,barrow,nava,moreland,honeycutt,hearn,diggs,caron,whitten,westbrook,stovall,ragland,munson,meier,looney,kimble,jolly,hobson,goddard,culver,burr,presley,negron,connell,tovar,huddleston,ashby,salter,root,pendleton,oleary,nickerson,myrick,judd,jacobsen,bain,adair,starnes,matos,busby,herndon,hanley,bellamy,doty,bartley,yazzie,rowell,parson,gifford,cullen,christiansen,benavides,barnhart,talbot,mock,crandall,connors,bonds,whitt,gage,bergman,arredondo,addison,lujan,dowdy,jernigan,huynh,bouchard,dutton,rhoades,ouellette,kiser,herrington,hare,blackman,babb,allred,rudd,paulson,ogden,koenig,geiger,begay,parra,lassiter,hawk,esposito,waldron,ransom,prather,chacon,vick,sands,roark,parr,mayberry,greenberg,coley,bruner,whitman,skaggs,shipman,leary,hutton,romo,medrano,ladd,kruse,askew,schulz,alfaro,tabor,mohr,gallo,bermudez,pereira,bliss,reaves,flint,comer,woodall,naquin,guevara,delong,carrier,pickens,tilley,schaffer,knutson,fenton,doran,vogt,vann,prescott,mclain,landis,corcoran,zapata,hyatt,hemphill,faulk,dove,boudreaux,aragon,whitlock,trejo,tackett,shearer,saldana,hanks,mckinnon,koehler,bourgeois,keyes,goodson,foote,lunsford,goldsmith,flood,winslow,sams,reagan,mccloud,hough,esquivel,naylor,loomis,coronado,ludwig,braswell,bearden,huang,fagan,ezell,edmondson,cronin,nunn,lemon,guillory,grier,dubose,traylor,ryder,dobbins,coyle,aponte,whitmore,smalls,rowan,malloy,cardona,braxton,borden,humphries,carrasco,ruff,metzger,huntley,hinojosa,finney,madsen,ernst,dozier,burkhart,bowser,peralta,daigle,whittington,sorenson,saucedo,roche,redding,fugate,avalos,waite,lind,huston,hawthorne,hamby,boyles,boles,regan,faust,crook,beam,barger,hinds,gallardo,willoughby,willingham,eckert,busch,zepeda,worthington,tinsley,hoff,hawley,carmona,varela,rector,newcomb,kinsey,dube,whatley,ragsdale,bernstein,becerra,yost,mattson,felder,cheek,handy,grossman,gauthier,escobedo,braden,beckman,mott,hillman,flaherty,dykes,stockton,stearns,lofton,coats,cavazos,beavers,barrios,tang,mosher,cardwell,coles,burnham,weller,lemons,beebe,aguilera,parnell,harman,couture,alley,schumacher,redd,dobbs,blum,blalock,merchant,ennis,denson,cottrell,brannon,bagley,aviles,watt,sousa,rosenthal,rooney,dietz,blank,paquette,mcclelland,duff,velasco,lentz,grubb,burrows,barbour,ulrich,shockley,rader,beyer,mixon,layton,altman,weathers,stoner,squires,shipp,priest,lipscomb,cutler,caballero,zimmer,willett,thurston,storey,medley,epperson,shah,mcmillian,baggett,torrez,hirsch,dent,poirier,peachey,farrar,creech,barth,trimble,dupre,albrecht,sample,lawler,crisp,conroy,wetzel,nesbitt,murry,jameson,wilhelm,patten,minton,matson,kimbrough,guinn,croft,toth,pulliam,nugent,newby,littlejohn,dias,canales,bernier,baron,singletary,renteria,pruett,mchugh,mabry,landrum,brower,stoddard,cagle,stjohn,scales,kohler,kellogg,hopson,gant,tharp,gann,zeigler,pringle,hammons,fairchild,deaton,chavis,carnes,rowley,matlock,kearns,irizarry,carrington,starkey,lopes,jarrell,craven,baum,littlefield,linn,humphreys,etheridge,cuellar,chastain,bundy,speer,skelton,quiroz,pyle,portillo,ponder,moulton,machado,killian,hutson,hitchcock,dowling,cloud,burdick,spann,pedersen,levin,leggett,hayward,dietrich,beaulieu,barksdale,wakefield,snowden,briscoe,bowie,berman,ogle,mcgregor,laughlin,helm,burden,wheatley,schreiber,pressley,parris,alaniz,agee,swann,snodgrass,schuster,radford,monk,mattingly,harp,girard,cheney,yancey,wagoner,ridley,lombardo,hudgins,gaskins,duckworth,coburn,willey,prado,newberry,magana,hammonds,elam,whipple,slade,serna,ojeda,liles,dorman,diehl,upton,reardon,michaels,goetz,eller,bauman,baer,layne,hummel,brenner,amaya,adamson,ornelas,dowell,cloutier,castellanos,wellman,saylor,orourke,moya,montalvo,kilpatrick,durbin,shell,oldham,kang,garvin,foss,branham,bartholomew,templeton,maguire,holton,rider,monahan,mccormack,beaty,anders,streeter,nieto,nielson,moffett,lankford,keating,heck,gatlin,delatorre,callaway,adcock,worrell,unger,robinette,nowak,jeter,brunner,steen,parrott,overstreet,nobles,montanez,clevenger,brinkley,trahan,quarles,pickering,pederson,jansen,grantham,gilchrist,crespo,aiken,schell,schaeffer,lorenz,leyva,harms,dyson,wallis,pease,leavitt,cheng,cavanaugh,batts,warden,seaman,rockwell,quezada,paxton,linder,houck,fontaine,durant,caruso,adler,pimentel,mize,lytle,cleary,cason,acker,switzer,isaacs,higginbotham,waterman,vandyke,stamper,sisk,shuler,riddick,mcmahan,levesque,hatton,bronson,bollinger,arnett,okeefe,gerber,gannon,farnsworth,baughman,silverman,satterfield,mccrary,kowalski,grigsby,greco,cabral,trout,rinehart,mahon,linton,gooden,curley,baugh,wyman,weiner,schwab,schuler,morrissey,mahan,bunn,thrasher,spear,waggoner,qualls,purdy,mcwhorter,mauldin,gilman,perryman,newsom,menard,martino,graf,billingsley,artis,simpkins,salisbury,quintanilla,gilliland,fraley,foust,crouse,scarborough,grissom,fultz,marlow,markham,madrigal,lawton,barfield,whiting,varney,schwarz,gooch,arce,wheat,truong,poulin,hurtado,selby,gaither,fortner,culpepper,coughlin,brinson,boudreau,bales,stepp,holm,schilling,morrell,kahn,heaton,gamez,causey,turpin,shanks,schrader,meek,isom,hardison,carranza,yanez,scroggins,schofield,runyon,ratcliff,murrell,moeller,irby,currier,butterfield,ralston,pullen,pinson,estep,carbone,hawks,ellington,casillas,spurlock,sikes,motley,mccartney,kruger,isbell,houle,burk,tomlin,quigley,neumann,lovelace,fennell,cheatham,bustamante,skidmore,hidalgo,forman,culp,bowens,betancourt,aquino,robb,milner,martel,gresham,wiles,ricketts,dowd,collazo,bostic,blakely,sherrod,kenyon,gandy,ebert,deloach,allard,sauer,robins,olivares,gillette,chestnut,bourque,paine,hite,hauser,devore,crawley,chapa,talbert,poindexter,meador,mcduffie,mattox,kraus,harkins,choate,wren,sledge,sanborn,kinder,geary,cornwell,barclay,abney,seward,rhoads,howland,fortier,benner,vines,tubbs,troutman,rapp,mccurdy,deluca,westmoreland,havens,guajardo,clary,seal,meehan,herzog,guillen,ashcraft,waugh,renner,milam,elrod,churchill,breaux,bolin,asher,windham,tirado,pemberton,nolen,noland,knott,emmons,cornish,christenson,brownlee,barbee,waldrop,pitt,olvera,lombardi,gruber,gaffney,eggleston,banda,archuleta,slone,prewitt,pfeiffer,nettles,mena,mcadams,henning,gardiner,cromwell,chisholm,burleson,vest,oglesby,mccarter,lumpkin,wofford,vanhorn,thorn,teel,swafford,stclair,stanfield,ocampo,herrmann,hannon,arsenault,roush,mcalister,hiatt,gunderson,forsythe,duggan,delvalle,cintron,wilks,weinstein,uribe,rizzo,noyes,mclendon,gurley,bethea,winstead,maples,guyton,giordano,alderman,valdes,polanco,pappas,lively,grogan,griffiths,bobo,arevalo,whitson,sowell,rendon,fernandes,farrow,benavidez,ayres,alicea,stump,smalley,seitz,schulte,gilley,gallant,canfield,wolford,omalley,mcnutt,mcnulty,mcgovern,hardman,harbin,cowart,chavarria,brink,beckett,bagwell,armstead,anglin,abreu,reynoso,krebs,jett,hoffmann,greenfield,forte,burney,broome,sisson,trammell,partridge,mace,lomax,lemieux,gossett,frantz,fogle,cooney,broughton,pence,paulsen,muncy,mcarthur,hollins,beauchamp,withers,osorio,mulligan,hoyle,dockery,cockrell,begley,amador,roby,rains,lindquist,gentile,everhart,bohannon,wylie,sommers,purnell,fortin,dunning,breeden,vail,phelan,phan,marx,cosby,colburn,boling,biddle,ledesma,gaddis,denney,chow,bueno,berrios,wicker,tolliver,thibodeaux,nagle,lavoie,fisk,crist,barbosa,reedy,locklear,kolb,himes,behrens,beckwith,weems,wahl,shorter,shackelford,rees,muse,cerda,valadez,thibodeau,saavedra,ridgeway,reiter,mchenry,majors,lachance,keaton,ferrara,clemens,blocker,applegate,needham,mojica,kuykendall,hamel,escamilla,doughty,burchett,ainsworth,vidal,upchurch,thigpen,strauss,spruill,sowers,riggins,ricker,mccombs,harlow,buffington,sotelo,olivas,negrete,morey,macon,logsdon,lapointe,bigelow,bello,westfall,stubblefield,lindley,hein,hawes,farrington,breen,birch,wilde,steed,sepulveda,reinhardt,proffitt,minter,messina,mcnabb,maier,keeler,gamboa,donohue,basham,shinn,crooks,cota,borders,bills,bachman,tisdale,tavares,schmid,pickard,gulley,fonseca,delossantos,condon,batista,wicks,wadsworth,martell,littleton,ison,haag,folsom,brumfield,broyles,brito,mireles,mcdonnell,leclair,hamblin,gough,fanning,binder,winfield,whitworth,soriano,palumbo,newkirk,mangum,hutcherson,comstock,carlin,beall,bair,wendt,watters,walling,putman,otoole,morley,mares,lemus,keener,hundley,dial,damico,billups,strother,mcfarlane,lamm,eaves,crutcher,caraballo,canty,atwell,taft,siler,rust,rawls,rawlings,prieto,mcneely,mcafee,hulsey,hackney,galvez,escalante,delagarza,crider,bandy,wilbanks,stowe,steinberg,renfro,masterson,massie,lanham,haskell,hamrick,dehart,burdette,branson,bourne,babin,aleman,worthy,tibbs,smoot,slack,paradis,mull,luce,houghton,gantt,furman,danner,christianson,burge,ashford,arndt,almeida,stallworth,shade,searcy,sager,noonan,mclemore,mcintire,maxey,lavigne,jobe,ferrer,falk,coffin,byrnes,aranda,apodaca,stamps,rounds,peek,olmstead,lewandowski,kaminski,dunaway,bruns,brackett,amato,reich,mcclung,lacroix,koontz,herrick,hardesty,flanders,cousins,cato,cade,vickery,shank,nagel,dupuis,croteau,cotter,stuckey,stine,porterfield,pauley,moffitt,knudsen,hardwick,goforth,dupont,blunt,barrows,barnhill,shull,rash,loftis,lemay,kitchens,horvath,grenier,fuchs,fairbanks,culbertson,calkins,burnside,beattie,ashworth,albertson,wertz,vaught,vallejo,turk,tuck,tijerina,sage,peterman,marroquin,marr,lantz,hoang,demarco,cone,berube,barnette,wharton,stinnett,slocum,scanlon,sander,pinto,mancuso,lima,headley,epstein,counts,clarkson,carnahan,boren,arteaga,adame,zook,whittle,whitehurst,wenzel,saxton,reddick,puente,handley,haggerty,earley,devlin,chaffin,cady,acuna,solano,sigler,pollack,pendergrass,ostrander,janes,francois,crutchfield,chamberlin,brubaker,baptiste,willson,reis,neeley,mullin,mercier,lira,layman,keeling,higdon,espinal,chapin,warfield,toledo,pulido,peebles,nagy,montague,mello,lear,jaeger,hogg,graff,furr,soliz,poore,mendenhall,mclaurin,maestas,gable,barraza,tillery,snead,pond,neill,mcculloch,mccorkle,lightfoot,hutchings,holloman,harness,dorn,bock,zielinski,turley,treadwell,stpierre,starling,somers,oswald,merrick,easterling,bivens,truitt,poston,parry,ontiveros,olivarez,moreau,medlin,lenz,knowlton,fairley,cobbs,chisolm,bannister,woodworth,toler,ocasio,noriega,neuman,moye,milburn,mcclanahan,lilley,hanes,flannery,dellinger,danielson,conti,blodgett,beers,weatherford,strain,karr,hitt,denham,custer,coble,clough,casteel,bolduc,batchelor,ammons,whitlow,tierney,staten,sibley,seifert,schubert,salcedo,mattison,laney,haggard,grooms,dees,cromer,cooks,colson,caswell,zarate,swisher,shin,ragan,pridgen,mcvey,matheny,lafleur,franz,ferraro,dugger,whiteside,rigsby,mcmurray,lehmann,jacoby,hildebrand,hendrick,headrick,goad,fincher,drury,borges,archibald,albers,woodcock,trapp,soares,seaton,monson,luckett,lindberg,kopp,keeton,healey,garvey,gaddy,fain,burchfield,wentworth,strand,stack,spooner,saucier,ricci,plunkett,pannell,ness,leger,freitas,fong,elizondo,duval,beaudoin,urbina,rickard,partin,mcgrew,mcclintock,ledoux,forsyth,faison,devries,bertrand,wasson,tilton,scarbrough,leung,irvine,garber,denning,corral,colley,castleberry,bowlin,bogan,beale,baines,trice,rayburn,parkinson,nunes,mcmillen,leahy,kimmel,higgs,fulmer,carden,bedford,taggart,spearman,prichard,morrill,koonce,heinz,hedges,guenther,grice,findley,dover,creighton,boothe,bayer,arreola,vitale,valles,raney,osgood,hanlon,burley,bounds,worden,weatherly,vetter,tanaka,stiltner,nevarez,mosby,montero,melancon,harter,hamer,goble,gladden,gist,ginn,akin,zaragoza,tarver,sammons,royster,oreilly,muir,morehead,luster,kingsley,kelso,grisham,glynn,baumann,alves,yount,tamayo,paterson,oates,menendez,longo,hargis,gillen,desantis,conover,breedlove,sumpter,scherer,rupp,reichert,heredia,creel,cohn,clemmons,casas,bickford,belton,bach,williford,whitcomb,tennant,sutter,stull,mccallum,langlois,keel,keegan,dangelo,dancy,damron,clapp,clanton,bankston,oliveira,mintz,mcinnis,martens,mabe,laster,jolley,hildreth,hefner,glaser,duckett,demers,brockman,blais,alcorn,agnew,toliver,tice,seeley,najera,musser,mcfall,laplante,galvin,fajardo,doan,coyne,copley,clawson,cheung,barone,wynne,woodley,tremblay,stoll,sparrow,sparkman,schweitzer,sasser,samples,roney,legg,heim,farias,colwell,christman,bratcher,winchester,upshaw,southerland,sorrell,sells,mccloskey,martindale,luttrell,loveless,lovejoy,linares,latimer,embry,coombs,bratton,bostick,venable,tuggle,toro,staggs,sandlin,jefferies,heckman,griffis,crayton,clem,browder,thorton,sturgill,sprouse,royer,rousseau,ridenour,pogue,perales,peeples,metzler,mesa,mccutcheon,mcbee,hornsby,heffner,corrigan,armijo,plante,peyton,paredes,macklin,hussey,hodgson,granados,frias,becnel,batten,almanza,turney,teal,sturgeon,meeker,mcdaniels,limon,keeney,hutto,holguin,gorham,fishman,fierro,blanchette,rodrigue,reddy,osburn,oden,lerma,kirkwood,keefer,haugen,hammett,chalmers,brinkman,baumgartner,zhang,valerio,tellez,steffen,shumate,sauls,ripley,kemper,guffey,evers,craddock,carvalho,blaylock,banuelos,balderas,wheaton,turnbull,shuman,pointer,mosier,mccue,ligon,kozlowski,johansen,ingle,herr,briones,snipes,rickman,pipkin,pantoja,orosco,moniz,lawless,kunkel,hibbard,galarza,enos,bussey,schott,salcido,perreault,mcdougal,mccool,haight,garris,easton,conyers,atherton,wimberly,utley,spellman,smithson,slagle,ritchey,rand,petit,osullivan,oaks,nutt,mcvay,mccreary,mayhew,knoll,jewett,harwood,cardoza,ashe,arriaga,zeller,wirth,whitmire,stauffer,rountree,redden,mccaffrey,martz,larose,langdon,humes,gaskin,faber,devito,cass,almond,wingfield,wingate,villareal,tyner,smothers,severson,reno,pennell,maupin,leighton,janssen,hassell,hallman,halcomb,folse,fitzsimmons,fahey,cranford,bolen,battles,battaglia,wooldridge,trask,rosser,regalado,mcewen,keefe,fuqua,echevarria,caro,boynton,andrus,viera,vanmeter,taber,spradlin,seibert,provost,prentice,oliphant,laporte,hwang,hatchett,hass,greiner,freedman,covert,chilton,byars,wiese,venegas,swank,shrader,roberge,mullis,mortensen,mccune,marlowe,kirchner,keck,isaacson,hostetler,halverson,gunther,griswold,fenner,durden,blackwood,ahrens,sawyers,savoy,nabors,mcswain,mackay,lavender,lash,labbe,jessup,fullerton,cruse,crittenden,correia,centeno,caudle,canady,callender,alarcon,ahern,winfrey,tribble,salley,roden,musgrove,minnick,fortenberry,carrion,bunting,batiste,whited,underhill,stillwell,rauch,pippin,perrin,messenger,mancini,lister,kinard,hartmann,fleck,wilt,treadway,thornhill,spalding,rafferty,pitre,patino,ordonez,linkous,kelleher,homan,galbraith,feeney,curtin,coward,camarillo,buss,bunnell,bolt,beeler,autry,alcala,witte,wentz,stidham,shively,nunley,meacham,martins,lemke,lefebvre,hynes,horowitz,hoppe,holcombe,dunne,derr,cochrane,brittain,bedard,beauregard,torrence,strunk,soria,simonson,shumaker,scoggins,oconner,moriarty,kuntz,ives,hutcheson,horan,hales,garmon,fitts,bohn,atchison,wisniewski,vanwinkle,sturm,sallee,prosser,moen,lundberg,kunz,kohl,keane,jorgenson,jaynes,funderburk,freed,durr,creamer,cosgrove,batson,vanhoose,thomsen,teeter,smyth,redmon,orellana,maness,heflin,goulet,frick,forney,bunker,asbury,aguiar,talbott,southard,mowery,mears,lemmon,krieger,hickson,elston,duong,delgadillo,dayton,dasilva,conaway,catron,bruton,bradbury,bordelon,bivins,bittner,bergstrom,beals,abell,whelan,tejada,pulley,pino,norfleet,nealy,maes,loper,gatewood,frierson,freund,finnegan,cupp,covey,catalano,boehm,bader,yoon,walston,tenney,sipes,rawlins,medlock,mccaskill,mccallister,marcotte,maclean,hughey,henke,harwell,gladney,gilson,chism,caskey,brandenburg,baylor,villasenor,veal,thatcher,stegall,petrie,nowlin,navarrete,lombard,loftin,lemaster,kroll,kovach,kimbrell,kidwell,hershberger,fulcher,cantwell,bustos,boland,bobbitt,binkley,wester,weis,verdin,tong,tiller,sisco,sharkey,seymore,rosenbaum,rohr,quinonez,pinkston,malley,logue,lessard,lerner,lebron,krauss,klinger,halstead,haller,getz,burrow,alger,shores,pfeifer,perron,nelms,munn,mcmaster,mckenney,manns,knudson,hutchens,huskey,goebel,flagg,cushman,click,castellano,carder,bumgarner,wampler,spinks,robson,neel,mcreynolds,mathias,maas,loera,jenson,florez,coons,buckingham,brogan,berryman,wilmoth,wilhite,thrash,shephard,seidel,schulze,roldan,pettis,obryan,maki,mackie,hatley,frazer,fiore,chesser,bottoms,bisson,benefield,allman,wilke,trudeau,timm,shifflett,mundy,milliken,mayers,leake,kohn,huntington,horsley,hermann,guerin,fryer,frizzell,foret,flemming,fife,criswell,carbajal,bozeman,boisvert,angulo,wallen,tapp,silvers,ramsay,oshea,orta,moll,mckeever,mcgehee,linville,kiefer,ketchum,howerton,groce,gass,fusco,corbitt,betz,bartels,amaral,aiello,weddle,sperry,seiler,runyan,raley,overby,osteen,olds,mckeown,matney,lauer,lattimore,hindman,hartwell,fredrickson,fredericks,espino,clegg,carswell,cambell,burkholder,woodbury,welker,totten,thornburg,theriault,stitt,stamm,stackhouse,scholl,saxon,rife,razo,quinlan,pinkerton,olivo,nesmith,nall,mattos,lafferty,justus,giron,geer,fielder,drayton,dortch,conners,conger,boatwright,billiot,barden,armenta,tibbetts,steadman,slattery,rinaldi,raynor,pinckney,pettigrew,milne,matteson,halsey,gonsalves,fellows,durand,desimone,cowley,cowles,brill,barham,barela,barba,ashmore,withrow,valenti,tejeda,spriggs,sayre,salerno,peltier,peel,merriman,matheson,lowman,lindstrom,hyland,giroux,earls,dugas,dabney,collado,briseno,baxley,whyte,wenger,vanover,vanburen,thiel,schindler,schiller,rigby,pomeroy,passmore,marble,manzo,mahaffey,lindgren,laflamme,greathouse,fite,calabrese,bayne,yamamoto,wick,townes,thames,reinhart,peeler,naranjo,montez,mcdade,mast,markley,marchand,leeper,kellum,hudgens,hennessey,hadden,gainey,coppola,borrego,bolling,beane,ault,slaton,pape,null,mulkey,lightner,langer,hillard,ethridge,enright,derosa,baskin,weinberg,turman,somerville,pardo,noll,lashley,ingraham,hiller,hendon,glaze,cothran,cooksey,conte,carrico,abner,wooley,swope,summerlin,sturgis,sturdivant,stott,spurgeon,spillman,speight,roussel,popp,nutter,mckeon,mazza,magnuson,lanning,kozak,jankowski,heyward,forster,corwin,callaghan,bays,wortham,usher,theriot,sayers,sabo,poling,loya,lieberman,laroche,labelle,howes,harr,garay,fogarty,everson,durkin,dominquez,chaves,chambliss,witcher,vieira,vandiver,terrill,stoker,schreiner,moorman,liddell,lawhorn,krug,irons,hylton,hollenbeck,herrin,hembree,goolsby,goodin,gilmer,foltz,dinkins,daughtry,caban,brim,briley,bilodeau,wyant,vergara,tallent,swearingen,stroup,scribner,quillen,pitman,mccants,maxfield,martinson,holtz,flournoy,brookins,brody,baumgardner,straub,sills,roybal,roundtree,oswalt,mcgriff,mcdougall,mccleary,maggard,gragg,gooding,godinez,doolittle,donato,cowell,cassell,bracken,appel,zambrano,reuter,perea,nakamura,monaghan,mickens,mcclinton,mcclary,marler,kish,judkins,gilbreath,freese,flanigan,felts,erdmann,dodds,chew,brownell,boatright,barreto,slayton,sandberg,saldivar,pettway,odum,narvaez,moultrie,montemayor,merrell,lees,keyser,hoke,hardaway,hannan,gilbertson,fogg,dumont,deberry,coggins,buxton,bucher,broadnax,beeson,araujo,appleton,amundson,aguayo,ackley,yocum,worsham,shivers,sanches,sacco,robey,rhoden,pender,ochs,mccurry,madera,luong,knotts,jackman,heinrich,hargrave,gault,comeaux,chitwood,caraway,boettcher,bernhardt,barrientos,zink,wickham,whiteman,thorp,stillman,settles,schoonover,roque,riddell,pilcher,phifer,novotny,macleod,hardee,haase,grider,doucette,clausen,bevins,beamon,badillo,tolley,tindall,soule,snook,seale,pinkney,pellegrino,nowell,nemeth,mondragon,mclane,lundgren,ingalls,hudspeth,hixson,gearhart,furlong,downes,dibble,deyoung,cornejo,camara,brookshire,boyette,wolcott,surratt,sellars,segal,salyer,reeve,rausch,labonte,haro,gower,freeland,fawcett,eads,driggers,donley,collett,bromley,boatman,ballinger,baldridge,volz,trombley,stonge,shanahan,rivard,rhyne,pedroza,matias,jamieson,hedgepeth,hartnett,estevez,eskridge,denman,chiu,chinn,catlett,carmack,buie,bechtel,beardsley,bard,ballou,ulmer,skeen,robledo,rincon,reitz,piazza,munger,moten,mcmichael,loftus,ledet,kersey,groff,fowlkes,crumpton,clouse,bettis,villagomez,timmerman,strom,santoro,roddy,penrod,musselman,macpherson,leboeuf,harless,haddad,guido,golding,fulkerson,fannin,dulaney,dowdell,cottle,ceja,cate,bosley,benge,albritton,voigt,trowbridge,soileau,seely,rohde,pearsall,paulk,orth,nason,mota,mcmullin,marquardt,madigan,hoag,gillum,gabbard,fenwick,danforth,cushing,cress,creed,cazares,bettencourt,barringer,baber,stansberry,schramm,rutter,rivero,oquendo,necaise,mouton,montenegro,miley,mcgough,marra,macmillan,lamontagne,jasso,horst,hetrick,heilman,gaytan,gall,fortney,dingle,desjardins,dabbs,burbank,brigham,breland,beaman,arriola,yarborough,wallin,toscano,stowers,reiss,pichardo,orton,michels,mcnamee,mccrory,leatherman,kell,keister,horning,hargett,guay,ferro,deboer,dagostino,carper,blanks,beaudry,towle,tafoya,stricklin,strader,soper,sonnier,sigmon,schenk,saddler,pedigo,mendes,lunn,lohr,lahr,kingsbury,jarman,hume,holliman,hofmann,haworth,harrelson,hambrick,flick,edmunds,dacosta,crossman,colston,chaplin,carrell,budd,weiler,waits,valentino,trantham,tarr,solorio,roebuck,powe,plank,pettus,pagano,mink,luker,leathers,joslin,hartzell,gambrell,cepeda,carty,caputo,brewington,bedell,ballew,applewhite,warnock,walz,urena,tudor,reel,pigg,parton,mickelson,meagher,mclellan,mcculley,mandel,leech,lavallee,kraemer,kling,kipp,kehoe,hochstetler,harriman,gregoire,grabowski,gosselin,gammon,fancher,edens,desai,brannan,armendariz,woolsey,whitehouse,whetstone,ussery,towne,testa,tallman,studer,strait,steinmetz,sorrells,sauceda,rolfe,paddock,mitchem,mcginn,mccrea,lovato,hazen,gilpin,gaynor,fike,devoe,delrio,curiel,burkhardt,bode,backus,zinn,watanabe,wachter,vanpelt,turnage,shaner,schroder,sato,riordan,quimby,portis,natale,mckoy,mccown,kilmer,hotchkiss,hesse,halbert,gwinn,godsey,delisle,chrisman,canter,arbogast,angell,acree,yancy,woolley,wesson,weatherspoon,trainor,stockman,spiller,sipe,rooks,reavis,propst,porras,neilson,mullens,loucks,llewellyn,kumar,koester,klingensmith,kirsch,kester,honaker,hodson,hennessy,helmick,garrity,garibay,drain,casarez,callis,botello,aycock,avant,wingard,wayman,tully,theisen,szymanski,stansbury,segovia,rainwater,preece,pirtle,padron,mincey,mckelvey,mathes,larrabee,kornegay,klug,ingersoll,hecht,germain,eggers,dykstra,deering,decoteau,deason,dearing,cofield,carrigan,bonham,bahr,aucoin,appleby,almonte,yager,womble,wimmer,weimer,vanderpool,stancil,sprinkle,romine,remington,pfaff,peckham,olivera,meraz,maze,lathrop,koehn,hazelton,halvorson,hallock,haddock,ducharme,dehaven,caruthers,brehm,bosworth,bost,bias,beeman,basile,bane,aikens,wold,walther,tabb,suber,strawn,stocker,shirey,schlosser,riedel,rembert,reimer,pyles,peele,merriweather,letourneau,latta,kidder,hixon,hillis,hight,herbst,henriquez,haygood,hamill,gabel,fritts,eubank,dawes,correll,bushey,buchholz,brotherton,botts,barnwell,auger,atchley,westphal,veilleux,ulloa,stutzman,shriver,ryals,pilkington,moyers,marrs,mangrum,maddux,lockard,laing,kuhl,harney,hammock,hamlett,felker,doerr,depriest,carrasquillo,carothers,bogle,bischoff,bergen,albanese,wyckoff,vermillion,vansickle,thibault,tetreault,stickney,shoemake,ruggiero,rawson,racine,philpot,paschal,mcelhaney,mathison,legrand,lapierre,kwan,kremer,jiles,hilbert,geyer,faircloth,ehlers,egbert,desrosiers,dalrymple,cotten,cashman,cadena,boardman,alcaraz,wyrick,therrien,tankersley,strickler,puryear,plourde,pattison,pardue,mcginty,mcevoy,landreth,kuhns,koon,hewett,giddens,emerick,eades,deangelis,cosme,ceballos,birdsong,benham,bemis,armour,anguiano,welborn,tsosie,storms,shoup,sessoms,samaniego,rood,rojo,rhinehart,raby,northcutt,myer,munguia,morehouse,mcdevitt,mallett,lozada,lemoine,kuehn,hallett,grim,gillard,gaylor,garman,gallaher,feaster,faris,darrow,dardar,coney,carreon,braithwaite,boylan,boyett,bixler,bigham,benford,barragan,barnum,zuber,wyche,westcott,vining,stoltzfus,simonds,shupe,sabin,ruble,rittenhouse,richman,perrone,mulholland,millan,lomeli,kite,jemison,hulett,holler,hickerson,herold,hazelwood,griffen,gause,forde,eisenberg,dilworth,charron,chaisson,bristow,breunig,brace,boutwell,bentz,belk,bayless,batchelder,baran,baeza,zimmermann,weathersby,volk,toole,theis,tedesco,searle,schenck,satterwhite,ruelas,rankins,partida,nesbit,morel,menchaca,levasseur,kaylor,johnstone,hulse,hollar,hersey,harrigan,harbison,guyer,gish,giese,gerlach,geller,geisler,falcone,elwell,doucet,deese,darr,corder,chafin,byler,bussell,burdett,brasher,bowe,bellinger,bastian,barner,alleyne,wilborn,weil,wegner,tatro,spitzer,smithers,schoen,resendez,parisi,overman,obrian,mudd,mahler,maggio,lindner,lalonde,lacasse,laboy,killion,kahl,jessen,jamerson,houk,henshaw,gustin,graber,durst,duenas,davey,cundiff,conlon,colunga,coakley,chiles,capers,buell,bricker,bissonnette,bartz,bagby,zayas,volpe,treece,toombs,thom,terrazas,swinney,skiles,silveira,shouse,senn,ramage,moua,langham,kyles,holston,hoagland,herd,feller,denison,carraway,burford,bickel,ambriz,abercrombie,yamada,weidner,waddle,verduzco,thurmond,swindle,schrock,sanabria,rosenberger,probst,peabody,olinger,nazario,mccafferty,mcbroom,mcabee,mazur,matherne,mapes,leverett,killingsworth,heisler,griego,gosnell,frankel,franke,ferrante,fenn,ehrlich,christopherso,chasse,caton,brunelle,bloomfield,babbitt,azevedo,abramson,ables,abeyta,youmans,wozniak,wainwright,stowell,smitherman,samuelson,runge,rothman,rosenfeld,peake,owings,olmos,munro,moreira,leatherwood,larkins,krantz,kovacs,kizer,kindred,karnes,jaffe,hubbell,hosey,hauck,goodell,erdman,dvorak,doane,cureton,cofer,buehler,bierman,berndt,banta,abdullah,warwick,waltz,turcotte,torrey,stith,seger,sachs,quesada,pinder,peppers,pascual,paschall,parkhurst,ozuna,oster,nicholls,lheureux,lavalley,kimura,jablonski,haun,gourley,gilligan,croy,cotto,cargill,burwell,burgett,buckman,booher,adorno,wrenn,whittemore,urias,szabo,sayles,saiz,rutland,rael,pharr,pelkey,ogrady,nickell,musick,moats,mather,massa,kirschner,kieffer,kellar,hendershot,gott,godoy,gadson,furtado,fiedler,erskine,dutcher,dever,daggett,chevalier,brake,ballesteros,amerson,wingo,waldon,trott,silvey,showers,schlegel,ritz,pepin,pelayo,parsley,palermo,moorehead,mchale,lett,kocher,kilburn,iglesias,humble,hulbert,huckaby,hartford,hardiman,gurney,grigg,grasso,goings,fillmore,farber,depew,dandrea,cowen,covarrubias,burrus,bracy,ardoin,thompkins,standley,radcliffe,pohl,persaud,parenteau,pabon,newson,newhouse,napolitano,mulcahy,malave,keim,hooten,hernandes,heffernan,hearne,greenleaf,glick,fuhrman,fetter,faria,dishman,dickenson,crites,criss,clapper,chenault,castor,casto,bugg,bove,bonney,anderton,allgood,alderson,woodman,warrick,toomey,tooley,tarrant,summerville,stebbins,sokol,searles,schutz,schumann,scheer,remillard,raper,proulx,palmore,monroy,messier,melo,melanson,mashburn,manzano,lussier,jenks,huneycutt,hartwig,grimsley,fulk,fielding,fidler,engstrom,eldred,dantzler,crandell,calder,brumley,breton,brann,bramlett,boykins,bianco,bancroft,almaraz,alcantar,whitmer,whitener,welton,vineyard,rahn,paquin,mizell,mcmillin,mckean,marston,maciel,lundquist,liggins,lampkin,kranz,koski,kirkham,jiminez,hazzard,harrod,graziano,grammer,gendron,garrido,fordham,englert,dryden,demoss,deluna,crabb,comeau,brummett,blume,benally,wessel,vanbuskirk,thorson,stumpf,stockwell,reams,radtke,rackley,pelton,niemi,newland,nelsen,morrissette,miramontes,mcginley,mccluskey,marchant,luevano,lampe,lail,jeffcoat,infante,hinman,gaona,eady,desmarais,decosta,dansby,cisco,choe,breckenridge,bostwick,borg,bianchi,alberts,wilkie,whorton,vargo,tait,soucy,schuman,ousley,mumford,lippert,leath,lavergne,laliberte,kirksey,kenner,johnsen,izzo,hiles,gullett,greenwell,gaspar,galbreath,gaitan,ericson,delapaz,croom,cottingham,clift,bushnell,bice,beason,arrowood,waring,voorhees,truax,shreve,shockey,schatz,sandifer,rubino,rozier,roseberry,pieper,peden,nester,nave,murphey,malinowski,macgregor,lafrance,kunkle,kirkman,hipp,hasty,haddix,gervais,gerdes,gamache,fouts,fitzwater,dillingham,deming,deanda,cedeno,cannady,burson,bouldin,arceneaux,woodhouse,whitford,wescott,welty,weigel,torgerson,toms,surber,sunderland,sterner,setzer,riojas,pumphrey,puga,metts,mcgarry,mccandless,magill,lupo,loveland,llamas,leclerc,koons,kahler,huss,holbert,heintz,haupt,grimmett,gaskill,ellingson,dorr,dingess,deweese,desilva,crossley,cordeiro,converse,conde,caldera,cairns,burmeister,burkhalter,brawner,bott,youngs,vierra,valladares,shrum,shropshire,sevilla,rusk,rodarte,pedraza,nino,merino,mcminn,markle,mapp,lajoie,koerner,kittrell,kato,hyder,hollifield,heiser,hazlett,greenwald,fant,eldredge,dreher,delafuente,cravens,claypool,beecher,aronson,alanis,worthen,wojcik,winger,whitacre,valverde,valdivia,troupe,thrower,swindell,suttles,stroman,spires,slate,shealy,sarver,sartin,sadowski,rondeau,rolon,rascon,priddy,paulino,nolte,munroe,molloy,mciver,lykins,loggins,lenoir,klotz,kempf,hupp,hollowell,hollander,haynie,harkness,harker,gottlieb,frith,eddins,driskell,doggett,densmore,charette,cassady,byrum,burcham,buggs,benn,whitted,warrington,vandusen,vaillancourt,steger,siebert,scofield,quirk,purser,plumb,orcutt,nordstrom,mosely,michalski,mcphail,mcdavid,mccraw,marchese,mannino,lefevre,largent,lanza,kress,isham,hunsaker,hoch,hildebrandt,guarino,grijalva,graybill,fick,ewell,ewald,cusick,crumley,coston,cathcart,carruthers,bullington,bowes,blain,blackford,barboza,yingling,wert,weiland,varga,silverstein,sievers,shuster,shumway,runnels,rumsey,renfroe,provencher,polley,mohler,middlebrooks,kutz,koster,groth,glidden,fazio,deen,chipman,chenoweth,champlin,cedillo,carrero,carmody,buckles,brien,boutin,bosch,berkowitz,altamirano,wilfong,wiegand,waites,truesdale,toussaint,tobey,tedder,steelman,sirois,schnell,robichaud,richburg,plumley,pizarro,piercy,ortego,oberg,neace,mertz,mcnew,matta,lapp,lair,kibler,howlett,hollister,hofer,hatten,hagler,falgoust,engelhardt,eberle,dombrowski,dinsmore,daye,casares,braud,balch,autrey,wendel,tyndall,strobel,stoltz,spinelli,serrato,reber,rathbone,palomino,nickels,mayle,mathers,mach,loeffler,littrell,levinson,leong,lemire,lejeune,lazo,lasley,koller,kennard,hoelscher,hintz,hagerman,greaves,fore,eudy,engler,corrales,cordes,brunet,bidwell,bennet,tyrrell,tharpe,swinton,stribling,southworth,sisneros,savoie,samons,ruvalcaba,ries,ramer,omara,mosqueda,millar,mcpeak,macomber,luckey,litton,lehr,lavin,hubbs,hoard,hibbs,hagans,futrell,exum,evenson,culler,carbaugh,callen,brashear,bloomer,blakeney,bigler,addington,woodford,unruh,tolentino,sumrall,stgermain,smock,sherer,rayner,pooler,oquinn,nero,mcglothlin,linden,kowal,kerrigan,ibrahim,harvell,hanrahan,goodall,geist,fussell,fung,ferebee,eley,eggert,dorsett,dingman,destefano,colucci,clemmer,burnell,brumbaugh,boddie,berryhill,avelar,alcantara,winder,winchell,vandenberg,trotman,thurber,thibeault,stlouis,stilwell,sperling,shattuck,sarmiento,ruppert,rumph,renaud,randazzo,rademacher,quiles,pearman,palomo,mercurio,lowrey,lindeman,lawlor,larosa,lander,labrecque,hovis,holifield,henninger,hawkes,hartfield,hann,hague,genovese,garrick,fudge,frink,eddings,dinh,cribbs,calvillo,bunton,brodeur,bolding,blanding,agosto,zahn,wiener,trussell,tello,teixeira,speck,sharma,shanklin,sealy,scanlan,santamaria,roundy,robichaux,ringer,rigney,prevost,polson,nord,moxley,medford,mccaslin,mcardle,macarthur,lewin,lasher,ketcham,keiser,heine,hackworth,grose,grizzle,gillman,gartner,frazee,fleury,edson,edmonson,derry,cronk,conant,burress,burgin,broom,brockington,bolick,boger,birchfield,billington,baily,bahena,armbruster,anson,yoho,wilcher,tinney,timberlake,thielen,sutphin,stultz,sikora,serra,schulman,scheffler,santillan,rego,preciado,pinkham,mickle,lomas,lizotte,lent,kellerman,keil,johanson,hernadez,hartsfield,haber,gorski,farkas,eberhardt,duquette,delano,cropper,cozart,cockerham,chamblee,cartagena,cahoon,buzzell,brister,brewton,blackshear,benfield,aston,ashburn,arruda,wetmore,weise,vaccaro,tucci,sudduth,stromberg,stoops,showalter,shears,runion,rowden,rosenblum,riffle,renfrow,peres,obryant,leftwich,lark,landeros,kistler,killough,kerley,kastner,hoggard,hartung,guertin,govan,gatling,gailey,fullmer,fulford,flatt,esquibel,endicott,edmiston,edelstein,dufresne,dressler,dickman,chee,busse,bonnett,berard,yoshida,velarde,veach,vanhouten,vachon,tolson,tolman,tennyson,stites,soler,shutt,ruggles,rhone,pegues,neese,muro,moncrief,mefford,mcphee,mcmorris,mceachern,mcclurg,mansour,mader,leija,lecompte,lafountain,labrie,jaquez,heald,hash,hartle,gainer,frisby,farina,eidson,edgerton,dyke,durrett,duhon,cuomo,cobos,cervantez,bybee,brockway,borowski,binion,beery,arguello,amaro,acton,yuen,winton,wigfall,weekley,vidrine,vannoy,tardiff,shoop,shilling,schick,safford,prendergast,pilgrim,pellerin,osuna,nissen,nalley,moller,messner,messick,merrifield,mcguinness,matherly,marcano,mahone,lemos,lebrun,jara,hoffer,herren,hecker,haws,haug,gwin,gober,gilliard,fredette,favela,echeverria,downer,donofrio,desrochers,crozier,corson,bechtold,argueta,aparicio,zamudio,westover,westerman,utter,troyer,thies,tapley,slavin,shirk,sandler,roop,rimmer,raymer,radcliff,otten,moorer,millet,mckibben,mccutchen,mcavoy,mcadoo,mayorga,mastin,martineau,marek,madore,leflore,kroeger,kennon,jimerson,hostetter,hornback,hendley,hance,guardado,granado,gowen,goodale,flinn,fleetwood,fitz,durkee,duprey,dipietro,dilley,clyburn,brawley,beckley,arana,weatherby,vollmer,vestal,tunnell,trigg,tingle,takahashi,sweatt,storer,snapp,shiver,rooker,rathbun,poisson,perrine,perri,parmer,parke,pare,papa,palmieri,midkiff,mecham,mccomas,mcalpine,lovelady,lillard,lally,knopp,kile,kiger,haile,gupta,goldsberry,gilreath,fulks,friesen,franzen,flack,findlay,ferland,dreyer,dore,dennard,deckard,debose,crim,coulombe,chancey,cantor,branton,bissell,barns,woolard,witham,wasserman,spiegel,shoffner,scholz,ruch,rossman,petry,palacio,paez,neary,mortenson,millsap,miele,menke,mckim,mcanally,martines,lemley,larochelle,klaus,klatt,kaufmann,kapp,helmer,hedge,halloran,glisson,frechette,fontana,eagan,distefano,danley,creekmore,chartier,chaffee,carillo,burg,bolinger,berkley,benz,basso,bash,zelaya,woodring,witkowski,wilmot,wilkens,wieland,verdugo,urquhart,tsai,timms,swiger,swaim,sussman,pires,molnar,mcatee,lowder,loos,linker,landes,kingery,hufford,higa,hendren,hammack,hamann,gillam,gerhardt,edelman,delk,deans,curl,constantine,cleaver,claar,casiano,carruth,carlyle,brophy,bolanos,bibbs,bessette,beggs,baugher,bartel,averill,andresen,amin,adames,valente,turnbow,swink,sublett,stroh,stringfellow,ridgway,pugliese,poteat,ohare,neubauer,murchison,mingo,lemmons,kwon,kellam,kean,jarmon,hyden,hudak,hollinger,henkel,hemingway,hasson,hansel,halter,haire,ginsberg,gillispie,fogel,flory,etter,elledge,eckman,deas,currin,crafton,coomer,colter,claxton,bulter,braddock,bowyer,binns,bellows,baskerville,barros,ansley,woolf,wight,waldman,wadley,tull,trull,tesch,stouffer,stadler,slay,shubert,sedillo,santacruz,reinke,poynter,neri,neale,mowry,moralez,monger,mitchum,merryman,manion,macdougall,litchfield,levitt,lepage,lasalle,khoury,kavanagh,karns,ivie,huebner,hodgkins,halpin,garica,eversole,dutra,dunagan,duffey,dillman,dillion,deville,dearborn,damato,courson,coulson,burdine,bousquet,bonin,bish,atencio,westbrooks,wages,vaca,toner,tillis,swett,struble,stanfill,solorzano,slusher,sipple,silvas,shults,schexnayder,saez,rodas,rager,pulver,penton,paniagua,meneses,mcfarlin,mcauley,matz,maloy,magruder,lohman,landa,lacombe,jaimes,holzer,holst,heil,hackler,grundy,gilkey,farnham,durfee,dunton,dunston,duda,dews,craver,corriveau,conwell,colella,chambless,bremer,boutte,bourassa,blaisdell,backman,babineaux,audette,alleman,towner,taveras,tarango,sullins,suiter,stallard,solberg,schlueter,poulos,pimental,owsley,okelley,moffatt,metcalfe,meekins,medellin,mcglynn,mccowan,marriott,marable,lennox,lamoureux,koss,kerby,karp,isenberg,howze,hockenberry,highsmith,hallmark,gusman,greeley,giddings,gaudet,gallup,fleenor,eicher,edington,dimaggio,dement,demello,decastro,bushman,brundage,brooker,bourg,blackstock,bergmann,beaton,banister,argo,appling,wortman,watterson,villalpando,tillotson,tighe,sundberg,sternberg,stamey,shipe,seeger,scarberry,sattler,sain,rothstein,poteet,plowman,pettiford,penland,partain,pankey,oyler,ogletree,ogburn,moton,merkel,lucier,lakey,kratz,kinser,kershaw,josephson,imhoff,hendry,hammon,frisbie,frawley,fraga,forester,eskew,emmert,drennan,doyon,dandridge,cawley,carvajal,bracey,belisle,batey,ahner,wysocki,weiser,veliz,tincher,sansone,sankey,sandstrom,rohrer,risner,pridemore,pfeffer,persinger,peery,oubre,nowicki,musgrave,murdoch,mullinax,mccary,mathieu,livengood,kyser,klink,kimes,kellner,kavanaugh,kasten,imes,hoey,hinshaw,hake,gurule,grube,grillo,geter,gatto,garver,garretson,farwell,eiland,dunford,decarlo,corso,colman,collard,cleghorn,chasteen,cavender,carlile,calvo,byerly,brogdon,broadwater,breault,bono,bergin,behr,ballenger,amick,tamez,stiffler,steinke,simmon,shankle,schaller,salmons,sackett,saad,rideout,ratcliffe,ranson,plascencia,petterson,olszewski,olney,olguin,nilsson,nevels,morelli,montiel,monge,michaelson,mertens,mcchesney,mcalpin,mathewson,loudermilk,lineberry,liggett,kinlaw,kight,jost,hereford,hardeman,halpern,halliday,hafer,gaul,friel,freitag,forsberg,evangelista,doering,dicarlo,dendy,delp,deguzman,dameron,curtiss,cosper,cauthen,bradberry,bouton,bonnell,bixby,bieber,beveridge,bedwell,barhorst,bannon,baltazar,baier,ayotte,attaway,arenas,abrego,turgeon,tunstall,thaxton,tenorio,stotts,sthilaire,shedd,seabolt,scalf,salyers,ruhl,rowlett,robinett,pfister,perlman,pepe,parkman,nunnally,norvell,napper,modlin,mckellar,mcclean,mascarenas,leibowitz,ledezma,kuhlman,kobayashi,hunley,holmquist,hinkley,hazard,hartsell,gribble,gravely,fifield,eliason,doak,crossland,carleton,bridgeman,bojorquez,boggess,auten,woosley,whiteley,wexler,twomey,tullis,townley,standridge,santoyo,rueda,riendeau,revell,pless,ottinger,nigro,nickles,mulvey,menefee,mcshane,mcloughlin,mckinzie,markey,lockridge,lipsey,knisley,knepper,kitts,kiel,jinks,hathcock,godin,gallego,fikes,fecteau,estabrook,ellinger,dunlop,dudek,countryman,chauvin,chatham,bullins,brownfield,boughton,bloodworth,bibb,baucom,barbieri,aubin,armitage,alessi,absher,abbate,zito,woolery,wiggs,wacker,tynes,tolle,telles,tarter,swarey,strode,stockdale,stalnaker,spina,schiff,saari,risley,rameriz,rakes,pettaway,penner,paulus,palladino,omeara,montelongo,melnick,mehta,mcgary,mccourt,mccollough,marchetti,manzanares,lowther,leiva,lauderdale,lafontaine,kowalczyk,knighton,joubert,jaworski,huth,hurdle,housley,hackman,gulick,gordy,gilstrap,gehrke,gebhart,gaudette,foxworth,endres,dunkle,cimino,caddell,brauer,braley,bodine,blackmore,belden,backer,ayer,andress,wisner,vuong,valliere,twigg,tavarez,strahan,steib,staub,sowder,seiber,schutt,scharf,schade,rodriques,risinger,renshaw,rahman,presnell,piatt,nieman,nevins,mcilwain,mcgaha,mccully,mccomb,massengale,macedo,lesher,kearse,jauregui,husted,hudnall,holmberg,hertel,hardie,glidewell,frausto,fassett,dalessandro,dahlgren,corum,constantino,conlin,colquitt,colombo,claycomb,cardin,buller,boney,bocanegra,biggers,benedetto,araiza,andino,albin,zorn,werth,weisman,walley,vanegas,ulibarri,towe,tedford,teasley,suttle,steffens,stcyr,squire,singley,sifuentes,shuck,schram,sass,rieger,ridenhour,rickert,richerson,rayborn,rabe,raab,pendley,pastore,ordway,moynihan,mellott,mckissick,mcgann,mccready,mauney,marrufo,lenhart,lazar,lafave,keele,kautz,jardine,jahnke,jacobo,hord,hardcastle,hageman,giglio,gehring,fortson,duque,duplessis,dicken,derosier,deitz,dalessio,cram,castleman,candelario,callison,caceres,bozarth,biles,bejarano,bashaw,avina,armentrout,alverez,acord,waterhouse,vereen,vanlandingham,strawser,shotwell,severance,seltzer,schoonmaker,schock,schaub,schaffner,roeder,rodrigez,riffe,rasberry,rancourt,railey,quade,pursley,prouty,perdomo,oxley,osterman,nickens,murphree,mounts,merida,maus,mattern,masse,martinelli,mangan,lutes,ludwick,loney,laureano,lasater,knighten,kissinger,kimsey,kessinger,honea,hollingshead,hockett,heyer,heron,gurrola,gove,glasscock,gillett,galan,featherstone,eckhardt,duron,dunson,dasher,culbreth,cowden,cowans,claypoole,churchwell,chabot,caviness,cater,caston,callan,byington,burkey,boden,beckford,atwater,archambault,alvey,alsup,whisenant,weese,voyles,verret,tsang,tessier,sweitzer,sherwin,shaughnessy,revis,remy,prine,philpott,peavy,paynter,parmenter,ovalle,offutt,nightingale,newlin,nakano,myatt,muth,mohan,mcmillon,mccarley,mccaleb,maxson,marinelli,maley,liston,letendre,kain,huntsman,hirst,hagerty,gulledge,greenway,grajeda,gorton,goines,gittens,frederickson,fanelli,embree,eichelberger,dunkin,dixson,dillow,defelice,chumley,burleigh,borkowski,binette,biggerstaff,berglund,beller,audet,arbuckle,allain,alfano,youngman,wittman,weintraub,vanzant,vaden,twitty,stollings,standifer,sines,shope,scalise,saville,posada,pisano,otte,nolasco,mier,merkle,mendiola,melcher,mejias,mcmurry,mccalla,markowitz,manis,mallette,macfarlane,lough,looper,landin,kittle,kinsella,kinnard,hobart,helman,hellman,hartsock,halford,hage,gordan,glasser,gayton,gattis,gastelum,gaspard,frisch,fitzhugh,eckstein,eberly,dowden,despain,crumpler,crotty,cornelison,chouinard,chamness,catlin,cann,bumgardner,budde,branum,bradfield,braddy,borst,birdwell,bazan,banas,bade,arango,ahearn,addis,zumwalt,wurth,wilk,widener,wagstaff,urrutia,terwilliger,tart,steinman,staats,sloat,rives,riggle,revels,reichard,prickett,poff,pitzer,petro,pell,northrup,nicks,moline,mielke,maynor,mallon,magness,lingle,lindell,lieb,lesko,lebeau,lammers,lafond,kiernan,ketron,jurado,holmgren,hilburn,hayashi,hashimoto,harbaugh,guillot,gard,froehlich,feinberg,falco,dufour,drees,doney,diep,delao,daves,dail,crowson,coss,congdon,carner,camarena,butterworth,burlingame,bouffard,bloch,bilyeu,barta,bakke,baillargeon,avent,aquilar,zeringue,yarber,wolfson,vogler,voelker,truss,troxell,thrift,strouse,spielman,sistrunk,sevigny,schuller,schaaf,ruffner,routh,roseman,ricciardi,peraza,pegram,overturf,olander,odaniel,millner,melchor,maroney,machuca,macaluso,livesay,layfield,laskowski,kwiatkowski,kilby,hovey,heywood,hayman,havard,harville,haigh,hagood,grieco,glassman,gebhardt,fleischer,fann,elson,eccles,cunha,crumb,blakley,bardwell,abshire,woodham,wines,welter,wargo,varnado,tutt,traynor,swaney,stricker,stoffel,stambaugh,sickler,shackleford,selman,seaver,sansom,sanmiguel,royston,rourke,rockett,rioux,puleo,pitchford,nardi,mulvaney,middaugh,malek,leos,lathan,kujawa,kimbro,killebrew,houlihan,hinckley,herod,hepler,hamner,hammel,hallowell,gonsalez,gingerich,gambill,funkhouser,fricke,fewell,falkner,endsley,dulin,drennen,deaver,dambrosio,chadwell,castanon,burkes,brune,brisco,brinker,bowker,boldt,berner,beaumont,beaird,bazemore,barrick,albano,younts,wunderlich,weidman,vanness,toland,theobald,stickler,steiger,stanger,spies,spector,sollars,smedley,seibel,scoville,saito,rummel,rowles,rouleau,roos,rogan,roemer,ream,raya,purkey,priester,perreira,penick,paulin,parkins,overcash,oleson,neves,muldrow,minard,midgett,michalak,melgar,mcentire,mcauliffe,marte,lydon,lindholm,leyba,langevin,lagasse,lafayette,kesler,kelton,kaminsky,jaggers,humbert,huck,howarth,hinrichs,higley,gupton,guimond,gravois,giguere,fretwell,fontes,feeley,faucher,eichhorn,ecker,earp,dole,dinger,derryberry,demars,deel,copenhaver,collinsworth,colangelo,cloyd,claiborne,caulfield,carlsen,calzada,caffey,broadus,brenneman,bouie,bodnar,blaney,blanc,beltz,behling,barahona,yockey,winkle,windom,wimer,villatoro,trexler,teran,taliaferro,sydnor,swinson,snelling,smtih,simonton,simoneaux,simoneau,sherrer,seavey,scheel,rushton,rupe,ruano,rippy,reiner,reiff,rabinowitz,quach,penley,odle,nock,minnich,mckown,mccarver,mcandrew,longley,laux,lamothe,lafreniere,kropp,krick,kates,jepson,huie,howse,howie,henriques,haydon,haught,hatter,hartzog,harkey,grimaldo,goshorn,gormley,gluck,gilroy,gillenwater,giffin,fluker,feder,eyre,eshelman,eakins,detwiler,delrosario,davisson,catalan,canning,calton,brammer,botelho,blakney,bartell,averett,askins,aker,witmer,winkelman,widmer,whittier,weitzel,wardell,wagers,ullman,tupper,tingley,tilghman,talton,simard,seda,scheller,sala,rundell,rost,ribeiro,rabideau,primm,pinon,peart,ostrom,ober,nystrom,nussbaum,naughton,murr,moorhead,monti,monteiro,melson,meissner,mclin,mcgruder,marotta,makowski,majewski,madewell,lunt,lukens,leininger,lebel,lakin,kepler,jaques,hunnicutt,hungerford,hoopes,hertz,heins,halliburton,grosso,gravitt,glasper,gallman,gallaway,funke,fulbright,falgout,eakin,dostie,dorado,dewberry,derose,cutshall,crampton,costanzo,colletti,cloninger,claytor,chiang,campagna,burd,brokaw,broaddus,bretz,brainard,binford,bilbrey,alpert,aitken,ahlers,zajac,woolfolk,witten,windle,wayland,tramel,tittle,talavera,suter,straley,specht,sommerville,soloman,skeens,sigman,sibert,shavers,schuck,schmit,sartain,sabol,rosenblatt,rollo,rashid,rabb,polston,nyberg,northrop,navarra,muldoon,mikesell,mcdougald,mcburney,mariscal,lozier,lingerfelt,legere,latour,lagunas,lacour,kurth,killen,kiely,kayser,kahle,isley,huertas,hower,hinz,haugh,gumm,galicia,fortunato,flake,dunleavy,duggins,doby,digiovanni,devaney,deltoro,cribb,corpuz,coronel,coen,charbonneau,caine,burchette,blakey,blakemore,bergquist,beene,beaudette,bayles,ballance,bakker,bailes,asberry,arwood,zucker,willman,whitesell,wald,walcott,vancleave,trump,strasser,simas,shick,schleicher,schaal,saleh,rotz,resnick,rainer,partee,ollis,oller,oday,noles,munday,mong,millican,merwin,mazzola,mansell,magallanes,llanes,lewellen,lepore,kisner,keesee,jeanlouis,ingham,hornbeck,hawn,hartz,harber,haffner,gutshall,guth,grays,gowan,finlay,finkelstein,eyler,enloe,dungan,diez,dearman,cull,crosson,chronister,cassity,campion,callihan,butz,breazeale,blumenthal,berkey,batty,batton,arvizu,alderete,aldana,albaugh,abernethy,wolter,wille,tweed,tollefson,thomasson,teter,testerman,sproul,spates,southwick,soukup,skelly,senter,sealey,sawicki,sargeant,rossiter,rosemond,repp,pifer,ormsby,nickelson,naumann,morabito,monzon,millsaps,millen,mcelrath,marcoux,mantooth,madson,macneil,mackinnon,louque,leister,lampley,kushner,krouse,kirwan,jessee,janson,jahn,jacquez,islas,hutt,holladay,hillyer,hepburn,hensel,harrold,gingrich,geis,gales,fults,finnell,ferri,featherston,epley,ebersole,eames,dunigan,drye,dismuke,devaughn,delorenzo,damiano,confer,collum,clower,clow,claussen,clack,caylor,cawthon,casias,carreno,bluhm,bingaman,bewley,belew,beckner,auld,amey,wolfenbarger,wilkey,wicklund,waltman,villalba,valero,valdovinos,ullrich,tyus,twyman,trost,tardif,tanguay,stripling,steinbach,shumpert,sasaki,sappington,sandusky,reinhold,reinert,quijano,placencia,pinkard,phinney,perrotta,pernell,parrett,oxendine,owensby,orman,nuno,mori,mcroberts,mcneese,mckamey,mccullum,markel,mardis,maines,lueck,lubin,lefler,leffler,larios,labarbera,kershner,josey,jeanbaptiste,izaguirre,hermosillo,haviland,hartshorn,hafner,ginter,getty,franck,fiske,dufrene,doody,davie,dangerfield,dahlberg,cuthbertson,crone,coffelt,chidester,chesson,cauley,caudell,cantara,campo,caines,bullis,bucci,brochu,bogard,bickerstaff,benning,arzola,antonelli,adkinson,zellers,wulf,worsley,woolridge,whitton,westerfield,walczak,vassar,truett,trueblood,trawick,townsley,topping,tobar,telford,steverson,stagg,sitton,sill,sergent,schoenfeld,sarabia,rutkowski,rubenstein,rigdon,prentiss,pomerleau,plumlee,philbrick,patnode,oloughlin,obregon,nuss,morell,mikell,mele,mcinerney,mcguigan,mcbrayer,lollar,kuehl,kinzer,kamp,joplin,jacobi,howells,holstein,hedden,hassler,harty,halle,greig,gouge,goodrum,gerhart,geier,geddes,gast,forehand,ferree,fendley,feltner,esqueda,encarnacion,eichler,egger,edmundson,eatmon,doud,donohoe,donelson,dilorenzo,digiacomo,diggins,delozier,dejong,danford,crippen,coppage,cogswell,clardy,cioffi,cabe,brunette,bresnahan,blomquist,blackstone,biller,bevis,bevan,bethune,benbow,baty,basinger,balcom,andes,aman,aguero,adkisson,yandell,wilds,whisenhunt,weigand,weeden,voight,villar,trottier,tillett,suazo,setser,scurry,schuh,schreck,schauer,samora,roane,rinker,reimers,ratchford,popovich,parkin,natal,melville,mcbryde,magdaleno,loehr,lockman,lingo,leduc,larocca,lamere,laclair,krall,korte,koger,jalbert,hughs,higbee,henton,heaney,haith,gump,greeson,goodloe,gholston,gasper,gagliardi,fregoso,farthing,fabrizio,ensor,elswick,elgin,eklund,eaddy,drouin,dorton,dizon,derouen,deherrera,davy,dampier,cullum,culley,cowgill,cardoso,cardinale,brodsky,broadbent,brimmer,briceno,branscum,bolyard,boley,bennington,beadle,baur,ballentine,azure,aultman,arciniega,aguila,aceves,yepez,woodrum,wethington,weissman,veloz,trusty,troup,trammel,tarpley,stivers,steck,sprayberry,spraggins,spitler,spiers,sohn,seagraves,schiffman,rudnick,rizo,riccio,rennie,quackenbush,puma,plott,pearcy,parada,paiz,munford,moskowitz,mease,mcnary,mccusker,lozoya,longmire,loesch,lasky,kuhlmann,krieg,koziol,kowalewski,konrad,kindle,jowers,jolin,jaco,horgan,hine,hileman,hepner,heise,heady,hawkinson,hannigan,haberman,guilford,grimaldi,garton,gagliano,fruge,follett,fiscus,ferretti,ebner,easterday,eanes,dirks,dimarco,depalma,deforest,cruce,craighead,christner,candler,cadwell,burchell,buettner,brinton,brazier,brannen,brame,bova,bomar,blakeslee,belknap,bangs,balzer,athey,armes,alvis,alverson,alvardo,yeung,wheelock,westlund,wessels,volkman,threadgill,thelen,tague,symons,swinford,sturtevant,straka,stier,stagner,segarra,seawright,rutan,roux,ringler,riker,ramsdell,quattlebaum,purifoy,poulson,permenter,peloquin,pasley,pagel,osman,obannon,nygaard,newcomer,munos,motta,meadors,mcquiston,mcniel,mcmann,mccrae,mayne,matte,legault,lechner,kucera,krohn,kratzer,koopman,jeske,horrocks,hock,hibbler,hesson,hersh,harvin,halvorsen,griner,grindle,gladstone,garofalo,frampton,forbis,eddington,diorio,dingus,dewar,desalvo,curcio,creasy,cortese,cordoba,connally,cluff,cascio,capuano,canaday,calabro,bussard,brayton,borja,bigley,arnone,arguelles,acuff,zamarripa,wooton,widner,wideman,threatt,thiele,templin,teeters,synder,swint,swick,sturges,stogner,stedman,spratt,siegfried,shetler,scull,savino,sather,rothwell,rook,rone,rhee,quevedo,privett,pouliot,poche,pickel,petrillo,pellegrini,peaslee,partlow,otey,nunnery,morelock,morello,meunier,messinger,mckie,mccubbin,mccarron,lerch,lavine,laverty,lariviere,lamkin,kugler,krol,kissel,keeter,hubble,hickox,hetzel,hayner,hagy,hadlock,groh,gottschalk,goodsell,gassaway,garrard,galligan,firth,fenderson,feinstein,etienne,engleman,emrick,ellender,drews,doiron,degraw,deegan,dart,crissman,corr,cookson,coil,cleaves,charest,chapple,chaparro,castano,carpio,byer,bufford,bridgewater,bridgers,brandes,borrero,bonanno,aube,ancheta,abarca,abad,wooster,wimbush,willhite,willams,wigley,weisberg,wardlaw,vigue,vanhook,unknow,torre,tasker,tarbox,strachan,slover,shamblin,semple,schuyler,schrimsher,sayer,salzman,rubalcava,riles,reneau,reichel,rayfield,rabon,pyatt,prindle,poss,polito,plemmons,pesce,perrault,pereyra,ostrowski,nilsen,niemeyer,munsey,mundell,moncada,miceli,meader,mcmasters,mckeehan,matsumoto,marron,marden,lizarraga,lingenfelter,lewallen,langan,lamanna,kovac,kinsler,kephart,keown,kass,kammerer,jeffreys,hysell,hosmer,hardnett,hanner,guyette,greening,glazer,ginder,fromm,fluellen,finkle,fessler,essary,eisele,duren,dittmer,crochet,cosentino,cogan,coelho,cavin,carrizales,campuzano,brough,bopp,bookman,bobb,blouin,beesley,battista,bascom,bakken,badgett,arneson,anselmo,albino,ahumada,woodyard,wolters,wireman,willison,warman,waldrup,vowell,vantassel,twombly,toomer,tennison,teets,tedeschi,swanner,stutz,stelly,sheehy,schermerhorn,scala,sandidge,salters,salo,saechao,roseboro,rolle,ressler,renz,renn,redford,raposa,rainbolt,pelfrey,orndorff,oney,nolin,nimmons,nardone,myhre,morman,menjivar,mcglone,mccammon,maxon,marciano,manus,lowrance,lorenzen,lonergan,lollis,littles,lindahl,lamas,lach,kuster,krawczyk,knuth,knecht,kirkendall,keitt,keever,kantor,jarboe,hoye,houchens,holter,holsinger,hickok,helwig,helgeson,hassett,harner,hamman,hames,hadfield,goree,goldfarb,gaughan,gaudreau,gantz,gallion,frady,foti,flesher,ferrin,faught,engram,donegan,desouza,degroot,cutright,crowl,criner,coan,clinkscales,chewning,chavira,catchings,carlock,bulger,buenrostro,bramblett,brack,boulware,bookout,bitner,birt,baranowski,baisden,allmon,acklin,yoakum,wilbourn,whisler,weinberger,washer,vasques,vanzandt,vanatta,troxler,tomes,tindle,tims,throckmorton,thach,stpeter,stlaurent,stenson,spry,spitz,songer,snavely,shroyer,shortridge,shenk,sevier,seabrook,scrivner,saltzman,rosenberry,rockwood,robeson,roan,reiser,ramires,raber,posner,popham,piotrowski,pinard,peterkin,pelham,peiffer,peay,nadler,musso,millett,mestas,mcgowen,marques,marasco,manriquez,manos,mair,lipps,leiker,krumm,knorr,kinslow,kessel,kendricks,kelm,irick,ickes,hurlburt,horta,hoekstra,heuer,helmuth,heatherly,hampson,hagar,haga,greenlaw,grau,godbey,gingras,gillies,gibb,gayden,gauvin,garrow,fontanez,florio,finke,fasano,ezzell,ewers,eveland,eckenrode,duclos,drumm,dimmick,delancey,defazio,dashiell,cusack,crowther,crigger,cray,coolidge,coldiron,cleland,chalfant,cassel,camire,cabrales,broomfield,brittingham,brisson,brickey,braziel,brazell,bragdon,boulanger,boman,bohannan,beem,barre,azar,ashbaugh,armistead,almazan,adamski,zendejas,winburn,willaims,wilhoit,westberry,wentzel,wendling,visser,vanscoy,vankirk,vallee,tweedy,thornberry,sweeny,spradling,spano,smelser,shim,sechrist,schall,scaife,rugg,rothrock,roesler,riehl,ridings,render,ransdell,radke,pinero,petree,pendergast,peluso,pecoraro,pascoe,panek,oshiro,navarrette,murguia,moores,moberg,michaelis,mcwhirter,mcsweeney,mcquade,mccay,mauk,mariani,marceau,mandeville,maeda,lunde,ludlow,loeb,lindo,linderman,leveille,leith,larock,lambrecht,kulp,kinsley,kimberlin,kesterson,hoyos,helfrich,hanke,grisby,goyette,gouveia,glazier,gile,gerena,gelinas,gasaway,funches,fujimoto,flynt,fenske,fellers,fehr,eslinger,escalera,enciso,duley,dittman,dineen,diller,devault,collings,clymer,clowers,chavers,charland,castorena,castello,camargo,bunce,bullen,boyes,borchers,borchardt,birnbaum,birdsall,billman,benites,bankhead,ange,ammerman,adkison,winegar,wickman,warr,warnke,villeneuve,veasey,vassallo,vannatta,vadnais,twilley,towery,tomblin,tippett,theiss,talkington,talamantes,swart,swanger,streit,stines,stabler,spurling,sobel,sine,simmers,shippy,shiflett,shearin,sauter,sanderlin,rusch,runkle,ruckman,rorie,roesch,richert,rehm,randel,ragin,quesenberry,puentes,plyler,plotkin,paugh,oshaughnessy,ohalloran,norsworthy,niemann,nader,moorefield,mooneyham,modica,miyamoto,mickel,mebane,mckinnie,mazurek,mancilla,lukas,lovins,loughlin,lotz,lindsley,liddle,levan,lederman,leclaire,lasseter,lapoint,lamoreaux,lafollette,kubiak,kirtley,keffer,kaczmarek,housman,hiers,hibbert,herrod,hegarty,hathorn,greenhaw,grafton,govea,futch,furst,franko,forcier,foran,flickinger,fairfield,eure,emrich,embrey,edgington,ecklund,eckard,durante,deyo,delvecchio,dade,currey,creswell,cottrill,casavant,cartier,cargile,capel,cammack,calfee,burse,burruss,brust,brousseau,bridwell,braaten,borkholder,bloomquist,bjork,bartelt,amburgey,yeary,whitefield,vinyard,vanvalkenburg,twitchell,timmins,tapper,stringham,starcher,spotts,slaugh,simonsen,sheffer,sequeira,rosati,rhymes,quint,pollak,peirce,patillo,parkerson,paiva,nilson,nevin,narcisse,mitton,merriam,merced,meiners,mckain,mcelveen,mcbeth,marsden,marez,manke,mahurin,mabrey,luper,krull,hunsicker,hornbuckle,holtzclaw,hinnant,heston,hering,hemenway,hegwood,hearns,halterman,guiterrez,grote,granillo,grainger,glasco,gilder,garren,garlock,garey,fryar,fredricks,fraizer,foshee,ferrel,felty,everitt,evens,esser,elkin,eberhart,durso,duguay,driskill,doster,dewall,deveau,demps,demaio,delreal,deleo,darrah,cumberbatch,culberson,cranmer,cordle,colgan,chesley,cavallo,castellon,castelli,carreras,carnell,carlucci,bontrager,blumberg,blasingame,becton,artrip,andujar,alkire,alder,zukowski,zuckerman,wroblewski,wrigley,woodside,wigginton,westman,westgate,werts,washam,wardlow,walser,waiters,tadlock,stringfield,stimpson,stickley,standish,spurlin,spindler,speller,spaeth,sotomayor,sluder,shryock,shepardson,shatley,scannell,santistevan,rosner,resto,reinhard,rathburn,prisco,poulsen,pinney,phares,pennock,pastrana,oviedo,ostler,nauman,mulford,moise,moberly,mirabal,metoyer,metheny,mentzer,meldrum,mcinturff,mcelyea,mcdougle,massaro,lumpkins,loveday,lofgren,lirette,lesperance,lefkowitz,ledger,lauzon,lachapelle,klassen,keough,kempton,kaelin,jeffords,hsieh,hoyer,horwitz,hoeft,hennig,haskin,gourdine,golightly,girouard,fulgham,fritsch,freer,frasher,foulk,firestone,fiorentino,fedor,ensley,englehart,eells,dunphy,donahoe,dileo,dibenedetto,dabrowski,crick,coonrod,conder,coddington,chunn,chaput,cerna,carreiro,calahan,braggs,bourdon,bollman,bittle,bauder,barreras,aubuchon,anzalone,adamo,zerbe,willcox,westberg,weikel,waymire,vroman,vinci,vallejos,truesdell,troutt,trotta,tollison,toles,tichenor,symonds,surles,strayer,stgeorge,sroka,sorrentino,solares,snelson,silvestri,sikorski,shawver,schumaker,schorr,schooley,scates,satterlee,satchell,rymer,roselli,robitaille,riegel,regis,reames,provenzano,priestley,plaisance,pettey,palomares,nowakowski,monette,minyard,mclamb,mchone,mccarroll,masson,magoon,maddy,lundin,licata,leonhardt,landwehr,kircher,kinch,karpinski,johannsen,hussain,houghtaling,hoskinson,hollaway,holeman,hobgood,hiebert,goggin,geissler,gadbois,gabaldon,fleshman,flannigan,fairman,eilers,dycus,dunmire,duffield,dowler,deloatch,dehaan,deemer,clayborn,christofferso,chilson,chesney,chatfield,carron,canale,brigman,branstetter,bosse,borton,bonar,biron,barroso,arispe,zacharias,zabel,yaeger,woolford,whetzel,weakley,veatch,vandeusen,tufts,troxel,troche,traver,townsel,talarico,swilley,sterrett,stenger,speakman,sowards,sours,souders,souder,soles,sobers,snoddy,smither,shute,shoaf,shahan,schuetz,scaggs,santini,rosson,rolen,robidoux,rentas,recio,pixley,pawlowski,pawlak,paull,overbey,orear,oliveri,oldenburg,nutting,naugle,mossman,misner,milazzo,michelson,mcentee,mccullar,mccree,mcaleer,mazzone,mandell,manahan,malott,maisonet,mailloux,lumley,lowrie,louviere,lipinski,lindemann,leppert,leasure,labarge,kubik,knisely,knepp,kenworthy,kennelly,kelch,kanter,houchin,hosley,hosler,hollon,holleman,heitman,haggins,gwaltney,goulding,gorden,geraci,gathers,frison,feagin,falconer,espada,erving,erikson,eisenhauer,ebeling,durgin,dowdle,dinwiddie,delcastillo,dedrick,crimmins,covell,cournoyer,coria,cohan,cataldo,carpentier,canas,campa,brode,brashears,blaser,bicknell,bednar,barwick,ascencio,althoff,almodovar,alamo,zirkle,zabala,wolverton,winebrenner,wetherell,westlake,wegener,weddington,tuten,trosclair,tressler,theroux,teske,swinehart,swensen,sundquist,southall,socha,sizer,silverberg,shortt,shimizu,sherrard,shaeffer,scheid,scheetz,saravia,sanner,rubinstein,rozell,romer,rheaume,reisinger,randles,pullum,petrella,payan,nordin,norcross,nicoletti,nicholes,newbold,nakagawa,monteith,milstead,milliner,mellen,mccardle,liptak,leitch,latimore,larrison,landau,laborde,koval,izquierdo,hymel,hoskin,holte,hoefer,hayworth,hausman,harrill,harrel,hardt,gully,groover,grinnell,greenspan,graver,grandberry,gorrell,goldenberg,goguen,gilleland,fuson,feldmann,everly,dyess,dunnigan,downie,dolby,deatherage,cosey,cheever,celaya,caver,cashion,caplinger,cansler,byrge,bruder,breuer,breslin,brazelton,botkin,bonneau,bondurant,bohanan,bogue,bodner,boatner,blatt,bickley,belliveau,beiler,beier,beckstead,bachmann,atkin,altizer,alloway,allaire,albro,abron,zellmer,yetter,yelverton,wiens,whidden,viramontes,vanwormer,tarantino,tanksley,sumlin,strauch,strang,stice,spahn,sosebee,sigala,shrout,seamon,schrum,schneck,schantz,ruddy,romig,roehl,renninger,reding,polak,pohlman,pasillas,oldfield,oldaker,ohanlon,ogilvie,norberg,nolette,neufeld,nellis,mummert,mulvihill,mullaney,monteleone,mendonca,meisner,mcmullan,mccluney,mattis,massengill,manfredi,luedtke,lounsbury,liberatore,lamphere,laforge,jourdan,iorio,iniguez,ikeda,hubler,hodgdon,hocking,heacock,haslam,haralson,hanshaw,hannum,hallam,haden,garnes,garces,gammage,gambino,finkel,faucett,ehrhardt,eggen,dusek,durrant,dubay,dones,depasquale,delucia,degraff,decamp,davalos,cullins,conard,clouser,clontz,cifuentes,chappel,chaffins,celis,carwile,byram,bruggeman,bressler,brathwaite,brasfield,bradburn,boose,bodie,blosser,bertsch,bernardi,bernabe,bengtson,barrette,astorga,alday,albee,abrahamson,yarnell,wiltse,wiebe,waguespack,vasser,upham,turek,traxler,torain,tomaszewski,tinnin,tiner,tindell,styron,stahlman,staab,skiba,sheperd,seidl,secor,schutte,sanfilippo,ruder,rondon,rearick,procter,prochaska,pettengill,pauly,neilsen,nally,mullenax,morano,meads,mcnaughton,mcmurtry,mcmath,mckinsey,matthes,massenburg,marlar,margolis,malin,magallon,mackin,lovette,loughran,loring,longstreet,loiselle,lenihan,kunze,koepke,kerwin,kalinowski,kagan,innis,innes,holtzman,heinemann,harshman,haider,haack,grondin,grissett,greenawalt,goudy,goodlett,goldston,gokey,gardea,galaviz,gafford,gabrielson,furlow,fritch,fordyce,folger,elizalde,ehlert,eckhoff,eccleston,ealey,dubin,diemer,deschamps,delapena,decicco,debolt,cullinan,crittendon,crase,cossey,coppock,coots,colyer,cluck,chamberland,burkhead,bumpus,buchan,borman,birkholz,berardi,benda,behnke,barter,amezquita,wotring,wirtz,wingert,wiesner,whitesides,weyant,wainscott,venezia,varnell,tussey,thurlow,tabares,stiver,stell,starke,stanhope,stanek,sisler,sinnott,siciliano,shehan,selph,seager,scurlock,scranton,santucci,santangelo,saltsman,rogge,rettig,renwick,reidy,reider,redfield,premo,parente,paolucci,palmquist,ohler,netherton,mutchler,morita,mistretta,minnis,middendorf,menzel,mendosa,mendelson,meaux,mcspadden,mcquaid,mcnatt,manigault,maney,mager,lukes,lopresti,liriano,letson,lechuga,lazenby,lauria,larimore,krupp,krupa,kopec,kinchen,kifer,kerney,kerner,kennison,kegley,karcher,justis,johson,jellison,janke,huskins,holzman,hinojos,hefley,hatmaker,harte,halloway,hallenbeck,goodwyn,glaspie,geise,fullwood,fryman,frakes,fraire,farrer,enlow,engen,ellzey,eckles,earles,dunkley,drinkard,dreiling,draeger,dinardo,dills,desroches,desantiago,curlee,crumbley,critchlow,coury,courtright,coffield,cleek,charpentier,cardone,caples,cantin,buntin,bugbee,brinkerhoff,brackin,bourland,blassingame,beacham,banning,auguste,andreasen,amann,almon,alejo,adelman,abston,yerger,wymer,woodberry,windley,whiteaker,westfield,weibel,wanner,waldrep,villani,vanarsdale,utterback,updike,triggs,topete,tolar,tigner,thoms,tauber,tarvin,tally,swiney,sweatman,studebaker,stennett,starrett,stannard,stalvey,sonnenberg,smithey,sieber,sickles,shinault,segars,sanger,salmeron,rothe,rizzi,restrepo,ralls,ragusa,quiroga,papenfuss,oropeza,okane,mudge,mozingo,molinaro,mcvicker,mcgarvey,mcfalls,mccraney,matus,magers,llanos,livermore,linehan,leitner,laymon,lawing,lacourse,kwong,kollar,kneeland,kennett,kellett,kangas,janzen,hutter,huling,hofmeister,hewes,harjo,habib,guice,grullon,greggs,grayer,granier,grable,gowdy,giannini,getchell,gartman,garnica,ganey,gallimore,fetters,fergerson,farlow,fagundes,exley,esteves,enders,edenfield,easterwood,drakeford,dipasquale,desousa,deshields,deeter,dedmon,debord,daughtery,cutts,courtemanche,coursey,copple,coomes,collis,cogburn,clopton,choquette,chaidez,castrejon,calhoon,burbach,bulloch,buchman,bruhn,bohon,blough,baynes,barstow,zeman,zackery,yardley,yamashita,wulff,wilken,wiliams,wickersham,wible,whipkey,wedgeworth,walmsley,walkup,vreeland,verrill,umana,traub,swingle,summey,stroupe,stockstill,steffey,stefanski,statler,stapp,speights,solari,soderberg,shunk,shorey,shewmaker,sheilds,schiffer,schank,schaff,sagers,rochon,riser,rickett,reale,raglin,polen,plata,pitcock,percival,palen,orona,oberle,nocera,navas,nault,mullings,montejano,monreal,minick,middlebrook,meece,mcmillion,mccullen,mauck,marshburn,maillet,mahaney,magner,maclin,lucey,litteral,lippincott,leite,leaks,lamarre,jurgens,jerkins,jager,hurwitz,hughley,hotaling,horstman,hohman,hocker,hively,hipps,hessler,hermanson,hepworth,helland,hedlund,harkless,haigler,gutierez,grindstaff,glantz,giardina,gerken,gadsden,finnerty,farnum,encinas,drakes,dennie,cutlip,curtsinger,couto,cortinas,corby,chiasson,carle,carballo,brindle,borum,bober,blagg,berthiaume,beahm,batres,basnight,backes,axtell,atterberry,alvares,alegria,woodell,wojciechowski,winfree,winbush,wiest,wesner,wamsley,wakeman,verner,truex,trafton,toman,thorsen,theus,tellier,tallant,szeto,strope,stills,simkins,shuey,shaul,servin,serio,serafin,salguero,ryerson,rudder,ruark,rother,rohrbaugh,rohrbach,rohan,rogerson,risher,reeser,pryce,prokop,prins,priebe,prejean,pinheiro,petrone,petri,penson,pearlman,parikh,natoli,murakami,mullikin,mullane,motes,morningstar,mcveigh,mcgrady,mcgaughey,mccurley,marchan,manske,lusby,linde,likens,licon,leroux,lemaire,legette,laskey,laprade,laplant,kolar,kittredge,kinley,kerber,kanagy,jetton,janik,ippolito,inouye,hunsinger,howley,howery,horrell,holthaus,hiner,hilson,hilderbrand,hartzler,harnish,harada,hansford,halligan,hagedorn,gwynn,gudino,greenstein,greear,gracey,goudeau,goodner,ginsburg,gerth,gerner,fujii,frier,frenette,folmar,fleisher,fleischmann,fetzer,eisenman,earhart,dupuy,dunkelberger,drexler,dillinger,dilbeck,dewald,demby,deford,craine,chesnut,casady,carstens,carrick,carino,carignan,canchola,bushong,burman,buono,brownlow,broach,britten,brickhouse,boyden,boulton,borland,bohrer,blubaugh,bever,berggren,benevides,arocho,arends,amezcua,almendarez,zalewski,witzel,winkfield,wilhoite,vangundy,vanfleet,vanetten,vandergriff,urbanski,troiano,thibodaux,straus,stoneking,stjean,stillings,stange,speicher,speegle,smeltzer,slawson,simmonds,shuttleworth,serpa,senger,seidman,schweiger,schloss,schimmel,schechter,sayler,sabatini,ronan,rodiguez,riggleman,richins,reamer,prunty,porath,plunk,piland,philbrook,pettitt,perna,peralez,pascale,padula,oboyle,nivens,nickols,mundt,munden,montijo,mcmanis,mcgrane,mccrimmon,manzi,mangold,malick,mahar,maddock,losey,litten,leedy,leavell,ladue,krahn,kluge,junker,iversen,imler,hurtt,huizar,hubbert,howington,hollomon,holdren,hoisington,heiden,hauge,hartigan,gutirrez,griffie,greenhill,gratton,granata,gottfried,gertz,gautreaux,furry,furey,funderburg,flippen,fitzgibbon,drucker,donoghue,dildy,devers,detweiler,despres,denby,degeorge,cueto,cranston,courville,clukey,cirillo,chivers,caudillo,butera,bulluck,buckmaster,braunstein,bracamonte,bourdeau,bonnette".split(","),
  male_names: "james,john,robert,michael,william,david,richard,charles,joseph,thomas,christopher,daniel,paul,mark,donald,george,kenneth,steven,edward,brian,ronald,anthony,kevin,jason,matthew,gary,timothy,jose,larry,jeffrey,frank,scott,eric,stephen,andrew,raymond,gregory,joshua,jerry,dennis,walter,patrick,peter,harold,douglas,henry,carl,arthur,ryan,roger,joe,juan,jack,albert,jonathan,justin,terry,gerald,keith,samuel,willie,ralph,lawrence,nicholas,roy,benjamin,bruce,brandon,adam,harry,fred,wayne,billy,steve,louis,jeremy,aaron,randy,eugene,carlos,russell,bobby,victor,ernest,phillip,todd,jesse,craig,alan,shawn,clarence,sean,philip,chris,johnny,earl,jimmy,antonio,danny,bryan,tony,luis,mike,stanley,leonard,nathan,dale,manuel,rodney,curtis,norman,marvin,vincent,glenn,jeffery,travis,jeff,chad,jacob,melvin,alfred,kyle,francis,bradley,jesus,herbert,frederick,ray,joel,edwin,don,eddie,ricky,troy,randall,barry,bernard,mario,leroy,francisco,marcus,micheal,theodore,clifford,miguel,oscar,jay,jim,tom,calvin,alex,jon,ronnie,bill,lloyd,tommy,leon,derek,darrell,jerome,floyd,leo,alvin,tim,wesley,dean,greg,jorge,dustin,pedro,derrick,dan,zachary,corey,herman,maurice,vernon,roberto,clyde,glen,hector,shane,ricardo,sam,rick,lester,brent,ramon,tyler,gilbert,gene,marc,reginald,ruben,brett,nathaniel,rafael,edgar,milton,raul,ben,cecil,duane,andre,elmer,brad,gabriel,ron,roland,jared,adrian,karl,cory,claude,erik,darryl,neil,christian,javier,fernando,clinton,ted,mathew,tyrone,darren,lonnie,lance,cody,julio,kurt,allan,clayton,hugh,max,dwayne,dwight,armando,felix,jimmie,everett,ian,ken,bob,jaime,casey,alfredo,alberto,dave,ivan,johnnie,sidney,byron,julian,isaac,clifton,willard,daryl,virgil,andy,salvador,kirk,sergio,seth,kent,terrance,rene,eduardo,terrence,enrique,freddie,stuart,fredrick,arturo,alejandro,joey,nick,luther,wendell,jeremiah,evan,julius,donnie,otis,trevor,luke,homer,gerard,doug,kenny,hubert,angelo,shaun,lyle,matt,alfonso,orlando,rex,carlton,ernesto,pablo,lorenzo,omar,wilbur,blake,horace,roderick,kerry,abraham,rickey,ira,andres,cesar,johnathan,malcolm,rudolph,damon,kelvin,rudy,preston,alton,archie,marco,pete,randolph,garry,geoffrey,jonathon,felipe,bennie,gerardo,dominic,loren,delbert,colin,guillermo,earnest,benny,noel,rodolfo,myron,edmund,salvatore,cedric,lowell,gregg,sherman,devin,sylvester,roosevelt,israel,jermaine,forrest,wilbert,leland,simon,irving,owen,rufus,woodrow,sammy,kristopher,levi,marcos,gustavo,jake,lionel,marty,gilberto,clint,nicolas,laurence,ismael,orville,drew,ervin,dewey,wilfred,josh,hugo,ignacio,caleb,tomas,sheldon,erick,frankie,darrel,rogelio,terence,alonzo,elias,bert,elbert,ramiro,conrad,noah,grady,phil,cornelius,lamar,rolando,clay,percy,bradford,merle,darin,amos,terrell,moses,irvin,saul,roman,darnell,randal,tommie,timmy,darrin,brendan,toby,van,abel,dominick,emilio,elijah,cary,domingo,aubrey,emmett,marlon,emanuel,jerald,edmond,emil,dewayne,otto,teddy,reynaldo,bret,jess,trent,humberto,emmanuel,stephan,louie,vicente,lamont,garland,micah,efrain,heath,rodger,demetrius,ethan,eldon,rocky,pierre,eli,bryce,antoine,robbie,kendall,royce,sterling,grover,elton,cleveland,dylan,chuck,damian,reuben,stan,leonardo,russel,erwin,benito,hans,monte,blaine,ernie,curt,quentin,agustin,jamal,devon,adolfo,tyson,wilfredo,bart,jarrod,vance,denis,damien,joaquin,harlan,desmond,elliot,darwin,gregorio,kermit,roscoe,esteban,anton,solomon,norbert,elvin,nolan,carey,rod,quinton,hal,brain,rob,elwood,kendrick,darius,moises,marlin,fidel,thaddeus,cliff,marcel,ali,raphael,bryon,armand,alvaro,jeffry,dane,joesph,thurman,ned,sammie,rusty,michel,monty,rory,fabian,reggie,kris,isaiah,gus,avery,loyd,diego,adolph,millard,rocco,gonzalo,derick,rodrigo,gerry,rigoberto,alphonso,rickie,noe,vern,elvis,bernardo,mauricio,hiram,donovan,basil,nickolas,scot,vince,quincy,eddy,sebastian,federico,ulysses,heriberto,donnell,denny,gavin,emery,romeo,jayson,dion,dante,clement,coy,odell,jarvis,bruno,issac,dudley,sanford,colby,carmelo,nestor,hollis,stefan,donny,linwood,beau,weldon,galen,isidro,truman,delmar,johnathon,silas,frederic,irwin,merrill,charley,marcelino,carlo,trenton,kurtis,aurelio,winfred,vito,collin,denver,leonel,emory,pasquale,mohammad,mariano,danial,landon,dirk,branden,adan,numbers,clair,buford,bernie,wilmer,emerson,zachery,jacques,errol,josue,edwardo,wilford,theron,raymundo,daren,tristan,robby,lincoln,jame,genaro,octavio,cornell,hung,arron,antony,herschel,alva,giovanni,garth,cyrus,cyril,ronny,stevie,lon,kennith,carmine,augustine,erich,chadwick,wilburn,russ,myles,jonas,mitchel,mervin,zane,jamel,lazaro,alphonse,randell,johnie,jarrett,ariel,abdul,dusty,luciano,seymour,scottie,eugenio,mohammed,arnulfo,lucien,ferdinand,thad,ezra,aldo,rubin,mitch,earle,abe,marquis,lanny,kareem,jamar,boris,isiah,emile,elmo,aron,leopoldo,everette,josef,eloy,dorian,rodrick,reinaldo,lucio,jerrod,weston,hershel,lemuel,lavern,burt,jules,gil,eliseo,ahmad,nigel,efren,antwan,alden,margarito,refugio,dino,osvaldo,les,deandre,normand,kieth,ivory,trey,norberto,napoleon,jerold,fritz,rosendo,milford,sang,deon,christoper,alfonzo,lyman,josiah,brant,wilton,rico,jamaal,dewitt,brenton,yong,olin,faustino,claudio,judson,gino,edgardo,alec,jarred,donn,trinidad,tad,porfirio,odis,lenard,chauncey,tod,mel,marcelo,kory,augustus,keven,hilario,bud,sal,orval,mauro,dannie,zachariah,olen,anibal,milo,jed,thanh,amado,lenny,tory,richie,horacio,brice,mohamed,delmer,dario,mac,jonah,jerrold,robt,hank,sung,rupert,rolland,kenton,damion,chi,antone,waldo,fredric,bradly,kip,burl,tyree,jefferey,ahmed,willy,stanford,oren,moshe,mikel,enoch,brendon,quintin,jamison,florencio,darrick,tobias,minh,hassan,giuseppe,demarcus,cletus,tyrell,lyndon,keenan,werner,theo,geraldo,columbus,chet,bertram,markus,huey,hilton,dwain,donte,tyron,omer,isaias,hipolito,fermin,chung,adalberto,jamey,teodoro,mckinley,maximo,raleigh,lawerence,abram,rashad,emmitt,daron,chong,samual,otha,miquel,eusebio,dong,domenic,darron,wilber,renato,hoyt,haywood,ezekiel,chas,florentino,elroy,clemente,arden,neville,edison,deshawn,carrol,shayne,nathanial,jordon,danilo,claud,sherwood,raymon,rayford,cristobal,ambrose,titus,hyman,felton,ezequiel,erasmo,lonny,milan,lino,jarod,herb,andreas,rhett,jude,douglass,cordell,oswaldo,ellsworth,virgilio,toney,nathanael,benedict,mose,hong,isreal,garret,fausto,arlen,zack,modesto,francesco,manual,gaylord,gaston,filiberto,deangelo,michale,granville,malik,zackary,tuan,nicky,cristopher,antione,malcom,korey,jospeh,colton,waylon,hosea,shad,santo,rudolf,rolf,renaldo,marcellus,lucius,kristofer,harland,arnoldo,rueben,leandro,kraig,jerrell,jeromy,hobert,cedrick,arlie,winford,wally,luigi,keneth,jacinto,graig,franklyn,edmundo,leif,jeramy,willian,vincenzo,shon,michal,lynwood,jere,elden,darell,broderick,alonso".split(",")
};

module.exports = frequency_lists;



},{}],7:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var feedback, matching, scoring, time, time_estimates, zxcvbn;

matching = require('./matching');

scoring = require('./scoring');

time_estimates = require('./time_estimates');

feedback = require('./feedback');

time = function() {
  return (new Date()).getTime();
};

zxcvbn = function(password, user_inputs) {
  var arg, attack_times, i, len, matches, prop, ref, result, sanitized_inputs, start, val;
  if (user_inputs == null) {
    user_inputs = [];
  }
  start = time();
  sanitized_inputs = [];
  for (i = 0, len = user_inputs.length; i < len; i++) {
    arg = user_inputs[i];
    if ((ref = typeof arg) === "string" || ref === "number" || ref === "boolean") {
      sanitized_inputs.push(arg.toString().toLowerCase());
    }
  }
  matching.set_user_input_dictionary(sanitized_inputs);
  matches = matching.omnimatch(password);
  result = scoring.most_guessable_match_sequence(password, matches);
  result.calc_time = time() - start;
  attack_times = time_estimates.estimate_attack_times(result.guesses);
  for (prop in attack_times) {
    val = attack_times[prop];
    result[prop] = val;
  }
  result.feedback = feedback.get_feedback(result.score, result.sequence);
  return result;
};

module.exports = zxcvbn;



},{"./feedback":5,"./matching":8,"./scoring":9,"./time_estimates":10}],8:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var DATE_MAX_YEAR, DATE_MIN_YEAR, DATE_SPLITS, GRAPHS, L33T_TABLE, RANKED_DICTIONARIES, REGEXEN, adjacency_graphs, build_ranked_dict, frequency_lists, lst, matching, name, scoring;

frequency_lists = require('./frequency_lists');

adjacency_graphs = require('./adjacency_graphs');

scoring = require('./scoring');

build_ranked_dict = function(ordered_list) {
  var i, len1, o, result, word;
  result = {};
  i = 1;
  for (o = 0, len1 = ordered_list.length; o < len1; o++) {
    word = ordered_list[o];
    result[word] = i;
    i += 1;
  }
  return result;
};

RANKED_DICTIONARIES = {};

for (name in frequency_lists) {
  lst = frequency_lists[name];
  RANKED_DICTIONARIES[name] = build_ranked_dict(lst);
}

GRAPHS = {
  qwerty: adjacency_graphs.qwerty,
  dvorak: adjacency_graphs.dvorak,
  keypad: adjacency_graphs.keypad,
  mac_keypad: adjacency_graphs.mac_keypad
};

L33T_TABLE = {
  a: ['4', '@'],
  b: ['8'],
  c: ['(', '{', '[', '<'],
  e: ['3'],
  g: ['6', '9'],
  i: ['1', '!', '|'],
  l: ['1', '|', '7'],
  o: ['0'],
  s: ['$', '5'],
  t: ['+', '7'],
  x: ['%'],
  z: ['2']
};

REGEXEN = {
  recent_year: /19\d\d|200\d|201\d/g
};

DATE_MAX_YEAR = 2050;

DATE_MIN_YEAR = 1000;

DATE_SPLITS = {
  4: [[1, 2], [2, 3]],
  5: [[1, 3], [2, 3]],
  6: [[1, 2], [2, 4], [4, 5]],
  7: [[1, 3], [2, 3], [4, 5], [4, 6]],
  8: [[2, 4], [4, 6]]
};

matching = {
  empty: function(obj) {
    var k;
    return ((function() {
      var results;
      results = [];
      for (k in obj) {
        results.push(k);
      }
      return results;
    })()).length === 0;
  },
  extend: function(lst, lst2) {
    return lst.push.apply(lst, lst2);
  },
  translate: function(string, chr_map) {
    var chr;
    return ((function() {
      var len1, o, ref, results;
      ref = string.split('');
      results = [];
      for (o = 0, len1 = ref.length; o < len1; o++) {
        chr = ref[o];
        results.push(chr_map[chr] || chr);
      }
      return results;
    })()).join('');
  },
  mod: function(n, m) {
    return ((n % m) + m) % m;
  },
  sorted: function(matches) {
    return matches.sort(function(m1, m2) {
      return (m1.i - m2.i) || (m1.j - m2.j);
    });
  },
  omnimatch: function(password) {
    var len1, matcher, matchers, matches, o;
    matches = [];
    matchers = [this.dictionary_match, this.reverse_dictionary_match, this.l33t_match, this.spatial_match, this.repeat_match, this.sequence_match, this.regex_match, this.date_match];
    for (o = 0, len1 = matchers.length; o < len1; o++) {
      matcher = matchers[o];
      this.extend(matches, matcher.call(this, password));
    }
    return this.sorted(matches);
  },
  dictionary_match: function(password, _ranked_dictionaries) {
    var dictionary_name, i, j, len, matches, o, p, password_lower, rank, ranked_dict, ref, ref1, ref2, word;
    if (_ranked_dictionaries == null) {
      _ranked_dictionaries = RANKED_DICTIONARIES;
    }
    matches = [];
    len = password.length;
    password_lower = password.toLowerCase();
    for (dictionary_name in _ranked_dictionaries) {
      ranked_dict = _ranked_dictionaries[dictionary_name];
      for (i = o = 0, ref = len; 0 <= ref ? o < ref : o > ref; i = 0 <= ref ? ++o : --o) {
        for (j = p = ref1 = i, ref2 = len; ref1 <= ref2 ? p < ref2 : p > ref2; j = ref1 <= ref2 ? ++p : --p) {
          if (password_lower.slice(i, +j + 1 || 9e9) in ranked_dict) {
            word = password_lower.slice(i, +j + 1 || 9e9);
            rank = ranked_dict[word];
            matches.push({
              pattern: 'dictionary',
              i: i,
              j: j,
              token: password.slice(i, +j + 1 || 9e9),
              matched_word: word,
              rank: rank,
              dictionary_name: dictionary_name,
              reversed: false,
              l33t: false
            });
          }
        }
      }
    }
    return this.sorted(matches);
  },
  reverse_dictionary_match: function(password, _ranked_dictionaries) {
    var len1, match, matches, o, ref, reversed_password;
    if (_ranked_dictionaries == null) {
      _ranked_dictionaries = RANKED_DICTIONARIES;
    }
    reversed_password = password.split('').reverse().join('');
    matches = this.dictionary_match(reversed_password, _ranked_dictionaries);
    for (o = 0, len1 = matches.length; o < len1; o++) {
      match = matches[o];
      match.token = match.token.split('').reverse().join('');
      match.reversed = true;
      ref = [password.length - 1 - match.j, password.length - 1 - match.i], match.i = ref[0], match.j = ref[1];
    }
    return this.sorted(matches);
  },
  set_user_input_dictionary: function(ordered_list) {
    return RANKED_DICTIONARIES['user_inputs'] = build_ranked_dict(ordered_list.slice());
  },
  relevant_l33t_subtable: function(password, table) {
    var chr, len1, letter, o, password_chars, ref, relevant_subs, sub, subs, subtable;
    password_chars = {};
    ref = password.split('');
    for (o = 0, len1 = ref.length; o < len1; o++) {
      chr = ref[o];
      password_chars[chr] = true;
    }
    subtable = {};
    for (letter in table) {
      subs = table[letter];
      relevant_subs = (function() {
        var len2, p, results;
        results = [];
        for (p = 0, len2 = subs.length; p < len2; p++) {
          sub = subs[p];
          if (sub in password_chars) {
            results.push(sub);
          }
        }
        return results;
      })();
      if (relevant_subs.length > 0) {
        subtable[letter] = relevant_subs;
      }
    }
    return subtable;
  },
  enumerate_l33t_subs: function(table) {
    var chr, dedup, helper, k, keys, l33t_chr, len1, len2, o, p, ref, sub, sub_dict, sub_dicts, subs;
    keys = (function() {
      var results;
      results = [];
      for (k in table) {
        results.push(k);
      }
      return results;
    })();
    subs = [[]];
    dedup = function(subs) {
      var assoc, deduped, label, len1, members, o, sub, v;
      deduped = [];
      members = {};
      for (o = 0, len1 = subs.length; o < len1; o++) {
        sub = subs[o];
        assoc = (function() {
          var len2, p, results;
          results = [];
          for (v = p = 0, len2 = sub.length; p < len2; v = ++p) {
            k = sub[v];
            results.push([k, v]);
          }
          return results;
        })();
        assoc.sort();
        label = ((function() {
          var len2, p, results;
          results = [];
          for (v = p = 0, len2 = assoc.length; p < len2; v = ++p) {
            k = assoc[v];
            results.push(k + ',' + v);
          }
          return results;
        })()).join('-');
        if (!(label in members)) {
          members[label] = true;
          deduped.push(sub);
        }
      }
      return deduped;
    };
    helper = function(keys) {
      var dup_l33t_index, first_key, i, l33t_chr, len1, len2, next_subs, o, p, q, ref, ref1, rest_keys, sub, sub_alternative, sub_extension;
      if (!keys.length) {
        return;
      }
      first_key = keys[0];
      rest_keys = keys.slice(1);
      next_subs = [];
      ref = table[first_key];
      for (o = 0, len1 = ref.length; o < len1; o++) {
        l33t_chr = ref[o];
        for (p = 0, len2 = subs.length; p < len2; p++) {
          sub = subs[p];
          dup_l33t_index = -1;
          for (i = q = 0, ref1 = sub.length; 0 <= ref1 ? q < ref1 : q > ref1; i = 0 <= ref1 ? ++q : --q) {
            if (sub[i][0] === l33t_chr) {
              dup_l33t_index = i;
              break;
            }
          }
          if (dup_l33t_index === -1) {
            sub_extension = sub.concat([[l33t_chr, first_key]]);
            next_subs.push(sub_extension);
          } else {
            sub_alternative = sub.slice(0);
            sub_alternative.splice(dup_l33t_index, 1);
            sub_alternative.push([l33t_chr, first_key]);
            next_subs.push(sub);
            next_subs.push(sub_alternative);
          }
        }
      }
      subs = dedup(next_subs);
      return helper(rest_keys);
    };
    helper(keys);
    sub_dicts = [];
    for (o = 0, len1 = subs.length; o < len1; o++) {
      sub = subs[o];
      sub_dict = {};
      for (p = 0, len2 = sub.length; p < len2; p++) {
        ref = sub[p], l33t_chr = ref[0], chr = ref[1];
        sub_dict[l33t_chr] = chr;
      }
      sub_dicts.push(sub_dict);
    }
    return sub_dicts;
  },
  l33t_match: function(password, _ranked_dictionaries, _l33t_table) {
    var chr, k, len1, len2, match, match_sub, matches, o, p, ref, ref1, sub, subbed_chr, subbed_password, token, v;
    if (_ranked_dictionaries == null) {
      _ranked_dictionaries = RANKED_DICTIONARIES;
    }
    if (_l33t_table == null) {
      _l33t_table = L33T_TABLE;
    }
    matches = [];
    ref = this.enumerate_l33t_subs(this.relevant_l33t_subtable(password, _l33t_table));
    for (o = 0, len1 = ref.length; o < len1; o++) {
      sub = ref[o];
      if (this.empty(sub)) {
        break;
      }
      subbed_password = this.translate(password, sub);
      ref1 = this.dictionary_match(subbed_password, _ranked_dictionaries);
      for (p = 0, len2 = ref1.length; p < len2; p++) {
        match = ref1[p];
        token = password.slice(match.i, +match.j + 1 || 9e9);
        if (token.toLowerCase() === match.matched_word) {
          continue;
        }
        match_sub = {};
        for (subbed_chr in sub) {
          chr = sub[subbed_chr];
          if (token.indexOf(subbed_chr) !== -1) {
            match_sub[subbed_chr] = chr;
          }
        }
        match.l33t = true;
        match.token = token;
        match.sub = match_sub;
        match.sub_display = ((function() {
          var results;
          results = [];
          for (k in match_sub) {
            v = match_sub[k];
            results.push(k + " -> " + v);
          }
          return results;
        })()).join(', ');
        matches.push(match);
      }
    }
    return this.sorted(matches.filter(function(match) {
      return match.token.length > 1;
    }));
  },
  spatial_match: function(password, _graphs) {
    var graph, graph_name, matches;
    if (_graphs == null) {
      _graphs = GRAPHS;
    }
    matches = [];
    for (graph_name in _graphs) {
      graph = _graphs[graph_name];
      this.extend(matches, this.spatial_match_helper(password, graph, graph_name));
    }
    return this.sorted(matches);
  },
  SHIFTED_RX: /[~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?]/,
  spatial_match_helper: function(password, graph, graph_name) {
    var adj, adjacents, cur_char, cur_direction, found, found_direction, i, j, last_direction, len1, matches, o, prev_char, shifted_count, turns;
    matches = [];
    i = 0;
    while (i < password.length - 1) {
      j = i + 1;
      last_direction = null;
      turns = 0;
      if ((graph_name === 'qwerty' || graph_name === 'dvorak') && this.SHIFTED_RX.exec(password.charAt(i))) {
        shifted_count = 1;
      } else {
        shifted_count = 0;
      }
      while (true) {
        prev_char = password.charAt(j - 1);
        found = false;
        found_direction = -1;
        cur_direction = -1;
        adjacents = graph[prev_char] || [];
        if (j < password.length) {
          cur_char = password.charAt(j);
          for (o = 0, len1 = adjacents.length; o < len1; o++) {
            adj = adjacents[o];
            cur_direction += 1;
            if (adj && adj.indexOf(cur_char) !== -1) {
              found = true;
              found_direction = cur_direction;
              if (adj.indexOf(cur_char) === 1) {
                shifted_count += 1;
              }
              if (last_direction !== found_direction) {
                turns += 1;
                last_direction = found_direction;
              }
              break;
            }
          }
        }
        if (found) {
          j += 1;
        } else {
          if (j - i > 2) {
            matches.push({
              pattern: 'spatial',
              i: i,
              j: j - 1,
              token: password.slice(i, j),
              graph: graph_name,
              turns: turns,
              shifted_count: shifted_count
            });
          }
          i = j;
          break;
        }
      }
    }
    return matches;
  },
  repeat_match: function(password) {
    var base_analysis, base_guesses, base_matches, base_token, greedy, greedy_match, i, j, lastIndex, lazy, lazy_anchored, lazy_match, match, matches, ref;
    matches = [];
    greedy = /(.+)\1+/g;
    lazy = /(.+?)\1+/g;
    lazy_anchored = /^(.+?)\1+$/;
    lastIndex = 0;
    while (lastIndex < password.length) {
      greedy.lastIndex = lazy.lastIndex = lastIndex;
      greedy_match = greedy.exec(password);
      lazy_match = lazy.exec(password);
      if (greedy_match == null) {
        break;
      }
      if (greedy_match[0].length > lazy_match[0].length) {
        match = greedy_match;
        base_token = lazy_anchored.exec(match[0])[1];
      } else {
        match = lazy_match;
        base_token = match[1];
      }
      ref = [match.index, match.index + match[0].length - 1], i = ref[0], j = ref[1];
      base_analysis = scoring.most_guessable_match_sequence(base_token, this.omnimatch(base_token));
      base_matches = base_analysis.sequence;
      base_guesses = base_analysis.guesses;
      matches.push({
        pattern: 'repeat',
        i: i,
        j: j,
        token: match[0],
        base_token: base_token,
        base_guesses: base_guesses,
        base_matches: base_matches,
        repeat_count: match[0].length / base_token.length
      });
      lastIndex = j + 1;
    }
    return matches;
  },
  MAX_DELTA: 5,
  sequence_match: function(password) {
    var delta, i, j, k, last_delta, o, ref, result, update;
    if (password.length === 1) {
      return [];
    }
    update = (function(_this) {
      return function(i, j, delta) {
        var ref, sequence_name, sequence_space, token;
        if (j - i > 1 || Math.abs(delta) === 1) {
          if ((0 < (ref = Math.abs(delta)) && ref <= _this.MAX_DELTA)) {
            token = password.slice(i, +j + 1 || 9e9);
            if (/^[a-z]+$/.test(token)) {
              sequence_name = 'lower';
              sequence_space = 26;
            } else if (/^[A-Z]+$/.test(token)) {
              sequence_name = 'upper';
              sequence_space = 26;
            } else if (/^\d+$/.test(token)) {
              sequence_name = 'digits';
              sequence_space = 10;
            } else {
              sequence_name = 'unicode';
              sequence_space = 26;
            }
            return result.push({
              pattern: 'sequence',
              i: i,
              j: j,
              token: password.slice(i, +j + 1 || 9e9),
              sequence_name: sequence_name,
              sequence_space: sequence_space,
              ascending: delta > 0
            });
          }
        }
      };
    })(this);
    result = [];
    i = 0;
    last_delta = null;
    for (k = o = 1, ref = password.length; 1 <= ref ? o < ref : o > ref; k = 1 <= ref ? ++o : --o) {
      delta = password.charCodeAt(k) - password.charCodeAt(k - 1);
      if (last_delta == null) {
        last_delta = delta;
      }
      if (delta === last_delta) {
        continue;
      }
      j = k - 1;
      update(i, j, last_delta);
      i = j;
      last_delta = delta;
    }
    update(i, password.length - 1, last_delta);
    return result;
  },
  regex_match: function(password, _regexen) {
    var matches, regex, rx_match, token;
    if (_regexen == null) {
      _regexen = REGEXEN;
    }
    matches = [];
    for (name in _regexen) {
      regex = _regexen[name];
      regex.lastIndex = 0;
      while (rx_match = regex.exec(password)) {
        token = rx_match[0];
        matches.push({
          pattern: 'regex',
          token: token,
          i: rx_match.index,
          j: rx_match.index + rx_match[0].length - 1,
          regex_name: name,
          regex_match: rx_match
        });
      }
    }
    return this.sorted(matches);
  },
  date_match: function(password) {
    var best_candidate, candidate, candidates, distance, dmy, i, j, k, l, len1, len2, matches, maybe_date_no_separator, maybe_date_with_separator, metric, min_distance, o, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, rx_match, s, t, token;
    matches = [];
    maybe_date_no_separator = /^\d{4,8}$/;
    maybe_date_with_separator = /^(\d{1,4})([\s\/\\_.-])(\d{1,2})\2(\d{1,4})$/;
    for (i = o = 0, ref = password.length - 4; 0 <= ref ? o <= ref : o >= ref; i = 0 <= ref ? ++o : --o) {
      for (j = p = ref1 = i + 3, ref2 = i + 7; ref1 <= ref2 ? p <= ref2 : p >= ref2; j = ref1 <= ref2 ? ++p : --p) {
        if (j >= password.length) {
          break;
        }
        token = password.slice(i, +j + 1 || 9e9);
        if (!maybe_date_no_separator.exec(token)) {
          continue;
        }
        candidates = [];
        ref3 = DATE_SPLITS[token.length];
        for (q = 0, len1 = ref3.length; q < len1; q++) {
          ref4 = ref3[q], k = ref4[0], l = ref4[1];
          dmy = this.map_ints_to_dmy([parseInt(token.slice(0, k)), parseInt(token.slice(k, l)), parseInt(token.slice(l))]);
          if (dmy != null) {
            candidates.push(dmy);
          }
        }
        if (!(candidates.length > 0)) {
          continue;
        }
        best_candidate = candidates[0];
        metric = function(candidate) {
          return Math.abs(candidate.year - scoring.REFERENCE_YEAR);
        };
        min_distance = metric(candidates[0]);
        ref5 = candidates.slice(1);
        for (r = 0, len2 = ref5.length; r < len2; r++) {
          candidate = ref5[r];
          distance = metric(candidate);
          if (distance < min_distance) {
            ref6 = [candidate, distance], best_candidate = ref6[0], min_distance = ref6[1];
          }
        }
        matches.push({
          pattern: 'date',
          token: token,
          i: i,
          j: j,
          separator: '',
          year: best_candidate.year,
          month: best_candidate.month,
          day: best_candidate.day
        });
      }
    }
    for (i = s = 0, ref7 = password.length - 6; 0 <= ref7 ? s <= ref7 : s >= ref7; i = 0 <= ref7 ? ++s : --s) {
      for (j = t = ref8 = i + 5, ref9 = i + 9; ref8 <= ref9 ? t <= ref9 : t >= ref9; j = ref8 <= ref9 ? ++t : --t) {
        if (j >= password.length) {
          break;
        }
        token = password.slice(i, +j + 1 || 9e9);
        rx_match = maybe_date_with_separator.exec(token);
        if (rx_match == null) {
          continue;
        }
        dmy = this.map_ints_to_dmy([parseInt(rx_match[1]), parseInt(rx_match[3]), parseInt(rx_match[4])]);
        if (dmy == null) {
          continue;
        }
        matches.push({
          pattern: 'date',
          token: token,
          i: i,
          j: j,
          separator: rx_match[2],
          year: dmy.year,
          month: dmy.month,
          day: dmy.day
        });
      }
    }
    return this.sorted(matches.filter(function(match) {
      var is_submatch, len3, other_match, u;
      is_submatch = false;
      for (u = 0, len3 = matches.length; u < len3; u++) {
        other_match = matches[u];
        if (match === other_match) {
          continue;
        }
        if (other_match.i <= match.i && other_match.j >= match.j) {
          is_submatch = true;
          break;
        }
      }
      return !is_submatch;
    }));
  },
  map_ints_to_dmy: function(ints) {
    var dm, int, len1, len2, len3, o, over_12, over_31, p, possible_year_splits, q, ref, ref1, rest, under_1, y;
    if (ints[1] > 31 || ints[1] <= 0) {
      return;
    }
    over_12 = 0;
    over_31 = 0;
    under_1 = 0;
    for (o = 0, len1 = ints.length; o < len1; o++) {
      int = ints[o];
      if ((99 < int && int < DATE_MIN_YEAR) || int > DATE_MAX_YEAR) {
        return;
      }
      if (int > 31) {
        over_31 += 1;
      }
      if (int > 12) {
        over_12 += 1;
      }
      if (int <= 0) {
        under_1 += 1;
      }
    }
    if (over_31 >= 2 || over_12 === 3 || under_1 >= 2) {
      return;
    }
    possible_year_splits = [[ints[2], ints.slice(0, 2)], [ints[0], ints.slice(1, 3)]];
    for (p = 0, len2 = possible_year_splits.length; p < len2; p++) {
      ref = possible_year_splits[p], y = ref[0], rest = ref[1];
      if ((DATE_MIN_YEAR <= y && y <= DATE_MAX_YEAR)) {
        dm = this.map_ints_to_dm(rest);
        if (dm != null) {
          return {
            year: y,
            month: dm.month,
            day: dm.day
          };
        } else {
          return;
        }
      }
    }
    for (q = 0, len3 = possible_year_splits.length; q < len3; q++) {
      ref1 = possible_year_splits[q], y = ref1[0], rest = ref1[1];
      dm = this.map_ints_to_dm(rest);
      if (dm != null) {
        y = this.two_to_four_digit_year(y);
        return {
          year: y,
          month: dm.month,
          day: dm.day
        };
      }
    }
  },
  map_ints_to_dm: function(ints) {
    var d, len1, m, o, ref, ref1;
    ref = [ints, ints.slice().reverse()];
    for (o = 0, len1 = ref.length; o < len1; o++) {
      ref1 = ref[o], d = ref1[0], m = ref1[1];
      if ((1 <= d && d <= 31) && (1 <= m && m <= 12)) {
        return {
          day: d,
          month: m
        };
      }
    }
  },
  two_to_four_digit_year: function(year) {
    if (year > 99) {
      return year;
    } else if (year > 50) {
      return year + 1900;
    } else {
      return year + 2000;
    }
  }
};

module.exports = matching;



},{"./adjacency_graphs":4,"./frequency_lists":6,"./scoring":9}],9:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var BRUTEFORCE_CARDINALITY, MIN_GUESSES_BEFORE_GROWING_SEQUENCE, MIN_SUBMATCH_GUESSES_MULTI_CHAR, MIN_SUBMATCH_GUESSES_SINGLE_CHAR, adjacency_graphs, calc_average_degree, k, scoring, v;

adjacency_graphs = require('./adjacency_graphs');

calc_average_degree = function(graph) {
  var average, k, key, n, neighbors, v;
  average = 0;
  for (key in graph) {
    neighbors = graph[key];
    average += ((function() {
      var len, o, results;
      results = [];
      for (o = 0, len = neighbors.length; o < len; o++) {
        n = neighbors[o];
        if (n) {
          results.push(n);
        }
      }
      return results;
    })()).length;
  }
  average /= ((function() {
    var results;
    results = [];
    for (k in graph) {
      v = graph[k];
      results.push(k);
    }
    return results;
  })()).length;
  return average;
};

BRUTEFORCE_CARDINALITY = 10;

MIN_GUESSES_BEFORE_GROWING_SEQUENCE = 10000;

MIN_SUBMATCH_GUESSES_SINGLE_CHAR = 10;

MIN_SUBMATCH_GUESSES_MULTI_CHAR = 50;

scoring = {
  nCk: function(n, k) {
    var d, o, r, ref;
    if (k > n) {
      return 0;
    }
    if (k === 0) {
      return 1;
    }
    r = 1;
    for (d = o = 1, ref = k; 1 <= ref ? o <= ref : o >= ref; d = 1 <= ref ? ++o : --o) {
      r *= n;
      r /= d;
      n -= 1;
    }
    return r;
  },
  log10: function(n) {
    return Math.log(n) / Math.log(10);
  },
  log2: function(n) {
    return Math.log(n) / Math.log(2);
  },
  factorial: function(n) {
    var f, i, o, ref;
    if (n < 2) {
      return 1;
    }
    f = 1;
    for (i = o = 2, ref = n; 2 <= ref ? o <= ref : o >= ref; i = 2 <= ref ? ++o : --o) {
      f *= i;
    }
    return f;
  },
  most_guessable_match_sequence: function(password, matches, _exclude_additive) {
    var _, bruteforce_update, guesses, k, l, len, len1, len2, lst, m, make_bruteforce_match, matches_by_j, n, o, optimal, optimal_l, optimal_match_sequence, q, ref, ref1, u, unwind, update, w;
    if (_exclude_additive == null) {
      _exclude_additive = false;
    }
    n = password.length;
    matches_by_j = (function() {
      var o, ref, results;
      results = [];
      for (_ = o = 0, ref = n; 0 <= ref ? o < ref : o > ref; _ = 0 <= ref ? ++o : --o) {
        results.push([]);
      }
      return results;
    })();
    for (o = 0, len = matches.length; o < len; o++) {
      m = matches[o];
      matches_by_j[m.j].push(m);
    }
    for (q = 0, len1 = matches_by_j.length; q < len1; q++) {
      lst = matches_by_j[q];
      lst.sort(function(m1, m2) {
        return m1.i - m2.i;
      });
    }
    optimal = {
      m: (function() {
        var ref, results, u;
        results = [];
        for (_ = u = 0, ref = n; 0 <= ref ? u < ref : u > ref; _ = 0 <= ref ? ++u : --u) {
          results.push({});
        }
        return results;
      })(),
      pi: (function() {
        var ref, results, u;
        results = [];
        for (_ = u = 0, ref = n; 0 <= ref ? u < ref : u > ref; _ = 0 <= ref ? ++u : --u) {
          results.push({});
        }
        return results;
      })(),
      g: (function() {
        var ref, results, u;
        results = [];
        for (_ = u = 0, ref = n; 0 <= ref ? u < ref : u > ref; _ = 0 <= ref ? ++u : --u) {
          results.push({});
        }
        return results;
      })()
    };
    update = (function(_this) {
      return function(m, l) {
        var competing_g, competing_l, g, k, pi, ref;
        k = m.j;
        pi = _this.estimate_guesses(m, password);
        if (l > 1) {
          pi *= optimal.pi[m.i - 1][l - 1];
        }
        g = _this.factorial(l) * pi;
        if (!_exclude_additive) {
          g += Math.pow(MIN_GUESSES_BEFORE_GROWING_SEQUENCE, l - 1);
        }
        ref = optimal.g[k];
        for (competing_l in ref) {
          competing_g = ref[competing_l];
          if (competing_l > l) {
            continue;
          }
          if (competing_g <= g) {
            return;
          }
        }
        optimal.g[k][l] = g;
        optimal.m[k][l] = m;
        return optimal.pi[k][l] = pi;
      };
    })(this);
    bruteforce_update = (function(_this) {
      return function(k) {
        var i, l, last_m, ref, results, u;
        m = make_bruteforce_match(0, k);
        update(m, 1);
        results = [];
        for (i = u = 1, ref = k; 1 <= ref ? u <= ref : u >= ref; i = 1 <= ref ? ++u : --u) {
          m = make_bruteforce_match(i, k);
          results.push((function() {
            var ref1, results1;
            ref1 = optimal.m[i - 1];
            results1 = [];
            for (l in ref1) {
              last_m = ref1[l];
              l = parseInt(l);
              if (last_m.pattern === 'bruteforce') {
                continue;
              }
              results1.push(update(m, l + 1));
            }
            return results1;
          })());
        }
        return results;
      };
    })(this);
    make_bruteforce_match = (function(_this) {
      return function(i, j) {
        return {
          pattern: 'bruteforce',
          token: password.slice(i, +j + 1 || 9e9),
          i: i,
          j: j
        };
      };
    })(this);
    unwind = (function(_this) {
      return function(n) {
        var candidate_g, candidate_l, g, k, l, optimal_match_sequence, ref;
        optimal_match_sequence = [];
        k = n - 1;
        l = void 0;
        g = Infinity;
        ref = optimal.g[k];
        for (candidate_l in ref) {
          candidate_g = ref[candidate_l];
          if (candidate_g < g) {
            l = candidate_l;
            g = candidate_g;
          }
        }
        while (k >= 0) {
          m = optimal.m[k][l];
          optimal_match_sequence.unshift(m);
          k = m.i - 1;
          l--;
        }
        return optimal_match_sequence;
      };
    })(this);
    for (k = u = 0, ref = n; 0 <= ref ? u < ref : u > ref; k = 0 <= ref ? ++u : --u) {
      ref1 = matches_by_j[k];
      for (w = 0, len2 = ref1.length; w < len2; w++) {
        m = ref1[w];
        if (m.i > 0) {
          for (l in optimal.m[m.i - 1]) {
            l = parseInt(l);
            update(m, l + 1);
          }
        } else {
          update(m, 1);
        }
      }
      bruteforce_update(k);
    }
    optimal_match_sequence = unwind(n);
    optimal_l = optimal_match_sequence.length;
    if (password.length === 0) {
      guesses = 1;
    } else {
      guesses = optimal.g[n - 1][optimal_l];
    }
    return {
      password: password,
      guesses: guesses,
      guesses_log10: this.log10(guesses),
      sequence: optimal_match_sequence
    };
  },
  estimate_guesses: function(match, password) {
    var estimation_functions, guesses, min_guesses;
    if (match.guesses != null) {
      return match.guesses;
    }
    min_guesses = 1;
    if (match.token.length < password.length) {
      min_guesses = match.token.length === 1 ? MIN_SUBMATCH_GUESSES_SINGLE_CHAR : MIN_SUBMATCH_GUESSES_MULTI_CHAR;
    }
    estimation_functions = {
      bruteforce: this.bruteforce_guesses,
      dictionary: this.dictionary_guesses,
      spatial: this.spatial_guesses,
      repeat: this.repeat_guesses,
      sequence: this.sequence_guesses,
      regex: this.regex_guesses,
      date: this.date_guesses
    };
    guesses = estimation_functions[match.pattern].call(this, match);
    match.guesses = Math.max(guesses, min_guesses);
    match.guesses_log10 = this.log10(match.guesses);
    return match.guesses;
  },
  bruteforce_guesses: function(match) {
    var guesses, min_guesses;
    guesses = Math.pow(BRUTEFORCE_CARDINALITY, match.token.length);
    if (guesses === Number.POSITIVE_INFINITY) {
      guesses = Number.MAX_VALUE;
    }
    min_guesses = match.token.length === 1 ? MIN_SUBMATCH_GUESSES_SINGLE_CHAR + 1 : MIN_SUBMATCH_GUESSES_MULTI_CHAR + 1;
    return Math.max(guesses, min_guesses);
  },
  repeat_guesses: function(match) {
    return match.base_guesses * match.repeat_count;
  },
  sequence_guesses: function(match) {
    var base_guesses, first_chr;
    first_chr = match.token.charAt(0);
    if (first_chr === 'a' || first_chr === 'A' || first_chr === 'z' || first_chr === 'Z' || first_chr === '0' || first_chr === '1' || first_chr === '9') {
      base_guesses = 4;
    } else {
      if (first_chr.match(/\d/)) {
        base_guesses = 10;
      } else {
        base_guesses = 26;
      }
    }
    if (!match.ascending) {
      base_guesses *= 2;
    }
    return base_guesses * match.token.length;
  },
  MIN_YEAR_SPACE: 20,
  REFERENCE_YEAR: new Date().getFullYear(),
  regex_guesses: function(match) {
    var char_class_bases, year_space;
    char_class_bases = {
      alpha_lower: 26,
      alpha_upper: 26,
      alpha: 52,
      alphanumeric: 62,
      digits: 10,
      symbols: 33
    };
    if (match.regex_name in char_class_bases) {
      return Math.pow(char_class_bases[match.regex_name], match.token.length);
    } else {
      switch (match.regex_name) {
        case 'recent_year':
          year_space = Math.abs(parseInt(match.regex_match[0]) - this.REFERENCE_YEAR);
          year_space = Math.max(year_space, this.MIN_YEAR_SPACE);
          return year_space;
      }
    }
  },
  date_guesses: function(match) {
    var guesses, year_space;
    year_space = Math.max(Math.abs(match.year - this.REFERENCE_YEAR), this.MIN_YEAR_SPACE);
    guesses = year_space * 365;
    if (match.separator) {
      guesses *= 4;
    }
    return guesses;
  },
  KEYBOARD_AVERAGE_DEGREE: calc_average_degree(adjacency_graphs.qwerty),
  KEYPAD_AVERAGE_DEGREE: calc_average_degree(adjacency_graphs.keypad),
  KEYBOARD_STARTING_POSITIONS: ((function() {
    var ref, results;
    ref = adjacency_graphs.qwerty;
    results = [];
    for (k in ref) {
      v = ref[k];
      results.push(k);
    }
    return results;
  })()).length,
  KEYPAD_STARTING_POSITIONS: ((function() {
    var ref, results;
    ref = adjacency_graphs.keypad;
    results = [];
    for (k in ref) {
      v = ref[k];
      results.push(k);
    }
    return results;
  })()).length,
  spatial_guesses: function(match) {
    var L, S, U, d, guesses, i, j, o, possible_turns, q, ref, ref1, ref2, ref3, s, shifted_variations, t, u;
    if ((ref = match.graph) === 'qwerty' || ref === 'dvorak') {
      s = this.KEYBOARD_STARTING_POSITIONS;
      d = this.KEYBOARD_AVERAGE_DEGREE;
    } else {
      s = this.KEYPAD_STARTING_POSITIONS;
      d = this.KEYPAD_AVERAGE_DEGREE;
    }
    guesses = 0;
    L = match.token.length;
    t = match.turns;
    for (i = o = 2, ref1 = L; 2 <= ref1 ? o <= ref1 : o >= ref1; i = 2 <= ref1 ? ++o : --o) {
      possible_turns = Math.min(t, i - 1);
      for (j = q = 1, ref2 = possible_turns; 1 <= ref2 ? q <= ref2 : q >= ref2; j = 1 <= ref2 ? ++q : --q) {
        guesses += this.nCk(i - 1, j - 1) * s * Math.pow(d, j);
      }
    }
    if (match.shifted_count) {
      S = match.shifted_count;
      U = match.token.length - match.shifted_count;
      if (S === 0 || U === 0) {
        guesses *= 2;
      } else {
        shifted_variations = 0;
        for (i = u = 1, ref3 = Math.min(S, U); 1 <= ref3 ? u <= ref3 : u >= ref3; i = 1 <= ref3 ? ++u : --u) {
          shifted_variations += this.nCk(S + U, i);
        }
        guesses *= shifted_variations;
      }
    }
    return guesses;
  },
  dictionary_guesses: function(match) {
    var reversed_variations;
    match.base_guesses = match.rank;
    match.uppercase_variations = this.uppercase_variations(match);
    match.l33t_variations = this.l33t_variations(match);
    reversed_variations = match.reversed && 2 || 1;
    return match.base_guesses * match.uppercase_variations * match.l33t_variations * reversed_variations;
  },
  START_UPPER: /^[A-Z][^A-Z]+$/,
  END_UPPER: /^[^A-Z]+[A-Z]$/,
  ALL_UPPER: /^[^a-z]+$/,
  ALL_LOWER: /^[^A-Z]+$/,
  uppercase_variations: function(match) {
    var L, U, chr, i, len, o, q, ref, ref1, regex, variations, word;
    word = match.token;
    if (word.match(this.ALL_LOWER) || word.toLowerCase() === word) {
      return 1;
    }
    ref = [this.START_UPPER, this.END_UPPER, this.ALL_UPPER];
    for (o = 0, len = ref.length; o < len; o++) {
      regex = ref[o];
      if (word.match(regex)) {
        return 2;
      }
    }
    U = ((function() {
      var len1, q, ref1, results;
      ref1 = word.split('');
      results = [];
      for (q = 0, len1 = ref1.length; q < len1; q++) {
        chr = ref1[q];
        if (chr.match(/[A-Z]/)) {
          results.push(chr);
        }
      }
      return results;
    })()).length;
    L = ((function() {
      var len1, q, ref1, results;
      ref1 = word.split('');
      results = [];
      for (q = 0, len1 = ref1.length; q < len1; q++) {
        chr = ref1[q];
        if (chr.match(/[a-z]/)) {
          results.push(chr);
        }
      }
      return results;
    })()).length;
    variations = 0;
    for (i = q = 1, ref1 = Math.min(U, L); 1 <= ref1 ? q <= ref1 : q >= ref1; i = 1 <= ref1 ? ++q : --q) {
      variations += this.nCk(U + L, i);
    }
    return variations;
  },
  l33t_variations: function(match) {
    var S, U, chr, chrs, i, o, p, possibilities, ref, ref1, subbed, unsubbed, variations;
    if (!match.l33t) {
      return 1;
    }
    variations = 1;
    ref = match.sub;
    for (subbed in ref) {
      unsubbed = ref[subbed];
      chrs = match.token.toLowerCase().split('');
      S = ((function() {
        var len, o, results;
        results = [];
        for (o = 0, len = chrs.length; o < len; o++) {
          chr = chrs[o];
          if (chr === subbed) {
            results.push(chr);
          }
        }
        return results;
      })()).length;
      U = ((function() {
        var len, o, results;
        results = [];
        for (o = 0, len = chrs.length; o < len; o++) {
          chr = chrs[o];
          if (chr === unsubbed) {
            results.push(chr);
          }
        }
        return results;
      })()).length;
      if (S === 0 || U === 0) {
        variations *= 2;
      } else {
        p = Math.min(U, S);
        possibilities = 0;
        for (i = o = 1, ref1 = p; 1 <= ref1 ? o <= ref1 : o >= ref1; i = 1 <= ref1 ? ++o : --o) {
          possibilities += this.nCk(U + S, i);
        }
        variations *= possibilities;
      }
    }
    return variations;
  }
};

module.exports = scoring;



},{"./adjacency_graphs":4}],10:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var time_estimates;

time_estimates = {
  estimate_attack_times: function(guesses) {
    var crack_times_display, crack_times_seconds, scenario, seconds;
    crack_times_seconds = {
      online_throttling_100_per_hour: guesses / (100 / 3600),
      online_no_throttling_10_per_second: guesses / 10,
      offline_slow_hashing_1e4_per_second: guesses / 1e4,
      offline_fast_hashing_1e10_per_second: guesses / 1e10
    };
    crack_times_display = {};
    for (scenario in crack_times_seconds) {
      seconds = crack_times_seconds[scenario];
      crack_times_display[scenario] = this.display_time(seconds);
    }
    return {
      crack_times_seconds: crack_times_seconds,
      crack_times_display: crack_times_display,
      score: this.guesses_to_score(guesses)
    };
  },
  guesses_to_score: function(guesses) {
    var DELTA;
    DELTA = 5;
    if (guesses < 1e3 + DELTA) {
      return 0;
    } else if (guesses < 1e6 + DELTA) {
      return 1;
    } else if (guesses < 1e8 + DELTA) {
      return 2;
    } else if (guesses < 1e10 + DELTA) {
      return 3;
    } else {
      return 4;
    }
  },
  display_time: function(seconds) {
    var base, century, day, display_num, display_str, hour, minute, month, ref, year;
    minute = 60;
    hour = minute * 60;
    day = hour * 24;
    month = day * 31;
    year = month * 12;
    century = year * 100;
    ref = seconds < 1 ? [null, 'less than a second'] : seconds < minute ? (base = Math.round(seconds), [base, base + " second"]) : seconds < hour ? (base = Math.round(seconds / minute), [base, base + " minute"]) : seconds < day ? (base = Math.round(seconds / hour), [base, base + " hour"]) : seconds < month ? (base = Math.round(seconds / day), [base, base + " day"]) : seconds < year ? (base = Math.round(seconds / month), [base, base + " month"]) : seconds < century ? (base = Math.round(seconds / year), [base, base + " year"]) : [null, 'centuries'], display_num = ref[0], display_str = ref[1];
    if ((display_num != null) && display_num !== 1) {
      display_str += 's';
    }
    return display_str;
  }
};

module.exports = time_estimates;



},{}],11:[function(require,module,exports){
//require the dependencies
const bootstrap = require('bootstrap');
var $ = require("jquery");
const popperjs = require('popper.js');
const zxcvbn = require('zxcvbn');

//file input events
const inputFile = document.getElementById("customFile"); //file input
inputFile.addEventListener("change", updateNameAndSize, false); //from the updateNameAndSize function

//generate key button events
const genBtn = document.getElementById("generateButton");
genBtn.addEventListener("click", generateKey, false); //from the generateKey function

//password input events
let password = document.getElementById('inputPassword');
password.addEventListener("input", keyCheckMeter, false);

//encryption decryption button events
const encryptBtn = document.getElementById("encryptBtn");
encryptBtn.addEventListener("click", encryptFile); //from the generateKey function

const decryptBtn = document.getElementById("decryptBtn");
decryptBtn.addEventListener("click", decryptFile); //from the generateKey function

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetInputs); //reset inputs on click

//declarations
const DEC = {
  signature: "RW5jcnlwdGVkIFVzaW5nIEhhdC5zaA", //add a line in the file that says "encrypted by Hat.sh :)"
  hash: "SHA-512",
  algoName1: "PBKDF2",
  algoName2: "AES-GCM",
  algoLength: 256,
  itr: 80000,
  salt: window.crypto.getRandomValues(new Uint8Array(16)),
  perms1: ["deriveKey"],
  perms2: ['encrypt', 'decrypt'],
}

//function to toggle tooltips for bootstrap
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//error messages handler function
function errorMsg(msg) {
  let errTag =
    `<div class="alert alert-danger alert-error" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Error!</strong> ${msg}
  </div>`;
  document.getElementById("error").insertAdjacentHTML('beforeEnd', errTag); //inserthtml
  window.setTimeout(function () {
    $(".alert-error").fadeTo(500, 0).slideUp(500, function () {
      $(this).remove();
    });
  }, 4000);
}


//determination of file name and size 
function updateNameAndSize() {
  showResetBtn();
  let nBytes = 0,
    oFiles = inputFile.files,
    nFiles = oFiles.length,
    placeHolder = document.getElementById("file-placeholder");

  for (let nFileId = 0; nFileId < nFiles; nFileId++) {
    nBytes += oFiles[nFileId].size;
    fileName = oFiles[nFileId].name;
  }
  let sOutput = nBytes + " bytes";
  // multiples approximation
  for (let aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    sOutput = nApprox.toFixed(2) + " " + aMultiples[nMultiple];
  }
  // console.log(fileName);
  //change placeholder text
  if (!inputFile.value) {
    placeHolder.innerHTML = "Choose a file to encrypt/decrypt";
  } else {
    placeHolder.innerHTML = fileName + '  <span class="text-success">' + sOutput + '</span>';
  }


}
 
//show and hide reset btn from html
function showResetBtn(){$("#resetBtn").css("display", "");}
function hideResetBtn(){$("#resetBtn").css("display", "none");}

//reset inputs
//if inputs are set reset them on click
function resetInputs(){
  if (inputFile.value != 0 || password.value != 0) {
    inputFile.value = "";
    password.value = "";
    updateNameAndSize();
    hideResetBtn();
    keyCheckMeter();
  } 
}


//check how strong is the password entered using zxcvbn.js
function keyCheckMeter() {
  let strength = {
    0: "Very Bad",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  };
  let password = document.getElementById('inputPassword');
  let meter = document.getElementById('strength-meter');
  let text = document.getElementById('strength-text');
  let val = password.value;
  //console.log(val);
  let result = zxcvbn(val);
  //console.log(result);
  // Update the password strength meter
  meter.style.width = result.score * 25 + '%';
  //console.log(meter);
  // Update the text indicator
  if (val !== "") {
    text.innerHTML = strength[result.score];
    showResetBtn();
  } else {
    text.innerHTML = "none.";
  }
}

//better function to convert string to array buffer
//as done in the webcrypto documentation
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

//this function generates the html tag and provieds the file that needs to be downloaded as an html tag
function processFinished(name, data, method, dKey) {

  //methods 1->encryption , 2->decryption
  let msg;
  let status;
  let keyBtn;
  const randomId = Math.floor((Math.random() * 100) + 1);
  if (method == 1) {
    msg = "Successfully Encrypted";
    status = "encrypted";
    keyBtn = `<button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target=".modal${randomId}"><i class="fas fa-key"></i>
    Decryption Key</button>`;
  } else {
    msg = "Successfully Decrypted";
    status = "decrypted"
    keyBtn = '';
  }

  const blob = new Blob(data, {
    type: 'application/octet-stream'
  }); // meaning download this file
  const url = URL.createObjectURL(blob); //create a url for blob
  const htmlTag = `<div class="result">
  <div class="modal fade bd-example-modal-sm modal${randomId}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">decryption key</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            <div class="modal-body">${dKey}</div>
        </div>
      </div>
    </div>

  <div class="alert alert-outline ${status}" role="alert">
    <i class="fas fa-check"></i> ${name.replace('Encrypted-', '')} was <strong>${msg}</strong>
    <hr>
    <div class="btn-group">
      <a class="btn btn-outline-secondary btn-sm" href="${url}" download="${name}" role="button"><i class="fas fa-download"></i> ${status}
          file </a> ${keyBtn}
    </div>
  </div><!-- end alert -->
</div><!-- end result -->`;
  document.getElementById("results").insertAdjacentHTML('afterbegin', htmlTag); //inserthtml

}

//generate a random key for user
function generateKey() { 
  const usedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&_-+=~';
  let keyArray = new Uint8Array(20); //length of the key
  window.crypto.getRandomValues(keyArray); //randomize
  keyArray = keyArray.map(x => usedChars.charCodeAt(x % usedChars.length));
  const randomizedKey = String.fromCharCode.apply(null, keyArray);
  password.value = randomizedKey; //output the new key to the key input
  keyCheckMeter(); //run the key strength checker
}

//import key
// import the entered key from the password input
function importSecretKey() { 
  let rawPassword = str2ab(password.value); // convert the password entered in the input to an array buffer
  return window.crypto.subtle.importKey(
    "raw", //raw
    rawPassword, // array buffer password
    {
      name: DEC.algoName1
    }, //the algorithm you are using
    false, //whether the derived key is extractable 
    DEC.perms1 //limited to the option deriveKey
  );

}


async function deriveEncryptionSecretKey() { //derive the secret key from a master key.

  let getSecretKey = await importSecretKey();

  return window.crypto.subtle.deriveKey({
      name: DEC.algoName1,
      salt: DEC.salt,
      iterations: DEC.itr,
      hash: {
        name: DEC.hash
      },
    },
    getSecretKey, //your key from importKey
    { //the key type you want to create based on the derived bits
      name: DEC.algoName2,
      length: DEC.algoLength,
    },
    false, //whether the derived key is extractable 
    DEC.perms2 //limited to the options encrypt and decrypt
  )
  //console.log the key
  // .then(function(key){
  //     //returns the derived key
  //     console.log(key);
  // })
  // .catch(function(err){
  //     console.error(err);
  // });

}

//file encryption function
async function encryptFile() {
  //check if file and password inputs are entered
  if (!inputFile.value || !password.value) {
    errorMsg("Please browse a file and enter a Key")
  } else {
    
    const derivedKey = await deriveEncryptionSecretKey(); //requiring the key
    const file = inputFile.files[0]; //file input
    const fr = new FileReader(); //request a file read

    const n = new Promise((resolve, reject) => {

      fr.onloadstart = async () => {
        $(".loader").css("display", "block"); //show spinner while loading a file
      };

      fr.onload = async () => { //load

        const iv = window.crypto.getRandomValues(new Uint8Array(16)); //generate a random iv
        const content = new Uint8Array(fr.result); //encoded file content
        // encrypt the file
        await window.crypto.subtle.encrypt({
            iv,
            name: DEC.algoName2
          }, derivedKey, content) 
          .then(function (encrypted) {
            //returns an ArrayBuffer containing the encrypted data
            resolve(processFinished('Encrypted-' + file.name, [window.atob(DEC.signature), iv, DEC.salt, new Uint8Array(encrypted)], 1, password.value)); //create the new file buy adding signature and iv and content
            //console.log("file has been successuflly encrypted");
            resetInputs(); // reset file and key inputs when done
          })
          .catch(function (err) {
            errorMsg("An error occured while Encrypting the file, try again!"); //reject
          });
        $(".loader").css("display", "none"); //hide spinner
      }
      //read the file as buffer
      fr.readAsArrayBuffer(file)

    });
  }
}




//file decryption function

async function decryptFile() {

  if (!inputFile.value || !password.value) {
    errorMsg("Please browse a file and enter a Key")
  } else {

    const file = inputFile.files[0]; //file input
    const fr = new FileReader(); //request a file read

    const d = new Promise((resolve, reject) => {

      fr.onloadstart = async () => {
        $(".loader").css("display", "block"); //show spinner while loading a file
      };

      fr.onload = async () => { //load 
        
        async function deriveDecryptionSecretKey() { //derive the secret key from a master key.

          let getSecretKey = await importSecretKey();

          return window.crypto.subtle.deriveKey({
              name: DEC.algoName1,
              salt: new Uint8Array(fr.result.slice(38, 54)), //get salt from encrypted file.
              iterations: DEC.itr,
              hash: {
                name: DEC.hash
              },
            },
            getSecretKey, //your key from importKey
            { //the key type you want to create based on the derived bits
              name: DEC.algoName2,
              length: DEC.algoLength,
            },
            false, //whether the derived key is extractable 
            DEC.perms2 //limited to the options encrypt and decrypt
          )
          //console.log the key
          // .then(function(key){
          //     //returns the derived key
          //     console.log(key);
          // })
          // .catch(function(err){
          //     console.error(err);
          // });
        
        }

        //console.log(fr.result);
        const derivedKey = await deriveDecryptionSecretKey(); //requiring the key

        const iv = new Uint8Array(fr.result.slice(22, 38)); //take out encryption iv

        const content = new Uint8Array(fr.result.slice(54)); //take out encrypted content

        await window.crypto.subtle.decrypt({
            iv,
            name: DEC.algoName2
          }, derivedKey, content)
          .then(function (decrypted) {
            //returns an ArrayBuffer containing the decrypted data

            resolve(processFinished(file.name.replace('Encrypted-', ''), [new Uint8Array(decrypted)], 2, password.value)); //create new file from the decrypted content
            //console.log("file has been successuflly decrypted");
            resetInputs(); // reset file and key inputs when done
          })
          .catch(function () {
            errorMsg("You have entered a wrong Decryption Key!");
          });

        $(".loader").css("display", "none"); //hide spinner
      }

      fr.readAsArrayBuffer(file) //read the file as buffer

    });
  }

}

},{"bootstrap":1,"jquery":2,"popper.js":3,"zxcvbn":7}]},{},[11]);