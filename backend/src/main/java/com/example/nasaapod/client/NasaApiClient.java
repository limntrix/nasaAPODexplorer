package com.example.nasaapod.client;

import com.example.nasaapod.dto.ApodResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.List;

@Component
public class NasaApiClient {

    @Value("${nasa.api.key}")
    private String apiKey;

    @Value("${nasa.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public NasaApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ApodResponse getApodForDate(String date) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("api_key", apiKey)
                .queryParam("date", date)
                .toUriString();
        return restTemplate.getForObject(url, ApodResponse.class);
    }

    public List<ApodResponse> getApodRange(String startDate, String endDate) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("api_key", apiKey)
                .queryParam("start_date", startDate)
                .queryParam("end_date", endDate)
                .toUriString();
        ApodResponse[] response = restTemplate.getForObject(url, ApodResponse[].class);
        return response != null ? Arrays.asList(response) : List.of();
    }
}
