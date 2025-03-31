## 📷 FaceCheck : 실전프로젝트

![Image](https://github.com/user-attachments/assets/98c10205-b803-47da-b76a-a989228ee088)

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
      <td align="center"><img src="https://github.com/user-attachments/assets/51fafb40-df6e-46c5-98b1-627732e66ca6"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/aa26297b-b0c1-4f54-8f64-51c32d0254ce"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/a079c344-57b2-4749-853d-ca88f53b70ca"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/47d9d46c-0035-44e3-ade5-6ca2643aba6f"width="150" height="200"/></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/b920227a-cbd4-488a-b757-bf7358726ab6"width="150" height="200"/></td>
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

https://github.com/user-attachments/assets/91aedef2-7fd4-40f6-88b6-0e0a48421e42


## 🗓프로젝트 기간

| 구분               | 기간                                         |
|--------------------|----------------------------------------------|
| **계획 / 분석 / 설계** | 25. 02. 11 ~ 25. 03. 04                   |
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

## 📊 데이터 출처 및 구성

본 프로젝트에서는 **얼굴 인식 기반 출입 시스템 개발**을 위해 다양한 출처에서 수집된 얼굴 이미지를 사용하였습니다.

| 출처 | 설명 |
|------|------|
| 🧠 **AI Hub - 얼굴 이미지 데이터셋** | 한국정보화진흥원이 공개한 공공 데이터로, 다양한 연령대·표정·각도 등의 얼굴 이미지 포함 |
| 🌍 **Kaggle - 얼굴 인식용 데이터셋** | 비상업적 사용이 가능한 Kaggle의 얼굴 이미지 데이터셋 활용 (예: LFW, VGGFace 등) |
| 🧑‍💻 **직접 촬영한 이미지** | 교육생 및 팀원들이 직접 촬영한 고유 얼굴 이미지. 등록 및 출입 테스트용으로 활용 |
| 🏫 **스마트인재개발원 제공 이미지** | 교육 실습용으로 제공된 학습 이미지. 내부 프로젝트에 한해 사용 |

## 📁 데이터 구성 및 형식

- **이미지 포맷**: `.jpg`, `.png`  
- **총 이미지 수**: 외국인 1600장 + 한국인 1100장 = 2700장 
- **디렉토리 구조**: /dataset ├── 1111/ (사용자 사번) │ ├── 1111.jpg

**- **라벨링 기준**: 폴더명(사번)을 기준으로 자동 라벨링

## 🧹 데이터 전처리

- 얼굴 이미지 정규화 및 (244x244 resize)
- OpenCV 기반 얼굴 정렬 및 crop 처리
- ArcFace 임베딩 추출을 위한 전처리 적용
- 학습/등록/실시간 테스트 데이터 구분 저장

## 🧪 사용 목적 및 적용

- ArcFace 임베딩 학습 및 유사도 기반 비교 검증
- 출입 요청자와 등록 사용자의 **코사인 유사도 비교**
- 관리자 페이지에 **WebSocket 기반 실시간 알림 전송**
- 출입 성공/실패 로그 및 이미지 DB 저장 기능 구현

## ⚠️ 유의사항

- 모든 데이터는 비상업적 연구 및 교육 목적에 한해 사용됩니다.
- 직접 촬영한 이미지의 경우 사전 동의를 받은 후 내부 프로젝트에만 사용되었으며, 외부로 공개되지 않습니다.
- AI Hub 및 Kaggle 데이터는 각 사이트의 라이선스 조건을 준수하여 활용하였습니다.
**



## 📚주요 기능
**1. 출입 성공 및 실패**
- 비인가자가 출입을 시도할 시 인식 실패 알림이 띄어짐
- 등록된 사용자가 출입을 시도할 시 인증 성공 알림이 띄어짐
 <table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/bdedc65f-9305-43f0-b5d7-a858ad3b4c1e" width="450" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1047b970-7a8a-4a74-8abe-07b2d2ab9f79" width="450" /> 
    </td>
  </tr>
</table>
  
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
**🖼️ 1. 이미지 전송 실패**

<table> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/cc28fcb8-33d7-4327-afcc-cdb8e0f8ee22" width="500"/> </td> </tr> </table>

**문제 :** 브라우저에서 여러 장의 사진을 찍고 전송 시, 이미지가 서버에 도달하지 않음

**원인 :** 라우저에서는 이미지를 Base64 형식으로 전송했지만, 서버에서는 이를 실제 MultipartFile로 인식하지 못해 에러 발생

**해결 :** Base64 → Blob → File 변환 후 FormData.append()를 사용하여 실제 이미지 파일처럼 전송하도록 수정 → 서버에서 정상 수신 ✅



**🧪 2. Train/Test/Validation 값 문제**

<table> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/255ec0ef-631b-4586-8ee2-edf15e983097" width="500"  height="300"/> </td> </tr> </table>

- **문제 :** ArcFace 모델 학습 시 Accuracy가 비정상적으로 낮게 출력됨

- **원인 :** train.json, valid.json, test.json에 저장된 라벨 값이 string 타입이라 학습 과정에서 클래스 분류가 정상적으로 동작하지 않음

- **해결 :** 라벨 값을 string → int 타입으로 변환 후 재학습 → Accuracy가 정상적으로 측정됨 ✅


## 📉 향후 확장 계획
1. 실시간 성능 최적화
2. AI 모델 정확도 향상
3. 모바일 앱/기기 연동

## 💝 감사의 말씀

"지금까지 The Chill팀 프로젝트를 끝까지 함께 해준 팀원들 모두 고생하셨고 진심으로 감사드립니다.🫶"


