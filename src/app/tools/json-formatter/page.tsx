'use client';
import React, { useState } from 'react';
import '@/styles/jsonFormatter.css';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import AnimatedButton from '@/components/AnimatedButton';

export default function JsonFormatter() {
	const [inputJson, setInputJson] = useState('');
	const [formattedJson, setFormattedJson] = useState('');
	const [error, setError] = useState('');
	const [indentation, setIndentation] = useState('2');
	const [sortKeys, setSortKeys] = useState(false);
	const [removeEmpty, setRemoveEmpty] = useState(false);
	const [copied, setCopied] = useState(false);
	const [jsObjectCode, setJsObjectCode] = useState('');

	const router = useRouter();

	const handleFormat = () => {
		try {
			let parsed = JSON.parse(inputJson);

			if (removeEmpty) {
				const removeEmptyProps = (obj: any): any => {
					if (Array.isArray(obj)) {
						return obj.map(removeEmptyProps);
					} else if (obj && typeof obj === 'object') {
						return Object.entries(obj).reduce((acc, [key, value]) => {
							if (
								value !== null &&
								value !== '' &&
								!(typeof value === 'object' && Object.keys(value).length === 0)
							) {
								acc[key] = removeEmptyProps(value);
							}
							return acc;
						}, {} as any);
					}
					return obj;
				};
				parsed = removeEmptyProps(parsed);
			}

			if (sortKeys) {
				const sortObjectKeys = (obj: any): any => {
					if (Array.isArray(obj)) return obj.map(sortObjectKeys);
					if (obj !== null && typeof obj === 'object') {
						return Object.keys(obj)
							.sort()
							.reduce((acc: any, key: string) => {
								acc[key] = sortObjectKeys(obj[key]);
								return acc;
							}, {});
					}
					return obj;
				};
				parsed = sortObjectKeys(parsed);
			}

			const indentValue = indentation === 'tab' ? '\t' : parseInt(indentation);
			const pretty = JSON.stringify(parsed, null, indentValue);
			setFormattedJson(pretty);
			setError('');
		} catch (err: any) {
			setError('❌ Invalid JSON: ' + err.message);
			setFormattedJson('');
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(formattedJson);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Copy error:', err);
		}
	};

	const handleConvertObjectToJson = () => {
		try {
			let obj = new Function('return ' + inputJson)();

			if (removeEmpty) {
				const removeEmptyProps = (obj: any): any => {
					if (Array.isArray(obj)) {
						return obj.map(removeEmptyProps);
					} else if (obj && typeof obj === 'object') {
						return Object.entries(obj).reduce((acc, [key, value]) => {
							if (
								value !== null &&
								value !== '' &&
								!(typeof value === 'object' && Object.keys(value).length === 0)
							) {
								acc[key] = removeEmptyProps(value);
							}
							return acc;
						}, {} as any);
					}
					return obj;
				};
				obj = removeEmptyProps(obj);
			}

			if (sortKeys) {
				const sortObjectKeys = (obj: any): any => {
					if (Array.isArray(obj)) return obj.map(sortObjectKeys);
					if (obj !== null && typeof obj === 'object') {
						return Object.keys(obj)
							.sort()
							.reduce((acc: any, key: string) => {
								acc[key] = sortObjectKeys(obj[key]);
								return acc;
							}, {});
					}
					return obj;
				};
				obj = sortObjectKeys(obj);
			}

			const indentValue = indentation === 'tab' ? '\t' : parseInt(indentation);
			const jsonString = JSON.stringify(obj, null, indentValue);
			setFormattedJson(jsonString);
			setError('');
		} catch (err: any) {
			setError('❌ Invalid JavaScript Object: ' + err.message);
			setFormattedJson('');
		}
	};

	return (
		<div className="json-formatter-container">
			<div style={{ marginBottom: '1.5rem' }}>
				<AnimatedButton
					text="← Back to Tool Hub"
					variant="primary"
					onClick={() => router.push('/tools')}
				/>
			</div>
			<h1 className="json-title">JSON Formatter</h1>

			<div className="json-settings">
				<label>
					Indentation:
					<select
						value={indentation}
						onChange={(e) => setIndentation(e.target.value)}>
						<option value="2">2 spaces</option>
						<option value="4">4 spaces</option>
						<option value="tab">Tab</option>
					</select>
				</label>

				<label>
					<input
						type="checkbox"
						checked={sortKeys}
						onChange={(e) => setSortKeys(e.target.checked)}
					/>
					Sort keys alphabetically
				</label>

				<label>
					<input
						type="checkbox"
						checked={removeEmpty}
						onChange={(e) => setRemoveEmpty(e.target.checked)}
					/>
					Remove null or empty values
				</label>
			</div>

			<textarea
				value={inputJson}
				onChange={(e) => setInputJson(e.target.value)}
				placeholder="Paste your raw JSON here..."
				className="json-textarea"
			/>

			<div className="json-buttons">
				<button
					onClick={handleFormat}
					className="animated-btn btn-primary btn-format">
					Format JSON
				</button>
				<button
					onClick={handleConvertObjectToJson}
					className="animated-btn btn-primary btn-format">
					Convert to JSON
				</button>
			</div>

			<AnimatePresence>
				{formattedJson && !error && (
					<motion.div
						className="json-preview-box"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}>
						<div className="json-preview-header">
							<h3 className="json-preview-title">Formatted Preview</h3>
							<button
								onClick={handleCopy}
								className="copy-btn"
								title="Copy to clipboard">
								{copied ? <FaCheck /> : <FaRegCopy />}
							</button>
						</div>
						<pre className="json-output">{formattedJson}</pre>
					</motion.div>
				)}
			</AnimatePresence>

			{error && <div className="json-error">{error}</div>}
		</div>
	);
}
