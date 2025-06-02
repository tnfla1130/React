import { useState, useEffect } from 'react';
import { firestore } from '../../../firebase/firestoreConfig';
import {doc,setDoc,getDoc,collection,getDocs,query,orderBy,addDoc,updateDoc,deleteDoc,Timestamp} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firestoreConfig"; // 또는 storageConfig


function RefWrite() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = "";

    try {
      // 파일이 있을 경우 Firebase Storage에 업로드
      if (file) {
        const storageRef = ref(storage, `files/${file.name}_${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(firestore, "RefBoard"), {
        title,
        writer,
        content,
        regdate: Timestamp.now().toDate().toLocaleDateString(),
        fileUrl,
      });

      alert("글이 등록되었습니다!");
      navigate("/ref");
    } catch (error) {
      console.error("글 등록 에러:", error);
      alert("글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="board-wrapper">
      <div className="board-container">
        <h2 style={{ color: "#e0848e", marginBottom: "20px" }}>자료 글쓰기</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <table>
            <tbody>
              <tr>
                <td>제목</td>
                <td>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input
                    type="text"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>내용</td>
                <td>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      fontFamily: "inherit",
                    }}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>첨부파일</td>
                <td>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="submit-btn">등록</button>
        </form>
      </div>
    </div>
  );
}

export default RefWrite;
