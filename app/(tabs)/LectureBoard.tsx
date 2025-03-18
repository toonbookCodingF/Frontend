import React from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, Text,  Pressable } from 'react-native';
import { useRouter } from 'expo-router';
// Type pour chaque roman
type Book = {
  id: string;
  image: any;
  title: string;
};

const books: Book[] = [
  {
    id: '1',
    image: require('../../assets/images/imgCoverRoman/CoversRoman1.jpeg'),
    title: '50 nuances',
  },
  {
    id: '2',
    image: require('../../assets/images/imgCoverRoman/CoversRoman2.jpg'),
    title: '50 nuances 2',
  },
  {
    id: '3',
    image: require('../../assets/images/imgCoverRoman/CoversRoman3.jpeg'),
    title: 'Jacaranda',
  },
  {
    id: '4',
    image: require('../../assets/images/imgCoverRoman/CoversRoman4.jpeg'),
    title: 'Jacaranda 2',
  },
];

const LectureBoard: React.FC = () => {

  const router = useRouter();

  const goToOeuvrePage =() =>{
    router.push('../screens/OeuvrePage')
  }
  const renderItem = ({ item }: { item: Book }) => (
    <Pressable onPress={goToOeuvrePage} style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth / 2 - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A020F0',
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    width: imageWidth,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: imageWidth * 1.5,
  },
  title: {
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LectureBoard;
