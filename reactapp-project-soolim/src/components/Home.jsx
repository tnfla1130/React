import TopNavi from "./TopNavi";
import { NavLink, useNavigate } from "react-router-dom";


function Footer(){
  return(<>
    <footer className="py-5 bg-dark">
      <div className="container px-4 px-lg-5"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
    </footer>
  </>)
}

function Comment(props) {
  return (<>
  <div className="row gx-4 gx-lg-5 align-items-center my-5">
    <div className="col-lg-7"><img className="img-fluid rounded mb-4 mb-lg-0" 
      src="/images/main.jpg" alt="main" /></div>
    <div className="col-lg-5">
      <h1 className="font-weight-light">Business Name or Tagline</h1>
      <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
      <a className="btn btn-primary" href="#!">Call to Action!</a>
    </div>
  </div>
  </>); 
}

function GoChatting() {
  return(<>
    <div className="card text-white bg-secondary my-5 py-4 text-center">
        <div className="card-body"><p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p></div>
    </div>
  </>)
}

function GoBoard() {
  return(<>
    <div className="row gx-4 gx-lg-5">
      <div className="col-md-4 mb-5">
        <div className="card h-100">
          <div className="card-body">
              <h2 className="card-title text-center">자유게시판</h2>
              {/* <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p> */}
          </div>
          <div className="card-footer">
                <NavLink to="/free" className="btn btn-primary btn-sm">Enter</NavLink>
          </div>
      </div>
    </div>
    <div className="col-md-4 mb-5">
        <div className="card h-100">
            <div className="card-body">
                <h2 className="card-title">Q&A</h2>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
            </div>
            <div className="card-footer">
              <NavLink to="/qna" className="btn btn-primary btn-sm">Enter</NavLink></div>
        </div>
    </div>
    <div className="col-md-4 mb-5">
        <div className="card h-100">
            <div className="card-body">
                <h2 className="card-title">Reference</h2>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
          </div>
          <div className="card-footer">
            <NavLink to="/ref" className="btn btn-primary btn-sm">Enter</NavLink></div>
        </div>
      </div>
    </div>
  </>)
}

function Home() {

  return (<>
    <div className="container px-4 px-lg-5">
      <Comment/>
      <GoChatting/>
      <GoBoard/>
    </div>
    <Footer/>
  </>)
}

export default Home;