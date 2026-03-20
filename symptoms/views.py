from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def check_symptoms(request):
    symptoms = request.data.get("symptoms", "").lower()

    if "fever" in symptoms and "cough" in symptoms:
        return Response({
            "condition": "Possible Viral Infection",
            "urgency": "Low",
            "advice": "Rest and drink fluids."
        })

    elif "chest pain" in symptoms:
        return Response({
            "condition": "Possible Cardiac Issue",
            "urgency": "High",
            "advice": "Seek immediate medical attention."
        })

    return Response({
        "condition": "General Condition",
        "urgency": "Medium",
        "advice": "Monitor symptoms and consult doctor."
    })
