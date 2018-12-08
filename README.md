# 바운티 지급

### Open Project

오픈소스 등  프로젝트

#### 채택 비용

#### 보팅 비용



### Organization Project

기관 프로젝트

#### 채택 비용

#### 보팅 비용



# API

### 계정 관련
1. `POST` 로그인 `/account/login`

   - **REQUEST**
     - username : string
     - password : string
   - **RESPONSE**
     - status : true / false
     - message : string

2. `POST` 회원가입 `/account/register`

   - **REQUEST**
     - fullname : string
     - nickname : string
     - email : string
     - username : string
     - password : string
     - contract address : string
   - **RESPONSE**
     - status : true / false
     - message : string

3. `POST` 아이디 찾기 `/account/find_username`

   - **REQUEST**
     - email : string
   - **RESPONSE**
     - status : true / false
     - message : string

4. `POST` 비밀번호 찾기 `/account/find_password`

   - **REQUEST**
     - email : string
   - **RESPONSE**
     - status : true / false
     - message : string

5. `POST` 비밀번호 찾기 2단계 `/account/find_password/<엄청 긴 교유한 키 값을 가진 해시>`

   - **REQUEST**
     - password
     - password_check
   - **RESPONSE**
     - status : true / false
     - message : string

6. `get` 정보 열람 `/profile/<username>`

   - **REQUEST**

     - NULL

   - **RESPONSE**

     - status : true / false

     - data : object

       - nickname : string

       - biograph : string

       - username : string

       - projects ( timestamp unit : ms, bounty unit : cony ) : array

         - ownProject : object
           - _id : string
           - url : string
           - project : string
           - description : string
           - bounty : integer
           - src : string
           - dest : string
           - openstamp : integer
           - closestamp : integer
           - isOpensource : boolean
         - inProject : object
           - _id : string
           - url : string
           - project : string
           - description : string
           - bounty : integer
           - src : string
           - dest : string
           - openstamp : integer
           - closestamp : integer
           - isOpensource : boolean

       - heatmap : object *<u>// 잔디밭 날짜별로 0에서 5까지, 최신 365개</u>*

         - date : string
         - weight : integer

         **example**

         ```
         {
           "2018-01-01" : 1,
           "2018-01-02" : 0,
           "2018-01-03" : 3,
           "2018-01-04" : 2,
         }
         ```

7. 내 정보 열람 `/profile` : `6. 정보 열람` 참고

   - fullname
   - biograph
   - nickname
   - Username
   - Contract address
   - heatmap

8. 프로젝트 목록

9. 

### 프로젝트 관련
1. 프로젝트 생성
2. 프로젝트 열람
3. 프로젝트 수정
4. 프로젝트 삭제
5. 바운티 지급
 - 바운티 버튼 클릭시
 - 


### 번역
1. 번역 문장 제출
2. 번역 문장 삭제
3. 번역 문장 투표
4. 번역 문장 검색
5. 

## 

### 프로젝트 