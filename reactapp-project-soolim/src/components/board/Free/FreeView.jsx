function FreeView({ post, closeModal, openEdit, deletePost }) {
  if(!post) return null;
  return (<>
    <div className="modal-backdrop">
    <div className="modal-form">
      <h3>글 보기</h3>
      <form>
        <input type="text" name="title" value={post.title} className="modal-title" required readOnly />
        <textarea name="content" value={post.content} rows="5" className="modal-textarea" required readOnly />

        <div className="modal-buttons">
          <button type="button" onClick={() => {openEdit(); }} className="modal-edit">수정</button>
          <button type="button" onClick={() => deletePost(post.docId)} className="modal-edit">삭제</button>
          <button type="button" onClick={closeModal} className="modal-cancel">취소</button>
        </div>
      </form>
    </div>
    </div>
  </>); 
}
export default FreeView;