import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Dashboard from './src/screens/Dashboard';

function App() {
  return (
    <View>
      <Dashboard />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;
