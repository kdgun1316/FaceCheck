package com.facecheck.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;
import java.util.Map;

@Mapper
public interface DeptLogMapper {

    @Select("""
        SELECT e.dept AS department, COUNT(l.log_time) AS count
        FROM emp_info e
        LEFT JOIN log_info l ON e.emp_num = l.emp_num
        AND DATE(l.log_time) = CURDATE() - INTERVAL 1 DAY
        GROUP BY e.dept
        ORDER BY count DESC
    """)
    List<Map<String, Object>> getDeptLogData();
}
