from django.shortcuts import render
from .models import Post
from profiles_app.models import Profile
from django.http import JsonResponse
from .forms import PostForm


def post_list_and_create_view(request):
    form = PostForm(request.POST or None)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        if form.is_valid():
            author = Profile.objects.get(user=request.user)
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
    # qs = Post.objects.all()
    context = {'form': form}
    
    return render(request, 'posts_app/main.html', context)


def load_post_data_view(request, num_posts):
    visible = 3
    upper = num_posts
    lower = upper - visible
    size = Post.objects.all().count()
    
    qs = Post.objects.all()
    data = []
    for obj in qs:
        item = {
            'id': obj.id,
            'title': obj.title,
            'body': obj.body,
            'liked': True if request.user in obj.liked.all() else False,
            'count': obj.like_count,
            'author': obj.author.user.username
        }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})


def like_unlike_post_view(request):
    # if request.is_ajax():  # deprecated funtion since Django 3.1 and removed in Django 4
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        pk = request.POST.get('pk')
        obj = Post.objects.get(pk=pk)
        if request.user in obj.liked.all():
            liked = False
            obj.liked.remove(request.user)
        else:
            liked = True
            obj.liked.add(request.user)
        return JsonResponse({'liked': liked, 'count': obj.like_count})
            
            