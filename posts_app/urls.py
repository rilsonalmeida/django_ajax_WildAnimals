from django.urls import path

from .views import (
    post_list_and_create_view,
    load_post_data_view,
)

app_name = 'posts_app'

urlpatterns = [
    path('', post_list_and_create_view, name='main-page'),
    path('posts/', load_post_data_view, name='data-posts'),
]
