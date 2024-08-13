import styled from "styled-components";
import { TypoProps } from "../../types/type";

export const Typo = styled.div<TypoProps>`
  color: ${(p) => (p.color ? `var(${p.color})` : `var(--black)`)};
  font-weight: ${(p) => (p.$bold ? "600" : "400")};
  text-decoration: ${(p) => (p.$underline ? "underline" : "")};
  word-break: break-all;
`;

export const Display = styled(Typo)`
  font-size: 48px;
  line-height: 64px; /* 133.333% */
  letter-spacing: -1.44px;
`;

export const Title = styled(Typo)`
  font-size: 24px;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.72px;
`;

export const Heading = styled(Typo)`
  font-size: 20px;
  line-height: 28px; /* 140% */
  letter-spacing: -0.6px;
`;

export const Body = styled(Typo)`
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.48px;
`;

export const Label = styled(Typo)`
  font-size: 14px;
  line-height: 22px; /* 157.143% */
  letter-spacing: -0.42px;
`;

export const Footnote = styled(Typo)`
  font-size: 12px;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.36px;
`;

export const Caption = styled(Typo)`
  font-size: 10px;
  line-height: 16px; /* 160% */
  letter-spacing: -0.3px;
`;
