import React from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#282c34',
    height: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const classes = useStyles();

  return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar variant="dense">
            <IconButton edge="start"
                        className={classes.menuButton}
                        color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              PhotoEditor
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default App;
