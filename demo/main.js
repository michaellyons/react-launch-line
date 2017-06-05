import React from 'react';
import ReactDOM from 'react-dom';
import {LineChart, MotionBarChart} from '../src';
import moment from 'moment';
import marked from 'marked';
import './main.css';
import '../styles/main.css';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import './mui-github-markdown.css';
import './prop-type-description.css';

const stringThing = (curve) =>
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
    return <LineChart curve="'+curve+'" data={data} />\n\
  }\n\
}\n\
```'}

const propertyTable =
`
Name| Type | Default | Description
--- | --- | --- | ---
title | string | | Title of the chart
`

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
};
const OPTION_LABEL_STYLE = {
};
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interp: 'curveCardinal',
      titleBkg: '#111111',
      textColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      mainBkg: '#263238',
      data: []
    };
    this.addAlert = this.addAlert.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.getSize = this.getSize.bind(this)
    this.setData = this.setData.bind(this)
    this.createRandomData = this.createRandomData.bind(this)
    this.handleDataChange = this.handleDataChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
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
  addAlert (title = 'Toast!', message = 'This is a toast!') {
    this.refs.toaster.success(
    message,
    title,
    {
      timeOut: 3000,
      extendedTimeOut: 3000
    });
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
  buildOptionRow(row, i) {
    return <tr key={i} style={OPTION_STYLE}>
              <td className='col-xs-2'>{row.component}</td>
              <td className='col-xs-2'>{row.key}</td>
              <td style={OPTION_LABEL_STYLE}>{row.name}</td>
           </tr>
  }
  buildPropRow(row, i) {
    return <tr key={i} style={OPTION_STYLE}>
              <td className='col-xs-2'>{row.key}</td>
              <td className='col-xs-2'>{row.type}</td>
              <td style={OPTION_LABEL_STYLE}>{row.desc}</td>
           </tr>
  }
  buildTable(title, rows) {
    return <table className='displayTable' style={{width: '100%'}}>
              <thead>
               <td>{title}</td>
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
      let random = parseInt(Math.random() * 1000) / 100;
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
      title,
      data,
      mainBkg,
    } = this.state;
    let generalOptions = this.buildTable('Props', [
      {
        name: 'Title',
        type: 'String',
        key: 'title',
        component: this.buildColorDiv('titleBkg', titleBkg)
      },
      {
        name: 'Data',
        key: 'data',
        type: 'Object[]',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
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
    return <div className='rootBkg' style={{color: 'white', backgroundImage: "url('./public/launch.jpg')"}}>
            <div className='container'>
            <ToastContainer ref="toaster"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-left" />
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
                title="DEFAULT"
                curve={interp}
                titleClass="fadeTitle"
                style={{backgroundColor: mainBkg}}
                titleStyle={{backgroundColor: titleBkg}}
                progressStyle={{fill: progressColor}}
                wrapStyle={{margin: ''}}
                xData={'date'}
                yData={'value'}
                data={data} />
              </div>
              <div style={{textAlign: 'center'}}>
                <select
                  style={{margin: '0px auto', color: 'black'}}
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
              <div
                style={{margin: '10px 0'}}
                dangerouslySetInnerHTML={{__html: marked(stringThing(interp))}} />
              <div className='glassBkg'>
              <div className='' style={SECTION_STYLE}>
                <h3 style={SECTION_TITLE_STYLE}>{"<LineChart />"}</h3>
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
