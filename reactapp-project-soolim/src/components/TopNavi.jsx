import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 쿠키 가져오기 함수
const getCookie = (name) => {
  const values = document.cookie.split(";");
  for (let i = 0; i < values.length; i++) {
    // 쿠키는 "key=value" 형식으로 저장되며, 여러 개는 ;로 구분
    const [key, val] = values[i].trim().split("=");
    console.log('key,val',key, val);
    // decodeURIComponent는 URL 인코딩된 값을 원래 문자열로 복원
    if (key === name) return decodeURIComponent(val);
  }
  return null;
};

// 쿠키 삭제 함수
const deleteCookie = (name) => {
  //만료 시간을 과거로 설정해서 브라우저가 해당 쿠키를 제거하도록 유도
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

function TopNavi() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginId = getCookie("loginId");
    //boolean으로 만들기위해 느낌표 사용
    setIsLoggedIn(!!loginId);
  }, []);

  const handleLogout = () => {
    deleteCookie("loginId");
    alert("로그아웃 되었습니다.");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <a className="navbar-brand" href="#!">Start Bootstrap</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>

              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink to="/SignupForm" className="nav-link">SignUp</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Login" className="nav-link">Login</NavLink>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link btn btn-link text-white" style={{ textDecoration: 'none' }}>
                      Logout
                    </button>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Edit" className="nav-link">Edit Profile</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNavi;
