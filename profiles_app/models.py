from django.db import models
from django.contrib.auth.models import User

class TimestampableMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
class Profile(TimestampableMixin):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars', default='avatar.png')
    
    def __str__(self):
        return f"profile of the user {self.user.username}"