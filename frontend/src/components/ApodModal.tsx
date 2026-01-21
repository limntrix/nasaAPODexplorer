import React from 'react';
import { ApodData } from '../services/api';

interface Props {
    apod: ApodData;
    onClose: () => void;
}

export const ApodModal: React.FC<Props> = ({ apod, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                {apod.media_type === 'image' ? (
                    <img src={apod.hdurl || apod.url} alt={apod.title} className="modal-img" />
                ) : (
                    <iframe
                        src={apod.url}
                        className="modal-img"
                        style={{ height: '400px' }}
                        title={apod.title}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                )}
                <h2>{apod.title}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{apod.date}</p>
                <p>{apod.explanation}</p>
                {apod.copyright && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                        &copy; {apod.copyright}
                    </p>
                )}
            </div>
        </div>
    );
};
