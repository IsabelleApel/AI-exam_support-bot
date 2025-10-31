import { useState, useRef, useEffect } from 'react';

import { Message } from './components/Message/Message';
import { chain } from './utils/chains.mjs';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const endOfMsgRef = useRef();

  useEffect(() => {
    endOfMsgRef.current.scrollIntoView();
  },[messages])

  const sendAnswer = async (event) => {
  
    event.preventDefault();
    const question = inputRef.current.value;
    inputRef.current.value = "";
    setIsLoading(true);

    setMessages((prevState) => [...prevState, { role: "user", content: question }]);
    console.log(question)

    const answer = await chain.invoke({ question });

    console.log(answer)

    setMessages((prevState) => [...prevState, { role: "assistant", content: answer.answer || answer }]);

    setIsLoading(false);
  }

  const messageComponents = messages.map((message, index) => {
    return (
    <Message content={message.content} role={message.role} key={index} />
    )
  })

  return (
    <main className="chat">
      <section className="chat-history">
        {messageComponents}
        {isLoading && <p className='msg-row is-loading'>Laddar svar...</p>}
        <div ref={endOfMsgRef}></div>
      </section>
      <form className='chat-form'>
        <input type="text" ref={inputRef} />
        <button onClick={sendAnswer}>Skicka</button>
      </form>
    </main>
  )
}

export default App;
