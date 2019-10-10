import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ImageStyledPaper, StyledButton } from "./StyledMuiComponents";
import AppBar from "@material-ui/core/AppBar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";

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
  handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = this.state.editedImage;
    link.download = "export";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              accept="image/*"
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
              disabled={!this.state.imageLoaded}
              onClick={this.handleDownloadImage}
            >
              Export
            </StyledButton>
          </div>
          <div className="Main-window">
            <ImageStyledPaper>
              {this.state.imageLoaded ? (
                <img src={this.state.originalImage} alt={"originalImage"} />
              ) : (
                <ImageOutlinedIcon />
              )}
            </ImageStyledPaper>
            <div className="Arrow-wrapper">
              <ForwardOutlinedIcon style={{ transform: "rotate(180deg)" }} />
            </div>
            <ImageStyledPaper>
              {this.state.imageLoaded ? (
                <img src={this.state.editedImage} alt={"editedImage"} />
              ) : (
                <ImageOutlinedIcon />
              )}
            </ImageStyledPaper>
          </div>
          <div className="App-footer"></div>
        </div>
      </div>
    );
  }
}

export default App;
