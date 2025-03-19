package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.facecheck.entity.Log;

@Mapper
public interface LogMapper {
	void insertLog(Log log);

	List<Log> getRecentLogs();

	void deleteLog(Long log_idx);
}
