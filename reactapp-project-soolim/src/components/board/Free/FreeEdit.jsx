function FreeEdit(props) {
  return (<>
    
    <div className="modal-backdrop">
      <div className="modal-form">
        <h3>글 작성</h3>
        <form >
          <input type="text" placeholder="제목" name="title" className="modal-title" required />
          <textarea placeholder="내용을 입력하세요" name="content" rows="5" className="modal-textarea" required />
          <div className="modal-buttons">
            <button type="submit" className="modal-submit">등록</button>
            <button type="button" onCkose className="modal-cancel">취소</button>
          </div>
        </form>
      </div>
    </div>
      
  </>); 
}
export default FreeEdit;