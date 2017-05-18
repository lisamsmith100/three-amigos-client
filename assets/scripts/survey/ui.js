'use strict'

const store = require('../store')
const showSurveysTemplate = require('../templates/survey-listing.handlebars')
const api = require('./api')

const getSurveysSuccess = (data) => {
  console.log('Get Surveys success', data)
  console.log('data.surveys is, ', data.surveys)
  const surveys = []
  for (let i = 0; i < data.surveys.length; i++) {
    const item = data.surveys[i]
    if (item.editable) {
      surveys.push(data.surveys[i])
    }
  }
  $('#userSurveys').empty()
  const showSurveysHtml = showSurveysTemplate({ surveys: surveys })
  $('#userSurveys').html(showSurveysHtml)
  console.log('this user surverys only: ', surveys)
  // store.surveys = data.surveys
  store.surveys = surveys
  // $(document).ready(function () {
  //   $('.delete-survey').on('click', function () {
  //     console.log('Delete Clicked')
  //   })
  // })
  // when calling the code below from api for some reason
  // the it was not getting called, hence the reason
  // the code is not called from there
  // Delete and refresh front end(via onDeleteSurveySuccess)
  // Use the class and add handler.
  $('.delete-survey').on('click', function (event) {
    event.preventDefault()
    // console.log('onDeleteSurvey: ', event)
    console.log('target_id: ', event.target.id)
    // the button id has the ID, parse it out
    const data = event.target.id.split('-')
    console.log('id: ', data[2])
    api.onDeleteSurvey(data[2])
      .then(onDeleteSurveySuccess)
      .catch(onDeleteSurveyFailure)
  })
}
// const addSurveyDeleteEventHandlers = function (surveys) {
//   surveys.forEach(function (item) {
//     console.log('item id: ', item.id)
//     $('#survey-delete-' + item.id).on('click', events.onDeleteSurvey)
//   })
// }
const getSurveysFailure = (error) => {
  console.log('Get Surveys Failure')
  console.error(error)
}
const onCreateSurveySuccess = (data) => {
  console.log('Create Survey success', data)
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  // store.surveys = data.surveys
}
const onCreateSurveyFailure = (error) => {
  console.log('Get Surveys Failure')
  console.error(error)
}
const onDeleteSurveySuccess = (data) => {
  // update the store with the vaild surveys
  api.onGetSurveys()
    .then(getSurveysSuccess)
    .catch(getSurveysFailure)
  console.log('Delete Survey success', data)
  // store.surveys = data.surveys
}
const onDeleteSurveyFailure = (error) => {
  console.log('Delete Surveys Failure')
  console.error(error)
}
const onUpdateSurveySuccess = () => {
  // update the store with the vaild surveys
  console.log('Update Survey success')
  // update the store with the vaild surveys
  api.onGetSurveys()
    .then(getSurveysSuccess)
    .catch(getSurveysFailure)
}
const onUpdateSurveyFailure = (error) => {
  console.log('Update Surveys Failure')
  console.error(error)
}

const onCreateQuestionSuccess = (data) => {
  console.log('Create Question success', data)
  // store.surveys = data.surveys
}
const onCreateQuestionFailure = (error) => {
  console.log('create-survey Question Failure')
  console.error(error)
}
const onDeleteQuestionSuccess = () => {
  console.log('Delete Question success')
  // store.surveys = data.surveys
}
const onDeleteQuestionFailure = (error) => {
  console.log('Delete Question Failure')
  console.error(error)
}
module.exports = {
  getSurveysSuccess,
  getSurveysFailure,
  onCreateSurveySuccess,
  onCreateSurveyFailure,
  onDeleteSurveySuccess,
  onDeleteSurveyFailure,
  onUpdateSurveySuccess,
  onUpdateSurveyFailure,
  onCreateQuestionSuccess,
  onCreateQuestionFailure,
  onDeleteQuestionSuccess,
  onDeleteQuestionFailure
}
