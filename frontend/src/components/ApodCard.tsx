import React from 'react';
import { ApodData } from '../services/api';

interface Props {
    apod: ApodData;
    onClick: (apod: ApodData) => void;
}

export const ApodCard: React.FC<Props> = ({ apod, onClick }) => {
    return (
        <div className="card" onClick={() => onClick(apod)} role="button">
            {apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} className="card-image" loading="lazy" />
            ) : (
                <div className="card-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <span>Video Content</span>
                </div>
            )}
            <div className="card-body">
                <h3 className="card-title">{apod.title}</h3>
                <div className="card-date">{apod.date}</div>
            </div>
        </div>
    );
};
