from django.urls import path, include
from .views import AudioListCreateView,AudioConvertDeleteView
urlpatterns = [
  path('',AudioListCreateView.as_view(),name='audio-list-create'),
  path('<str:pk>/',AudioConvertDeleteView.as_view(),name='audio-detail-update-delete'),
]