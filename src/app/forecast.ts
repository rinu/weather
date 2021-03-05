export interface Forecast {
  daily: [{
    dt: number,
    temp: {
      max: number;
      min: number;
    },
    weather: [{
      description: string;
      icon: string;
    }]
  }]
}
