from flask import abort, Flask, request, session
from flask_cors import CORS
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = 'c7efec1dc12e19fe45998e418f8bc20603eb026f'

CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})


@app.route('/logIn', methods=['POST'])
def log_in(resp) -> dict[str, bool]:
    user_data = request.get_json()
    if type(user_data) != dict or user_data.keys() != {'login', 'password'}:
        abort(400)
    user_id = os.urandom(12).hex()
    resp.set_cookie('id', user_id)
    session['user_id'] = user_id
    return {'authentication': True}


@app.route('/logOut', methods=['GET'])
def log_out() -> None:
    user_id = request.cookies.get('id')
    if session['user_id'] != user_id:
        abort(404, description="CSRF protection worked")


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
