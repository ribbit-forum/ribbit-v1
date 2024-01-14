import psycopg2
import uuid
from flask import Flask, render_template, request
from datetime import datetime


# setup flask app
app = Flask(__name__)

# setup posgres database
conn = psycopg2.connect(host='localhost', dbname='frogfessions', user='postgres', password='PostgreSQL1', port=5432)
cur = conn.cursor()

# # create user table
cur.execute("""CREATE TABLE IF NOT EXISTS users (
        user_wallet_address VARCHAR PRIMARY KEY,
        username TEXT NOT NULL,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        birthdate DATE        
);
""")

# create topics  table
cur.execute("""CREATE TABLE IF NOT EXISTS topics (
        topic TEXT PRIMARY KEY
);
""")

# create posts table
cur.execute("""CREATE TABLE IF NOT EXISTS posts (
        post_id TEXT PRIMARY KEY,
        title TEXT,
        content TEXT,
        topic TEXT REFERENCES topics(topic),
        post_date TIMESTAMP,
        user_wallet_address TEXT REFERENCES users(user_wallet_address) 
)
""")
            
# create comments table
cur.execute("""CREATE TABLE IF NOT EXISTS comments (
        comment_id TEXT PRIMARY KEY,
        comment TEXT,
        comment_date TIMESTAMP,
        user_wallet_address TEXT REFERENCES users (user_wallet_address),
        post_id TEXT REFERENCES posts (post_id)
);
""")

# create likes table
cur.execute("""CREATE TABLE IF NOT EXISTS likes (
        like_id TEXT PRIMARY KEY,
        user_wallet_address TEXT REFERENCES users (user_wallet_address),
        post_id TEXT REFERENCES posts (post_id)
);
""")

@app.route('/')
def index():
    return "Landing Page"

# @app.route('/signin', methods=['POST'])
# def signin():
#     if request.method == 'POST':
#          pass
#     return "Sign In Page"

def get_current_user_wallet_address():
    # Replace this with code that returns the current user's wallet address after they sign in
    return "user_wallet_address_placeholder"

@app.route('/home', methods = ['GET', 'POST'])
def home(): 
    if request.method == 'POST':
        action = request.form.get('action')

        if action  == 'create_post':
            post_id = str(uuid.uuid4())
            title = request.form.get('title')
            content = request.form.get('content')
            topic = request.form.get('topic')
            post_date = datetime.now()
            user_wallet_address = get_current_user_wallet_address()

            cur.execute("""INSERT INTO posts (post_id, title, content, topic, post_date, user_wallet_address) VALUES (%s, %s, %s, %s, %s, %s);""", 
                        (post_id, title, content, topic, post_date, user_wallet_address))
            
            conn.commit()
            
        if action == 'like_post':
            post_id_to_like = request.form.get('post_id')  # Assuming you have a hidden input field in the form containing the post_id

            if post_id_to_like:
                like_id = str(uuid.uuid4())
                user_wallet_address = get_current_user_wallet_address()

                cur.execute("""INSERT INTO likes (like_id, user_wallet_address, post_id) 
                               VALUES (%s, %s, %s);""",
                            (like_id, user_wallet_address, post_id_to_like))
                
                conn.commit()

        if action == 'delete_post':
            pass
    else:
        return "Home Page"



# close postgres database
cur.close()
conn.commit()

if __name__ == '__main__':
    app.run(debug=True)