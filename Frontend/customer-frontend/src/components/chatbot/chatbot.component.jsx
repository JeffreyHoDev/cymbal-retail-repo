import React, { useState, useRef, useEffect } from 'react';
import './chatbot.styles.css';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';

const chat = async (query) => {

    let response = await fetch(`${process.env.REACT_APP_PUBLIC_WEB_SERVICE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
    });
    return response.json();
    // Return raw text response from the server
}

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
        const messagesEndRef = useRef(null);
    // For display on box and for storing previous queries
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hi! How can I help you today?' }
    ]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const newMessage = { role: 'user', text: input };
        setMessages([...messages, newMessage]);
        const dataToSend = {
            query: input,
            previousQuery: [...messages, newMessage]
        };
        setInput('');
        setLoading(true);
        let response = await chat(dataToSend);
        if (response && response.length > 0) {
            const modelMessage = { role: 'model', text: response };
            setMessages(prevMessages => [...prevMessages, modelMessage]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, loading]);

  return (
    <div className={`chatbot-container${open ? ' open' : ''}`}>
      {open ? (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.role}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && <div className="chatbot-message model">AI Processing... <CircularProgress size={16}/></div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-row">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button className={`${loading ? 'disable-btn' : ''}`} disabled={loading} onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-fab" onClick={() => setOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;