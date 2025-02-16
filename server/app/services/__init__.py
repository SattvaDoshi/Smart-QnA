# app/services/__init__.py

import os
from dotenv import load_dotenv
import google.generativeai as genai
from sentence_transformers import SentenceTransformer

# Load environment variables
load_dotenv()

# Configure Google AI
def setup_google_ai():
    """Initialize Google Gemini API with API key"""
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise EnvironmentError("GOOGLE_API_KEY not found in environment variables")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-pro')

# Initialize sentence transformer
def setup_sentence_transformer():
    """Initialize the sentence transformer model"""
    try:
        return SentenceTransformer('all-MiniLM-L6-v2')
    except Exception as e:
        raise Exception(f"Error initializing sentence transformer: {str(e)}")

# Service configuration class
class ServiceConfig:
    """Configuration for services"""
    def __init__(self):
        self.model = setup_google_ai()
        self.transformer = setup_sentence_transformer()
        self.max_retries = 3
        self.timeout = 30
        self.chunk_size = 4000  # Maximum text chunk size for processing

# Initialize services
try:
    service_config = ServiceConfig()
except Exception as e:
    raise Exception(f"Error initializing services: {str(e)}")

# Export configuration
__all__ = ['service_config']