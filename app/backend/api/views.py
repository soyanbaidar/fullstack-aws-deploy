from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

@api_view(['GET'])
def hello(request: Request):
    return Response({'message': 'Django API is working!'})

@api_view(['GET'])
def api_index(request: Request):
    return Response({
        'status': 'API is active',
        'endpoints': {
            'hello': '/api/hello/',
            'admin': '/admin/'
        }
    })