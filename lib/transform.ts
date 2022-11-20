import { TomorrowIO, WeatherData } from './types'
import WeatherCodes from './weatherCodes'
import dayjs from 'dayjs'

export async function transform(weatherAPIData: any): Promise<WeatherData[]> {
    const dailyWeather: TomorrowIO.Interval[] = weatherAPIData[0].intervals

    const weatherInfoAllIntervals: WeatherData[] = dailyWeather
        .filter((weather: TomorrowIO.Interval) => 'temperature' in weather.values)
        .map((weather: TomorrowIO.Interval) => {
            console.log('')
            return {
                date: weather?.startTime.split('T')[0],
                temperature: weather?.values?.temperature.toFixed(0),
                weatherImg: `/assets/weatherIcons/${weather?.values.weatherCode}0.png`,
                weatherDescription: WeatherCodes[weather?.values.weatherCode],
                day: dayjs(weather?.startTime).format('ddd'),
            }
        });

    const weatherInfo: WeatherData[] = weatherInfoAllIntervals.slice(0, 5);
    return weatherInfo
}