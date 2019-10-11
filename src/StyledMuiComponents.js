import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


export const ImageStyledPaper = withStyles({
  root: {
    margin: "auto",
    width: "40%",
    height: "90%",
    backgroundColor: "#282c34",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": { maxHeight: "90%", maxWidth: "90%" }
  }
})(Paper);

