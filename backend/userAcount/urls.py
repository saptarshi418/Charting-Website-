from django.urls import path
from .views import DatasetUploadView , DatasetCandelstickView
from rest_framework.routers import DefaultRouter , SimpleRouter
from pprint import pprint


router = DefaultRouter()
router.register("dataset", DatasetUploadView , basename="dataset")
router.register("dataset-chart",DatasetCandelstickView,basename="dataset-chart")
pprint(router.urls)

urlpatterns = router.urls