import { useRef, useState } from 'react';
import {firestore} from '../../firebase/firestoreConfig';
import { doc,setDoc,getDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const memberWrite = async (m_id, m_pass, m_name,m_email, m_num, m_addr) => {
    try {
      await setDoc(doc(firestore, 'members', m_id), {
        id: m_id,
        pass: m_pass,
        name: m_name,
        email: m_email,
        num: m_num,
        addr: m_addr,
      });
      console.log('입력 성공');
      
    } catch (error) {
      console.error('입력 실패:', error);
    }
  };
  
  let isConfirm = false;
  const [emailDomain, setEmailDomain] = useState('');
  const [isDomainEditable, setIsDomainEditable] = useState(false);
  const navigate = useNavigate();


  const handleDomainChange = (e) => {
    const value = e.target.value;
    if (value === 'direct') {
      setEmailDomain('');
      setIsDomainEditable(true);
    } else {
      setEmailDomain(value);
      setIsDomainEditable(false);
    }
  };

  const handleSubmit = (event)=>{
  if(isConfirm){
    event.preventDefault();
  
    const form = event.target;
  
    const id = form.userId.value;
    const pass = form.password.value;
    const name = form.name.value;
    const email = `${form.emailId.value}@${form.emailDomain.value}`;
    const num = `${form.phone1.value}-${form.phone2.value}-${form.phone3.value}`;
    const addr = `${form.address1.value} ${form.address2.value}`;
  
    memberWrite(id, pass, name, email, num, addr);
    alert("로그인창으로 이동합니다.");
    navigate("/Login");
  }
  else{
    alert('아이디 중복확인을 해주세요');
  }
  };

  const [inputId, setInputID] = useState('');
  const [idMessage, setIdMessage] = useState('');

  const handleCheckId = async (inputId, setIdMessage) => {

    const docRef = doc(firestore, "members", inputId); // members 컬렉션의 문서 접근
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIdMessage("이미 존재하는 아이디입니다.");
    } else {
      setIdMessage("사용 가능한 아이디입니다.");
      isConfirm = true;
    }
    
  };

  const phone1Ref = useRef();
  const phone2Ref = useRef();
  const phone3Ref = useRef();

  const moveFocus = (e, maxLen, nextRef) => {
    if (e.target.value.length >= maxLen && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  const zoneCodeRef = useRef();
  const addressRef = useRef();

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 우편번호와 주소 세팅
        zoneCodeRef.current.value = data.zonecode;
        addressRef.current.value = data.address;
      },
    }).open();
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="userId">아이디</label></td>
            <td>
              <input type="text" id="userId" name="userId" value={inputId} required 
                onChange={(e)=>{setInputID(e.target.value);
                              setIdMessage('');}}/>
              <button type="button" onClick={()=>{handleCheckId(inputId,setIdMessage)}} >중복확인</button>
              <div>{idMessage}</div>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="password">비밀번호</label></td>
            <td><input type="password" id="password" name="password" required /></td>
          </tr>
          <tr>
            <td><label htmlFor="confirmPassword">비밀번호 확인</label></td>
            <td><input type="password" id="confirmPassword" name="confirmPassword" required /></td>
          </tr>
          <tr>
            <td><label htmlFor="name">이름</label></td>
            <td><input type="text" id="name" name="name" required /></td>
          </tr>
          <tr>
            <td><label htmlFor="email">이메일</label></td>
            <td>
              <input type="text" id="emailId" name="emailId" required /> @
              <input
                type="text"
                id="emailDomain"
                name="emailDomain"
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                readOnly={!isDomainEditable}
                required
              />
              <select id="domainSelect" onChange={handleDomainChange}>
                <option value="direct">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="phone1">휴대전화번호</label></td>
            <td>
            <input type="tel" id="phone1" name="phone1" maxLength="3" ref={phone1Ref}
              onChange={(e)=>moveFocus(e,3,phone2Ref)}/> -
            <input type="tel" id="phone2" name="phone2" maxLength="4" ref={phone2Ref}
              onChange={(e)=>moveFocus(e,4,phone3Ref)}/> -
            <input type="tel" id="phone3" name="phone3" maxLength="4" ref={phone3Ref} />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="zipcode">우편번호</label></td>
            <td>
              <input type="text" id="zipcode" name="zipcode" ref={zoneCodeRef} required />
              <button type="button" onClick={(e)=>handlePostcode()}>우편번호 검색</button>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="address1">기본주소</label></td>
            <td><input type="text" id="address1" name="address1" ref={addressRef} required /></td>
          </tr>
          <tr>
            <td><label htmlFor="address2">상세주소</label></td>
            <td><input type="text" id="address2" name="address2" required /></td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <button type="submit" className="submit-btn">회원가입</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};


export default SignupForm;
