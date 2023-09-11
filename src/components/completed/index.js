import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { confetti } from 'dom-confetti';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Confetti from 'react-dom-confetti';
import Button from '@material-ui/core/Button';

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
  confettiContainer: {
    marginTop: '300px',
  },
  headerContainer: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '77px',
    marginTop: '-20px',
    backgroundColor: '#67bb8d',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '250px',
  },
  headerTitle: {
    color: '#fff',
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '20px',
  }
});

export default function Completed(props) {
  const classes = useStyles();
  const [confettiActive, setValue] = useState(false);
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    dragFriction: 0.12,
    duration: 5000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  setTimeout(() => {
    setValue(true);
  }, 100);

  return (
    <div className={classes.settings}>
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <div className={classes.headerTitle}>Congratulations!</div>
          <div>
            <CheckCircleOutlineIcon style={{ fontSize: 80, color: '#fff' }}  />
          </div>
          <div className={classes.headerSubTitle}>Training completed</div>
        </div>
        <div className={classes.confettiContainer}>
          <Button variant="contained" size="large" onClick={() => props.onChange('timer')}>Done</Button>
          <Confetti active={ confettiActive } config={ config }/>
        </div>
      </div>
    </div>
  );
}
