import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const [token, setToken] = useState(null)
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    },[token, setToken])
    if(token===null){
        return (
        <>
                    <div className='text-green5 text-3xl mb-96 flex-col items-center text-center'>
                        <div className='max-w-max bg-[rgba(113,205,14,0.3)] shadow-[0px_0px_24px_0px_rgba(113,205,14)] mb-12 mx-auto'>
                                <Link to='/login'>로그인 / </Link>
                                <Link to='/register'>회원가입</Link>
                        </div>
                        <div>
                            <Link to='/articles' className='max-w-max bg-[rgba(113,205,14,0.3)] shadow-[0px_0px_24px_0px_rgba(113,205,14)]'>게시글 보러가기</Link>
                        </div>
                    </div>
                <footer className='flex'>
                    <h4 className='mr-60'>&copy; {today}</h4>
                    <h3 className='text-2xl'>기분 좋은 문구</h3>
                </footer>
            </>
        )
    }else{
        return (
            <>
                <main>
                <div className='text-center text-green5'>
                        <Link to='/article'>게시글 작성하기</Link><br/>
                        <Link to='/articles'>게시글 보러가기</Link>
                    </div>
                </main>
                <footer className='flex justify-between'>
                    <h4>&copy; {today}</h4>
                    <h3>기분 좋은 문구</h3>
                </footer>
            </>
        );
    }
};

export default Home;