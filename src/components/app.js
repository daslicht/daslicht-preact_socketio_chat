import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { bind } from 'decko';

import Header from './header';
import Home from './home';
import Profile from './profile';
import Contact from './contact';
import Chat from './chat';

export default class App extends Component {
	
	// state = {
	// 	socket: io("http://localhost:3000")
	// }
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	@bind
	handleRoute(e) {
		this.currentUrl = e.url;
	}


	componentWillMount() {
		//this.setState({socket : io("http://localhost:3000")});
		
		// if(process.env.NODE_ENV == 'development') {
		// 	this.setState({socket : io("http://localhost:3000") });
		// }else{
		// 	this.setState({socket : io("http://ansolas.de:3000") });
		// }
		console.log('constructor called', this.state.socket);
		//this.state.socket.emit("join", this.state.username);
		//			// <Chat socket={this.state.socket} path="/chat" />
	}
	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Contact path="/contact" />
		
					<Chat path="/chat" />
				</Router>
			</div>
		);
	}
}
