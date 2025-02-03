from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from app.controllers.question_controller import QuestionController
from app.services.pdf_processor import extract_text_from_pdf  # Import PDF extraction
from config.config import Config

bp = Blueprint('questions', __name__, url_prefix='/api/questions')
question_controller = QuestionController()

# This will hold the extracted content from the PDF
extracted_pdf_content = None

@bp.route('/extract', methods=['POST'])
def extract_pdf_content():
    try:
        # Ensure a file is uploaded
        if 'pdf' not in request.files:
            return jsonify({"error": "No PDF file uploaded"}), 400
        
        pdf_file = request.files['pdf']
        
        # Validate file
        if pdf_file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        if not pdf_file.filename.lower().endswith('.pdf'):
            return jsonify({"error": "Invalid file type. Please upload a PDF"}), 400
        
        # Secure filename and save temporarily
        filename = secure_filename(pdf_file.filename)
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        pdf_file.save(filepath)
        
        # Extract text from PDF
        extracted_text = extract_text_from_pdf(filepath)
        
        # Clean up the uploaded file
        os.remove(filepath)
        
        # Store extracted text in a global variable
        global extracted_pdf_content
        extracted_pdf_content = extracted_text
        
        return jsonify({"extracted_text": extracted_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/generate', methods=['POST'])
def generate_questions():
    try:
        # Check if PDF is uploaded
        if 'pdf' not in request.files and extracted_pdf_content is None:
            return jsonify({"error": "No PDF file uploaded and no extracted content available"}), 400
        
        if 'pdf' in request.files:
            pdf_file = request.files['pdf']
            
            # Validate file
            if pdf_file.filename == '':
                return jsonify({"error": "No selected file"}), 400
            if not pdf_file.filename.lower().endswith('.pdf'):
                return jsonify({"error": "Invalid file type. Please upload a PDF"}), 400
            
            # Secure filename and save temporarily
            filename = secure_filename(pdf_file.filename)
            filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
            pdf_file.save(filepath)
            
            # Extract text from PDF
            extracted_text = extract_text_from_pdf(filepath)
            
            # Clean up uploaded file
            os.remove(filepath)
            
            # Store extracted text in a global variable
            global extracted_pdf_content
            extracted_pdf_content = extracted_text
        else:
            # Use already extracted content
            extracted_text = extracted_pdf_content
        
        # Extract parameters from request
        topic = request.form.get('topic', '')
        blooms_level = request.form.get('blooms_level', 'remember')
        num_questions = int(request.form.get('num_questions', 5))
        marks_per_question = int(request.form.get('marks_per_question', 1))
        
        # Generate questions using extracted text
        result = question_controller.generate_questions(
            extracted_text,  # Use extracted text instead of file path
            topic, 
            blooms_level, 
            num_questions, 
            marks_per_question
        )
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
