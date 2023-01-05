import os
import psycopg2

from dotenv import load_dotenv
from flask import abort, Flask, make_response, request, session
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('S_KEY')
CORS(app, resources={r'*': {'origins': ['http://localhost:3000']}})

con = psycopg2.connect(
    host=os.getenv('HOST'),
    database=os.getenv('DATABASE'),
    user=os.getenv('USER'),
    password=os.getenv('PASSWORD'),
    port=os.getenv('DB_PORT')
)
cur = con.cursor()


def generate_key() -> str:
    return os.urandom(12).hex()


@app.route('/register', methods=['POST'])
def register() -> dict[str, bool]:
    login = 'login'
    password = 'password'
    user_data = request.get_json()
    if type(user_data) != dict or user_data.keys() != {login, password}:
        abort(400)
    cur.execute('insert into users (login, password_hash) values (%s, %s)',
                (user_data[login], generate_password_hash(user_data[password])))
    con.commit()
    return {'result': True}


@app.route('/logIn', methods=['POST'])
def log_in() -> dict[str, str | None]:
    login = 'login'
    password = 'password'
    error = 'error'
    user_key = 'user_key'
    user_id = 'user_id'
    user_data = request.get_json()
    if type(user_data) != dict or user_data.keys() != {login, password} \
            or (type(user_data[login]) != str or type(user_data[password])) != str:
        abort(400)
    cur.execute('select id, password_hash from users where login = %s', (user_data[login],))
    initial_data = cur.fetchone()
    if initial_data:
        current_id, psw_hash = initial_data
        if check_password_hash(psw_hash, user_data[password]):
            key = generate_key()
            resp = make_response()
            resp.set_cookie(user_key, key)
            session[user_key], session[user_id] = key, current_id
            return {error: None}
        else:
            return {error: password}
    else:
        return {error: login}


@app.route('/logOut', methods=['GET'])
def log_out() -> dict[str, bool]:
    user_key = 'user_key'
    data = request.args.to_dict()
    if not user_key in session.keys() or not user_key in data.keys() or session[user_key] != data[user_key]:
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
    if riddle_data.keys() != {answer, riddle_id} or not riddle_data[riddle_id].isnumeric():
        abort(400)
    return {'correct': True}


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict]]:
    return {'riddles': [{'id': 1, 'creationDate': '23.11.2022', 'riddle': '...', 'answer': '...'}]}
