import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React from "react";

export const ImageStyledPaper = withStyles({
  root: {
    margin: "auto",
    width: "40%",
    height: "90%",
    backgroundColor: "#282c34",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      height: "90%",
      width: "90%",
      objectFit: "cover"
    }
  }
})(Paper);

export const StyledButton = withStyles({})(props => (
  <Button
    {...props}
    aria-controls="customized-menu"
    aria-haspopup="true"
    variant="contained"
    color="primary"
  />
));
