import { useState, useEffect } from "react";
import { firestore } from '../../firebase/firestoreConfig';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

// 쿠키 가져오는 함수
const getCookie = (name) => {
  const values = document.cookie.split(";");
  for (let i = 0; i < values.length; i++) {
    const [key, val] = values[i].trim().split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return null;
};

function Edit(props) {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [num, setNum] = useState('');
  const [addr, setAddr] = useState('');

  // 수정 처리 함수
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    try {
      await setDoc(doc(firestore, 'members', id), {
        id,
        pass,
        name,
        email,
        num,
        addr,
      });
      alert("회원정보가 수정되었습니다.");
      navigate('/');
    } catch (error) {
      console.error('수정 실패:', error);
      alert("회원정보 수정에 실패했습니다.");
    }
  };

  // 로그인 쿠키 확인 후 회원 정보 불러오기
  useEffect(() => {
    const loginId = getCookie("loginId");
    console.log(loginId);
    if (!loginId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(firestore, 'members', loginId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setId(data.id);
          setPass(data.pass);
          setName(data.name);
          setEmail(data.email);
          setNum(data.num);
          setAddr(data.addr);
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <form className="edit-form" onSubmit={handleEditSubmit}>
      <h2>회원정보 수정</h2>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="userId">아이디</label></td>
            <td>
              <input type="text" id="userId" name="userId" value={id} readOnly />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="password">비밀번호</label></td>
            <td>
              <input
                type="password"
                id="password"
                name="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="변경 시 입력"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="name">이름</label></td>
            <td>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="email">이메일</label></td>
            <td>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="num">휴대전화번호</label></td>
            <td>
              <input
                type="text"
                id="num"
                name="num"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="addr">주소</label></td>
            <td>
              <input
                type="text"
                id="addr"
                name="addr"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <button type="submit" className="submit-btn">정보 수정</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default Edit;
