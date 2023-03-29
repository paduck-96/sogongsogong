import React , {useState} from 'react';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerInfo, setRegisterInfo] = useState({
        nickname:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    
    const onChangeHandler = (e) => {
        const newRegisterInfo = {
            ...registerInfo,
            [e.target.name] : e.target.value
        };
        setRegisterInfo(newRegisterInfo);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(registerInfo.nickname.trim()==="" || registerInfo.email.trim()===""
        ||registerInfo.password.trim()===""||registerInfo.confirmPassword.trim()===""){
            alert("내용 입력 필수")
        }
        if(registerInfo.password.trim() !== registerInfo.confirmPassword.trim()){
            alert("비밀번호 재확인")
        }
        const response = await fetch("http://localhost/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                nickname:registerInfo.nickname,
                email:registerInfo.email,
                password:registerInfo.password,
                confirmPassword:registerInfo.confirmPassword
            })
        }).then(res=>res.json());
        if(response.result === "success") navigate("/", {replace:true})
    }
    return (
        <div>
            <form method="post" onSubmit={onSubmitHandler}>
                <label>
                    닉네임 :
                    <input type="text" name='nickname' value={registerInfo.nickname} onChange={onChangeHandler} />
                </label>
                <br />
                <label>
                    이메일 :
                    <input type="email" name='email' value={registerInfo.email} onChange={onChangeHandler} />
                </label>
                <br />
                <label>
                    비밀번호 :
                    <input type="password"  name='password' value={registerInfo.password} onChange={onChangeHandler} />
                    </label>
                    <label>
                    비밀번호 확인 :
                    <input type="password" name='confirmPassword' value={registerInfo.confirmPassword} onChange={onChangeHandler} />
                    </label>
                    <button type='submit'>회원가입</button>
            </form>
        </div>
    );
};

export default RegisterPage;