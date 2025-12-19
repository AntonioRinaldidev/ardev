'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/ProfileCards.css';
import { TextFade } from './TextFade';
import { useRouter } from 'next/navigation';
import AnimatedButton from './AnimatedButton';
import { downloadCV } from '@/services/fileService';
import ModalDownload from './ModalDownload';
import ThemeSwitcher from './ThemeSwitcher';
import {
    FaMapPin,
    FaUser,
    FaEnvelope,
    FaFileArrowDown,
    FaHeart,
    FaRocketchat,
} from 'react-icons/fa6';
import { useIsMobile } from '@/hooks/useIsMobile';
import Card from './Card'; // ProfileCards relies on Card for dimensions

interface ProfileCardProps {
    fullName: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ fullName }) => {
    const isMobile = useIsMobile(768);
    const [currentSkill, setCurrentSkill] = useState('React');
    const [isDownloading, setIsDownloading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);

    const router = useRouter();
    const skills = ['React', 'Node.js', 'TypeScript', 'Next.js', 'React Native'];

    useEffect(() => {
        const skillInterval = setInterval(() => {
            setCurrentSkill((prev) => {
                const currentIndex = skills.indexOf(prev);
                return skills[(currentIndex + 1) % skills.length];
            });
        }, 3500);
        return () => clearInterval(skillInterval);
    }, []);

    const handlePressCV = async () => {
        setShowModal(true);
        setIsDownloading(true);
        setDownloadComplete(false);
        try {
            await downloadCV();
            setIsDownloading(false);
            setDownloadComplete(true);
            setTimeout(() => setShowModal(false), 2000);
        } catch (err) {
            console.error('Download error', err);
            setIsDownloading(false);
            setDownloadComplete(false);
            setShowModal(false);
        }
    };

    const renderPrimaryActions = () => (
        <div className="primary-actions-redesign">
            <AnimatedButton text="About Me" variant="hub" icon={<FaUser />} onClick={() => router.push('/aboutMe')} />
            <AnimatedButton text="Contact" variant="hub" icon={<FaEnvelope />} onClick={() => router.push('/contact')} />
            <AnimatedButton text="Jarvis" variant="hub" icon={<FaRocketchat />} onClick={() => router.push('/jarvis')} />
        </div>
    );

    const renderSecondaryAction = () => (
        <div className="secondary-actions-redesign">
            <AnimatedButton text="Resume" icon={<FaFileArrowDown />} variant="hub" onClick={handlePressCV} />
        </div>
    );

    return (
        <>
            <Card>
                {/* Left Column: Identity & Skills */}
                <TextFade direction="down" className="col1 pt-0 pb-2 flex-col flex justify-center items-center space-y-0">
                    <motion.div
                        className="profile-avatar-section"
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: 'backOut' }}>
                        <div className="profile-avatar-redesign">
                           
                            <div className="avatar-content-redesign">
                                <span className="avatar-initials-redesign">
                                    {fullName.split(' ').map((n) => n[0]).join('')}
                                </span>
                            </div>
                            <div className="avatar-ring-redesign"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="profile-card-top"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -30 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}>
                        <h1 className="heading profile-wave-title-redesign">
                            Hi there <span className="profile-wave-letter">!</span>
                        </h1>

                        <div className="profile-info-redesign">
                            <h2 className="profile-name-redesign">{fullName}</h2>
                            <div className="profile-role-redesign">
                                <span className="role-static">Computer Engineering Student & </span>
                                <span
                                    className="role-dynamic"
                                    >
                                    Full-Stack
                                </span>
                                <span className="role-static"> Developer</span>
                            </div>
                        </div>

                        
                    </motion.div>

                    <motion.div
                        className="profile-card-bottom"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: 50 }}
                        transition={{ duration: 1, delay: 0.2 }}>
                        <div className="location-redesign">
                            <FaMapPin className="location-icon" />
                            <span>Based In Italy</span>
                            <div className="status-indicator-redesign"></div>
                            <span className="status-text">Available</span>
                        </div>
                        <p className="text-paragraph-redesign">
                            Welcome to my portfolio! Crafting elegant interfaces with clean code.
                        </p>
                        <div className="skills-display">
                            <span className="skills-label">Specialized in </span>
                            <div className="carousel">
                                <div className="group">
                                    {skills.map((skill, index) => (
                                       <div key={index} className='skill-card'>
                                        {skill}
                                    </div>))} 
                                </div>
                                <div aria-hidden="true" className="group">
                                    {skills.map((skill, index) => (
                                       <div key={index} className='skill-card'>
                                        {skill}
                                        </div>))}
                                </div>
                                
                            </div>
                        </div>
                    </motion.div>
                </TextFade>

                {/* Right Column: Actions */}
                <div className="col2">
                    <div className="profile-card-actions-redesign">
                        <motion.div
                            className="actions-redesign"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}>
                            <div className="actions-header">
                                <h3 className="actions-title">Let&apos;s Connect</h3>
                                <p className="actions-subtitle">Ready to build something amazing?</p>
                            </div>

                            {isMobile ? (
                                <div className="primary-actions-redesign">
                                    {renderPrimaryActions().props.children}
                                    {renderSecondaryAction().props.children}
                                </div>
                            ) : (
                                <>
                                    {renderPrimaryActions()}
                                    {renderSecondaryAction()}
                                </>
                            )}

                            <div className="actions-footer">
                                <div className="footer-message">
                                    <FaHeart className="heart-icon" />
                                    <span>Crafted with passion</span>
                                </div>
                            </div>
                            <div className="theme-switcher-container">
                                <ThemeSwitcher />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Card>

            {showModal && (
                <ModalDownload
                    isOpen={showModal}
                    isDownloading={isDownloading}
                    downloadComplete={downloadComplete}
                />
            )}
        </>
    );
};

export default ProfileCard;