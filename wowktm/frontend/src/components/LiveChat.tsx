import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'quick_reply';
  metadata?: any;
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
}

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');
  const [chatMode, setChatMode] = useState<'bot' | 'agent'>('bot');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies: QuickReply[] = [
    { id: '1', text: 'Track my order', action: 'track_order' },
    { id: '2', text: 'Return policy', action: 'return_policy' },
    { id: '3', text: 'Product help', action: 'product_help' },
    { id: '4', text: 'Payment issues', action: 'payment_help' },
    { id: '5', text: 'Talk to agent', action: 'human_agent' }
  ];

  const botResponses = {
    greeting: "Hi! I'm here to help you with your WoWKTM shopping experience. How can I assist you today?",
    track_order: "I can help you track your order. Please provide your order number or email address.",
    return_policy: "Our return policy allows returns within 30 days of purchase. Items must be in original condition. Would you like to start a return?",
    product_help: "I'm here to help with any product questions! You can ask about specifications, availability, or recommendations.",
    payment_help: "I can assist with payment issues. Are you having trouble with checkout, refunds, or payment methods?",
    human_agent: "Let me connect you with one of our customer service agents. Please hold on while I find someone available...",
    default: "I understand you need help. Let me connect you with our support team, or you can try one of the quick options below."
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: botResponses.greeting,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = (duration = 1500) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), duration);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    simulateTyping();
    setTimeout(() => {
      const response = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: chatMode,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1500);
  };

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply.text,
      sender: 'user',
      timestamp: new Date(),
      type: 'quick_reply'
    };

    setMessages(prev => [...prev, userMessage]);

    if (reply.action === 'human_agent') {
      setChatMode('agent');
      setConnectionStatus('connecting');
      setTimeout(() => {
        setConnectionStatus('connected');
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Hi! I'm Sarah from WoWKTM customer support. I'm here to help you personally. What can I do for you today?",
          sender: 'agent',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, agentMessage]);
      }, 2000);
    } else {
      simulateTyping();
      setTimeout(() => {
        const response = getBotResponse(reply.action);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1500);
    }
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('track') || lowerInput.includes('order')) {
      return botResponses.track_order;
    } else if (lowerInput.includes('return') || lowerInput.includes('refund')) {
      return botResponses.return_policy;
    } else if (lowerInput.includes('product') || lowerInput.includes('item')) {
      return botResponses.product_help;
    } else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
      return botResponses.payment_help;
    } else if (input in botResponses) {
      return botResponses[input as keyof typeof botResponses];
    } else {
      return botResponses.default;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-wowktm-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          height: isMinimized ? 60 : 600
        }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
      {/* Header */}
      <div className="bg-gradient-to-r from-wowktm-primary to-wowktm-secondary p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {chatMode === 'agent' ? (
                  <div className="w-8 h-8 bg-wowktm-accent rounded-full flex items-center justify-center text-sm font-bold">
                    S
                  </div>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                connectionStatus === 'connected' ? 'bg-green-400' : 
                connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold">
                {chatMode === 'agent' ? 'Sarah - Customer Support' : 'WoWKTM Assistant'}
              </h3>
              <p className="text-xs opacity-90">
                {connectionStatus === 'connected' ? 'Online' : 
                 connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="flex flex-col h-96"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-wowktm-primary text-white'
                      : message.sender === 'agent'
                      ? 'bg-wowktm-accent text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.slice(0, 3).map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-wowktm-primary focus:border-transparent text-sm"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="w-10 h-10 bg-wowktm-primary text-white rounded-full flex items-center justify-center hover:bg-wowktm-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LiveChat;
