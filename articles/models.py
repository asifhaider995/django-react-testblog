from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL
# Create your models here.
class ArticleLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey("Article", on_delete=models.CASCADE)
    # Model name in quotes because the model definition is below this
    timestamp = models.DateTimeField(auto_now_add=True)

class ArticleShare(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey("Article", on_delete=models.CASCADE)
    # Model name in quotes because the model definition is below this
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=1000, blank=True)

class ArticleComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey("Article", on_delete=models.CASCADE)
    # Model name in quotes because the model definition is below this
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=1000, blank=True)

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True)
    likes = models.ManyToManyField(User, related_name='article_liked', blank=True, through=ArticleLike) # Through for Timestamp of the like
    shares = models.ManyToManyField(User, related_name='acticle_shared', blank=True, through=ArticleShare)
    comments = models.ManyToManyField(User, related_name='acticle_comment', blank=True, through=ArticleComment)
    date_created = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.title

class Users(models.Model):
    CATEGORIES = (
        ('W', 'Writer'),
		('R', 'Reader'),
    )
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    image = models.ImageField(blank=True)
    bio = models.TextField(blank=True, null=True)
    user_type = models.CharField(max_length=1, choices=CATEGORIES, default='R')
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
