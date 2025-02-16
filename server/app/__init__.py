from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    
    from app.routes import api
    app.register_blueprint(api, url_prefix='/api/v1')
    
    return app