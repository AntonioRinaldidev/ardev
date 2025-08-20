// src/components/JarvisChat.tsx - PULITO
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

interface ChatMessage {
	id: string;
	content: string;
	sender: 'user' | 'jarvis';
	timestamp: Date;
	contextUsed?: number;
	ragEnabled?: boolean;
	isWelcome?: boolean; // 🔹 Flag per messaggi di benvenuto (solo UI)
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

	// 🚀 Inizializzazione
	useEffect(() => {
		initializeJarvis();
	}, []);

	// 📜 Auto-scroll messaggi
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

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
			isWelcome: true, // 🔹 Questo messaggio è solo per l'UI
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
			// 🔹 Invia al backend SOLO il messaggio dell'utente
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
		<div className="jarvis-chat">
			{/* Messages */}
			<div className="messages-container">
				<AnimatePresence>
					{messages.map((message) => (
						<motion.div
							key={message.id}
							className={`message ${message.sender}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}>
							<div className="message-content">
								<div className="message-text">
									{message.content.split('\n').map((line, index) => (
										<span key={index}>
											{line}
											{index < message.content.split('\n').length - 1 && <br />}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>

				{/* Typing indicator */}
				{isLoading && (
					<motion.div
						className="message jarvis typing"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}>
						<div className="typing-indicator">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</motion.div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<div className="chat-input">
				<textarea
					ref={inputRef}
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Write something to JARVIS..."
					rows={1}
					className="message-input"
					disabled={isLoading}
				/>
				<button
					onClick={sendMessage}
					disabled={!inputMessage.trim() || isLoading}
					className="send-button">
					<FaPaperPlane />
				</button>
			</div>
		</div>
	);
};

export default JarvisChat;
