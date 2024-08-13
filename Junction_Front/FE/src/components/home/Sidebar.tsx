import styled from "styled-components";
import ViewSidebar from "@material-symbols/svg-300/rounded/view_sidebar.svg?react";
import { Col, SvgContainer } from "../atomic";
import useStore from "../../store";
import { Body } from "../Typo";
import { useEffect, useState } from "react";
import { getRoadMap } from "../../lib/api/gpt";
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ $open }: { $open: boolean }) {
  const { sidebarOpen, setSidebarOpen } = useStore();

  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    getRoadMap().then((res) => {
      setData(res);
    });
  }, []);
  return (
    <>
      <Container $open={$open}>
        <SvgContainer
          width={"32px"}
          height={"32px"}
          $fill={"#1C1B1F"}
          style={{ cursor: "pointer" }}
          onClick={() => setSidebarOpen(false)}
        >
          <ViewSidebar />
        </SvgContainer>
        <div style={{ width: "100%", height: "52px" }} />
        <Col $fullw gap={"56px"}>
          <Col gap={"16px"}>
            <Body color={"--labels-primary"} $bold>
              Recent Searches
            </Body>
            <Col gap={"12px"}>
              {data.map((elm, i) => (
                <Link key={i} to={"/map/" + elm}>
                  <Body color={"--primary5"} style={{ cursor: "pointer" }}>
                    {elm}
                  </Body>
                </Link>
              ))}
            </Col>
          </Col>
          {/* <Col gap={"16px"}>
            <Body color={"--labels-primary"} $bold>
              This month
            </Body>
            <Col gap={"12px"}>
              <Body color={"--primary5"}>Graphic design</Body>
              <Body color={"--primary5"}>JavaScript</Body>
              <Body color={"--primary5"}>Graphic design</Body>
            </Col>
          </Col>
          <Col gap={"16px"}>
            <Body color={"--labels-primary"} $bold>
              Last month
            </Body>
            <Col gap={"12px"}>
              <Body color={"--primary5"}>Quadratic function</Body>
              <Body color={"--primary5"}>Calculus</Body>
            </Col>
          </Col> */}
        </Col>
      </Container>
    </>
  );
}

const Container = styled.div<{ $open: boolean }>`
  max-width: ${(p) => (p.$open ? "280px" : "0")};
  width: ${(p) => (p.$open ? "280px" : "0")};
  height: 100%;
  padding: ${(p) => (p.$open ? "36px" : "36px 0")};
  background-color: var(--primary1);
  opacity: ${(p) => (p.$open ? "1" : "0")};
  overflow: hidden;
  position: relative;

  transition: max-width 0.3s ease, width 0.3s ease, padding 0.3s ease,
    opacity 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary1);
    opacity: ${(p) => (p.$open ? "1" : "0")};
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  div {
    white-space: nowrap;
  }
`;
