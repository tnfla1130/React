import { useState, useEffect } from 'react';
import { firestore } from '../../../firebase/firestoreConfig';
import {doc,setDoc,getDoc,collection,getDocs,query,orderBy,addDoc,updateDoc,deleteDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import RefView from './RefView';
import { Routes, Route } from 'react-router-dom';
import RefWrite from './RefWrite';

function RefBoard(props) {

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
  const [showWriteModal, setShowWrtieModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Firestore에서 글 목록 가져오기
  const fetchPosts = async () => {
  const q = query(collection(firestore, 'RefBoard'), orderBy('regdate', 'desc'));
  const querySnapshot = await getDocs(q);
  const postsArray = querySnapshot.docs.map((docSnap, idx) => ({
  docId: docSnap.id ?? `${docSnap.data().id}_${idx}`, // 백업 key
  ...docSnap.data(),
  idx: idx + 1,
  }));
  setIdx(postsArray.length + 1);
  setPosts(postsArray);
};

  
  // 페이지 로드시 로그인 체크 + 글 목록 가져오기
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
          setContent(data.content);
          setTitle(data.title);
          console.log(data.content);
          console.log(data.title);
          console.log(data.id);
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
    };

    fetchUserData();
    fetchPosts();
  }, [navigate]);

  // 게시글 삭제 함수
  const deletePost = async (postId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const postRef = doc(firestore, 'RefBoard', postId);
      await deleteDoc(postRef);
      alert("삭제되었습니다.");
      fetchPosts(); // 목록 새로고침
      closeViewModal();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };
  return (<>
    <div className="board-wrapper">
      <div className="board-container">
        <div className="board-header">
          <h2>자료게시판</h2>
          <button className="write-btn" onClick={(e)=>{
            e.preventDefault();
            navigate('/ref/write')
          }}>자료 등록</button>
        </div>
        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>파일</th>
            </tr>
          </thead>
          <tbody>
          {posts.map((post, idx) => (
            <tr key={post.docId} onClick={() => navigate(`/ref/${idx}`)}>
              <td>{post.title}</td>
              <td>{post.writer}</td>
              <td>{post.regdate}</td>
              <td>{post.filename || "-"}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
    <Routes>
    <Route path="/write" element={<RefWrite/>} />
    <Route path=":index" element={
      <RefView posts={posts} onDelete={deletePost} />
    } />
    </Routes>
  </>); 
}
export default RefBoard;