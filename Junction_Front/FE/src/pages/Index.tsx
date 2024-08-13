import styled from "styled-components";
import { Col, Row, SvgContainer } from "../components/atomic";
import Header from "../components/home/Header";
import { Body, Heading, Title } from "../components/Typo";
import Arrow from "@material-symbols/svg-300/sharp/arrow_forward.svg?react";
import Logo from "../assets/silkroad.png";
import useUser from "../lib/hooks/useUser";
import { getCurrentUser } from "../lib/api/user";
import { makeTopic } from "../lib/api/gpt";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useNavigation } from "react-router-dom";

export default function Home() {
  const [topic, setTopic] = useState<string>("");

  const router = useNavigate();

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    toast.loading("generating...");
    const temp: string = topic;
    setTopic("");
    makeTopic({ topic }).then(() => {
      toast.dismiss();
      toast.success("Roadmap generated...!");
      router("/map/" + temp);
    });
  };
  return (
    <>
      <Container>
        <Col
          gap={"64px"}
          padding={"64px"}
          $fullh
          style={{ flexDirection: "column-reverse" }}
        >
          <InputContainer onSubmit={handleSubmit}>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
            <InputIcon
              onClick={() => handleSubmit()}
              style={{ cursor: "pointer" }}
            >
              <SvgContainer $fill={"--white"} width={"16px"} height={"16px"}>
                <Arrow />
              </SvgContainer>
            </InputIcon>
          </InputContainer>
          <Col gap={"8px"}>
            <Title $bold color={"--black"}>
              What do you want to learn today?
            </Title>
            <Body color={"--gray4"}>
              We’ll make you a roadmap for you to learn what you want to learn.
            </Body>
          </Col>
          <Col gap={"12px"}>
            <Heading color={"--gray3"}>Example questions for you</Heading>
            <Row gap={"20px"} $flexAll>
              <SuggestBox>
                <Heading color={"--gray3"}>“I want to learn</Heading>
                <Heading color={"--primary3"}>&nbsp;React Native</Heading>
                <Heading color={"--gray3"}>”</Heading>
              </SuggestBox>
              <SuggestBox>
                <Heading color={"--gray3"}>“I want to learn</Heading>
                <Heading color={"--primary3"}>&nbsp;House Building</Heading>
                <Heading color={"--gray3"}>”</Heading>
              </SuggestBox>
              <SuggestBox>
                <Heading color={"--gray3"}>“I want to learn</Heading>
                <Heading color={"--primary3"}>&nbsp;Graphic Design</Heading>
                <Heading color={"--gray3"}>”</Heading>
              </SuggestBox>
            </Row>
          </Col>
        </Col>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.form`
  position: relative;
  width: 100%;
  height: 60px;
`;
const InputIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 10px;
  width: 40px;
  height: 40px;
  padding: 12px;
  border-radius: 12px;
  background-color: var(--primary4);
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px 24px;
  padding-right: 50px;
  outline: none;
  border: none;
  background-color: var(--primary1);
  border-radius: 12px;
`;

const SuggestBox = styled.div`
  padding: 28px 20px;
  border-radius: 12px;
  border: 1px solid var(--primary2);
  background: var(--white);
  display: inline-block;
  & > div {
    display: inline-block;
  }
`;

const ImageContainer = styled.div`
  & > img {
    width: auto;
    height: 20%;
  }
`;
