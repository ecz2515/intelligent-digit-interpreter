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
- Git LFS (for handling large files)

### Installation

1. Git LFS Setup

    Before cloning the repository, ensure you have Git LFS installed on your system. This is necessary to properly manage large files in the project. Install Git LFS by following the instructions on the [Git LFS website](https://git-lfs.github.com/). After installing, set up Git LFS:

    ```sh
    git lfs install
    ```


2. Clone the repository:

    ```sh
    git clone https://github.com/ecz2515/intelligent-digit-interpreter.git
    cd intelligent-digit-interpreter
    ```

3. Set up the backend:

    You will need to use two terminals for this step. One for the backend and one for the frontend. In the first terminal, navigate to the `digitPredict-backend` directory and set up the virtual environment:

    ```sh
    cd digitPredict-backend
    python3 -m venv venv
    source venv/bin/activate  # For Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

4. Train the model (optional if you're using a pre-trained model):

    ```sh
    python train_mnist.py
    ```

5. Start the Flask server:

    ```sh
    python app.py
    ```

6. Set up the frontend:

    In the second terminal, navigate to the `digitPredict-frontend` directory and install the required packages:

    ```sh
    cd ../digitPredict-frontend
    npm install
    ```

7. Start the React Native app:

    ```sh
    npm start
    ```

## Usage

Once both the frontend and backend are running, navigate to the web interface provided by React Native, draw a digit in the canvas provided, and click "Predict" to see the model's digit prediction.

## Author

- **Evan Chen** - [GitHub](https://github.com/ecz2515), [LinkedIn](https://www.linkedin.com/in/evanchen852/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details