
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import SYMPTOM_MAP

# Create your views here.
@api_view(['POST'])
def check_symptoms(request):
    symptoms = request.data.get("symptoms",[])
    condition_count = {}

    for symptom in symptoms:
        for condition in SYMPTOM_MAP.get(symptoms,[]):
            condition_count[condition]= condition_count.get(condition,0)+1
    result = sorted(condition_count, key=condition_count.get, reverse=True)
    return Response({"possible_conditions":result[:3]})
