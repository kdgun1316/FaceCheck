package com.facecheck.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Log {
	
	private Long log_idx; 
    private String log_time;  
    private int emp_num; 
    private String admin_id;  
    private String status;  
}
