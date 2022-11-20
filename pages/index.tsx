import { AppProps } from 'next/app';
import Head from 'next/head'
import React, { Component } from 'react';
import MainCard from '../components/mainCard';
import { Location } from '../lib/types';

const locations: Location[] = [
  {
    name: 'Null Island',
    coordinates: {
      lat: '0.0000',
      long: '0.0000'
    }
  },
  {
    name: 'Vancouver',
    coordinates: {
      lat: '49.2827',
      long: '123.1207'
    }
  },
  {
    name: 'North Pole',
    coordinates: {
      lat: '95.0000',
      long: '135.0000'
    }
  }
]
class Home extends Component<AppProps> {

  handleLocationUpdate(location: Location) {
    console.log("yo")
  }

  render() {
    return (
      <div>
        <Head>
          <title>Weather App</title>
          <meta name="description" content="Weather App created by Fairnia Farrokhi" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="mainContainer">
          {/* because this nav is specifically for this page, I have inserted it inside the main div */}
          <nav>
            {locations.map(location => {
              return <div className="navItem" onClick={() => this.handleLocationUpdate(location)}>{location.name}</div>
            })}
          </nav>

          <div className='weatherResults'>
            <MainCard />
            <div className='futureWeatherContainer'>
              {["Mon", "Tue", "Wed", "Thu"].map(day => {
                return (
                  <div className='futureWeather'>
                    <h3>{day}</h3>
                    <img src="/assets/weatherIcons/10000.png" alt="Sunny Icon" />
                    <span className="temp tempSmall">19°</span>
                  </div>
                )
              })}
            </div>

          </div>

        </main>

      </div >
    )
  }
}

export default Home;