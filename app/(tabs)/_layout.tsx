import { Tabs } from 'expo-router';
import { Home, FileText, FileStack, FolderOpen } from 'lucide-react-native';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingTop: 8,
          paddingBottom: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600' as const,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cv"
        options={{
          title: 'السيرة الذاتية',
          tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pdf-tools"
        options={{
          title: 'أدوات PDF',
          tabBarIcon: ({ color }) => <FileStack size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: 'الوثائق',
          tabBarIcon: ({ color }) => <FolderOpen size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}