from django.db import models

class Blog(models.Model):
    title = models.CharField(max_length=255, verbose_name="Sarlavha")
    content = models.TextField(verbose_name="Maqola matni")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan sana")
    is_published = models.BooleanField(default=True, verbose_name="Nashr qilingan")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Blog"
        verbose_name_plural = "Bloglar"
