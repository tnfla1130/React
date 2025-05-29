import { NavLink } from "react-router-dom";
import '../../public/css/styles.css'

function TopNavi(props) {
  return (<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <a className="navbar-brand" href="#!">Start Bootstrap</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <NavLink to="/" className="nav-link active" aria-current="page" href="#!">
              Home</NavLink>
          <NavLink to="/SignupForm" className="nav-link active" aria-current="page" href="#!">
              SignUp</NavLink>
          <NavLink to="/Login" className="nav-link active" aria-current="page" href="#!">
              Login</NavLink>
          <NavLink to="/Edit" className="nav-link active" aria-current="page" href="#!">
              Edit Profile</NavLink>
        </ul>
        </div>
      </div>
    </nav>
  </>); 
}
export default TopNavi;