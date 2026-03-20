from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import AdminPasswordChangeForm
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages

from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("username", "email", "is_doctor", "is_staff")
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("is_doctor",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("is_doctor",)}),
    )

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "<id>/password/",
                self.admin_site.admin_view(self.change_password),
                name="users_user_password",
            ),
        ]
        return custom_urls + urls 

    def change_password(self, request, id):
        user = User.objects.get(pk=id)

        if request.method == "POST":
            form = AdminPasswordChangeForm(user, request.POST)
            if form.is_valid():
                form.save()
                messages.success(request, "Password updated successfully.")
                return redirect(f"../../{id}/change/")
        else:
            form = AdminPasswordChangeForm(user)

        context = {
            "form": form,
            "title": "Change password",
            "original": user,
        }
        return render(request, "admin/change_password.html", context)

