package com.klef.cicd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.klef.cicd.model.Creator;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Integer>
{
  public Creator findByUsernameAndPassword(String username, String password);
  
  @Query("select count(c) from Creator c")
  public long creatorcount();
}
