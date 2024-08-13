import React, { useState } from "react";
import styled from "styled-components";
import { Col, Row } from "../components/atomic";
import { Title } from "../components/Typo";

// 퀴즈 데이터 타입 정의
interface QuizData {
  question: string;
  options: string[];
  correctAnswer: number;
}

// 더미 퀴즈 데이터
const quizzes: QuizData[] = [
  {
    question:
      "Which of the components that make up the basic structure of HTML consist of a start tag and an end tag?",
    options: ["주석", "요소", "속성", "메타 태그"],
    correctAnswer: 1,
  },
  {
    question: "양말 2겹으로 신을 것 같은 사람",
    options: ["김진욱", "전지훈", "이지민", "이유비"],
    correctAnswer: 0,
  },
];

export default function Quiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const currentQuiz = quizzes[currentQuizIndex];
  const progress = ((currentQuizIndex + 1) / quizzes.length) * 100;

  const handleOptionClick = (index: number) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(index);
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    }
  };

  const getOptionStatus = (index: number): string => {
    if (!isAnswerChecked)
      return selectedAnswer === index ? "selected" : "normal";
    if (index === currentQuiz.correctAnswer) return "correct";
    if (index === selectedAnswer) return "incorrect";
    return "normal";
  };

  return (
    <Container>
      <ProgressBarWrapper>
        <ProgressBar>
          <ProgressFill style={{ width: `${progress}%` }} />
        </ProgressBar>
      </ProgressBarWrapper>
      <QuizContainer>
        <Col gap={"4vh"} padding={"0 16px"} align={"center"}>
          <Title $bold color={"--black"} style={{ fontSize: "2.5vmin" }}>
            {currentQuiz.question}
          </Title>
          <Col gap={"2vh"} width={"100%"}>
            <Row gap={"2vw"} style={{ flexWrap: "wrap" }}>
              {currentQuiz.options.map((option, index) => (
                <Option
                  key={index}
                  $status={getOptionStatus(index)}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </Option>
              ))}
            </Row>
          </Col>
          {!isAnswerChecked ? (
            <Button onClick={handleCheckAnswer}>정답 확인</Button>
          ) : (
            <Button onClick={handleNextQuiz}>다음 문제</Button>
          )}
        </Col>
      </QuizContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const ProgressBar = styled.div`
  width: 90%;
  height: 10px;
  background-color: var(--primary1);
  border-radius: 5px;
  margin: 0 auto;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--primary5);
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Option = styled.div<{ $status: string }>`
  flex: 1 1 calc(50% - 1vw);
  min-width: 150px;
  height: 10vh;
  border-radius: 12px;
  border: ${(p) =>
    p.$status === "correct"
      ? "5px solid var(--positive)"
      : p.$status === "incorrect"
      ? "5px solid var(--negative)"
      : p.$status === "selected"
      ? "2px solid var(--primary5)"
      : "2px solid var(--primary5)"};
  background: ${(p) =>
    p.$status === "selected"
      ? "var(--primary1)"
      : p.$status === "correct"
      ? "var(--positive-light)"
      : p.$status === "incorrect"
      ? "var(--negative-light)"
      : "var(--white)"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  font-size: 2vmin;
  cursor: pointer;

  @media (max-width: 600px) {
    flex: 1 1 100%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 2vmin;
  background-color: var(--primary5);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;
