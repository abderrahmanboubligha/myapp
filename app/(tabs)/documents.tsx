import {
  FileText,
  Receipt,
  FileCheck,
  Mail,
  FileSignature,
  Briefcase,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DocumentsScreen() {
  const categories = [
    {
      id: 'invoice',
      title: 'فواتير',
      description: 'إنشاء فواتير احترافية',
      icon: Receipt,
      color: '#3b82f6',
      count: '10 قوالب',
    },
    {
      id: 'quotation',
      title: 'عروض أسعار',
      description: 'تقديم عروض أسعار للعملاء',
      icon: FileCheck,
      color: '#8b5cf6',
      count: '8 قوالب',
    },
    {
      id: 'letters',
      title: 'الرسائل',
      description: 'رسائل رسمية وإدارية',
      icon: Mail,
      color: '#10b981',
      count: '15 قالب',
    },
    {
      id: 'contracts',
      title: 'عقود',
      description: 'عقود عمل وخدمات',
      icon: FileSignature,
      color: '#f59e0b',
      count: '12 قالب',
    },
    {
      id: 'forms',
      title: 'نماذج',
      description: 'نماذج طلبات وتقارير',
      icon: FileText,
      color: '#ec4899',
      count: '20 قالب',
    },
    {
      id: 'business',
      title: 'وثائق أعمال',
      description: 'خطط أعمال ومذكرات',
      icon: Briefcase,
      color: '#06b6d4',
      count: '7 قوالب',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>قوالب الوثائق</Text>
        <Text style={styles.headerSubtitle}>
          مكتبة شاملة من القوالب الجاهزة
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.categoryIconContainer,
                  { backgroundColor: category.color + '20' },
                ]}
              >
                <Icon size={28} color={category.color} />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>
                  {category.description}
                </Text>
                <Text style={styles.categoryCount}>{category.count}</Text>
              </View>
              <View style={styles.categoryArrow}>
                <Text style={styles.arrowText}>←</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 مكتبة متنامية</Text>
          <Text style={styles.infoText}>
            نضيف قوالب جديدة بشكل مستمر لتلبية احتياجاتك. جميع القوالب قابلة
            للتخصيص والتصدير بصيغة PDF.
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
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  categoryCard: {
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
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'right',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    textAlign: 'right',
  },
  categoryCount: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600' as const,
    textAlign: 'right',
  },
  categoryArrow: {
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
  infoCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1e40af',
    marginBottom: 8,
    textAlign: 'right',
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
    textAlign: 'right',
  },
});