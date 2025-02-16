import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from app.services.pdf_processor import extract_text_from_pdf
from app.services.question_generator import EnhancedQuestionGenerator
from app.services.answer_generator import extract_answer_from_pdf, generate_answer_with_llm
from app.services.similarity_calculator import similarity_calculator

api = Blueprint('api', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@api.route('/questions', methods=['POST'])
def generate_questions():
    if 'pdf' not in request.files:
        return jsonify({
            'status': 'error',
            'message': 'No PDF file uploaded'
        }), 400
        
    file = request.files['pdf']
    if file.filename == '':
        return jsonify({
            'status': 'error',
            'message': 'No selected file'
        }), 400
        
    if not allowed_file(file.filename):
        return jsonify({
            'status': 'error',
            'message': 'Invalid file type'
        }), 400

    try:
        # Extract parameters
        topic = request.form.get('topic')
        if not topic:
            return jsonify({
                'status': 'error',
                'message': 'Topic is required'
            }), 400

        blooms_level = request.form.get('blooms_level')
        if not blooms_level:
            return jsonify({
                'status': 'error',
                'message': 'Bloom\'s level is required'
            }), 400

        num_questions = int(request.form.get('num_questions', 5))
        marks_per_question = int(request.form.get('marks_per_question', 1))

        # Process PDF
        text = extract_text_from_pdf(file)
        
        # Generate questions
        question_generator = EnhancedQuestionGenerator()
        questions = question_generator.generate_questions(
            text, 
            topic, 
            num_questions, 
            blooms_level,
            marks_per_question
        )

        # Generate answers and calculate similarity
        results = []
        for question in questions:
            pdf_answer = extract_answer_from_pdf(text, question, marks_per_question)
            llm_answer = generate_answer_with_llm(question, len(pdf_answer.split()))
            # Fix: Call the calculate_similarity method instead of trying to call the calculator directly
            similarity = similarity_calculator.calculate_similarity(pdf_answer, llm_answer)
            
            results.append({
                'question': question,
                'pdf_answer': pdf_answer,
                'llm_answer': llm_answer,
                'similarity': round(similarity * 100, 2),
                'similarity_interpretation': get_similarity_interpretation(similarity)
            })

        return jsonify({
            'status': 'success',
            'data': {
                'topic': topic,
                'blooms_level': blooms_level,
                'num_questions': num_questions,
                'marks_per_question': marks_per_question,
                'results': results
            }
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

def get_similarity_interpretation(similarity):
    if similarity > 0.8:
        return "high_similarity"
    elif similarity > 0.6:
        return "moderate_similarity"
    else:
        return "low_similarity"

@api.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        'status': 'success',
        'message': 'API is running'
    })