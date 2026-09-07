[README.md](https://github.com/user-attachments/files/31915922/README.md)
# DAES — Digital Agriculture Enhancement System

YST (Young Scientist Tanzania) project by Enos John Ngosso and Thomas Edward
Charle — agricultural science category, researched in Ilemela District,
Mwanza Region.

## What's in this folder

```
daes/
├── frontend/          static HTML/CSS/JS site (no build step needed)
│   ├── index.html, about.html, login.html, register.html,
│   │   elimu.html (education), hali-ya-hewa.html (weather), soko.html
│   │   (market), msaada-ai.html (AI assistant), mawasiliano.html
│   │   (contact officer), dashboard.html (user account), admin.html
│   ├── css/styles.css
│   ├── js/api.js (backend calls), js/lang.js (EN/SW), js/main.js (theme, nav, slider)
│   └── data/crops.json  ← edit this to add/update education content
└── backend/           Flask + SQL API
    ├── app.py, config.py, extensions.py, models.py, auth_utils.py
    ├── routes/ (auth, weather, market, ai, feedback, contact, admin)
    ├── requirements.txt, .env.example
```

## Running the frontend

It's plain static files — open `frontend/index.html` in a browser, or serve
the folder with any static server, e.g.:

```
cd frontend
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

By default the frontend calls the backend at `http://localhost:5000/api`.
To change that (e.g. once deployed), add this before loading `js/api.js` on
any page:

```html
<script>window.DAES_API_BASE = "https://your-deployed-backend/api";</script>
```

## Running the backend

```
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# edit .env: add your real OpenWeather key, Gemini key, a random SECRET_KEY,
# and set ADMIN_EMAIL / ADMIN_PASSWORD for the exhibition demo account
python3 app.py
```

The API runs at `http://localhost:5000`. On first run it creates the SQLite
database (`daes.db`) and an admin account from your `.env` values — log in
with that email/password at `login.html`, you'll land on `admin.html`.

## Getting the API keys

- **OpenWeather**: free tier at https://openweathermap.org/api — the
  `/weather` and `/forecast` endpoints used here are on the free plan.
- **Gemini**: free tier key at https://aistudio.google.com/apikey
- **Market prices**: there is no reliable public API for Tanzanian crop/
  livestock prices, so this is intentionally admin-entered data (see
  `admin.html` → Market prices). Be upfront about this with judges — it's a
  more honest design than faking a "live" feed.

## WhatsApp notifications (planned feature)

The dashboard has a WhatsApp preferences form wired to save locally, but
actually sending messages needs a provider — the realistic option for a
student project is **Twilio's WhatsApp API**:

1. Create a free Twilio account and join the WhatsApp sandbox.
2. Fill `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` in `.env`.
3. Add a small scheduled job (e.g. a cron task or APScheduler) that reads
   users with `notify_weather`/`notify_market` = true and posts to
   `https://api.twilio.com/2010-04-01/Accounts/{sid}/Messages.json`.

This isn't wired up yet in the codebase — the honest thing to tell judges is
that it's a designed-and-scoped feature, not a working live integration,
unless you complete the Twilio setup yourself before the demo.

## Security notes

- Passwords are hashed with bcrypt, never stored in plain text.
- Auth uses short-lived JWTs (7-day expiry) sent as `Authorization: Bearer <token>`.
- All API keys live in `.env` on the server — never in frontend JavaScript.
- SQL is only ever touched through SQLAlchemy's ORM (parameterised), not raw string queries.
- Change `SECRET_KEY` and `ADMIN_PASSWORD` in `.env` before your exhibition demo and never commit `.env` to git (see `.gitignore`).

## Extending the education content

`frontend/data/crops.json` currently covers maize, beans, rice, tomato,
spinach, cattle, chicken, pig, goat, sheep, duck, Nile perch and tilapia —
each with 5 stages (preparation → market day) in English and Swahili. Add
more entries in the same shape to cover any other crop or animal.
