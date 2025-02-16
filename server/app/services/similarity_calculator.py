from app.services import service_config
import numpy as np
import re
from typing import List, Tuple, Dict, Union

class SimilarityCalculator:
    def __init__(self):
        self.model = service_config.transformer

    def preprocess_text(self, text: str) -> str:
        """Preprocess text for similarity calculation"""
        return re.sub(r'[^a-z0-9\s.,!?]', '', text.lower().strip())

    def calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate semantic similarity between two texts"""
        try:
            embedding1 = self.model.encode(self.preprocess_text(text1), convert_to_tensor=True)
            embedding2 = self.model.encode(self.preprocess_text(text2), convert_to_tensor=True)
            similarity = np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))
            return float(similarity)
        except Exception as e:
            raise ValueError(f"Error calculating similarity: {e}")

    def calculate_similarities(self, reference_text: str, comparison_texts: List[str]) -> List[Dict[str, Union[str, float]]]:
        """Calculate similarities between reference and multiple texts"""
        results = []
        ref_embedding = self.model.encode(self.preprocess_text(reference_text), convert_to_tensor=True)
        for text in comparison_texts:
            try:
                comp_embedding = self.model.encode(self.preprocess_text(text), convert_to_tensor=True)
                similarity = float(np.dot(ref_embedding, comp_embedding) / (np.linalg.norm(ref_embedding) * np.linalg.norm(comp_embedding)))
                results.append({'text': text, 'similarity': similarity, 'interpretation': self.interpret_similarity(similarity)})
            except Exception as e:
                results.append({'text': text, 'error': str(e)})
        return results

    def interpret_similarity(self, similarity: float) -> str:
        """Interpret similarity score"""
        if similarity > 0.8:
            return "high_similarity"
        elif similarity > 0.6:
            return "moderate_similarity"
        elif similarity > 0.4:
            return "low_similarity"
        return "very_low_similarity"

# Singleton instance
similarity_calculator = SimilarityCalculator()
