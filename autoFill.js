if (currentRoute in routes) {
  let formNames = routes[currentRoute];

  for (let name in formNames) {
    if (name === 'callback') {
      formNames[name]();
    } else {
      let formName = document.getElementsByName(name)[0];
      formName.value = formNames[name]();
    }
  }
}
