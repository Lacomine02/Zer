from django.contrib import admin

# Register your models here.
from .models import Project, ProjectImage, Stat 


admin.site.register(Project)
admin.site.register(ProjectImage)
admin.site.register(Stat)
