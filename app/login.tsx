import { router } from 'expo-router';
import { FileText, Zap } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

if (!I18nManager.isRTL && Platform.OS !== 'web') {
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);
}

export default function LoginScreen() {
  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6', '#60a5fa']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.iconCircle}>
              <FileText size={48} color="#fff" />
            </View>
            <Text style={styles.appName}>وثائقي</Text>
            <Text style={styles.appSlogan}>
              كل أدواتك في مكان واحد
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Zap size={20} color="#fbbf24" />
              <Text style={styles.featureText}>إنشاء السيرة الذاتية مجاناً</Text>
            </View>
            <View style={styles.featureItem}>
              <Zap size={20} color="#fbbf24" />
              <Text style={styles.featureText}>أدوات PDF الاحترافية</Text>
            </View>
            <View style={styles.featureItem}>
              <Zap size={20} color="#fbbf24" />
              <Text style={styles.featureText}>قوالب الوثائق الجاهزة</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>ابدأ الآن</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            بدون رسوم • بدون تسجيل • مجاني تماماً
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold' as const,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  appSlogan: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    fontWeight: '600' as const,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1e3a8a',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});