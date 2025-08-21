'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import {
	sendMessageToJarvis,
	getJarvisStatus,
	getStoredSessionId,
	storeSessionId,
	clearStoredSession,
	type JarvisResponse,
	type JarvisStatus,
} from '@/services/jarvisService';
import '@/styles/JarvisChat.css';
import DecrpytingText from './MatrixText';

interface ChatMessage {
	id: string;
	content: string;
	sender: 'user' | 'jarvis';
	timestamp: Date;
	contextUsed?: number;
	ragEnabled?: boolean;
	isWelcome?: boolean;
	useMatrixEffect?: boolean;
}

const JarvisChat: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputMessage, setInputMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [jarvisStatus, setJarvisStatus] = useState<JarvisStatus>({
		status: 'connecting',
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const terminalContainerRef = useRef<HTMLDivElement>(null);
	const chatWrapperRef = useRef<HTMLDivElement>(null); // Nuovo ref per wrapper

	useEffect(() => {
		initializeJarvis();
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// NUOVO APPROCCIO: Cattura wheel event sul wrapper esterno
	useEffect(() => {
		const chatWrapper = chatWrapperRef.current;
		const terminalContainer = terminalContainerRef.current;

		if (!chatWrapper || !terminalContainer) return;

		const handleWheel = (e: WheelEvent) => {
			// Solo se il mouse è sopra l'area della chat
			const rect = terminalContainer.getBoundingClientRect();
			const isOverTerminal =
				e.clientX >= rect.left &&
				e.clientX <= rect.right &&
				e.clientY >= rect.top &&
				e.clientY <= rect.bottom;

			if (isOverTerminal) {
				e.preventDefault();
				e.stopPropagation();

				// Scroll diretto sul container
				terminalContainer.scrollTop += e.deltaY;
			}
		};

		// Aggiungi listener sul wrapper con capture=true per intercettare prima
		chatWrapper.addEventListener('wheel', handleWheel, {
			passive: false,
			capture: true,
		});

		return () => {
			chatWrapper.removeEventListener('wheel', handleWheel, { capture: true });
		};
	}, []);

	const initializeJarvis = async () => {
		// Recupera sessione esistente
		const storedSession = getStoredSessionId();
		if (storedSession) {
			setSessionId(storedSession);
		}

		// Verifica status
		const status = await getJarvisStatus();
		setJarvisStatus(status);

		// Aggiungi messaggio di benvenuto SOLO se non ci sono messaggi
		if (messages.length === 0) {
			addWelcomeMessage();
		}
	};

	const addWelcomeMessage = () => {
		const welcomeMessage: ChatMessage = {
			id: 'welcome-' + Date.now().toString(),
			content: `JARVIS Online\n\nCiao! Sono JARVIS, il tuo assistente AI personale. Posso:\n\n• Chattare e rispondere alle tue domande\n• Accedere alla knowledge base del portfolio\n• Analizzare documenti e progetti\n• Aiutarti con informazioni tecniche\n\nCome posso aiutarti oggi?`,
			sender: 'jarvis',
			timestamp: new Date(),
			isWelcome: true,
			useMatrixEffect: true,
		};
		setMessages([welcomeMessage]);
	};

	// 📤 Invio messaggio
	const sendMessage = async () => {
		if (!inputMessage.trim() || isLoading) return;

		const userMessage: ChatMessage = {
			id: Date.now().toString(),
			content: inputMessage,
			sender: 'user',
			timestamp: new Date(),
		};

		// Aggiungi messaggio utente alla UI
		setMessages((prev) => [...prev, userMessage]);
		const currentMessage = inputMessage;
		setInputMessage('');
		setIsLoading(true);

		try {
			const response: JarvisResponse | null = await sendMessageToJarvis(
				currentMessage,
				sessionId || undefined
			);

			if (response) {
				// Salva sessionId se nuovo
				if (response.session_id && response.session_id !== sessionId) {
					setSessionId(response.session_id);
					storeSessionId(response.session_id);
				}

				// Aggiungi risposta di JARVIS alla UI
				const jarvisMessage: ChatMessage = {
					id: (Date.now() + 1).toString(),
					content: response.jarvis,
					sender: 'jarvis',
					timestamp: new Date(),
					contextUsed: response.context_used,
					ragEnabled: response.rag_enabled,
					useMatrixEffect: true,
				};

				setMessages((prev) => [...prev, jarvisMessage]);
			} else {
				// Messaggio di errore (solo UI)
				const errorMessage: ChatMessage = {
					id: (Date.now() + 1).toString(),
					content: '❌ Scusa, ho avuto un problema tecnico. Riprova tra poco.',
					sender: 'jarvis',
					timestamp: new Date(),
					isWelcome: true, // Non inviare al backend
				};
				setMessages((prev) => [...prev, errorMessage]);
			}
		} catch (error) {
			console.error('Errore invio messaggio:', error);
			// Messaggio di errore per exception (solo UI)
			const errorMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				content:
					'❌ Errore di connessione. Controlla la tua connessione internet.',
				sender: 'jarvis',
				timestamp: new Date(),
				isWelcome: true, // Non inviare al backend
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	// ⌨️ Gestione input
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	// 🗑️ Reset chat
	const resetChat = () => {
		setMessages([]);
		clearStoredSession();
		setSessionId(null);
		addWelcomeMessage(); // Ri-aggiungi messaggio di benvenuto
	};

	return (
		// WRAPPER CON REF per catturare eventi wheel
		<div
			className="jarvis-chat"
			ref={chatWrapperRef}>
			<div
				className="terminal-container"
				ref={terminalContainerRef}
				style={{
					// Force scroll properties
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
								// Linea comando utente
								<div className="user-command">
									<span className="prompt user-prompt">user@portfolio:~$</span>
									<span className="command-text">{message.content}</span>
								</div>
							) : (
								// Linea risposta JARVIS
								<div className="jarvis-response">
									<span className="prompt jarvis-prompt">jarvis@system:~$</span>
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

				{/* Processing indicator */}
				{isLoading && (
					<motion.div
						className="terminal-line processing-line"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}>
						<span className="processing-text">[PROCESSING...]</span>
					</motion.div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			{/* Terminal Input */}
			<div className="terminal-input">
				<span className="input-prompt">user@portfolio:~$</span>
				<textarea
					ref={inputRef}
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Type your command..."
					rows={1}
					className="terminal-textarea"
					disabled={isLoading}
				/>
				<button
					onClick={sendMessage}
					disabled={!inputMessage.trim() || isLoading}
					className="terminal-send-btn">
					↵
				</button>
			</div>
		</div>
	);
};

export default JarvisChat;
