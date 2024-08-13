import styled from "styled-components";
import { Col, Row, SvgContainer } from "../components/atomic";
import ArrowBack from "@material-symbols/svg-300/rounded/arrow_back.svg?react";
import { Display, Heading } from "../components/Typo";
import Info from "@material-symbols/svg-300/rounded/info.svg?react";
import { Link } from "react-router-dom";
export default function Note() {
  return (
    <>
      <Col $fullh padding={"0 80px"} gap={"52px"}>
        <Col gap={"16px"}>
          <BlueBox>
            <Col gap={"26px"}>
              <Link to="/">
                <Row gap={"4px"} align={"center"}>
                  <SvgContainer
                    width={"24px"}
                    height={"24px"}
                    color={"--gray7"}
                  >
                    <ArrowBack />
                  </SvgContainer>
                  <Heading color={"--gray7"} $bold>
                    Back to Home
                  </Heading>
                </Row>
              </Link>

              <Display $bold color={"--labels-primary"}>
                Roadmap for Web programming
              </Display>
            </Col>
          </BlueBox>
          <BlueBox>
            <Row gap={"16px"} align={"center"}>
              <SvgContainer width={"24px"} height={"24px"} $fill={"--primary6"}>
                <Info />
              </SvgContainer>
              <Heading color={"--primary5"} $bold>
                AI will scan your note and check whether if there is an error in
                your summary.
              </Heading>
            </Row>
          </BlueBox>
        </Col>
        <Col gap={"16px"} style={{ flex: 1 }}>
          <Display style={{ padding: "0px 24px" }} color={"--labels-primary"}>
            Note
          </Display>
          <Memo />
        </Col>
      </Col>
    </>
  );
}

const BlueBox = styled.div`
  border-radius: 10px;
  border: 2px solid var(--primary2);
  background: #ebebf9;
  padding: 24px;
`;

const Memo = styled.textarea`
  flex: 1;
  margin-bottom: 24px;

  border-radius: 10px;
  border: 2px solid var(--primary2);
  background: var(--white);
  padding: 46px;

  font-size: 24px;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.72px;
  font-weight: 600;

  outline: none;

  resize: none;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary2);
    border-radius: 10px;
  }
`;
