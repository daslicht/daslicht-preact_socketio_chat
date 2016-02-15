# daslicht Preact Boilerplate / Starter Kit
based on:
> **[:boom: Preact :boom:](https://github.com/developit/preact-boilerplate.git)**

Simple test project to get aquainted to Preact.

##2do:
require aes + socket- client to node and remoce aes import

```
import aes from 'aes'
//
npm i -S socket.io-client
and then just import io from 'socket.io-client'; 
```

---
```
// file: chat.js
import io from 'socket.io';
export default io.connect('yourserver');
// file: component.js
import chat from './chat';
export default class MyComponent extends Component {
  componentDidMount() {
    chat.on('message', this.addMessage);
  }
  componentWillUnmount() {
    chat.off('message', this.addMessage');
  }
  @bind
  addMessage(msg) {
    let { messages } = this.state;
    messages.push(msg);
    this.setState({ messages });
  }
  render({ }, { messages }) {
    return (
      <div>
        { messages.map( msg => (
          <div>{ msg.text }</div>
        )) }
      </div>
    );
  }
}
```

## License

MIT


[Preact]: https://developit.github.io/preact
[webpack]: https://webpack.github.io
