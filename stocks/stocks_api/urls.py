from django.urls import include, path, register_converter
from . import views
from datetime import datetime

class DateConverter:
    regex = '\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        return datetime.strptime(value, '%Y-%m-%d')

    def to_url(self, value):
        return value

register_converter(DateConverter, 'date')

urlpatterns = [
    path('stocks/<str:symbol>/<date:start>/<date:end>/', views.get_stocks),
    path('symbols/', views.get_symbols),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
