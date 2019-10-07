import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export const StyledButton = withStyles({
  root: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "1.25%",
    marginRight: "1.25%"
  }
})(Button);

export const StyledPaper = withStyles({
  root: {
    margin: "auto",
    width: "40%",
    height: "75%",
    backgroundColor: "#282c34",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": { fontSize: "20vh", color: "rgba(0,0,0,0.25)" },
    "& img": { maxHeight: "90%", maxWidth: "90%" }
  }
})(Paper);
