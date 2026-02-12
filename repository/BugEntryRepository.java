package com.example.devarchive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.devarchive.entity.BugEntry;
import com.example.devarchive.entity.User;

@Repository
public interface BugEntryRepository extends JpaRepository<BugEntry, Long> {
    List<BugEntry> findByUser(User user);
}
