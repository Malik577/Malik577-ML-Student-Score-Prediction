# 🎓 Student Performance Predictor

> **AI-Powered Academic Success Analysis Platform**

A comprehensive machine learning system that predicts student academic performance using advanced analytics and interactive web interfaces. Built with Python ML backend and React TypeScript frontend.

![Project Banner](assets/images/project-banner.png)

## 🚀 Features

- **🤖 Machine Learning Pipeline**: Linear Regression model with comprehensive feature engineering
- **📊 Interactive Dashboard**: Real-time ML pipeline execution and performance metrics
- **🎯 Advanced Prediction**: Multi-factor student performance prediction (20+ features)
- **📈 Data Visualization**: Generated charts and insights from Python analysis
- **🌐 Modern Web Interface**: Responsive React application with Tailwind CSS
- **📱 Educational Insights**: Performance correlation analysis and recommendations

## 🏗️ Project Structure

```
student-performance-predictor/
├── 📁 backend/                    # Python ML backend
│   ├── data/                     # Dataset files
│   │   ├── student_performance.csv   # Sample dataset (used by default)
│   │   └── StudentPerformanceFactors.csv  # Full dataset (optional)
│   ├── notebooks/                # Jupyter notebooks and scripts
│   ├── plots/                    # Generated plots from ML run
│   ├── venv/                     # Python virtual environment (auto-created)
│   ├── config.py                 # Backend config (paths, params)
│   ├── main.py                   # Backend entrypoint (runs pipeline)
│   ├── requirements.txt          # Python dependencies
│   └── ml/                       # Reusable ML utilities
├── 📁 src/                       # React frontend
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   ├── pages/                    # Page components (e.g., Dashboard)
│   ├── services/                 # Frontend services (MLService)
│   ├── types/                    # TypeScript types
│   ├── utils/                    # Utility functions (mlUtils)
│   ├── App.tsx                   # App shell
│   ├── main.tsx                  # Frontend entry
│   └── index.css                 # Tailwind setup
├── assets/                       # Static assets
├── dist/                         # Production build (vite)
├── Makefile                      # Dev tasks (frontend/backend/all)
├── package.json                  # NPM scripts
├── index.html                    # HTML entry
├── tailwind.config.js            # Tailwind config
├── postcss.config.js             # PostCSS config
└── eslint.config.js              # ESLint (flat config)
```

## 🛠️ Technology Stack

### Backend (Python)
- **Machine Learning**: scikit-learn, pandas, numpy
- **Data Visualization**: matplotlib, seaborn
- **Development**: Jupyter notebooks, virtual environments

### Frontend (React)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📊 Dataset

- Default (used by pipeline): `backend/data/student_performance.csv` (sample records)
- Optional full dataset: `backend/data/StudentPerformanceFactors.csv` (6,607 records, 20+ features)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+

### Setup and Run
```bash
# Install frontend deps + create Python venv + install backend deps
npm run setup

# Start frontend (vite)
npm run dev
# Open the printed URL (5173 or 5174)

# Run backend ML pipeline (generates plots under backend/plots/)
npm run backend

# Start both (frontend + backend pipeline)
npm run all
```

## 🔧 Development

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint (frontend only)
```

### Backend
```bash
npm run backend      # Runs backend/main.py inside venv
# or, manually
cd backend && python3 -m venv venv && . venv/bin/activate && python3 main.py
```

## 📈 Model Performance

- **R² Score**: ~0.6–0.7 (varies with dataset split)
- **RMSE/MAE**: See terminal output and generated plots
- **Key Predictors**: Study hours, attendance, previous scores

## 🎯 Use Cases

- **Educators**: Identify at-risk students early
- **Students**: Understand performance factors
- **Administrators**: Data-driven policy decisions
- **Researchers**: Academic performance analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🏃 Run

- Frontend (Vite):
  ```bash
  npm run dev
  ```
  Open the printed URL (e.g., http://localhost:5173 or http://localhost:5174)

- Backend (Python ML pipeline):
  ```bash
  npm run backend
  ```
  Outputs plots in `backend/plots/` and logs in terminal

- Both together:
  ```bash
  npm run all
  ```

- First-time setup:
  ```bash
  npm run setup
  ```

- Lint frontend code:
  ```bash
  npm run lint
  ```
