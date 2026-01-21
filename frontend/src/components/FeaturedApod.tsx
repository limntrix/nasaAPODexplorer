import React from 'react';
import { ApodData } from '../services/api';

interface Props {
    apod: ApodData;
    onClick?: () => void;
}

export const FeaturedApod: React.FC<Props> = ({ apod, onClick }) => {
    return (
        <section className="featured" onClick={onClick}>
            <div className="featured-content">
                <div style={{ position: 'relative' }}>
                    {apod.media_type === 'image' ? (
                        <img src={apod.hdurl || apod.url} alt={apod.title} className="featured-image" />
                    ) : (
                        <iframe
                            src={apod.url}
                            className="featured-image"
                            title={apod.title}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
                <div className="featured-info">
                    <span className="featured-badge">NASA Picture of the Day</span>
                    <h2>{apod.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{apod.date}</p>
                    <p style={{ marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: '6', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {apod.explanation}
                    </p>
                    <button className="btn">View Full Details</button>
                </div>
            </div>
        </section>
    );
};
