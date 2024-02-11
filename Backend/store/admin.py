from django.contrib import admin
from store.models import Course , Category , Gallery , Cart, CartOrder , CartOrderItem
# Register your models here.

admin.site.register(Course)
admin.site.register(Category)
admin.site.register(Gallery)
admin.site.register(Cart)
admin.site.register(CartOrder)
admin.site.register(CartOrderItem)