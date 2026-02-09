package com.example.devarchive.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.devarchive.dto.BugEntryRequest;
import com.example.devarchive.dto.BugEntryResponse;
import com.example.devarchive.entity.BugEntry;
import com.example.devarchive.entity.User;
import com.example.devarchive.repository.BugEntryRepository;
import com.example.devarchive.repository.UserRepository;
import com.example.devarchive.util.SecurityUtil;

@Service
public class BugEntryService {

    private final BugEntryRepository bugEntryRepository;
    private final UserRepository userRepository;

    public BugEntryService(BugEntryRepository bugEntryRepository, UserRepository userRepository) {
        this.bugEntryRepository = bugEntryRepository;
        this.userRepository = userRepository;
    }

    public BugEntryResponse createBugEntry(BugEntryRequest request) {
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BugEntry bugEntry = new BugEntry();
        bugEntry.setErrorText(request.getErrorText());
        bugEntry.setSolutionText(request.getSolutionText());
        bugEntry.setProgrammingLanguage(request.getProgrammingLanguage());
        bugEntry.setErrorStackTrace(request.getErrorStackTrace() != null ? request.getErrorStackTrace() : "No stack trace provided");
        bugEntry.setTags(request.getTags());
        bugEntry.setTopic(request.getTopic());
        bugEntry.setUser(user);

        BugEntry saved = bugEntryRepository.save(bugEntry);
        return toResponse(saved);
    }

    public List<BugEntryResponse> getMyBugEntries() {
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bugEntryRepository.findByUser(user)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public BugEntryResponse getBugEntryById(Long bugId) {
        BugEntry bugEntry = bugEntryRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug entry not found"));

        String email = SecurityUtil.getCurrentUserEmail();
        if (!bugEntry.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized - This error does not belong to you");
        }

        return toResponse(bugEntry);
    }

    public BugEntryResponse updateBugEntry(Long bugId, BugEntryRequest request) {
        BugEntry bugEntry = bugEntryRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug entry not found"));

        String email = SecurityUtil.getCurrentUserEmail();
        if (!bugEntry.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized - This error does not belong to you");
        }

        bugEntry.setErrorText(request.getErrorText());
        bugEntry.setSolutionText(request.getSolutionText());
        bugEntry.setProgrammingLanguage(request.getProgrammingLanguage());
        if (request.getErrorStackTrace() != null) {
            bugEntry.setErrorStackTrace(request.getErrorStackTrace());
        }
        bugEntry.setTags(request.getTags());
        bugEntry.setTopic(request.getTopic());

        BugEntry updated = bugEntryRepository.save(bugEntry);
        return toResponse(updated);
    }

    public void deleteBugEntry(Long bugId) {
        BugEntry bugEntry = bugEntryRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug entry not found"));

        String email = SecurityUtil.getCurrentUserEmail();
        if (!bugEntry.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized - This error does not belong to you");
        }

        bugEntryRepository.delete(bugEntry);
    }

    private BugEntryResponse toResponse(BugEntry bugEntry) {
        BugEntryResponse response = new BugEntryResponse();
        response.setBugId(bugEntry.getBugId());
        response.setErrorText(bugEntry.getErrorText());
        response.setSolutionText(bugEntry.getSolutionText());
        response.setProgrammingLanguage(bugEntry.getProgrammingLanguage());
        response.setErrorStackTrace(bugEntry.getErrorStackTrace());
        response.setTags(bugEntry.getTags());
        response.setTopic(bugEntry.getTopic());
        response.setUserEmail(bugEntry.getUser().getEmail());
        return response;
    }
}
