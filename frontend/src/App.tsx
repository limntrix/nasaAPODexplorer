import { useEffect, useState } from 'react';
import { ApodData, getTodayApod, getRecentApods, getApodByDate } from './services/api';
import { FeaturedApod } from './components/FeaturedApod';
import { ApodCard } from './components/ApodCard';
import { ApodModal } from './components/ApodModal';

function App() {
    const [todayApod, setTodayApod] = useState<ApodData | null>(null);
    const [recentApods, setRecentApods] = useState<ApodData[]>([]);
    const [selectedApod, setSelectedApod] = useState<ApodData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [today, recent] = await Promise.all([
                    getTodayApod(),
                    getRecentApods(12)
                ]);
                setTodayApod(today);
                // Filter out today from recent if present to avoid duplication, though API behavior varies
                setRecentApods(recent.filter(r => r.date !== today.date));
            } catch (err) {
                setError('Failed to load APOD data. Please ensure the backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDateLoading = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchDate) return;
        try {
            setLoading(true);
            const data = await getApodByDate(searchDate);
            setSelectedApod(data);
        } catch (err) {
            setError('Could not find APOD for that date.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !todayApod) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🪐</div>
                    <h2>Loading Universe...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <header>
                <h1>NASA APOD Explorer 🚀</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Discover the cosmos! Each day a different image or photograph of our fascinating universe.</p>
            </header>

            {error && <div className="error">{error} <button onClick={() => setError('')} style={{ marginLeft: '1rem', background: 'transparent', color: 'inherit', fontWeight: 'bold' }}>✕</button></div>}

            {todayApod && (
                <FeaturedApod
                    apod={todayApod}
                    onClick={() => setSelectedApod(todayApod)}
                />
            )}

            <div className="controls">
                <form onSubmit={handleDateLoading} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label htmlFor="date-search" style={{ fontWeight: 600 }}>Time Travel:</label>
                    <input
                        id="date-search"
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    <button type="submit" className="btn">Go</button>
                </form>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Recent Discoveries</h2>
            <div className="grid">
                {recentApods.map((apod) => (
                    <ApodCard
                        key={apod.date}
                        apod={apod}
                        onClick={setSelectedApod}
                    />
                ))}
            </div>

            {selectedApod && (
                <ApodModal
                    apod={selectedApod}
                    onClose={() => setSelectedApod(null)}
                />
            )}
        </div>
    );
}

export default App;
