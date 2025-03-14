package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;

@Mapper
public interface RecodeMapper {

	@Select("SELECT * FROM emp_info AS e INNER JOIN log_info AS l ON e.emp_num = l.emp_num")
	List<recode> recselect();
}
