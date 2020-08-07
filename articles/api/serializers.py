from rest_framework import serializers
from articles.models import Article
class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username')
    class Meta:
        model = Article
        # fields = '__all__'
        fields = ('id','user','title','content')
