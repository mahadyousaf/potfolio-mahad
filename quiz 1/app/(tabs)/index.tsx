import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = "0c0abf693c3a2bb013cbc431eb64b0ab";  // 🔴 Replace this with your OpenWeatherMap API key

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="#888"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#00f" />}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.condition}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Dark background
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff', // White text
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    backgroundColor: '#222',
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E88E5',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  temp: {
    fontSize: 28,
    color: '#FF9800',
  },
  condition: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#ccc',
  },
});
