import React from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import * as d3Shape from 'd3-shape'
import { TransitionMotion, spring } from 'react-motion'
import Axis from './Axis'
import Gradient from './Gradient'

let { line, area, curveCardinal } = d3Shape

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
        .domain(yDomain || [0, ext[1]])
        .range([chartHeight, 0])
    var theLine = line()
    .x(function (d, i) { return x(i) })
    .y(function (d) { return y(d) })
    .curve(dCurve)
    var theArea = area()
                .curve(dCurve)
                .x((d, i) => {
                  return x(i)
                })
                .y0(chartHeight)
                .y1((d) => {
                  return y(d)
                })
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
          <defs>
            <Gradient color1={bkgColor || '#333'} color2='#0b88d1' id='area2' />
          </defs>

          <Axis
            style={{ stroke: 'white' }}
            orient='left'
            scale={y}
            h={height}
            axisType='y'
            className='axis'
            ticks={5}
            {...this.props} />
          <Axis
            style={{ stroke: '#FFF' }}
            orient='bottom'
            scale={x}
            h={height}
            axisType='x'
            className='axis'
            ticks={5}
            {...this.props} />
          <g
            transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <TransitionMotion
              styles={data.map((item, i) => ({
                key: i + '',
                style: { y: spring(item) }
              }))}>
              {interpolatedStyles =>
                // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                <g>
                  <path
                    d={theLine(interpolatedStyles.map(c => c ? c.style.y : 0))}
                    stroke={'#0288d1'}
                    strokeWidth={'3px'}
                    fill={'none'} />
                  <path
                    d={theArea(interpolatedStyles.map(c => c ? c.style.y : 0))}
                    id={'area2'}
                    fill={'url(#area2)'} />
                </g>
              }
            </TransitionMotion>
          </g>
        </svg>
      </div>
    )
  }
}
