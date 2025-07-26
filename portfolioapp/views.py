from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotFound, StreamingHttpResponse
from wsgiref.util import FileWrapper
import mimetypes
import os

from portfolioapp.models import Project
# Create your views here.

def index(request):
    return render(request, "portfolioapp/index.html", {'projects': Project.objects.all()})

def download(request):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    filename = 'CV-Ladjouze-Nadjib-EN.pdf'
    filepath = os.path.join(base_dir, 'Files', filename)

    if not os.path.exists(filepath):
        return HttpResponseNotFound("Fichier introuvable")

    chunk_size = 8192
    file_wrapper = FileWrapper(open(filepath, 'rb'), chunk_size)
    content_type = mimetypes.guess_type(filepath)[0] or 'application/octet-stream'
    response = StreamingHttpResponse(file_wrapper, content_type=content_type)
    response['Content-Length'] = os.path.getsize(filepath)
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response



    