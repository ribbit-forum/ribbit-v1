import psycopg2
import uuid
from flask import Flask, render_template, request, redirect, jsonify
from datetime import datetime
from flask_cors import CORS


# setup flask app
app = Flask(__name__)
CORS(app)

# setup posgres database
conn = psycopg2.connect(host='db.bmtkipurpixoqdexanbj.supabase.co', dbname='postgres', user='postgres', password='creatorNudging', port=5432)
cur = conn.cursor()

# create user table
cur.execute("""CREATE TABLE IF NOT EXISTS users (
        user_wallet_address VARCHAR PRIMARY KEY,
        posts TEXT[] DEFAULT ARRAY[]::TEXT[],
        comments TEXT[] DEFAULT ARRAY[]::TEXT[],
        likes TEXT[] DEFAULT ARRAY[]::TEXT[]

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
        content TEXT,
        topic TEXT REFERENCES topics(topic),
        post_date TIMESTAMP,
        user_wallet_address TEXT REFERENCES users(user_wallet_address),
        comments TEXT[] DEFAULT ARRAY[]::TEXT[],
        likes TEXT[] DEFAULT ARRAY[]::TEXT[]
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


@app.route('/connect', methods=['POST'])
def connect():
    user_wallet_address = request.form.get('user_wallet_address')

    cur.execute("""INSERT INTO users (user_wallet_address) VALUES (%s) ON CONFLICT (user_wallet_address) DO NOTHING;""",
                (user_wallet_address,))
    
    cur.execute("""SELECT * FROM users WHERE user_wallet_address = %s;
    """, (user_wallet_address,))
    current_user = cur.fetchone()

    conn.commit()

    if current_user:

        user_dict = {
            'user_wallet_address': current_user[0],
            'posts': current_user[1],
            'comments':current_user[2],
            'likes':current_user[3]
        }
        return jsonify(user_dict)
    else:
        return jsonify({'error': 'User not found'}), 404


@app.route('/newTopic', methods=['POST'])
def newTopic():
    topic = request.form.get('topic')
    
    cur.execute("""INSERT INTO topics (topic) VALUES (%s);""", (topic,))

    return {"topic": topic}


@app.route('/createPost', methods=['POST'])
def createPost():
    post_id = str(uuid.uuid4())
    content = request.form.get('content')
    topic = "crypto"
    post_date = datetime.now()
    user_wallet_address = request.form.get('user_wallet_address')

    print(content)

    cur.execute("""INSERT INTO posts (post_id, content, topic, post_date, user_wallet_address) VALUES (%s, %s, %s, %s, %s);""", 
                (post_id, content, topic, post_date, user_wallet_address))
    
    cur.execute("""UPDATE users SET posts = array_append(posts, %s) WHERE user_wallet_address = %s""",
                (post_id, user_wallet_address))
    
    cur.execute("""SELECT * FROM posts WHERE post_id = %s;""", (post_id,))
    new_post = cur.fetchone()

    conn.commit()

    post_dict = {
        'post_id': new_post[0],
		'content': new_post[1],
		'topic': new_post[2],
		'post_date': new_post[3],
		'user_wallet_address': new_post[4]}
    
    return jsonify(post_dict)

    
@app.route('/likePost', methods=['POST'])
def likePost():
    post_id_to_like = request.form.get('post_id')  # Assuming you have a hidden input field in the form containing the post_id
    user_wallet_address = request.form.get('user_wallet_address')

    cur.execute("""SELECT * FROM likes 
        WHERE user_wallet_address = %s AND post_id = %s;
    """, (user_wallet_address, post_id_to_like))
    existing_like = cur.fetchone()

    if existing_like:
        like_dict = {
             'like_id': existing_like[0],
             'user_wallet_address': existing_like[1],
             'post_id': existing_like[2]
        }
        return jsonify(like_dict)
    
    elif post_id_to_like: #verify that the post exists in the database
        like_id = str(uuid.uuid4())
        

        cur.execute("""INSERT INTO likes (like_id, user_wallet_address, post_id) 
                        VALUES (%s, %s, %s);""",
                    (like_id, user_wallet_address, post_id_to_like))
        cur.execute("""UPDATE users SET likes = array_append(likes, %s) WHERE user_wallet_address = %s""",
                (like_id, user_wallet_address))
        cur.execute("""UPDATE posts SET likes = array_append(likes, %s) WHERE post_id = %s""",
                (like_id, post_id_to_like))   
        
        cur.execute("""SELECT * FROM likes WHERE like_id = %s;""", (like_id,))
        new_like = cur.fetchone()
        
        conn.commit()

        like_dict = {
             'like_id': new_like[0],
             'user_wallet_address': new_like[1],
             'post_id': new_like[2]
        }

        return jsonify(like_dict)


@app.route('/createComment', methods=['POST'])
def createComment():
    comment_id = str(uuid.uuid4())
    comment = request.form.get('comment')
    comment_date= datetime.now()
    user_wallet_address = request.form.get('user_wallet_address')
    post_id = request.form.get('post_id')

    cur.execute("""INSERT INTO comments (comment_id, comment, comment_date, user_wallet_address, post_id) VALUES (%s, %s, %s, %s, %s);""", 
                (comment_id, comment, comment_date, user_wallet_address, post_id))
    cur.execute("""UPDATE users SET comments = array_append(comments, %s) WHERE user_wallet_address = %s""",
                (comment_id, user_wallet_address))
    cur.execute("""UPDATE posts SET comments = array_append(comments, %s) WHERE post_id = %s""",
                (comment_id, post_id))    

    cur.execute("""SELECT * FROM comments WHERE comment_id = %s;""", (comment_id,))
    new_comment = cur.fetchone()             
    
    conn.commit()

    comment_dict = {
         'comment_id': new_comment[0],
         'comment': new_comment[1],
         'comment_date': new_comment[2],
         'user_wallet_address': new_comment[3],
         'post_id': new_comment[4]
    }

    return jsonify(comment_dict)


@app.route('/feed', methods = ['POST'])
def feed(): 
    user_wallet_address = request.form.get('user_wallet_address')
    feed = []

    user_recent_posts = []
    cur.execute("""SELECT * FROM posts WHERE user_wallet_address = %s ORDER BY post_date DESC LIMIT 3;""", (user_wallet_address,))
    user_posts = cur.fetchall()

    for post in user_posts:
        comment_lst = []
        comment_id_list = post[5]
        
        for comment_id in reversed(comment_id_list):
            cur.execute("""SELECT * FROM comments WHERE comment_id = %s;""", (comment_id,))
            comment = cur.fetchone()    

            comment_dict = {
                'comment_id': comment[0],
                'comment': comment[1],
                'comment_date': comment[2],
                'user_wallet_address': comment[3],
                'post_id': comment[4]
            }
            comment_lst.append(comment_dict)

        post_dict = {
            'post_id': post [0], 
            'content': post[1],
            'topic': post[2],
            'post_date': post[3],
            'user_wallet_address': post[4],
            'comments': comment_lst,
            'likes': str(len(post[6]))
            }
        user_recent_posts.append(post_dict)

    feed.append(user_recent_posts)


    feed_posts = []
    cur.execute("""SELECT * FROM posts ORDER BY post_date DESC;""")
    posts = cur.fetchall()

    for post in posts:
        comment_lst = []
        comment_id_list = post[5]
        
        for comment_id in reversed(comment_id_list):
            cur.execute("""SELECT * FROM comments WHERE comment_id = %s;""", (comment_id,))
            comment = cur.fetchone()    

            comment_dict = {
                'comment_id': comment[0],
                'comment': comment[1],
                'comment_date': comment[2],
                'user_wallet_address': comment[3],
                'post_id': comment[4]
            }
            comment_lst.append(comment_dict)
        
        post_dict = {'post_id':post [0], 
                     'content': post[1],
                     'topic': post[2],
                     'post_date': post[3],
                     'user_wallet_address': post[4],
                     'comments': comment_lst,
                     'likes': len(post[6])
                     }
        feed_posts.append(post_dict)
    feed.append(feed_posts)


    return jsonify(feed)

if __name__ == '__main__':
        try:
             app.run(debug=True)
        finally:
             cur.close()
             conn.commit()