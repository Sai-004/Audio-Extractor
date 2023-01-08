from django.urls import path, include
from .views import AudioListCreateView,AudioConvertDeleteView,CommentListCreateView,CommentDeleteView
urlpatterns = [
  path('',AudioListCreateView.as_view(),name='audio-list-create'),
  path('<str:pk>/',AudioConvertDeleteView.as_view(),name='audio-detail-update-delete'),
  path('comment/<str:pk>/',CommentListCreateView.as_view(),name='comment-list-create'),
  path('comment/del/<str:pk>/',CommentDeleteView.as_view(),name='comment-del'),
]