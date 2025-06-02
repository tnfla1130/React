import SignupForm from "./components/members/SignupForm"
import {Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import TopNavi from './components/TopNavi';
import Login from './components/members/Login';
import Edit from './components/members/Edit';
import FreeBoard from "./components/board/Free/FreeBoard";
// import QnABoard from "./components/board/QnA/QnABoard";
import RefBoard from "./components/board/Reference/RefBoard";
import RefView from "./components/board/Reference/RefView";
import RefWrite from "./components/board/Reference/RefWrite";
import './index.css';



function App() {
  return (<>
      <TopNavi/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/SignupForm" element={<SignupForm/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path="/free" element={<FreeBoard/>}/>
      {/* <Route path="/qna" element={<QnABoard/>}/> */}
      <Route path="/ref" element={<RefBoard/>}/>
      <Route path="/ref/:index" element={<RefView />} />
      <Route path="/ref/write" element={<RefWrite />} />
     </Routes>
  </>)
}

export default App
