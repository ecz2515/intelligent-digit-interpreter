from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('./mnist_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    print('Received request: ', request)
    print('Files in request: ', request.files)
    if 'image' not in request.files:
        print('No image file in request')
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    if filename == '':
        print('Filename is empty')
        return jsonify({'error': 'Empty filename'}), 400

    image_bytes = file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert('L')

    # print('Image array shape: ', image_array.shape)
    image = image.resize((28, 28))
    image_array = np.array(image) / 255.0
    image_array = image_array.reshape(1, 28, 28, 1)
    
    prediction = model.predict(image_array)
    predicted_digit = np.argmax(prediction)
    print('Predicted digit: ', predicted_digit)

    return jsonify({'predictedDigit': int(predicted_digit)})

if __name__ == '__main__':
    app.run(debug=True)
