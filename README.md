[![OPEN TRANS](http://img.youtube.com/vi/rMxO8jRsC1w/0.jpg)](http://www.youtube.com/watch?v=rMxO8jRsC1w "OPEN TRANS")

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

6. `GET` 정보 열람 `/profile/<username>`

   - **REQUEST**

     - NULL

   - **RESPONSE**

     - status : true / false

     - data : object

       - nickname : string

       - biograph : string

       - username : string

       - contract : string

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

7. `GET` 프로젝트 목록`/project/list/<username>`

   - **REQUEST**
     - NULL
   - **RESPONSE**
     - status : true / false
     - data : object ( timestamp unit : ms, bounty unit : cony )
       - _id : string
       - owner : string
       - url : string
       - project : string
       - description : string
       - bounty : integer
       - src : string
       - dest : string
       - openstamp : integer
       - closestamp : integer
       - isOpensource : boolean
       - progress : number
       - visiblity : boolean


### 프로젝트 관련
1. `POST` 프로젝트 생성 `/project/create`

   - **REQUEST**
     - project : string
     - projectUrl : string
       - 중복 불가능
     - description : string
     - isOpensource : boolean
     - bounty
       - isOpensource = true 라면 필요 없음
     - src : string
     - dest : string
     - visibility : boolean
   - **RESPONSE**
     - status : boolean
     - message : string

2. `GET` 프로젝트 열람 `/project/<projectUrl>`

   - **REQUEST**
     - NULL
   - **RESPONSE**
     - status : boolean
     - data : object
       - _id : string
       - owner : string
       - url : string
       - project : string
       - description : string
       - bounty : integer
       - src : string
       - dest : string
       - openstamp : integer
       - closestamp : integer
       - isOpensource : boolean
       - progress : number
       - visiblity : boolean

3. `POST` 프로젝트 수정 `/project/modify`

   - **REQUEST**
     - project : string
     - projectUrl : string
       - 중복 불가능
     - description : string
     - isOpensource : boolean
     - bounty
       - isOpensource = true 라면 필요 없음
     - src : string
     - dest : string
     - visibility : boolean
   - **RESPONSE**
     - status : boolean
     - message : string

4. `POST` 프로젝트 종료 `/project/close`

   남아있는 모든 번역 완료 및 보상을 지급 후 프로젝트를 닫는다.

   - **REQUEST**
     - NULL
   - **RESPONSE**
     - status : boolean
     - message : string

5. `GET` 프로젝트리스트 `/project`

   - **REQUEST**
     - NULL
   - **RESPONSE**
     - status : boolean
     - data : Array
       - _id : string
       - owner : string
       - url : string
       - project : string
       - description : string
       - bounty : integer
       - src : string
       - dest : string
       - openstamp : integer
       - closestamp : integer
       - isOpensource : boolean
       - progress : number
       - visiblity : boolean


6. `POST ` 중간 결산 = 바운티 지급 `/project/?/?`

   지급해야 하는(Accept 되어 지급 대기중인)모든 보상들을 지급한다.

   - **REQUEST**
     - NULL
   - **RESPONSE****
     - status : boolean
     - message : string
  
  7. `POST` 문서 업로드 `/:projectUrl/docsApply`

    github 또는 다른 git repository를 clone하는 방식으로 문서를 서버에 업로드합니다.

   - **REQUEST**
     - gitUrl : string
   - **RESPONSE****
     - status : boolean
     - message : string


### 번역
1. `post`번역 문장 제출 `/translate/LogSubmit`
   - **REQUEST**
     - TranslateKey : string
     - Username : string
     - Transe : string
   - **RESPONSE**
     - status : boolean
     - message : string

2. `post`번역 문장 삭제 `/translate/LogDelete`
   - **REQUEST**
     - TranslateKey : string
     - Username : string
   - **RESPONSE**
     - status : boolean
     - message : string
3. `post`번역 문장 투표 `/translate/LogVote`
   - **REQUEST**
     - Username : string
   - **RESPONSE**
     - status : boolean
     - message : string
4. `post`관리자 채택 `/translate/LogPickOut`
   - **REQUEST**
     - Username : string
   - **RESPONSE**
     - status : boolean
     - message : string
5. `post` 번역 문장 검색 `/translate/LogSearch`
   - **REQUEST**
     - Transe : string
   - **RESPONSE**
     - status : boolean
     - message : string


