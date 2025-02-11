# 3천단어 어플리케이션 개발 환경

이 프로젝트는 Nuxt 3 (버전 3.15.0 Stable), Express (Node.js 18.x 기반) 및 MySQL (8.0)을 Docker Compose로 구성한 개발 환경입니다.  
이 README 파일은 초기 환경 설치 방법, 개발환경 기동 방법 및 기본적인 문제 해결 방법을 모두 포함하고 있습니다.

---

## 요구 사항

- [Docker](https://www.docker.com/get-started) 및 Docker Compose 설치
- Git 설치

---

## 초기 구성 설치 방법

### 1. 저장소 클론 및 디렉터리 이동

GitHub에서 해당 리포지토리를 클론한 후, 프로젝트 루트로 이동합니다.
```bash
git clone https://github.com/LeeJuan/en.git
cd en
```

### 2. Docker Compose로 환경 빌드 및 실행

```bash
docker-compose up --build
```

## 개발 환경 기동 방법 (빌드 완료 후)

이미 빌드가 완료된 상태에서는 단순히 다음 명령어로 모든 컨테이너를 기동할 수 있습니다.

```bash
docker-compose up -d
```

실행 중인 컨테이너 로그를 확인하려면:

```bash
docker-compose logs -f
```

## 환경 종료 방법

모든 컨테이너를 중지하려면 아래 명령어를 사용합니다.

```bash
docker-compose down
```

## 프로젝트 구조

```plaintext
my-project/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile.dev
│   ├── package.json
│   └── server.js
└── frontend/
    ├── Dockerfile.dev
    ├── package.json
    └── nuxt.config.ts
```

## 서비스 접속 방법

- **MySQL**  
  로컬 머신의 포트 `3306`을 통해 MySQL 클라이언트나 관리 도구(예: MySQL Workbench)로 접속합니다.

- **Backend (Express API)**  
  브라우저 또는 API 클라이언트(예: Postman)에서 [http://localhost:3001/api](http://localhost:3001/api)에 접속하여 "Hello from Express!" 메시지를 확인합니다.

- **Frontend (Nuxt 3)**  
  웹 브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하면 Nuxt 3 기본 페이지가 정상적으로 표시됩니다.

---

## 볼륨 마운트 및 Node Modules 보호

- 각 서비스는 로컬 소스 코드를 컨테이너의 `/app` 디렉터리에 마운트합니다.
- 컨테이너 내부에서 설치된 `node_modules`는 별도의 익명 볼륨으로 관리되어, Docker 이미지 빌드 시 설치된 의존성이 호스트의 빈 폴더에 덮어쓰이지 않도록 설정되어 있습니다.
- 자세한 내용은 `docker-compose.yml` 파일을 참조하세요.

---

## 사용된 주요 버전

- **Node.js**: 18.x (Active LTS)
- **Nuxt 3**: 3.15.0 (Stable)
- **Express**: 4.18.2 (Stable)
- **MySQL**: 8.0


## 내부설정 명령어

콘테이너 내부 실행

```bash
docker exec -it en-backend-1 sh
```

에러 확인

## frontend

```bash
docker exec -it backend sh
```

## MYSQL

```bash
docker exec -it en-mysql-1 mysql -u myuser -p
```

## backend

```bash
docker exec -it en-backend-1 sh
USE mydb;
SELECT * FROM languages LIMIT 10;
```