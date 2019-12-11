import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ImageStyledPaper, StyledButton } from "./StyledMuiComponents";
import AppBar from "@material-ui/core/AppBar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";
import { imgDataToPixelArray, pixelArrayToImgData } from "./Utils";
import {
  bandPass,
  binarize,
  diff,
  directional,
  edge,
  extractBit,
  grayscale,
  highPass,
  increaseContrast,
  invert,
  laplacian,
  rangeCompress, skeleton
} from "./ImageProcessing";

class App extends Component {
  state = {
    imageLoaded: false,
    originalImageSrc: null,
    editedImageSrc: null,
    cachedSrc: null
  };

  canvas = document.createElement("canvas");

  handleResetChanges = () =>
    this.setState(prevState => {
      console.log(prevState);
      return {
        originalImageSrc: prevState.cachedSrc,
        editedImageSrc: prevState.cachedSrc
      };
    });

  handleImportImage = event => {
    if (event.target.files && event.target.files[0]) {
      let image = URL.createObjectURL(event.target.files[0]);
      this.setState({
        originalImageSrc: image,
        imageLoaded: true,
        editedImageSrc: image,
        cachedSrc: image
      });
    }
  };

  handleImportAndProcessDiffImage = event => {
    if (event.target.files && event.target.files[0]) {
      let src = URL.createObjectURL(event.target.files[0]);
      let diffImage = document.createElement("img");
      diffImage.src = src;
      let diffCanvas = document.createElement("canvas");
      let reference = this;
      diffImage.addEventListener(
        "load",
        function() {
          diffCanvas.width = diffImage.naturalWidth;
          diffCanvas.height = diffImage.naturalHeight;
          let diffContext = diffCanvas.getContext("2d");
          diffContext.drawImage(diffImage, 0, 0);

          let imageData = diffContext.getImageData(
            0,
            0,
            diffCanvas.width,
            diffCanvas.height
          );
          let diffPixelArray = imgDataToPixelArray(imageData);
          reference.handleProcessImage(pixelArray =>
            diff(pixelArray, diffPixelArray)
          );
        },
        false
      );
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

  handleRevertChanges = () =>
    this.setState(prevState => ({
      editedImageSrc: prevState.originalImageSrc
    }));

  handleMergeChanges = () =>
    this.setState(prevState => ({
      originalImageSrc: prevState.editedImageSrc
    }));

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
      <div className='App'>
        <AppBar position='sticky'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo'/>
            PhotoEditor
          </div>
        </AppBar>
        <div className='App-body'>
          <div className='Menu'>
            <input
              id='myInput'
              type='file'
              onChange={this.handleImportImage}
              ref={ref => (this.upload = ref)}
              style={{ display: "none" }}
              accept='image/*'
            />
            <StyledButton onClick={() => this.upload.click()}>
              Import
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={this.handleResetChanges}
            >
              Reset
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(invert)}
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
              onClick={() => this.handleProcessImage(increaseContrast)}
            >
              Increase Contrast
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={this.handleDownloadImage}
            >
              Export
            </StyledButton>
          </div>
          <div className='Main-window'>
            <ImageStyledPaper>
              {this.state.imageLoaded ? (
                <img
                  ref={ref => (this.originalImage = ref)}
                  src={this.state.originalImageSrc}
                  alt={"originalImageSrc"}
                />
              ) : (
                <ImageOutlinedIcon/>
              )}
            </ImageStyledPaper>
            <div className='Arrow-wrapper'>
              <IconButton
                disabled={!this.state.imageLoaded}
                onClick={this.handleMergeChanges}
                size={"small"}
              >
                <ArrowForwardIcon className='reverse'/>
              </IconButton>
              <IconButton
                disabled={!this.state.imageLoaded}
                onClick={this.handleRevertChanges}
                size={"small"}
              >
                <ArrowForwardIcon/>
              </IconButton>
            </div>
            <ImageStyledPaper>
              {this.state.imageLoaded ? (
                <img
                  src={this.state.editedImageSrc}
                  alt={"editedImageSrc"}
                />
              ) : (
                <ImageOutlinedIcon/>
              )}
            </ImageStyledPaper>
          </div>
          <div className='Menu'>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(edge)}
            >
              Edge
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(skeleton)}
            >
              Skeleton
            </StyledButton>
          </div>
          <div className='Menu'>
            <input
              id='myInput'
              type='file'
              onChange={this.handleImportAndProcessDiffImage}
              ref={ref => (this.uploadDiff = ref)}
              style={{ display: "none" }}
              accept='image/*'
            />
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.uploadDiff.click()}
            >
              Difference
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(extractBit)}
            >
              Extract Bit
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(directional)}
            >
              Directional
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(highPass)}
            >
              High Pass
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(bandPass)}
            >
              Band Pass
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(laplacian)}
            >
              Laplacian
            </StyledButton>
            <StyledButton
              disabled={!this.state.imageLoaded}
              onClick={() => this.handleProcessImage(rangeCompress)}
            >
              Dynamic Range Compression
            </StyledButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
