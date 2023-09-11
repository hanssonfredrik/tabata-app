import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import TimeLeftSound from '../../sounds/timeleft.mp3';
import EndOfTimeSound from '../../sounds/end.mp3';
import EndOfRoundSound from '../../sounds/fanfare.mp3';
import { Link } from '@material-ui/core';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      startupTime: 10,
      seconds: 10,
      secondsLeft: 10,
      currentExercise: 1,
      currentRound: 1,
      numberOfExercises: 0,
      numberOfRounds: 0,
      initialWorkSeconds: 0,
      initialRestSeconds: 0,
      initialResetRoundsSeconds: 0,
      state: '',
      strokeDashArray: 283,
      showForward: false,
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.onStartTimeClick = this.onStartTimeClick.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);

    this.timeLeftAudio = new Audio(TimeLeftSound);
    this.endOfTimeAudio = new Audio(EndOfTimeSound);
    this.endOfRoundAudio = new Audio(EndOfRoundSound);

    this.WARNING_THRESHOLD = 10;
    this.ALERT_THRESHOLD = 5;
    this.COLOR_CODES = {
      info: {
        color: "green"
      },
      warning: {
        color: "orange",
        threshold: this.WARNING_THRESHOLD
      },
      alert: {
        color: "red",
        threshold: this.componentWillUnmountALERT_THRESHOLD
      }
    };

  } 

  componentDidMount() {
    let initialWorkValue = localStorage.getItem('tabata-work');
    if (initialWorkValue === null) initialWorkValue = 30;

    let initialRestValue = localStorage.getItem('tabata-rest');
    if (initialRestValue === null) initialRestValue = 10;

    let initialExercisesValue = localStorage.getItem('tabata-exercises');
    if (initialExercisesValue === null) initialExercisesValue = 8;

    let initialRoundsValue = localStorage.getItem('tabata-rounds');
    if (initialRoundsValue === null) initialRoundsValue = 5;

    let initialResetRoundsValue = localStorage.getItem('tabata-resetrounds');
    if (initialResetRoundsValue === null) initialResetRoundsValue = 10;

    this.setState({
      seconds: this.state.startupTime,
      secondsLeft: this.state.startupTime,
      numberOfExercises: Number(initialExercisesValue),
      numberOfRounds: Number(initialRoundsValue),
      initialWorkSeconds: Number(initialWorkValue) + 1,
      initialRestSeconds: Number(initialRestValue) + 1,
      initialResetRoundsSeconds: Number(initialResetRoundsValue) + 1,
    });
  }

  startTimer() {
    this.setState({
      isOn: true,
    })
    this.timer = setInterval(() => {
      if (this.state.secondsLeft === 1) {
        this.endOfTimeAudio.play();
      }

      if (this.state.secondsLeft === 1) {
        this.setNextState();
      }

      if (this.state.secondsLeft <= 4 && this.state.secondsLeft > 1) {
        this.timeLeftAudio.play();
      }

      this.setState({
        secondsLeft: this.state.secondsLeft - 1,
      });
      this.setCircleDasharray();
      this.setRemainingPathColor(this.state.secondsLeft);
    }, 1000);
  }

  stopTimer() {
    this.setState({
      isOn: false,
    });
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({
      state: '',
      currentExercise: 1,
      currentRound: 1,
      isOn: false,
      secondsLeft: this.state.seconds,
    })
  }

  setNextState() {
    switch (this.state.state) {
      case 'prepare':
        this.setState({
          state: 'work',
          seconds: this.state.initialWorkSeconds,
          secondsLeft: this.state.initialWorkSeconds,
          showForward: false,
        });
        break;
      case 'work':
        if (this.state.currentRound === this.state.numberOfRounds
          && this.state.currentExercise === this.state.numberOfExercises) {
          clearInterval(this.timer);
          this.endOfRoundAudio.play();
          this.resetTimer();
          this.props.onChange('completed');
          return;
        }

        let currentExercise = this.state.currentExercise;
        if (currentExercise + 1 <= this.state.numberOfExercises) {
          this.setState({
            state: 'rest',
            seconds: this.state.initialRestSeconds,
            secondsLeft: this.state.initialRestSeconds,
            showForward: true,
          });
        }
        else {
          this.setState({
            state: 'resetround',
            seconds: this.state.initialResetRoundsSeconds,
            secondsLeft: this.state.initialResetRoundsSeconds,
            showForward: true,
          });
        }
        break;
      case 'rest':
        let currentExercise2 = this.state.currentExercise;
        if (currentExercise2 + 1 <= this.state.numberOfExercises) {
          currentExercise2++;
        }
        else {
          currentExercise2 = 1;
        }
        this.setState({
          state: 'work',
          seconds: this.state.initialWorkSeconds,
          secondsLeft: this.state.initialWorkSeconds,
          currentExercise: currentExercise2,
          showForward: false,
        });
        break;
      case 'resetround':
        const currentRound2 = this.state.currentRound + 1;
        this.setState({
          state: 'work',
          seconds: this.state.initialWorkSeconds,
          secondsLeft: this.state.initialWorkSeconds,
          currentRound: currentRound2,
          currentExercise: 1,
          showForward: false,
        });
        break;
      default:
        break;
    }
  }

  onStartTimeClick() {
    this.setState({
      state: 'prepare',
      seconds: 10,
      secondsLeft: 10,
      strokeDashArray: 283,
      showForward: true,
    });

    this.startTimer();
  }

  onSkipClick(event) {
    this.setState({
      secondsLeft: 0,
    });
    this.setNextState();
    event.preventDefault();
    // this.props.onChange('completed');
    return false;
  }

  getTime() {
    const minutesLeft = Math.floor((this.state.secondsLeft / 60) % 60);
    const secondsLeft = Math.floor((this.state.secondsLeft) % 60);
    return {
      minutes: minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft,
      seconds: secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft,
    };
  }

  getState() {
    switch (this.state.state) {
      case 'prepare':
        return 'Get ready!';
        case 'work':
          return 'Work';
        case 'rest':
          return 'Rest';
        case 'resetround':
          return 'Reset round';
        default:
        return '';
    }
  }

  getClassName() {
    switch (this.state.state) {
      case 'prepare':
        return 'timer-preparing';
        case 'work':
          return 'timer-working';
        case 'rest':
          return 'timer-resting';
        case 'resetround':
          return 'timer-resetting';
        default:
        return '';
    }
  }

  calculateTotalTime() {
    const workRest = this.state.initialWorkSeconds + this.state.initialRestSeconds - 2;
    const roundsExercises = this.state.numberOfExercises * this.state.numberOfRounds;
    const resetRounds = (this.state.initialResetRoundsSeconds - 1) * (this.state.numberOfRounds - 1);
    const seconds = (workRest * roundsExercises) + resetRounds;

    if (seconds < 3600) {
      return new Date(seconds * 1000).toISOString().substr(14, 5);
    }
    else {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
  }

  renderStartupScreen() {
    const totalTime = this.calculateTotalTime();
    return (
      <div id="startup">
        <h1>{totalTime}</h1>
        <Fab color="primary" aria-label="add" style={{ width: '70px', height: '70px'}}>
          <PlayIcon onClick={this.onStartTimeClick} fontSize="large"  />
        </Fab>
      </div>
    );
  }

  setRemainingPathColor(timeLeft) {
    if (document.getElementById("base-timer-path-remaining") === null) return;
    // https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
    const { alert, warning, info } = this.COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
  
  calculateTimeFraction() {
    const rawTimeFraction = this.state.secondsLeft / (this.state.seconds - 1);
    return rawTimeFraction - (1 / (this.state.seconds - 1)) * (1 - rawTimeFraction);
  }
  
  setCircleDasharray() {
    if (document.getElementById("base-timer-path-remaining") === null) return;
    const FULL_DASH_ARRAY = 283;
    const circleDasharray = `${(
      this.calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;

    this.setState({
      strokeDashArray: circleDasharray,
    });
  }

  render() {
    if (this.state.state === '') return this.renderStartupScreen()

    let start = !this.state.isOn ?
      <Fab color="primary" aria-label="add">
        <PlayIcon onClick={this.startTimer} />
      </Fab> :
      null
    let stop = !this.state.isOn ?
      null :
      <Fab>
        <PauseIcon onClick={this.stopTimer} />
      </Fab>
    let resume = (this.secondsLeft !== this.seconds) && this.state.isOn ?
      <Fab color="primary" aria-label="add">
        <PlayIcon onClick={this.startTimer} />
      </Fab> : null;
    let reset = !this.state.isOn && 
    <Fab color="secondary" aria-label="edit" className="reset-button">
      <StopIcon onClick={this.resetTimer} />
    </Fab>
    let forward = this.state.showForward && 
      <Fab aria-label="edit" className="skip-button">
        <FastForwardIcon onClick={this.onSkipClick} />
      </Fab>

    // const skipButton = <Link href="#" onClick={this.onSkipClick}>skip</Link>;

    const time = this.getTime();

    let remainingPathColor = this.COLOR_CODES.info.color;

    const circleClass = `base-timer__path-remaining ${remainingPathColor}`;

    return (
        <div id="timer" className={this.getClassName()}>
          <div id="timer-header">
            <div className="box">
              <div className="box-header">Exercise</div>
              <div className="box-state">{this.state.currentExercise}/{this.state.numberOfExercises}</div>
            </div>
            <div className="box">
              <div className="box-header">Rounds</div>
              <div className="box-state">{this.state.currentRound}/{this.state.numberOfRounds}</div>
            </div>
          </div>
          <div id="timer-content">
            <div className="inner-content">
              <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                      id="base-timer-path-remaining"
                      strokeDasharray={this.state.strokeDashArray}
                      className={circleClass}
                      d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                      "
                    ></path>
                  </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">
                  {time.minutes}:{time.seconds}<br />
                  <div className="timer-state-label">{this.getState()}</div>
                </span>
              </div>
              <div className="timer-buttons">
                {start}
                {resume}
                {stop}
                {reset}
                {forward}
              </div>
              {/* <div className="timer-links">
                {skipButton}
              </div> */}
            </div>
          </div>
        </div>
      );
    }
}

// Timer.propTypes = {
// };

export default Timer;
