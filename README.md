# 🗓 Yonsei Space System Scraper for YBIGTA - 연세대학교 공간대관시스템 스크래퍼

> 🚧 아직 제작중에 있는 프로젝트입니다.

- [x] 로그인 - 구현 완료
- [ ] 특정 날짜에 대해서 강의실 대관 현황 - 구현 중
- [ ] 강의실 대관 기능 - 작업 예정
- [ ] 강의실 대관 자동화 - 작업 예정

## 📌 프로젝트 개요

연세대학교 공간대관 시스템에서 특정 강의실들에 대해서 시간대를 스크래핑해와서 유저가 보기 쉬운 형태로 보여주는 프로젝트입니다.

와이빅타 구성원들의 대관 편의성을 위해 `puppeteer` 라이브러리를 이용하여 제작되었습니다.

유저가 `.env` 파일에 세팅해둔 연세포탈 아이디, 비밀번호를 이용해 공간대관 시스템에 로그인하고, 필요한 날짜의 공학관 내 주요 강의실 대관현황을 스크래핑 할 수 있습니다.
