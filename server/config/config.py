import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_default_secret_key')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB file upload limit
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')
    
    # Ensure upload directory exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)