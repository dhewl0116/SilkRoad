import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Body, Display, Heading, Label, Title, Typo } from "./Typo";
import { Blank } from "./container";
import Closearrow from "@material-symbols/svg-300/sharp/arrow_back_ios_new.svg?react";
import { Col, Row, SvgContainer } from "./atomic";
import { recallMemo, saveMemo, submitMemo } from "../lib/api/memo";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  learningGoals: string[];
  recommendations: string[];
  latestTrends: string[];
  projects: string[];

  subject: string;
  topic: string;
  concept: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean; closing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ isOpen, closing }) =>
    isOpen || closing ? (closing ? 0 : 1) : 0};
  visibility: ${({ isOpen, closing }) =>
    isOpen || closing ? "visible" : "hidden"};
  transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    visibility 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  animation: ${({ isOpen, closing }) =>
    isOpen
      ? closing
        ? css`
            ${fadeOut} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)
          `
        : css`
            ${fadeIn} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)
          `
      : "none"};
`;

const ModalContent = styled.div<{ isOpen: boolean; closing: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  background: var(--white);
  padding: 60px;
  width: 60%;
  height: 100%;
  z-index: 1001;
  overflow-y: auto;
  box-shadow: -10px 0 25px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen, closing }) =>
    isOpen
      ? closing
        ? "translateX(100%)"
        : "translateX(0)"
      : "translateX(100%)"};
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  animation: ${({ isOpen, closing }) =>
    isOpen
      ? closing
        ? css`
            ${slideOut} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)
          `
        : css`
            ${slideIn} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)
          `
      : "none"};
`;

const ModalCloseButton = styled.button`
  position: absolute;
  left: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  learningGoals,
  recommendations,
  latestTrends,
  projects,
  subject,
  topic,
  concept,
}) => {
  const [closing, setClosing] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement | null>(null);
  const [note, setNote] = useState("");

  const [noteInfo, setNoteInfo] = useState(null);

  useEffect(() => {
    recallMemo({ subject, topic, concept }).then((res) => {
      setNote(res.data);
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setClosing(true);
      const timer = setTimeout(() => {
        onClose();
        setClosing(false);
      }, 300); // Match this duration with the animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = () => {
      noteRef.current?.scrollIntoView({ behavior: "smooth" });
      noteRef.current?.focus();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!isOpen && closing) {
    return null;
  }

  return (
    <ModalOverlay
      isOpen={isOpen}
      closing={closing}
      onClick={() => {
        if (isOpen) {
          setClosing(true);
          const timer = setTimeout(() => {
            onClose();
            setClosing(false);
          }, 300); // Match this duration with the animation duration
          return () => clearTimeout(timer);
        }
      }}
    >
      <ModalContent
        isOpen={isOpen}
        closing={closing}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalCloseButton
          onClick={() => {
            setClosing(true);
            const timer = setTimeout(() => {
              onClose();
              setClosing(false);
            }, 300); // Match this duration with the animation duration
            return () => clearTimeout(timer);
          }}
        >
          <SvgContainer width={"32px"} height={"32px"} $fill={"--black"}>
            <Closearrow style={{ rotate: "180deg" }} />
          </SvgContainer>
        </ModalCloseButton>
        <Col gap={"48px"}>
          <Col gap={"36px"}>
            <Title $bold>Recommended sites 🔗</Title>
            <Col gap={"24px"}>
              {recommendations.map((elm, index) => (
                <Body key={index}>
                  <a href={elm}>{elm}</a>
                </Body>
              ))}
            </Col>
          </Col>
          <Col gap={"36px"}>
            <Title $bold>Latest trends ✨</Title>
            <Col gap={"24px"}>
              {latestTrends.map((elm, index) => (
                <Body key={index}>
                  <a href={elm}>{elm}</a>
                </Body>
              ))}
            </Col>
          </Col>
          <Col gap={"36px"}>
            <Title $bold>Projects suggestions 👍</Title>
            <Col gap={"24px"}>
              {projects.map((elm, index) => (
                <Body key={index}>
                  <a href={elm}>{elm}</a>
                </Body>
              ))}
            </Col>
          </Col>
        </Col>
        <Blank height={"56px"} />
        <Col gap={"12px"}>
          <GrayLine />
          <Display color={"--labels-primary"}>Notes</Display>
          <GrayLine />
        </Col>
        <Blank height={"16px"} />
        <Note
          value={note}
          onChange={(e) => setNote(e.target.value)}
          ref={noteRef}
          placeholder="Press any key to start a note"
        />
        <Blank height={"16px"} />
        <Row gap={"8px"}>
          <SaveBtn
            onClick={() =>
              saveMemo({ subject, topic, concept, memo: note }).then(() => {
                toast.success("note saved");
              })
            }
          >
            <Body $bold style={{ color: "#242986" }}>
              Save
            </Body>
          </SaveBtn>
          <SubmitBtn
            onClick={() =>{
              toast.success(
                    "You have submitted your notes. Please wait for the results analysis..."
                  );
              submitMemo({ subject, topic, concept, memo: note }).then(
                (res) => {
                  setNoteInfo(res.data);
                  console.log(res.data);
                }
              )}
            }
          >
            <Body $bold color={"--white"}>
              Submit to AI ✨
            </Body>
          </SubmitBtn>
        </Row>

        <Blank height={"36px"} />
        {noteInfo && (
          <>
            <ScoreBox>
              <Col
                gap={"16px"}
                style={{
                  borderBottom: "2px solid var(--primary2)",
                  padding: "12px 24px",
                }}
              >
                <Heading $bold color={"--primary6"}>
                  Your comprehension score is
                </Heading>
                <Display color={"--labels-primary"}>
                  {noteInfo?.understanding}
                </Display>
              </Col>
              <Col gap={"32px"} padding={"12px 24px"}>
                {noteInfo?.errors?.map((elm, i) => {
                  console.log(elm, i)
                  return(
                  
                    <Col gap={"12px"}>
                      <Heading $bold color={"--negative"}>
                        Logical problem found #{i + 1}
                      </Heading>
                      <Body color={"--black"}>{elm.problem}</Body>
                    </Col>
                    
                  
                )}
                
                )}
                 {noteInfo?.comments?.map((elm, i) => {
                  console.log(elm, i)
                  return(
                  
                    <Col gap={"12px"}>
                      <Heading $bold color={"--positive"}>
                        Advise #{i + 1}
                      </Heading>
                      <Body color={"--black"}>{elm.advise}</Body>
                    </Col>
                    
                  
                )}
                
                )}
              </Col>
            </ScoreBox>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const GrayLine = styled.div`
  width: 100%;
  height: 2px;
  background: #d9d9d9;
`;

const Note = styled.textarea`
  resize: none;
  font-size: 20px;
  line-height: 28px; /* 140% */
  letter-spacing: -0.6px;
  font-weight: 400;

  outline: none;
  border: none;
  resize: none;

  width: 100%;
  height: 300px;

  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gray4);
    border-radius: 10px;
  }
  &::placeholder {
    color: var(--primary2);
  }
`;

const SaveBtn = styled.div`
  border-radius: 10px;
  border: 2px solid var(--Primary-200, #acafe5);
  background: #fcfbff;
  box-shadow: 0px 0px 14.6px 0px rgba(0, 0, 0, 0.1);
  width: 100px;
  height: 44px;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const SubmitBtn = styled.div`
  border-radius: 10px;
  background: #242986;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 12px 20px;
  white-space: nowrap;

  cursor: pointer;
`;

const ScoreBox = styled.div`
  border-radius: 10px;
  border: 2px solid var(--primary2);
  background: var(--white);
`;
