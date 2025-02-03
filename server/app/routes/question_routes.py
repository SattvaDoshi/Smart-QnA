from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from app.controllers.question_controller import QuestionController
from app.services.pdf_processor import extract_text_from_pdf
from config.config import Config

bp = Blueprint('questions', __name__, url_prefix='/api/questions')
question_controller = QuestionController()
extracted_pdf_content = None

def validate_pdf_file(file):
    """Validate PDF file upload."""
    if not file:
        return False, "No PDF file uploaded"
    
    if file.filename == '':
        return False, "No selected file"
    
    if not file.filename.lower().endswith('.pdf'):
        return False, "Invalid file type. Please upload a PDF"
    
    return True, None

def process_pdf_file(file):
    """Process PDF file and extract text."""
    filename = secure_filename(file.filename)
    filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    try:
        extracted_text = extract_text_from_pdf(filepath)
        return extracted_text
    finally:
        os.remove(filepath)

@bp.route('/extract', methods=['POST'])
def extract_pdf_content():
    try:
        if 'pdf' not in request.files:
            return jsonify({"error": "No PDF file uploaded"}), 400
        
        pdf_file = request.files['pdf']
        
        # Validate file
        is_valid, error_msg = validate_pdf_file(pdf_file)
        if not is_valid:
            return jsonify({"error": error_msg}), 400
        
        # Extract and process PDF
        global extracted_pdf_content
        extracted_pdf_content = process_pdf_file(pdf_file)
        
        return jsonify({"extracted_text": extracted_pdf_content}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/generate', methods=['POST'])
def generate_questions():
    try:
        # Determine source of text
        if 'pdf' in request.files:
            pdf_file = request.files['pdf']
            
            # Validate file
            is_valid, error_msg = validate_pdf_file(pdf_file)
            if not is_valid:
                return jsonify({"error": error_msg}), 400
            
            # Extract and process PDF
            extracted_text = process_pdf_file(pdf_file)
            
            # Store extracted text in global variable
            global extracted_pdf_content
            extracted_pdf_content = extracted_text
        
        elif extracted_pdf_content is None:
            return jsonify({"error": "No PDF file uploaded and no extracted content available"}), 400
        else:
            extracted_text = extracted_pdf_content
        
        # Extract parameters from request
        topic = request.form.get('topic', '')
        blooms_level = request.form.get('blooms_level', 'remember')
        num_questions = int(request.form.get('num_questions', 5))
        marks_per_question = int(request.form.get('marks_per_question', 1))
        
        # Generate questions using extracted text
        result = question_controller.generate_questions(
            extracted_text,
            topic, 
            blooms_level, 
            num_questions, 
            marks_per_question
        )
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
