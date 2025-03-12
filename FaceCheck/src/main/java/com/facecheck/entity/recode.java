package com.facecheck.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class recode {
	private int log_idx;
    private Date log_time;
    private String emp_num;
    private String admin_id;
}
