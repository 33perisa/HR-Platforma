package com.hrplatform.repository;

import com.hrplatform.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    Skill findByName(String name);
}
