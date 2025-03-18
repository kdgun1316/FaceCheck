package com.facecheck.controller;

import com.facecheck.service.DeptLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DeptLogController {

    @Autowired
    private DeptLogService deptLogService;

    @GetMapping("/getDeptLogData")
    public List<Map<String, Object>> getDeptLogData() {
        return deptLogService.getDeptLogData();
    }
}
