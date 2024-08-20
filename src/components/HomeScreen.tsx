import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#101828" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="notifications" size={24} color="#101828" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageIcon}>
            <Ionicons name="chatbubble" size={24} color="#101828" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting */}
      <Text style={styles.title}>Olá, Paciente</Text>
      <Text style={styles.subtitle}>Como podemos te ajudar hoje?</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#667085" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#667085"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#667085" />
        </TouchableOpacity>
      </View>

      {/* Mais procurados */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mais procurados</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/72" }}
            style={styles.avatar}
          />
          <Text style={styles.doctorName}>Dr. João Silva</Text>
          <Text style={styles.doctorSpecialty}>Cardiologia</Text>
          <View style={styles.favoriteContainer}>
            <FontAwesome5 name="star" size={16} color="#FFD700" />
            <Text style={styles.favoriteText}>4.8</Text>
          </View>
        </View>

        {/* Repetir card com gap entre eles */}
        <View style={styles.doctorCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/72" }}
            style={styles.avatar}
          />
          <Text style={styles.doctorName}>Dra. Maria Souza</Text>
          <Text style={styles.doctorSpecialty}>Pediatria</Text>
          <View style={styles.favoriteContainer}>
            <FontAwesome5 name="star" size={16} color="#FFD700" />
            <Text style={styles.favoriteText}>4.9</Text>
          </View>
        </View>
      </View>

      {/* Categorias */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesContainer}>
        {/* Categoria Card */}
        <View style={styles.categoryCard}>
          <FontAwesome5 name="heartbeat" size={32} color="#101828" />
          <Text style={styles.categoryText}>Cardiologia</Text>
        </View>
        <View style={styles.categoryCard}>
          <FontAwesome5 name="user-md" size={32} color="#101828" />
          <Text style={styles.categoryText}>Clínico</Text>
        </View>
        <View style={styles.categoryCard}>
          <FontAwesome5 name="brain" size={32} color="#101828" />
          <Text style={styles.categoryText}>Neurologia</Text>
        </View>
        <View style={styles.categoryCard}>
          <FontAwesome5 name="vials" size={32} color="#101828" />
          <Text style={styles.categoryText}>Exames</Text>
        </View>
      </View>

      {/* Floating Navigation */}
      <View style={styles.floatingNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={32} color="#FFFFFF" />
          <View style={styles.navIndicator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.selectedNavButton]}>
          <Ionicons name="heart" size={32} color="#FFFFFF" />
          <View style={styles.navIndicator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageIcon: {
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    color: "#101828",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    color: "#667085",
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 14,
    color: "#101828",
    flex: 1,
  },
  filterButton: {
    marginLeft: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    color: "#101828",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
    color: "#D0005E",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  doctorCard: {
    width: 182,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    color: "#101828",
    textAlign: "center",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#667085",
    textAlign: "center",
    marginBottom: 12,
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#667085",
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  categoryCard: {
    width: 83,
    height: 102,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#101828",
    textAlign: "center",
    marginTop: 8,
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#101828',
    borderRadius: 26,
    padding: 8,
    marginTop: 32,
    height: 72,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  selectedNavButton: {
    backgroundColor: '#475467',
    borderRadius: 20,
    padding: 16,
  },
  navIndicator: {
    width: 24,
    height: 5,
    borderRadius: 12,
    backgroundColor: '#D0005E',
    marginTop: 10,
  },
});

export default HomeScreen;
