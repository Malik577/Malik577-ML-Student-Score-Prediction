# Student Performance Predictor

A machine learning system that predicts student academic performance using a Python backend and a React + TypeScript frontend.

## Features

- Machine learning pipeline (linear regression) with feature engineering
- Interactive dashboard with real-time pipeline execution and metrics
- Multi-factor performance prediction
- Python-generated visualizations and insights
- Responsive web interface built with Tailwind CSS

## Project Structure

```
student-performance-predictor/
├── backend/                    # Python ML backend
│   ├── data/                   # Datasets
│   │   ├── student_performance.csv           # Sample dataset (default)
│   │   └── StudentPerformanceFactors.csv     # Full dataset (optional)
│   ├── notebooks/              # Jupyter notebooks and scripts
│   ├── plots/                  # Generated plots
│   ├── venv/                   # Python virtual environment (auto-created)
│   ├── config.py               # Backend config
│   ├── main.py                 # Backend entrypoint (runs pipeline)
│   ├── requirements.txt        # Python dependencies
│   └── ml/                     # Reusable ML utilities
├── src/                        # React frontend
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Pages (e.g., Dashboard)
│   ├── services/               # Frontend services (MLService)
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions (mlUtils)
│   ├── App.tsx                 # App shell
│   ├── main.tsx                # Frontend entry
│   └── index.css               # Tailwind setup
├── assets/                     # Static assets
├── dist/                       # Production build (vite)
├── Makefile                    # Dev tasks (frontend/backend/both)
├── package.json                # NPM scripts
├── index.html                  # HTML entry
├── tailwind.config.js          # Tailwind config
├── postcss.config.js           # PostCSS config
└── eslint.config.js            # ESLint config (flat)
```

## Technology Stack

### Backend (Python)
- scikit-learn, pandas, numpy
- matplotlib, seaborn
- Jupyter notebooks

### Frontend (React)
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Lucide React icons

## Dataset

- Default dataset: `backend/data/student_performance.csv`
- Optional full dataset: `backend/data/StudentPerformanceFactors.csv` (6,607 records)

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+

### Setup and Run
```bash
# Install frontend deps + create Python venv + install backend deps
npm run setup

# Start frontend (Vite)
npm run dev
# Open the printed URL (5173 or 5174)

# Run backend ML pipeline (generates plots under backend/plots/)
npm run backend

# Start both (frontend + backend pipeline)
npm run all
```

## Development

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend
```bash
npm run backend
# or manually
cd backend && python3 -m venv venv && . venv/bin/activate && python3 main.py
```

## Model Performance

- R² score typically around 0.6–0.7 depending on data split
- RMSE / MAE reported in terminal and saved plots
- Key predictors: study hours, attendance, previous scores

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request
