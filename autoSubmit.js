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

// Need this vanilla click for Talent Sign up page
submit.click();

// This is to trigger React click events
setTimeout(() => {
  const submitBtn = document.querySelector('[type="submit"]');
  submitBtn.dispatchEvent(new Event('click', { bubbles: true }));
}, 0);

