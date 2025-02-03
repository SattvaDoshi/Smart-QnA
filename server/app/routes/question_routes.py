from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from app.controllers.question_controller import QuestionController
from config.config import Config

bp = Blueprint('questions', __name__, url_prefix='/api/questions')
question_controller = QuestionController()

@bp.route('/generate', methods=['POST'])
def generate_questions():
    try:
        # Check if PDF is present
        if 'pdf' not in request.files:
            return jsonify({"error": "No PDF file uploaded"}), 400
        
        pdf_file = request.files['pdf']
        
        # Additional validations
        if pdf_file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        if not pdf_file.filename.lower().endswith('.pdf'):
            return jsonify({"error": "Invalid file type. Please upload a PDF"}), 400
        
        # Secure filename
        filename = secure_filename(pdf_file.filename)
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        pdf_file.save(filepath)
        
        # Extract parameters
        topic = request.form.get('topic', '')
        blooms_level = request.form.get('blooms_level', 'remember')
        num_questions = int(request.form.get('num_questions', 5))
        marks_per_question = int(request.form.get('marks_per_question', 1))
        
        # Generate questions
        result = question_controller.generate_questions(
            filepath, 
            topic, 
            blooms_level, 
            num_questions, 
            marks_per_question
        )
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500