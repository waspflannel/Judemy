from django.contrib import admin
from store.models import CartItem,Tax, Course , Category , Gallery , Cart, CartOrder , CartOrderItem, Coupon , CourseFaq , Notification  ,Review  , Wishlist
# Register your models here.

admin.site.register(Course)
admin.site.register(Category)
admin.site.register(Gallery)
admin.site.register(Cart)
admin.site.register(CartOrder)
admin.site.register(CartOrderItem)

admin.site.register(Coupon)
admin.site.register(CourseFaq)
admin.site.register(Notification)
admin.site.register(Review)
admin.site.register(Wishlist)
admin.site.register(Tax)
admin.site.register(CartItem)