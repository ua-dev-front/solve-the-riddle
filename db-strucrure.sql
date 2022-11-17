CREATE TABLE riddles (
    id integer NOT NULL,
    riddle text,
    solution text
);


CREATE SEQUENCE riddles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE riddles_id_seq OWNED BY riddles.id;


CREATE TABLE user_data (
    user_id integer NOT NULL,
    riddle_id integer NOT NULL,
    answer text
);


CREATE TABLE users (
    id integer NOT NULL,
    login text,
    password text
);


CREATE SEQUENCE users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ONLY riddles ALTER COLUMN id SET DEFAULT nextval('riddles_id_seq'::regclass);


ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


ALTER TABLE ONLY riddles
    ADD CONSTRAINT riddles_pk PRIMARY KEY (id);


ALTER TABLE ONLY users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);
