# 🔐 Production Release Signing için Adımlar

## Adım 1: Keystore Oluşturma

Terminal'de şu komutu çalıştırın:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore flipit-release-key.keystore -alias flipit-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Sorulacak Sorular ve Cevaplar:

1. **Enter keystore password:** (En az 6 karakter, örnek: `flipit2024`)
   - Bu şifreyi **mutlaka kaydedin!**
   
2. **Re-enter new password:** (Aynı şifreyi tekrar girin)

3. **What is your first and last name?**
   - Örnek: `Onur Yilmaz` (Kendi isminizi yazın)

4. **What is the name of your organizational unit?**
   - Örnek: `Development` veya `Mobile Team`

5. **What is the name of your organization?**
   - Örnek: `FlipIt` veya şirket adınız

6. **What is the name of your City or Locality?**
   - Örnek: `Istanbul`

7. **What is the name of your State or Province?**
   - Örnek: `Istanbul`

8. **What is the two-letter country code for this unit?**
   - Örnek: `TR`

9. **Is CN=..., correct?**
   - `yes` yazın

10. **Enter key password for <flipit-key-alias>**
    - ENTER'a basın (keystore şifresi ile aynı olacak)

---

## Adım 2: Keystore Dosyasını Taşıma

Keystore dosyası oluşturulduktan sonra:

```bash
# Dosya şu konumda olacak:
# android/app/flipit-release-key.keystore
```

---

## Adım 3: gradle.properties Yapılandırması

`android/gradle.properties` dosyasına şunları ekleyin:

```properties
FLIPIT_UPLOAD_STORE_FILE=flipit-release-key.keystore
FLIPIT_UPLOAD_KEY_ALIAS=flipit-key-alias
FLIPIT_UPLOAD_STORE_PASSWORD=SIZIN_KEYSTORE_SIFRENIZ
FLIPIT_UPLOAD_KEY_PASSWORD=SIZIN_KEYSTORE_SIFRENIZ
```

**ÖNEMLİ:** Şifreleri gerçek şifrelerinizle değiştirin!

---

## Adım 4: build.gradle Yapılandırması

`android/app/build.gradle` dosyasını güncelleyin.

`android` bloğunun içindeki `signingConfigs` kısmını bulun ve release'i ekleyin:

```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        if (project.hasProperty('FLIPIT_UPLOAD_STORE_FILE')) {
            storeFile file(FLIPIT_UPLOAD_STORE_FILE)
            storePassword FLIPIT_UPLOAD_STORE_PASSWORD
            keyAlias FLIPIT_UPLOAD_KEY_ALIAS
            keyPassword FLIPIT_UPLOAD_KEY_PASSWORD
        }
    }
}

buildTypes {
    debug {
        signingConfig signingConfigs.debug
    }
    release {
        signingConfig signingConfigs.release
        minifyEnabled enableProguardInReleaseBuilds
        proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    }
}
```

---

## Adım 5: Release Build Oluşturma

### AAB (Android App Bundle) - Google Play için:

```bash
cd android
./gradlew bundleRelease
```

Çıktı: `android/app/build/outputs/bundle/release/app-release.aab`

### APK - Test veya diğer marketler için:

```bash
cd android
./gradlew assembleRelease
```

Çıktı: `android/app/build/outputs/apk/release/app-release.apk`

---

## Adım 6: Doğrulama

Build başarılı olduktan sonra, imzayı kontrol edin:

```bash
# AAB için
jarsigner -verify -verbose -certs android/app/build/outputs/bundle/release/app-release.aab

# APK için
jarsigner -verify -verbose -certs android/app/build/outputs/apk/release/app-release.apk
```

**Başarılı ise:** `jar verified.` mesajı göreceksiniz.

---

## 🔒 GÜVENLİK ÖNEMLİ!

### MUTLAKA YAPILMASI GEREKENLER:

1. **Keystore dosyasını yedekleyin!**
   - `flipit-release-key.keystore` dosyasını güvenli bir yere kopyalayın
   - Bu dosya kaybolursa, uygulamayı **asla** güncelleyemezsiniz!

2. **Şifreleri kaydedin!**
   - Keystore password
   - Key password
   - Alias name

3. **Git'e eklemeyin!**
   - `.gitignore` dosyasına şunları ekleyin:
   ```
   *.keystore
   gradle.properties
   ```

4. **Güvenli saklayın!**
   - Keystore ve şifreleri şifreli bir yerde saklayın
   - Yedekleri farklı konumlarda tutun

---

## 📱 Google Play'e Yükleme

1. Play Console'a gidin
2. Üretim → Yeni sürüm oluştur
3. `app-release.aab` dosyasını yükleyin
4. Artık "production signing" ile imzalanmış olacak

---

## ❓ Sorun Giderme

### "signingConfig is not defined" hatası:
- `gradle.properties` dosyasındaki değişkenleri kontrol edin
- Şifrelerde özel karakter varsa tırnak içine alın

### "Keystore file not found" hatası:
- Keystore dosyasının `android/app/` klasöründe olduğundan emin olun

### "Wrong password" hatası:
- `gradle.properties` dosyasındaki şifreleri kontrol edin

---

## 🎯 Sonuç

Bu adımları tamamladıktan sonra:
- ✅ Production keystore'unuz olacak
- ✅ Release mode'da imzalanmış AAB/APK oluşturabileceksiniz
- ✅ Google Play Store'a yükleyebileceksiniz
- ✅ Uygulama güncellemelerini yayınlayabileceksiniz

**ÖNEMLİ:** Keystore dosyası ve şifreleri KESİNLİKLE kaybedin! Bunlar olmadan uygulama güncellemeleri yapılamaz.

