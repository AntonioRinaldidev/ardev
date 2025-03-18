// components/ModalDownload.tsx
import React from "react";
import "@/styles/ModalDownload.css";

interface ModalDownloadProps {
	isOpen: boolean;
	isDownloading: boolean;
	downloadComplete: boolean;
}

const ModalDownload: React.FC<ModalDownloadProps> = ({
	isOpen,
	isDownloading,
	downloadComplete,
}) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<p className="modal-text">
					{isDownloading
						? "Download in corso... Attendi qualche secondo."
						: downloadComplete
						? "✓ Download completato!"
						: ""}
				</p>
				{isDownloading ? (
					<div className="loader" />
				) : (
					<div className="success-icon">✓</div>
				)}
			</div>
		</div>
	);
};

export default ModalDownload;
