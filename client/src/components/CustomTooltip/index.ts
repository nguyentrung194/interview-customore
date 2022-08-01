import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "rgb(85, 85, 85) !important",
    borderRadius: "4px",
    color: "rgb(255, 255, 255)",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    padding: "4px 8px",
    fontSize: "16px",
    maxWidth: "300px",
    margin: "2px",
    overflowWrap: "break-word",
    fontWeight: "normal",
  },
})(Tooltip);

export default CustomTooltip;
