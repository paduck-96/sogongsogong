import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
//import {Navigate} from 'react-router-dom'

const Write = () => {
    const navigate = useNavigate();
    const [articleInfo, setArticleInfo] = useState({
        articleTitle:"",
        articleContent:"",
        categoryName:"미정"
    });
    const onChangeHandler = (e) => {
        const newArticleInfo = {
                    ...articleInfo,
                    [e.target.name] : e.target.value
                };
                setArticleInfo(newArticleInfo);
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(articleInfo.articleTitle.trim() === "" || articleInfo.articleContent.trim() === ""){
            alert("내용 입력 필수");
        }
        const response = await fetch("http://localhost/article", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                articleTitle:articleInfo.articleTitle,
                articleContent:articleInfo.articleContent,
                categoryName:articleInfo.categoryName,
            })
        }).then(res=>res.json());
        if(response.result ==="success"){
            return navigate("/articles", {replace:true})
        }
    }
    return (
        <div>
            <form method="post" onSubmit={onSubmitHandler}>
                <label>
                    제목 :
                    <input type="text" name='articleTitle' value={articleInfo.articleTitle} onChange={onChangeHandler} />
                </label>
                <br />
                <label>
                    카테고리 :
                    <input type="text"  name='categoryName' value={articleInfo.categoryName} onChange={onChangeHandler} />
                </label>
                <br/>
                <label>
                    내용 :
                    <textarea name='articleContent' value={articleInfo.articleContent} onChange={onChangeHandler} />
                </label>
                <br />
                <button type='submit'>글 작성</button>
            </form>
        </div>
    );
};

export default Write;