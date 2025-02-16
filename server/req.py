import requests

url = "http://127.0.0.1:5000/api/v1/questions"
files = {'pdf': open('PHYSICAL LAYER (1).pdf', 'rb')}
data = {
    'topic': 'Artificial Intelligence',
    'blooms_level': 'Apply',
    'num_questions': 5,
    'marks_per_question': 2
}

response = requests.post(url, files=files, data=data)

print(response.status_code)
print(response.json())
