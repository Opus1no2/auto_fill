if (currentRoute in routes) {
  let formNames = routes[currentRoute];

  for (let name in formNames) {
    if (name === 'callback') {
      formNames[name]();
    } else {
      let formName = document.getElementsByName(name)[0];
      if (formName) formName.value = formNames[name]();
    }
  }
}

submit.click();

setTimeout(() => {
  const submitBtn = document.querySelector('[type="submit"]');
  console.log(submitBtn.checkValidity());
  submitBtn.dispatchEvent(new Event('click', { bubbles: true }));
}, 0);

