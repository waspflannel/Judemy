# Generated by Django 5.0.1 on 2024-02-23 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0013_remove_cartitem_sub_total_cart_sub_total_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartorder',
            name='cart_item',
            field=models.ManyToManyField(blank=True, to='store.cartitem'),
        ),
    ]