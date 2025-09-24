package com.klef.cicd.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "bookcampaign_table")
public class BookCampaign 
{
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Donor donor;

    @Column(nullable = false)
    private String startdate;

    @Column(nullable = false)
    private String enddate;

    @Column(nullable = false)
    private int donatedmoney;

    @Column(nullable = false)
    private String status;

    // Automatically sets the booking time at record creation
    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime donatingtime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public Donor getDonor() {
        return donor;
    }

    public void setDonor(Donor donor) {
        this.donor = donor;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getEnddate() {
        return enddate;
    }

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

    public int getDonatedmoney() {
        return donatedmoney;
    }

    public void setDonatedmoney(int donatedmoney) {
        this.donatedmoney = donatedmoney;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDonatingtime() {
        return donatingtime;
    }

    public void setDonatingtime(LocalDateTime donatingtime) {
        this.donatingtime = donatingtime;
    }

	@Override
	public String toString() {
		return "BookCampaign [id=" + id + ", campaign=" + campaign + ", donor=" + donor + ", startdate=" + startdate
				+ ", enddate=" + enddate + ", donatedmoney=" + donatedmoney + ", status=" + status
				+ ", donatingtime=" + donatingtime + "]";
	}
}
