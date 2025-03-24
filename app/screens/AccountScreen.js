// app/screens/AccountScreen.js
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Divider, Avatar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../themes/theme';

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mijn Account</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Avatar.Icon size={60} icon="account" style={styles.avatar} />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>Inloggen</Text>
              <Text style={styles.profileSubtext}>
                Log in of registreer om je bestellingen te bekijken
              </Text>
            </View>
          </View>
          <Button 
            mode="contained" 
            style={styles.loginButton}
          >
            Inloggen / Registreren
          </Button>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mijn gegevens</Text>
          
          <MenuOption icon="cart-outline" title="Bestellingen" />
          <MenuOption icon="heart-outline" title="Favorieten" />
          <MenuOption icon="location-outline" title="Adressen" />
          <MenuOption icon="person-outline" title="Accountgegevens" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ondersteuning</Text>
          
          <MenuOption icon="help-circle-outline" title="Veelgestelde vragen" />
          <MenuOption icon="call-outline" title="Contact opnemen" />
          <MenuOption icon="information-circle-outline" title="Over Amwittools" />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>App versie 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper component for menu items
const MenuOption = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress}>
    <Ionicons name={icon} size={24} color={colors.primary} />
    <Text style={styles.menuTitle}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    padding: 16,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: colors.primary,
  },
  profileText: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileSubtext: {
    fontSize: 14,
    color: '#666',
  },
  loginButton: {
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  menuTitle: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default AccountScreen;