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
    const response = await fetch(`https://api.tomorrow.io/v4/timelines?location=${lat},${long}&apikey=${weatherAPIKey}&timesteps=1d&fields=temperature,weatherCode&units=metric`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'deflate'
      },
    })
    if (!response.ok) {
      if (response.status === 429) {
        return res.status(429).json({
          message: "Unfortunately this application has been rate limited by the tomorrow.io, please try again soon"
        });
      } else {
        throw new Error('Could not fetch data from tomorrow.io.')
      }
    }
    const weatherData = await response.json();
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
