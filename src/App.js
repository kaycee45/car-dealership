import React, { Component } from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import axios from 'axios';
import logo from './logo.svg';
import './app.css';

class App extends Component {
	
  constructor(props){
	super(props);  
	
	this.state = {
		params : {
			'api-key': '95bb8488-a59a-4322-a670-73e2f7c16bd7'
		},
		groups : ['default','category', 'manufacturer', 'model', 'fuel-type', 'transmission', 'variant', 'product'],
		options : [],
		result: []
	}
  }	
  
  componentWillMount(){
	this.requestCall();	
  }
  
  requestCall(ref = "default"){
	axios({
		method: 'get',
		url: 'https://tdi-tuning.com/productfinder/api/service/v1',
		params : this.state.params,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Content-Type': 'application/json',
		},
	}).then( (response) => { 
		let output = response.data;
		
		let res = this.state.options;
		res[ref] = [];
		for(let i=0; i<output.length; i++){
			res[ref].push(<option value={output[i].id}>{output[i].text}</option>);
		}
		this.setState({
			options: res,
			result : output
		});
		
		return true;
	}).catch( (error) => {
		console.log(error);
	});
  }
  
  handleOnchange(e){
	let id = e.target.value,
		name = e.target.id;
	
	if(this.state.groups.indexOf(name) < this.state.groups.length){
		let nextIndex = this.state.groups.indexOf(name) + 1,
		next = this.state.groups[nextIndex];
		
		let p = next+"-id";
		if(next == "fuel-type") p = next;
		
		let param = this.state.params;
		param[p] = id;
		this.setState({
			params : param
		});
	
		if(this.requestCall(next)) return true;			
	}
  }
	
  returnSelect(){
	var options = [];
	for(let name in this.state.options){
		let label = name;
		if(this.state.groups.indexOf(name) < this.state.groups.length){
			label = this.state.groups[this.state.groups.indexOf(name) + 1];
		}
		options.push(
			<Row className="show-grid">
				<Col sm={4}>
					<label>{label.toUpperCase()}</label>
				</Col>
				<Col sm={8}>
					<select id={name} onChange={(e)=>this.handleOnchange(e)}>
						{this.state.options[name]}
					</select>
				</Col>
			</Row>
		);
	}
	return options;
  }		
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Chelmsford Car Dealer dev test Using React JS</h2>
        </div>
        <div className="App-body">
			{this.returnSelect()}
			<Panel header="JSON Output">
			  <code>{JSON.stringify(this.state.result, null, '\t')}</code>
			</Panel>
        </div>
      </div>
    );
  }
}

export default App;
