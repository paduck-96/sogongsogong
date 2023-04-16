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
        if(articleInfo.articleTitle.trim().length>200){
            alert("제목 길이 초과!");
        }if(articleInfo.articleContent.trim().length>200){
            alert("내용 길이 초과!");
        }
        const response = await fetch("http://localhost/article", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body:JSON.stringify({
                articleTitle:articleInfo.articleTitle,
                articleContent:articleInfo.articleContent,
                categoryName:articleInfo.categoryName,
                userId: localStorage.getItem("userId")
            })
        }).then(res=>res.json())
        .catch(err=>console.log(err))
        if(response.result ==="success"){
            return navigate("/articles", {replace:true})
        }else{
            alert(response.message)
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