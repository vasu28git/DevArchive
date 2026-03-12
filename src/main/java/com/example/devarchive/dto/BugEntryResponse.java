package com.example.devarchive.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BugEntryResponse {
    private Long bugId;
    private String errorText;
    private String solutionText;
    private String programmingLanguage;
    private String errorStackTrace;
    private String tags;
    private List<String> tagNames;
    private String topic;
    private String userEmail;
}
