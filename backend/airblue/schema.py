# cookbook/schema.py
from django.db import models
import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphene.types.generic import GenericScalar
from graphql_auth import mutations
from django.conf import settings
from airblue.models import (
    Coupon,
    Items,
    Miles,
    OrderProduct,
    Product,
    ProductImage,
    ProductRemains,
    Category,
    UserOrder,
)

from django.db.models import When, Case, Value, Sum, fields

from django.utils.translation import gettext_lazy as _

User = settings.AUTH_USER_MODEL

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)

PRODUCT_PREFETCHES = (
    'images',
    'remains',
    'remains__productvariant',
    'categories',
)


class ProductType(DjangoObjectType):

    class Meta:

        model = Product
        fields = (
            "id",
            "name",
            "description",
            "images",
            "remains",
        )
    
    brand_name = graphene.String()
    categories = graphene.List(graphene.String)

    @staticmethod
    def resolve_brand_name(root, info, **kwargs):
        for category in root.categories.all():
            if category.parent_prefix == _('Brands'):
                return category.name
        return None

    @staticmethod
    def resolve_categories(root, info, **kwargs):
        return root.categories.all()


class ProductImageType(DjangoObjectType):

    class Meta:

        model = ProductImage
        fields = (
            "id",
            "product",
            "url",
        )

class MilesType(DjangoObjectType):
    class Meta:
        model = Miles
        fields = ("user", "miles")

class ItemsType(DjangoObjectType):
    class Meta:
        model = Items
        fields = (
            "user",
            "name",
            "img",
            "price",
            "originPrice",
            "discountPrice",
            "description",
            "star",
            "isNew",
            "isHot",
            "isFreeShipping")


class CouponType(DjangoObjectType):
    class Meta:
        model = Coupon
        fields = (
            "blacklist_user",
            "value",
            "code")
        

class MilesInput(graphene.InputObjectType):
    user=graphene.String()
    miles = graphene.Int()

class OrderInput(graphene.InputObjectType):
    user=graphene.String()
    item=graphene.String()
    value = graphene.Int()

class RedeemInput(graphene.InputObjectType):
    user=graphene.String()

class ItemsInput(graphene.InputObjectType):
    name=graphene.String()
    user = graphene.String()

class ProductRemainsType(DjangoObjectType):

    class Meta:

        model = ProductRemains
        fields = (
            "remains",
            "price",
        )

    variant_id = graphene.Int()
    variant_name = graphene.String()
    variant_style = GenericScalar()

    @staticmethod
    def resolve_variant_id(root, info, **kwargs):
        return root.productvariant.id

    @staticmethod
    def resolve_variant_name(root, info, **kwargs):
        return root.productvariant.name

    @staticmethod
    def resolve_variant_style(root, info, **kwargs):
        return root.productvariant.style


def slice_products(qs, page):

    return qs.annotate(
        product_remains=Sum('remains__remains')
    ).annotate(
        in_stock=Case(
            When(product_remains__gt=0, then=Value(True)),
            default=Value(False)
        )
    ).order_by('-in_stock', '-id')[(page-1)*12:page*12]


class AddtoCart(graphene.Mutation):
    class Arguments:
        input = ItemsInput(required=True)

    cart = graphene.Field(ItemsType)
    @staticmethod
    def mutate(root, info, input=None):
        item =  Items.objects.get(name=input.name)
        userInstance = get_user_model().objects.get(username = input.user)
        if item:
            item.user.add(userInstance.id)
            item.save()
            return AddtoCart(cart=item)
        return AddtoCart(cart=None)

class RemoveFromCart(graphene.Mutation):
    class Arguments:
        input = ItemsInput(required=True)
    
    cart = graphene.Field(ItemsType)
    @staticmethod
    def mutate(root, info, input=None):
        item =  Items.objects.get(name=input.name)
        userInstance = get_user_model().objects.get(username = input.user)
        if item:
            item.user.remove(userInstance.id)
            item.save()
            return RemoveFromCart(cart=item)
        return RemoveFromCart(cart=None)

class ClearCart(graphene.Mutation):
    class Arguments:
        input = ItemsInput(required=True)
    
    cart = graphene.Field(ItemsType)
    @staticmethod
    def mutate(root, info, input=None):

        item =  Items.objects.filter(user__username=input.user)
        userInstance = get_user_model().objects.get(username = input.user)
        for i in item:           
            if i:
                i.user.remove(userInstance.id)
                i.save()
                ClearCart(cart=i)
        return ClearCart(cart=None)

class Query(graphene.ObjectType):

    all_products = graphene.List(
        ProductType,
        page=graphene.Int(),
    )
    category_products = graphene.List(
        ProductType,
        category_name=graphene.String(required=True),
        page=graphene.Int(),
    )
    product_by_id = graphene.Field(
        ProductType,
        id=graphene.Int(required=True),
    )

    all_miles = graphene.List(MilesType, user=graphene.String(required=True))
    all_items = graphene.List(ItemsType)
    cart_items = graphene.List(ItemsType,user=graphene.String(required=True))
    users = graphene.List(UserType)
    all_coupons = graphene.List(CouponType, user=graphene.String(required=True))

    def resolve_all_coupons(root, info, user):
        try:
            return Coupon.objects.exclude(blacklist_user__username=user)
        except:
            return None

    def resolve_users(root, info):
        return get_user_model().objects.all()

    def resolve_all_miles(root, info, user):
        try:
            return Miles.objects.filter(user__username=user).all()
        except:
            return None

    def resolve_cart_items(root, info, user):
        try:
            return Items.objects.filter(user__username=user).all()  
        except:
            return None
    def resolve_all_items(root, info):
        try:
            return Items.objects.all()
        except:
            return None

    def resolve_all_products(root, info, page=1):

        return slice_products(
            Product.objects.prefetch_related(*PRODUCT_PREFETCHES).all(), page,
        )

    def resolve_category_products(root, info, category_name, page=1):

        try:
            return slice_products(
                Category.objects.get(
                    name=category_name
                ).products.prefetch_related(*PRODUCT_PREFETCHES).all(),
                page,
            )
        except Category.DoesNotExist:
            return []

    def resolve_product_by_id(root, info, id):

        try:
            return Product.objects.prefetch_related(
                *PRODUCT_PREFETCHES
            ).get(id=id)

        except Product.DoesNotExist:
            return None

class RedeemAndRemove(graphene.Mutation):
    class Arguments:
        input = RedeemInput(required=True)

    redeem_item = graphene.Field(CouponType)

    @staticmethod
    def mutate(root, info, input=None):
        userInstance = get_user_model().objects.get(username = input.user)
        miles_details = Miles.objects.get(user__username = input.user)
        miles_details.miles = miles_details.miles + 1000
        miles_details.save()
        redeem_item  = Coupon.objects.first()
        redeem_item.blacklist_user.add(userInstance.id)
        redeem_item.save()
        return RedeemAndRemove(redeem_item=redeem_item)


class UpdateMiles(graphene.Mutation):
    class Arguments:
        input = MilesInput(required=True)

    miles_details = graphene.Field(MilesType)

    @staticmethod
    def mutate(root, info, input=None):
        miles_details = Miles.objects.get(user__username = input.user)
        miles_details.miles = miles_details.miles - input.miles
        miles_details.save()
        return UpdateMiles(miles_details=miles_details)

class CreateMiles(graphene.Mutation):
    class Arguments:
        input = MilesInput(required=True)

    miles_details = graphene.Field(MilesType)

    @staticmethod
    def mutate(root, info, input=None):
        userInstance = get_user_model().objects.get(username = input.user)
        miles_details = Miles.objects.create(
            user_id = userInstance.id,
            miles = 0
        )
        miles_details.save()
        return CreateMiles(miles_details=miles_details)

class CreateOrder(graphene.Mutation):
    class Arguments:
        input = OrderInput(required=True)

    order_items = graphene.Field(ItemsType)

    @staticmethod
    def mutate(root, info, input=None):
        userInstance = get_user_model().objects.get(username = input.user)
        length_orders = len(UserOrder.objects.all())
        order_items = UserOrder.objects.create(total=input.value)
        items = input.item.split(',')
        order_items.user.add(userInstance.id)
        for i in items:
            itemsInstance = Items.objects.get(name=i.strip())
            order_items.products.add(itemsInstance.id)
        order_items.save()
        return CreateOrder()



class Mutation(graphene.ObjectType):
    token_auth = mutations.ObtainJSONWebToken.Field()
    update_miles = UpdateMiles.Field()
    create_miles = CreateMiles.Field()
    add_cart = AddtoCart.Field()
    remove_cart = RemoveFromCart.Field()
    create_user = CreateUser.Field()
    clear_cart = ClearCart.Field()
    redeem_miles = RedeemAndRemove.Field()
    create_order = CreateOrder.Field()



schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
)
