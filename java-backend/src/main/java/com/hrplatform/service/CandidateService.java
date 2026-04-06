package com.hrplatform.service;

import com.hrplatform.model.Candidate;
import com.hrplatform.model.Skill;
import com.hrplatform.repository.CandidateRepository;
import com.hrplatform.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {
    private final CandidateRepository candidateRepo;
    private final SkillRepository skillRepo;

    public CandidateService(CandidateRepository candidateRepo, SkillRepository skillRepo) {
        this.candidateRepo = candidateRepo;
        this.skillRepo = skillRepo;
    }

    public Candidate addCandidate(Candidate candidate) {
        // ispis u konzolu cisto radi provere
        System.out.println("Dodajem novog kandidata: " + candidate.getFullName());
        return candidateRepo.save(candidate);
    }

    public Skill addSkill(Skill skill) {
        return skillRepo.save(skill);
    }

    public Candidate addSkillToCandidate(Long candidateId, Long skillId) {
        Candidate candidate = candidateRepo.findById(candidateId).orElseThrow();
        Skill skill = skillRepo.findById(skillId).orElseThrow();
        candidate.getSkills().add(skill);
        return candidateRepo.save(candidate);
    }

    public Candidate removeSkillFromCandidate(Long candidateId, Long skillId) {
        Candidate candidate = candidateRepo.findById(candidateId).orElseThrow();
        Skill skill = skillRepo.findById(skillId).orElseThrow();
        candidate.getSkills().remove(skill);
        return candidateRepo.save(candidate);
    }

    public void removeCandidate(Long candidateId) {
        candidateRepo.deleteById(candidateId);
    }

    // pretraga po imenu (ignorise velika i mala slova)
    public List<Candidate> searchByName(String name) {
        return candidateRepo.findByFullNameContainingIgnoreCase(name);
    }

    public List<Candidate> searchBySkills(List<String> skills) {
        return candidateRepo.findBySkills_NameIn(skills);
    }
    
    public List<Candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }
    
    public List<Skill> getAllSkills() {
        return skillRepo.findAll();
    }
}
