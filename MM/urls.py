from django.urls import path
from MM import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
        path('', views.index),
        path('login', views.index),
        path('workspace', views.loginApp),
        path('logout', views.logoutapp),
        path('standardFunc', views.standardFunc),
        path('UIInclude', views.UIscreeninclude),
        path('UIPreview', views.UIPreview),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
