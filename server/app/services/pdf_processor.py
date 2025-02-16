import PyPDF2

def extract_text_from_pdf(pdf_file):
    """
    Extract text from a PDF file
    
    Args:
        pdf_file: File object containing PDF data
        
    Returns:
        str: Extracted text from the PDF
    """
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        raise Exception(f"Error processing PDF: {str(e)}")