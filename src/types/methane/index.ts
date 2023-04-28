export interface Time {
  interval_start: string;
  max: string;
  min: string;
}

export interface Value {
  average: number
  count: number
  max: number
  min: number
  "standard deviation": number
}

export interface IMethaneData {
  time: Time
  value: Value
}