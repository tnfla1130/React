// import Join from './components/Join';
import Chatting from "./components/chatting";
import Board from "./components/board";

function Home(props) {
  return(<>
  {/* 초기화면 */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <a className="navbar-brand" href="#!">Start Bootstrap</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
            <li className="nav-item"><a className="nav-link" href="#!">Services</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
  </>)
}

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
    <div className="col-lg-7"><img className="img-fluid rounded mb-4 mb-lg-0" src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" alt="..." /></div>
    <div className="col-lg-5">
      <h1 className="font-weight-light">Business Name or Tagline</h1>
      <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
      <a className="btn btn-primary" href="#!">Call to Action!</a>
    </div>
  </div>
  </>); 
}

function App() {

  return (<>
    <Home/>
    <div className="container px-4 px-lg-5">
      <Comment/>
      <Chatting/>
      {/* <Join/> */}
      <Board/>
    </div>
    <Footer/>
  </>)
}

export default App
