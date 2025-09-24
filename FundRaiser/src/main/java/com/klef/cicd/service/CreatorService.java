package com.klef.cicd.service;

import java.util.List;

import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.Campaign;
import com.klef.cicd.model.Creator;

public interface CreatorService 
{
  public Creator checkcreatorlogin(String username, String password);
  
  public String addcampaign(Campaign campaign);
  
  public List<Campaign> viewcampaignsbycreator(int cid);
  
  public Creator getCreatorById(int cid);
  
  public List<BookCampaign> getbookingsbyCreator(int cid);
  
  public String updatebookingstatus(int id, String status);
}
