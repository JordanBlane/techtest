import react from 'react';
import './App.css'
const axios = require('axios').default;

export class MainPage extends react.Component{

  constructor(props){
    super(props)
    this.state = {
      order:''
    }
  }

  add = () => {
    var value = document.getElementById('value').value
    var type = document.getElementById('type').value
    var item = document.getElementById('item').value

    this.state.order += `${value},${type},${item}|`
  
    console.log(this.state.order)
    document.getElementById('appenditems').innerHTML += `<div>
      <p>Value: ${value}</p>
      <p>Type: ${type}</p>
      <p>Item: ${item}</p>
    </div>`
  }
  
  calculate = () => {
    axios.get(`https://localhost:7164/orders?order=${this.state.order}`)
    .then((data) => {
      console.log(data)
      document.getElementById('result').innerHTML = `Taxed Amount: ${data.data[0]}    Total cost of items: ${data.data[1]}`
    })
  }

  render(){
    return(
      <div>
        <p id='result'></p>
        <div id='appenditems' className='appenditems'>

        </div>
        <input className='input' placeholder='value' id='value'/>
        <input className='input' placeholder='type' id='type'/>
        <input className='input' placeholder='item' id='item'/>
        <button className='input'onClick={()=>{this.add()}}>add</button>
        <button className='input'onClick={()=>{this.calculate()}}>calculate</button>
      </div>
    )
  }
}