"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ref = exports.render = exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var createElement = function createElement(namespace, tagName) {
  if (namespace && namespace.length > 0) {
    return document.createElementNS(namespace, tagName);
  }

  return document.createElement(tagName || 'div');
};

var setAttribute = function setAttribute(node, name, value) {
  if (_typeof(value) === 'object' && !!value && value.namespace) {
    return node.setAttributeNS(value.namespace, name, value.value);
  }

  return node.setAttribute(name, value);
};

var render = function render() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$tagName = _ref.tagName,
      tagName = _ref$tagName === void 0 ? '' : _ref$tagName,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? [] : _ref$content,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? {} : _ref$attributes,
      _ref$events = _ref.events,
      events = _ref$events === void 0 ? {} : _ref$events,
      _ref$ref = _ref.ref,
      ref = _ref$ref === void 0 ? {} : _ref$ref,
      _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === void 0 ? '' : _ref$namespace;

  var node = createElement(namespace, tagName);
  Object.keys(attributes).forEach(function (key) {
    return setAttribute(node, key, attributes[key]);
  });
  Object.keys(events).forEach(function (event) {
    return node.addEventListener.apply(node, _toConsumableArray([event].concat(events[event])));
  });

  if (typeof content === 'string') {
    node.innerHTML = content;
  } else if (Array.isArray(content) && content.length > 0) {
    content.forEach(function (child) {
      return node.append(render(child));
    });
  }

  ref.current = node;
  return node;
};

exports.render = render;

var ref = function ref() {
  return Object.seal({
    current: null
  });
};

exports.ref = ref;
var _default = {
  render: render,
  ref: ref
};
exports["default"] = _default;