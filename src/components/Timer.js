import React, { Component } from 'react'
import Fire from "../components/Fire"


class Timer extends Component {

    state = {
        hours: 1,
        minutes: 0,
        seconds: 5,
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

        return (
            <div>
                { hours === 0 && minutes === 0 && seconds === 0
                    ? <Fire></Fire>
                    : <h1>Remaining: {hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
                <button onClick={this.resetTimer}>Click ME!</button>
            </div>
        )
    }
}

export default Timer;