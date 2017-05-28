'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Math.clip = function (number, min, max) {
  return Math.max(min, Math.min(number, max));
};

var MotionBar = function (_React$Component) {
  _inherits(MotionBar, _React$Component);

  function MotionBar() {
    _classCallCheck(this, MotionBar);

    return _possibleConstructorReturn(this, (MotionBar.__proto__ || Object.getPrototypeOf(MotionBar)).apply(this, arguments));
  }

  _createClass(MotionBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          x = _props.x,
          y = _props.y,
          bkgColor = _props.bkgColor,
          barWidth = _props.barWidth,
          value = _props.value,
          barPadding = _props.barPadding,
          color = _props.color,
          max = _props.max;


      var totalHeight = height - barPadding * 2;
      var percent = Math.clip(value / max, 0.01, 1);
      var rad = 4;
      var fixedY = y + 2;
      return _react2.default.createElement(
        'g',
        { ref: 'wrap' },
        _react2.default.createElement(
          'svg',
          {
            x: x,
            y: fixedY,
            style: { background: 'yellow', borderRadius: 4 },
            height: totalHeight,
            width: barWidth },
          _react2.default.createElement('rect', {
            width: barWidth,
            height: totalHeight,
            fill: color || '#0288d1',
            rx: rad,
            ry: rad,
            x: 0,
            y: 0 })
        ),
        _react2.default.createElement(
          _reactMotion.Motion,
          { defaultStyle: { height: 0 }, style: { height: (0, _reactMotion.spring)(totalHeight * (1 - percent)) } },
          function (interpolatingStyle) {
            return _react2.default.createElement(
              'svg',
              {
                x: x,
                y: fixedY,
                width: barWidth,
                height: interpolatingStyle.height },
              _react2.default.createElement('rect', {
                width: barWidth,
                height: totalHeight,
                fill: bkgColor,
                rx: rad,
                ry: rad,
                x: 0,
                y: 0 })
            );
          }
        )
      );
    }
  }]);

  return MotionBar;
}(_react2.default.Component);

MotionBar.propTypes = {
  height: _propTypes2.default.number,
  barWidth: _propTypes2.default.number,
  barPadding: _propTypes2.default.number,
  bkgColor: _propTypes2.default.string,
  color: _propTypes2.default.string,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  max: _propTypes2.default.number,
  value: _propTypes2.default.any
};
MotionBar.defaultProps = {
  barWidth: 60,
  barPadding: 8,
  height: 170,
  max: 100,
  id: 'launch-gauge'
};
exports.default = MotionBar;