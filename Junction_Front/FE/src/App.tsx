import { Col, Row } from "./components/atomic";
import Sidebar from "./components/home/Sidebar";
import AppRouter from "./router";
import useStore from "./store";
function App() {
  return (
    <>
      <Row $fullw $fullh>
        <AppRouter />
      </Row>
    </>
  );
}

export default App;
