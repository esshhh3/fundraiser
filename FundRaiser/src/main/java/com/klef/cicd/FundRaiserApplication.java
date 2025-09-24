package com.klef.cicd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FundRaiserApplication {

	public static void main(String[] args) {
		SpringApplication.run(FundRaiserApplication.class, args);
		System.out.println("My Project is running");
	}

}
