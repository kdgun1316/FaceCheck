package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Employee;

@Mapper
public interface EmployeeMapper {

	@Select("SELECT * FROM emp_info")
	List<Employee> empselect();
	
	
}
