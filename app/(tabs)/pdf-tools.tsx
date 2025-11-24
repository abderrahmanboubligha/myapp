import {
  Image as ImageIcon,
  FileUp,
  Scissors,
  RotateCw,
  FileType,
  Combine,
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

export default function PDFToolsScreen() {
  const tools = [
    {
      id: 'merge',
      title: 'دمج ملفات PDF',
      description: 'ادمج عدة ملفات PDF في ملف واحد',
      icon: Combine,
      color: '#3b82f6',
    },
    {
      id: 'split',
      title: 'تقسيم PDF',
      description: 'قسم ملف PDF إلى ملفات منفصلة',
      icon: Scissors,
      color: '#8b5cf6',
    },
    {
      id: 'rotate',
      title: 'تدوير الصفحات',
      description: 'تدوير صفحات PDF بزوايا مختلفة',
      icon: RotateCw,
      color: '#10b981',
    },
    {
      id: 'compress',
      title: 'ضغط PDF',
      description: 'قلل حجم ملفات PDF دون فقدان الجودة',
      icon: FileUp,
      color: '#f59e0b',
    },
    {
      id: 'image-to-pdf',
      title: 'صورة إلى PDF',
      description: 'حول الصور إلى مستندات PDF',
      icon: ImageIcon,
      color: '#ec4899',
    },
    {
      id: 'convert',
      title: 'تحويل PDF',
      description: 'حول PDF إلى Word والعكس',
      icon: FileType,
      color: '#06b6d4',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>أدوات PDF</Text>
        <Text style={styles.headerSubtitle}>
          أدوات احترافية لمعالجة ملفات PDF
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <TouchableOpacity
                key={tool.id}
                style={styles.toolCard}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.toolIconContainer,
                    { backgroundColor: tool.color + '20' },
                  ]}
                >
                  <Icon size={32} color={tool.color} />
                </View>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDescription}>{tool.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>✨ جميع الأدوات مجانية</Text>
          <Text style={styles.featureText}>
            معالجة غير محدودة للملفات • بدون علامات مائية • جودة عالية • خصوصية
            تامة
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  toolIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  toolDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  featureCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#166534',
    marginBottom: 8,
    textAlign: 'right',
  },
  featureText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
    textAlign: 'right',
  },
});