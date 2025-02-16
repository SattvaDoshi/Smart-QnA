import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

def get_target_length(marks):
    """
    Determine target answer length based on marks
    
    Args:
        marks (int): Number of marks for the question
        
    Returns:
        dict: Min and max word count for the answer
    """
    base_length = {
        1: {"min": 20, "max": 30},
        2: {"min": 40, "max": 60},
        3: {"min": 60, "max": 90},
        4: {"min": 80, "max": 120},
        5: {"min": 100, "max": 150}
    }
    
    if marks in base_length:
        return base_length[marks]
    return {"min": 20 * marks, "max": 30 * marks}

def extract_answer_from_pdf(text, question, marks):
    """
    Extract answer from PDF text for a given question
    
    Args:
        text (str): Source text from PDF
        question (str): Question to answer
        marks (int): Number of marks for the question
        
    Returns:
        str: Generated answer from PDF content
    """
    try:
        length = get_target_length(marks)
        
        prompt = f"""Based on the following text, provide a detailed answer to the question.

Question: {question}

Text Context:
{text}

Requirements:
1. Answer should be {length['min']}-{length['max']} words
2. Use only information from the provided text
3. Structure the answer appropriately for {marks} mark(s)
4. Maintain academic language and tone
5. Be specific and directly address the question
6. Include relevant examples or evidence from the text
7. Do not include phrases like "Based on the text" or "According to the passage"

If the text doesn't contain enough information, provide the most relevant answer possible using the available content."""

        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        raise Exception(f"Error generating answer from PDF: {str(e)}")

def generate_answer_with_llm(question, target_words):
    """
    Generate answer using LLM without PDF context
    
    Args:
        question (str): Question to answer
        target_words (int): Target word count for answer
        
    Returns:
        str: Generated answer
    """
    try:
        prompt = f"""Provide a comprehensive answer to the following question in approximately {target_words} words.

Question: {question}

Requirements:
1. Answer should be approximately {target_words} words
2. Use clear, academic language
3. Provide specific examples or evidence
4. Structure the answer logically
5. Be direct and focused on the question"""

        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        raise Exception(f"Error generating answer with LLM: {str(e)}")