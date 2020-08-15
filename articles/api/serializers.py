from rest_framework import serializers
from articles.models import Article, Users
from django.contrib.auth.models import User


class ArticleSerializer(serializers.ModelSerializer):
    # user = serializers.SlugRelatedField(slug_field='username', read_only=True)
    class Meta:
        model = Article
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =['id','username', 'email']

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
