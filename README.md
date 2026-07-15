# Pakistani Politician Image Classification

![Project Demo/Preview](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Flask](https://img.shields.io/badge/Flask-Backend-lightgrey.svg)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black.svg)

A full-stack web application designed to classify images of prominent Pakistani politicians. This project features a beautiful drag-and-drop frontend interface and a scalable Python/Flask backend structured for seamless serverless deployment.

## 📊 Dataset

The model uses a custom dataset of Pakistani politicians, which has been open-sourced on Kaggle. You can explore, download, and use the dataset directly below:

**[Pakistani Politician Images Dataset on Kaggle](https://www.kaggle.com/datasets/mudasarbhatti/pakistani-politician-images)** 

*Note: The dataset itself is not included in this repository to keep the repository lightweight and compatible with serverless deployment limitations.*

## 🚀 Features

- **Dynamic UI**: A modern, glass-morphic frontend built with HTML, CSS, and Vanilla JavaScript.
- **Drag & Drop**: Seamlessly drag and drop images to see instant predictions. 
- **Flask API Endpoint**: Provides an easy-to-consume `/api/predict` endpoint to process image uploads.
- **Serverless Ready**: Fully configured (`vercel.json`) to be deployed effortlessly on Vercel as Serverless Functions.

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3 (Custom Properties & Animations), Vanilla JavaScript
- **Backend API**: Python, Flask, Flask-CORS
- **Machine Learning**: TensorFlow / Keras (code provided in Jupyter Notebook)
- **Deployment**: Vercel

## 💻 Local Development Setup

To run this project on your local machine:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bhatticoder/Pakistani-Politicians.git
   cd Pakistani-Politicians
   ```

2. **Setup the Python Environment**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask Backend**
   ```bash
   cd api
   python index.py
   ```
   *The API will start running on `http://127.0.0.1:5000`.*

5. **Run the Frontend**
   Simply open `index.html` in your favorite browser, or serve it using any local development server (like VS Code Live Server).

## 🧠 Model & Inference

### Training
The actual deep learning training process (CNN architecture) is documented in the Jupyter Notebook files (`Pakistani_Politician_Classification.ipynb`). You can train your own `.h5` model using the Kaggle dataset linked above.

### Inference & Deployment Note
Because cloud functions (like Vercel) have strict size limits (often under 250MB) and memory caps, deploying a massive TensorFlow model can occasionally cause timeouts or exceed size limitations.

For demonstration purposes, the deployed API currently returns **mocked predictions**. If you intend to run this robustly in a containerized environment (like Docker / AWS ECS), you can easily uncomment the inference logic in `api/index.py` and load up your trained `model.h5`.

## 📄 License
This project is open-source and available under the MIT License.
