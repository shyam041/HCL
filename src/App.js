import React from 'react';
import Login from './Login';
import LogOut from './Logout';
import data from './data.json';

let clonedData;

if(!localStorage.getItem('data')){
  console.log('first load');
  localStorage.setItem('data',JSON.stringify(data));
  clonedData = [...data];
}else{
  console.log('second load');
  clonedData = JSON.parse(localStorage.getItem('data'));
}

class App extends React.Component{
  state = {
    vendors:clonedData.map((item)=>{
        const clone = Object.assign({},item);
        clone.isEditable = false;
        return clone;
      }),
    isLoggedIn:localStorage.getItem('isLoggedIn'),
  };
  
  checkNewState = (newState)=>{
    this.setState({isLoggedIn:newState})
  }

  logOut=()=>{
    localStorage.removeItem('isLoggedIn');
    this.setState({isLoggedIn:localStorage.getItem('isLoggedIn')})
  }

  filterByValues =(event)=>{
      const newArr = clonedData.filter((item)=>{
        if((item.country.includes(event.target.value)||
            item.Sector.includes(event.target.value)||
            item.name.includes(event.target.value))){
          return item;
        }
    });
    this.setState({ vendors: newArr});    
  }
  handleEdit = (updateItem)=>{    
    clonedData = this.state.vendors.map((item)=>{
      const clone = Object.assign({},item);
      if(clone.id===updateItem.id){
        clone.isEditable=true;
        return clone;
      }
      return clone;
    }); 
    localStorage.setItem('data',JSON.stringify(clonedData));  
    this.setState(() => ({
      vendors: clonedData
    }));  
    
  }

  saveData = (argItem)=>{
    //clonedData = JSON.parse(localStorage.getItem('data'));
    clonedData = clonedData.map((item)=>{
      const clonedItem = Object.assign({},item);
      if(clonedItem.id==argItem.id){
        clonedItem.name = argItem.name;
        clonedItem.Sector = argItem.Sector;
        clonedItem.country = argItem.country;
        clonedItem.amount = argItem.amount;
        clonedItem.isEditable = false;
        //console.log(clonedItem);
        return clonedItem;
      }      
      return clonedItem;
    });
    localStorage.setItem('data',JSON.stringify(clonedData)); 
    this.setState(()=>({
      vendors:clonedData
    }))
  }
  handleInputChange = (event,id,arg)=>{
    this.setState({vendors:this.state.vendors.map((item)=>{
        if(item.id===id){
          item[arg] = event.target.value;
          return item;        
        }
        return item;
    })})
  } 
  render(){
      console.log(this.state.vendors)
      const hideInput = {display:'none'};
      if(this.state.isLoggedIn){
        let toRender = this.state.vendors.map((item)=>{
          return(<tr key={item.id} className="puneeth">
            <td>
              <input 
                value={item.name} 
                onChange={(e)=>{this.handleInputChange(e,item.id,'name')}} 
                name='obligator_name' 
                style={!item.isEditable?hideInput:null}
              />
              <span style={item.isEditable?hideInput:null}>{item.name}</span>
            </td>
            <td>
              <input 
                value={item.country} 
                onChange={(e)=>{this.handleInputChange(e,item.id,'country')}} 
                name='country' 
                style={!item.isEditable?hideInput:null}
              />
              <span style={item.isEditable?hideInput:null}>{item.country}</span>
            </td>
            <td>
              <input 
                value={item.Sector} 
                onChange={(e)=>{this.handleInputChange(e,item.id,'Sector')}}
                name='sector' 
                style={!item.isEditable?hideInput:null}
              />
              <span style={item.isEditable?hideInput:null}>{item.Sector}</span>
            </td>
            <td>
              <input  
                value={item.amount} 
                type='text' 
                name='amount' 
                onChange={(e)=>{this.handleInputChange(e,item.id,'amount')}} 
                style={!item.isEditable?hideInput:null}
              />
              <span   style={item.isEditable?hideInput:null}>{item.amount}</span>
            </td>
            <td><button onClick={()=>{this.handleEdit(item)}}>Edit</button></td>
            <td><button onClick={()=>{this.saveData(item)}} style={!item.isEditable?hideInput:null}>Save</button></td>
          </tr>);
        })
        return(<React.Fragment>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Sector</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {toRender}
            </tbody>
          </table>
          <input type="text" id="filterData" onChange={this.filterByValues}/>
          <LogOut logOut={this.logOut}/>
        </React.Fragment>)        
      }      
      return (<Login checkNewState={this.checkNewState}/>);
  }
}

export default App;
