# Generated by Django 5.0.1 on 2024-02-21 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_alter_tax_options_alter_cart_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='course',
        ),
        migrations.AddField(
            model_name='cart',
            name='course',
            field=models.ManyToManyField(to='store.course'),
        ),
    ]