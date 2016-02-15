import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Contact extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Contact</h1>
				<p>Contact me</p>
			</div>
		);
	}
}

