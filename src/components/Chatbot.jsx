import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const SYSTEM_PROMPT = `
You are the official AI Assistant for A1 Polymer (A-One Polymer Limited). You represent a key subsidiary of the Anwar Group of Industries. 
Provide short, human-like, helpful, and professional responses. Keep answers concise.

Knowledge Base:
- Established: 2006
- Website: a1polymer.com
- Identity: One of the largest manufacturers of uPVC pipes and fittings in the sub-continent.
- Production Capacity: 450 MT/month for uPVC, 20 MT/month for Teflon tape.
- Technology: Advanced German technology.
- Market: Bangladesh, India, Bhutan, Singapore.
- Products: uPVC, cPVC, SWR, HDPE pipes. Bathroom fittings (ABS fittings, magic pipes, tissue holders, bib cocks, showers). Industrial solutions (Teflon tape, centrifugal pumps, irrigation pumps).
- Leadership: Chairman Manwar Hossain, DMD Waeez R. Hossain, Head of Business Abdur Razzak.
- Head Office: Baitul Hossain Building (12th/14th Floor), 27 Dilkusha C/A, Dhaka-1000.
- Factory: 81, Morkun, Tongi, Gazipur.
- Hotline: 16685
- Phone: +880 2223 384037
- Certifications: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018.
- Guarantee: Up to 100 years on certain premium products.
`;

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const Chatbot = ({ forceOpen, setForceOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm the A1 Polymer AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      setForceOpen(false);
    }
  }, [forceOpen, setForceOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...chatHistory,
            userMsg
          ],
          temperature: 0.5,
          max_tokens: 150
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now." }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having network issues at the moment. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(227, 30, 36, 0.5)'
              }}
            >
              <MessageCircle size={28} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="glass"
              style={{
                width: '350px',
                height: '500px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Header */}
              <div style={{
                background: 'var(--primary)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/logo.png" alt="A1 Polymer" style={{ height: '24px' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'white' }}>AI Assistant</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                background: 'rgba(10,10,10,0.95)'
              }}>
                {messages.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%'
                    }}
                  >
                    {m.role === 'assistant' && (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Bot size={16} color="white" />
                      </div>
                    )}
                    
                    <div style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '0.9rem',
                      lineHeight: 1.4,
                      borderTopLeftRadius: m.role === 'assistant' ? 0 : '12px',
                      borderTopRightRadius: m.role === 'user' ? 0 : '12px',
                    }}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ display: 'flex', gap: '0.5rem', alignSelf: 'flex-start' }}
                  >
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot size={16} color="white" />
                    </div>
                    <div style={{
                      padding: '0.8rem 1.2rem',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderTopLeftRadius: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%' }} />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%' }} />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{ padding: '1rem', background: 'rgba(15,15,15,0.95)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  style={{ display: 'flex', gap: '0.5rem' }}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                      flex: 1,
                      padding: '0.8rem 1rem',
                      borderRadius: '50px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: input.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: input.trim() ? 'pointer' : 'default',
                      transition: '0.3s'
                    }}
                  >
                    <Send size={18} style={{ marginLeft: '2px' }} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Chatbot;
