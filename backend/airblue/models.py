from typing import DefaultDict
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext
from django.utils.translation import gettext_lazy as _

class Miles(models.Model):

    user = models.ForeignKey(
        User,
        null=True,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
    miles = models.PositiveIntegerField(
        verbose_name=_('Miles'),default=1,
    )

    class Meta:

        verbose_name = _('Miles')
        verbose_name_plural = _('Miles')

class Coupon(models.Model):
    blacklist_user = models.ManyToManyField(User, blank=True)
    value =models.PositiveIntegerField(
        verbose_name=_('coupon_value'),default=1,
    )
    code = models.CharField(
        max_length=128,
        unique=True,
        verbose_name=_('code'),
    )
    
class Category(models.Model):

    name = models.CharField(
        max_length=128,
        unique=True,
        verbose_name=_('Name'),
    )
    parent_prefix = models.CharField(
        max_length=128,
        verbose_name=_('Parent prefix'),
        default=gettext('Uncategorized')
    )

    def __str__(self):

        return self.name

    class Meta:

        verbose_name = _('Product category')
        verbose_name_plural = _('Product categories')


class ProductVariant(models.Model):

    name = models.CharField(
        max_length=128,
        unique=True,
        verbose_name=_('Name'),
    )
    style = models.JSONField(
        default=dict,
        verbose_name=_('Style'),
    )

    def __str__(self):

        return self.name

    class Meta:

        verbose_name = _('Product variant')
        verbose_name_plural = _('Product variants')


class Product(models.Model):

    name = models.CharField(
        max_length=128,
        unique=True,
        verbose_name=_('Name'),
    )
    description = models.TextField(
        blank=True,
        verbose_name=_('Description'),
    )
    variants = models.ManyToManyField(
        ProductVariant,
        through='ProductRemains',
        related_name='products',
        verbose_name=_('variant'),
    )
    categories = models.ManyToManyField(
        Category,
        related_name='products',
        verbose_name=_('categories'),
    )

    def __str__(self):

        return self.name

    class Meta:

        verbose_name = _('Product')
        verbose_name_plural = _('Products')


class ProductRemains(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='remains',
        verbose_name=_('product'),
    )
    productvariant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        verbose_name=_('variant'),
    )
    remains = models.PositiveSmallIntegerField(
        default=1,
        verbose_name=_('Remains amount'),
    )
    price = models.PositiveIntegerField(
        verbose_name=_('Price'),
    )

    def __str__(self):

        return _('Remains: %(product)s (%(variant)s)') % {
            'product': self.product.name, 'variant': self.productvariant.name
        }

    class Meta:

        verbose_name = _('Product remains relation')
        verbose_name_plural = _('Product remains relations')
        unique_together = ['product', 'productvariant']


class ProductImage(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name=_('product'),
        related_name='images',
    )
    url = models.URLField(
        verbose_name=_('Link to image'),
        max_length=300,
    )

    def __str__(self):

        return _('Image:  %(product)s') % {
            'product': self.product.name,
        }

    class Meta:

        verbose_name = _('Product image')
        verbose_name_plural = _('Product images')


class Order(models.Model):

    user = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        related_name='orders',
        verbose_name=_('user'),
    )
    positions = models.ManyToManyField(
        ProductRemains,
        through='OrderProduct',
        verbose_name=_('related product remains'),
    )

    class Meta:

        verbose_name = _('Order')
        verbose_name_plural = _('Orders')


class OrderProduct(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='orderproducts',
        verbose_name=_('order'),
    )
    productremains = models.ForeignKey(
        ProductRemains,
        on_delete=models.CASCADE,
        verbose_name=_('related product remains'),
    )
    amount = models.PositiveSmallIntegerField(
        default=1,
        verbose_name=_('Product amount'),
    )

    class Meta:

        verbose_name = _('Order position')
        verbose_name_plural = _('Order positions')

class Items(models.Model):
    user = models.ManyToManyField(User)
    name = models.CharField(max_length=100)
    img = models.CharField(max_length=100)  
    price = models.PositiveIntegerField()
    originPrice = models.PositiveIntegerField()
    discountPrice = models.PositiveIntegerField()
    description = models.TextField()
    star =  models.PositiveIntegerField()
    isNew = models.BooleanField()
    isHot = models.BooleanField()
    isFreeShipping = models.BooleanField()

class UserOrder(models.Model):
    user = models.ManyToManyField(User)
    products = models.ManyToManyField(Items)
    total= models.PositiveIntegerField(blank=True)

class CommonCoupon(models.Model):
    value =models.PositiveIntegerField(
        verbose_name=_('coupon_value'),default=1,
    )
    code = models.CharField(
        max_length=128,
        unique=True,
        verbose_name=_('code'),
    )
    used = models.BooleanField(default=False)

class Card(models.Model):
    user = models.ForeignKey(
        User,
        null=True,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=50)
    month = models.CharField(max_length=10)
    year = models.CharField(max_length=10)
    cvv = models.CharField(max_length=10)

class RedeemedUser(models.Model):
    user = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            verbose_name=_('User'),
        )
    redeemed = models.BooleanField()

class UserItemChallenge(models.Model):
    user = models.ForeignKey(
        User,
        null=True,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
    item = models.ManyToManyField(Items, blank=True, null=True)
    completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        count = self.item.all().count()
        print(count)
        if count== Items.objects.all().count():
            self.completed = True
        else:
            self.completed = False
        super(UserItemChallenge, self).save(*args, **kwargs)
