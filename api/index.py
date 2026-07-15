from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

POLITICIANS = [
    "Asad Umar", "Asif Zardari", "Benazir Bhutto", "Bilawal Bhutto",
    "Imran Khan", "Khawaja Asif", "Maryam Nawaz", "Mohsin Naqvi",
    "Nawaz Sharif", "Pervez Musharraf", "Shah Mahmood Qureshi",
    "Shehbaz Sharif", "Sheikh Rasheed Ahmed", "Siraj-ul-Haq"
]

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
            
        # -------------------------------------------------------------
        # Note: Since the saved CNN model (.h5/.keras) is not available
        # in the repository (and datasets were removed to meet Vercel 
        # deployment limits), this endpoint mocks the inference. 
        # 
        # Developer: Uncomment the code below to use the real model when 
        # deployed or trained locally. 
        # -------------------------------------------------------------
        # import tensorflow as tf
        # import numpy as np
        # from PIL import Image
        # import io
        # 
        # model = tf.keras.models.load_model('model.h5')
        # img = Image.open(io.BytesIO(file.read())).resize((224, 224))
        # img_array = np.array(img) / 255.0
        # img_array = np.expand_dims(img_array, axis=0)
        # prediction = model.predict(img_array)
        # predicted_class = POLITICIANS[np.argmax(prediction[0])]
        # confidence = float(np.max(prediction[0]) * 100)
        # -------------------------------------------------------------
        
        # MOCK PREDICTION LOGIC:
        predicted_class = random.choice(POLITICIANS)
        confidence = round(random.uniform(75.5, 99.8), 2)
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Optionally, add a health check endpoint
@app.route('/api/health')
def health():
    return jsonify({"status": "Model API is running."})

# For local development
if __name__ == '__main__':
    app.run(debug=True, port=5000)
