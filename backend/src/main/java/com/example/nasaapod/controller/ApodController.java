package com.example.nasaapod.controller;

import com.example.nasaapod.dto.ApodResponse;
import com.example.nasaapod.service.ApodService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apod")
public class ApodController {

    private final ApodService apodService;

    public ApodController(ApodService apodService) {
        this.apodService = apodService;
    }

    @GetMapping("/today")
    public ApodResponse getTodayApod() {
        return apodService.getTodayApod();
    }

    @GetMapping
    public ApodResponse getApodByDate(@RequestParam String date) {
        return apodService.getApodByDate(date);
    }

    @GetMapping("/recent")
    public List<ApodResponse> getRecentApods(@RequestParam(defaultValue = "10") int days) {
        return apodService.getRecentApods(days);
    }
}
