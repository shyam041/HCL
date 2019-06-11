import React from 'react'
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    handleClick(event){
        console.log(this.state.username)
        event.preventDefault();
        if(this.state.username==='shyam'&&this.state.password==='shyam'){
            console.log('inside if')
            localStorage.setItem("isLoggedIn",true);
            this.props.checkNewState(true)
        }     
    }
    render() {
        return (
            <div>        
                <input onChange = {(event) => this.setState({username:event.target.value})}/>
                <br/>
                <input onChange = {(event) => this.setState({password:event.target.value})}/>
                <br/>
                <button type="submit" onClick={(event) => this.handleClick(event)}>submit</button>
            </div>
        );
    }
}

export default Login;