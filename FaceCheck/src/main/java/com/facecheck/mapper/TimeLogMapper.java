package com.facecheck.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;
import java.util.Map;

@Mapper
public interface TimeLogMapper {

    @Select("""
        WITH RECURSIVE hours AS (
            SELECT 0 AS hour
            UNION ALL
            SELECT hour + 1 FROM hours WHERE hour < 23
        )
        SELECT h.hour, COALESCE(COUNT(l.log_time), 0) AS count
        FROM hours h
        LEFT JOIN log_info l ON HOUR(l.log_time) = h.hour
        AND DATE(l.log_time) = CURDATE()  -- 오늘 날짜로 변경
        GROUP BY h.hour
        ORDER BY h.hour
    """)
    List<Map<String, Object>> getTimeLogData();
}