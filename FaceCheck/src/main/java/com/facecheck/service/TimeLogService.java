package com.facecheck.service;

import com.facecheck.mapper.TimeLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class TimeLogService {

    @Autowired
    private TimeLogMapper timeLogMapper;

    public List<Map<String, Object>> getTimeLogData() {
        return timeLogMapper.getTimeLogData();
    }
}
