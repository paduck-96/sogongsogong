import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return (
        <div>
            <main>
                <div >
                    <Link to='/articles'>게시글 보러가기</Link>
                    <Link to='/:memberId/write'>게시글 작성하기</Link>
                </div>
            </main>
            <footer>
                <h4>&copy; {today}</h4>
            </footer>
        </div>
    );
};

export default Home;