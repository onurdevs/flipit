#!/bin/bash

# FlipIt App - Production Keystore Oluşturma Scripti
# Bu script production signing için gerekli keystore'u oluşturur

echo "🔐 FlipIt Production Keystore Oluşturma"
echo "========================================"
echo ""
echo "Bu script aşağıdaki bilgileri soracak:"
echo "1. Keystore şifresi (en az 6 karakter)"
echo "2. İsim Soyisim"
echo "3. Organizasyon birimi (örn: Development)"
echo "4. Organizasyon adı (örn: FlipIt)"
echo "5. Şehir (örn: Istanbul)"
echo "6. Eyalet/İl (örn: Istanbul)"
echo "7. Ülke kodu (örn: TR)"
echo ""
echo "⚠️  ÖNEMLİ: Keystore şifresini mutlaka kaydedin!"
echo "   Bu şifre olmadan uygulama güncellemesi yapamazsınız!"
echo ""
read -p "Devam etmek için ENTER'a basın..."

# Keystore dosyasının konumu
KEYSTORE_DIR="android/app"
KEYSTORE_FILE="$KEYSTORE_DIR/flipit-release-key.keystore"

# Zaten var mı kontrol et
if [ -f "$KEYSTORE_FILE" ]; then
    echo ""
    echo "⚠️  UYARI: Keystore dosyası zaten mevcut!"
    echo "   Konumu: $KEYSTORE_FILE"
    echo ""
    read -p "Mevcut keystore'u silip yenisini oluşturmak istiyor musunuz? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ İşlem iptal edildi."
        exit 1
    fi
    echo "🗑️  Eski keystore siliniyor..."
    rm "$KEYSTORE_FILE"
fi

echo ""
echo "📝 Keystore oluşturuluyor..."
echo ""

# Keystore oluştur
cd "$KEYSTORE_DIR" && keytool -genkeypair -v \
    -storetype PKCS12 \
    -keystore flipit-release-key.keystore \
    -alias flipit-key-alias \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000

# Sonuç kontrol
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Keystore başarıyla oluşturuldu!"
    echo ""
    echo "📍 Keystore konumu: $KEYSTORE_FILE"
    echo "🔑 Alias: flipit-key-alias"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "⚠️  ÇOK ÖNEMLİ - MUTLAKA OKUYUN!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. 🔐 Keystore şifrenizi kaydedin!"
    echo "   - Şifre olmadan uygulama güncelleyemezsiniz"
    echo "   - Şifre kaybolursa YENİ UYGULAMA yayınlamanız gerekir"
    echo ""
    echo "2. 💾 Keystore dosyasını yedekleyin!"
    echo "   - Dosya: $KEYSTORE_FILE"
    echo "   - Bu dosyayı güvenli bir yere kopyalayın"
    echo "   - Cloud backup yapın (Google Drive, Dropbox vb.)"
    echo ""
    echo "3. 📝 gradle.properties'i güncelleyin!"
    echo "   - Dosya: android/gradle.properties"
    echo "   - FLIPIT_UPLOAD_STORE_PASSWORD değerini güncelleyin"
    echo "   - FLIPIT_UPLOAD_KEY_PASSWORD değerini güncelleyin"
    echo ""
    echo "4. 🚀 Release build oluşturun:"
    echo "   cd android && ./gradlew bundleRelease"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
else
    echo ""
    echo "❌ Keystore oluşturulamadı!"
    echo "   Lütfen hataları kontrol edin ve tekrar deneyin."
    echo ""
    exit 1
fi

