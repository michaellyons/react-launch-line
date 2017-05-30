'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Scale = require('d3-scale');

var _d3Array = require('d3-array');

var _d3Shape = require('d3-shape');

var d3Shape = _interopRequireWildcard(_d3Shape);

var _reactMotion = require('react-motion');

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Gradient = require('./Gradient');

var _Gradient2 = _interopRequireDefault(_Gradient);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var line = d3Shape.line,
    area = d3Shape.area,
    curveCardinal = d3Shape.curveCardinal;

var LineChart = function (_React$Component) {
  _inherits(LineChart, _React$Component);

  function LineChart() {
    _classCallCheck(this, LineChart);

    return _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).apply(this, arguments));
  }

  _createClass(LineChart, [{
    key: 'buildChart',
    value: function buildChart() {}
  }, {
    key: 'willEnter',
    value: function willEnter() {}
  }, {
    key: 'willLeave',
    value: function willLeave() {}
  }, {
    key: 'getCurve',
    value: function getCurve(curve) {
      return d3Shape[curve] ? d3Shape[curve] : curveCardinal;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          wrapStyle = _props.wrapStyle,
          curve = _props.curve,
          margin = _props.margin,
          style = _props.style,
          title = _props.title,
          titleStyle = _props.titleStyle,
          titleClass = _props.titleClass,
          yDomain = _props.yDomain,
          data = _props.data,
          bkgColor = _props.bkgColor;

      var dCurve = this.getCurve(curve);
      var ext = (0, _d3Array.extent)(data);
      var chartWidth = width - margin.left - margin.right;
      var chartHeight = height - margin.top - margin.bottom;
      var x = (0, _d3Scale.scaleLinear)().domain([0, data.length - 1]).range([0, chartWidth]);
      var y = (0, _d3Scale.scaleLinear)().domain(yDomain || [0, ext[1]]).range([chartHeight, 0]);
      var theLine = line().x(function (d, i) {
        return x(i);
      }).y(function (d) {
        return y(d);
      }).curve(dCurve);
      var theArea = area().curve(dCurve).x(function (d, i) {
        return x(i);
      }).y0(chartHeight).y1(function (d) {
        return y(d);
      });
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: width }, wrapStyle), ref: 'wrap' },
        _react2.default.createElement(
          'div',
          {
            className: titleClass,
            style: Object.assign({}, !titleClass && { background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }, titleStyle) },
          title
        ),
        _react2.default.createElement(
          'svg',
          {
            id: this.props.id,
            width: width,
            height: height,
            style: _extends({ background: bkgColor || '#333' }, style) },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(_Gradient2.default, { color1: bkgColor || '#333', color2: '#0b88d1', id: 'area2' })
          ),
          _react2.default.createElement(_Axis2.default, _extends({
            style: { stroke: 'white' },
            orient: 'left',
            scale: y,
            h: height,
            axisType: 'y',
            className: 'axis',
            ticks: 5
          }, this.props)),
          _react2.default.createElement(_Axis2.default, _extends({
            style: { stroke: '#FFF' },
            orient: 'bottom',
            scale: x,
            h: height,
            axisType: 'x',
            className: 'axis',
            ticks: 5
          }, this.props)),
          _react2.default.createElement(
            'g',
            {
              transform: 'translate(' + margin.left + ',' + margin.top + ')' },
            _react2.default.createElement(
              _reactMotion.TransitionMotion,
              {
                styles: data.map(function (item, i) {
                  return {
                    key: i + '',
                    style: { y: (0, _reactMotion.spring)(item) }
                  };
                }) },
              function (interpolatedStyles) {
                return (
                  // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                  _react2.default.createElement(
                    'g',
                    null,
                    _react2.default.createElement('path', {
                      d: theLine(interpolatedStyles.map(function (c) {
                        return c ? c.style.y : 0;
                      })),
                      stroke: '#0288d1',
                      strokeWidth: '3px',
                      fill: 'none' }),
                    _react2.default.createElement('path', {
                      d: theArea(interpolatedStyles.map(function (c) {
                        return c ? c.style.y : 0;
                      })),
                      id: 'area2',
                      fill: 'url(#area2)' })
                  )
                );
              }
            )
          )
        )
      );
    }
  }]);

  return LineChart;
}(_react2.default.Component);

LineChart.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  margin: _propTypes2.default.object,
  bkgColor: _propTypes2.default.string,
  curve: _propTypes2.default.string,
  data: _propTypes2.default.any,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  titleClass: _propTypes2.default.string,
  wrapStyle: _propTypes2.default.object,
  yDomain: _propTypes2.default.object,
  style: _propTypes2.default.object,
  id: _propTypes2.default.string
};
LineChart.defaultProps = {
  barWidth: 40,
  barPadding: 8,
  margin: {
    left: 20,
    bottom: 20,
    top: 10,
    right: 10
  },
  height: 170,
  width: 400,
  bkgColor: '',
  max: 100,
  data: [],
  duration: 500
};
exports.default = LineChart;