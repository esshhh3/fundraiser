package com.klef.cicd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.Campaign;
import com.klef.cicd.model.Creator;
import com.klef.cicd.repository.BookCampaignRepository;
import com.klef.cicd.repository.CampaignRepository;
import com.klef.cicd.repository.CreatorRepository;

@Service
public class CreatorServiceImpl implements CreatorService
{
	@Autowired
    private CreatorRepository creatorRepository;
	
	@Autowired
    private CampaignRepository campaignRepository;
	
	@Autowired
	private BookCampaignRepository bookCampaignRepository;
	
	@Override
	public Creator checkcreatorlogin(String username, String password) 
	{
		return creatorRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public String addcampaign(Campaign campaign) 
	{
		campaignRepository.save(campaign);
		return "Campaign Added Successfully";
	}

	@Override
	public Creator getCreatorById(int cid) 
	{
	   return creatorRepository.findById(cid).get();
	}

	@Override
	public List<Campaign> viewcampaignsbycreator(int cid) 
	{
		 Creator creator = creatorRepository.findById(cid).orElse(null);
		 return campaignRepository.findByCreator(creator);
	}

	@Override
	public List<BookCampaign> getbookingsbyCreator(int cid) 
	{
		return bookCampaignRepository.getbookingsbyCreator(cid);
	}

	@Override
	public String updatebookingstatus(int id, String status) 
	{
		bookCampaignRepository.updateStatusById(status, id);
		return "Booking Status Updated Successfully";
	}
}
