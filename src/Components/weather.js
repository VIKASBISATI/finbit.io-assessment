import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  typographyAlignment: {
    textAlign: "center",
  },
});
function showMinMaxTemp(min, max) {
  return (
    <Typography variant="h6">
      MinTemp: {min}&deg;
      <br />
      MaxTemp: {max}&deg;
    </Typography>
  );
}
const Weather = (props) => {
  const classes = useStyles();
  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" className={classes.typographyAlignment}>
            {props.city},{props.country}
            <br />
            <i className={`wi ${props.weatherIcon} display-1`} />
            <br />
            {props.celsiusTemp}&deg;
            <br />
            {showMinMaxTemp(props.minTemp, props.maxTemp)}
            <br />
            Description: {props.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default Weather;
