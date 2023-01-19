import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/", {replace:true});
    }
    return (
        <div>
            <header>
                <div>
                    <span className="text-3xl font-bold underline" onClick={goHome}>이미지가 들어갈 공간입니다</span>
                </div>
                <div>
                    <span>소소한 공감...</span>
                    <span>소공</span>
                </div>
                <div>
                    <Link to="/login">로그인</Link>
                    <Link to='/register'>회원가입</Link>
                    <Link to='/logout'>로그아웃</Link>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;