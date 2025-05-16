import { Link } from 'react-router-dom';

function NotFound(){
  return(
    <div>
      <h2>Not found</h2>
      <p>
        페이지를 찾을 수 없습니다. <br />
        <Link to='/'>HOME</Link>
      </p>
    </div>
  );
}

export default NotFound;
