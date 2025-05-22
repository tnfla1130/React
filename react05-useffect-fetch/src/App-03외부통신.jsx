import './App.css';
import React, {useState, useEffect} from 'react';

function MyCommunication(props){
  /** 외부 서버의 API를 얻어오기 위해 State를 생성한다. 초기값은
  JSON의 포맷에 따라 달라질 수 있으므로 확인 후 설정한다. 
   */
  var [myJSON, setmyJSON] = useState({results:[]});  
  
  //해당 UI의 렌더링이 끝난 후 API의 정보를 얻어온다. 
  useEffect(function(){
    //API 서버에서 10명의 정보를 JSON으로 콜백받는다. 
    fetch("https://api.randomuser.me?results=10")
      .then((result)=>{
        //console.log(result);
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        //콜백데이터를 통해 State를 변경한다. 
        setmyJSON(json);
      });
    return ()=>{
      console.log('#Life','useEffect실행==>컴포넌트 언마운트');
    }
  }, []);
  /** 두번째 인자인 의존성배열에 빈 배열을 설정했으므로, 최초 한번만
  실행된다. 이부분의 설정이 없으면 무한루프에 빠지게된다. 
   */

  let trTag = [];
  //결과데이터의 갯수만큼 <tr>태그를 생성한다. 
  for(let i=0 ; i<myJSON.results.length ; i++){
    let data = myJSON.results[i];
    trTag.push(
      <tr key={data.login.md5}>
        <td><img src={data.picture.thumbnail} alt={data.login.username} /></td>
        <td><a href='/' onClick={(e)=>{
            e.preventDefault();
            /* 아이디를 클릭하면 Props로 전달된 함수를 통해 현재 루프의 
            객체를 그대로 인자로 전달한다. */
            props.onProfile(data);
          }}>{data.login.username}</a>
        </td>
        <td>{data.name.title} {data.name.first} {data.name.last}</td>
        <td>{data.nat}</td>
        <td>{data.email}</td>
      </tr>
    );
  }
  //UI를 렌더링한다. 
  return (
    <div>
       <table border='1'>
        <thead>
          <tr>
            <th>사진</th>
            <th>로그인</th>
            <th>이름</th>
            <th>국가</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{trTag}</tbody>
       </table>
    </div>
  );
}

function App() {
  return (<>
      <h2>React - 외부서버통신</h2>
      {/* 링크를 클릭하면 정보를 파싱한 문자열을 alert로 출력한다. */}
      <MyCommunication onProfile={(sData)=>{
        console.log(sData);
        /** 정보 출력을 위한 문자열은 백틱 기호를 이용해서 +기호없이
        연결할 수 있다. */
        let info = `전화번호:${sData.cell}
성별:${sData.gender}
username:${sData.login.username}
password:${sData.login.password}`;
        alert(info);
      }}></MyCommunication>
  </>);
}

export default App;
