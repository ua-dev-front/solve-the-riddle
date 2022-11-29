from flask import Flask, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})


@app.route('/signIn', methods=['POST'])
def sign_in() -> dict[str, bool]:
    user_data = request.get_json()
    if type(user_data) != dict or user_data.keys() != {'login', 'password'}:
        abort(400)
    return {"authentication": True}


@app.route('/logOut', methods=['GET'])
def log_out() -> None:
    pass


@app.route('/addRiddle', methods=['POST'])
def add_riddle() -> str:
    data = request.get_json()
    if type(data) != dict or data.keys() != {'riddle', 'answer'}:
        abort(400)
    riddle = data['riddle'], data['answer']
    return '5'


@app.route('/verifyAnswer', methods=['GET'])
def get_answer() -> dict[str, bool]:
    riddle = request.args.to_dict()
    if type(riddle) != dict or (riddle.keys() != {'answer', 'id'} or not riddle['id'].isnumeric()):
        abort(400)
    return {'correct': True}


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict[str, str, int]]]:
    return {'riddles': [{'id': 1, 'create_date': '23.11.2022', 'riddle': '...'}]}
