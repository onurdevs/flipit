/**
 * FlipIt - Modern Coin Flip App
 * Completely redesigned from scratch
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Dimensions,
  Alert,
  Animated,
  Vibration,
  ScrollView,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Coin from './components/Coin';
import WelcomeScreen from './components/WelcomeScreen';
import LanguageSelector from './components/LanguageSelector';
import './i18n';

const { width, height } = Dimensions.get('window');

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a15" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { t } = useTranslation();
  
  // State
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [flipCount, setFlipCount] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const resultScale = useRef(new Animated.Value(0)).current;
  const statsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showWelcome) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
      
      Animated.timing(statsOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    }
  }, [showWelcome]);

  const flipCoin = () => {
    if (isFlipping) return;

    Vibration.vibrate(50);
    setIsFlipping(true);
    setResult(null);

    const randomResult = Math.random() > 0.5 ? 'heads' : 'tails';

    setTimeout(() => {
      setResult(randomResult);
      setFlipCount(prev => prev + 1);
      
      if (randomResult === 'heads') {
        setHeadsCount(prev => prev + 1);
      } else {
        setTailsCount(prev => prev + 1);
      }

      Vibration.vibrate([100, 50, 100]);

      // Result animation
      Animated.sequence([
        Animated.spring(resultScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.delay(2500),
        Animated.timing(resultScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Stats animation
      Animated.sequence([
        Animated.timing(statsOpacity, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(statsOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1600);
  };

  const handleAnimationComplete = () => {
    setIsFlipping(false);
  };

  const resetStats = () => {
    Alert.alert(
      t('resetConfirm'),
      t('resetMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('reset'), 
          style: 'destructive',
          onPress: () => {
            setFlipCount(0);
            setHeadsCount(0);
            setTailsCount(0);
            setResult(null);
            Vibration.vibrate(200);
          }
        },
      ]
    );
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  const headsPercentage = flipCount > 0 ? ((headsCount / flipCount) * 100).toFixed(0) : 0;
  const tailsPercentage = flipCount > 0 ? ((tailsCount / flipCount) * 100).toFixed(0) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={() => setShowLanguageSelector(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.languageIcon}>🌐</Text>
          </TouchableOpacity>
          
          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>🪙</Text>
          </View>
          <Text style={styles.appName}>{t('appName')}</Text>
          <Text style={styles.tagline}>{t('subtitle')}</Text>
        </Animated.View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          {/* Coin - Now Clickable */}
          <Coin 
            isFlipping={isFlipping}
            result={result}
            onAnimationComplete={handleAnimationComplete}
            onPress={flipCoin}
          />

          {/* Result Badge */}
          {result && !isFlipping && (
            <Animated.View 
              style={[
                styles.resultBadge,
                { transform: [{ scale: resultScale }] }
              ]}
            >
              <View style={styles.resultContent}>
                <Text style={styles.resultEmoji}>
                  {result === 'heads' ? '👑' : '🦅'}
                </Text>
                <Text style={styles.resultText}>
                  {result === 'heads' ? t('headsResult') : t('tailsResult')}
                </Text>
              </View>
            </Animated.View>
          )}
        </View>

        {/* Statistics */}
        <Animated.View style={[styles.statsSection, { opacity: statsOpacity }]}>
          <Text style={styles.statsTitle}>{t('statistics')}</Text>
          
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statEmoji}>📊</Text>
              </View>
              <Text style={styles.statValue}>{flipCount}</Text>
              <Text style={styles.statLabel}>{t('totalFlips')}</Text>
            </View>

            <View style={styles.statBox}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statEmoji}>👑</Text>
              </View>
              <Text style={styles.statValue}>{headsCount}</Text>
              <Text style={styles.statLabel}>{t('headsCount')}</Text>
              {flipCount > 0 && (
                <View style={styles.percentageBadge}>
                  <Text style={styles.percentageText}>{headsPercentage}%</Text>
                </View>
              )}
            </View>

            <View style={styles.statBox}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statEmoji}>🦅</Text>
              </View>
              <Text style={styles.statValue}>{tailsCount}</Text>
              <Text style={styles.statLabel}>{t('tailsCount')}</Text>
              {flipCount > 0 && (
                <View style={styles.percentageBadge}>
                  <Text style={styles.percentageText}>{tailsPercentage}%</Text>
                </View>
              )}
            </View>
          </View>

          {/* Reset Button */}
          {flipCount > 0 && (
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={resetStats}
              activeOpacity={0.7}
            >
              <Text style={styles.resetEmoji}>🔄</Text>
              <Text style={styles.resetText}>{t('resetStats')}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a15',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  header: {
    alignItems: 'center',
    position: 'relative',
  },
  languageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageIcon: {
    fontSize: 20,
  },
  middleSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerEmoji: {
    fontSize: 22,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 13,
    color: '#888',
    letterSpacing: 0.5,
  },
  resultBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B6B',
  },
  statsSection: {
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statEmoji: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFD700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  percentageBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  percentageText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFD700',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginTop: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  resetEmoji: {
    fontSize: 18,
    marginRight: 10,
  },
  resetText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF6B6B',
    letterSpacing: 0.5,
  },
});

export default App;
