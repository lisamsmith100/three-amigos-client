'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  // console.log('Data is:', data)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onSignIn data: ', data)
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.signInFailure)
}
const onSignOut = (data) => {
  event.preventDefault()
  console.log('Sign-Out Called')
  if (store.user == null) {
    // console.log('No One to Sign Out')
    return
  }
  // console.log('Api:sign OUT called')
  api.signOut()
  .then(ui.signOutSuccess)
  .catch(ui.signOutFailure)
}
const onChangePassword = function (event) {
  // console.log('onChangePassword called')
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onChangePassword called', data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const onGetSurveys = function (event) {
  console.log('onGetSurveys called')
  event.preventDefault()
  api.onGetSurveys()
    .then(ui.getSurveysSuccess)
    .catch(ui.getSurveysFailure)
}
const onCreateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.onCreateSurvey(data)
    .then(ui.onCreateSurveySuccess)
    .catch(ui.onCreateSurveyFailure)
}
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#create-survey').on('submit', onCreateSurvey)
  $('#get-surveys').on('submit', onGetSurveys)
}
module.exports = {
  addHandlers
}
