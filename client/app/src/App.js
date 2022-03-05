import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {DataProvider} from './GlobalState'
import Header from "./components/headers/Header";
import MainPages from './components/mainpages/Pages'



function App() {
  return (
    <DataProvider>
      <div className="Ap">
        <Router>
          <Header />
          <MainPages/>
					
        </Router>
      </div>
    </DataProvider>
  );
	
}

export default App;
