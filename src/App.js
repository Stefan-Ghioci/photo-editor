import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import {StyledMenu, StyledMenuItem} from './StyledMuiComponents';

function App() {


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        PhotoEditor
      </div>
      <div className="App-body">
        <div className="Menu">
          <Button
              fullWidth={true}
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={handleClick}
          >
            File
          </Button>
          <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemText primary="New" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText primary="Open" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText primary="Save" />
            </StyledMenuItem>
          </StyledMenu>
        </div>
      </div>
    </div>
  );
}

export default App;
