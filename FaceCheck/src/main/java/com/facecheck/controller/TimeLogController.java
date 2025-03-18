package com.facecheck.controller;

import com.facecheck.service.TimeLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TimeLogController {

    @Autowired
    private TimeLogService timeLogService;

    @GetMapping("/getTimeLogData")
    public List<Map<String, Object>> getTimeLogData() {
        return timeLogService.getTimeLogData();
    }
}
