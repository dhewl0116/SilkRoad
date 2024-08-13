import { Row, SvgContainer } from "../atomic";
import ViewSidebar from "@material-symbols/svg-300/rounded/view_sidebar.svg?react";
import Logo from "../../assets/silkroad.png";
import { Heading, Title } from "../Typo";
import useStore from "../../store";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import QuizIcon from "@material-symbols/svg-300/rounded/quiz.svg?react";
import useUser, { logout } from "../../lib/hooks/useUser";
import { Link } from "react-router-dom";
export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useStore();
  const location = useLocation();

  const { user } = useUser();
  const handleLogin = () => {
    window.location.href = `http://localhost:3000/auth/google`;
  };
  return (
    <>
      <Row gap={"20px"} padding={"24px 62px"} $fullw align={"center"}>
        {location.pathname === "/quiz" ? (
          <>
            <SvgContainer width={"32px"} height={"32px"} $fill={"#1C1B1F"}>
              <QuizIcon />
            </SvgContainer>
            <Title $bold color={"--black"}>
              Quiz
            </Title>
          </>
        ) : (
          <>
            {!sidebarOpen && (
              <>
                <SvgContainer
                  width={"32px"}
                  height={"32px"}
                  $fill={"#1C1B1F"}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSidebarOpen(true)}
                >
                  <ViewSidebar />
                </SvgContainer>
              </>
            )}
            <Link
              to="/"
              style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              <img
                src={Logo}
                width={120}
                height={60}
                alt="실크로드 로고"
                style={{ marginLeft: 0 }}
              />
            </Link>

            {!user ? (
              <>
                <Heading
                  color={"--primary5"}
                  onClick={() => handleLogin()}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </Heading>
              </>
            ) : (
              <>
                <Heading
                  color={"--black"}
                  style={{ cursor: "pointer" }}
                  onClick={() => logout()}
                >
                  {user.data.name}
                </Heading>
              </>
            )}
          </>
        )}
      </Row>
    </>
  );
}
