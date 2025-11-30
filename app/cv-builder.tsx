import { ArrowLeft, ArrowRight, Camera, Upload } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { CVData } from '../types/cv';
import { generateTemplate1HTML } from '../templates/template1';
import { generateTemplate2HTML } from '../templates/template2';
import { generateTemplate3HTML } from '../templates/template3';
import { generateTemplate4HTML } from '../templates/template4';

export default function CVBuilderScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(1); // 1, 2, 3, or 4
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  const [cvData, setCvData] = useState<CVData>({
    profileImage: null,
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    address: '',
    about: '',
    experiences: [
      {
        position: '',
        company: '',
        location: '',
        period: '',
        description: '',
      },
    ],
    education: [
      {
        degree: '',
        university: '',
        period: '',
      },
    ],
    expertise: [],
    languages: [],
    references: [
      {
        name: '',
        position: '',
        phone: '',
        email: '',
      },
    ],
    includeHobbies: false,
    hobbies: [],
  });

  const [tempExpertise, setTempExpertise] = useState('');
  const [tempLanguage, setTempLanguage] = useState('');
  const [tempHobby, setTempHobby] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images' as any,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setCvData({ ...cvData, profileImage: result.assets[0].uri });
    }
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      experiences: [
        ...cvData.experiences,
        {
          position: '',
          company: '',
          location: '',
          period: '',
          description: '',
        },
      ],
    });
  };

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          degree: '',
          university: '',
          period: '',
        },
      ],
    });
  };

  const addReference = () => {
    setCvData({
      ...cvData,
      references: [
        ...cvData.references,
        {
          name: '',
          position: '',
          phone: '',
          email: '',
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperiences = [...cvData.experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setCvData({ ...cvData, experiences: newExperiences });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...cvData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setCvData({ ...cvData, education: newEducation });
  };

  const updateReference = (index: number, field: string, value: string) => {
    const newReferences = [...cvData.references];
    newReferences[index] = { ...newReferences[index], [field]: value };
    setCvData({ ...cvData, references: newReferences });
  };

  const addExpertiseItem = () => {
    if (tempExpertise.trim()) {
      setCvData({
        ...cvData,
        expertise: [...cvData.expertise, tempExpertise.trim()],
      });
      setTempExpertise('');
    }
  };

  const addLanguageItem = () => {
    if (tempLanguage.trim()) {
      setCvData({
        ...cvData,
        languages: [...cvData.languages, tempLanguage.trim()],
      });
      setTempLanguage('');
    }
  };

  const addHobbyItem = () => {
    if (tempHobby.trim()) {
      setCvData({
        ...cvData,
        hobbies: [...cvData.hobbies, tempHobby.trim()],
      });
      setTempHobby('');
    }
  };

  const exportToPDF = async () => {
    const fileName = `CV_${cvData.fullName.replace(/\s+/g, '_') || 'user'}_${Date.now()}.pdf`;

    try {
      setShowExportModal(true);
      setIsExporting(true);
      setExportProgress(0);

      // Progress simulation
      const progressInterval = setInterval(() => {
        setExportProgress((p) => (p >= 95 ? p : p + 5));
      }, 400);

      // Generate HTML with selected template
      const getTemplateHTML = (templateNum: number) => {
        if (templateNum === 1) {
          return generateTemplate1HTML(cvData);
        } else if (templateNum === 2) {
          return generateTemplate2HTML(cvData);
        } else if (templateNum === 3) {
          return generateTemplate3HTML(cvData);
        } else if (templateNum === 4) {
          return generateTemplate4HTML(cvData);
        } else {
          return generateTemplate1HTML(cvData); // Default fallback
        }
      };

      const html = getTemplateHTML(selectedTemplate);

      // Mobile PDF generation using expo-print
      if (Platform.OS !== 'web') {
        try {
          // Dynamic import for mobile
          const Print = await import('expo-print');
          const { uri } = await Print.printToFileAsync({ html });

          clearInterval(progressInterval);
          setExportProgress(100);

          // Share the PDF
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri, {
              mimeType: 'application/pdf',
              dialogTitle: 'Save your CV',
              UTI: 'com.adobe.pdf',
            });
          } else {
            setExportSuccess(true);
          }

          setIsExporting(false);
          setShowExportModal(false);
          setExportProgress(0);
          return;
        } catch (mobileError) {
          console.error('Mobile PDF export failed:', mobileError);
          setExportError(`Mobile PDF export failed: ${mobileError.message}`);
        }
      } else {
        // Web fallback - download HTML as file for now
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName.replace('.pdf', '.html');
        link.click();
        URL.revokeObjectURL(url);
      }

      clearInterval(progressInterval);
      setIsExporting(false);
      setShowExportModal(false);
      setExportProgress(0);

    } catch (error) {
      console.error('Error exporting CV:', error);
      setIsExporting(false);
      setShowExportModal(false);
      setExportProgress(0);
      setExportError(`Failed to export CV: ${error.message}`);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Personal Information</Text>

            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              {cvData.profileImage ? (
                <Image
                  source={{ uri: cvData.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Camera size={32} color="#9ca3af" />
                  <Text style={styles.imagePlaceholderText}>
                    Upload Profile Picture
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={cvData.fullName}
                onChangeText={(text) => setCvData({ ...cvData, fullName: text })}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Title *</Text>
              <TextInput
                style={styles.input}
                value={cvData.jobTitle}
                onChangeText={(text) => setCvData({ ...cvData, jobTitle: text })}
                placeholder="e.g., Marketing Manager"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone *</Text>
              <TextInput
                style={styles.input}
                value={cvData.phone}
                onChangeText={(text) => setCvData({ ...cvData, phone: text })}
                placeholder="123-456-7890"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={cvData.email}
                onChangeText={(text) => setCvData({ ...cvData, email: text })}
                placeholder="hello@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address *</Text>
              <TextInput
                style={styles.input}
                value={cvData.address}
                onChangeText={(text) => setCvData({ ...cvData, address: text })}
                placeholder="123 Anywhere St., Any City"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>About</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={cvData.about}
                onChangeText={(text) => setCvData({ ...cvData, about: text })}
                placeholder="Brief description about yourself"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Experience</Text>

            {cvData.experiences.map((exp, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>Experience {index + 1}</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Position *</Text>
                  <TextInput
                    style={styles.input}
                    value={exp.position}
                    onChangeText={(text) =>
                      updateExperience(index, 'position', text)
                    }
                    placeholder="Marketing Manager"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Company *</Text>
                  <TextInput
                    style={styles.input}
                    value={exp.company}
                    onChangeText={(text) =>
                      updateExperience(index, 'company', text)
                    }
                    placeholder="Ginyard International Co."
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Location</Text>
                  <TextInput
                    style={styles.input}
                    value={exp.location}
                    onChangeText={(text) =>
                      updateExperience(index, 'location', text)
                    }
                    placeholder="123 Anywhere St., Any City"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Period *</Text>
                  <TextInput
                    style={styles.input}
                    value={exp.period}
                    onChangeText={(text) =>
                      updateExperience(index, 'period', text)
                    }
                    placeholder="2022 - 2025"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={exp.description}
                    onChangeText={(text) =>
                      updateExperience(index, 'description', text)
                    }
                    placeholder="Describe your responsibilities..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addExperience}
            >
              <Text style={styles.addButtonText}>+ Add Experience</Text>
            </TouchableOpacity>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Education</Text>

            {cvData.education.map((edu, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>Education {index + 1}</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Degree *</Text>
                  <TextInput
                    style={styles.input}
                    value={edu.degree}
                    onChangeText={(text) =>
                      updateEducation(index, 'degree', text)
                    }
                    placeholder="Bachelor of Business Management"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>University *</Text>
                  <TextInput
                    style={styles.input}
                    value={edu.university}
                    onChangeText={(text) =>
                      updateEducation(index, 'university', text)
                    }
                    placeholder="Borcelle University"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Period *</Text>
                  <TextInput
                    style={styles.input}
                    value={edu.period}
                    onChangeText={(text) =>
                      updateEducation(index, 'period', text)
                    }
                    placeholder="2020 - 2023"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addEducation}
            >
              <Text style={styles.addButtonText}>+ Add Education</Text>
            </TouchableOpacity>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Skills & Languages</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Expertise</Text>
              <View style={styles.chipContainer}>
                {cvData.expertise.map((item, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{item}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.inputWithButton}>
                <TextInput
                  style={[styles.input, styles.flexInput]}
                  value={tempExpertise}
                  onChangeText={setTempExpertise}
                  placeholder="Add expertise"
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={addExpertiseItem}
                >
                  <Text style={styles.smallButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Languages</Text>
              <View style={styles.chipContainer}>
                {cvData.languages.map((item, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{item}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.inputWithButton}>
                <TextInput
                  style={[styles.input, styles.flexInput]}
                  value={tempLanguage}
                  onChangeText={setTempLanguage}
                  placeholder="Add language"
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={addLanguageItem}
                >
                  <Text style={styles.smallButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() =>
                    setCvData({
                      ...cvData,
                      includeHobbies: !cvData.includeHobbies,
                    })
                  }
                >
                  <View
                    style={[
                      styles.toggleCircle,
                      cvData.includeHobbies && styles.toggleCircleActive,
                    ]}
                  />
                </TouchableOpacity>
                <Text style={styles.cardTitle}>Include Hobbies</Text>
              </View>

              {cvData.includeHobbies && (
                <>
                  <View style={styles.chipContainer}>
                    {cvData.hobbies.map((item, index) => (
                      <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.inputWithButton}>
                    <TextInput
                      style={[styles.input, styles.flexInput]}
                      value={tempHobby}
                      onChangeText={setTempHobby}
                      placeholder="Add hobby"
                      placeholderTextColor="#9ca3af"
                    />
                    <TouchableOpacity
                      style={styles.smallButton}
                      onPress={addHobbyItem}
                    >
                      <Text style={styles.smallButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>References</Text>

            {cvData.references.map((ref, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>Reference {index + 1}</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={ref.name}
                    onChangeText={(text) =>
                      updateReference(index, 'name', text)
                    }
                    placeholder="Bailey Dupont"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Position</Text>
                  <TextInput
                    style={styles.input}
                    value={ref.position}
                    onChangeText={(text) =>
                      updateReference(index, 'position', text)
                    }
                    placeholder="Wardiere Inc. / CEO"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    style={styles.input}
                    value={ref.phone}
                    onChangeText={(text) =>
                      updateReference(index, 'phone', text)
                    }
                    placeholder="123-456-7890"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={ref.email}
                    onChangeText={(text) =>
                      updateReference(index, 'email', text)
                    }
                    placeholder="hello@reallygreatsite.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addReference}
            >
              <Text style={styles.addButtonText}>+ Add Reference</Text>
            </TouchableOpacity>
          </View>
        );

      case 6:
        return (
          <View style={styles.previewContainer}>
            {/* Template selector */}
            <View style={styles.templateSelector}>
              <Text style={styles.selectorTitle}>Choose Template:</Text>
              <View style={styles.templateButtons}>
                <TouchableOpacity
                  style={[
                    styles.templateButton,
                    selectedTemplate === 1 && styles.templateButtonActive,
                  ]}
                  onPress={() => setSelectedTemplate(1)}
                >
                  <Text
                    style={[
                      styles.templateButtonText,
                      selectedTemplate === 1 && styles.templateButtonTextActive,
                    ]}
                  >
                    Template 1 (Sidebar)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.templateButton,
                    selectedTemplate === 2 && styles.templateButtonActive,
                  ]}
                  onPress={() => setSelectedTemplate(2)}
                >
                  <Text
                    style={[
                      styles.templateButtonText,
                      selectedTemplate === 2 && styles.templateButtonTextActive,
                    ]}
                  >
                    Template 2 (Modern)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.templateButton,
                    selectedTemplate === 3 && styles.templateButtonActive,
                  ]}
                  onPress={() => setSelectedTemplate(3)}
                >
                  <Text
                    style={[
                      styles.templateButtonText,
                      selectedTemplate === 3 && styles.templateButtonTextActive,
                    ]}
                  >
                    Template 3 (Professional)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.templateButton,
                    selectedTemplate === 4 && styles.templateButtonActive,
                  ]}
                  onPress={() => setSelectedTemplate(4)}
                >
                  <Text
                    style={[
                      styles.templateButtonText,
                      selectedTemplate === 4 && styles.templateButtonTextActive,
                    ]}
                  >
                    Template 4 (Timeline)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.viewShot}>
              <View style={styles.cvContainer}>
                <View style={styles.cvSidebar}>
                  {cvData.profileImage && (
                    <Image
                      source={{ uri: cvData.profileImage }}
                      style={styles.cvProfileImage}
                    />
                  )}

                  <View style={styles.cvSection}>
                    <Text style={styles.cvSectionTitle}>Contact</Text>
                    <View style={styles.cvContactItem}>
                      <Text style={styles.cvContactLabel}>Phone</Text>
                      <Text style={styles.cvContactValue}>{cvData.phone || 'N/A'}</Text>
                    </View>
                    <View style={styles.cvContactItem}>
                      <Text style={styles.cvContactLabel}>Email</Text>
                      <Text style={styles.cvContactValue}>{cvData.email || 'N/A'}</Text>
                    </View>
                    <View style={styles.cvContactItem}>
                      <Text style={styles.cvContactLabel}>Address</Text>
                      <Text style={styles.cvContactValue}>{cvData.address || 'N/A'}</Text>
                    </View>
                  </View>

                  {cvData.education.length > 0 && (
                    <View style={styles.cvSection}>
                      <Text style={styles.cvSectionTitle}>Education</Text>
                      {cvData.education.map((edu, index) => (
                        <View key={index} style={styles.cvEducationItem}>
                          <Text style={styles.cvEducationPeriod}>
                            {edu.period}
                          </Text>
                          <Text style={styles.cvEducationDegree}>
                            {edu.degree}
                          </Text>
                          <Text style={styles.cvEducationUniversity}>
                            {edu.university}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {cvData.expertise.length > 0 && (
                    <View style={styles.cvSection}>
                      <Text style={styles.cvSectionTitle}>Expertise</Text>
                      {cvData.expertise.map((item, index) => (
                        <Text key={index} style={styles.cvListItem}>
                          • {item}
                        </Text>
                      ))}
                    </View>
                  )}

                  {cvData.languages.length > 0 && (
                    <View style={styles.cvSection}>
                      <Text style={styles.cvSectionTitle}>Language</Text>
                      {cvData.languages.map((item, index) => (
                        <Text key={index} style={styles.cvListItem}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.cvMain}>
                  <View style={styles.cvHeader}>
                    <Text style={styles.cvName}>{cvData.fullName || 'Your Name'}</Text>
                    <Text style={styles.cvJobTitle}>{cvData.jobTitle || 'Your Job Title'}</Text>
                  </View>

                  {cvData.about && (
                    <View style={styles.cvAbout}>
                      <Text style={styles.cvAboutText}>{cvData.about}</Text>
                    </View>
                  )}

                  {cvData.experiences.length > 0 && (
                    <View style={styles.cvMainSection}>
                      <Text style={styles.cvMainSectionTitle}>Experience</Text>
                      {cvData.experiences.map((exp, index) => (
                        <View key={index} style={styles.cvExperienceItem}>
                          <Text style={styles.cvExperiencePosition}>
                            {exp.position}
                          </Text>
                          <Text style={styles.cvExperiencePeriod}>
                            {exp.period}
                          </Text>
                          <Text style={styles.cvExperienceCompany}>
                            {exp.company}
                            {exp.location ? ` | ${exp.location}` : ''}
                          </Text>
                          {exp.description && (
                            <Text style={styles.cvExperienceDescription}>
                              {exp.description}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )}

                  {cvData.references.length > 0 &&
                    cvData.references.some((ref) => ref.name) && (
                      <View style={styles.cvMainSection}>
                        <Text style={styles.cvMainSectionTitle}>Reference</Text>
                        <View style={styles.cvReferencesRow}>
                          {cvData.references.map((ref, index) =>
                            ref.name ? (
                              <View key={index} style={styles.cvReferenceItem}>
                                <Text style={styles.cvReferenceName}>
                                  {ref.name}
                                </Text>
                                <Text style={styles.cvReferencePosition}>
                                  {ref.position}
                                </Text>
                                <Text style={styles.cvReferenceContact}>
                                  Phone: {ref.phone}
                                </Text>
                                <Text style={styles.cvReferenceContact}>
                                  Email: {ref.email}
                                </Text>
                              </View>
                            ) : null
                          )}
                        </View>
                      </View>
                    )}
                </View>
              </View>
            </View>

            <View style={styles.bannerAd}>
              <Text style={styles.bannerText}>Template {selectedTemplate} Selected • Real data will be exported to PDF</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create CV</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressBar}>
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <View
            key={s}
            style={[
              styles.progressStep,
              s <= step && styles.progressStepActive,
            ]}
          />
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
      </ScrollView>

      {exportError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{exportError}</Text>
          <TouchableOpacity onPress={() => setExportError(null)}>
            <Text style={styles.dismissText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      {exportSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>CV exported successfully!</Text>
          <TouchableOpacity onPress={() => setExportSuccess(false)}>
            <Text style={styles.dismissText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(step - 1)}
          >
            <ArrowLeft size={20} color="#3b82f6" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        {step < 6 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setStep(step + 1)}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.exportButton} onPress={exportToPDF}>
            <Upload size={20} color="#fff" />
            <Text style={styles.exportButtonText}>Export PDF</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showExportModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isExporting ? 'Exporting CV...' : 'CV Ready!'}
            </Text>
            <Text style={styles.modalSubtitle}>
              {isExporting
                ? 'Please wait while we prepare your CV'
                : 'Your CV has been exported successfully'}
            </Text>

            {isExporting && (
              <>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${exportProgress}%` as any },
                    ]}
                  />
                </View>

                <Text style={styles.progressText}>{exportProgress}%</Text>
              </>
            )}

            <View style={styles.modalBanner}>
              <Text style={styles.modalBannerText}>Advertisement</Text>
            </View>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1f2937',
  },
  progressBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#3b82f6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  stepContainer: {
    gap: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 8,
  },
  imagePickerButton: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#6b7280',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500' as const,
  },
  inputWithButton: {
    flexDirection: 'row',
    gap: 8,
  },
  flexInput: {
    flex: 1,
  },
  smallButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#fff',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleButton: {
    width: 48,
    height: 28,
    backgroundColor: '#e5e7eb',
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  toggleCircleActive: {
    backgroundColor: '#3b82f6',
    alignSelf: 'flex-end',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3b82f6',
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#3b82f6',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#fff',
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#fff',
  },
  previewContainer: {
    gap: 16,
  },
  templateSelector: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 12,
  },
  templateButtons: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  templateButton: {
    flex: 1,
    minWidth: 110,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  templateButtonActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  templateButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6b7280',
    textAlign: 'center' as const,
  },
  templateButtonTextActive: {
    color: '#3b82f6',
  },
  viewShot: {
    backgroundColor: '#fff',
  },
  cvContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    minHeight: 800,
  },
  cvSidebar: {
    width: '35%',
    backgroundColor: '#374151',
    padding: 20,
    gap: 24,
  },
  cvProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 8,
  },
  cvSection: {
    gap: 8,
  },
  cvSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#fff',
    marginBottom: 8,
  },
  cvContactItem: {
    marginBottom: 8,
  },
  cvContactLabel: {
    fontSize: 10,
    color: '#d1d5db',
    marginBottom: 2,
  },
  cvContactValue: {
    fontSize: 11,
    color: '#fff',
  },
  cvEducationItem: {
    marginBottom: 12,
  },
  cvEducationPeriod: {
    fontSize: 10,
    color: '#d1d5db',
    marginBottom: 2,
  },
  cvEducationDegree: {
    fontSize: 11,
    fontWeight: 'bold' as const,
    color: '#fff',
    marginBottom: 2,
  },
  cvEducationUniversity: {
    fontSize: 10,
    color: '#d1d5db',
  },
  cvListItem: {
    fontSize: 11,
    color: '#fff',
    marginBottom: 4,
  },
  cvMain: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  cvHeader: {
    marginBottom: 8,
  },
  cvName: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 4,
  },
  cvJobTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  cvAbout: {
    paddingBottom: 12,
  },
  cvAboutText: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 16,
  },
  cvMainSection: {
    gap: 12,
  },
  cvMainSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 8,
  },
  cvExperienceItem: {
    marginBottom: 12,
    gap: 4,
  },
  cvExperiencePosition: {
    fontSize: 13,
    fontWeight: 'bold' as const,
    color: '#1f2937',
  },
  cvExperiencePeriod: {
    fontSize: 11,
    color: '#6b7280',
  },
  cvExperienceCompany: {
    fontSize: 11,
    color: '#6b7280',
  },
  cvExperienceDescription: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 14,
    marginTop: 4,
  },
  cvReferencesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  cvReferenceItem: {
    flex: 1,
    gap: 4,
  },
  cvReferenceName: {
    fontSize: 12,
    fontWeight: 'bold' as const,
    color: '#1f2937',
  },
  cvReferencePosition: {
    fontSize: 10,
    color: '#6b7280',
  },
  cvReferenceContact: {
    fontSize: 9,
    color: '#6b7280',
  },
  bannerAd: {
    height: 80,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bannerText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1f2937',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#3b82f6',
  },
  modalBanner: {
    width: '100%',
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 8,
  },
  modalBannerText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  errorBanner: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#991b1b',
    fontWeight: '600' as const,
  },
  successBanner: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#dcfce7',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  successText: {
    flex: 1,
    fontSize: 14,
    color: '#166534',
    fontWeight: '600' as const,
  },
  dismissText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600' as const,
    marginLeft: 12,
  },
});