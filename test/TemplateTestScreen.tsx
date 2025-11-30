import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { sampleCVData, generateTestTemplates } from './templateTest';

const TemplateTestScreen = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportTemplate = async (templateNumber: number, templateName: string, htmlContent: string) => {
    try {
      const Print = await import('expo-print');
      
      // Generate PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // Create a better filename
      const fileName = `CV_Template_${templateNumber}_${templateName}_Test.pdf`;
      const newUri = FileSystem.documentDirectory + fileName;
      
      // Move file to a better location
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      // Share the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newUri, {
          UTI: 'com.adobe.pdf',
          mimeType: 'application/pdf',
        });
        
        Alert.alert(
          'Success!', 
          `${templateName} exported successfully!\nFile: ${fileName}`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }

    } catch (error) {
      console.error(`Export error for ${templateName}:`, error);
      Alert.alert('Export Error', `Failed to export ${templateName}: ${error.message}`);
    }
  };

  const exportAllTemplates = async () => {
    setIsExporting(true);
    
    try {
      const templates = generateTestTemplates();
      
      const templateConfigs = [
        { number: 1, name: 'Sidebar', html: templates.template1 },
        { number: 2, name: 'Modern', html: templates.template2 },
        { number: 3, name: 'Professional', html: templates.template3 },
        { number: 4, name: 'Timeline', html: templates.template4 },
      ];

      for (const template of templateConfigs) {
        await exportTemplate(template.number, template.name, template.html);
        // Small delay between exports
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      Alert.alert(
        'All Templates Exported!', 
        'All 4 CV templates have been exported with test data. Check your device downloads or sharing app.',
        [{ text: 'Great!' }]
      );

    } catch (error) {
      console.error('Batch export error:', error);
      Alert.alert('Export Error', `Failed to export templates: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const exportSingleTemplate = async (templateNumber: number) => {
    setIsExporting(true);
    
    try {
      const templates = generateTestTemplates();
      const templateMap = {
        1: { name: 'Sidebar', html: templates.template1 },
        2: { name: 'Modern', html: templates.template2 },
        3: { name: 'Professional', html: templates.template3 },
        4: { name: 'Timeline', html: templates.template4 },
      };

      const template = templateMap[templateNumber];
      await exportTemplate(templateNumber, template.name, template.html);

    } catch (error) {
      console.error('Single export error:', error);
      Alert.alert('Export Error', `Failed to export template: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CV Template Tester</Text>
        <Text style={styles.subtitle}>
          Test all 4 CV templates with sample data from Sarah Johnson
        </Text>
      </View>

      <View style={styles.sampleDataInfo}>
        <Text style={styles.sectionTitle}>Sample Data Includes:</Text>
        <Text style={styles.dataItem}>• Name: {sampleCVData.fullName}</Text>
        <Text style={styles.dataItem}>• Job: {sampleCVData.jobTitle}</Text>
        <Text style={styles.dataItem}>• Experience: {sampleCVData.experiences.length} positions</Text>
        <Text style={styles.dataItem}>• Education: {sampleCVData.education.length} degrees</Text>
        <Text style={styles.dataItem}>• Skills: {sampleCVData.expertise.length} technical skills</Text>
        <Text style={styles.dataItem}>• Languages: {sampleCVData.languages.length} languages</Text>
        <Text style={styles.dataItem}>• References: {sampleCVData.references.length} references</Text>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.exportAllButton, isExporting && styles.buttonDisabled]}
          onPress={exportAllTemplates}
          disabled={isExporting}
        >
          <Text style={styles.exportAllButtonText}>
            {isExporting ? 'Exporting All Templates...' : 'Export All 4 Templates'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR Export Individual Templates:</Text>

        <View style={styles.individualButtons}>
          <TouchableOpacity
            style={[styles.templateButton, isExporting && styles.buttonDisabled]}
            onPress={() => exportSingleTemplate(1)}
            disabled={isExporting}
          >
            <Text style={styles.templateButtonText}>Template 1{'\n'}(Sidebar)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.templateButton, isExporting && styles.buttonDisabled]}
            onPress={() => exportSingleTemplate(2)}
            disabled={isExporting}
          >
            <Text style={styles.templateButtonText}>Template 2{'\n'}(Modern)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.templateButton, isExporting && styles.buttonDisabled]}
            onPress={() => exportSingleTemplate(3)}
            disabled={isExporting}
          >
            <Text style={styles.templateButtonText}>Template 3{'\n'}(Professional)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.templateButton, isExporting && styles.buttonDisabled]}
            onPress={() => exportSingleTemplate(4)}
            disabled={isExporting}
          >
            <Text style={styles.templateButtonText}>Template 4{'\n'}(Timeline)</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructionText}>
          1. Tap "Export All 4 Templates" to generate all templates at once{'\n'}
          2. Or tap individual template buttons to test one at a time{'\n'}
          3. PDFs will be shared to your device - save them to see the designs{'\n'}
          4. Check Downloads folder or use the sharing menu to view PDFs
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  sampleDataInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  dataItem: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  buttonSection: {
    marginBottom: 30,
  },
  exportAllButton: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  exportAllButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  individualButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  templateButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  templateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  instructions: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
});

export default TemplateTestScreen;