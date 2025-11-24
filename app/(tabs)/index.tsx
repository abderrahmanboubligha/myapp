import { router } from 'expo-router';
import {
  FileText,
  FileStack,
  FolderOpen,
  Sparkles,
  TrendingUp,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const features = [
    {
      id: 'cv',
      title: 'إنشاء السيرة الذاتية',
      description: 'قوالب احترافية جاهزة للاستخدام',
      icon: FileText,
      color: '#3b82f6',
      route: '/(tabs)/cv' as const,
    },
    {
      id: 'pdf',
      title: 'أدوات PDF',
      description: 'دمج، تقسيم، وتحويل ملفات PDF',
      icon: FileStack,
      color: '#8b5cf6',
      route: '/(tabs)/pdf-tools' as const,
    },
    {
      id: 'docs',
      title: 'قوالب الوثائق',
      description: 'فواتير، عروض أسعار، ونماذج جاهزة',
      icon: FolderOpen,
      color: '#10b981',
      route: '/(tabs)/documents' as const,
    },
  ];

  const stats = [
    { label: 'مستخدم نشط', value: '10K+', icon: TrendingUp },
    { label: 'قالب جاهز', value: '50+', icon: FileText },
    { label: 'مجاني 100%', value: '✓', icon: Sparkles },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#1e3a8a', '#3b82f6']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.greeting}>مرحباً بك في</Text>
          <Text style={styles.appTitle}>وثائقي</Text>
          <Text style={styles.subtitle}>
            أدوات الإنتاجية الاحترافية مجاناً
          </Text>
        </LinearGradient>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>الميزات الرئيسية</Text>
          
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureCard}
                onPress={() => router.push(feature.route)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.featureIconContainer,
                    { backgroundColor: feature.color + '15' },
                  ]}
                >
                  <Icon size={28} color={feature.color} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
                <View style={styles.featureArrow}>
                  <Text style={styles.arrowText}>←</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.promoCard}>
          <Sparkles size={24} color="#fbbf24" />
          <Text style={styles.promoText}>
            جميع الميزات مجانية بالكامل - بدون رسوم خفية
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    textAlign: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: -24,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1e3a8a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  featuresSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'right',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'right',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'right',
  },
  featureArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#6b7280',
  },
  promoCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoText: {
    fontSize: 15,
    color: '#92400e',
    fontWeight: '600' as const,
    marginLeft: 12,
    flex: 1,
    textAlign: 'right',
  },
});