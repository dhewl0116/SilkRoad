import styled from "styled-components";

interface WidthAndHeight {
  width?: string;
  height?: string;
}

export const Blank = styled.div<WidthAndHeight>`
  width: ${(p) => (p.width ? `${p.width}` : 0)};
  height: ${(p) => (p.height ? `${p.height}` : 0)};
`;
