export interface Weather {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: [{
    description: string;
    icon: string;
  }],
  wind: {
    speed: number;
  },
  sys: {
    country: string;
  }
}
