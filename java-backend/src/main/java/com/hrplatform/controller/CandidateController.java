package com.hrplatform.controller;

import com.hrplatform.model.Candidate;
import com.hrplatform.model.Skill;
import com.hrplatform.service.CandidateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CandidateController {

    private final CandidateService service;

    public CandidateController(CandidateService service) {
        this.service = service;
    }

    @PostMapping("/candidates")
    public Candidate addCandidate(@RequestBody Candidate candidate) {
        // pozivamo servis za cuvanje u bazu
        return service.addCandidate(candidate);
    }

    @PostMapping("/skills")
    public Skill addSkill(@RequestBody Skill skill) {
        return service.addSkill(skill);
    }

    @PutMapping("/candidates/{candidateId}/skills/{skillId}")
    public Candidate addSkillToCandidate(@PathVariable Long candidateId, @PathVariable Long skillId) {
        return service.addSkillToCandidate(candidateId, skillId);
    }

    @DeleteMapping("/candidates/{candidateId}/skills/{skillId}")
    public Candidate removeSkillFromCandidate(@PathVariable Long candidateId, @PathVariable Long skillId) {
        return service.removeSkillFromCandidate(candidateId, skillId);
    }

    @DeleteMapping("/candidates/{candidateId}")
    public void removeCandidate(@PathVariable Long candidateId) {
        service.removeCandidate(candidateId);
    }

    @GetMapping("/candidates/search")
    public List<Candidate> searchByName(@RequestParam String name) {
        return service.searchByName(name);
    }

    @GetMapping("/candidates/search/skills")
    public List<Candidate> searchBySkills(@RequestParam List<String> skills) {
        return service.searchBySkills(skills);
    }

    @GetMapping("/candidates")
    public List<Candidate> getAllCandidates() {
        return service.getAllCandidates();
    }

    @GetMapping("/skills")
    public List<Skill> getAllSkills() {
        return service.getAllSkills();
    }
}
