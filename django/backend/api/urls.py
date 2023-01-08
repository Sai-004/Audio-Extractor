from django.urls import path
from .views import AudioListCreateView,AudioConvertDeleteView,CommentListCreateView,CommentDeleteView

# from . import views
# from .views import MyTokenObtainPairView
# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )

urlpatterns = [
  # path('',views.getRoutes ),
  # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('',AudioListCreateView.as_view(),name='audio-list-create'),
  path('<str:pk>/',AudioConvertDeleteView.as_view(),name='audio-detail-update-delete'),
  path('comment/<str:pk>/',CommentListCreateView.as_view(),name='comment-list-create'),
  path('comment/del/<str:pk>/',CommentDeleteView.as_view(),name='comment-del'),
]