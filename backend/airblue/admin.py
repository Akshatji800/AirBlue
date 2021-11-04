from django.contrib import admin
from .models import (
    CommonCoupon,
    Coupon,
    Items,
    Order,
    Product,
    ProductRemains,
    ProductVariant,
    ProductImage,
    OrderProduct,
    Category,
    Miles,
    UserOrder,
    Card,
    RedeemedUser
)
from django.utils.translation import gettext_lazy as _
from django import forms
from django.db.models import Sum, functions


class ProductAdminForm(forms.ModelForm):

    def clean(self):

        categories = self.cleaned_data.get('categories')
        if (categories is not None) and categories.filter(
            parent_prefix=_('Brands')
        ).count() > 1:

            self.add_error(
                'categories',
                _('Only one category with parent prefix "Brands" is allowed.')
            )

        return self.cleaned_data

    class Meta:
        model = Product
        exclude = []


class OrderPositionsInline(admin.TabularInline):
    model = OrderProduct


class ProductVariantInline(admin.TabularInline):
    model = ProductRemains
    autocomplete_fields = ('productvariant',)
    min_num = 1
    extra = 0


class ProductImageInline(admin.StackedInline):
    model = ProductImage


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [
        OrderPositionsInline,
    ]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    inlines = [
        ProductVariantInline,
        ProductImageInline,
    ]
    search_fields = ('name', 'id')
    autocomplete_fields = ('categories',)
    list_display = ('name', 'get_total_remains',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.annotate(
            total_remains=functions.Coalesce(Sum('remains__remains'), 0)
        )

    def get_total_remains(self, obj):

        return obj.total_remains

    get_total_remains.admin_order_field  = 'total_remains'
    get_total_remains.short_description = _('Total remains')


@admin.register(ProductRemains)
class ProductRemainsAdmin(admin.ModelAdmin):
    inlines = [
        OrderPositionsInline,
    ]
    autocomplete_fields = ('product', 'productvariant')


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    inlines = [
        ProductVariantInline,
    ]
    search_fields = ('name', 'id')


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent_prefix')
    search_fields = ('name',)

@admin.register(Miles)
class MilesAdmin(admin.ModelAdmin):
 pass

admin.site.register(Items)
admin.site.register(Coupon)
admin.site.register(UserOrder)
admin.site.register(CommonCoupon)
admin.site.register(Card)
admin.site.register(RedeemedUser)
