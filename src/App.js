import React from 'react';
import './App.css';
const {BN, Long, bytes, units} = require('@zilliqa-js/util');
const {toBech32Address} = require('@zilliqa-js/crypto');



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contractAddress: '',
      setWalletAddress: '',
      setname:'',
      userName:'',
      getAddress:'',
      providedAddress:'',
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWalletAddressChange = this.handleWalletAddressChange.bind(this);
    this.handleNameChange= this.handleNameChange.bind(this);
    this.setWalletAdress_Name = this.setWalletAdress_Name.bind(this);
    this.getName = this.getName.bind(this);
    this.handlegetAddress=this.handlegetAddress.bind(this);
    this.connectZilpay = this.connectZilpay.bind(this);
  }

  componentDidMount() {
  }
handlegetAddress(event){
  this.setState({getAddress:event.target.value});
}

  handleAddressChange(event) {
    this.setState({contractAddress: event.target.value});
  }

  handleSubmit() {
    localStorage.setItem("contract_address", this.state.contractAddress);
  }

  handleWalletAddressChange(event) {
    this.setState({setWalletAddress: event.target.value});
  }
  handleNameChange(event) {
    this.setState({setname: event.target.value});
  }
  async setWalletAdress_Name(){
    if(window.zilPay.wallet.isEnable){
      this.updateWalletAdress_Name();
    }
    else{
      const isConnect = await window.zilPay.wallet.connect();
      if (isConnect) {
        this.updateWalletAdress_Name();
      } else {
      alert("Not able to call setHello as transaction is rejected");
      }
    } 
  }

  async updateWalletAdress_Name(){
    const zilliqa = window.zilPay;
    let setWalletAddress = this.state.setWalletAddress;
    let setname=this.state.setname;
    let contractAddress = localStorage.getItem("contract_address");
    const CHAIN_ID = 333;
    const MSG_VERSION = 1;
    const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);   
    const myGasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
    contractAddress = contractAddress.substring(2);
    const ftAddr = toBech32Address(contractAddress);
    try {
        const contract = zilliqa.contracts.at(ftAddr);
        const callTx = await contract.call(
            'register',
            [
                {
                    vname: 'name',
                    type: 'String',
                    value: setname
                },
                {
                  vname:'walletAddress',
                  type:'ByStr20',
                  value:setWalletAddress
                }
            ],
            {
                // amount, gasPrice and gasLimit must be explicitly provided
                version: VERSION,
                amount: new BN(0),
                gasPrice: myGasPrice,
                gasLimit: Long.fromNumber(10000),
            }
        );
  
    } catch (err) {
        console.log(err);
    }
  }

  async getName(){
    if(window.zilPay.wallet.isEnable){
      this.getUserName();
    }
    else{
      const isConnect = await window.zilPay.wallet.connect();
      if (isConnect) {
        this.getUserName();
      } else {
        alert("Not able to call setHello as transaction is rejected")
      }
    } 
  }

  async getUserName(){
    try {
      const zilliqa = window.zilPay;
      let getAddress=this.state.getAddress;
      let contractAddress = localStorage.getItem("contract_address");
      let newContractAddress = contractAddress.substring(2)
      let smartContractState = await zilliqa.blockchain.getSmartContractState(newContractAddress);
      if(smartContractState){
        let identity_map = smartContractState.result.identity;
         let username = identity_map[getAddress];
         if(username){
          this.setState({ userName: username });
          this.setState({providedAddress:getAddress});
         }
        else{
          
          this.setState({ userName: " Nil" });
          this.setState({providedAddress:"Nil"});
        }
        
      }
    } catch (error) {
    }
  }

  async connectZilpay(){
    try {
      await window.zilPay.wallet.connect();
      if(window.zilPay.wallet.isConnect){
        localStorage.setItem("zilpay_connect", true);
        window.location.reload(false);
      } else {
      alert("Zilpay connection failed, try again...")
    }
    } catch (error) {}
  }  
  render(){
    return (
      <div className="App">
        <div className="text_color"> {`Current Contract Address : ${localStorage.getItem("contract_address")}`} </div>
        <h3 className="text_color">Update Contract Address</h3>
        <form onSubmit={this.handleSubmit}>
        <label className="text_color">
          New Address <br/>
          <input type="text" onChange={this.handleAddressChange} size="70" placeholder="Format: 0x47d9CEea9a2DA23dc6b2D96A16F7Fbf884580665"/>
        </label><br/>
        <input type="submit" value="Submit" />
        <hr></hr>
      </form>
      <label className="text_color">Register User</label><br></br>
        <br></br>
        <label className="text_color">
           Enter wallet address
          </label><br/>
          <input type="text" onChange={this.handleWalletAddressChange} size="70" placeholder="Format: 0x47d9CEea9a2DA23dc6b2D96A16F7Fbf884580665"/>
        <br/>
        <label className="text_color">
          Enter Name
          </label><br/>
          <input type="text" onChange={this.handleNameChange} size="30" placeholder="Example: Sean"/>
        <br/>
        <button onClick={this.setWalletAdress_Name}>Submit</button><br/><br/>
        <label className="text_color">
          Get Name
        </label><br/>
        <input type = "text" onChange={this.handlegetAddress} size="70" placeholder="Format: 0x47d9CEea9a2DA23dc6b2D96A16F7Fbf884580665"/><br></br>
        <button onClick={this.getName}>Get Name</button><br/><br/>
        <div className="text_color"> {`Wallet Address : ${this.state.providedAddress} is associated with : ${this.state.userName} ` } </div>
        <hr></hr>
        {!localStorage.getItem("zilpay_connect") && <button onClick={this.connectZilpay}>Connect Zilpay</button>}
        <br/><br/>
      </div>
      
    );
  }
}
