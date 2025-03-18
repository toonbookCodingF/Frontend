import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const ParagraphScreen = () => {
  const navigation = useNavigation();

  // Toggle visibility of UI elements
  const [isVisible, setIsVisible] = useState(false);

  // Track touch position to differentiate tap from scroll
  const touchStartY = useRef(0);

  // Sample paragraphs with long text to force scrolling
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat id metus ac fermentum. Nullam auctor velit non augue tincidunt, in scelerisque libero pellentesque. Curabitur gravida ligula non erat euismod, et efficitur felis tincidunt. Nulla facilisi.",
    "Suspendisse potenti. Vestibulum volutpat suscipit risus at vestibulum. Donec auctor velit eget ex interdum, et tristique augue convallis. Duis ut ante metus. Vivamus et dapibus purus, ut luctus nunc.",
    "Nunc dapibus justo et massa congue, id auctor sapien suscipit. Curabitur bibendum ligula non neque interdum, ut congue velit gravida. Aliquam sit amet ultricies felis. Maecenas et volutpat orci.",
    "Quisque varius, libero nec rhoncus consectetur, erat felis euismod quam, et scelerisque justo elit id lorem. Donec sed mauris justo.",
    "Aenean dignissim magna ut libero congue, nec eleifend purus gravida. Morbi feugiat mi vel lorem sagittis, eu scelerisque purus accumsan."
  ];

  // Detect tap vs. scroll
  const handleTouchStart = (event) => {
    touchStartY.current = event.nativeEvent.locationY;
  };

  const handleTouchEnd = (event) => {
    const touchEndY = event.nativeEvent.locationY;
    if (Math.abs(touchStartY.current - touchEndY) < 5) { // ✅ If movement is small, consider it a tap
      setIsVisible(!isVisible);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header (Hidden by default) */}
      {isVisible && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Titre + Chapitre</Text>
        </View>
      )}

      {/* Fullscreen scrollable content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onTouchStart={handleTouchStart}  // ✅ Capture the start position
        onTouchEnd={handleTouchEnd}      // ✅ Detect if it's a tap or scroll
      >
        {paragraphs.map((para, index) => (
          <View key={index} style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>{para}</Text>
            {isVisible && (
              <TouchableOpacity style={styles.commentButton}>
                <Ionicons name="chatbubble-outline" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation (Hidden by default) */}
      {isVisible && <View style={styles.bottomNav} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#800080', // Keep background uniform
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#800080', // Same as background
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 30, // Moves paragraphs lower
  },
  paragraphContainer: {
    marginBottom: 30, // More spacing for better readability
  },
  paragraph: {
    color: 'white',
    fontSize: 16,
    textAlign: 'justify',
  },
  commentButton: {
    alignSelf: 'flex-end', // Move to the right
    marginTop: 10,
    padding: 10,
    marginRight: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#800080', // Same as background
  },
});

export default ParagraphScreen;
