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
      showPlayerTwoButtons: false,
      playerOnePick: undefined,
      playerTwoPick: undefined,
      playerOnePicked: false,
      playerTwoPicked: false,
      youArePlayerOne: false,
      youArePlayerTwo: false,
      playerOneId: undefined,
      playerTwoId: undefined,
      playerOneWins: undefined,
      playerOneLosses: undefined,
      playerOneTies: undefined,
      playerTwoWins: undefined,
      playerTwoLosses: undefined,
      playerTwoTies: undefined      
    };
  }
  namePress(e){
    if(e.key === "Enter"){
      if(!this.state.playerOneReady && !this.state.playerTwoReady){
        socket.emit('firstPlayerInput', e.target.value)
        this.setState({
          inputDisabled: true,
          buttonsDisabled: true,
          showPlayerOneButtons: true,
          youArePlayerOne: true,
          playerOneWins: 0,
          playerOneLosses: 0,
          playerOneTies: 0 
        })
        this.refs.pName.value = "";
      } else if (this.state.playerOneReady && !this.state.playerTwoReady){
        socket.emit('secondPlayerInput', e.target.value)
        this.setState({
          showPlayerTwoButtons: true,
          youArePlayerTwo: true,
          playerTwoWins: 0,
          playerTwoLosses: 0,
          playerTwoTies: 0 
        })
        this.refs.pName.value = "";
      } else if (!this.state.playerOneReady && this.state.playerTwoReady){

      }
    }
  }
  onRockClick(player){
    if(player === "one"){
      socket.emit('playerOnePicked', true)
      socket.emit('playerOnePick', 'rock')
      this.setState({
        playerOnePick: 'rock',
        buttonsDisabled: true
      });
      if(this.state.playerTwoPicked){
        if(this.state.playerTwoPick === "scissor"){
          this.setState({
            playerOneWins: this.state.playerOneWins + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'loss');
        } else if (this.state.playerTwoPick === "rock"){
          this.setState({
            playerOneTies: this.state.playerOneTies + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'tie');
        } else {
          this.setState({
            playerOneLosses: this.state.playerOneLosses + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'win');
        }
      }
    } else if (player === "two"){
      socket.emit('playerTwoPicked', true)
      socket.emit('playerTwoPick', 'rock')
      this.setState({
        playerTwoPick: 'rock',
        buttonsDisabled: true
      });
      if(this.state.playerOnePicked){
        if(this.state.playerOnePick === "scissor"){
          this.setState({
            playerTwoWins: this.state.playerTwoWins + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'loss');
        } else if (this.state.playerOnePick === "rock"){
          this.setState({
            playerTwoTies: this.state.playerTwoTies + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'tie');
        } else {
          this.setState({
            playerTwoLosses: this.state.playerTwoLosses + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'win');
        }
      }
    }
  }
  onPaperClick(player){
    if(player === "one"){
      socket.emit('playerOnePicked', true)
      socket.emit('playerOnePick', 'paper')
      this.setState({
        playerOnePick: 'paper',
        buttonsDisabled: true
      });
      if(this.state.playerTwoPicked){
        if(this.state.playerTwoPick === "scissor"){
          this.setState({
            playerOneLosses: this.state.playerOneLosses + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'win');
        } else if (this.state.playerTwoPick === "rock"){
          this.setState({
            playerOneWins: this.state.playerOneWins + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'loss');
        } else {
          this.setState({
            playerOneTies: this.state.playerOneTies + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'tie');
        }
      }
    } else if (player === "two"){
      socket.emit('playerTwoPicked', true)
      socket.emit('playerTwoPick', 'paper')
      this.setState({
        playerTwoPick: 'paper',
        buttonsDisabled: true
      });
      if(this.state.playerOnePicked){
        if(this.state.playerOnePick === "scissor"){
          this.setState({
            playerTwoLosses: this.state.playerTwoLosses + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'win');
        } else if (this.state.playerOnePick === "rock"){
          this.setState({
            playerTwoWins: this.state.playerTwoWins + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'loss');
        } else {
          this.setState({
            playerTwoTies: this.state.playerTwoTies + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'tie');
        }
      }
    }
  }
  onScissorClick(player){
    if(player === "one"){
      socket.emit('playerOnePicked', true)
      socket.emit('playerOnePick', 'scissor')
      this.setState({
        playerOnePick: 'scissor',
        buttonsDisabled: true
      });
      if(this.state.playerTwoPicked){
        if(this.state.playerTwoPick === "scissor"){
          this.setState({
            playerOneTies: this.state.playerOneTies + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'tie');
        } else if (this.state.playerTwoPick === "rock"){
          this.setState({
            playerOneLosses: this.state.playerOneLosses + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'win');
        } else {
          this.setState({
            playerOneWins: this.state.playerOneWins + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedTwoFirst', 'loss');
        }
      }
    } else if (player === "two"){
      socket.emit('playerTwoPicked', true)
      socket.emit('playerTwoPick', 'scissor')
      this.setState({
        playerTwoPick: 'scissor',
        buttonsDisabled: true
      });
      if(this.state.playerOnePicked){
        if(this.state.playerOnePick === "scissor"){
          this.setState({
            playerTwoTies: this.state.playerTwoTies + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'tie');
        } else if (this.state.playerOnePick === "rock"){
          this.setState({
            playerTwoLosses: this.state.playerTwoLosses + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'win');
        } else {
          this.setState({
            playerTwoWins: this.state.playerTwoWins + 1
          })
          socket.emit('playersPicked', true);
          socket.emit('playersPickedOneFirst', 'loss');
        }
      }
    }
  }
  componentDidMount(){
    let that = this;
    socket.on('firstPlayerClient', function(data){
      that.setState({
        playerOneReady: true,
        playerOneName: data.data,
        playerOneId: data.id
      })
    })
    socket.on('secondPlayerClient', function(data){
      that.setState({
        playerTwoReady: true,
        playerTwoName: data.data,
        inputDisabled: true,
        buttonsDisabled: false,
        playerTwoId: data.id
      })
    })
    socket.on('playerOnePickedClient', function(data){
      that.setState({
        playerOnePicked: data.data
      })
    })
    socket.on('playerTwoPickedClient', function(data){
      that.setState({
        playerTwoPicked: data.data
      })
    })
    socket.on('playerOnePickClient', function(data){
      that.setState({
        playerOnePick: data.data
      })
    })
    socket.on('playerTwoPickClient', function(data){
      that.setState({
        playerTwoPick: data.data
      })
    })
    socket.on('playersPickedClient', function(data){
      that.setState({
        playerOnePick: undefined,
        playerTwoPick: undefined,
        playerOnePicked: false,
        playerTwoPicked: false,
        buttonsDisabled: false
      })
    })
    socket.on('playersPickedOneFirstClient', function(data){
      if(data.data === "tie"){
        that.setState({
          playerOneTies: that.state.playerOneTies + 1
        })
      } else if (data.data === "loss"){
        that.setState({
          playerOneLosses: that.state.playerOneLosses + 1
        })
      } else {
        that.setState({
          playerOneWins: that.state.playerOneWins + 1
        })  
      }
    })
    socket.on('playersPickedTwoFirstClient', function(data){
      if(data.data === "tie"){
        that.setState({
          playerTwoTies: that.state.playerTwoTies + 1
        })
      } else if (data.data === "loss"){
        that.setState({
          playerTwoLosses: that.state.playerTwoLosses + 1
        })
      } else {
        that.setState({
          playerTwoWins: that.state.playerTwoWins + 1
        })  
      }
    })
    socket.on('playerDisconnected', function(data){
      if(data === that.state.playerOneId){
        that.setState({
          playerOneReady: false,
          playerOneName: undefined,
          playerOneId: undefined,
          playerOnePick: undefined,
          playerOnePicked: false,
          showPlayerOneButtons: false,
          youArePlayerOne: false,
          inputDisabled: false,
          buttonsDisabled: true
        })
      } else if (data === that.state.playerTwoId){
        that.setState({
          playerTwoReady: false,
          playerTwoName: undefined,
          playerTwoId: undefined,
          playerTwoPick: undefined,
          playerTwoPicked: false,
          showPlayerTwoButtons: false,
          youArePlayerTwo: false,
          inputDisabled: false,
          buttonsDisabled: true
        })
      }
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
        <div>
          {
            this.state.playerOneReady && this.state.playerTwoReady ?
              <div>
                <p>Status</p>
                {
                  !this.state.playerOnePicked && !this.state.playerTwoPicked ?
                    <p>Neither Player Has Picked</p> : this.state.playerOnePicked && !this.state.playerTwoPicked ?
                    <p>Waiting on Player Two to pick</p> : !this.state.playerOnePicked && this.state.playerTwoPicked ?
                    <p>Waiting on Player One to pick</p> :
                    <div></div>
                }
                <div>
                  <p>Wins: {this.state.youArePlayerOne ? this.state.playerOneWins : this.state.playerTwoWins}</p>
                  <p>Losses: {this.state.youArePlayerOne ? this.state.playerOneLosses : this.state.playerTwoLosses}</p>
                  <p>Ties: {this.state.youArePlayerOne ? this.state.playerOneTies : this.state.playerTwoTies}</p>
                </div>
              </div> :
              <div></div>
          }
        </div>
      </div>
    );
  }
};