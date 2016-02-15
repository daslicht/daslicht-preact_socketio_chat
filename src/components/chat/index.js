import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';
import { bind } from 'decko';

export default class Contact extends Component {

	state = {
		keySize : 256,
		secretKey : "public",
		username : "Guest",
		messages: [],
		clients: [],
		joint: false
	}
	
	 self = this;

	getUsername() {
		let username = localStorage.getItem("username");
		if(username != null) {
			this.setState({ username });
		} 
		
	}

	getSecretKey() {
		var secretKey = localStorage.getItem("secretKey");
		console.log("secretKey", secretKey);
		if(secretKey != null) {
			this.setState({secretKey : secretKey });
		}
	}
	
	@bind
		setUsername(e) {
			console.log(e.target.value);
			if(e.keyCode==13 ) {
				localStorage.setItem("username", e.target.value );
				this.setState({ username : e.target.value });
				this.state.socket.emit('set username', e.target.value );
			}
		}

	@bind
		setSecretKey(e){
			if(e.keyCode==13 ) {
				localStorage.setItem("secretKey", e.target.value);
				this.setState({secretKey : e.target.value});
				console.log(this.state);
			}
		}

	componentDidMount() {
		


		if(process.env.NODE_ENV == 'development') {
			this.setState({socket : io("http://localhost:3000") });
		}else{
			this.setState({socket : io("http://ansolas.de:3000") });
		}

		self = this;
		let state = this.state;

		if(this.state.joint === false ) {
			console.log("joining");
			this.setState({joint: true});

			console.log("props:", this.props) ;
			console.log("state:", this.state) ;

			this.getUsername();
			this.getSecretKey();
			// let items = [1,2,3,4,5].map( item => (
	  //           <li id={ item }>{ 'Item '+item }</li>
			// ));
			// this.setState({messages : items});
			//this.state.socket = io("http://localhost:3000");
			//this.props.socket.emit("join", this.state.username);
			this.state.socket.emit("join", this.state.username);
		}else{
			console.log("already joint");
		}

		//this.props.socket.on('chat message', function(msg){
		this.state.socket.on('chat message', function(msg){
			var message = Aes.Ctr.decrypt( msg , state.secretKey, state.keySize);
			console.log('chat message:', state);
			state.messages.unshift(<li >{ message }</li>);
			self.setState({messages: state.messages});
			//$('#messages').append($('<li>').text(message))
			console.log("m: ", state.messages);
			//window.scrollTo(0,document.body.scrollHeight);
			//let message_list = document.getElementById("message_list_container");

			//console.log('height:',document.getElementById({style.messages}).scrollHeight);
			//message_list.scrollTo(0,document.getElementById("messages").scrollHeight);


		});

		//this.props.socket.on('update clientlist', function(clients) {
		this.state.socket.on('update clientlist', function(clients) {
			
			let items = clients.map( item => (
	            <li>{ item.username }</li>
			));
			console.log("items",items);
			self.setState({clients : items});
		});
	}


	
	@bind
		handleMessageInput(e) {
			if(e.keyCode==13 && e.shiftKey == false) {
				let state = this.state;
				let date = new Date();
				let timestamp = date.getHours() + ":"+ date.getMinutes()
				console.log(timestamp);
				let message =  Aes.Ctr.encrypt(timestamp +" | "+state.username + ": "+ e.target.value , state.secretKey, state.keySize);
				console.log("message: ",message);
			    this.state.socket.emit('chat message', message );
			 //    //$('#message_input').val('');  YEAH !!! no jQ
			    e.target.value = "";
			    return false;
			}
		}


	render(props, state) {
		return (
			
				
			<section class={style.chat}>
				<h1>Chat</h1>

					<ul id={style.clients_list}>
						{ state.clients }
					</ul>

					<div id={style.message_list_container}>
					    <ul id={style.messages}>
					    	{ state.messages }
					    </ul>
				    </div>

				    <div id={style.controls_container}>
				    	<input onkeypress={this.setUsername} id={style.nick} type="text" value={state.username} Placeholder="Username"/>
				    	<input onkeypress={this.setSecretKey} id={style.key} type="text" value={state.secretKey} placeholder="Secret Key"/>
				    	<textarea onkeypress={this.handleMessageInput} id={style.message_input} autocomplete="off" ></textarea>
					</div>
	
			</section>
		);
	}
}
