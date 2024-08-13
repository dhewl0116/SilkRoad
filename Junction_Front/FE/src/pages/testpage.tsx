import { useState, useRef, useEffect } from "react";
import RoadmapList from "../components/roadmaplist";
import TopicList from "../components/topiclist";
import styled from "styled-components";
import { TopicData } from "../types/type";
import Modal from "../components/modal";
import { Link, useParams } from "react-router-dom";
import { Col, Row, SvgContainer } from "../components/atomic";
import { Heading, Display } from "../components/Typo";
import Info from "@material-symbols/svg-300/rounded/info.svg?react";
import ArrowBack from "@material-symbols/svg-300/rounded/arrow_back.svg?react";
import { getRoadMapData } from "../lib/api/gpt";

const PageContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 0 80px;
  outline: none;
  margin-bottom: 24px;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const RoadmapContainer = styled.div`
  flex: 0 0 auto;
`;

const TopicListContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const TopicListWrapper = styled.div`
  position: absolute;
  pointer-events: auto;
`;

const BlueBox = styled.div`
  border-radius: 10px;
  border: 2px solid var(--primary2);
  background: #ebebf9;
  padding: 24px;
`;

export default function TestPage() {
  const id = useParams().id;
  const [roadmap, setRoadmap] = useState([]);
  useEffect(() => {
    getRoadMapData({ id }).then((res) => {
      setRoadmap(res.roadmap);
    });
  }, [id]);

  const [selectedRoadmapIndex, setSelectedRoadmapIndex] = useState<
    number | null
  >(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const topicListRef = useRef<HTMLDivElement | null>(null);
  const roadmapItemRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleRoadmapClick = (index: number) => {
    setSelectedRoadmapIndex(index);
    setSelectedTopic(null);
  };

  const handleTopicClick = (topic: TopicData) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  useEffect(() => {
    if (
      selectedRoadmapIndex !== null &&
      roadmapItemRef.current[selectedRoadmapIndex] &&
      topicListRef.current &&
      containerRef.current
    ) {
      const roadmapItemRect =
        roadmapItemRef.current[selectedRoadmapIndex].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      if (topicListRef.current) {
        const topicListElement = topicListRef.current;

        const relativeTop = roadmapItemRect.top - containerRect.top;
        const relativeLeft = roadmapItemRect.right - containerRect.left;

        topicListElement.style.top = `${relativeTop}px`;
        topicListElement.style.left = `${relativeLeft + 20}px`; // 20px 간격 추가
      }
    }
  }, [selectedRoadmapIndex]);

  return (
    <PageContainer>
      <Col $fullh gap={"52px"}>
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
                {id ?? "Loading..."}
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
        <Content ref={containerRef}>
          <RoadmapContainer>
            <RoadmapList
              topic={id}
              roadmap={roadmap}
              onRoadmapClick={handleRoadmapClick}
              selectedRoadmap={selectedRoadmapIndex}
              roadmapItemRef={roadmapItemRef}
            />
          </RoadmapContainer>
          <TopicListContainer>
            {selectedRoadmapIndex !== null && (
              <TopicListWrapper ref={topicListRef}>
                <TopicList
                  topics={roadmap[selectedRoadmapIndex].topics}
                  onTopicClick={handleTopicClick}
                />
              </TopicListWrapper>
            )}
          </TopicListContainer>
        </Content>
      </Col>
      {selectedTopic && (
        <Modal
          isOpen={Boolean(selectedTopic)}
          onClose={handleCloseModal}
          title={selectedTopic.title}
          description={selectedTopic.description}
          learningGoals={selectedTopic.learning_goals}
          recommendations={selectedTopic.recommendations}
          latestTrends={selectedTopic.latest_trends}
          projects={selectedTopic.projects}
          subject={id}
          topic={roadmap[selectedRoadmapIndex].title}
          concept={selectedTopic.title}
        />
      )}
    </PageContainer>
  );
}
