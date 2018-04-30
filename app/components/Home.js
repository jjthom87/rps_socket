import React, {Component} from 'react';

let url = window.location.href.indexOf('localhost') > -1 ? 'http://localhost:3000' : 'https://dry-beach-37904.herokuapp.com';
var socket = io.connect(url);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneReady: false,
      playerTwoReady: false,
      playerOneName: undefined,
      playerTwoName: undefined,
      inputDisabled: false,
      buttonsDisabled: false,
      showPlayerOneButtons: false,
      showPlayerTwoButtons: false
    };
  }
  namePress(e){
    if(e.key === "Enter"){
      if(!this.state.playerOneReady && !this.state.playerTwoReady){
        socket.emit('firstPlayerInput', e.target.value)
        this.setState({
          inputDisabled: true,
          buttonsDisabled: true,
          showPlayerOneButtons: true
        })
        this.refs.pName.value = "";
      } else if (this.state.playerOneReady && !this.state.playerTwoReady){
        socket.emit('secondPlayerInput', e.target.value)
        this.setState({
          showPlayerTwoButtons: true
        })
        this.refs.pName.value = "";
      }
    }
  }
  onRockClick(player){
    console.log(player)
  }
  onPaperClick(player){
    console.log(player)
  }
  onScissorClick(player){
    console.log(player)
  }
  componentDidMount(){
    let that = this;
    socket.on('firstPlayerClient', function(data){
      that.setState({
        playerOneReady: true,
        playerOneName: data
      })
    })
    socket.on('secondPlayerClient', function(data){
      that.setState({
        playerTwoReady: true,
        playerTwoName: data,
        inputDisabled: true,
        buttonsDisabled: false
      })
    })
  }
  render() {
    const createButtons = (player) => {
      return (
        <div>
          <button 
            onClick={() => this.onRockClick(player)}
            disabled={this.state.buttonsDisabled}
          >
            Rock
          </button>
          <button 
            onClick={() => this.onPaperClick(player)}
            disabled={this.state.buttonsDisabled}
          >
            Paper
          </button>
          <button 
            onClick={() => this.onScissorClick(player)}
            disabled={this.state.buttonsDisabled}
          >
            Scissor
          </button>
        </div>
      )
    }
    return (
      <div>
        <div className="text-center">
          <h1>Welcome to RPS</h1>
          <h3>Enter Your Name</h3>
          <input 
            type="text"
            ref="pName"
            style={{width: '200px'}}
            onKeyPress={this.namePress.bind(this)}
            disabled={this.state.inputDisabled}
          />
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h3>Player One</h3>
            {
              this.state.playerOneReady ?
                <div>
                  <p>{this.state.playerOneName}</p>
                   {this.state.showPlayerOneButtons ? createButtons("one") : <div></div>}
                </div> : 
                <p>Waiting on Player One</p>
            }
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h3>Player Two</h3>
            {
              this.state.playerTwoReady ?
                <div>
                  <p>{this.state.playerTwoName}</p>
                  {this.state.showPlayerTwoButtons ? createButtons("two") : <div></div>}
                </div> : 
                <p>Waiting on Player Two</p>            
            }
          </div>
        </div>
      </div>
    );
  }
};
