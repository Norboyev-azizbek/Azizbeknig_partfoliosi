from django.contrib import admin
from .models import Blog

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    # Admin panel ro'yxatida ko'rinadigan ustunlar
    # (author yo'qligi uchun uni bu yerdan olib tashladik)
    list_display = ('id', 'title', 'created_at', 'is_published')
    
    # Ustunlar ustiga bosganda tahrirlashga o'tish
    list_display_links = ('id', 'title')
    
    # Qidiruv maydoni (Sarlavha va matn ichidan qidiradi)
    search_fields = ('title', 'content')
    
    # O'ng tomondagi filtrlar paneli
    list_filter = ('is_published', 'created_at')
    
    # Ro'yxatning o'zida nashr holatini o'zgartirish
    list_editable = ('is_published',)
