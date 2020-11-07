import React, { Component } from 'react'
import '../css/Weather.css'
import Spinner from 'react-spinkit'

const API_KEY = "63cab6d946b12c02de546fe2d28b9370";


export default class Weather extends Component {

    state = {
        lat: null,
        long: null,
        main: '',
        icon: '',
        des: '',
    }

    componentDidMount() {
        this._getWeather();
    }
    render() {
        const { des, main, icon, lat, long } = this.state;

        return (
            <div className="Weather">
                {lat === null || long == null
                    ? <Spinner className="Loading" name="line-scale" color="rgb(252, 237, 210)"/>
                    : <div className="row">
                        <h3 className="block fade-in">{main}°F</h3>
                        <img className="block fade-in" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
                        <h3 className="block fade-in">{des}</h3>
                    </div>
                }
            </div>

        )
    }

    _getWeather = () => {

        this._getCoordinate();
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&units=imperial&appid=${API_KEY}`)
            .then(res => res.json())
            .then((json) => {
                this.setState({
                    main: json.main.temp,
                    icon: json.weather[0].icon,
                    des: json.weather[0].description
                })
            })
    }

    _getCoordinate = () => {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
        })
    }
}