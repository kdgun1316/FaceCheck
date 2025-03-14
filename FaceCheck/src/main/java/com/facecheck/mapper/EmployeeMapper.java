package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Employee;

@Mapper
public interface EmployeeMapper {

	@Select("SELECT * FROM emp_info")
	List<Employee> empselect();

	@Delete("DELETE FROM emp_info WHERE emp_num = #{emp_num}")
	    void delete(String emp_num); 
	
}
