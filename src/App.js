import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { StyledButton, StyledPaper } from "./StyledMuiComponents";
import AppBar from "@material-ui/core/AppBar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

class App extends Component {
  handleImportImage = () => {
    
  };

  render() {
    return (
      <div className="App">
        <AppBar position="sticky">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            PhotoEditor
          </div>
        </AppBar>
        <div className="App-body">
          <div className="Menu">
            <StyledButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={this.handleImportImage}
            >
              Import
            </StyledButton>

            <StyledButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
            >
              Export
            </StyledButton>
          </div>
          <div className="Main-window">
            <StyledPaper>{<ImageOutlinedIcon />}</StyledPaper>
            <StyledPaper>{<ImageOutlinedIcon />}</StyledPaper>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
