from rest_framework import serializers

from image.models import Image
from image.personal_color_analysis import personal_color
from image.white_balance.white_balance import GW_white_balance, download_image

# 퍼스널 컬러 시리얼라이저
class ImageSerializer(serializers.ModelSerializer):
    personal = serializers.SerializerMethodField('get_personal')
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Image
        fields = [
            'image',
            'personal'
        ]

    def get_personal(self, obj):
        image_url = self.context.get("request").build_absolute_uri(obj.image.url)
        return personal_color.analysis(image_url)


# 가상 메이크업 시리얼라이저
class VirtualSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Image
        fields = [
            'image',
        ]




