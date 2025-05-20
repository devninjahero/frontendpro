import { useState } from 'react';
import './App.css';
import Message from './Message';

import { v4 as uuidv4 } from 'uuid';

function App() {
  const msgtype = ['Success', 'Info', 'Warning', 'Error'];
  const [messages, setMessages] = useState([]);

  function addMessage(type) {
    const newMessage = {
      id: uuidv4(),
      type: type,
    };
    setMessages((prev) => [...prev, newMessage]);
    // setTimeout(() => {
    //   closeCard(newMessage.id);
    // }, 4000);
  }

  function closeCard(id) {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  }

  return (
    <>
      <main>
        <section className="button-section">
          {/* buttons */}
          {msgtype.map((msg) => {
            return (
              <button
                key={uuidv4()}
                onClick={() => addMessage(msg)}
                className={`button ${msg.toLowerCase()}`}
              >
                {msg}
              </button>
            );
          })}
        </section>
        <section className="messages-section">
          {/* <Message key="Joseba" type={'Success'} /> */}
          {messages.map((message) => (
            <Message key={message.id} type={message.type} onClose={() => closeCard(message.id)} />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
