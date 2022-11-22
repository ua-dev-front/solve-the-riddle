from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})


@app.route('/sign_in', methods=['POST'])
def sign_in() -> dict[str, bool]:


@app.route('/log_out', methods=['GET'])
def log_out() -> None:


@app.route('/addRiddle', methods=['POST'])
def add_riddle() -> str:


@app.route('/verifyAnswer', methods=['GET'])
def get_answer() -> dict[str, bool]:


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict[str, int]]]:
