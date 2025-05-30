import { useState, useEffect } from 'react';
import { firestore } from '../../../firebase/firestoreConfig';
import {doc,setDoc,getDoc,collection,getDocs,query,orderBy,addDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const FreeBoard = () => {
  const navigate = useNavigate();

  // 로그인 쿠키 가져오기
  const getCookie = (name) => {
    const values = document.cookie.split(";");
    for (let i = 0; i < values.length; i++) {
      const [key, val] = values[i].trim().split("=");
      if (key === name) return decodeURIComponent(val);
    }
    return null;
  };

  // 날짜 + 시간 형식 반환
  const nowDateTime = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  };

  const [id, setId] = useState('');
  const [idx, setIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [posts, setPosts] = useState([]);

  // 글쓰기 모달 제어
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // 글 작성 함수
  const Write = async (f_title, f_content) => {
    await addDoc(collection(firestore, 'FreeBoard'), {
      idx:idx,
      id: id,
      title: f_title,
      content: f_content,
      regdate: nowDateTime(),
    });
    console.log('입력 성공');
  };

  // Firestore에서 글 목록 가져오기
  const fetchPosts = async () => {
    const q = query(collection(firestore, 'FreeBoard'), orderBy('regdate', 'desc'));
    const querySnapshot = await getDocs(q);
    const postsArray = querySnapshot.docs.map((doc, idx) => ({
      id: doc.id,
      ...doc.data(),
      idx: idx + 1,
    }));
    setIdx(idx+1);
    setPosts(postsArray);
  };

  // 페이지 로드시 로그인 체크 + 글 목록 가져오기
  useEffect(() => {
    const loginId = getCookie("loginId");
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
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
    };

    fetchUserData();
    fetchPosts();
  }, [navigate]);

  // 글 작성 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleValue = e.target.title.value.trim();
    const contentValue = e.target.content.value.trim();

    if (!titleValue) {
      alert("제목을 입력하세요");
      return;
    }
    if (!contentValue) {
      alert("내용을 입력하세요");
      return;
    }

    const currentTime = nowDateTime();
    setDate(currentTime);

    await Write(titleValue, contentValue);
    fetchPosts(); // 글 작성 후 목록 다시 불러오기

    alert('글이 등록되었습니다!');
    setTitle('');
    setContent('');
    closeModal();
  };

  return (
    <div className="board-wrapper">
      <div className="board-container">
        <div className="board-header">
          <h2>자유게시판</h2>
          <button className="write-btn" onClick={openModal}>글 작성</button>
        </div>

        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.idx}</td>
                <td>{post.title}</td>
                <td>{post.id}</td>
                <td>{post.regdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 글쓰기 모달 */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-form">
            <h3>글 작성</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="제목" name="title" className="modal-title" required />
              <textarea placeholder="내용을 입력하세요" name="content" rows="5" className="modal-textarea" required />
              <div className="modal-buttons">
                <button type="submit" className="modal-submit">등록</button>
                <button type="button" onClick={closeModal} className="modal-cancel">취소</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeBoard;
