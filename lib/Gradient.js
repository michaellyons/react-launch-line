'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gradient = function (_React$Component) {
  _inherits(Gradient, _React$Component);

  function Gradient() {
    _classCallCheck(this, Gradient);

    return _possibleConstructorReturn(this, (Gradient.__proto__ || Object.getPrototypeOf(Gradient)).apply(this, arguments));
  }

  _createClass(Gradient, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement(
          'linearGradient',
          { is: true, id: this.props.id, x1: '0%', y1: '100%', x2: '0%', y2: '0%', spreadMethod: 'pad' },
          _react2.default.createElement('stop', { is: true, offset: '05%', 'stop-color': this.props.color1, 'stop-opacity': 0.4 }),
          _react2.default.createElement('stop', { is: true, offset: '100%', 'stop-color': this.props.color2, 'stop-opacity': 1 })
        )
      );
    }
  }]);

  return Gradient;
}(_react2.default.Component);

Gradient.propTypes = {
  id: _propTypes2.default.string,
  color1: _propTypes2.default.string,
  color2: _propTypes2.default.string
};


module.exports = Gradient;