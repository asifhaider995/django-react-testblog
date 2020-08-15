from django.contrib import admin

# Register your models here.
from .models import Article, ArticleLike, ArticleShare, ArticleComment, Users


class ArticleLikeAdmin(admin.TabularInline):
    model = ArticleLike

class ArticleCommentAdmin(admin.TabularInline):
    model = ArticleComment

class ArticleShareAdmin(admin.TabularInline):
    model = ArticleShare


class ArticleAdmin(admin.ModelAdmin):
    """
        Search filter class
        Add a search bar to Admin panel of Articles
        Search by user and,
        Search by email and,
        Search by content

        **WARNING - Cannot use `user__username` in `list_display`
    """
    inlines = [ArticleLikeAdmin, ArticleCommentAdmin, ArticleShareAdmin]
    list_display = ['__str__', 'user', 'date_created']
    search_fields = ['content','user__username', 'user__email']
    date_heirrarchy = ['date_created']
    class Meta:
        model = Article


class AuthorAdmin(admin.ModelAdmin):
    """
        Search filter class
        Add a search bar to Admin panel of Articles
        Search by user and,
        Search by email and,
        Search by content

        **WARNING - Cannot use `user__username` in `list_display`
    """
    list_display = ['__str__', 'user', 'date_created']
    search_fields = ['user__username', 'first_name', 'last_name','user__email']
    date_heirrarchy = ['date_created']
    class Meta:
        model = Article



admin.site.register(Article, ArticleAdmin)
admin.site.register(Users)
