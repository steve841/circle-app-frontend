import {
  FETCHING_ASSESSMENT,
  FETCHING_ASSESSMENT_SUCCESS,
  FETCHING_ASSESSMENT_FAILURE,
  REMOVE_FETCHING_ASSESSMENT,
  UPDATE_RESPONSE,
  SUBMIT_RESPONSE,
  PROCESSING_RESPONSE_ERROR,
  CHECK_RESPONSE,
  UPDATE_PERSONAL_INFO,
} from './types';

import {
  fetchAssessment,
} from '../services/api/assessment';
import _values from 'lodash/values';

const fetchingAssessment = () => {
  return {
    type: FETCHING_ASSESSMENT,
  }
}

const fetchingAssessmentSuccess = (assessment) => {
  const assessmentLength = _values(assessment).length;
  const progress = 1 / assessmentLength
  return {
    type: FETCHING_ASSESSMENT_SUCCESS,
    assessment,
    assessmentLength,
    progress,
  }
}

const fetchingAssessmentFailure = (error) => {
  console.warn(error);
  return {
    type: FETCHING_ASSESSMENT_FAILURE,
    error: 'Error fetching assessment',
  }
}

export const removeFetchingAssessment = () => {
  return {
    type: REMOVE_FETCHING_ASSESSMENT,
  }
}

export const fetchAndHandleAssessment = (assessmentType) => (dispatch) => {
  dispatch(fetchingAssessment())
  return fetchAssessment(assessmentType)
    .then((assessment) => dispatch(fetchingAssessmentSuccess(assessment)))
    .catch((error) => dispatch(fetchingAssessmentFailure(error)))
}

export const updateResponse = (value, type, fieldName) => {
  if (type === 'numeric') {
    return {
      type: UPDATE_RESPONSE,
      response: Math.floor(value),
    }
  } else if (type === 'text') {
    return {
      type: UPDATE_RESPONSE,
      response: value,
    }
  } else if (type === 'personal-information') {
    return {
      type: UPDATE_PERSONAL_INFO,
      response: value,
      fieldName,
    }
  }
}

export const submitResponse = (questionId, responseId) => {
  if (questionId && responseId) {
    return {
      type: SUBMIT_RESPONSE,
      questionId,
      responseId,
      nextQuestion: getNextQuestion(questionId, responseId),
    }
  } else {
    console.warn('Invalid question or response');
    return {
      type: PROCESSING_RESPONSE_ERROR,
      error: 'Something went wrong',
    }
  }
}

export const checkResponse = (questionId, responseId) => {
  if (questionId && responseId) {
    return {
      type: CHECK_RESPONSE,
      questionId,
      responseId,
    }
  } else {
    console.warn('Invalid question or response');
    return {
      type: PROCESSING_RESPONSE_ERROR,
      error: 'Something went wrong',
    }
  }
}

const processingResponseError = (error) => {
  return {
    type: PROCESSING_RESPONSE_ERROR,
    error,
  }
}

const getNextQuestion = (questionId, responseId) => {
  switch(questionId) {
    case 1:
      if (responseId === 2) {
        return 3;
      } else {
        return questionId + 1;
      }
    case 2:
      return questionId + 1;
    case 3:
      return questionId + 1;
    case 4:
      return questionId + 1;
    case 5:
      return questionId + 1;
  }
}
