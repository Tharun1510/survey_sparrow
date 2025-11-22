#  SurveySparrow Support Triage System

A real-time integration system that automates support ticket prioritization using Webhooks.

##  The Architecture
This project integrates **SurveySparrow** with a **MERN Stack** dashboard to instantly flag critical issues.

1.  **Ingestion:** SurveySparrow collects user feedback via a logic-based survey.
2.  **Integration:** A Node.js/Express server receives data via **Webhooks** (POST).
3.  **Logic Layer:** Server-side logic parses the payload; if "System Down" is detected, priority is upgraded to **URGENT**.
4.  **Visualization:** A React.js dashboard polls the API to display critical tickets in real-time.

## 🛠️ Tech Stack
* **Source:** SurveySparrow (Logic Jump, Variables, Custom Webhooks)
* **Backend:** Node.js, Express.js (Hosted on Render)
* **Database:** MongoDB Atlas
* **Frontend:** React.js, Tailwind CSS (Hosted on Vercel)

## 📸 Screenshots
<img width="1164" height="607" alt="image" src="https://github.com/user-attachments/assets/c5cf2066-78d8-4111-b26a-1630affded52" />



## 🔗 Live Demo
* **Dashboard:https://vercel.com/tharuns-projects-0156f7e0/survey-sparrow
* **Survey:https://sprw.io/stt-ivlSS?name=yourname

## 💡 Key Features
* **Custom JSON Mapping:** Mapped internal survey variables to database schema.
* **Real-time Polling:** Dashboard updates automatically without refresh.
* **Data Validation:** Backend handles type coercion for numeric inputs.
