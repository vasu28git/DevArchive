package com.example.devarchive.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BugEntryRequest {
    @NotBlank(message = "Error text cannot be empty")
    private String errorText;

    @NotBlank(message = "Solution text cannot be empty")
    private String solutionText;

    @NotBlank(message = "Programming language cannot be empty")
    private String programmingLanguage;

    private String errorStackTrace;

    // Legacy comma-separated tags field (kept for backward compatibility)
    private String tags;

    // New structured tag names list
    private List<String> tagNames;

    private String topic;
}
