package com.example.nasaapod.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ApodResponse {
    private String copyright;
    private String date;
    private String explanation;
    private String hdurl;

    @JsonProperty("media_type")
    private String mediaType;

    @JsonProperty("service_version")
    private String serviceVersion;

    private String title;
    private String url;
}
