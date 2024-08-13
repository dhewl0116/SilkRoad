export interface flex {
  justify?: string;
  align?: string;
  gap?: string;
  $reverse?: boolean;
}

export interface widthAndHeight {
  width?: string;
  height?: string;
}
export interface rowColTypes extends flex, widthAndHeight {
  padding?: string;
  $fullw?: boolean; // width : 100%
  $fullh?: boolean; // height : 100%
  $flexAll?: boolean; // flex:1 to all JSX children
  $noShrink?: boolean;
}
