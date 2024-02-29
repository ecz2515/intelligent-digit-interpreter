# Intelligent Digit Interpreter

`intelligent-digit-interpreter` is a machine learning-powered web application designed to recognize handwritten digits. It utilizes a neural network model trained on the MNIST dataset to predict digits drawn by users in a web interface. This project is divided into two main components: `digitPredict-frontend`, a React Native application for user interaction, and `digitPredict-backend`, a Flask API for processing and predicting digits.

## Features

- Draw and submit digits via a web interface
- Real-time digit prediction using a pre-trained model
- Clear the drawing board to make new predictions

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.6+
- Node.js and npm
- TensorFlow 2.x
- Flask

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/ecz2515/intelligent-digit-interpreter.git
    cd intelligent-digit-interpreter
    ```

2. Set up the backend:

    ```sh
    cd digitPredict-backend
    python3 -m venv venv
    source venv/bin/activate  # For Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3. Train the model (optional if you're using a pre-trained model):

    ```sh
    python train_mnist.py
    ```

4. Start the Flask server:

    ```sh
    python app.py
    ```

5. Set up the frontend:

    ```sh
    cd ../digitPredict-frontend
    npm install
    ```

6. Start the React Native app:

    ```sh
    npm start
    ```

## Usage

Once both the frontend and backend are running, navigate to the web interface provided by React Native, draw a digit in the canvas provided, and click "Predict" to see the model's digit prediction.

## Author

- **Evan Chen** - Workshops Committee Chair, Winter 2024

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Thanks to the TensorFlow and Flask communities for providing excellent documentation.
- Inspired by the MNIST dataset's potential for educational projects.
