import React from 'react';
import {Navigate} from 'react-router-dom'

const Write = () => {
    //const params = useParams();
    //const memberId = params.memberId;
    const isLoggedIn = false;
    if(!isLoggedIn){
        return <Navigate to="/login" replace={true}/>
    }
    return (
        <div>
            
        </div>
    );
};

export default Write;