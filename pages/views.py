from django.shortcuts import render, HttpResponse

from .models import Blog # Modelni chaqirish

def blog_list(request):
    posts = Blog.objects.all() # Barcha bloglarni bazadan olish
    return render(request, 'list.html', {'posts': posts})


def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def projects(request):
    return render(request, 'projects.html')

def test(request):
    return render(request, 'test.html')