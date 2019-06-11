import React from 'react';

const logOut = (props)=>{    
    return(<div style={{float:"right",marginTop:"-70px",marginRight:"10px"}}>
            <button onClick={props.logOut}>
                Logout
            </button>
        </div>);
}
export default logOut;