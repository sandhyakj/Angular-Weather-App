import { latlong } from "./latlong";

interface mainweather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface wind {
    speed: number;
    deg: number;
}

interface clouds {
    all: number;
    deg: number;
}

interface sys {
    type: number;
    id: number;
    message: number;
    country:string;
    sunrise: number;
    sunset: number;
}

export interface weather
{
    coord:latlong;
    weather: Array<mainweather>;
    base: string;
    main: main;
    visibility: number;
    wind:wind;
    clouds:clouds;
    dt:number;
    sys: sys;
    timezone:number;
    id:number;
    name:string;
    cod:string;
    imgurl:string;
}