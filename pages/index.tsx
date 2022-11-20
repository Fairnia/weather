import { AppProps } from 'next/app';
import Head from 'next/head'
import React, { Component } from 'react';
import SmallerCard from '../components/smallerCard';
import MainCard from '../components/mainCard';
import { WeatherData } from '../lib/types';
import locations from '../lib/locations';
interface State {
  currentCity: string;
  weatherData: WeatherData[];
  isError: boolean;
  errorMessage: string;
}

class Home extends Component<AppProps, State> {
  state: State = {
    currentCity: locations[0].id,
    weatherData: [],
    isError: false,
    errorMessage: "",
  }

  async updateWeatherData(): Promise<void> {
    const cityData = locations.find(location => {
      return location.id === this.state.currentCity
    })
    this.setState({ weatherData: [] })
    try {
      const response = await fetch(`/api/weather?lat=${cityData?.coordinates.lat}&long=${cityData?.coordinates.long}`);
      const body = await response.json();

      if (!response.ok) {
        this.setState({
          errorMessage: body.message,
          isError: true
        })
      } else {
        this.setState({ weatherData: body })
      }
    } catch (error) {
      alert(`Something went wrong while fetching weather data: ${error}`)
    }
  }

  componentDidMount(): void {
    this.updateWeatherData();
  }

  render() {
    const todaysWeather: WeatherData = this.state.weatherData?.[0];

    return (
      <div>
        <Head>
          <title>Weather App</title>
          <meta name="description" content="Weather App created by Fairnia Farrokhi" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="mainContainer">
          {/* because this nav is specifically for this page, I have inserted it inside the main div */}
          {
            (this.state.weatherData.length === 0 && !this.state.isError) ?
              <div className='loading'>
                <img src="/loading.gif" alt="Loading indicator" width='75' height='75' />
              </div>
              :
              <>
                <nav>
                  {locations.map(location => {
                    return <div
                      key={location.id}
                      className={`navItem ${location.id === this.state.currentCity ? 'active' : ''}`}
                      onClick={() => {
                        this.setState({ currentCity: location.id }, () => {
                          this.updateWeatherData();
                        })
                      }}
                    >
                      {location.name}
                    </div>
                  })}
                </nav>

                {!this.state.isError && <div className='weatherResults'>
                  <MainCard
                    icon={todaysWeather?.weatherImg}
                    altText={`${todaysWeather?.weatherDescription} Icon`}
                    temp={todaysWeather?.temperature}
                    description={todaysWeather?.weatherDescription}
                  />
                  <div className='futureWeatherContainer'>
                    {this.state.weatherData.slice(1).map((weatherData, index) => {
                      return (
                        <SmallerCard
                          day={weatherData.day}
                          icon={weatherData.weatherImg}
                          altText={`${todaysWeather.weatherDescription} Icon`}
                          temp={weatherData.temperature}
                          key={`${weatherData.day}-${index}`}
                        />
                      )
                    })}
                  </div>
                </div>}
                {this.state.isError && <div className='weatherResults errored'>
                  {this.state.errorMessage}
                </div>}
              </>
          }
        </main>

      </div >
    )
  }
}

export default Home;