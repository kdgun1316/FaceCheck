## 📷 FaceCheck : 실전프로젝트

![image](https://github.com/user-attachments/assets/1bda2da5-c845-4334-b391-ee1fdeb1bb5e)

## 📃 프로젝트 소개
**주제 : ArcFace 모델을 활용한 출입 관리 시스템**

스마트인재개발원 빅데이터 분석 서비스 개발자 과정 실전 프로젝트로 기업의 멘토링을 받아 개발하였습니다.

- **ArcFace 기반 Custom 모델**을 활영하여 높은 정확도와 신뢰성 확보
- **YOLOv8** 모델과의 결합을 통해 얼굴 영역을 실시간으로 탐지 후 인식 수행
- 출입 시 실시간으로 촬영된 이미지와 등록된 얼굴 **벡터 간의 코사인 유사도** 비교를 통해 인증 여부를 판단
- 미등록 사용자의 접근 시, **WebSocket 기반 관리자 페이지에 실시간 팝업 알림 전송**

## 🧑‍🤝‍🧑팀원 소개


<table>
  <tbody>
    <tr>
      <th align="center"> 임수민 </th>
      <th align="center"> 박용우 </th>
      <th align="center"> 김현만 </th>
      <th align="center"> 김동건 </th>
      <th align="center"> 문가영 </th>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/user-attachments/assets/47d9d46c-0035-44e3-ade5-6ca2643aba6f"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/47d9d46c-0035-44e3-ade5-6ca2643aba6f"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/47d9d46c-0035-44e3-ade5-6ca2643aba6f"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/47d9d46c-0035-44e3-ade5-6ca2643aba6f"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/47d9d46c-0035-44e3-ade5-6ca2643aba6f"width="150" height="200"/></td>
    </tr>
    <tr>
       <td align="center"><a href="#"></a></td>
       <td align="center"><a href="#"></a></td>
       <td align="center"><a href="#"></a></td>
       <td align="center"><a href="https://github.com/kdgun1316">@kdgun1316</a></td>
       <td align="center"><a href="#"></a></td> 
    </tr> 
    <tr>
      <td align="center">PM & Modeling</td>
      <td align="center">Modeling & Back-end</td>
      <td align="center">Modeling</td>
      <td align="center">Back-end & Front-end</td>
      <td align="center">Back-end & Front-end</td>
    </tr>
  </tbody>
</table>


## 🎥시연 영상

영상넣기


## 🗓프로젝트 기간

| 구분               | 기간                                         |
|--------------------|----------------------------------------------|
| **계획 / 분석 / 설계** | 25. 03. 04 ~ 25. 03. 25                   |
| **구현**               | 25. 03. 04 ~ 25. 03. 25                   |

## 🔨 사용기술
✔**Back-end**

![](https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white)
![](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white)
![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white)
![](https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

✔**Front-end**

![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)

✔ **AI Model / Machine Learning**  

![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white)
![](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=PyTorch&logoColor=white)
![](https://img.shields.io/badge/ArcFace-2D9BF0?style=for-the-badge&logo=faceit&logoColor=white)
![](https://img.shields.io/badge/YOLOv8-FF8C00?style=for-the-badge&logo=yolo&logoColor=white)

✔**Database**

![](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white)

## 🏷E-R Diagram
![Image](https://github.com/user-attachments/assets/b4c0c6c0-a82b-46e8-bca0-5fbd63b7021a)


## DataSet
데이터 출처, 전처리, 라벨 등 내용추가 이미지 및 표 활용해서 내용추가


## 📚주요 기능
**1. ai관련내용용**
- ai관련내용
- ai관련내용

  
**2. WebSocket 기반 실시간 관리자 알림 시스템**
- 출입 인식 결과(성공/실패)를 **Spring Boot ↔ htmp로 실시간 전송**
- 인식 실패 시 **경고 메시지 + DB 로그 자동 저장**
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/21a25aed-21a3-47e8-b3b1-59ede24492d2" width="450" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1c6f8ffc-b4e2-4ae6-b7ea-a6e05053b91d" width="450" /> 
    </td>
  </tr>
</table>


## ⚒ 트러블슈팅 & 기술구현
**1. 이미지 전송 실패**

**문제 :** 브라우저에서 여러 장의 사진을 찍고 전송 시 이미지가 전송되지 않음

**원인 :** 브라우저에서 촬영한 이미지를 Base64 형식으로 바로 서버에 전송하려 했지만, 서버는 이를 파일 데이터로 인식하지 못해 처리 불가.

**해결 :** Base64 → Blob → File로 변환 후 FormData.append()를 사용해 실제 이미지 파일처럼 전송하여 서버에서 MultipartFile로 정상 수신되도록 처리



**2. train, test, validation 값 문제**

**문제 :** ArcFace 모델을 학습시켰으나 Accuracy가 비정상적으로 낮게 측정됨.

**원인 :** 학습에 사용된 DataSet.json, Train.json, Valid.json, Test.json 파일에서 라벨(Label) 값이 int가 아니라 string 형태로 저장되어 있었음. 즉, 데이터 라벨링이 코드에서 요구하는 형식과 맞지 않음.

**해결 :** 라벨 값을 string에서 int로 변환한 후 다시 학습을 진행한 결과, Accuracy가 정상적으로 측정됨.





