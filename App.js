import * as React from 'react';
import{ NavigationContainer} from "@react-navigation/native";
import{ createNativeStackNavigator} from "@react-navigation/native-stack";
import NoteList from "./screens/NoteList";
import NoteContext from "./screens/NoteContext";
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="NoteList">
          <Stack.Screen name="NoteList" component={NoteList} options={{headerShown:false}}/>
          <Stack.Screen name="NoteContext" component={NoteContext}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}