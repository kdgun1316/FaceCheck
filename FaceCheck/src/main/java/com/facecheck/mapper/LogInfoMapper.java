package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Log;
import com.facecheck.entity.recode;

@Mapper
public interface LogInfoMapper {
    @Select("SELECT * FROM log_info")
    List<recode> selectAllLogs();

    @Select("SELECT * FROM log_info WHERE emp_num = #{empNum}")
    List<recode> selectLogsByEmpNum(int empNum);
    
    
  
}

