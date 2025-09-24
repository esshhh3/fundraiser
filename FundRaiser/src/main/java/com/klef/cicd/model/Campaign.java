package com.klef.cicd.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "campaign_table")
public class Campaign 
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
  private int id;
  
  @Column(nullable = false, length = 100)
  private String category;
  
  @Column(nullable = false, length = 100)
  private String title;
  
  @Column(nullable = false, length = 500)
  private String description;
  
  @Column(nullable = false)
  private double goal;
  
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "creator_id") // Foreign key column
  private Creator creator;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public double getGoal() {
    return goal;
  }

  public void setGoal(double goal) {
    this.goal = goal;
  }

  public Creator getCreator() {
    return creator;
  }

  public void setCreator(Creator creator) {
    this.creator = creator;
  }
}
