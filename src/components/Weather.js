import React, { Component } from 'react'
import '../css/Weather.css'
import Spinner from 'react-spinkit'



export default class Weather extends Component {

    state = {
        lat: null,
        long: null,
        main: '',
        icon: '',
        des: '',
    }

    componentDidMount() {
        this._getCoordinate();
    }
    render() {
        const { des, main, icon, lat, long } = this.state;

        return (
            <div className="Weather">
                {lat === null || long == null
                    ? <Spinner className="Loading" name="line-scale" color="rgb(252, 237, 210)" />
                    : <div className="row">
                        <h3 className="block fade-in">{parseInt(main)}°C</h3>
                        <img className="block fade-in" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={""}></img>
                        <h3 className="block fade-in">{des}</h3>
                    </div>
                }
            </div>

        )
    }


    _getCoordinate = () => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
                fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lat=${this.state.lat}&lon=${this.state.long}&lang=de&units=metric`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
                    }
                })
                    .then(response => response.json())
                    .then(json => {
                        this.setState({
                            main: json.main.temp,
                            icon: json.weather[0].icon,
                            des: json.weather[0].description
                        })
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
        }
        else {
            console.log("Fail to fetch..")
        }
    }
}

