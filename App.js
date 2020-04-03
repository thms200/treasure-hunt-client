import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="hiding"
        onPress={() => navigation.navigate('SelectTreasureCategory')}
      />
      <Button
        title="hunting"
        onPress={() => navigation.navigate('GetTreasureList')}
      />
    </View>
  );
}

function SelectTreasureCategory({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="유심"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '유심',
        })}
      />
      <Button
        title="교통"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '교통',
        })}
      />
      <Button
        title="영화/공연"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '영화/공연',
        })}
      />
      <Button
        title="입장권"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '입장권',
        })}
      />
      <Button
        title="쿠폰"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '쿠폰',
        })}
      />
      <Button
        title="기타"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '기타',
        })}
      />
    </View>
  );
}

function InputTreasureDetail({ route }) {
  const { category } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{category}</Text>
    </View>
  );
}

function GetTreasureList({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="영국 교통 패스"
        onPress={() => navigation.navigate('GetTreasureDetail', {
          id: '영국 교통 패스 DB id',
        })}
      />
      <Button
        title="프랑스 유심"
        onPress={() => navigation.navigate('GetTreasureDetail', {
          id: '프랑스 유심 DB id',
        })}
      />
      <Button
        title="Hiding"
        onPress={() => navigation.navigate('SelectTreasureCategory')}
      />
    </View>
  );
}

function GetTreasureDetail({ route }) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  );
}

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
        <RootStack.Screen 
          name="SelectTreasureCategory"
          component={SelectTreasureCategory}
          options={({ navigation }) => ({
            headerTitle: 'Select category',
            headerRight: () => (
              <Button
                title="finding"
                onPress={() => navigation.navigate('GetTreasureList')}
              />
            ),
          })}
        />
        <RootStack.Screen
          name="InputTreasureDetail"
          component={InputTreasureDetail}
          options={({ navigation }) => ({
            headerTitle: 'Select category',
            headerRight: () => (
              <Button
                title="finding"
                onPress={() => navigation.navigate('GetTreasureList')}
              />
            ),
          })}
        />
        <RootStack.Screen name="GetTreasureList" component={GetTreasureList} options={{ headerShown: false }} />
        <RootStack.Screen name="GetTreasureDetail" component={GetTreasureDetail} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
