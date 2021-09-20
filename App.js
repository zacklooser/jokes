import React from 'react';
import { Text, View, RefreshControl, ScrollView } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import axios from 'axios'

const App = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [currentJoke, setCurrentJoke] = React.useState({})
  const headers = {
    "content-type": "application/json"
  };
  React.useEffect(() => {
    loadNewJoke()
  }, [])

  const loadNewJoke = (timeout) => {
    axios.get('https://official-joke-api.appspot.com/random_joke', { headers })
      .then(response => {
        setCurrentJoke(response.data)
        setRefreshing(false)
      });
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    loadNewJoke()
    setRefreshing(true);
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
      <Text style={{ fontSize: 25, marginTop: "25%", textAlign: 'center', fontWeight: 'bold' }}>Laughing Colours</Text>
      <ScrollView
        //contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        {refreshing ?
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", alignItems: "center" ,marginTop: "15%",}}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
          :
          <View>
            <Text style={{ fontSize: 20, marginTop: "15%", textAlign: 'center' }}>{currentJoke.setup}</Text>
            <Text style={{ fontSize: 20, marginTop: "5%", textAlign: 'center', fontWeight: 'bold' }}>😂{currentJoke.punchline}😂</Text>
          </View>
        }
      </ScrollView>
    </View>
  );
}
export default App;
