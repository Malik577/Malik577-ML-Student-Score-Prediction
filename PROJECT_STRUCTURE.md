# 🎓 Student Performance Predictor - Project Structure

## 📁 Frontend Structure (`src/`)

```
src/
├── 📁 components/           # Reusable UI components
│   ├── About.tsx           # About page component
│   ├── Analysis.tsx        # Data analysis component
│   ├── Footer.tsx          # Footer component
│   ├── Navigation.tsx      # Navigation component
│   ├── StudentPrediction.tsx # Student prediction form
│   └── MLPipeline.tsx      # ML pipeline component
├── 📁 pages/               # Page-level components
│   └── Dashboard.tsx       # Main dashboard page
├── 📁 hooks/               # Custom React hooks
│   └── useMLPipeline.ts    # ML pipeline state management
├── 📁 services/            # Business logic services
│   └── mlService.ts        # Machine learning operations
├── 📁 types/               # TypeScript type definitions
│   └── index.ts            # All interfaces and types
├── 📁 utils/               # Utility functions
│   └── helpers.ts          # Common helper functions
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
├── index.css               # Global styles
└── vite-env.d.ts           # Vite environment types
```

## 📁 Backend Structure (`backend/`)

```
backend/
├── 📁 data/                # Dataset files
│   └── StudentPerformanceFactors.csv
├── 📁 ml/                  # ML model files
│   ├── __init__.py
│   ├── config.py           # Configuration settings
│   ├── data.py             # Data loading and preprocessing
│   ├── features.py         # Feature engineering
│   ├── modeling.py         # Model training and evaluation
│   ├── plots.py            # Visualization functions
│   └── utils.py            # Utility functions
├── 📁 notebooks/           # Jupyter notebooks and scripts
│   ├── student_score_prediction.py
│   ├── student_score_prediction.ipynb
│   └── 01_eda_and_modeling.ipynb
├── 📁 scripts/             # Utility scripts
├── 📁 student_prediction_env/ # Python environment
├── __init__.py             # Package initialization
├── main.py                 # Main entry point
└── requirements.txt        # Python dependencies
```

## 🚀 Key Features

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern, responsive design
- **Custom hooks** for state management
- **Service layer** for business logic separation
- **Component-based architecture** for reusability

### Backend
- **Python ML pipeline** with scikit-learn
- **Modular structure** for maintainability
- **Jupyter notebooks** for analysis and development
- **Comprehensive data processing** pipeline

## 🔧 Development Commands

```bash
# Install dependencies
make install

# Start development server
make dev

# Run backend ML pipeline
make backend-run

# Build for production
make build

# Run tests and linting
make test
make lint

# Clean and reset
make clean
make reset
```

## 📊 Data Flow

1. **Frontend** → User interacts with dashboard
2. **useMLPipeline hook** → Manages ML pipeline state
3. **MLService** → Handles ML operations and data processing
4. **Backend** → Runs actual ML pipeline (Python)
5. **Results** → Displayed in React components

## 🎯 Architecture Benefits

- **Separation of Concerns**: Clear separation between UI, business logic, and ML
- **Type Safety**: Full TypeScript coverage for better development experience
- **Reusability**: Components and services can be easily reused
- **Maintainability**: Clean, organized code structure
- **Scalability**: Easy to add new features and components

## 🔄 State Management

- **Local State**: Component-level state for UI interactions
- **Custom Hooks**: Centralized state management for ML pipeline
- **Service Layer**: Business logic and data processing
- **Props**: Component communication and data flow

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Responsive grid layouts** for different screen sizes
- **Touch-friendly interactions** for mobile devices
- **Progressive enhancement** for better user experience 