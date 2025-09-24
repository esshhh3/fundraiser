package com.klef.cicd.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.Campaign;
import com.klef.cicd.model.Donor;
import com.klef.cicd.service.DonorService;

@RestController
@RequestMapping("/donor")
@CrossOrigin("*")
public class DonorController 
{
   @Autowired
   private DonorService donorService;
	
   @GetMapping("/")
   public String home()
   {
	   return "FSD CICD Project";
   }
   
   @PostMapping("/registration")
   public ResponseEntity<String> donorregistration(@RequestBody Donor donor)
   {
	   try
	   {
		  String output = donorService.donorregistration(donor);
		  return ResponseEntity.ok(output); // 200 - success
	   }
	   catch(Exception e)
	   {
		   return ResponseEntity.status(500).body("Donor Registration Failed ...");
	   }
   }
   
   @PostMapping("/checkdonorlogin")
   public ResponseEntity<?> checkdonorlogin(@RequestBody Donor donor) 
   {
       try 
       {
           Donor d = donorService.checkdonorlogin(donor.getUsername(), donor.getPassword());

           if (d != null) 
           {
               return ResponseEntity.ok(d); // if login is successful
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
   
   @PutMapping("/updateprofile")
   public ResponseEntity<String> donorupdateprofile(@RequestBody Donor donor)
   {
 	  try
 	   {
 		  System.out.println(donor.toString());
 		  String output = donorService.donorupdateprofile(donor);
 		  return ResponseEntity.ok(output);
 	   }
 	   catch(Exception e)
 	   {
 		    System.out.println(e.getMessage());
 		    return ResponseEntity.status(500).body("Failed to Update Donor ... !!"); 
 	   }
   }

   @GetMapping("/viewallcampaigns")
   public ResponseEntity<List<Campaign>> viewallcampaigns()
   {
 	 List<Campaign> campaigns = donorService.viewallcampaigns();
 	 return ResponseEntity.ok(campaigns); // 200 - success
   }
   
   @PostMapping("/bookcampaign")
   public ResponseEntity<String> bookCampaign(@RequestBody BookCampaign bookCampaign) 
   {
      try
      {
    	  int bookingId = new Random().nextInt(900000) + 100000;  // 6-digit ID
          bookCampaign.setId(bookingId);

          Donor donor = donorService.getDonorById(bookCampaign.getDonor().getId());
          Campaign campaign = donorService.getCampaignById(bookCampaign.getCampaign().getId());
         
          bookCampaign.setDonor(donor);
          bookCampaign.setCampaign(campaign);
          bookCampaign.setStatus("BOOKED");

          String output = donorService.bookcampaign(bookCampaign);

          return ResponseEntity.ok(output); // 200 - success
      }
      catch (Exception e) 
      {
    	  return ResponseEntity.status(500).body("Failed to Book a Campaign: " + e.getMessage());
	  }
   }

   @GetMapping("/bookedcampaigns/{did}")
   public ResponseEntity<List<BookCampaign>> getCampaignsByDonor(@PathVariable int did) 
   {
       List<BookCampaign> bookedcampaigns =  donorService.getbookedcampaignsByDonor(did);
   	 return ResponseEntity.ok(bookedcampaigns); // 200 - success
   }  
}
