import React, { Component } from 'react'

interface Props {
    day: string;
    icon: string;
    altText: string;
    temp: string;
}

export default class FutureWeather extends Component<Props> {
    render() {
        return (
            <div className='futureWeather'>
                <h3>{this.props.day}</h3>
                <img src={this.props.icon} alt={this.props.altText} />
                <span className="temp tempSmall">{this.props.temp}°</span>
            </div>
        )
    }
}
