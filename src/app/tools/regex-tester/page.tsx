'use client';
import React, { useEffect, useState } from 'react';
import AnimatedButton from '@/components/AnimatedButton';
import { useRouter } from 'next/navigation';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import '@/styles/regexTester.css';
import { blendPresetWithBuilder } from '@/utils/blendPresetWithBuilder';
import { buildRegexFromBuilderOnly } from '@/utils/buildRegexFromBuilderOnly';

export default function RegexTester() {
	const router = useRouter();

	const [result, setResult] = useState<string | null>(null);
	const [error, setError] = useState('');
	const [copied, setCopied] = useState(false);

	const [useBuilderMode, setUseBuilderMode] = useState(false);
	const [usePresetMode, setUsePresetMode] = useState(false);

	const [flagG, setFlagG] = useState(true);
	const [flagI, setFlagI] = useState(true);
	const [flagM, setFlagM] = useState(false);
	const [flagS, setFlagS] = useState(false);

	const [pattern, setPattern] = useState('\\bhello\\b');
	const [startsWith, setStartsWith] = useState('');
	const [contains, setContains] = useState('');
	const [endsWith, setEndsWith] = useState('');
	const [exactString, setExactString] = useState('');
	const [minLength, setMinLength] = useState('');
	const [maxLength, setMaxLength] = useState('');
	const [predefinedPattern, setPredefinedPattern] = useState('');

	const [testText, setTestText] = useState(`Hello world!
This is a hello test.
HELLO again.`);

	const [userInput, setUserInput] = useState(`/${pattern}/gi`);

	useEffect(() => {
		let finalPattern = '';

		const builderFields = {
			startsWith,
			contains,
			endsWith,
			exactString,
			minLength,
			maxLength,
		};

		if (useBuilderMode && usePresetMode && predefinedPattern) {
			console.log('----', builderFields);
			finalPattern = blendPresetWithBuilder(predefinedPattern, builderFields);
		} else if (useBuilderMode && !predefinedPattern) {
			finalPattern = buildRegexFromBuilderOnly(builderFields);
		} else if (usePresetMode) {
			finalPattern = predefinedPattern;
		}

		setPattern(finalPattern || '');
	}, [
		startsWith,
		contains,
		endsWith,
		exactString,
		minLength,
		maxLength,
		useBuilderMode,
		usePresetMode,
		predefinedPattern,
	]);

	useEffect(() => {
		const flags = `${flagG ? 'g' : ''}${flagI ? 'i' : ''}${flagM ? 'm' : ''}${
			flagS ? 's' : ''
		}`;
		setUserInput(pattern.trim() ? `/${pattern}/${flags}` : '');
	}, [pattern, flagG, flagI, flagM, flagS]);

	const runRegexTest = () => {
		try {
			const activeFlags = `${flagG ? 'g' : ''}${flagI ? 'i' : ''}${
				flagM ? 'm' : ''
			}${flagS ? 's' : ''}`;
			const regex = new RegExp(pattern, activeFlags);
			setError('');

			let matches: RegExpExecArray[] = [];

			if (flagG) {
				matches = Array.from(testText.matchAll(regex));
			} else {
				const singleMatch = regex.exec(testText);
				if (singleMatch) matches.push(singleMatch);
			}

			if (!matches.length) {
				setResult('⚠️ No matches found.');
			} else {
				let highlighted = testText;
				matches.reverse().forEach((match) => {
					if (match.index !== undefined) {
						const start = match.index;
						const end = start + match[0].length;
						highlighted =
							highlighted.slice(0, start) +
							`<mark>${highlighted.slice(start, end)}</mark>` +
							highlighted.slice(end);
					}
				});
				setResult(highlighted);
				console.log('Match found: ' + matches[0]);
			}
		} catch (err: any) {
			setError('❌ Invalid Regular Expression: ' + err.message);
			setResult(null);
		}
	};
	useEffect(() => {
		const min = parseInt(minLength);
		const max = parseInt(maxLength);
		if (!isNaN(min) && !isNaN(max) && min > max) {
			setMaxLength(minLength);
		}
	}, [minLength]);

	useEffect(() => {
		const min = parseInt(minLength);
		const max = parseInt(maxLength);
		if (!isNaN(min) && !isNaN(max) && max < min) {
			setMinLength(maxLength);
		}
	}, [maxLength]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(testText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Copy error:', err);
		}
	};

	const handlePatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUserInput(value);

		const regexParts = value.match(/^\/(.+)\/([gims]*)$/);
		if (regexParts) {
			const [, extractedPattern, extractedFlags] = regexParts;
			setPattern(extractedPattern);
			setFlagG(extractedFlags.includes('g'));
			setFlagI(extractedFlags.includes('i'));
			setFlagM(extractedFlags.includes('m'));
			setFlagS(extractedFlags.includes('s'));
		} else {
			setPattern(value);
			setFlagG(false);
			setFlagI(false);
			setFlagM(false);
			setFlagS(false);
		}
	};

	useEffect(() => {
		if (pattern.trim() && testText.trim()) {
			runRegexTest();
		}
	}, [pattern, flagG, flagI, flagM, flagS, testText]);

	return (
		<div className="regex-tester-container">
			<AnimatedButton
				text="← Back to Tool Hub"
				variant="primary"
				onClick={() => router.push('/tools')}
			/>
			<h1 className="regex-title">Regex Tester</h1>

			<div className="regex-layout">
				<div className="regex-main">
					<input
						type="text"
						placeholder="Enter regex pattern (e.g. /^hello/gi)"
						value={userInput}
						onChange={handlePatternChange}
						className="regex-input"
					/>{' '}
					<div className="regex-mode-switch">
						<label>
							<input
								type="checkbox"
								checked={useBuilderMode}
								onChange={() => setUseBuilderMode(!useBuilderMode)}
							/>
							Builder Mode
						</label>
						<label>
							<input
								type="checkbox"
								checked={usePresetMode}
								onChange={() => setUsePresetMode(!usePresetMode)}
							/>
							Preset Mode
						</label>
					</div>
					{useBuilderMode && (
						<div className="regex-builder">
							<h2>Line with:</h2>
							<input
								placeholder="Starts with..."
								value={startsWith}
								onChange={(e) => setStartsWith(e.target.value)}
								className="regex-builder-input"
							/>
							<input
								placeholder="Contains..."
								value={contains}
								onChange={(e) => setContains(e.target.value)}
								className="regex-builder-input"
							/>
							<input
								placeholder="Ends with..."
								value={endsWith}
								onChange={(e) => setEndsWith(e.target.value)}
								className="regex-builder-input"
							/>
							<input
								placeholder="Exact String..."
								value={exactString}
								onChange={(e) => setExactString(e.target.value)}
								className="regex-builder-input"
							/>
							<input
								placeholder="Min length"
								min={0}
								type="number"
								value={minLength}
								onChange={(e) => setMinLength(e.target.value)}
								className="regex-builder-input"
							/>
							<input
								placeholder="Max length"
								type="number"
								min={0}
								value={maxLength}
								onChange={(e) => setMaxLength(e.target.value)}
								className="regex-builder-input"
							/>
						</div>
					)}
					{usePresetMode && (
						<select
							className="regex-select"
							value={predefinedPattern}
							onChange={(e) => setPredefinedPattern(e.target.value)}>
							<option value="">-- Choose predefined pattern --</option>
							<option value="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$">
								Email
							</option>
							<option value="^(https?://)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(/\S*)?$">
								URL
							</option>
							<option value="^\+?\d{7,15}$">Phone Number</option>
							<option value="^\d{4}-\d{2}-\d{2}$">Date (YYYY-MM-DD)</option>
						</select>
					)}
					<div className="regex-flags">
						<label>
							<input
								type="checkbox"
								checked={flagG}
								onChange={(e) => setFlagG(e.target.checked)}
							/>{' '}
							g
						</label>
						<label>
							<input
								type="checkbox"
								checked={flagI}
								onChange={(e) => setFlagI(e.target.checked)}
							/>{' '}
							i
						</label>
						<label>
							<input
								type="checkbox"
								checked={flagM}
								onChange={(e) => setFlagM(e.target.checked)}
							/>{' '}
							m
						</label>
						<label>
							<input
								type="checkbox"
								checked={flagS}
								onChange={(e) => setFlagS(e.target.checked)}
							/>{' '}
							s
						</label>
					</div>
					<textarea
						value={testText}
						onChange={(e) => setTestText(e.target.value)}
						placeholder="Paste or write the test text here..."
						className="regex-textarea"
					/>
					<button
						onClick={runRegexTest}
						className="animated-btn btn-primary btn-format">
						Test Regex
					</button>
					{error && <div className="regex-error">{error}</div>}
					{result && (
						<div className="regex-result-box">
							<h3 className="regex-result-title">Result:</h3>
							<button
								onClick={handleCopy}
								className="copy-btn">
								{copied ? <FaCheck /> : <FaRegCopy />}
							</button>
							<div
								dangerouslySetInnerHTML={{ __html: result }}
								className="regex-result-output"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
