'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Axis = require('d3-axis');

var _d3Selection = require('d3-selection');

var _d3TimeFormat = require('d3-time-format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Axis = function (_Component) {
  _inherits(Axis, _Component);

  function Axis(props) {
    _classCallCheck(this, Axis);

    var _this = _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this, props));

    _this.renderAxis = _this.renderAxis.bind(_this);
    return _this;
  }

  _createClass(Axis, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderAxis();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderAxis();
    }
  }, {
    key: 'renderAxis',
    value: function renderAxis() {
      var _self = this;
      switch (this.props.axisType) {
        case 'x':
          if (this.props.orient === 'top') {
            this.axis = (0, _d3Axis.axisTop)().scale(this.props.scale).ticks(this.props.ticks, 's');
          } else if (this.props.orient === 'bottom') {
            this.axis = (0, _d3Axis.axisBottom)().scale(this.props.scale).ticks(this.props.ticks, 's');
          }
          break;
        case 'y':
        default:
          if (this.props.orient === 'left') {
            this.axis = (0, _d3Axis.axisLeft)().scale(this.props.scale).ticks(this.props.ticks, 's');
          } else if (this.props.orient === 'right') {
            this.axis = (0, _d3Axis.axisRight)().scale(this.props.scale).ticks(this.props.ticks, 's');
          }
      }

      if (this.props.tickFormat && this.props.axisType === 'x') {
        this.axis.tickFormat((0, _d3TimeFormat.timeFormat)(this.props.tickFormat));
      }

      var node = _reactDom2.default.findDOMNode(this);
      if (_self.props.rotateText) {
        (0, _d3Selection.select)(node).call(this.axis).selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '-.15em').attr('transform', function (d) {
          return _self.props.rotateText ? 'rotate(' + _self.props.rotateText + ')' : '';
        });
      } else {
        (0, _d3Selection.select)(node).call(this.axis);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          margin = _props.margin,
          axisType = _props.axisType,
          h = _props.h;

      var translate = axisType === 'x' ? 'translate(' + (margin.left - 1) + ', ' + (h - margin.bottom) + ')' : 'translate(' + (margin.left - 1) + ', ' + margin.top + ')';

      return _react2.default.createElement('g', { className: className, style: style, transform: translate });
    }
  }]);

  return Axis;
}(_react.Component);

Axis.propTypes = {
  h: _propTypes2.default.number,
  scale: _propTypes2.default.func,
  axisType: _propTypes2.default.oneOf(['x', 'y']),
  orient: _propTypes2.default.oneOf(['left', 'top', 'right', 'bottom']),
  className: _propTypes2.default.string,
  tickFormat: _propTypes2.default.string,
  ticks: _propTypes2.default.number,
  margin: _propTypes2.default.object,
  style: _propTypes2.default.object
};


module.exports = Axis;