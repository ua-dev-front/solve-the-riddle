from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})

@app.route('/')
def test():
    return 'Test successful'
