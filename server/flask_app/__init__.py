from flask import Flask
import os

app = Flask(__name__)

app.secret_key = os.environ.get("FLASK_APP_SECRET_KEY")