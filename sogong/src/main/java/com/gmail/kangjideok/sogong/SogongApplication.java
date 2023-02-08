package com.gmail.kangjideok.sogong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // JPA 감시 어노테이션 추가
public class SogongApplication {

    public static void main(String[] args) {
        SpringApplication.run(SogongApplication.class, args);
    }

}
