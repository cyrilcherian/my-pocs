package com.product;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages="com.product")
public class DemoApplication {

	public static void main(String[] args) {
		System.getProperties().put( "server.port", 8181 );
		SpringApplication.run(DemoApplication.class, args);
	}
}
