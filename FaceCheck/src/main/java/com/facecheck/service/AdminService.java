package com.facecheck.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.entity.Log;
import com.facecheck.entity.recode;
import com.facecheck.mapper.AdminMapper;
import com.facecheck.mapper.EmployeeMapper;
import com.facecheck.mapper.LogMapper;
import com.facecheck.mapper.RecodeMapper;
import com.facecheck.mapper.RecordMapper;

@Service
public class AdminService {
	@Autowired
	private AdminMapper adminmapper;
	
	@Autowired
	private EmployeeMapper employee;
	
	@Autowired
	private RecodeMapper recode;
	
	@Autowired
    private RecordMapper recordMapper;
	
	public Map<String, Object> getDashboardData() {
	    // 최근 6일 날짜 생성
	    List<String> labels = new ArrayList<>();
	    LocalDate today = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd");
	    
	    for (int i = 5; i >= 0; i--) {
	        labels.add(today.minusDays(i).format(formatter));
	    }

	    // 직원 출입 데이터 조회
	    Map<String, Integer> employeeCounts = new HashMap<>();
	    for (Map<String, Object> row : recordMapper.getEmployeeAccessCount(5)) {  // days 값 확인
	        String date = ((java.sql.Date) row.get("date")).toLocalDate().format(formatter);
	        employeeCounts.put(date, ((Long) row.get("count")).intValue());
	    }

	    // 게스트 출입 데이터 조회
	    Map<String, Integer> guestCounts = new HashMap<>();
	    for (Map<String, Object> row : recordMapper.getGuestAccessCount(5)) {  // days 값 확인
	        String date = ((java.sql.Date) row.get("date")).toLocalDate().format(formatter);
	        guestCounts.put(date, ((Long) row.get("count")).intValue());
	    }

	    // 누락된 날짜는 0으로 채움
	    List<Integer> employeeData = new ArrayList<>();
	    List<Integer> guestData = new ArrayList<>();
	    
	    for (String label : labels) {
	        employeeData.add(employeeCounts.getOrDefault(label, 0));
	        guestData.add(guestCounts.getOrDefault(label, 0));
	    }

	    // 응답 데이터 구성
	    Map<String, Object> response = new HashMap<>();
	    response.put("labels", labels);
	    response.put("datasets", Arrays.asList(
	        new HashMap<String, Object>() {{
	            put("label", "직원");
	            put("data", employeeData);
	            put("backgroundColor", "#4CAF50");
	            put("borderColor", "#4CAF50");
	            put("borderWidth", 1);
	        }},
	        new HashMap<String, Object>() {{
	            put("label", "게스트");
	            put("data", guestData);
	            put("backgroundColor", "#FF9800");
	            put("borderColor", "#FF9800");
	            put("borderWidth", 1);
	        }}
	    ));
	    
	    return response;
	}

	
	public Admin login(Admin admin) {
		Admin result = adminmapper.login(admin);
		return result; 
		
	}

    public List<Employee> empselect() {
        return employee.empselect();
    }


	public List<recode> recselect() {
		return recode.recselect();
	}


	public void delete(String emp_num) {
        System.out.println("🛠 Mapper에서 삭제 실행: " + emp_num);
        employee.delete(emp_num);  
	}
	
	
    // 새로 추가: emp_num의 개수를 카운트하는 메서드
    public int getEmpNumCount() {
        return employee.countEmpNum();
    }


	public int update(Employee emp) {
		int updatedRows = employee.update(emp);
        return updatedRows; 
	}


	public void insert(Employee emp) {
		
		employee.insert(emp);
		
	}


	public List<recode> logSelect(Integer empNum) {
	    return recode.logSelect(empNum);
	}
	
	
	@Autowired
	private LogMapper logMapper;
	
	
    // ✅ 로그 저장 메서드
	public void insertLog(String adminId, String status) {
        Log log = new Log();
        log.setAdmin_id("admin1");
        log.setStatus(status);
        
        String logTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        log.setLog_time(logTime);
        
        log.setEmp_num(80808); // ⚠️ 실제 프로젝트에서는 emp_num 정확히 설정 필요

        logMapper.insertLog(log);
    }

    public List<Log> getRecentLogs() {
        return logMapper.getRecentLogs();
    }

    
    public void deleteLog(Long log_idx) {
        logMapper.deleteLog(log_idx);
    }

    
    public Long insertLogWithImage(String empNum, String status, String imageUrl) {
        Log log = new Log();

        // ✅ empNum이 실패한 경우(-1)이거나 null일 때 안전 처리
        try {
            int empNumInt = Integer.parseInt(empNum);
            if (empNumInt != -1) {
                log.setEmp_num(empNumInt);  // 정상 emp_num
            } else {
                log.setEmp_num(null);       // 실패일 경우 null
            }
        } catch (Exception e) {
            log.setEmp_num(null);  // 파싱 오류 시도 안전 처리
        }

        log.setStatus(status);
        log.setLog_time(null); // DB에서 NOW()로 처리
        log.setAdmin_id("admin1");

        // ✅ 이미지 경로 → byte[] 변환해서 저장
        byte[] imageBytes = null;
        if (imageUrl != null && !imageUrl.isEmpty()) {
            imageBytes = readImageFromPath(imageUrl);
        }
        log.setEmp_image(imageBytes);

        logMapper.insertLog(log);
        return log.getLog_idx();
    }





    private byte[] readImageFromPath(String path) {
        try {
            Path imagePath = Paths.get(path);
            return Files.readAllBytes(imagePath);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


    public Log selectLogByIdx(Long logIdx) {
        return logMapper.selectLogByIdx(logIdx);
    }
	
	


	
}