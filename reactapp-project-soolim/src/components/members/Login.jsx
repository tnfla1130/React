import { useRef, useState } from 'react';
import {firestore} from '../../firebase/firestoreConfig';
import { doc,setDoc,getDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Login(props) {

  const navigate = useNavigate();
  const [inputId, setInputID] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [idMessage, setIdMessage] = useState('');

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
    console.log(document.cookie);
  };

  const handleLogin = async (e) => {
  e.preventDefault(); // form 기본 제출 방지

  try {
    const docRef = doc(firestore, "members", inputId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      setIdMessage("존재하지 않는 아이디입니다.");
      return;
    }

    const userData = docSnap.data();
    if (userData.pass === inputPass) {
      // setIdMessage("로그인 성공!");
      alert(`${inputId} 님 반갑습니다~!`);
      setCookie("loginId", inputId, 1);
      console.log("로그인 성공");
      navigate("/")
      window.location.reload()
    } else {
      setIdMessage("비밀번호가 일치하지 않습니다.");
      console.log("비밀번호 틀림");
    }
  } catch (error) {
    console.error("로그인 중 오류:", error);
    setIdMessage("로그인 중 오류가 발생했습니다.");
  }
};

  return(<>
  
  <form className="login-form bg-white p-4 shadow rounded" onSubmit={handleLogin}>
    <h2 className="text-center text-danger mb-4">로그인</h2>
    <table className="w-100">
      <tbody>
        <tr>
          <td className="pe-2">
            <label htmlFor="userId" className="form-label">아이디</label>
          </td>
          <td>
            <input type="text" id="userId" name="userId" className="form-control"
              value={inputId} required
              onChange={(e)=>{setInputID(e.target.value);
                              setIdMessage('');}}/>
          </td>
        </tr>
        <tr>
          <td className="pe-2 pt-3">
            <label htmlFor="password" className="form-label">비밀번호</label>
          </td>
          <td className="pt-3">
            <input type="password" id="password" name="password" className="form-control"
              value={inputPass} required
              onChange={(e)=>{setInputPass(e.target.value);
                              setIdMessage('');}}/>
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="pt-4">
            <div>{idMessage}</div>
            <button type="submit" className="btn btn-danger w-100" >로그인</button>
            
          </td>
        </tr>
      </tbody>
    </table>
  </form>

  </>)
}
export default Login;