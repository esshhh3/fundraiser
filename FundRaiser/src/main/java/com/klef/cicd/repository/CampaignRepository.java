package com.klef.cicd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.klef.cicd.model.Campaign;
import com.klef.cicd.model.Creator;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Integer>
{
    public List<Campaign> findByCreator(Creator creator);
    
    @Query("select count(c) from Campaign c")
    public long campaigncount();
}
