package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Employee;

@Mapper
public interface EmployeeMapper {

	@Select("SELECT * FROM emp_info")
	List<Employee> empselect();
	
	// ✅ 사용자 수 가져오는 쿼리 (대시보드 사용자 수 표시)
	@Select("SELECT COUNT(emp_num) FROM emp_info")
    int getUserCount();
	

	
}
