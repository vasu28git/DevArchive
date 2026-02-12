package com.example.devarchive.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.devarchive.dto.BugEntryRequest;
import com.example.devarchive.dto.BugEntryResponse;
import com.example.devarchive.service.BugEntryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/errors")
public class BugEntryController {

    private final BugEntryService bugEntryService;

    public BugEntryController(BugEntryService bugEntryService) {
        this.bugEntryService = bugEntryService;
    }

    @PostMapping("/add_error")
    public ResponseEntity<BugEntryResponse> addError(@Valid @RequestBody BugEntryRequest request) {
        return ResponseEntity.ok(bugEntryService.createBugEntry(request));
    }

    @GetMapping("/get_errors")
    public ResponseEntity<List<BugEntryResponse>> getErrors() {
        return ResponseEntity.ok(bugEntryService.getMyBugEntries());
    }

    @GetMapping("/get_error/{id}")
    public ResponseEntity<BugEntryResponse> getError(@PathVariable Long id) {
        return ResponseEntity.ok(bugEntryService.getBugEntryById(id));
    }

    @PutMapping("/update_error/{id}")
    public ResponseEntity<BugEntryResponse> updateError(@PathVariable Long id, @Valid @RequestBody BugEntryRequest request) {
        return ResponseEntity.ok(bugEntryService.updateBugEntry(id, request));
    }

    @DeleteMapping("/delete_error/{id}")
    public ResponseEntity<String> deleteError(@PathVariable Long id) {
        bugEntryService.deleteBugEntry(id);
        return ResponseEntity.ok("Bug entry deleted successfully");
    }

        @GetMapping("/search/topic/{topic}")
    public ResponseEntity<List<BugEntryResponse>> searchByTopic(@PathVariable String topic) {
        return ResponseEntity.ok(bugEntryService.searchByTopic(topic));
    }

    @GetMapping("/search/language/{language}")
    public ResponseEntity<List<BugEntryResponse>> searchByLanguage(@PathVariable String language) {
        return ResponseEntity.ok(bugEntryService.searchByLanguage(language));
    }

    @GetMapping("/search/tag/{tag}")
    public ResponseEntity<List<BugEntryResponse>> searchByTag(@PathVariable String tag) {
        return ResponseEntity.ok(bugEntryService.searchByTag(tag));
}

}
