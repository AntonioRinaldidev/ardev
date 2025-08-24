'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import {
	useJarvisWebSocket,
	type ChatMessage,
} from '@/hooks/useJarvisWebSocket';
import '@/styles/JarvisChat.css';
import DecrpytingText from './MatrixText';

const JarvisChat: React.FC = () => {
	const [inputMessage, setInputMessage] = useState('');

	// WEBSOCKET HOOK - Single source of truth
	const {
		messages,
		connectionState,
		isConnected,
		isThinking,
		sessionId,
		sendMessage: sendWebSocketMessage,
		clearMessages,
		resetSession,
		disconnect,
	} = useJarvisWebSocket();

	// UI REFS
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const terminalContainerRef = useRef<HTMLDivElement>(null);
	const chatWrapperRef = useRef<HTMLDivElement>(null);

	// AUTO-SCROLL
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// WHEEL SCROLL HANDLING (il tuo codice esistente)
	useEffect(() => {
		const chatWrapper = chatWrapperRef.current;
		const terminalContainer = terminalContainerRef.current;

		if (!chatWrapper || !terminalContainer) return;

		const handleWheel = (e: WheelEvent) => {
			const rect = terminalContainer.getBoundingClientRect();
			const isOverTerminal =
				e.clientX >= rect.left &&
				e.clientX <= rect.right &&
				e.clientY >= rect.top &&
				e.clientY <= rect.bottom;

			if (isOverTerminal) {
				e.preventDefault();
				e.stopPropagation();
				terminalContainer.scrollTop += e.deltaY;
			}
		};

		chatWrapper.addEventListener('wheel', handleWheel, {
			passive: false,
			capture: true,
		});

		return () => {
			chatWrapper.removeEventListener('wheel', handleWheel, { capture: true });
		};
	}, []);

	// MESSAGE SENDING (semplificato!)
	const sendMessage = async () => {
		if (!inputMessage.trim() || isThinking || !isConnected) return;

		const success = sendWebSocketMessage(inputMessage.trim());

		if (success) {
			setInputMessage(''); // Clear input only on successful send
		}
	};

	// KEYBOARD HANDLING
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};
	useEffect(() => {
		return () => {
			disconnect(); // chiude solo la connessione WebSocket
		};
	}, [disconnect]);
	// CONNECTION STATUS DISPLAY
	const getConnectionStatus = () => {
		switch (connectionState) {
			case 'connected':
				return <span className="text-green-500">🟢 Connected to JARVIS</span>;
			case 'connecting':
				return (
					<span className="text-yellow-500">🟡 Connecting to JARVIS...</span>
				);
			case 'error':
				return <span className="text-red-500">🔴 Connection Error</span>;
			case 'disconnected':
				return <span className="text-red-500">🔴 Disconnected</span>;
			default:
				return <span className="text-gray-500">⚪ Unknown Status</span>;
		}
	};

	return (
		<div
			className="jarvis-chat"
			ref={chatWrapperRef}>
			{/* CONNECTION STATUS BAR */}
			<div
				className="connection-status-bar"
				style={{
					padding: '8px 16px',
					borderBottom: '1px solid #333',
					fontSize: '12px',
					display: 'flex',
					justifyContent: 'space-between',
				}}>
				<div>{getConnectionStatus()}</div>
				{sessionId && (
					<div className="text-gray-400">
						Session: {sessionId.substring(sessionId.length - 8)}
					</div>
				)}
			</div>

			<div
				className="terminal-container"
				ref={terminalContainerRef}
				style={{
					overflowY: 'auto',
					overflowX: 'hidden',
					height: '100%',
					position: 'relative',
				}}>
				<AnimatePresence>
					{messages.map((message) => (
						<motion.div
							key={message.id}
							className="terminal-line"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							{message.sender === 'user' ? (
								// USER MESSAGE
								<div className="user-command">
									<span className="prompt user-prompt">user@portfolio:~$</span>
									<span className="command-text">{message.content}</span>
								</div>
							) : (
								// JARVIS/SYSTEM MESSAGE
								<div className="jarvis-response">
									<span className="prompt jarvis-prompt">
										{message.sender === 'system'
											? 'system@jarvis:~$'
											: 'jarvis@system:~$'}
									</span>
									<span className="response-text">
										{message.useMatrixEffect ? (
											<DecrpytingText
												text={message.content}
												speed={5}
												sequential={true}
												revealDirection="start"
												animateOn="view"
												maxIterations={4}
												characters="abcdefghij23456789!@#$%&*"
											/>
										) : (
											message.content
										)}

										{/* DEBUG INFO (optional) */}
										{message.contextUsed !== undefined && (
											<div
												className="debug-info"
												style={{
													fontSize: '10px',
													color: '#666',
													marginTop: '4px',
												}}>
												Context: {message.contextUsed} | RAG:{' '}
												{message.ragEnabled ? 'ON' : 'OFF'}
											</div>
										)}
									</span>
								</div>
							)}
						</motion.div>
					))}
				</AnimatePresence>

				{/* THINKING INDICATOR */}
				{isThinking && (
					<motion.div
						className="terminal-line processing-line"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}>
						<span className="prompt jarvis-prompt">jarvis@system:~$</span>
						<span className="processing-text">[PROCESSING...]</span>
					</motion.div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* TERMINAL INPUT */}
			<div className="terminal-input">
				<span className="input-prompt">user@portfolio:~$</span>
				<textarea
					ref={inputRef}
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder={isConnected ? 'Type your command...' : 'Connecting...'}
					rows={1}
					className="terminal-textarea"
					disabled={!isConnected || isThinking}
				/>
				<button
					onClick={sendMessage}
					disabled={!inputMessage.trim() || !isConnected || isThinking}
					className="terminal-send-btn">
					↵
				</button>
			</div>
		</div>
	);
};

export default JarvisChat;
