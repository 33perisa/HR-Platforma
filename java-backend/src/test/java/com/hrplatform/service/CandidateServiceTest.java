package com.hrplatform.service;

import com.hrplatform.model.Candidate;
import com.hrplatform.repository.CandidateRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CandidateServiceTest {

    @Mock
    private CandidateRepository candidateRepo;

    @InjectMocks
    private CandidateService candidateService;

    @Test
    public void testAddCandidate() {
        Candidate candidate = new Candidate();
        candidate.setFullName("John Doe");

        when(candidateRepo.save(any(Candidate.class))).thenReturn(candidate);

        Candidate savedCandidate = candidateService.addCandidate(candidate);
        assertEquals("John Doe", savedCandidate.getFullName());
        verify(candidateRepo, times(1)).save(candidate);
    }

    @Test
    public void testRemoveCandidate() {
        Long candidateId = 1L;
        doNothing().when(candidateRepo).deleteById(candidateId);
        
        candidateService.removeCandidate(candidateId);
        verify(candidateRepo, times(1)).deleteById(candidateId);
    }
}
