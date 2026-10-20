# adv-web-app

React + TypeScript frontend, FastAPI backend, MySQL database.

## Prerequisites

- Python 3.10+
- Node.js (LTS)
- MySQL Server, running on `localhost:3306`

## 1. Create the database

```sql
CREATE DATABASE webapp CHARACTER SET utf8mb4;
```

The `users` table is created automatically when the API starts.

## 2. Run the backend

From the `backend` folder:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Open `.env` and set `DB_PASSWORD` to your MySQL password. Then start the API:

```powershell
uvicorn main:app --reload
```

The API runs at http://localhost:8000, with interactive docs at http://localhost:8000/docs.

## 3. Run the frontend

In a second terminal, from the `frontend` folder:

```powershell
npm install
npm run dev
```

Open http://localhost:5173.
