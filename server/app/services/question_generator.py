import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

class EnhancedQuestionGenerator:
    def __init__(self):
        self.blooms_levels = {
            "remember": {
                "description": "Test recall of specific information",
                "verbs": ["define", "list", "recall", "identify", "name", "state"],
                "complexity": {
                    1: {"min_words": 10, "max_words": 20},
                    2: {"min_words": 20, "max_words": 40},
                    3: {"min_words": 40, "max_words": 60}
                }
            },
            "understand": {
                "description": "Demonstrate understanding of facts and ideas",
                "verbs": ["explain", "describe", "discuss", "interpret", "summarize"],
                "complexity": {
                    1: {"min_words": 20, "max_words": 40},
                    2: {"min_words": 40, "max_words": 60},
                    3: {"min_words": 60, "max_words": 80}
                }
            },
            "apply": {
                "description": "Apply knowledge to actual situations",
                "verbs": ["apply", "demonstrate", "solve", "use", "implement"],
                "complexity": {
                    1: {"min_words": 30, "max_words": 50},
                    2: {"min_words": 50, "max_words": 70},
                    3: {"min_words": 70, "max_words": 90}
                }
            },
            "analyze": {
                "description": "Break information into parts to explore relationships",
                "verbs": ["analyze", "compare", "contrast", "examine", "investigate"],
                "complexity": {
                    1: {"min_words": 40, "max_words": 60},
                    2: {"min_words": 60, "max_words": 80},
                    3: {"min_words": 80, "max_words": 100}
                }
            },
            "evaluate": {
                "description": "Justify a stand or decision",
                "verbs": ["evaluate", "assess", "criticize", "judge", "defend"],
                "complexity": {
                    1: {"min_words": 50, "max_words": 70},
                    2: {"min_words": 70, "max_words": 90},
                    3: {"min_words": 90, "max_words": 110}
                }
            },
            "create": {
                "description": "Create new product or point of view",
                "verbs": ["create", "design", "develop", "propose", "formulate"],
                "complexity": {
                    1: {"min_words": 60, "max_words": 80},
                    2: {"min_words": 80, "max_words": 100},
                    3: {"min_words": 100, "max_words": 120}
                }
            }
        }

    def generate_prompt(self, text, topic, num_questions, blooms_level, marks):
        level_info = self.blooms_levels[blooms_level.lower()]
        complexity = level_info["complexity"][min(marks, 3)]
        verbs = level_info["verbs"]
        
        prompt = f"""Generate {num_questions} unique questions about '{topic}' based on the following text. 

Context:
{text}

Requirements:
1. Questions should be at the {blooms_level.upper()} level of Bloom's Taxonomy
2. Use these action verbs: {', '.join(verbs)}
3. Each question should require {marks} mark(s) to answer
4. Expected answer length: {complexity['min_words']}-{complexity['max_words']} words
5. Questions must:
   - Be directly related to the text content
   - Be clear and unambiguous
   - Not be repetitive
   - Be appropriate for academic assessment
6. Format each question on a new line
7. Do not include answers in the response

If the text doesn't contain enough relevant information, generate fewer high-quality questions instead of forcing low-quality ones."""

        return prompt

    def generate_questions(self, text, topic, num_questions, blooms_level, marks):
        """
        Generate questions based on provided parameters
        
        Args:
            text (str): Source text from PDF
            topic (str): Main topic
            num_questions (int): Number of questions to generate
            blooms_level (str): Bloom's taxonomy level
            marks (int): Marks per question
            
        Returns:
            list: Generated questions
        """
        try:
            # Validate blooms_level
            if blooms_level.lower() not in self.blooms_levels:
                raise ValueError(f"Invalid Bloom's level. Must be one of: {', '.join(self.blooms_levels.keys())}")

            # Generate prompt
            prompt = self.generate_prompt(text, topic, num_questions, blooms_level, marks)

            # Get response from LLM
            response = model.generate_content(prompt)
            
            # Process and clean questions
            questions = [
                q.strip() for q in response.text.split('\n') 
                if q.strip() and not q.lower().startswith(('note:', 'here', 'question'))
            ]
            
            # Remove duplicates and limit to requested number
            questions = list(dict.fromkeys(questions))[:num_questions]
            
            if not questions:
                raise Exception("No valid questions could be generated from the provided text")
                
            return questions

        except Exception as e:
            raise Exception(f"Error generating questions: {str(e)}")

    def get_available_levels(self):
        """Get list of available Bloom's taxonomy levels"""
        return list(self.blooms_levels.keys())

    def get_level_description(self, level):
        """Get description for a specific Bloom's taxonomy level"""
        level = level.lower()
        if level in self.blooms_levels:
            return self.blooms_levels[level]["description"]
        raise ValueError(f"Invalid Bloom's level: {level}")