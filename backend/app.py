from flask import abort, Flask, make_response, request, session
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('S_KEY')
CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})


@app.route('/logIn', methods=['POST'])
def log_in() -> dict[str, bool]:
    user_data = request.get_json()
    if type(user_data) != dict or user_data.keys() != {'login', 'password'}:
        abort(400)
    user_key = os.urandom(12).hex()
    resp = make_response()
    resp.set_cookie('user_key', user_key)
    session['user_key'] = user_key
    return {'result': True}


@app.route('/logOut', methods=['GET'])
def log_out() -> dict[str, bool]:
    user_key = request.args.get('user_key')
    if len(user_key) != 12 or session['user_key'] != user_key:
        abort(400)
    return {'result': True}


@app.route('/addRiddle', methods=['POST'])
def add_riddle() -> str:
    riddle = 'riddle'
    answer = 'answer'
    data = request.get_json()
    if type(data) != dict or data.keys() != {riddle, answer}:
        abort(400)
    riddle_data = data[riddle], data[answer]
    return '5'


@app.route('/verifyAnswer', methods=['GET'])
def verify_answer() -> dict[str, bool]:
    riddle_id = 'id'
    answer = 'answer'
    riddle_data = request.args.to_dict()
    if type(riddle_data) != dict or (riddle_data.keys() != {answer, riddle_id} or not riddle_data[riddle_id].isnumeric()):
        abort(400)
    return {'correct': True}


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict[str, str, int]]]:
    return {'riddles': [{'id': 1, 'create_date': '23.11.2022', 'riddle': '...'}]}
