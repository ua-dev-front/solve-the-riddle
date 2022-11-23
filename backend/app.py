from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})


@app.route('/signIn', methods=['POST'])
def sign_in() -> dict[str, bool]:
    user_data = request.get_json()
    return {"authentication": True}


@app.route('/logOut', methods=['GET'])
def log_out() -> None:
    pass


@app.route('/addRiddle', methods=['POST'])
def add_riddle() -> str:
    data = request.get_json()
    riddle = data['riddle'], data['create_date'], data['answer']
    return '5'


@app.route('/verifyAnswer', methods=['GET'])
def get_answer() -> dict[str, bool]:
    riddle = request.args.to_dict()
    return {'correct': True}


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict[str, str, int]]]:
    return {'riddles': [{'id': 1, 'create_date': '23.11.2022', 'riddle': '...'}]}
