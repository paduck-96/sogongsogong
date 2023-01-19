import React from 'react';
import { NavLink } from 'react-router-dom';

const ArticleItem = ({articleGroup, articleId}) => {
    const activeStyle = {
        color:"grey",
        outline:"none"
    }
    return (
        <div>
            <li>
                <NavLink to={`/articles/${articleGroup}/${articleId}`} style={({isActive})=>(isActive?activeStyle:undefined)}>
                    [{articleGroup}] 게시글 {articleId}
                </NavLink>
            </li>
        </div>
    );
};

export default ArticleItem;