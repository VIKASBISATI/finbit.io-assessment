import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputDropDown from "./inputDropDown";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.formStyles,
  submitButton: {
    position: "relative",
    float: "right",
  },
  progressSpinner: {
    position: "absolute",
  },
});
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
    };
  }
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  getWeather = (e) => {
    const { city, country } = this.state;
    this.props.loadWeather(city, country);
  };
  render() {
    const { loading, classes } = this.props;
    const { country } = this.state;
    return (
      <div className="form-container">
        <div className="text1">
          <InputDropDown
            setCityName={(cityName) => {
              this.setState({
                city: cityName,
              });
            }}
          />
        </div>
        <div className="text2">
          <TextField
            label="Country"
            name="country"
            variant="outlined"
            value={country}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <Button
            variant="contained"
            disabled={loading}
            color="primary"
            onClick={this.getWeather}
          >
            GetWeather
            {loading && (
              <CircularProgress size={30} className={classes.progressSpinner} />
            )}
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Form);
