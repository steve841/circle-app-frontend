import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Avatar } from 'react-native-elements';

const Comment = props => {
  // const {
  //   avatar,
  //   name,
  //   date,
  //   post,
  // } = props;

  const avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
  const name = 'Steve'
  const date = '2018/02/23'
  const post = 'Hi there what are you doing right now Im writing this text to you'

  return (
    <View
      style={styles.container} >


        <Avatar
          small
          rounded
          //onPress{onProfilePress}
          source={{uri: avatar}} />

      <View
        style={{ paddingLeft: 10 }} >

          <View
            style={styles.headerContainer} >

            <Text
              style={styles.name} >{name}</Text>
            <Text
              style={styles.date} >{date}</Text>

          </View>

          <View
            style={styles.postContainer} >

            <Text
              style={styles.post} >{post}</Text>


          </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  postContainer: {

  },
  name: {
    fontWeight: 'bold',
  },
  date: {
    color: 'grey',
  },
  post: {
    paddingRight: 10,
    color: 'black',
  }
})

export default Comment;
