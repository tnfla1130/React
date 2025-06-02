import { useState } from 'react';
import { firestore } from '../../../firebase/firestoreConfig';
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';

function FreeWrite({ id, idx, setIdx, setPosts, fetchPosts, closeModal }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const Write = async (f_title, f_content) => {
    await addDoc(collection(firestore, 'FreeBoard'), {
      idx: idx,
      id: id,
      title: f_title,
      content: f_content,
      regdate: nowDateTime(),
    });
    console.log('입력 성공');
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력하세요");
      return;
    }

    await Write(title, content);
    
    alert('글이 등록되었습니다!');
    setTitle('');
    setContent('');
    await fetchPosts();
    closeModal(); // props로 받은 함수
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-form">
        <h3>글 작성</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목"
            name="title"
            className="modal-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="내용을 입력하세요"
            name="content"
            rows="5"
            className="modal-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="modal-submit">등록</button>
            <button type="button" onClick={closeModal} className="modal-cancel">취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FreeWrite;
