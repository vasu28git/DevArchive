package com.example.devarchive.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.devarchive.entity.Tag;
import com.example.devarchive.repository.TagRepository;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    /**
     * Find an existing tag or create a new one.
     * Tag names are normalized to lowercase and trimmed.
     */
    @Transactional
    public Tag findOrCreateTag(String tagName) {
        if (tagName == null || tagName.trim().isEmpty()) {
            return null;
        }
        
        String normalizedName = tagName.toLowerCase().trim();
        
        return tagRepository.findByName(normalizedName)
                .orElseGet(() -> tagRepository.save(new Tag(normalizedName)));
    }

    /**
     * Find or create multiple tags from a list of tag names.
     */
    @Transactional
    public Set<Tag> findOrCreateTags(List<String> tagNames) {
        if (tagNames == null || tagNames.isEmpty()) {
            return new HashSet<>();
        }
        
        return tagNames.stream()
                .filter(name -> name != null && !name.trim().isEmpty())
                .map(this::findOrCreateTag)
                .collect(Collectors.toSet());
    }

    /**
     * Parse comma-separated tags string and find or create tags.
     */
    @Transactional
    public Set<Tag> parseAndFindOrCreateTags(String commaSeparatedTags) {
        if (commaSeparatedTags == null || commaSeparatedTags.trim().isEmpty()) {
            return new HashSet<>();
        }
        
        String[] tagArray = commaSeparatedTags.split(",");
        Set<Tag> tags = new HashSet<>();
        
        for (String tagName : tagArray) {
            Tag tag = findOrCreateTag(tagName);
            if (tag != null) {
                tags.add(tag);
            }
        }
        
        return tags;
    }

    /**
     * Convert a Set of Tags to a comma-separated string.
     */
    public String tagsToString(Set<Tag> tags) {
        if (tags == null || tags.isEmpty()) {
            return null;
        }
        
        return tags.stream()
                .map(Tag::getName)
                .sorted()
                .collect(Collectors.joining(","));
    }

    /**
     * Convert a Set of Tags to a List of tag names.
     */
    public List<String> tagsToList(Set<Tag> tags) {
        if (tags == null || tags.isEmpty()) {
            return List.of();
        }
        
        return tags.stream()
                .map(Tag::getName)
                .sorted()
                .collect(Collectors.toList());
    }

    /**
     * Get all available tags.
     */
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
}
