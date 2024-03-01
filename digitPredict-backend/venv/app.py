from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS on the Flask app

# Load your trained MNIST model
model = tf.keras.models.load_model('./mnist_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    print(request.headers)
    print(request.files)
    print(request.data)
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400

    file = request.files['image']
    image_bytes = file.read()
    print("Image bytes length:", len(image_bytes))  # Log image bytes length
    image = Image.open(io.BytesIO(image_bytes)).convert('L')
    print("Image opened successfully:", image.size)  # Log image size
    image = image.resize((28, 28))
    image_array = np.array(image)
    image_array = image_array / 255.0
    image_array = image_array.reshape(1, 28, 28, 1)  # Model expects this shape
    print("Image array shape:", image_array.shape)  # Log image array shape

    prediction = model.predict(image_array)
    predicted_digit = np.argmax(prediction)
    print("Predicted digit:", predicted_digit)  # Log predicted digit

    return jsonify({'predictedDigit': int(predicted_digit)})


if __name__ == '__main__':
    app.run(debug=True)
