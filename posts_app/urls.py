from django.urls import path

from .views import (
    post_list_and_create_view,
    load_post_data_view,
    like_unlike_post_view,
    post_detail_view,
    post_detail_data_view,
    update_post_view,
    delete_post_view
    
)

app_name = 'posts_app'

urlpatterns = [
    path('', post_list_and_create_view, name='main-page'),
    path('like-unlike/', like_unlike_post_view, name='like-unlike'),
    path('<pk>/data/', post_detail_data_view , name='post-detail-data'),
    path('<int:pk>/', post_detail_view, name='post-detail'),
    path('<int:pk>/update/', update_post_view, name='post-update'),
    path('<int:pk>/delete/', delete_post_view, name='post-delete'),
    path('posts/<int:num_posts>/', load_post_data_view, name='data-posts'),
]