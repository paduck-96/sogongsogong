import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:""
    })

    const onChangeHandler = (e) => {
        const newLoginInfo = {
                    ...loginInfo,
                    [e.target.name] : e.target.value
                };
                setLoginInfo(newLoginInfo);
            }

    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
                const response = await fetch("http://localhost/login", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    //credentials:"include",
                    body:JSON.stringify({
                        email:loginInfo.email,
                        password:loginInfo.password,
                    })
                })
                .then(res=>res.json());
                if(response.result!=="success"){
                    alert("이메일 혹은 비밀번호 오류입니다")
                }else{
                    if(response.result==="success"){
                        localStorage.setItem("token", response.data);
                        localStorage.setItem("userId", response.userId)
                        const remainTime = 60 * 60 * 1000;
                        const expireDate = new Date(new Date().getTime()+remainTime)
                        localStorage.setItem("expireDate", expireDate.toISOString());
                        return navigate("/", {replace:true})
                    }
                }
    }
    
    return (
        <div>
            <h2 className="text-3xl font-bold underline">로그인</h2>
                <form method="post" onSubmit={onSubmitHandler}>
                    <label>이메일 :
                        <input type="email" name='email' value={loginInfo.email} onChange={onChangeHandler} />
                    </label>
                    <br/>
                    <label>비밀번호 :
                        <input type="password" name='password'  value={loginInfo.password} onChange={onChangeHandler}/><br></br>
                    </label>
                    <button type='submit'>로그인</button>
                </form>
        </div>
    );
};

export default LoginPage;