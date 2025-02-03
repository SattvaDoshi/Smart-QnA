from app.services.pdf_processor import extract_text_from_pdf
from app.services.question_generator import BloomsQuestionGenerator
from app.services.answer_generator import extract_answer_from_pdf, generate_answer_with_llm
from app.utils.similarity_calculator import calculate_similarity

class QuestionController:
    def __init__(self):
        self.question_generator = BloomsQuestionGenerator()
    
    def generate_questions(self, pdf_path, topic, blooms_level, num_questions, marks_per_question):
        try:
            # Extract text from PDF
            text = extract_text_from_pdf(pdf_path)
            
            # Generate questions
            questions = self.question_generator.generate_questions(
                text, 
                topic, 
                num_questions, 
                blooms_level
            )
            
            # Process questions with answers and similarity
            processed_questions = []
            for question in questions:
                pdf_answer = extract_answer_from_pdf(text, question, marks_per_question)
                llm_answer = generate_answer_with_llm(question, len(pdf_answer.split()))
                similarity = calculate_similarity(pdf_answer, llm_answer)
                
                processed_questions.append({
                    'question': question,
                    'pdf_answer': pdf_answer,
                    'llm_answer': llm_answer,
                    'similarity': similarity,
                    'marks': marks_per_question
                })
            
            return processed_questions
        
        except Exception as e:
            raise RuntimeError(f"Error generating questions: {str(e)}")