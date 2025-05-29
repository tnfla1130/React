import { useState } from "react";

function ModalEdit(props) {
  console.log(props.boardData);
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const [editIdx, setEditIdx] = useState(null); // 수정 중인 댓글 ID
  const [writer, setWriter] = useState(props.boardData.writer);
  const [content, setContent] = useState(props.content);
  

  const handleEditComment = () => {
    const updated = boardData.map(item => {
      if (item.idx === editIdx) {
        return {
          ...item,
          writer,
          content,
          postdate: new Date().toISOString().slice(0, 10)
        };
      }
      return item;
    });

    setBoardData(updated);       // 댓글 목록 업데이트
    setEditIdx(null);            // 수정 상태 초기화
    setWriter('');               // 입력 필드 초기화
    setContent('');
};


  return (<>
    {/* 댓글 작성 Modal */}
    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="commentModalLabel">댓글 수정</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {/* 작성자명 입력 상자 추가 */}
                    <div className="mb-3">
                        <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                        <input type="text" className="form-control" id="commentAuthor"
                        value={writer} onChange={(e) => setWriter(e.target.value)}/>
                    </div>
                    {/* 댓글 입력 상자 */}
                    <label htmlFor="commentContent" className="form-label">댓글 내용</label>
                    <textarea className="form-control" id="commentContent" rows="3" 
                    value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" className="btn btn-primary" 
                        onClick={handleEditComment}>수정</button>
                </div>
            </div>
        </div>
    </div>
    
  </>); 
}

export default ModalEdit;