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
	const [inputHeight, setInputHeight] = useState(44);


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


	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const terminalContainerRef = useRef<HTMLDivElement>(null);
	const chatWrapperRef = useRef<HTMLDivElement>(null);


	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setInputMessage(value);

	
		const textarea = e.target;
		textarea.style.height = 'auto'; 
		const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 200); 
		textarea.style.height = `${newHeight}px`;
		setInputHeight(newHeight);


		if (terminalContainerRef.current) {
			const inputAreaHeight = newHeight + 32; 
			terminalContainerRef.current.style.paddingBottom = `${inputAreaHeight}px`;
		}
	};


	useEffect(() => {
	
		const timer = setTimeout(() => {
			messagesEndRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			});
		}, 100);
		return () => clearTimeout(timer);
	}, [messages]);


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

	
	const sendMessage = async () => {
		if (!inputMessage.trim() || isThinking || !isConnected) return;

		const success = sendWebSocketMessage(inputMessage.trim());

		if (success) {
			setInputMessage('');
			
			if (inputRef.current) {
				inputRef.current.style.height = '44px';
				setInputHeight(44);
				
				if (terminalContainerRef.current) {
					terminalContainerRef.current.style.paddingBottom = '80px';
				}
			}
		}
	};

	
	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	useEffect(() => {
		return () => {
			disconnect(); 
		};
	}, [disconnect]);

	
	const getConnectionStatus = () => {
		const statusConfig = {
			connected: {
				text: 'CONNECTED TO JARVIS',
				className: 'connected',
			},
			connecting: {
				text: 'CONNECTING TO JARVIS...',
				className: 'connecting',
			},
			error: {
				text: 'CONNECTION ERROR',
				className: 'error',
			},
			disconnected: {
				text: 'DISCONNECTED',
				className: 'disconnected',
			},
		};

		const config = statusConfig[connectionState] || statusConfig.disconnected;

		return (
			<div className="status-left">
				<div className={`connection-indicator ${config.className}`}></div>
				<span className={`status-text ${config.className}`}>{config.text}</span>
			</div>
		);
	};

	return (
		<div
			className="jarvis-chat"
			ref={chatWrapperRef}>
			
			<div className="connection-status-bar">
				{getConnectionStatus()}
				<div className="status-right">
					{sessionId && (
						<div className="session-info">
							SESSION: {sessionId.substring(sessionId.length - 8).toUpperCase()}
						</div>
					)}
				</div>
			</div>


			<div
				className="terminal-container"
				ref={terminalContainerRef}
				style={{
					paddingBottom: `${inputHeight + 36}px`,
				}}>
				<AnimatePresence>
					{messages.map((message) => (
						<motion.div
							key={message.id}
							className="terminal-line"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}>
							{message.sender === 'user' ? (
								
								<div className="user-command">
									<span className="prompt user-prompt">user@portfolio:~$</span>
									<span className="command-text">{message.content}</span>
								</div>
							) : (
								
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
									</span>
								</div>
							)}
						</motion.div>
					))}
				</AnimatePresence>

				
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

		
			<div className="terminal-input">
				<div className="input-container">
					<span className="input-prompt">user@portfolio:~$</span>
					<textarea
						ref={inputRef}
						value={inputMessage}
						onChange={handleInputChange}
						onKeyDown={handleKeyPress}
						placeholder={isConnected ? 'Type your message...' : 'Connecting...'}
						className="terminal-textarea"
						disabled={!isConnected || isThinking}
						rows={1}
						style={{ height: `${inputHeight}px` }}
					/>
					<button
						onClick={sendMessage}
						disabled={!inputMessage.trim() || !isConnected || isThinking}
						className="terminal-send-btn">
						↵
					</button>
				</div>
			</div>
		</div>
	);
};

export default JarvisChat;
