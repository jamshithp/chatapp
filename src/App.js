import "./App.css";
import MainScreen from "./components/MainScreen";
import SingleChat from "./components/SingleChat";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const [mockData, setMockData] = useState([]);
  const [chatUpdated, setChatUpdated] = useState();

  const dataHandler = (chat) => {
    setChatUpdated(chat);
  };



  const baseUrl = "https://auth-d00f9-default-rtdb.firebaseio.com/mess.json";

  useEffect(async () => {
    const res = await axios.get(baseUrl);
    if (res.data) {
      setMockData(res.data);
    }
  }, [chatUpdated]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<MainScreen mockData={mockData} />} />
          <Route
            exact
            path="/:order"
            element={<SingleChat dataHandler={dataHandler} baseUrl={baseUrl} mockData={mockData}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
