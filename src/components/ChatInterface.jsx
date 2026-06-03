import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';

const ChatInterface = () => {
  const { isOpen, closeChat } = useChat();
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hi there! 👋 How can we help you automate your business today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI delay - This is where you'll connect your AI tool later
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Thanks for reaching out! I'm currently a demo interface, but soon I'll be connected to a powerful AI to answer all your questions about our automation services. For now, please email us at contact@helora.dev."
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeChat}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-[600px] bg-[#052441] border border-[#0f2e4a] md:rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#0f2e4a] bg-[#001D37] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFD531]/10 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#FFD531]" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Helora Assistant</h3>
                  <p className="text-xs text-[#FFD531]">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeChat}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#052441]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant' ? 'bg-[#FFD531]/10' : 'bg-[#001D37]'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-[#FFD531]" />
                    ) : (
                      <User className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'assistant'
                        ? 'bg-[#001D37] text-gray-200 rounded-tl-none'
                        : 'bg-[#FFD531] text-[#001D37] font-medium rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD531]/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#FFD531]" />
                  </div>
                  <div className="bg-[#001D37] p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#0f2e4a] bg-[#001D37]">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#052441] border border-[#0f2e4a] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD531] transition-colors"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[#FFD531] hover:bg-[#e6c02c] text-[#001D37]"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;