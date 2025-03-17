package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.facecheck.entity.Employee;

@Mapper
public interface EmployeeMapper {

	@Select("SELECT * FROM emp_info")
	List<Employee> empselect();

	
	// emp_num의 개수를 카운트하는 메서드
    @Select("SELECT COUNT(emp_num) FROM emp_info")
    int countEmpNum();


	

	@Delete("DELETE FROM emp_info WHERE emp_num = #{emp_num}")
	    void delete(String emp_num);


	@Update("UPDATE emp_info SET emp_name = #{emp_name}, dept = #{dept}, emp_birthdate = #{emp_birthdate}, emp_phone = #{emp_phone} WHERE emp_num = #{emp_num}")
	int update(Employee emp);


	@Insert("INSERT INTO emp_info (emp_num, dept, emp_name, emp_birthdate, emp_phone) " +
	        "VALUES (#{emp_num}, #{dept}, #{emp_name}, #{emp_birthdate}, #{emp_phone})")
	void insert(Employee emp);


	
}
