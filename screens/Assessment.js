import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

const deviceWidth = Dimensions.get('window').width;

const CHOICES = [
  {title: 'Not present', checked: true },
  {title: 'Present but not exhibited in last 3 days', checked: false },
  {title: 'Exhibited on 1-2 of last 3 days', checked: false },
  {title: 'Exhibited daily in last 3 days', checked: false },
]

const CheckmarkSelection = ({ responses, multipleChoice, hasSubmitBtn, style }) => {

  return (
    <View
      style={{ flex: 1, justifyContent: 'center' }} >

      {responses.length === 0
        ? <Text style={styles.error}> 'Something went wrong' </Text>
        : null}

      {responses.map((choice, index) => (
        <CheckBox
          key={index}
          iconRight
          containerStyle={style.container}
          textStyle={style.text}
          title={choice.title}
          checkedIcon='dot-circle-o'
          checkedColor='blue'
          uncheckedIcon='circle-o'
          checked={choice.checked} />
      ))}

    </View>
  )
}

class AssessmentScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Assessment',
      headerTitle: 'Assessment',
    };
  }

  componentDidMount () {
    this.props.fetchAndHandleAssessment('cha');
  }

  render() {
    const isFetching = this.props.assessment.isFetching;
    const currentQuestion = this.props.assessment.assessment[this.props.assessment.currentQuestion];

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View
        style={styles.template.container} >

        <Progress.Bar
          animated={false}
          progress={0.3}
          width={deviceWidth}
          borderRadius={0}
          height={12} />

        <Text
          style={styles.template.title} >
          {currentQuestion.title}
        </Text>

        <Text
          style={styles.template.description} >
          {currentQuestion.description}
        </Text>

        <CheckmarkSelection
          style={styles.checkmarkSelection}
          responses={currentQuestion.responses} />

      </View>
    );
  }
}

function mapStateToProps({ assessment }) {
  return {
    assessment,
  }
}

const styles = {
  template: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      padding: 10,
      paddingTop: 20,
    },
    description: {
      fontSize: 18,
      textAlign: 'center',
      color: 'grey',
      padding: 10,
    },
    error: {
      fontSize: 18,
      textAlign: 'center',
      alignContent: 'center',
      color: 'red',
    },
  }),
  checkmarkSelection: StyleSheet.create({
    container: {
      //borderColor: 'grey',
      //backgroundColor: 'grey',
    },
    text: {
      fontSize: 16,
    },
  }),
};

export default connect(mapStateToProps, actions)(AssessmentScreen);