package com.gmail.kangjideok.sogong.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/sample")
public class SampleController {
    @GetMapping("/user")
    public List<String> user(){
        return Arrays.asList("문자열1", "문자열2 입력", "문자열3");
    }
}