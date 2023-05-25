from django.urls import path

from .views import (
    post_list_and_create,
    hello_view
)

app_name = 'posts_app'

urlpatterns = [
    path('', post_list_and_create, name='main-page' ),
    path('hello/', hello_view, name='hello' ),
]

