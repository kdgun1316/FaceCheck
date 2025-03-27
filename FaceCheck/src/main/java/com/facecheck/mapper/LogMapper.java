package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.facecheck.entity.Log;

@Mapper
public interface LogMapper {
//	void insertLog(Log log);
	

	List<Log> getRecentLogs();

//	void deleteLog(Long log_idx);

	void insertLog(@Param("empNum") int empNum,
            @Param("adminId") String adminId,
            @Param("empImage") byte[] empImage,
            @Param("status") String status);
	
	
	int insertLog(Log log);  // 로그 삽입용
	int deleteLog(@Param("logIdx") Long logIdx);  // 삭제용

	Log selectLogByIdx(@Param("logIdx") Long logIdx);


}
