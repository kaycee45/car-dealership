import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import App from './App';


describe('Application Test', () => {
	
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	});

	it('should return data from api request', () => {
		const request = sinon.spy(App.prototype, "requestCall");
		expect(request.calledOnce).to.equal(true);
	});
	
	it('Respond to offer change', function(){
		const onchange = sinon.spy(App.prototype, "handleOnchange");
		const wrapper = mount(<App />);
		wrapper.find('select[id="default"]').simulate('change');
		expect(onchange.calledOnce).to.equal(true);
	});
});
