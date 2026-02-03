# Travel-Planner
✈️ Travel Planner – Your Perfect Travel Planner

A simple and elegant Travel Planner web application that collects trip details from users, validates inputs on the client side, and sends the data to an n8n workflow. The workflow stores data in Google Sheets, generates a day-wise travel itinerary using an AI model, and emails the itinerary to the user automatically.

🚀 Features

🧾 User-friendly travel planning form

✅ Client-side form validation (destination, days, budget, email, etc.)

🎨 Modern and responsive UI using pure CSS

🔗 Integration with n8n Webhook

📊 Stores user data in Google Sheets

🤖 AI-generated day-wise travel itinerary

📧 Automatic email delivery of the travel plan

🛠️ Tech Stack
Frontend

HTML5 – Structure and layout 

index

CSS3 – Styling, responsiveness, and theme variables 

styles

Vanilla JavaScript – Validation, form handling, webhook submission 

script

Backend / Automation

n8n – Workflow automation 

Travel Planner

OpenAI (via n8n) – Generates travel itinerary

Google Sheets – Stores submitted travel data

Gmail API – Sends itinerary via email

📁 Project Structure
travel-planner/
│
├── index.html        # Main UI and travel form
├── styles.css        # Styling and responsive design
├── script.js         # Validation & webhook integration
├── Travel Planner.json  # n8n workflow export
└── README.md         # Project documentation

⚙️ How It Works

User fills in travel details (destination, days, budget, email, etc.)

Client-side validation ensures correct input

Data is sent to an n8n Webhook

n8n workflow:

Saves data to Google Sheets

Sends data to an AI model for itinerary generation

Emails the generated travel plan to the user

User receives the itinerary via email 📩

🔧 Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/travel-planner.git
cd travel-planner

2. Frontend Setup

Open index.html directly in your browser
OR

Use a local server (recommended):

npx serve

3. n8n Setup

Import Travel Planner.json into your n8n instance

Configure credentials:

Google Sheets OAuth

Gmail OAuth

OpenAI API (or n8n free credits)

Deploy the workflow and copy the Webhook URL

Replace the webhook URL in script.js:

const WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL";

📸 Screenshots (Optional)

Add screenshots of the UI and sample email output here

🔐 Security Notes

Do not commit real webhook URLs or API keys to public repositories

Use environment variables or placeholders for production

🧠 Future Improvements

🌍 Destination auto-suggestions

💱 Budget breakdown per day

📆 Calendar-based planning

🌐 Backend with authentication

📱 Progressive Web App (PWA) support

👨‍💻 Author

Vishal – Your Perfect Travel Planner
© 2026 All Rights Reserved
