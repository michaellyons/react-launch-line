import React from 'react';
import ReactDOM from 'react-dom';
import { LineChart } from '../src';
import moment from 'moment';
import marked from 'marked';
import ParallaxWrap from './Parallax';
import LazyImage from './LazyImage';
import './main.css';
import '../styles/main.css';

import './mui-github-markdown.css';
import './prop-type-description.css';

const stringThing = (curve, vars) =>
{ return '```javascript\n\
import { LineChart } from \'react-launch-line\' \
\n\
import \'react-launch-line/styles/main.css\' \
\n\
\n\
class AwesomeComponent extends Component {\n\
  constructor(props) {\n\
    super(props);\n\
  }\n\
  render() {\n\
    let data = [\n\
      { value: 10, date: \'2017-03-24\' },\n\
      { value: 42, date: \'2017-03-25\' },\n\
      { value: 2, date: \'2017-03-26\' },\n\
      ...\n\
    ];\n\
    return <LineChart title="PROFIT" curve="'+curve+'" data={data} />\n\
  }\n\
}\n\
```'}


const INIT_DATUMS = [
  '2017-03-01',
  '2017-03-02',
  '2017-03-03',
  '2017-03-04',
  '2017-03-05',
  '2017-03-06',
  '2017-03-07'
]

const SECTION_TITLE_STYLE = {
  margin: '0px 0px 20px 0px',
  padding: 10,
  borderBottom: '1px solid lightgrey'
};
const SECTION_STYLE = {
  padding: 10
};

const COLOR_INPUT_STYLE = {
  position: 'relative',
  height: 34,
  width: 60,
  boxShadow: '0px 0px 4px grey',
  margin: 4,
  borderRadius: 34,
};
const CHECKBOX_INPUT_STYLE = {
  width: 18,
  margin: '0px 36px',
  textAlign: 'center'
};
const BTN_STYLE = {
  margin: '0px 8px'
};
const OPTION_STYLE = {
  borderBottom: '1px solid lightgrey'
};
const OPTION_LABEL_STYLE = {
};
function formatData(data) {
  var obj = {};
  data.keys.map(function(k, i) {
    obj[k] = data.data[i];
  });
  obj.rawDate = data.date;
  return obj;
}
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interp: 'curveCardinal',
      titleBkg: '#111111',
      textColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      mainBkg: '#263238',
      showCode: {},
      data: []
    };
    this.handleResize = this.handleResize.bind(this)
    this.getSize = this.getSize.bind(this)
    this.setData = this.setData.bind(this)
    this.createRandomData = this.createRandomData.bind(this)
    this.handleDataChange = this.handleDataChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.toggleCode = this.toggleCode.bind(this)
  }
  componentDidMount() {
    this.handleResize();
    this.createRandomData();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize () {
    this.setState({ ...this.getSize() })
  }
  getSize () {
    return {w: window.innerWidth, h: window.innerHeight}
  }
  setData(key, val) {
    let { ...state } = this.state;
    state[key] = val;
    // console.log(key, e.target.value);
    this.setState(state);
  }
  handleDataChange(key, e) {
    let { ...state } = this.state;
    state[key] = e.target.value;
    // console.log(key, e.target.value);
    this.setState(state);
  }
  handleCheckboxChange(key) {
    let { ...state } = this.state;
    state[key] = !state[key];
    // console.log(key, state[key]);
    this.setState(state);
  }
  buildPropRow(row, i) {
    return <tr key={i} style={OPTION_STYLE}>
              <td className='col-xs-2 propKey'>{row.key}</td>
              <td className='col-xs-2 propType'>{row.type}</td>
              <td style={OPTION_LABEL_STYLE}>{row.default}</td>
              <td style={OPTION_LABEL_STYLE}><div
                style={{margin: ''}}
                dangerouslySetInnerHTML={{__html: marked(row.desc || '')}} /></td>
           </tr>
  }
  toggleCode(key) {
    let { ...state } = this.state;
    let { showCode } = state;
    showCode[key] = !showCode[key];
    console.log(key, showCode[key]);
    this.setState({showCode});
  }
  buildTable(title, header, rows) {
    return <table className='displayTable' style={{padding: 20, width: '100%'}}>
              <thead>
              <tr>
               {header.map((h, i) => <th style={{paddingLeft: 10}} key={i}>{h}</th>)}
               </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
  }
  buildColorDiv(key, value) {
    return <div key={key} style={{position: 'relative', margin: '6px 0px', boxShadow: '0px 0px 4px grey', height: 34, width: 60, borderRadius: 34, background: value}}>
          <input
            type='color'
            style={{...COLOR_INPUT_STYLE, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0}}
            value={value}
            onChange={this.handleDataChange.bind(null, key)} />
      </div>
  }
  createRandomData() {
    let array = [];
    let sum = 0;
    array = INIT_DATUMS.map((d, i) => {
      let random = parseInt(Math.random() * 10000) / 100;
      sum += (random ** 2);
      return ({ date: d, value: sum })
    });
    this.setState({data: array});
  }
  render() {

    let {
      h,
      w,
      titleBkg,
      progressColor,
      textColor,
      done,
      launch,
      interp,
      showCode,
      title,
      data,
      records,
      mainBkg,
    } = this.state;
    let generalOptions = this.buildTable('Props', ['Name', 'Type', 'Default', 'Description'], [
      {
        name: 'Title',
        type: 'String',
        key: 'title',
        desc: 'Title of the Chart.',
        component: this.buildColorDiv('titleBkg', titleBkg)
      },
      {
        name: 'Data',
        key: 'data',
        type: 'Array<Object>',
        desc: 'Array of objects with a **date** key and a **value** key (customizable).',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
      },
      {
        name: 'width',
        key: 'width',
        type: 'string|number',
        default: '400',
        desc: 'Width of the Container div',
        component: null
      },
      {
        name: 'height',
        key: 'height',
        default: '170',
        type: 'string|number',
        desc: 'Height of the Container div',
        component: null
      },
      {
        name: 'parseString',
        key: 'parseString',
        type: 'string',
        default: '"%Y-%m-%d"',
        desc: 'Date-string specifier with d3-parsable directives. [More Info](https://github.com/d3/d3-time-format/blob/master/README.md#timeParse)',
        component: null
      },
      {
        name: 'Curve',
        key: 'curve',
        default: 'curveLinear',
        type: 'string',
        desc: 'A d3-Shape curve definition. [More Info](https://github.com/d3/d3-shape/blob/master/README.md#curves)',
        component: null
      },
      {
        name: 'xData',
        key: 'xData',
        type: 'string',
        default: 'date',
        desc: 'Key determining x-value in data array.',
        component: null
      },
      {
        name: 'yData',
        key: 'yData',
        type: 'string',
        default: 'value',
        desc: 'Key determining y-value in data array.',
        component: null
      },
      {
        name: 'yUnitLabel',
        key: 'yUnitLabel',
        type: 'string',
        default: '',
        desc: 'Text label that denotes Y Axis Units',
        component: null
      },
      {
        name: 'yDomain',
        key: 'yDomain',
        type: 'Array<String>',
        default: '',
        desc: 'Text label that denotes Y Axis Units',
        component: null
      },
      {
        name: 'lineColor',
        key: 'lineColor',
        type: 'string',
        default: '"#0288d1"',
        desc: 'The color of the primary Line. (Default is a nice blue.)',
        component: null
      },
      {
        name: 'gradientColor',
        key: 'gradientColor',
        type: 'string',
        default: '"#0288d1"',
        desc: 'The color of the gradient top color. (Default is equal to lineColor.)',
        component: null
      },
      {
        name: 'showGradient',
        key: 'showGradient',
        type: 'bool',
        default: 'true',
        desc: 'Determines if Gradient fill is used.',
        component: null
      },
      {
        name: 'id',
        key: 'id',
        type: 'string',
        default: '',
        desc: 'The string id applied to the SVG component',
        component: null
      },
      {
        name: 'margin',
        key: 'margin',
        type: 'object',
        default: `(See Description)`,
        desc: 'Margin between container and chart. <br /> Default: ```{ top: 10, left: 10, bottom: 20, right: 25 }```',
        component: null
      },
      {
        key: 'style',
        type: 'object',
        default: ``,
        desc: 'Override the default Chart style object.',
        component: null
      },
      {
        key: 'titleStyle',
        type: 'object',
        default: ``,
        desc: 'Override the default Title style object.',
        component: null
      },
      {
        key: 'containerStyle',
        type: 'object',
        default: ``,
        desc: 'Override the default container style object.',
        component: null
      }
    ].map((item, i) => {
      return this.buildPropRow(item, i);
    }));
    let interpOpts = [
      'curveLinear',
      'curveStep',
      'curveStepBefore',
      'curveStepAfter',
      'curveBasis',
      'curveCardinal',
      'curveMonotoneX',
      'curveCatmullRom'
    ]
    return <div className='rootBkg' style={{color: 'white'}}>
            <div style={{width: '100%', position: 'fixed', top: 0, left: 0}}>
                <ParallaxWrap
                  full={true}
                  background={<LazyImage src={'./public/ses_10_prep.jpg'} />}
                  style={{ minHeight: h }}>
                  </ParallaxWrap>
            </div>
            <div className='container'>
            <div style={{ transition: 'all 0.9s ease-out', position: 'relative', zIndex: 1, paddingBottom: 120}}>
              <div style={{marginBottom: 30, textAlign: 'center'}} >
                <h1>React Launch Line</h1>
                <h4>{`npm install react-launch-line`}</h4>
                <h4>{`yarn add react-launch-line`}</h4>
              </div>
              <div style={{marginBottom: 30, textAlign: 'center'}}>
                <h3>{`Inspired by SpaceX's telemetry display.`}</h3>
                <h4>{`Depends on D3.js & React Motion`}</h4>
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <LineChart
                title="PROFIT"
                curve={interp}
                yAxisLabel={'$'}
                data={data} />
              </div>
              <div style={{textAlign: 'center', padding: 10, margin: 30, fontSize: '1.3em'}}>
                <select
                  style={{margin: '20px auto', color: 'black'}}
                  onChange={this.handleDataChange.bind(null, 'interp')}
                  value={this.state.interp}>
                  {
                    interpOpts.map(o => <option value={o} label={o} key={o} />)
                  }
                </select>
                <div>
                <button
                 style={BTN_STYLE}
                 className='btn btn-primary'
                 onClick={this.createRandomData}>
                 Randomize Values
                 </button>
                 </div>
              </div>

              <div className='glassBkg'>
              <div className='pad2'>
                <div className='flex' style={{marginBottom: 20}}>
                <span style={{fontSize: 24, margin: 'auto 0px'}}>{"<LineChart />"}</span>
                <div style={{marginLeft: 'auto'}}>
                  <button
                    className={'btn '+ (showCode['lineChart'] ? 'btn-disabled' : 'btn-primary')}
                    onClick={this.toggleCode.bind(null, 'lineChart')}>
                    {showCode['lineChart'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                </div>
                <div className={'accordion ' + (!showCode['lineChart'] && 'accordionClosed')}>
                  <div className='accordionContent'>
                    <div
                      style={{margin: '10px 0'}}
                      dangerouslySetInnerHTML={{__html: marked(stringThing(interp))}} />
                  </div>
                </div>
                <h3 style={SECTION_TITLE_STYLE}>{"Properties"}</h3>
                {generalOptions}
              </div>
              </div>
            </div>
            </div>
          </div>
  }
}
// <div
// className='propTypeDescription'>
//   <div
//   className='markdown-body'
//   style={{width: '100%', margin: '10px 0'}}
//   dangerouslySetInnerHTML={{__html: marked(propertyTable)}} />
// </div>
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {

  ReactDOM.render(
    <Demo style={{backgroundColor: 'none'}} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./main', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

render();
