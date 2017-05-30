'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gradient = _react2.default.createClass({
  displayName: 'Gradient',


  propTypes: {
    id: _propTypes2.default.string,
    color1: _propTypes2.default.string,
    color2: _propTypes2.default.string
  },
  render: function render() {
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
});

module.exports = Gradient;