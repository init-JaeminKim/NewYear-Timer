import React, { Component } from 'react'
import Fire from "../components/Fire"

let newYear = 1609480800000-Date.now();

class Timer extends Component {

   
    

    state = {
        hours: parseInt(newYear/3600000),
        minutes: parseInt((newYear/60000)%60),
        seconds: parseInt((newYear/3600000)%24)
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, hours } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {

                        clearInterval(this.myInterval)
                    }
                    else {
                        this.setState(({ hours }) => ({
                            hours: hours - 1,
                            minutes: 59,
                            seconds: 59
                        }))
                    }
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }

            }
        }, 1000)
    }


    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    resetTimer = () => {
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
    };

    render() {
        const { hours, minutes, seconds } = this.state

        return [
            <h2>New Year</h2>,
            <div>
                { hours === 0 && minutes === 0 && seconds === 0
                    ? <Fire></Fire>
                    : <h1>{hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                    </h1>
                }
                <button className="button2" onClick={this.resetTimer}>./Warp</button>
                <a href="https://github.com/init-JaeminKim/NewYear-Timer"><button>source code</button></a>
            </div>
        ]
    }
}

export default Timer;