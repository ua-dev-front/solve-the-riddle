import os

from dotenv import load_dotenv
from flask import abort, Flask, make_response, request, session
from flask_cors import CORS
import psycopg2
from werkzeug.security import check_password_hash, generate_password_hash

USER_KEY = 'user_key'
USER_ID = 'user_id'
MAX_RIDDLE_LEN = 5000
MAX_ANSWER_LEN = 500

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


def normalize(answer) -> str:
    return ' '.join(answer.split()).lower()


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
            resp.set_cookie(USER_KEY, key)
            session[USER_KEY], session[USER_ID] = key, current_id
            return {error: None}
        else:
            return {error: password}
    else:
        return {error: login}


@app.route('/logOut', methods=['GET'])
def log_out() -> dict[str, bool]:
    data = request.args.to_dict()
    if USER_KEY not in session.keys() or USER_KEY not in data.keys() or session[USER_KEY] != data[USER_KEY]:
        abort(400)
    session.clear()
    resp = make_response()
    resp.set_cookie(USER_KEY, '', expires=0)
    return {'result': True}


@app.route('/addRiddle', methods=['POST'])
def add_riddle() -> dict[str, str | dict[str, int | str] | None]:
    riddle = 'riddle'
    answer = 'answer'
    error = 'error'
    data = request.get_json()
    if type(data) != dict or data.keys() != {riddle, answer} or type(data[riddle]) != str or type(data[answer]) != str:
        abort(400)
    if len(data[riddle]) > MAX_RIDDLE_LEN:
        return {error: 'long_riddle'}
    if len(data[answer]) > MAX_ANSWER_LEN:
        return {error: 'long_answer'}
    riddle_data = data[riddle], data[answer]
    cur.execute('insert into riddles (riddle, solution) values (%s, %s) returning id, creation_date', riddle_data)
    con.commit()
    riddle_id, creation_date = cur.fetchone()
    return {error: None, 'data': {'id': riddle_id, 'creationDate': str(creation_date.date())}}


@app.route('/verifyAnswer', methods=['GET'])
def verify_answer() -> dict[str, bool]:
    riddle_id = 'id'
    answer = 'answer'
    riddle_data = request.args.to_dict()
    if riddle_data.keys() != {answer, riddle_id} or not riddle_data[riddle_id].isnumeric():
        abort(400)
    cur.execute('select solution from riddles where id = %s', (int(riddle_data[riddle_id]),))
    initial_data = cur.fetchone()
    if initial_data:
        if USER_ID in session.keys():
            cur.execute('insert into user_data (user_id, riddle_id, answer) values (%s, %s, %s) '
                        'on conflict (user_id, riddle_id) do update set answer = excluded.answer',
                        (session[USER_ID], int(riddle_data[riddle_id]), riddle_data[answer]))
            con.commit()
        return {'correct': normalize(initial_data[0]) == normalize(riddle_data[answer])}
    else:
        abort(404)


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict]]:
    user_data = dict()
    if USER_ID in session.keys():
        cur.execute('select riddle_id, answer from user_data where user_id = %s', str(session[USER_ID]))
        for riddle_id, answer in cur.fetchall():
            user_data[riddle_id] = answer
    cur.execute('select id, creation_date, riddle from riddles order by id')
    return {'riddles': [{'id': riddle_id, 'creationDate': creation_date, 'riddle': riddle,
                        'answer': user_data.get(riddle_id) if riddle_id in user_data.keys() else None}
                        for riddle_id, creation_date, riddle in cur.fetchall()]}
