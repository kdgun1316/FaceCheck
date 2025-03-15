package com.facecheck.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Employee {
	
	private int emp_num;
	private String dept;
	private String emp_name;
	private String emp_birthdate;
	private String emp_phone;
}

