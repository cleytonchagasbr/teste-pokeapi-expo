import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [abilities, setAbilities] = useState([]);

  async function find() {
    if (!search.trim()) {
      console.log('Por favor, insira um nome de Pokémon.');
      return;
    }

    try {
      const response = await fetch(`https://teste-pokeapi.onrender.com/api/pokemons/${search.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      const data = await response.json();
      setAbilities(data);
    } catch (error) {
      console.error(error.message);
      setAbilities([]);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A91E1E', dark: '#A91E1E' }}
      headerImage={
        <Image
          source={require('@/assets/images/hero.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Olá!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Pokémon API Proxy</ThemedText>
        <ThemedText>Informe o nome de um Pokémon,{'\n'}por exemplo 'Pikachu'</ThemedText>
      </ThemedView>

      <TextInput
        placeholder="Pikachu"
        onChangeText={(text) => setSearch(text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={find} style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        {abilities.length > 0 && (
          <ThemedText type="subtitle">Habilidades:</ThemedText>
        )}
        {abilities.map((ability, index) => (
          <View key={index} style={styles.abilityItem}>
            <Text style={styles.abilityText}>
              {ability.ability.name} {ability.is_hidden ? '(Oculta)' : ''}
            </Text>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    borderWidth: 1.4,
    borderRadius: 6,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 6,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
  },
  abilityItem: {
    padding: 8,
    backgroundColor: '#f4f4f4',
    marginVertical: 4,
    borderRadius: 5,
  },
  abilityText: {
    fontSize: 16,
  },
});
