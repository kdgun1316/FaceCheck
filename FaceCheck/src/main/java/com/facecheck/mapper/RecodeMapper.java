package com.facecheck.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;

@Mapper
public interface RecodeMapper {

	@Select("SELECT * FROM emp_info AS e INNER JOIN log_info AS l ON e.emp_num = l.emp_num")
	List<recode> recselect();
	
	@Select("SELECT DATE(log_time) AS date, COUNT(*) AS count FROM log_info " +
	        "WHERE log_time >= DATE_SUB(CURDATE(), INTERVAL #{days} DAY) " +
	        "GROUP BY DATE(log_time)")
	List<Map<String, Object>> getEmployeeAccessCount(@Param("days") int days);

	@Select("SELECT DATE(created_at) AS date, COUNT(*) AS count FROM guest_info " +
	        "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL #{days} DAY) " +
	        "GROUP BY DATE(created_at)")
	List<Map<String, Object>> getGuestAccessCount(@Param("days") int days);
}
