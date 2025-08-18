'use client';
import * as React from 'react';
import { createScope } from 'animejs';
import { useRef, useState } from 'react';
import './App.css';
import SphereAnimation from '@/components/SphereAnimation';
import { motion } from 'framer-motion';

function App() {
	const root = useRef<HTMLDivElement | null>(null);
	return (
		<div ref={root}>
			<div className="large centered row">
				<SphereAnimation />
			</div>
		</div>
	);
}

export default App;
