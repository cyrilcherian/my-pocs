package com.order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages="com.order")
public class DemoApplication {

	public static void main(String[] args) {
		System.getProperties().put( "server.port", 8183 );
		SpringApplication.run(DemoApplication.class, args);
	}
}
