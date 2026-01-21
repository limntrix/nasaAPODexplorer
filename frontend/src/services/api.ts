import axios from 'axios';

export interface ApodData {
    copyright?: string;
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

const api = axios.create({
    baseURL: '/api/apod'
});

export const getTodayApod = async (): Promise<ApodData> => {
    const response = await api.get<ApodData>('/today');
    return response.data;
};

export const getApodByDate = async (date: string): Promise<ApodData> => {
    const response = await api.get<ApodData>('', { params: { date } });
    return response.data;
};

export const getRecentApods = async (days: number = 10): Promise<ApodData[]> => {
    const response = await api.get<ApodData[]>('/recent', { params: { days } });
    return response.data;
};
