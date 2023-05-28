from django.shortcuts import render
from .models import Post
from django.http import JsonResponse


def post_list_and_create_view(request):
    qs = Post.objects.all()
    return render(request, 'posts_app/main.html', {'qs': qs})


def load_post_data_view(request, num_posts):
    visible = 3
    upper = num_posts
    lower = upper - visible
    size = Post.objects.all().count()
    
    qs = Post.objects.all()
    data = []
    for obj in qs:
        item = {
            'id': obj.pk,
            'title': obj.title,
            'body': obj.body,
            'liked': True if request.user in obj.liked.all() else False,
            'count': obj.like_count,
            'author': obj.author.user.username
        }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})

