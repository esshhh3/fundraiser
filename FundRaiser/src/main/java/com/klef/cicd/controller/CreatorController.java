package com.klef.cicd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.cicd.dto.CampaignDTO;
import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.Campaign;
import com.klef.cicd.model.Creator;
import com.klef.cicd.service.CreatorService;

@RestController
@RequestMapping("/creator")
@CrossOrigin("*")
public class CreatorController 
{
   @Autowired
   private CreatorService creatorService;
	   
   @PostMapping("/checkcreatorlogin")
   public ResponseEntity<?> checkcreatorlogin(@RequestBody Creator creator) 
   {
       try 
       {
           Creator c = creatorService.checkcreatorlogin(creator.getUsername(), creator.getPassword());

           if (c != null) 
           {
               return ResponseEntity.ok(c); // if login is successful
           } 
           else 
           {
               return ResponseEntity.status(401).body("Invalid Username or Password"); // if login fails
           }
       } 
       catch (Exception e) 
       {
           return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
       }
   }

   @PostMapping("/addcampaign")
   public ResponseEntity<String> addcampaign(@RequestBody CampaignDTO dto) 
   {
       try 
       {
           Creator creator = creatorService.getCreatorById(dto.getCreator_id());

           Campaign campaign = new Campaign();
           campaign.setCategory(dto.getCategory());
           campaign.setTitle(dto.getTitle());
           campaign.setDescription(dto.getDescription());
           campaign.setGoal(dto.getGoal());
           campaign.setCreator(creator);

           String output = creatorService.addcampaign(campaign);
           return ResponseEntity.ok(output); // 200 - success
       } 
       catch (Exception e) 
       { 
    	   return ResponseEntity.status(500).body("Failed to Add Campaign: " + e.getMessage());
       }
   }
   
   @GetMapping("/viewcampaignsbycreator/{id}")
   public ResponseEntity<List<Campaign>> viewcampaignsbycreator(@PathVariable int id) 
   {
       List<Campaign> campaigns = creatorService.viewcampaignsbycreator(id);
       return ResponseEntity.ok(campaigns);
   }

   @GetMapping("/viewbookingsbycreator/{creatorId}")
   public ResponseEntity<List<BookCampaign>> viewBookingsByCreator(@PathVariable int creatorId) 
   { 
       List<BookCampaign> bookings = creatorService.getbookingsbyCreator(creatorId);
       return ResponseEntity.ok(bookings);
   }

   @GetMapping("/updatebookingstatus")
   public ResponseEntity<String> updateBookingStatus(@RequestParam int id, @RequestParam String status) 
   { 
       try
       {
    	   String output = creatorService.updatebookingstatus(id, status);
    	   return ResponseEntity.ok(output);
       }
       catch (Exception e) 
       {
    	   System.out.println(e.getMessage());
    	   return ResponseEntity.status(500).body("Error:" + e.getMessage());
	   }
   }
}
