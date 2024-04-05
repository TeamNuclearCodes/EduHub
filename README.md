# EduHub

<div align="center">
  <img src="imgs/logo.png" width="250"/>
  <p>
  A one stop solution for students to interact with each other in a shared learning environment. Also equiped with essential tools to track your own progres
  </p>
</div>

## Contents

- [**Overview**](#overview)
- [**Installation & Usage**](#installation--usage)
- [**Gallery**](#gallery)
- [**Team Memebers**](#team-members)

## Overview

University students face challenges in coordinating exam preparation efforts, accessing shared resources, and building a supportive academic network. The solution we propose is an integrated educational platform that collects user data during registration for personalized communication. Users input exam dates, triggering notifications for shared schedules. Focus subjects are specified for a customized experience. This aims to create an academic community that allows students with similar backgrounds to efficiently communicate, share resources, and enhance their learning experience.

## Installation & Usage

```bash
git clone https://github.com/TeamNuclearCodes/EduHub.git
cd EduHub
cd backend && npm i && touch .env
cd ../frontend && npm i && touch .env   
```

#### ENV files
- Backend
```env
MONGO_URI=MONGO_DB_URI_HERE           # MONGO_URI=mongodb+srv://username:password@.mongodb.host/
```

- Frontend
```env
VITE_API_URL=BACKEND_URL_HERE           # VITE_API_URL=http://localhost:5000
VITE_CURRENT_URL=FRONTEND_URL_HERE      # VITE_CURRENT_URL=http://localhost:5173
```

#### Development
```bash
cd backend && npm run dev
cd ../frontend && npm run dev
```

#### Production
```bash
cd backend
npm run build
npm start
```

## Gallery

| Dashboard|Ask Questions|
:-:|:-:
| ![](imgs/dashboard.png) | ![](imgs/ask_questions.png) |

| Manage ToDos|Chat|
:-:|:-:
| ![](imgs/manage_todos.png) | ![](imgs/chat_page.png) |


## Team Members


| <img src="https://avatars.githubusercontent.com/u/138325645" width="100"/> | <img src="https://avatars.githubusercontent.com/u/147746119" width="100"/> | ![](https://avatars.githubusercontent.com/u/96683120?s=100) | ![](https://avatars.githubusercontent.com/u/45532566?s=100) |
:-:|:-:|:-:|:-:
|Aaron George<br/>Abraham|Eshaan<br/>Abdulkalam|Midhun Unni|Vasanth R|
|<a href="https://github.com/aaron-6960">@aaron-6960</a>|<a href="https://github.com/Eshaanmanath">@Eshaanmanath</a>|<a href="https://github.com/midhununni457">@midhununni457</a>|<a href="https://github.com/1337kid/">@1337kid</a>|