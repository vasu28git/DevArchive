package com.example.devarchive.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bug_entries")
public class BugEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bug_id")
    private Long bugId;

    @Column(name = "error_text", columnDefinition = "LONGTEXT", nullable = false)
    private String errorText;

    @Column(name = "solution_text", columnDefinition = "LONGTEXT", nullable = false)
    private String solutionText;

    @Column(name = "programming_language", nullable = false)
    private String programmingLanguage;

    @Column(name = "error_stack_trace", columnDefinition = "LONGTEXT", nullable = false)
    private String errorStackTrace;

    @Column(name = "tags", length = 255)
    private String tags;

    @Column(name = "topic", length = 255)
    private String topic;

    @ManyToOne
    @JoinColumn(
        name = "user_id",
        referencedColumnName = "user_id",
        nullable = false
    )
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "bug_entry_tags",
        joinColumns = @JoinColumn(name = "bug_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tagSet = new HashSet<>();
}
