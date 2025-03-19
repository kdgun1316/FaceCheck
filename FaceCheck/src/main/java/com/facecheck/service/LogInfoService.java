package com.facecheck.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.facecheck.entity.recode;
import com.facecheck.mapper.LogInfoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogInfoService {
    private final LogInfoMapper logInfoMapper;

    // 전체 출입 기록 조회
    public List<recode> getAllLogs() {
        return logInfoMapper.selectAllLogs();
    }

    // 특정 직원의 출입 기록 조회
    public List<recode> getLogsByEmpNum(int empNum) {
        return logInfoMapper.selectLogsByEmpNum(empNum);
    }
}

