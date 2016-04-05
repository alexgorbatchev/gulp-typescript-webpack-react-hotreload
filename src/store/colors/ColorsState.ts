export interface IColor {
  color: string;
  value: string;
}

export interface IColorsState {
  isFetching: boolean;
  items: Array<IColor>;
}
