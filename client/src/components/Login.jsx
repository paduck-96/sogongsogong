import React, { useState } from 'react';

const LoginPage = () => {
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
                    body:JSON.stringify({
                        email:loginInfo.email,
                        password:loginInfo.password,
                    })
                }).then(res=>res.json())
                alert(response.result);
    }
    
    return (
        <div>
            <h2 cclassName="text-3xl font-bold underline">로그인</h2>
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