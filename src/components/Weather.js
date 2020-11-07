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
                        <h3 className="block fade-in">{main}°F</h3>
                        <img className="block fade-in" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
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
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&units=imperial&appid=${API_KEY}`)
                .then(res => res.json())
                .then((json) => {
                    this.setState({
                        main: json.main.temp,
                        icon: json.weather[0].icon,
                        des: json.weather[0].description
                    })
                })
            })
        }
        else{
            console.log("Fail..")
        }
    } 
} 