import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JobHunt</Text>
      <Text style={styles.body}>Khung Phase 0. Feed, nút Quét và chia sẻ từ Facebook sẽ có ở các phase sau.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 12 },
  body: { fontSize: 16, textAlign: 'center', color: '#555' },
});
