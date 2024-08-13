// Typo 타입 정의
export interface TypoProps {
  color?: string;
  margin?: string;
  $bold?: boolean;
  $underline?: boolean;
}

export interface TopicData {
  title: string;
  description: string;
  learning_goals: string[];
  recommendations: string[];
  latest_trends: string[];
  projects: string[];
}

export interface RoadmapData {
  title: string;
  description: string;
  topics: TopicData[];
}
