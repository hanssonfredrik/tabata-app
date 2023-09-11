import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import preval from 'preval.macro';

const useStyles = makeStyles({
  settings: {
    marginTop: 20,
    marginBottom: 100,
  },
  container: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  workSlider: {
    color: 'green',
  },
  restSlider: {
    color: 'red',
  },
  exerciseSlider: {
    color: 'gray',
  },
  resetRoundSlider: {
    color: 'orange',
  },
});

function valuetext(value) {
  return `${value}`;
}

function getMarks(min, steps, count) {
  let marks = [];
  let counter = 0;
  // marks.push({
  //   value: min,
  //   label: String(min),
  // });
  for (let i = 0; i !== count; i++) {
    counter += steps;
    marks.push({
      value: counter,
      label: String(counter),
    });
  }
  return marks;
}

export default function Settings() {
  const classes = useStyles();

  const onWorkSliderChange = (event, newValue) => {
    localStorage.setItem('tabata-work', newValue);
  };

  const onRestSliderChange = (event, newValue) => {
    localStorage.setItem('tabata-rest', newValue);
  };

  const onExercisesSliderChange = (event, newValue) => {
    localStorage.setItem('tabata-exercises', newValue);
  };

  const onRoundsSliderChange = (event, newValue) => {
    localStorage.setItem('tabata-rounds', newValue);
  };

  const onResetRoundsSliderChange = (event, newValue) => {
    localStorage.setItem('tabata-resetrounds', newValue);
  };

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

  return (
    <div className={classes.settings}>
      <div className={classes.container}>
        <Typography id="discrete-slider" gutterBottom>
          Work
        </Typography>
        <Slider
          defaultValue={Number(initialWorkValue)}
          getAriaValueText={valuetext}
          aria-labelledby="continuous-slider-always"
          valueLabelDisplay="on"
          step={5}
          marks={getMarks(5, 30, 6)}
          min={5}
          max={195}
          className={classes.workSlider}
          onChangeCommitted={onWorkSliderChange}
        />
      </div>
      <div className={classes.container}>
        <Typography id="discrete-slider" gutterBottom>
          Rest
        </Typography>
        <Slider
          defaultValue={Number(initialRestValue)}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="on"
          step={5}
          marks={getMarks(5, 10, 6)}
          min={5}
          max={65}
          className={classes.restSlider}
          onChangeCommitted={onRestSliderChange}
        />
      </div>
      <div className={classes.container}>
        <Typography id="discrete-slider" gutterBottom>
          Exercises
        </Typography>
        <Slider
          defaultValue={Number(initialExercisesValue)}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="on"
          step={1}
          marks={getMarks(1, 5, 4)}
          min={1}
          max={22}
          className={classes.exerciseSlider}
          onChangeCommitted={onExercisesSliderChange}
        />
      </div>
      <div className={classes.container}>
        <Typography id="discrete-slider" gutterBottom>
          Rounds
        </Typography>
        <Slider
          defaultValue={Number(initialRoundsValue)}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="on"
          step={1}
          marks={getMarks(1, 5, 5)}
          min={0}
          max={27}
          onChangeCommitted={onRoundsSliderChange}
        />
      </div>
      <div className={classes.container}>
        <Typography id="discrete-slider" gutterBottom>
          Reset round
        </Typography>
        <Slider
          defaultValue={Number(initialResetRoundsValue)}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="on"
          step={5}
          marks={getMarks(5, 30, 6)}
          min={5}
          max={195}
          className={classes.resetRoundSlider}
          onChangeCommitted={onResetRoundsSliderChange}
        />
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="body2">
          Build date: {preval`module.exports = new Date().toLocaleString();`}
        </Typography>
      </div>
      <br />
      <br />
    </div>
  );
}
