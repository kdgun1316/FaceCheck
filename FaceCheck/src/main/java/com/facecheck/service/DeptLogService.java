package com.facecheck.service;

import com.facecheck.mapper.DeptLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class DeptLogService {

    @Autowired
    private DeptLogMapper deptLogMapper;

    public List<Map<String, Object>> getDeptLogData() {
        return deptLogMapper.getDeptLogData();
    }
}
