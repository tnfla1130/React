import SignupForm from "./components/members/SignupForm"
import {Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import TopNavi from './components/TopNavi';
import Login from './components/members/Login';
import Edit from './components/members/Edit';
import FreeBoard from "./components/board/FreeBoard";
import './index.css';


function App() {
  return (<>
      <TopNavi/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/SignupForm" element={<SignupForm/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Edit" element={<Edit/>}/>
      <Route path="/free" element={<FreeBoard/>}/>
     </Routes>
  </>)
}

export default App
