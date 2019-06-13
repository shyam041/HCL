import React from 'react';
import Login from './Login';
import LogOut from './Logout';

class App extends React.Component{
  constructor(props){
    console.log('Constructor');
    super(props);
    this.state = {
      vendors:[],
      masterVendorData:[],
      isLoggedIn:JSON.parse(localStorage.getItem('isLoggedIn')),
      country:'',
      sector:'',
      name:'',
      amount:''
    };
  }
  
  checkNewState = (newState)=>{
    this.setState({isLoggedIn:newState})
  }

  logOut=()=>{
    localStorage.clear();
    localStorage.removeItem('vendors');
    this.setState({
      isLoggedIn:localStorage.getItem('isLoggedIn'),
      vendors:[],
      masterVendorData:[]
    })
  }

  addItem =(event)=>{
    event.preventDefault();
    const newItem = {
      id: 1 + Math.random(),
      name : this.state.name,
      country : this.state.country,
      Sector : this.state.sector,
      amount :this.state.amount
    };
    const vendors = [...this.state.vendors];
    const masterVendorData = [...this.state.masterVendorData];
    vendors.push(newItem);
    masterVendorData.push(newItem);
    this.setState({
      vendors,
      masterVendorData,
      name:'',
      country:'',
      sector:'',
      amount:''
    })
  }

  filterByValues =(event)=>{
      const newArr = this.state.masterVendorData.filter((item)=>{
        if((item.country.includes(event.target.value)||
            item.Sector.includes(event.target.value)||
            item.name.includes(event.target.value))){
          return item;
        }
    });
    this.setState({ vendors: newArr});    
  }

  handleEdit = (updateItem)=>{    
    const clonedData = this.state.vendors.map((item)=>{
      const clone = Object.assign({},item);
      if(clone.id===updateItem.id){
        clone.isEditable=true;
        return clone;
      }
      return clone;
    }); 
    const clonedMasterData = this.state.masterVendorData.map((item)=>{
      const clone = Object.assign({},item);
      if(clone.id===updateItem.id){
        clone.isEditable=true;
        return clone;
      }
      return clone;
    }); 
    this.setState(() => ({
      vendors: clonedData,
      masterVendorData: clonedMasterData
    }));  
    
  }

  hydrateStateWithLocalStorage(){
    console.log('hydrateStateWithLocalStorage');
    for(let key in this.state){      
      if(localStorage.hasOwnProperty(key)){
        let value =  localStorage.getItem(key);
        try{
          value = JSON.parse(value);
          this.setState({ [key]: value });
        }catch(e){
          this.setState({ [key]: '' });
        }
      }
    }
  }

  saveStateToLocalStorage = ()=>{
    console.log('saveStateToLocalStorage');
    for(let key in this.state){
      localStorage.setItem(key,JSON.stringify(this.state[key]))
    }
  }

  saveData = (argItem)=>{
    const clonedData = this.state.masterVendorData.map((item)=>{
      const clonedItem = Object.assign({},item);
      if(clonedItem.id==argItem.id){
        clonedItem.name = argItem.name;
        clonedItem.Sector = argItem.Sector;
        clonedItem.country = argItem.country;
        clonedItem.amount = argItem.amount;
        clonedItem.isEditable = false;
        return clonedItem;
      }      
      return clonedItem;
    });
    //localStorage.setItem('data',JSON.stringify(clonedData)); 
    this.setState(()=>({
      vendors:clonedData,
      masterVendorData:clonedData
    }))
  }

  handleFormInputChange = (event,arg)=>{
    this.setState({[arg]:event.target.value});
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
  renderAddForm = ()=>{
    return(
        <form onSubmit={this.addItem}>
            <br/>
            <label>Add Form</label><br/>
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={this.state.name} 
              onChange={(e)=>{this.handleFormInputChange(e,'name')}}/><br/>
            <label>Country</label>
            <input 
              type="text" 
              name="country" 
              value={this.state.country} 
              onChange={(e)=>{this.handleFormInputChange(e,'country')}}/><br/>
            <label>Sector</label>
            <input 
              type="text" 
              name="sector" 
              value={this.state.sector} 
              onChange={(e)=>{this.handleFormInputChange(e,'sector')}}/><br/>
            <label>Amount</label>
            <input 
              type="text" 
              name="amount" 
              value={this.state.amount} 
              onChange={(e)=>{this.handleFormInputChange(e,'amount')}}/><br/>
            <button>Add</button>
        </form>);
  }
  render(){
      console.log('render');
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
          {this.renderAddForm()}
          <LogOut logOut={this.logOut}/>
        </React.Fragment>)        
      }      
      return (<Login checkNewState={this.checkNewState}/>);
  }

  componentDidMount() {   
    console.log('componentDidMount');
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    // window.removeEventListener(
    //   "beforeunload",
    //   //this.saveStateToLocalStorage.bind(this)
    // );
    // // saves if component has a chance to unmount
    // this.saveStateToLocalStorage();
  }
}

export default App;
