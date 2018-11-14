import * as React from 'react';
import { PropertyControls, ControlType } from 'framer';

const style: React.CSSProperties = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflow: 'hidden',
  background: 'none'
};

const timeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex'
};

const buttonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: '0',
  margin: '0 3px 0 3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

interface Props {
  timeColor: string;
  timeSize: number;
  buttonSize: number;
  playButtonFill: string;
  resetButtonFill: string;
  pauseButtonFill: string;
  showButtons: boolean;
  autoStart: boolean;
  timerStatus: string;
}

interface State {
  minutes: number;
  seconds: number;
  hundredths: number;
  timestamp: number;
  isRunning: boolean;
  isPaused: boolean;
}

export class Stopwatch extends React.Component<Props, State> {
  state = {
    minutes: 0,
    seconds: 0,
    hundredths: 0,
    timestamp: null,
    isRunning: false,
    isPaused: false
  };

  static defaultProps = {
    timeColor: '#000',
    timeSize: 26,
    buttonSize: 22,
    playButtonFill: '#000',
    resetButtonFill: '#000',
    pauseButtonFill: '#000',
    showButtons: true,
    autoStart: false,
    timerStatus: null
  };

  static propertyControls: PropertyControls = {
    showButtons: {
      type: ControlType.Boolean,
      enabledTitle: 'Visible',
      disabledTitle: 'Hidden',
      defaultValue: true,
      title: 'Controls'
    },
    autoStart: {
      type: ControlType.Boolean,
      enabledTitle: 'On',
      disabledTitle: 'Off',
      defaultValue: false,
      title: 'Auto start'
    },
    timeColor: {
      type: ControlType.Color,
      title: 'Time',
      defaultValue: '#000000'
    },
    timeSize: {
      type: ControlType.Number,
      min: 0,
      title: 'Time Size',
      defaultValue: 26
    },
    buttonSize: {
      type: ControlType.Number,
      min: 0,
      title: 'Button Size',
      defaultValue: 22
    },
    playButtonFill: {
      type: ControlType.Color,
      title: 'Play',
      defaultValue: '#000000'
    },
    pauseButtonFill: {
      type: ControlType.Color,
      title: 'Pause',
      defaultValue: '#000000'
    },
    resetButtonFill: {
      type: ControlType.Color,
      title: 'Reset',
      defaultValue: '#000000'
    }
  };

  componentDidMount = () => {
    if (this.props.autoStart) {
      this.start();
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.timerStatus === 'start') {
      this.start();
    } else if (nextProps.timerStatus === 'pause') {
      this.pause();
    } else if (nextProps.timerStatus === 'reset') {
      this.reset();
    }

    if (nextProps.autoStart === false) {
      this.reset();
    }
  };

  calculate = timestamp => {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    let hundredths =
      this.state.hundredths + (timestamp - this.state.timestamp) / 10;

    if (hundredths >= 100) {
      seconds = seconds + 1;
      hundredths = 0;
    }

    if (this.state.seconds >= 60) {
      minutes = minutes + 1;
      seconds = seconds - 60;
    }

    this.setState({
      minutes,
      seconds,
      hundredths
    });
  };

  step = timestamp => {
    if (this.state.isRunning) {
      this.calculate(timestamp);
      this.setState({
        timestamp
      });
      window.requestAnimationFrame(this.step);
    }
  };

  start = () => {
    if (!this.state.isRunning) {
      this.state.timestamp = window.performance.now();
      this.setState({
        isRunning: true
      });
      window.requestAnimationFrame(this.step);
    }
  };

  reset = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      hundredths: 0,
      isRunning: false,
      isPaused: false,
      timestamp: null
    });
  };

  pause = () => {
    this.setState({
      isRunning: false,
      isPaused: true,
      timestamp: null
    });
  };

  resume = () => {
    this.setState({
      isPaused: false,
      isRunning: true
    });
    this.start();
  };

  displayHumanTime = () => {
    return `
      ${this.padTime(this.state.minutes)} :
      ${this.padTime(this.state.seconds)} :
      ${this.padTime(Math.floor(this.state.hundredths))}
    `;
  };

  padTime = time => (time.toString().length < 2 ? `0${time}` : time);

  render() {
    return (
      <div style={style}>
        <p
          style={{
            ...timeStyle,
            fontSize: `${this.props.timeSize}px`,
            color: this.props.timeColor
          }}
          onClick={this.state.isRunning ? this.pause : this.start}
          onDoubleClick={this.reset}
        >
          {this.displayHumanTime()}
        </p>
        {this.props.showButtons ? (
          <div style={buttonGroupStyle}>
            {this.state.isRunning ? (
              <button style={buttonStyle} onClick={this.pause}>
                <svg
                  fill={this.props.pauseButtonFill}
                  style={{
                    width: `${this.props.buttonSize}px`,
                    height: `${this.props.buttonSize}px`
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path d="M6 4c-.55 0-1 .45-1 1v22c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H6z" />
                  <path d="M9 29H6c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h3c1.103 0 2 .897 2 2v22c0 1.103-.897 2-2 2zm0-2v1-1zM6 5v22h2.997L9 5H6zM23 4c-.55 0-1 .45-1 1v22c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-3z" />
                  <path d="M26 29h-3c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h3c1.103 0 2 .897 2 2v22c0 1.103-.897 2-2 2zm0-2v1-1zM23 5v22h2.997L26 5h-3z" />
                </svg>
              </button>
            ) : (
              <button
                style={buttonStyle}
                onClick={this.state.isPaused ? this.resume : this.start}
              >
                <svg
                  fill={this.props.playButtonFill}
                  style={{
                    width: `${this.props.buttonSize}px`,
                    height: `${this.props.buttonSize}px`
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path d="M4.993 2.496C4.516 2.223 4 2.45 4 3v26c0 .55.516.777.993.504l22.826-13.008c.478-.273.446-.719-.031-.992L4.993 2.496z" />
                  <path d="M4.585 30.62C3.681 30.62 3 29.923 3 29V3c0-.923.681-1.62 1.585-1.62.309 0 .621.085.904.248l22.794 13.007c.559.319.878.823.878 1.382 0 .548-.309 1.039-.847 1.347L5.488 30.373a1.829 1.829 0 0 1-.903.247zM5 3.651v24.698l21.655-12.34L5 3.651z" />
                </svg>
              </button>
            )}

            <button style={buttonStyle} onClick={this.reset}>
              <svg
                fill={this.props.resetButtonFill}
                style={{
                  width: `${this.props.buttonSize}px`,
                  height: `${this.props.buttonSize}px`
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path d="M28 27c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h22c.55 0 1 .45 1 1v22z" />
                <path d="M27 29H5c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h22c1.103 0 2 .897 2 2v22c0 1.103-.897 2-2 2zm0-2v1-1zM5 5v22h21.997L27 5H5z" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
