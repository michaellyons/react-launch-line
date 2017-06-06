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

var _d3TimeFormat = require('d3-time-format');

var _d3Array = require('d3-array');

var _d3Shape = require('d3-shape');

var d3Shape = _interopRequireWildcard(_d3Shape);

var _reactMotion = require('react-motion');

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Gradient = require('./Gradient');

var _Gradient2 = _interopRequireDefault(_Gradient);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var line = d3Shape.line,
    area = d3Shape.area,
    curveCardinal = d3Shape.curveCardinal;


function createBisectorWithAccessor(key) {
  return (0, _d3Array.bisector)(function (d) {
    return key ? d[key] : d;
  }).left;
}
var PROP_TYPES = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  margin: _propTypes2.default.object,
  bkgColor: _propTypes2.default.string,
  curve: _propTypes2.default.string,
  yData: _propTypes2.default.string,
  yUnitLabel: _propTypes2.default.string,
  xData: _propTypes2.default.string,
  data: _propTypes2.default.any,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  titleClass: _propTypes2.default.string,
  lineColor: _propTypes2.default.string,
  gradientColor: _propTypes2.default.string,
  showGradient: _propTypes2.default.bool,
  alwaysTooltip: _propTypes2.default.bool,
  containerStyle: _propTypes2.default.object,
  yDomain: _propTypes2.default.object,
  onTooltipChange: _propTypes2.default.func,
  style: _propTypes2.default.object,
  id: _propTypes2.default.string
};
var DEFAULT_PROPS = {
  barWidth: 40,
  barPadding: 8,
  margin: {
    left: 32,
    bottom: 20,
    top: 10,
    right: 15
  },
  height: 170,
  width: 400,
  id: 'launch-linechart',
  curve: 'curveLinear',
  lineColor: '#0288d1',
  gradientColor: '#0288d1',
  showGradient: true,
  parseString: '%Y-%m-%d',
  xData: 'date',
  yData: 'value',
  bkgColor: '#263238',
  max: 100,
  data: [],
  duration: 500
};

/**
 * < HOC >
 *   Loops through data prop and overwrites xData key
 *   with properly parsed date object
 */
function parsedChart(Chart) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var parseDate = this.parse = (0, _d3TimeFormat.timeParse)(this.props.parseString);
        return _react2.default.createElement(Chart, _extends({}, this.props, { data: this.props.data.map(function (d) {
            return _extends({}, d, _defineProperty({}, _this2.props.xData, parseDate(d[_this2.props.xData])));
          }) }));
      }
    }]);

    return _class;
  }(_react2.default.Component), _class.propTypes = {
    data: PROP_TYPES['data'],
    parseString: PROP_TYPES['parseString'],
    xData: PROP_TYPES['xData']
  }, _class.defaultProps = DEFAULT_PROPS, _temp;
}

var LineChart = function (_React$Component2) {
  _inherits(LineChart, _React$Component2);

  function LineChart(props) {
    _classCallCheck(this, LineChart);

    var _this3 = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, props));

    _this3.state = {
      tooltip: {}
    };
    _this3.createChart = _this3.createChart.bind(_this3);
    _this3.showToolTip = _this3.showToolTip.bind(_this3);
    _this3.toolTipOn = _this3.toolTipOn.bind(_this3);
    _this3.toolTipOff = _this3.toolTipOff.bind(_this3);
    _this3.handleMouseOver = _this3.handleMouseOver.bind(_this3);
    _this3.handleMouseOut = _this3.handleMouseOut.bind(_this3);
    _this3.handleMouseMove = _this3.handleMouseMove.bind(_this3);
    _this3._onTooltipChange = _this3._onTooltipChange.bind(_this3);
    return _this3;
  }

  _createClass(LineChart, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps, lastState) {
      if (this.state.tooltipKey !== lastState.tooltipKey) {
        console.log('Tooltip Value Changed!', this.state.tooltip.data);
        this._onTooltipChange();
      }
    }
  }, {
    key: '_onTooltipChange',
    value: function _onTooltipChange() {
      if (this.props.onTooltipChange && typeof this.props.onTooltipChange === 'function') {
        this.props.onTooltipChange(this.state.tooltip.data);
      }
    }
  }, {
    key: 'createChart',
    value: function createChart() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          curve = _props.curve,
          margin = _props.margin,
          yDomain = _props.yDomain,
          yData = _props.yData,
          xData = _props.xData,
          data = _props.data;

      this.format = (0, _d3TimeFormat.timeFormat)('%Y-%m-%d');

      var dCurve = this.curve = this.getCurve(curve);
      var ext = this.extent = (0, _d3Array.extent)(data, function (d) {
        return d[yData];
      });
      var domainExt = this.domainExt = (0, _d3Array.extent)(data, function (d) {
        return d[xData];
      });
      var chartWidth = this.chartWidth = width - margin.left - margin.right;
      var chartHeight = this.chartHeight = height - margin.top - margin.bottom;
      // Create the Domain Scale function
      var x = this.xScale = (0, _d3Scale.scaleTime)().domain(domainExt).range([0, chartWidth]);
      // Create the Range Scale function
      var y = this.yScale = (0, _d3Scale.scaleLinear)().domain(yDomain || [0, ext[1]]).range([chartHeight, margin.top]);
      // Create the main Line  path definition
      var theLine = this.line = line().x(function (d, i) {
        return x(d[xData]);
      }).y(function (d) {
        return y(d[yData]);
      }).curve(dCurve);

      // Create the Gradient Area path definition
      var theArea = this.area = area().curve(dCurve).x(function (d, i) {
        return x(d[xData]);
      }).y0(chartHeight).y1(function (d) {
        return y(d[yData]);
      });
      return {
        x: x,
        y: y,
        line: theLine,
        area: theArea
      };
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver(e) {
      if (this.props.alwaysTooltip) {
        this.toolTipOn();
      }
      this.obj = document.querySelector('#' + this.props.id);
      this.boundingRect = this.obj.getBoundingClientRect();
      // console.log('MouseOver!');
    }
  }, {
    key: 'handleMouseOut',
    value: function handleMouseOut(e) {
      this.toolTipOff();
      // console.log('Mouse Out!');
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      // console.log('MouseMove!');
      var tooltipX = void 0,
          x0 = void 0,
          i = void 0,
          d0 = void 0,
          d1 = void 0,
          d = void 0;

      tooltipX = e.pageX - (this.boundingRect.left + this.props.margin.left);

      x0 = this.xScale.invert(tooltipX);
      // console.log(x0);
      var bisector = createBisectorWithAccessor(this.props.xData);
      i = bisector(this.props.data, x0, 1);
      // console.log(i);
      if (i >= this.props.data.length) {
        i = this.props.data.length - 1;
      }
      d0 = this.props.data[i - 1];
      d1 = this.props.data[i];
      if (!d0) {
        d = d1;
      } else {
        d = x0 - d0[this.props.xData] > d1[this.props.xData] - x0 ? d1 : d0;
      }

      this.setState({
        tooltipKey: d[this.props.xData],
        tooltip: {
          display: true,
          pos: {
            x: this.xScale(d[this.props.xData]),
            y: this.yScale(d[this.props.yData])
          },
          data: {
            key: d[this.props.xData],
            value: d[this.props.yData]
          }
        }
      });
    }
  }, {
    key: 'toolTipOn',
    value: function toolTipOn() {
      this.setState({ tooltip: _extends({ display: true }, this.state.tooltip) });
    }
  }, {
    key: 'toolTipOff',
    value: function toolTipOff() {
      this.setState({ tooltip: _extends({}, this.state.tooltip, { display: false }) });
    }
  }, {
    key: 'showToolTip',
    value: function showToolTip(e) {
      e.target.setAttribute('fill', '#FFFFFF');

      this.setState({ tooltip: {
          display: true,
          data: {
            key: e.target.getAttribute('data-key'),
            value: e.target.getAttribute('data-value')
          },
          pos: {
            x: e.target.getAttribute('cx'),
            y: e.target.getAttribute('cy')
          }
        }
      });
    }
  }, {
    key: 'hideToolTip',
    value: function hideToolTip(e) {
      e.target.setAttribute('fill', '#7dc7f4');
      this.setState({ tooltip: { display: false, data: { key: '', value: '' } } });
    }
  }, {
    key: 'getCurve',
    value: function getCurve(curve) {
      return d3Shape[curve] ? d3Shape[curve] : curveCardinal;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          height = _props2.height,
          width = _props2.width,
          containerStyle = _props2.containerStyle,
          margin = _props2.margin,
          style = _props2.style,
          title = _props2.title,
          titleStyle = _props2.titleStyle,
          titleClass = _props2.titleClass,
          xData = _props2.xData,
          yData = _props2.yData,
          yUnitLabel = _props2.yUnitLabel,
          lineColor = _props2.lineColor,
          showGradient = _props2.showGradient,
          gradientColor = _props2.gradientColor,
          data = _props2.data,
          bkgColor = _props2.bkgColor;
      var tooltip = this.state.tooltip;
      var pos = tooltip.pos;


      this.createChart();
      var gradientDef = showGradient ? _react2.default.createElement(_Gradient2.default, { color1: bkgColor, color2: gradientColor, id: this.props.id + '_area' }) : null;
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: width }, containerStyle), ref: 'wrap' },
        _react2.default.createElement(
          'div',
          {
            className: titleClass,
            style: Object.assign({}, !titleClass && { background: bkgColor, padding: '4px 12px', color: 'white', fontSize: 16 }, titleStyle) },
          title,
          tooltip.data ? ' - ' + tooltip.data.value.toFixed(2) : ''
        ),
        _react2.default.createElement(
          'svg',
          {
            id: this.props.id,
            onMouseOver: this.handleMouseOver,
            onMouseMove: this.handleMouseMove,
            onMouseOut: this.handleMouseOut,
            width: width,
            height: height,
            style: _extends({ background: bkgColor }, style) },
          _react2.default.createElement(
            'defs',
            null,
            gradientDef
          ),
          _react2.default.createElement(
            'text',
            { y: margin.top + 4, x: margin.left, style: { stroke: 'white' } },
            yUnitLabel
          ),
          _react2.default.createElement(_Axis2.default, _extends({
            style: { stroke: 'white' },
            orient: 'left',
            scale: this.yScale,
            h: height,
            axisType: 'y',
            className: 'axis',
            ticks: 5
          }, this.props)),
          _react2.default.createElement(_Axis2.default, _extends({
            style: { stroke: '#FFF' },
            orient: 'bottom',
            scale: this.xScale,
            h: height,
            axisType: 'x',
            className: 'axis',
            tickFormat: '%m-%d',
            ticks: 5
          }, this.props)),
          _react2.default.createElement(
            'g',
            {
              transform: 'translate(' + margin.left + ',' + margin.top + ')' },
            _react2.default.createElement(_Grid2.default, _extends({
              h: this.chartHeight,
              len: this.chartWidth,
              ticks: 5,
              scale: this.yScale,
              className: 'grid',
              gridType: 'y'
            }, this.props)),
            _react2.default.createElement(
              _reactMotion.Motion,
              { defaultStyle: { x: 0, y: 0 }, style: { x: (0, _reactMotion.spring)(pos ? pos.x : 0), y: (0, _reactMotion.spring)(pos ? pos.y : 0) } },
              function (interpolatingStyle) {
                return !tooltip.display ? null : _react2.default.createElement(
                  'g',
                  null,
                  _react2.default.createElement('path', {
                    style: { zIndex: 299 },
                    d: 'M' + interpolatingStyle.x + ',' + 0 + ' V ' + _this4.chartHeight,
                    strokeWidth: '1px',
                    stroke: '#aaa' }),
                  _react2.default.createElement('path', {
                    style: { zIndex: 299 },
                    d: 'M' + 0 + ',' + interpolatingStyle.y + ' H ' + width,
                    strokeWidth: '1px',
                    stroke: '#aaa' })
                );
              }
            ),
            _react2.default.createElement(
              _reactMotion.TransitionMotion,
              {
                styles: data.map(function (item, i) {
                  return {
                    key: _this4.format(item[xData]) + '',
                    date: item[xData],
                    data: item,
                    style: { y: (0, _reactMotion.spring)(item[yData]) }
                  };
                }) },
              function (interpolatedStyles) {
                return (
                  // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                  _react2.default.createElement(
                    'g',
                    null,
                    _react2.default.createElement('path', {
                      d: _this4.line(interpolatedStyles.map(function (c) {
                        return c ? _extends({}, c.data, _defineProperty({}, yData, c.style.y)) : 0;
                      })),
                      stroke: lineColor,
                      strokeWidth: '3px',
                      strokeLinecap: 'round',
                      fill: 'none' }),
                    _react2.default.createElement('path', {
                      d: _this4.area(interpolatedStyles.map(function (c) {
                        return c ? _extends({}, c.data, _defineProperty({}, yData, c.style.y)) : 0;
                      })),
                      id: 'area2',
                      fill: 'url(#' + _this4.props.id + '_area' + ')' })
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

LineChart.propTypes = PROP_TYPES;
exports.default = parsedChart(LineChart);