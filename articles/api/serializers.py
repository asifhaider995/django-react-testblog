from rest_framework import serializers
from articles.models import Article
class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.Field(source='user.username')
    class Meta:
        model = Article
        # fields = '__all__'
        fields = ('id','user','title','content')
