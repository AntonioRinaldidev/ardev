import { useState, useEffect, useRef, useCallback } from 'react';

export interface ChatMessage {
	id: string;
	content: string;
	sender: 'user' | 'jarvis' | 'system';
	timestamp: Date;
	contextUsed?: number;
	ragEnabled?: boolean;
	isWelcome?: boolean;
	useMatrixEffect?: boolean;
}

export type ConnectionState =
	| 'disconnected'
	| 'connecting'
	| 'connected'
	| 'error';

interface WebSocketMessage {
	type:
		| 'connected'
		| 'thinking'
		| 'chat_response'
		| 'chat_history'
		| 'error'
		| 'pong';
	message?: string;
	sessionId?: string;
	usingRAG?: boolean;
	contextUsed?: number;
	messages?: {
		user_input: string;
		jarvis_response: string;
		timestamp: string;
		session_id: string;
	}[];
}

export const useJarvisWebSocket = (initialSessionId?: string | null) => {
	// COMPLETE STATE MANAGEMENT
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [connectionState, setConnectionState] =
		useState<ConnectionState>('disconnected');
	const [sessionId, setSessionId] = useState<string | null>(
		initialSessionId || null
	);
	const sessionIdRef = useRef<string | null>(initialSessionId || null);
	const [isThinking, setIsThinking] = useState(false);

	const ws = useRef<WebSocket | null>(null);
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const reconnectAttemptsRef = useRef(0);
	const maxReconnectAttempts = 3;

	// MESSAGE CREATORS
	const createSystemMessage = useCallback(
		(content: string): ChatMessage => ({
			id: `system-${Date.now()}`,
			content,
			sender: 'system',
			timestamp: new Date(),
			isWelcome: true,
			useMatrixEffect: true,
		}),
		[]
	);

	const createJarvisMessage = useCallback(
		(data: WebSocketMessage): ChatMessage => ({
			id: `jarvis-${Date.now()}`,
			content: data.message || 'No response',
			sender: 'jarvis',
			timestamp: new Date(),
			contextUsed: data.contextUsed,
			ragEnabled: data.usingRAG,
			useMatrixEffect: true,
		}),
		[]
	);

	const createUserMessage = useCallback(
		(content: string): ChatMessage => ({
			id: `user-${Date.now()}`,
			content,
			sender: 'user',
			timestamp: new Date(),
		}),
		[]
	);

	const createErrorMessage = useCallback(
		(content: string): ChatMessage => ({
			id: `error-${Date.now()}`,
			content: `❌ ${content}`,
			sender: 'jarvis',
			timestamp: new Date(),
			isWelcome: true,
		}),
		[]
	);

	// MESSAGE HANDLER
	const handleMessage = useCallback(
		(data: WebSocketMessage) => {
			console.log('📥 WebSocket message:', data);

			switch (data.type) {
				case 'connected':
					setMessages((prev) => [
						...prev,
						createSystemMessage(data.message || 'Connected to JARVIS'),
					]);
					if (data.sessionId) {
						setSessionId(data.sessionId);
						sessionIdRef.current = data.sessionId;
						localStorage.setItem('jarvis_session_id', data.sessionId);
					}
					reconnectAttemptsRef.current = 0; // Reset on successful connection
					break;

				case 'thinking':
					setIsThinking(true);
					break;

				case 'chat_response':
					setIsThinking(false);
					setMessages((prev) => [...prev, createJarvisMessage(data)]);
					break;
				case 'chat_history':
					if (data.messages && Array.isArray(data.messages)) {
						if (data.sessionId) {
							setSessionId(data.sessionId);
							sessionIdRef.current = data.sessionId;
							localStorage.setItem('jarvis_session_id', data.sessionId);
						}
						const historyMessages: ChatMessage[] = data.messages.flatMap(
							(msg) => [
								{
									id: `user-${msg.timestamp}`,
									content: msg.user_input,
									sender: 'user',
									timestamp: new Date(msg.timestamp),
								},
								{
									id: `jarvis-${msg.timestamp}`,
									content: msg.jarvis_response,
									sender: 'jarvis',
									timestamp: new Date(msg.timestamp),
									sessionId: msg.session_id,
									useMatrixEffect: true,
								},
							]
						);

						setMessages((prev) => [...prev, ...historyMessages]);
					}
					break;
				case 'error':
					setIsThinking(false);
					setMessages((prev) => [
						...prev,
						createErrorMessage(data.message || 'Unknown error'),
					]);
					break;

				case 'pong':
					console.log('🏓 Pong received');
					break;
			}
		},
		[createSystemMessage, createJarvisMessage, createErrorMessage]
	);

	// CONNECTION MANAGEMENT
	const connect = useCallback(() => {
		if (ws.current?.readyState === WebSocket.OPEN) return;

		setConnectionState('connecting');

		const wsUrl = sessionId
			? `wss://antoniorinaldidev.com/api/jarvis?session_id=${sessionId}`
			: `wss://antoniorinaldidev.com/api/jarvis`;

		console.log('🔌 Connecting to:', wsUrl);

		ws.current = new WebSocket(wsUrl);

		ws.current.onopen = () => {
			console.log('✅ WebSocket connected');
			setConnectionState('connected');
		};

		ws.current.onmessage = (event) => {
			try {
				const data: WebSocketMessage = JSON.parse(event.data);
				console.log();
				handleMessage(data);
			} catch (error) {
				console.error('❌ Error parsing message:', error);
			}
		};

		ws.current.onclose = () => {
			console.log('❌ WebSocket disconnected');
			setConnectionState('disconnected');
			setIsThinking(false);

			// Auto-reconnect with backoff
			if (reconnectAttemptsRef.current < maxReconnectAttempts) {
				const delay = Math.min(
					1000 * Math.pow(2, reconnectAttemptsRef.current),
					10000
				);
				console.log(
					`🔄 Reconnecting in ${delay}ms (attempt ${
						reconnectAttemptsRef.current + 1
					})`
				);

				reconnectTimeoutRef.current = setTimeout(() => {
					reconnectAttemptsRef.current++;
					connect();
				}, delay);
			}
		};

		ws.current.onerror = (error) => {
			console.error('❌ WebSocket error:', error);
			setConnectionState('error');
		};
	}, [sessionId, handleMessage]);

	// ACTIONS
	const sendMessage = useCallback(
		(message: string): boolean => {
			if (ws.current?.readyState !== WebSocket.OPEN) {
				setMessages((prev) => [
					...prev,
					createErrorMessage('Not connected to JARVIS'),
				]);
				return false;
			}

			// Add user message to UI
			setMessages((prev) => [...prev, createUserMessage(message)]);

			// Send to server
			ws.current.send(
				JSON.stringify({
					type: 'chat',
					message: message,
					sessionId: sessionIdRef.current,
				})
			);

			return true;
		},
		[createUserMessage, createErrorMessage]
	);

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	const disconnect = useCallback(() => {
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}

		if (ws.current) {
			ws.current.close();
			ws.current = null;
		}

		setConnectionState('disconnected');
		setIsThinking(false);
		reconnectAttemptsRef.current = 0;
	}, []);

	const resetSession = useCallback(() => {
		disconnect();
		setSessionId(null);
		setMessages([]);
		localStorage.removeItem('jarvis_session_id');

		// Reconnect with new session
		setTimeout(connect, 100);
	}, [disconnect, connect]);

	// LIFECYCLE
	useEffect(() => {
		const storedSessionId = localStorage.getItem('jarvis_session_id');
		if (storedSessionId) {
			setSessionId(storedSessionId);
		}
	}, []);

	useEffect(() => {
		connect();

		return () => disconnect();
	}, [sessionId]);

	// PUBLIC INTERFACE
	return {
		// STATE (read-only)
		messages,
		connectionState,
		isConnected: connectionState === 'connected',
		isThinking,
		sessionId,

		// ACTIONS
		sendMessage,
		clearMessages,
		resetSession,
		reconnect: connect,
		disconnect,
	};
};
