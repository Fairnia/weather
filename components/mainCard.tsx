import React, { Component } from 'react';

class MainCard extends Component {
    render() {
        return (
            <div className='weatherTodayContainer'>
                <div className='weatherToday'>
                    <h2 className='weatherTodayTitle'>Today</h2>
                    <div className='weatherTodayContent'>
                        <div className="weatherTodayImgContainer">
                            <img src="/assets/weatherIcons/10000.png" alt="Sunny Icon" />
                        </div>
                        <div className='weatherTodayDescription'>
                            <span className="temp tempLarge">19°</span>
                            <span className="description">Sunny</span>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .weatherTodayImgContainer{
                        min-width: 135px;
                        display: flex;
                        justify-content: center;
                    }

                    img {
                        height: 80px;
                    }

                    .description{
                        font-size:1.5rem;
                    }

                    .weatherToday{

                    }
                `}</style>
            </div>
        )
    }
}

export default MainCard;