from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from .serializers import UserRegisterSerializer,UserSerializer
from .models import CartItem
from .serializers import CartItemSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Patient registered successfully"},
            status=201
        )
    return Response(serializer.errors, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "username": user.username,
        "is_doctor": user.is_doctor,
    } )
@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    print("LOGIN DATA:", username, password)  # debug

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            "message": "Login successful",
            "is_doctor": user.is_doctor
        })
    else:
        return Response(
            {"error": "Invalid username or password"},
            status=400
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


USER_ID = 1

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def cart(request):

    User = get_user_model()
    user = User.objects.get(id=USER_ID)

    # ✅ helper function for count
    def get_cart_count():
        return sum(item.quantity for item in CartItem.objects.filter(user=user))

    # ✅ GET → fetch cart
    if request.method == 'GET':
        items = CartItem.objects.filter(user=user)
        serializer = CartItemSerializer(items, many=True)

        return Response({
            "items": serializer.data,
            "count": get_cart_count()   # 🔥 added
        })

    # ✅ POST → add/update cart
    if request.method == 'POST':
        name = request.data.get("name")
        price = request.data.get("price")

        item, created = CartItem.objects.get_or_create(
            user=user,
            name=name,
            defaults={"price": price, "quantity": 1}
        )

        if not created:
            item.quantity += 1
            item.save()

        return Response({
            "message": "Item added",
            "count": get_cart_count()   # 🔥 added
        })

    # ✅ PUT → update quantity
    if request.method == 'PUT':
        name = request.data.get("name")
        action = request.data.get("action")

        try:
            item = CartItem.objects.get(user=user, name=name)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)

        if action == "inc":
            item.quantity += 1

        elif action == "dec":
            item.quantity -= 1
            if item.quantity <= 0:
                item.delete()
                return Response({
                    "message": "Item removed",
                    "count": get_cart_count()  # 🔥 updated
                })

        item.save()

        return Response({
            "message": "Updated",
            "count": get_cart_count()   # 🔥 added
        })

    # ✅ DELETE → remove item
    if request.method == 'DELETE':
        name = request.data.get("name")

        CartItem.objects.filter(user=user, name=name).delete()

        return Response({
            "message": "Item removed",
            "count": get_cart_count()   # 🔥 added
        })