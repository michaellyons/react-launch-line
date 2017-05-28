import React from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import * as d3Shape from 'd3-shape'
import { TransitionMotion, spring } from 'react-motion'

let { line, curveCardinal } = d3Shape

export default class LineChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.object,
    bkgColor: PropTypes.string,
    curve: PropTypes.string,
    data: PropTypes.any,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    titleClass: PropTypes.string,
    wrapStyle: PropTypes.object,
    yDomain: PropTypes.object,
    style: PropTypes.object,
    id: PropTypes.string
  };
  static defaultProps = {
    barWidth: 40,
    barPadding: 8,
    margin: {
      left: 10,
      bottom: 10,
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
  buildChart () {

  }
  willEnter () {

  }
  willLeave () {

  }
  getCurve (curve) {
    return d3Shape[curve] ? d3Shape[curve] : curveCardinal
  }
  render () {
    let {
      height,
      width,
      wrapStyle,
      curve,
      margin,
      style,
      title,
      titleStyle,
      titleClass,
      yDomain,
      data,
      bkgColor
    } = this.props
    let dCurve = this.getCurve(curve)
    var ext = extent(data)
    var chartWidth = width - margin.left - margin.right
    var chartHeight = height - margin.top - margin.bottom
    var x = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, chartWidth])
    var y = scaleLinear()
        .domain(yDomain || ext)
        .range([chartHeight, 0])
    var theLine = line()
    .x(function (d, i) { return x(i) })
    .y(function (d) { return y(d) })
    .curve(dCurve)

    return (
      <div style={{ width: width, ...wrapStyle }} ref={'wrap'}>
        <div
          className={titleClass}
          style={
           Object.assign(
             {},
             (!titleClass && { background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }),
             titleStyle)}>
          {title}
        </div>
        <svg
          id={this.props.id}
          width={width}
          height={height}
          style={{ background: bkgColor || '#333', ...style }}>
          <g
            transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <TransitionMotion
              styles={data.map((item, i) => ({
                key: i + '',
                style: { y: spring(item) }
              }))}>
              {interpolatedStyles =>
                // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                <path
                  d={theLine(interpolatedStyles.map(c => c ? c.style.y : 0))}
                  stroke={'#0288d1'}
                  strokeWidth={'3px'}
                  fill={'none'} />
              }
            </TransitionMotion>
          </g>
        </svg>
      </div>
    )
  }
}
