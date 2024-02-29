from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = Flask(__name__)

# Load your trained MNIST model
model = tf.keras.models.load_model('mnist_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400

    file = request.files['image']
    image_bytes = file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert('L')
    image = image.resize((28, 28))
    image_array = np.array(image)
    image_array = image_array / 255.0
    image_array = image_array.reshape(1, 28, 28, 1)  # Model expects this shape

    prediction = model.predict(image_array)
    predicted_digit = np.argmax(prediction)

    return jsonify({'predictedDigit': int(predicted_digit)})

if __name__ == '__main__':
    app.run(debug=True)
