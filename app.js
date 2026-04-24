function init() {
  cacheDOMElements();
  renderWorkouts();
  updateUI();
  renderHistory();
  setupPedometer();
  bindStaticEvents();
  registerSW();
  linkProgressToSession();
  displayWelcomeUser();
}