package com.facecheck.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
@Mapper
public interface RecordMapper {
	@Select("SELECT DATE(log_time) AS date, COUNT(*) AS count FROM log_info " +
            "WHERE log_time >= DATE_SUB(CURDATE(), INTERVAL 5 DAY) " +
            "GROUP BY DATE(log_time)")
    List<Map<String, Object>> getEmployeeAccessCount();

    @Select("SELECT DATE(created_at) AS date, COUNT(*) AS count FROM guest_info " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 5 DAY) " +
            "GROUP BY DATE(created_at)")
    List<Map<String, Object>> getGuestAccessCount();
}
