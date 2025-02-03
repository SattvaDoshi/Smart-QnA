# app/__init__.py (already provided in previous artifact)
from flask import Flask
from flask_cors import CORS
from config.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    
    app.config.from_object(config_class)
    
    # Import and register blueprints
    from .routes import question_routes
    app.register_blueprint(question_routes.bp)
    
    return app