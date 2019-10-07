import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { StyledButton, StyledPaper } from "./StyledMuiComponents";
import AppBar from "@material-ui/core/AppBar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

class App extends Component {
  state = { imageLoaded: false, originalImage: null, editedImage: null };

  handleImportImage = event => {
    if (event.target.files && event.target.files[0]) {
      let image = URL.createObjectURL(event.target.files[0]);
      this.setState({
        originalImage: image,
        imageLoaded: true,
        editedImage: image
      });
    }
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
            <input
              id="myInput"
              type="file"
              onChange={this.handleImportImage}
              ref={ref => (this.upload = ref)}
              style={{ display: "none" }}
            />
            <StyledButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={() => this.upload.click()}
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
            <StyledPaper>
              {this.state.imageLoaded ? (
                <img src={this.state.originalImage} alt={"originalImage"}/>
              ) : (
                <ImageOutlinedIcon />
              )}
            </StyledPaper>
            <StyledPaper>
              {this.state.imageLoaded ? (
                <img src={this.state.editedImage}  alt={"editedImage"}/>
              ) : (
                <ImageOutlinedIcon />
              )}
            </StyledPaper>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
