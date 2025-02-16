from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS with credentials support for the specified origin.
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
    
    from app.routes import api
    app.register_blueprint(api, url_prefix='/api/v1')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
