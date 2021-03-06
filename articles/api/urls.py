from django.urls import path

# from .views import ArticleCreateView, ArticleDetailView, ArticleListView, ArticleDeleteView, ArticleUpdateView
#
# urlpatterns = [
#     path('', ArticleListView.as_view(), name='article-list'),
#     path('create/', ArticleCreateView.as_view(), name='article-create'),
#     path('<pk>/', ArticleDetailView.as_view(), name='article-detail'),
#     path('<pk>/update', ArticleUpdateView.as_view(), name='article-update'),
#     path('<pk>/delete', ArticleDeleteView.as_view(), name='article-update')
#
# ]
from articles.api.views import ArticleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'article', ArticleViewSet, basename='article')
urlpatterns = router.urls
