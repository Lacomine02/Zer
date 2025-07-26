from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotFound, StreamingHttpResponse
from django.contrib.staticfiles.storage import staticfiles_storage
from wsgiref.util import FileWrapper
import mimetypes
import os

from portfolioapp.models import Project
# Create your views here.

def index(request):
    return render(request, "portfolioapp/index.html", {'projects': Project.objects.all()})


def download(request):
    filename = 'CV-Ladjouze-Nadjib-EN.pdf'
    relative_path = f'Files/{filename}'

    if not staticfiles_storage.exists(relative_path):
        return HttpResponseNotFound("Fichier introuvable")

    file = staticfiles_storage.open(relative_path, 'rb')
    content_type = mimetypes.guess_type(filename)[0] or 'application/octet-stream'
    response = StreamingHttpResponse(file, content_type=content_type)
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response



    