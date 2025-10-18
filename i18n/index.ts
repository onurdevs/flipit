import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Geçici olarak devre dışı
// import { getLocales } from 'react-native-localize'; // Geçici olarak devre dışı

// Çeviri dosyaları
const resources = {
  en: {
    translation: {
      appName: 'FlipIt',
      subtitle: 'Coin Flip',
      flipButton: '🚀 Flip Coin!',
      flipping: '🔄 Flipping...',
      heads: 'HEADS',
      tails: 'TAILS',
      headsResult: '🎉 HEADS!',
      tailsResult: '🎯 TAILS!',
      congratulations: 'Congratulations!',
      headsCame: 'Heads came!',
      tailsCame: 'Tails came!',
      statistics: '📊 Statistics',
      totalFlips: 'Total Flips',
      headsCount: 'Heads',
      tailsCount: 'Tails',
      headsPercentage: 'Heads: {{percentage}}%',
      tailsPercentage: 'Tails: {{percentage}}%',
      resetStats: '🔄 Reset Statistics',
      resetConfirm: 'Reset Statistics',
      resetMessage: 'All statistics will be deleted. Are you sure?',
      cancel: 'Cancel',
      reset: 'Reset',
      selectLanguage: 'Select Language',
      language: 'Language',
      getStarted: 'Get Started',
      feature1: 'Smooth Animations',
      feature2: 'Multi Language',
      feature3: 'Statistics',
    },
  },
  tr: {
    translation: {
      appName: 'FlipIt',
      subtitle: 'Yazı-Tura At',
      flipButton: '🚀 Yazı-Tura At!',
      flipping: '🔄 Atılıyor...',
      heads: 'YAZI',
      tails: 'TURA',
      headsResult: '🎉 YAZI!',
      tailsResult: '🎯 TURA!',
      congratulations: 'Tebrikler!',
      headsCame: 'Yazı geldi!',
      tailsCame: 'Tura geldi!',
      statistics: '📊 İstatistikler',
      totalFlips: 'Toplam Atış',
      headsCount: 'Yazı',
      tailsCount: 'Tura',
      headsPercentage: 'Yazı: {{percentage}}%',
      tailsPercentage: 'Tura: {{percentage}}%',
      resetStats: '🔄 İstatistikleri Sıfırla',
      resetConfirm: 'İstatistikleri Sıfırla',
      resetMessage: 'Tüm istatistikler silinecek. Emin misiniz?',
      cancel: 'İptal',
      reset: 'Sıfırla',
      selectLanguage: 'Dil Seçin',
      language: 'Dil',
      getStarted: 'Başlayın',
      feature1: 'Smooth Animasyonlar',
      feature2: 'Çoklu Dil',
      feature3: 'İstatistikler',
    },
  },
  es: {
    translation: {
      appName: 'FlipIt',
      subtitle: 'Lanzar Moneda',
      flipButton: '🚀 ¡Lanzar Moneda!',
      flipping: '🔄 Lanzando...',
      heads: 'CARA',
      tails: 'CRUZ',
      headsResult: '🎉 ¡CARA!',
      tailsResult: '🎯 ¡CRUZ!',
      congratulations: '¡Felicidades!',
      headsCame: '¡Salió cara!',
      tailsCame: '¡Salió cruz!',
      statistics: '📊 Estadísticas',
      totalFlips: 'Total de Lanzamientos',
      headsCount: 'Cara',
      tailsCount: 'Cruz',
      headsPercentage: 'Cara: {{percentage}}%',
      tailsPercentage: 'Cruz: {{percentage}}%',
      resetStats: '🔄 Reiniciar Estadísticas',
      resetConfirm: 'Reiniciar Estadísticas',
      resetMessage: 'Todas las estadísticas serán eliminadas. ¿Estás seguro?',
      cancel: 'Cancelar',
      reset: 'Reiniciar',
      selectLanguage: 'Seleccionar Idioma',
      language: 'Idioma',
    },
  },
  fr: {
    translation: {
      appName: 'FlipIt',
      subtitle: 'Pile ou Face',
      flipButton: '🚀 Lancer la Pièce!',
      flipping: '🔄 En cours...',
      heads: 'FACE',
      tails: 'PILE',
      headsResult: '🎉 FACE!',
      tailsResult: '🎯 PILE!',
      congratulations: 'Félicitations!',
      headsCame: 'Face est sorti!',
      tailsCame: 'Pile est sorti!',
      statistics: '📊 Statistiques',
      totalFlips: 'Total des Lancers',
      headsCount: 'Face',
      tailsCount: 'Pile',
      headsPercentage: 'Face: {{percentage}}%',
      tailsPercentage: 'Pile: {{percentage}}%',
      resetStats: '🔄 Réinitialiser les Statistiques',
      resetConfirm: 'Réinitialiser les Statistiques',
      resetMessage: 'Toutes les statistiques seront supprimées. Êtes-vous sûr?',
      cancel: 'Annuler',
      reset: 'Réinitialiser',
      selectLanguage: 'Sélectionner la Langue',
      language: 'Langue',
    },
  },
  de: {
    translation: {
      appName: 'FlipIt',
      subtitle: 'Münzwurf',
      flipButton: '🚀 Münze Werfen!',
      flipping: '🔄 Wird geworfen...',
      heads: 'KOPF',
      tails: 'ZAHL',
      headsResult: '🎉 KOPF!',
      tailsResult: '🎯 ZAHL!',
      congratulations: 'Glückwunsch!',
      headsCame: 'Kopf kam!',
      tailsCame: 'Zahl kam!',
      statistics: '📊 Statistiken',
      totalFlips: 'Gesamte Würfe',
      headsCount: 'Kopf',
      tailsCount: 'Zahl',
      headsPercentage: 'Kopf: {{percentage}}%',
      tailsPercentage: 'Zahl: {{percentage}}%',
      resetStats: '🔄 Statistiken Zurücksetzen',
      resetConfirm: 'Statistiken Zurücksetzen',
      resetMessage: 'Alle Statistiken werden gelöscht. Sind Sie sicher?',
      cancel: 'Abbrechen',
      reset: 'Zurücksetzen',
      selectLanguage: 'Sprache Auswählen',
      language: 'Sprache',
    },
  },
  ja: {
    translation: {
      appName: 'FlipIt',
      subtitle: 'コイン投げ',
      flipButton: '🚀 コインを投げる!',
      flipping: '🔄 投げ中...',
      heads: '表',
      tails: '裏',
      headsResult: '🎉 表!',
      tailsResult: '🎯 裏!',
      congratulations: 'おめでとう!',
      headsCame: '表が出ました!',
      tailsCame: '裏が出ました!',
      statistics: '📊 統計',
      totalFlips: '総投げ回数',
      headsCount: '表',
      tailsCount: '裏',
      headsPercentage: '表: {{percentage}}%',
      tailsPercentage: '裏: {{percentage}}%',
      resetStats: '🔄 統計をリセット',
      resetConfirm: '統計をリセット',
      resetMessage: 'すべての統計が削除されます。よろしいですか？',
      cancel: 'キャンセル',
      reset: 'リセット',
      selectLanguage: '言語を選択',
      language: '言語',
    },
  },
  zh: {
    translation: {
      appName: 'FlipIt',
      subtitle: '抛硬币',
      flipButton: '🚀 抛硬币!',
      flipping: '🔄 抛掷中...',
      heads: '正面',
      tails: '反面',
      headsResult: '🎉 正面!',
      tailsResult: '🎯 反面!',
      congratulations: '恭喜!',
      headsCame: '正面朝上!',
      tailsCame: '反面朝上!',
      statistics: '📊 统计',
      totalFlips: '总抛掷次数',
      headsCount: '正面',
      tailsCount: '反面',
      headsPercentage: '正面: {{percentage}}%',
      tailsPercentage: '反面: {{percentage}}%',
      resetStats: '🔄 重置统计',
      resetConfirm: '重置统计',
      resetMessage: '所有统计数据将被删除。您确定吗？',
      cancel: '取消',
      reset: '重置',
      selectLanguage: '选择语言',
      language: '语言',
    },
  },
  ar: {
    translation: {
      appName: 'FlipIt',
      subtitle: 'رمي العملة',
      flipButton: '🚀 ارمي العملة!',
      flipping: '🔄 جاري الرمي...',
      heads: 'صورة',
      tails: 'كتابة',
      headsResult: '🎉 صورة!',
      tailsResult: '🎯 كتابة!',
      congratulations: 'تهانينا!',
      headsCame: 'ظهرت الصورة!',
      tailsCame: 'ظهرت الكتابة!',
      statistics: '📊 الإحصائيات',
      totalFlips: 'إجمالي الرميات',
      headsCount: 'صورة',
      tailsCount: 'كتابة',
      headsPercentage: 'صورة: {{percentage}}%',
      tailsPercentage: 'كتابة: {{percentage}}%',
      resetStats: '🔄 إعادة تعيين الإحصائيات',
      resetConfirm: 'إعادة تعيين الإحصائيات',
      resetMessage: 'سيتم حذف جميع الإحصائيات. هل أنت متأكد؟',
      cancel: 'إلغاء',
      reset: 'إعادة تعيين',
      selectLanguage: 'اختر اللغة',
      language: 'اللغة',
    },
  },
};

// Basit dil tercihini kaydetme fonksiyonu (AsyncStorage yerine)
const saveLanguagePreference = async (language: string) => {
  try {
    // Geçici olarak localStorage benzeri basit storage
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('selectedLanguage', language);
    }
    console.log('Language preference saved:', language);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

// Basit dil tercihini yükleme fonksiyonu (AsyncStorage ve RNLocalize yerine)
const loadLanguagePreference = async (): Promise<string> => {
  try {
    // Geçici olarak localStorage benzeri basit storage
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLanguage = window.localStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        return savedLanguage;
      }
    }
    
    // Cihazın dilini algıla (RNLocalize yerine basit alternatif)
    let deviceLanguage = 'en'; // Varsayılan dil
    
    // React Native'de navigator.language kullan
    if (typeof navigator !== 'undefined' && navigator.language) {
      deviceLanguage = navigator.language.split('-')[0]; // 'en-US' -> 'en'
    }
    
    // Desteklenen dilleri kontrol et
    const supportedLanguages = ['en', 'tr', 'es', 'fr', 'de', 'ja', 'zh', 'ar'];
    if (supportedLanguages.includes(deviceLanguage)) {
      return deviceLanguage;
    }
    
    return 'en'; // Varsayılan dil
  } catch (error) {
    console.error('Error loading language preference:', error);
    return 'en';
  }
};

// i18n konfigürasyonu
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Varsayılan dil
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Dil tercihini yükle ve ayarla
loadLanguagePreference().then((language) => {
  i18n.changeLanguage(language);
});

// Dil değiştirme fonksiyonu
export const changeLanguage = async (language: string) => {
  await saveLanguagePreference(language);
  i18n.changeLanguage(language);
};

export default i18n;
