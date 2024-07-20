import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
import { PaperProvider } from 'react-native-paper';
import { createContext, useState } from 'react';
// export const server = "https://reactnative-backend-todoapp.onrender.com"
export const Context = createContext({isAuthenticated:false})
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider
    value={{
      isAuthenticated,
      setIsAuthenticated,
  loading, setLoading,
  user,setUser
      
    }}>
    <PaperProvider>
    <Main/>
    </PaperProvider>
    </Context.Provider>
  );
}


