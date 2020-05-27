import React from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import Form from "./Components/form";
import Weather from "./Components/weather";

const API_Key = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "London",
      country: "GB",
      icon: "",
      main: "",
      celsius: "",
      maxTemp: "",
      minTemp: "",
      description: "",
      error: false,
      loading: false,
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }
  componentDidMount() {
    const { city, country } = this.state;
    this.getWeatherData(city, country);
  }
  convertKelvinToCelsius = (temp) => {
    let celsiusValue = Math.floor(temp - 273.15);
    return celsiusValue;
  };
  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }
  getWeatherData = async (city, country) => {
    this.setState({
      loading: true,
    });
    if (city && country) {
      const weatherApi = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`
      );
      const apiResponse = await weatherApi.json();
      this.setState({
        loading: false,
      });
      if (apiResponse.cod === "404") {
        alert(apiResponse.message);
      } else {
        this.setState({
          city: apiResponse.name,
          country: apiResponse.sys.country,
          celsius: this.convertKelvinToCelsius(apiResponse.main.temp),
          maxTemp: this.convertKelvinToCelsius(apiResponse.main.temp_max),
          minTemp: this.convertKelvinToCelsius(apiResponse.main.temp_min),
          description: apiResponse.weather[0].description,
        });
        this.getWeatherIcon(this.weatherIcon, apiResponse.weather[0].id);
      }
    } else {
      if (country === "" && city==="") {
        alert("city and country name should not be empty");
      }else if(city===""){
        alert("city should not be empty");
      }else{
        alert("Country name should not be empty");
      }
      this.setState({
        error: true,
        loading: false,
      });
    }
  };

  render() {
    const {
      city,
      country,
      celsius,
      minTemp,
      maxTemp,
      description,
      icon,
      error,
      loading,
    } = this.state;
    return (
      <>
        <Form
          loadWeather={this.getWeatherData}
          loading={loading}
        />
        <Weather
          city={city}
          country={country}
          celsiusTemp={celsius}
          description={description}
          minTemp={minTemp}
          maxTemp={maxTemp}
          weatherIcon={icon}
        />
      </>
    );
  }
}

export default App;
