import { FileText, Eye, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CVBuilderScreen() {
  const router = useRouter();
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const templates = [
    { id: '1', name: 'Template 1', image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/vj0pb48uw529vsgojowkz' },
    { id: '2', name: 'Template 2', image: null },
    { id: '3', name: 'Template 3', image: null },
    { id: '4', name: 'Template 4', image: null },
  ];

  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  const handleTemplatePress = (templateId: string) => {
    if (templateId === '1') {
      router.push('/cv-builder' as any);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CV Builder</Text>
        <Text style={styles.headerSubtitle}>
          Choose a template and create your CV
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {templates.map((template, index) => (
            <View key={template.id} style={styles.templateCard}>
              {template.image ? (
                <Image
                  source={{ uri: template.image }}
                  style={styles.templateImage}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    styles.templateIconContainer,
                    { backgroundColor: colors[index] + '20' },
                  ]}
                >
                  <FileText size={32} color={colors[index]} />
                </View>
              )}
              
              <View style={styles.templateActions}>
                {template.image && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setPreviewTemplate(template.image)}
                  >
                    <Eye size={18} color="#6b7280" />
                    <Text style={styles.actionButtonText}>Preview</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.createButton,
                    template.id === '1' && styles.createButtonActive,
                  ]}
                  onPress={() => handleTemplatePress(template.id)}
                  disabled={template.id !== '1'}
                >
                  <Plus size={18} color={template.id === '1' ? '#fff' : '#9ca3af'} />
                  <Text
                    style={[
                      styles.actionButtonText,
                      template.id === '1' && styles.createButtonTextActive,
                    ]}
                  >
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.templateTitle}>{template.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={previewTemplate !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewTemplate(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            activeOpacity={1}
            onPress={() => setPreviewTemplate(null)}
          >
            <View style={styles.modalContent}>
              {previewTemplate && (
                <Image
                  source={{ uri: previewTemplate }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
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
  templateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  templateImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  templateIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    textAlign: 'center',
    marginTop: 4,
  },
  templateActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#6b7280',
  },
  createButton: {
    backgroundColor: '#f3f4f6',
  },
  createButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  createButtonTextActive: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 600,
    aspectRatio: 0.77,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});