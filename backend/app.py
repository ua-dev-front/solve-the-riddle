from flask import abort, Flask, request
from flask_cors import CORS

riddle = 'riddle'
answer = 'answer'
riddle_id = 'id'

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})


@app.route('/logIn', methods=['POST'])
def log_in() -> dict[str, bool]:
    user_data = request.get_json()
    if type(user_data) != dict or user_data.keys() != {'login', 'password'}:
        abort(400)
    return {'authentication': True}


@app.route('/logOut', methods=['GET'])
def log_out() -> None:
    pass


@app.route('/addRiddle', methods=['POST'])
def add_riddle() -> str:
    data = request.get_json()
    if type(data) != dict or data.keys() != {riddle, answer}:
        abort(400)
    riddle_data = data[riddle], data[answer]
    return '5'


@app.route('/getAnswerCorrectness', methods=['GET'])
def get_answer_correctness() -> dict[str, bool]:
    riddle_data = request.args.to_dict()
    if type(riddle) != dict or (riddle_data.keys() != {answer, riddle_id} or not riddle_data[riddle_id].isnumeric()):
        abort(400)
    return {'correct': True}


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict[str, str, int]]]:
    return {'riddles': [{riddle_id: 1, 'create_date': '23.11.2022', riddle: '...'}]}
