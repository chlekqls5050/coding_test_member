## 프로젝트 실행 방법
1. 저장소 클론
```bash
git clone https://github.com/username/project-name.git
cd project-name
```

2. 패키지 설치
```bash
npm install
```

3. 환경변수 설정
```bash
NEXT_PUBLIC_SUPABASE_URL=https://fpqbuiqymzbgiwppccde.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcWJ1aXF5bXpiZ2l3cHBjY2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MjM2MzcsImV4cCI6MjA3MjI5OTYzN30.gfXJMnrTvibBLJabSNkyxoXfhOa_yjUrjWzP5QIuVz4
```

4. 개발서버 실행
```bash
npm run dev
-> 브라우저에서 http://localhost:3000 로 실행
```

5. 빌드 및 실행
```bash
npm run build
npm start
```

   
## 기술 선택 구체적인 이유 서술

Next.js

React 기반 프레임워크로, 라우팅과 빌드 최적화가 내장
SSR(서버사이드 렌더링), SSG(정적 사이트 생성) 기능으로 SEO와 성능 최적화 가능

TypeScript

타입 안정성을 확보해 런타임 에러 감소
코드 자동완성과 가독성 향상으로 유지보수성 강화

Supabase

인증, 데이터베이스, 스토리지까지 제공하는 오픈소스 Firebase 대안
간단한 회원가입/로그인 구현에 적합하며 SQL 기반이라 데이터 관리가 직관적

CSS Module

컴포넌트 단위 스타일링 가능
클래스명 충돌 방지
Tailwind보다 간단하게 스타일을 관리하고자 선택  

  
## 발생한 이슈와 이슈 해결 과정에 대한 서술

[Supabase 이메일 인증 문제]
문제: 회원가입 후 로그인 시 AuthApiError: Email not confirmed 에러 발생
원인: Supabase 기본 설정에서 이메일 인증을 요구
해결: Supabase Auth 설정에서 Disable email confirmations 옵션 활성화 → 개발 환경에서는 이메일 인증 없이 로그인 가능하도록 수정

[카카오 소셜 로그인 사업자 등록 문제]
문제 : 카카오 소셜 로그인을 구현하려 하였으나, 실제 로그인/회원가입 과정에서 개인정보(이메일, 프로필 정보 등) 제공 동의가 필요한 문제가 발생
원인 : 카카오 측 정책상 개인정보를 다루는 API는 사업자 등록이 있는 계정에서만 정식으로 사용이 가능
해결 : 토이 프로젝트에서는 사업자 번호가 없기 때문에 실제 서비스 수준의 카카오 로그인 연동은 불가능함을 확인하여, 기능 구현 차원에서 로그인 창 호출까지 테스트
