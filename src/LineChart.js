import React from 'react'
import PropTypes from 'prop-types'
import { scaleLinear, scaleTime } from 'd3-scale'
import { timeParse, timeFormat } from 'd3-time-format'
import { bisector, extent } from 'd3-array'
import * as d3Shape from 'd3-shape'
import { TransitionMotion, Motion, spring } from 'react-motion'
import Axis from './Axis'
import Gradient from './Gradient'

let { line, area, curveCardinal } = d3Shape

function createBisectorWithAccessor (key) {
  return bisector(function (d) { return key ? d[key] : d }).left
}
const PROP_TYPES = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  bkgColor: PropTypes.string,
  curve: PropTypes.string,
  yData: PropTypes.string,
  xData: PropTypes.string,
  data: PropTypes.any,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  titleClass: PropTypes.string,
  alwaysTooltip: PropTypes.boolean,
  tooltipKey: PropTypes.string,
  wrapStyle: PropTypes.object,
  yDomain: PropTypes.object,
  style: PropTypes.object,
  id: PropTypes.string
}
const DEFAULT_PROPS = {
  barWidth: 40,
  barPadding: 8,
  margin: {
    left: 22,
    bottom: 20,
    top: 10,
    right: 15
  },
  height: 170,
  width: 400,
  id: 'launch-linechart',
  xData: 'date',
  yData: 'value',
  bkgColor: '',
  max: 100,
  data: [],
  duration: 500
}

function parsedChart (Chart) {
  return class extends React.Component {
    static propTypes = {
      data: PROP_TYPES['data'],
      xData: PROP_TYPES['xData']
    };
    static defaultProps = DEFAULT_PROPS;
    render () {
      let parseDate = this.parse = timeParse('%Y-%m-%d')
      return <Chart {...this.props} data={this.props.data.map(d => ({
        ...d,
        [this.props.xData]: parseDate(d[this.props.xData])
      }))} />
    }
  }
}
class LineChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tooltip: {}
    }
    this.createChart = this.createChart.bind(this)
    this.showToolTip = this.showToolTip.bind(this)
    this.toolTipOn = this.toolTipOn.bind(this)
    this.toolTipOff = this.toolTipOff.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }
  static propTypes = PROP_TYPES;
  createChart () {
    let {
      height,
      width,
      curve,
      margin,
      yDomain,
      yData,
      xData,
      data
    } = this.props
    this.format = timeFormat('%Y-%m-%d')

    let dCurve = this.curve = this.getCurve(curve)
    let ext = this.extent = extent(data, (d) => d[yData])
    let domainExt = this.domainExt = extent(data, (d) => d[xData])
    console.log(domainExt)
    let chartWidth = this.chartWidth = width - margin.left - margin.right
    let chartHeight = this.chartHeight = height - margin.top - margin.bottom
    // Create the Domain Scale function
    let x = this.xScale = scaleTime()
        .domain(domainExt)
        .range([0, chartWidth])
    // Create the Range Scale function
    let y = this.yScale = scaleLinear()
        .domain(yDomain || [0, ext[1]])
        .range([chartHeight, margin.top])
    // Create the main Line  path definition
    let theLine = this.line = line()
    .x(function (d, i) { return x(d[xData]) })
    .y(function (d) { return y(d[yData]) })
    .curve(dCurve)

    // Create the Gradient Area path definition
    let theArea = this.area = area()
                .curve(dCurve)
                .x((d, i) => {
                  return x(d[xData])
                })
                .y0(chartHeight)
                .y1((d) => {
                  return y(d[yData])
                })
    return {
      x,
      y,
      line: theLine,
      area: theArea
    }
  }
  handleMouseOver (e) {
    if (this.props.alwaysTooltip) {
      this.toolTipOn()
    }
    this.obj = document.querySelector('#' + this.props.id)
    this.boundingRect = this.obj.getBoundingClientRect()
      // console.log('MouseOver!');
  }
  handleMouseOut (e) {
    this.toolTipOff()
      // console.log('Mouse Out!');
  }
  handleMouseMove (e) {
      // console.log('MouseMove!');
    let tooltipX, x0, i, d0, d1, d

    tooltipX = e.pageX - (this.boundingRect.left + this.props.margin.left)

    x0 = this.xScale.invert(tooltipX)
      // console.log(x0);
    var bisector = createBisectorWithAccessor(this.props.xData)
    i = bisector(this.props.data, x0, 1)
      // console.log(i);
    if (i >= this.props.data.length) {
      i = this.props.data.length - 1
    }
    d0 = this.props.data[i - 1]
    d1 = this.props.data[i]
    if (!d0) {
      d = d1
    } else {
      d = x0 - d0[this.props.xData] > d1[this.props.xData] - x0 ? d1 : d0
    }

    this.setState({
      tooltip: {
        display: true,
        pos: {
          x: this.xScale(d[this.props.xData]),
          y: this.yScale(d[this.props.yData])
        },
        data: {
          key: d[this.props.tooltipKey],
          value: d[this.props.yData]
        }
      }
    })
  }
  toolTipOn () {
    this.setState({ tooltip: { display: true, ...this.state.tooltip } })
  }
  toolTipOff () {
    this.setState({ tooltip: { ...this.state.tooltip, display: false } })
  }
  showToolTip (e) {
    e.target.setAttribute('fill', '#FFFFFF')

    this.setState({ tooltip:{
      display:true,
      data: {
        key:e.target.getAttribute('data-key'),
        value:e.target.getAttribute('data-value')
      },
      pos:{
        x:e.target.getAttribute('cx'),
        y:e.target.getAttribute('cy')
      }
    }
    })
  }
  hideToolTip (e) {
    e.target.setAttribute('fill', '#7dc7f4')
    this.setState({ tooltip:{ display:false, data:{ key:'', value:'' } } })
  }
  getCurve (curve) {
    return d3Shape[curve] ? d3Shape[curve] : curveCardinal
  }
  render () {
    let {
      height,
      width,
      wrapStyle,
      margin,
      style,
      title,
      titleStyle,
      titleClass,
      xData,
      yData,
      data,
      bkgColor
    } = this.props

    let { tooltip } = this.state

    let { pos } = tooltip

    this.createChart()

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
          {tooltip.data ? ' - ' + tooltip.data.value.toFixed(2) : ''}
        </div>
        <svg
          id={this.props.id}
          onMouseOver={this.handleMouseOver}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
          width={width}
          height={height}
          style={{ background: bkgColor || '#333', ...style }}>
          <defs>
            <Gradient color1={bkgColor || '#333'} color2='#0b88d1' id='area2' />
          </defs>
          <Axis
            style={{ stroke: 'white' }}
            orient='left'
            scale={this.yScale}
            h={height}
            axisType='y'
            className='axis'
            ticks={5}
            {...this.props} />
          <Axis
            style={{ stroke: '#FFF' }}
            orient='bottom'
            scale={this.xScale}
            h={height}
            axisType='x'
            className='axis'
            tickFormat='%m-%d'
            ticks={5}
            {...this.props} />
          <g
            transform={'translate(' + (margin.left) + ',' + margin.top + ')'}>
            <Motion defaultStyle={{ x: 0, y: 0 }} style={{ x: spring(pos ? pos.x : 0), y: spring(pos ? pos.y : 0) }}>
              {
                interpolatingStyle => {
                  return !tooltip.display ? null : <g>
                    <path
                      style={{ zIndex: 299 }}
                      d={'M' + (interpolatingStyle.x) + ',' + 0 + ' V ' + this.chartHeight}
                      strokeWidth={'1px'}
                      stroke='#aaa' />
                    <path
                      style={{ zIndex: 299 }}
                      d={'M' + (0) + ',' + interpolatingStyle.y + ' H ' + width}
                      strokeWidth={'1px'}
                      stroke='#aaa' />
                  </g>
                }
              }
            </Motion>
            <TransitionMotion
              styles={data.map((item, i) => ({
                key: this.format(item[xData]) + '',
                date: item[xData],
                data: item,
                style: { y: spring(item[yData]) }
              }))}>
              {interpolatedStyles =>
                // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                <g>
                  <path
                    d={this.line(interpolatedStyles.map(c => c ? { ...c.data, [yData]: c.style.y } : 0))}
                    stroke={'#0288d1'}
                    strokeWidth={'3px'}
                    strokeLinecap={'round'}
                    fill={'none'} />
                  <path
                    d={this.area(interpolatedStyles.map(c => c ? { ...c.data, [yData]: c.style.y } : 0))}
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
export default parsedChart(LineChart)
