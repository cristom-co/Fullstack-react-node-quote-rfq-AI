
## Download

```bash
 git clone https://github.com/cristom-co/cotizacion-rfq.git
```

## Backend

```bash
  cd backend
  npm install
  npx ts-node src/index.ts
```

## Frontend

```bash
  cd frontend
  npm install
  npm run dev
```

## Tech Stack

**Client:** React, typescript, zustand, TailwindCSS, Vite, axios

**Server:** Node, typescript, Express, node-nlp,  sqlite, sequelize


## Problem Statement

Design, architect, and implement a widget that, at a high level, utilizes the latest AI
tools to automatically turn customer emailed requests for quote (RFQs) to a metal
service center into structured quotes to send back to the customer. This will
enable salespeople to focus on selling and talking with customers, giving them the
ability to respond with the single click of a button to “Send Quote”, rather than
diving into the ERP to get the necessary information requested to respond to an
RFQ.