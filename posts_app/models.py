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
    
    
    @property
    def like_count(self):
        return self.liked.all().count()
    
    def get_photos(self):
        return self.photo_set.all()
    
    class Meta:
        ordering = ('-created_at', )
        
        
class Photo(TimestampableMixin):
    post_photo = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="photos")
    
    def __str__(self):
        return f"{self.post_photo.title}-{self.pk}"