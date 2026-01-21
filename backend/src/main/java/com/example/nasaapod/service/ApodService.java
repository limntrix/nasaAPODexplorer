package com.example.nasaapod.service;

import com.example.nasaapod.client.NasaApiClient;
import com.example.nasaapod.dto.ApodResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ApodService {

    private final NasaApiClient nasaApiClient;

    public ApodService(NasaApiClient nasaApiClient) {
        this.nasaApiClient = nasaApiClient;
    }

    public ApodResponse getTodayApod() {
        return getApodByDate(LocalDate.now().toString());
    }

    @Cacheable(value = "apod", key = "'date-' + #date")
    public ApodResponse getApodByDate(String date) {
        return nasaApiClient.getApodForDate(date);
    }

    @Cacheable(value = "apod", key = "'recent-' + #days")
    public List<ApodResponse> getRecentApods(int days) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days);
        return nasaApiClient.getApodRange(startDate.toString(), endDate.toString());
    }
}
