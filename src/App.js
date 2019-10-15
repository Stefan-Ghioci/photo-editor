import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ImageStyledPaper, StyledButton } from "./StyledMuiComponents";
import AppBar from "@material-ui/core/AppBar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { imgDataToPixelArray, pixelArrayToImgData } from "./Utils";
import { binarize, grayscale, invertColors } from "./ImageProcessing";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imageLoaded: false,
      originalImageSrc: null,
      editedImageSrc: null
    };
  }

  canvas = document.createElement("canvas");

  handleImportImage = event => {
    if (event.target.files && event.target.files[0]) {
      let image = URL.createObjectURL(event.target.files[0]);
      this.setState({
        originalImageSrc: image,
        imageLoaded: true,
        editedImageSrc: image
      });
    }
  };

  handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = this.state.editedImageSrc;
    link.download = "export";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  handleMergeChanges = () => {
    this.setState(prevState => ({
      originalImageSrc: prevState.editedImageSrc
    }));
  };

  handleProcessImage = computeFunction => {
    let pixelArray = this.getOriginalImagePixelArray();

    computeFunction(pixelArray);

    this.applyChanges(pixelArray);
  };

  getOriginalImagePixelArray() {
    this.canvas.width = this.originalImage.naturalWidth;
    this.canvas.height = this.originalImage.naturalHeight;

    let context = this.canvas.getContext("2d");
    context.drawImage(this.originalImage, 0, 0);
    let imageData = context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    return imgDataToPixelArray(imageData);
  }

  applyChanges(pixelArray) {
    const imgData = pixelArrayToImgData(
      pixelArray,
      this.originalImage.naturalWidth,
      this.originalImage.naturalHeight
    );
    this.canvas.getContext("2d").putImageData(imgData, 0, 0);
    this.setState({ editedImageSrc: this.canvas.toDataURL() });
  }

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
            <StyledButton onClick={() => this.upload.click()}>
              Import
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(invertColors)}
            >
              Invert Colors
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(grayscale)}
            >
              Grayscale
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(binarize)}
            >
              Binarize
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={this.handleDownloadImage}
            >
              Export
            </StyledButton>
          </div>
          <div className="Main-window">
            <ImageStyledPaper>
              {this.state.imageLoaded ? (
                <img
                  ref={ref => (this.originalImage = ref)}
                  src={this.state.originalImageSrc}
                  alt={"originalImageSrc"}
                />
              ) : (
                <ImageOutlinedIcon />
              )}
            </ImageStyledPaper>
            <div className="Arrow-wrapper">
              <IconButton
                disabled={!this.state.imageLoaded}
                onClick={this.handleMergeChanges}
                size={"small"}
              >
                <ForwardOutlinedIcon />
              </IconButton>
            </div>
            <ImageStyledPaper>
              {this.state.imageLoaded ? (
                <img
                  ref={ref => (this.editedImage = ref)}
                  src={this.state.editedImageSrc}
                  alt={"editedImageSrc"}
                />
              ) : (
                <ImageOutlinedIcon />
              )}
            </ImageStyledPaper>
          </div>
          <div className="App-footer" />
        </div>
      </div>
    );
  }
}

export default App;
