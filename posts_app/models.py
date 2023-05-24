from django.db import models
from django.contrib.auth.models import User
from profiles_app.models import TimestampableMixin, Profile

class Post(TimestampableMixin):
    title = models.CharField(max_length=200)
    body = models.TextField()
    liked = models.ManyToManyField(User, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.title)