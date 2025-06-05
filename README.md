<div align="center">
  <h1>🚗 CarPricePrediction System</h1>
  <p>A full-stack web application that predicts car prices using machine learning</p>
  
  [![Python](https://img.shields.io/badge/Python-3.9%2B-blue)](https://www.python.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB)](https://reactjs.org/)
  [![Flask](https://img.shields.io/badge/Flask-2.3.3-000000)](https://flask.palletsprojects.com/)
  [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
  [![Open in GitHub](https://img.shields.io/badge/View%20on-GitHub-181717?logo=github)](https://github.com/Ar141204/CarPricePredictor)
</div>

## ✨ Features

- **Accurate Predictions**: Machine learning model trained on 11,900+ vehicles
- **Modern UI**: Responsive design with dark/light mode support
- **Interactive Forms**: Dynamic dropdowns for car makes and models
- **Real-time Results**: Instant price estimates as you input details
- **Detailed Analysis**: Comprehensive vehicle specifications database
- **API Ready**: RESTful API for integration with other applications

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with PostCSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend
- **Framework**: Flask (Python)
- **Machine Learning**: scikit-learn
- **Data Processing**: pandas, NumPy
- **Model Persistence**: Joblib
- **API Documentation**: OpenAPI (Swagger)
- **CORS**: Flask-CORS

### Development Tools
- **Package Manager**: npm, pip
- **Linting**: ESLint, Prettier
- **Version Control**: Git
- **Environment Management**: venv (Python), .env files

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ & npm
- Python 3.9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ar141204/CarPricePredictor.git
   cd Car_Predictor
   ```

2. **Set up the backend**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Create and activate virtual environment
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # macOS/Linux:
   # source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Return to project root
   cd ..
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   python app.py
   # API will be available at http://localhost:5000
   ```

2. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   # App will be available at http://localhost:5173
   ```

## 📊 Model Training

To retrain the machine learning model:

```bash
cd backend
python train_model.py
```

This will:
1. Load and preprocess the dataset from `data/data.csv`
2. Train a new Random Forest Regressor
3. Save the model as `model_artifacts.pkl`
4. Save feature encodings as `feature_columns.pkl`

## 🌐 API Documentation

### Base URL
`http://localhost:5000`

### Endpoints

#### Health Check
```
GET /health
```
Check if the API is running.

#### Get Prediction
```
POST /predict
```
Predict car price based on vehicle specifications.

**Request Example:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "engine_size": 2.5,
    "engine_cylinders": 4,
    "transmission_type": "AUTOMATIC",
    "driven_wheels": "front_wheel_drive",
    "number_of_doors": 4,
    "vehicle_size": "Midsize",
    "vehicle_style": "Sedan",
    "highway_mpg": 39,
    "city_mpg": 28,
    "popularity": 1000
  }'
```

**Response (Success):**
```json
{
  "predicted_price": 25345.67,
  "formatted_prediction": "$25,345.67",
  "status": "success"
}
```

**Response (Error):**
```json
{
  "status": "error",
  "message": "Invalid input data",
  "errors": {
    "year": "Must be between 1990 and current year"
  }
}
```

## 📁 Project Structure

```
Car_Predictor/
├── .gitignore           # Git ignore rules
├── README.md            # Project documentation
│
├── backend/            # Flask backend
│   ├── app.py           # Main application
│   ├── requirements.txt # Dependencies
│   ├── train_model.py   # ML model training
│   ├── test_api.py      # API tests
│   └── model_artifacts/ # Trained models & encoders
│
├── frontend/           # React frontend
│   ├── public/          # Static assets
│   └── src/             # Source code
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       └── utils/       # Helper functions
│
└── data/               # Dataset files
    └── data.csv         # Car dataset
```

6. Start the Flask server:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## 🌐 API Endpoints

- `POST /predict` - Get price prediction for a car
  ```json
  {
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "engine_hp": 203,
    "engine_cylinders": 4,
    "transmission_type": "AUTOMATIC",
    "driven_wheels": "front_wheel_drive",
    "number_of_doors": 4,
    "vehicle_size": "Midsize",
    "vehicle_style": "Sedan",
    "highway_mpg": 32,
    "city_mpg": 22,
    "popularity": 1000
  }
  ```

## 🛠️ Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - React Hook Form
  - Axios

- **Backend**:
  - Python
  - Flask
  - Scikit-learn
  - Pandas
  - Joblib

- **Machine Learning**:
  - Random Forest Regressor
  - Label Encoding
  - Train-Test Split

### Application Screenshots

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
  <div>
    <img src="./frontend/src/assets/Home page.png" alt="Home Page" style="width:100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p align="center"><b>Home Page</b> - Welcome screen with project overview</p>
  </div>
  <div>
    <img src="./frontend/src/assets/Predict page.png" alt="Prediction Page" style="width:100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p align="center"><b>Prediction Page</b> - Get real-time car price estimates</p>
  </div>
  <div>
    <img src="./frontend/src/assets/About page.png" alt="About Page" style="width:100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p align="center"><b>About Page</b> - Project details and information</p>
  </div>
</div>

## 🙏 Acknowledgments

- Dataset: [Car Features and MSRP](https://www.kaggle.com/CooperUnion/cardataset)
- Built with amazing open-source technologies
- Icons by [Font Awesome](https://fontawesome.com/)
- UI Components by [Headless UI](https://headlessui.com/)
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## 📬 Contact

[Abdul Rahman M] - [rahman14122004@gmail.com]  
Project Link: [https://github.com/Ar141204/CarPricePredictor](https://github.com/Ar141204/CarPricePredictor)