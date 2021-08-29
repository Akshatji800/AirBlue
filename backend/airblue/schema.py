# cookbook/schema.py
from django.db import models
import graphene
from graphene_django import DjangoObjectType
from graphene.types.generic import GenericScalar
from graphql_auth import mutations

from airblue.models import (
    Items,
    Miles,
    Product,
    ProductImage,
    ProductRemains,
    Category,
)

from django.db.models import When, Case, Value, Sum

from django.utils.translation import gettext_lazy as _

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

class MilesInput(graphene.InputObjectType):
    user=graphene.String()
    miles = graphene.Int()

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

class UpdateMiles(graphene.Mutation):
    class Arguments:
        input = MilesInput(required=True)

    miles_details = graphene.Field(MilesType)

    @staticmethod
    def mutate(root, info, input=None):
        miles_details = Miles.objects.get(user__username = input.user)
        miles_details.miles = input.miles
        miles_details.save()
        return UpdateMiles(miles_details=miles_details)

class Mutation(graphene.ObjectType):
    token_auth = mutations.ObtainJSONWebToken.Field()
    update_miles = UpdateMiles.Field()


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
)
