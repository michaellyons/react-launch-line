'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Ease = require('d3-ease');

var _d3Timer = require('d3-timer');

var _d3Interpolate = require('d3-interpolate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Math.clip = function (number, min, max) {
  return Math.max(min, Math.min(number, max));
};

var Bar = function (_React$Component) {
  _inherits(Bar, _React$Component);

  function Bar(props) {
    _classCallCheck(this, Bar);

    var _this = _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, props));

    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this._updateStateValue = _this._updateStateValue.bind(_this);
    _this.goTween = _this.goTween.bind(_this);
    _this.tweenUp = _this.tweenUp.bind(_this);
    _this.tweenDown = _this.tweenDown.bind(_this);
    _this.state = {
      val: props.value
    };
    return _this;
  }

  _createClass(Bar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.value !== this.props.value) {
        var parsedVal = parseFloat(this.props.value);
        var parsedNext = parseFloat(nextProps.value);
        // console.log("Will Change Value!");
        // If we're growing, tween in the positive direction
        var func;
        if (parsedNext > parsedVal) {
          func = this.tweenUp;
        } else {
          func = this.tweenDown;
        }
        this.tween = func('val', this.state.val, parsedNext, this.props.duration).then(function (timer) {
          // console.log("Tween End!");
          timer.stop();
        });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: '_updateStateValue',
    value: function _updateStateValue(prop, v) {
      if (typeof v !== 'number') {
        return false;
      }
      if (this.state && this.state[prop] !== undefined) {
        var state = {};
        state[prop] = v;
        this.setState(state);
      } else {
        var _state = _objectWithoutProperties(this.state, []);

        _state[prop] = v;
        this.setState(_state);
      }
    }
  }, {
    key: 'tweenUp',
    value: function tweenUp(prop, start, end) {
      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
      var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'Linear';

      return this.goTween(prop, start, end, duration, 1, easing);
    }
  }, {
    key: 'tweenDown',
    value: function tweenDown(prop, start, end) {
      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
      var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'Linear';

      return this.goTween(prop, start, end, duration, -1, easing);
    }
  }, {
    key: 'goTween',
    value: function goTween(prop, start, end) {
      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;

      var _this2 = this;

      var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var easing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'Linear';

      // console.log("Tween with Duration ", duration)
      return new Promise(function (resolve, reject) {
        var i = (0, _d3Interpolate.interpolate)(start, end);
        var easeFun = _d3Ease.easeLinear;

        /* The timer stops when the callback retuns a truthy value */
        var time = (0, _d3Timer.timer)(function (elapsed, d) {
          if (_this2._setStopped) {
            return true;
          }
          // return true;

          var progress = easeFun(elapsed / duration);

          var value = i(progress);

          // num = value;
          if (direction > 0) {
            if (value >= end) {
              // console.log("Hit the Step Point!")
              _this2._updateStateValue(prop, end);
              resolve(time);
              return true;
            }
          } else {
            if (value <= end) {
              // console.log("Hit the Step Point!")
              _this2._updateStateValue(prop, end);
              resolve(time);
              return true;
            }
          }

          _this2._updateStateValue(prop, value);

          // _self.setState({width: value})
          if (elapsed > duration) {
            _this2._updateStateValue(prop, end);
            resolve(time);
            return true;
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          x = _props.x,
          y = _props.y,
          bkgColor = _props.bkgColor,
          barWidth = _props.barWidth,
          barPadding = _props.barPadding,
          color = _props.color,
          max = _props.max;
      var val = this.state.val;


      var totalHeight = height - barPadding * 2;
      var percent = Math.clip(val / max, 0.01, 1);
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
          'svg',
          {
            x: x,
            y: fixedY,
            width: barWidth,
            height: totalHeight * (1 - percent) },
          _react2.default.createElement('rect', {
            width: barWidth,
            height: totalHeight,
            fill: bkgColor,
            rx: rad,
            ry: rad,
            x: 0,
            y: 0 })
        )
      );
    }
  }]);

  return Bar;
}(_react2.default.Component);

Bar.propTypes = {
  barWidth: _propTypes2.default.number,
  barPadding: _propTypes2.default.number,
  height: _propTypes2.default.number,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  max: _propTypes2.default.number,
  value: _propTypes2.default.any,
  duration: _propTypes2.default.number,
  color: _propTypes2.default.string,
  bkgColor: _propTypes2.default.string
};
Bar.defaultProps = {
  barWidth: 60,
  barPadding: 8,
  height: 170,
  max: 100,
  data: [],
  decimal: 2,
  duration: 500,
  id: 'launch-gauge'
};
exports.default = Bar;