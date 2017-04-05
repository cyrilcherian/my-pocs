package com.customer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages="com.customer")
public class DemoApplication {

	public static void main(String[] args) {
		System.getProperties().put( "server.port", 8182 );
		SpringApplication.run(DemoApplication.class, args);
	}
}
