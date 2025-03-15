// components/ModalDownload.tsx
import React from 'react';
import './ModalDownload.css';

interface ModalDownloadProps {
	isOpen: boolean;
	onClose: () => void;
}

const ModalDownload: React.FC<ModalDownloadProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<p className='modal-text'>
					Download in corso... Attendi qualche secondo.
				</p>
				<div className='loader' />
				<button className='modal-close-btn' onClick={onClose}>
					Chiudi
				</button>
			</div>
		</div>
	);
};

export default ModalDownload;
