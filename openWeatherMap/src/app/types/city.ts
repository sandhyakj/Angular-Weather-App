import { latlong } from "./latlong";

export interface city {
    id: number;
    name:string;
    state:string;
    country:string;
    coord: latlong;
}