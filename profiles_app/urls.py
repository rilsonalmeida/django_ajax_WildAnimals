from django.urls import path

from .views import my_profile_view

app_name = 'profiles_app'

urlpatterns = [
    path('', my_profile_view, name='my-profile'),
    
]