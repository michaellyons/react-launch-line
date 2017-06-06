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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_React$Component) {
  _inherits(Grid, _React$Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

    _this.renderGrid = _this.renderGrid.bind(_this);
    return _this;
  }

  _createClass(Grid, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderGrid();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderGrid();
    }
  }, {
    key: 'renderGrid',
    value: function renderGrid() {
      switch (this.props.gridType) {
        case 'y':
          this.grid = (0, _d3Axis.axisLeft)().scale(this.props.scale).ticks(this.props.ticks).tickSize(-this.props.len, 0, 0).tickFormat('');
          break;
        case 'x':
        default:
          this.grid = (0, _d3Axis.axisBottom)().scale(this.props.scale).ticks(this.props.ticks).tickSize(-this.props.len, 0, 0).tickFormat('');
      }

      var node = _reactDom2.default.findDOMNode(this);
      (0, _d3Selection.select)(node).call(this.grid);
    }
  }, {
    key: 'render',
    value: function render() {
      var translate = 'translate(0,' + this.props.h + ')';
      return _react2.default.createElement('g', {
        className: this.props.className,
        style: this.props.style,
        transform: this.props.gridType === 'x' ? translate : '' });
    }
  }]);

  return Grid;
}(_react2.default.Component);

Grid.propTypes = {
  h: _propTypes2.default.number,
  len: _propTypes2.default.number,
  scale: _propTypes2.default.func,
  gridType: _propTypes2.default.oneOf(['x', 'y']),
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  ticks: _propTypes2.default.number
};
;

module.exports = Grid;