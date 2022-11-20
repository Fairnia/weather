export interface Location {
    id: string;
    name: string;
    coordinates: {
        lat: string,
        long: string
    }
}

export interface WeatherData {
    date: string;
    day: string;
    temperature: string;
    weatherImg: string;
    weatherDescription: string;
}

export namespace TomorrowIO {
    export interface Interval {
        startTime: string,
        values: {
            temperature: number;
            weatherCode: number;
        }
    }
}