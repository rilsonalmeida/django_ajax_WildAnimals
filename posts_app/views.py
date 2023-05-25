from django.shortcuts import render
from .models import Post
from django.http import JsonResponse

def post_list_and_create(request):
    qs = Post.objects.all()
    return render(request, 'posts_app/main.html', {'posts': qs})

def hello_view(request):
    return JsonResponse({'text': 'It worked !!!'})