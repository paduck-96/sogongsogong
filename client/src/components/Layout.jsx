import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null)
    const goHome = () => {
        navigate("/", {replace:true});
    }
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    },[token, setToken])
    const clickLogoutHandler = async () => {
                localStorage.removeItem('token');
                localStorage.removeItem('expireDate');
                localStorage.removeItem('userId');
                 navigate("/", {replace:true})
    }
        if(token === null){
            return (
                <div>
                    <header className='flex item-center text-7xl mb-40'>
                        <div>
                        <img alt='img' onClick={goHome} />
                        </div>
                        <div className='bg-[rgba(196,247,141,0.3)] shadow-[10px_10px_400px_0px_rgba(196,247,141)]'>
                            <span className='text-green6'>소소한 공감...</span>
                            <span className='text-green6'>소공</span>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            );
        }else{
            const logout = (
                <button onClick={clickLogoutHandler}>로그아웃</button>
            )
            return (
                <div>
                    <header className='flex item-center text-7xl mb-40'>
                        <div>
                            <img alt='img' onClick={goHome} />
                        </div>
                        <div className='bg-[rgba(196,247,141,0.3)] shadow-[10px_10px_400px_0px_rgba(196,247,141)]'>
                            <span className='text-green6'>소소한 공감...</span>
                            <span className='text-green6'>소공</span>
                        </div>
                        <div>
                            {logout}
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            );
        }
};

export default Layout;