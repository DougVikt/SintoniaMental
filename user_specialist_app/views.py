from django.shortcuts import render

def dashboard_specialist(request):
    return render(request, 'user_specialist_app/dashboard_specialist.html',
                  {
                      'add_nav':False
                  })
