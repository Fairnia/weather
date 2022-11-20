import React, { Component } from 'react';

interface Props {
    icon: string;
    altText: string;
    temp: string;
    description: string;
}

class TodaysWeather extends Component<Props> {
    render() {
        return (
            <div className='weatherTodayContainer'>
                <div className='weatherToday'>
                    <h2 className='weatherTodayTitle'>Today</h2>
                    <div className='weatherTodayContent'>
                        <div className="weatherTodayImgContainer">
                            <img src={this.props.icon} alt={this.props.altText} />
                        </div>
                        <div className='weatherTodayDescription'>
                            <span className="temp tempLarge">{this.props.temp}°</span>
                            <span className="description">{this.props.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodaysWeather;