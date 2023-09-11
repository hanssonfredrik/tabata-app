import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Timer from '../timer';
import Settings from '../settings';
import Completed from '../completed';
import LogoImage from '../../images/logo.png';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#eee',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '35px',
    height: '35px',
    marginRight: '10px',
  }
});

export default function Main() {
  const classes = useStyles();
  const [selectedTab, setValue] = useState('timer');

  function handleChange(newValue) {
    setValue(newValue);
  }

  return (
    <div id="main">
      <AppBar position="static" id="appbar">
        <Toolbar>
          <img src={LogoImage} alt="Logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            Maries tabata timer
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ height: '100%' }}>
        {selectedTab === 'timer' && <Timer onChange={handleChange} />}
        {selectedTab === 'settings' && <Settings />}
        {selectedTab === 'completed' && <Completed onChange={handleChange} />}
      </Container>
      <BottomNavigation
        value={selectedTab}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >
        <BottomNavigationAction value="timer" label="Timer" icon={<TimerIcon />} />
        <BottomNavigationAction value="settings" label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </div>
  );
}
