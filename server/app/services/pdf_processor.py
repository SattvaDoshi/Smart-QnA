import PyPDF2

def extract_text_from_pdf(pdf_path):
    try:
        text = ""
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
        return text.strip() if text else "No text found in PDF."
    except Exception as e:
        return f"Error extracting text: {str(e)}"
