from django.db import models



class Project(models.Model):
    name = models.CharField(max_length=255, null=True)
    description = models.CharField(max_length=450, null=True)
    date_completion = models.DateField()

    def get_first_image(self):
        return self.images.first()
    
    def get_all_images(self):
        return self.images.all()
    
    def get_all_stats(self):
        return self.stats.all()


class ProjectImage(models.Model):
    path = models.ImageField(upload_to="Projects/")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")

class Stat(models.Model):
    stat = models.CharField(max_length=255, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="stats")

