import type { NextApiRequest, NextApiResponse } from 'next'
import { transform } from '../../lib/transform'
// import fixture from '../../lib/fixtures'
import { WeatherData } from '../../lib/types'

const weatherAPIKey = process.env.WEATHER_API_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData[] | { message: string }>,
) {

  const {
    query: {
      lat,
      long
    },
  } = req

  try {
    const data = await fetch(`https://api.tomorrow.io/v4/timelines?location=${lat},${long}&apikey=${weatherAPIKey}&timesteps=1d&fields=temperature,weatherCode&units=metric`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'deflate'
      },
    })
    const weatherData = await data.json();
    // const weatherData = fixture
    const weatherDataTimelines = weatherData.data.timelines;
    const transformedWeatherData = await transform(weatherDataTimelines)
    console.log("transformedWeatherData ", transformedWeatherData)
    return res.status(200).json(transformedWeatherData)
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Unexpected error' })
  }
}
