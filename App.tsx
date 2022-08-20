import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import Chatting from '@/pages/chatting';
import Home from '@/pages/home';
import Settings from '@/pages/settings';

const App = () => {
  const Tab = createBottomTabNavigator();

  const defaultTabScreenOptions = {
    tabBarLabelStyle: {
      fontSize: 12,
    },
    tabBarActiveTintColor: '#000000',
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: '대타',
            title: '홈',
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? 'home' : 'home-outline'} size={22} />
            ),
            ...defaultTabScreenOptions,
          }}
        />
        <Tab.Screen
          name="Chatting"
          component={Chatting}
          options={{
            title: '채팅',
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={22} />
            ),
            ...defaultTabScreenOptions,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: '세팅',
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? 'settings' : 'settings-outline'} size={22} />
            ),
            ...defaultTabScreenOptions,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
