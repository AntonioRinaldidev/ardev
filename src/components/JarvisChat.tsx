'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaArrowUp } from 'react-icons/fa'; // Icona più moderna
import { useJarvisWebSocket } from '@/hooks/useJarvisWebSocket';
import '@/styles/JarvisChat.css';
import DecrpytingText from './MatrixText';

interface JarvisChatProps {
    jarvisData: any; 
}

const JarvisChat: React.FC<JarvisChatProps> = ({ jarvisData }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [inputHeight, setInputHeight] = useState(24); // Start smaller

    const {
        messages,
        connectionState,
        isConnected,
        isThinking,
        sessionId,
        sendMessage: sendWebSocketMessage,
        disconnect,
    } = jarvisData;

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Gestione altezza dinamica input
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
        e.target.style.height = 'auto';
        const newHeight = Math.min(e.target.scrollHeight, 120);
        e.target.style.height = `${newHeight}px`;
        setInputHeight(newHeight);
    };

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isThinking]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isThinking || !isConnected) return;
        const success = sendWebSocketMessage(inputMessage.trim());
        if (success) {
            setInputMessage('');
            setInputHeight(24);
            if (inputRef.current) inputRef.current.style.height = 'auto';
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Cleanup connection
    useEffect(() => {
        return () => disconnect();
    }, [disconnect]);

    // Status Indicator Helper
    const getConnectionConfig = () => {
        switch (connectionState) {
            case 'connected': return { text: 'System Online', class: 'connected' };
            case 'connecting': return { text: 'Initializing...', class: 'connecting' };
            case 'error': return { text: 'Connection Failure', class: 'disconnected' };
            default: return { text: 'Offline', class: 'disconnected' };
        }
    };
    const status = getConnectionConfig();

    return (
        <div className="jarvis-chat">
            {/* Header Status Bar */}
            <div className="connection-status-bar">
                <div className="status-left">
                    <div className={`connection-indicator ${status.class}`} />
                    <span style={{ fontWeight: 600 }}>{status.text}</span>
                </div>
                {sessionId && (
                    <div style={{ opacity: 0.6 }}>ID: {sessionId.slice(-6)}</div>
                )}
            </div>

            {/* Chat Area - AGGIUNTO data-lenis-prevent */}
            <div className="terminal-container" data-lenis-prevent>
                <AnimatePresence mode="popLayout">
                    {messages.map((message: any) => (
                        <motion.div
                            key={message.id}
                            className="terminal-line" // Wrapper per l'animazione
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {message.sender === 'user' ? (
                                <div className="user-command">
                                    {message.content}
                                </div>
                            ) : (
                                <div className="jarvis-response">
                                    <div className="response-text">
                                        {message.useMatrixEffect ? (
                                            <DecrpytingText
                                                text={message.content}
                                                speed={10} // Più veloce per UX migliore
                                                sequential={true}
                                                revealDirection="start"
                                                animateOn="view"
                                                characters="J.A.R.V.I.S._10101"
                                            />
                                        ) : (
                                            message.content
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Modern Thinking Indicator */}
                {isThinking && (
                    <motion.div 
                        className="processing-line"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="jarvis-response" style={{ padding: '0.8rem 1.2rem' }}>
                            <div className="thinking-dots">
                                <div className="dot" />
                                <div className="dot" />
                                <div className="dot" />
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Modern Input Area */}
            <div className="terminal-input">
                <div className="input-container">
                    <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder={isConnected ? "Ask J.A.R.V.I.S. anything..." : "Establishing uplink..."}
                        className="terminal-textarea"
                        disabled={!isConnected || isThinking}
                        rows={1}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || !isConnected || isThinking}
                        className="terminal-send-btn"
                    >
                        <FaArrowUp /> {/* Icona freccia verso l'alto (stile ChatGPT/Gemini) */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JarvisChat;