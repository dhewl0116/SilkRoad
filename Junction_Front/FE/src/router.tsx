import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import TestPage from "./pages/testpage";
import Home from "./pages/Index";
import { Col } from "./components/atomic";
import Header from "./components/home/Header";
import Quiz from "./pages/quiz";
import Note from "./pages/note";
import Callback from "./pages/callback";
import Sidebar from "./components/home/Sidebar";
import useStore from "./store";

const AddHeader = () => {
  const { sidebarOpen } = useStore();

  return (
    <>
      <Sidebar $open={sidebarOpen} />

      <Col $fullw $fullh style={{ flex: 1 }}>
        <Header />
        <Outlet />
      </Col>
    </>
  );
};

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AddHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/map/:id" element={<TestPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/note" element={<Note />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
