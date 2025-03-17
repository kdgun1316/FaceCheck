package com.facecheck;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.facecheck.controller", "com.facecheck.service","com.facecheck.config", "com.facecheck.websocket"})
public class FaceCheckApplication {
    public static void main(String[] args) {
        SpringApplication.run(FaceCheckApplication.class, args);
    }
}
