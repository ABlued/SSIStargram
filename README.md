# :rice_scene: 모바일SNS커뮤니티 씨 Stargram 
  
##### 안녕하세요 ABlued입니다.  
##### react, redux, firebase를 사용한 인스타그램 모티브로 한 씨Stargram 대해 소개해드리겠습니다.
  
  
  
  
:clipboard: 프로젝트 개요
---

프로젝트 목적 : redux-action, immer를 적극활용 및 firebase auth, realtimebase, storage를 배운 내용 토대로 앱을 설계한 후 firebase 호스팅으로 마무리
  
참여자 : ABlued  
  
사용 스택 : HTML, styled-component, JavaScript, React, redux-acion, immer  
  
사용 DB : Firebase  
  
호스팅 : Firebase Hosting
  
작업 환경 : VSCode  
  


  
:wave: 홈페이지 소개
---

##### [프로젝트를 직접 보고 싶다면?(모바일 환경 권장)](https://image-community-86bc5.firebaseapp.com/)
  
##### 홈페이지 화면 구성
  

##### 메인 화면 로그아웃 시
  
  
![메인 화면(로그아웃시)](https://user-images.githubusercontent.com/53801395/128294499-9e97adba-9747-4ca4-b6bd-1ef6eb832a3a.jpg)
  

##### 회원가입 화면  
  

![회원가입 화면](https://user-images.githubusercontent.com/53801395/128294500-fdda2563-b831-4f8b-bd12-97a293c1e75e.jpg)
  

##### 로그인 화면  
  
    
![로그인 화면](https://user-images.githubusercontent.com/53801395/128294503-a705db62-abc3-4ae5-bb96-654d62d5e5a1.jpg)
  
  
##### 메인 화면 로그인 시  
  
알림 : 평소에는 알림이 off상태로 있지만 다른 사람이 내 게시물에 댓글을 달게 되면 실시간으로 알림이 on상태로 되어 사용자에게 알린다.  
  

![메인 화면 (로그인 시)](https://user-images.githubusercontent.com/53801395/128294486-1a5e24ea-c633-4447-b5cc-f8089156bb00.jpg)
  

##### 게시물화면  
  
  
![게시물화면](https://user-images.githubusercontent.com/53801395/128294506-8d2291e7-8f6c-4b94-aff0-316ac51c6817.jpg)
  
    
##### 알림  
  
알림on상태 : 알림창에 들어오게 되면 알림은 off상태가 된다.
알림 게시물 : 새로운 댓글이 올라간 게시물 사진과 댓글을 올린 사람의 이름이 같이 나온다. 게시물을 클릭하면 해당 게시물로 이동된다.
  

![알림](https://user-images.githubusercontent.com/53801395/128295094-c2891b41-4766-4993-85f3-e7ba21062e25.jpg)

  
    
##### 업로드화면  
  
  
![업로드화면](https://user-images.githubusercontent.com/53801395/128294496-55b5d12f-b5d1-46ba-a540-1e91f9ab3e69.jpg)

  
  
  
:books: 주로 쓰인 개념들 
---

+ styled-component
    + 변수 및 props 활용, Nesting

+ React
    + redux, redux-thunk, redux-action, immer, redux-logger, 

+ Firebase
    + Data CRUD API, Authentication, Firestore, Realtime DataBase, Storage, Hosting
  
  
:exclamation: 느낀 점
---
  
  
  
##### 느낀 점
  
  
  
##### 돌아가는 코드를 만드는 것도 중요하지만 최적화 또한 필수이다.
  
   
아무리 기능이 다양하더라도 성능이 떨어지면 사용자는 불편해서 사용하지 않는다.
  
웹사이트를 최적화하는 방법은 여러 가지이다.
  
로딩 속도를 줄이기 위해 서버에서 필요한 데이터만 요청하거나, 데이터를 중복으로 요청하지 않는 방법
  
또한 자주 사용되는 서버의 데이터는 세션이나 쿠키에 넣는 것도 좋은 방법일 수 있다.
  
또한 속도뿐만이 아니라 UI 효과를 주어서 사용자의 불편함을 해소할 수도 있다.
  
오래 걸리는 비동기 작업은 스피너를 띄워주는 방법
  
또한 작게 사용되는 이미지 크기도 최대한 작게 한다.
  
크기가 작을수록 용량도 적으므로 로딩 속도를 더 빠르게 해 준다.
  
![캐릭터사진](https://user-images.githubusercontent.com/53801395/128295792-d88f2e39-4ee5-4619-b175-1c65ec263da8.png)
프로필 사진 크기는 클 필요가 없어 파워포인트안에서 사진들을 줄인 후 firebase 스토리지에 넣었다.
  
  
##### 최대한 사용자 입장에서 생각해야 한다.
  
![피드백](https://user-images.githubusercontent.com/53801395/128295801-f2289438-091b-48cd-b370-567a4a189646.png)
     
  
나는 당연하다고 생각된 것들이 사용자 입장에서는 아닐 수 있다.
  
특히 이번 프로젝트를 통해 내가 간과하고 있다는 것들이 많았다.
  
그래서 내린 결론은
  
내가 만든 사이트를 6,7살 아이들한테도 쉽게 사용할 수 있게 만든다고 
  
생각하면서 코딩하는 것이 좋다.