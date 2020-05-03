declare type State = 0 | 1 | 2 | 3;

declare interface Hospital {
  name: string;
  lat: number;
  lng: number;
  stateIcuLow: State;
  stateIcuHigh: State;
  stateEcmo: State;
}
