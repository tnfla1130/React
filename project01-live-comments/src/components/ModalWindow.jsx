import { useState } from "react";

function ModalWindow(props) {
    const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  const handleAddComment = () => {
    const newComment = {
      idx: boardData.length + 1,
      writer,
      content,
      postdate: new Date().toISOString().slice(0, 10),
      likes: 0
    };

    setBoardData([...boardData, newComment]);

    // 모달 닫기 (부트스트랩 모달 수동으로 닫기)
    const modalEl = document.getElementById('commentModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();

    // 입력 초기화
    setWriter('');
    setContent('');
  };

  return (<>
    {/* 댓글 작성 Modal */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
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
                        onClick={handleAddComment}>작성</button>
                </div>
            </div>
        </div>
    </div>
    
  </>); 
}

export default ModalWindow;