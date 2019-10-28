const pwd = faker.internet.password();
const currentRoute = window.location.pathname;
const submit = document.querySelector('[type="submit"]');

const nativeInputSet = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype, 'value'
).set;

const nativeSelectSet = Object.getOwnPropertyDescriptor(
  window.HTMLSelectElement.prototype, "value"
).set;

const routes = {
  '/mom/signup': {
    'mom[first_name]'() {
      return faker.name.firstName();
    },
    'mom[last_name]'() {
      return faker.name.lastName();
    },
    'mom[email]'() {
      return faker.internet.email();
    },
    'mom[phone]'() {
      return faker.phone.phoneNumber();
    },
    'mom[password]'() {
      return pwd;
    },
    'mom[password_confirmation]'() {
      return pwd;
    },
    'mom[refered_by]'() {
      return 'google';
    }
  },
  '/mom/onboarding': {
    'callback'() {
      const zipInput = document.getElementById('zip_code');
      const zip = faker.address.zipCode('#####');
      const features = [...document.querySelectorAll('.featured-functions')];

      // we're on About Me
      if (zipInput) {
        // hackery to trigger Reach onChange
        nativeInputSet.call(zipInput, zip);
        zipInput.dispatchEvent(new Event('input', { bubbles: true }));

        document.querySelectorAll('.questionnaire').forEach((questions) => {
          const btns = [...questions.querySelectorAll('button')];
          btns[Math.floor(Math.random() * btns.length)].click();
        });
      }

      // We're on My Career Story
      if (features.length > 0) {
        const rando = features[Math.floor(Math.random() * features.length)];
        rando.querySelector('button').click();

        // The only discernable way to get the capabilities section
        setTimeout(() => {
          const capabilities = document.querySelectorAll('.questionnaire')[1];
          const capabilityBtns = capabilities.querySelectorAll('.selectable-button');
          const btns = [...capabilityBtns];

          // Select at least 3 required capabilities
          for (let i = 0; i < 3; i++) {
            btns[Math.floor(Math.random() * capabilityBtns.length)].click();
          }
        }, 100)

        const autoComplete = document.querySelector('.autocomplete-input');

        // Dispatching the click event won't work without this.
        autoComplete.focus();

        // Form won't submit without all 6. Don't ask me why.
        for (let i = 0; i < 6; i++) {
          autoComplete.dispatchEvent(new Event('click', { bubbles: true }));
          const autoOptions = document.querySelector('.autocomplete-options');
          const options = [...autoOptions.querySelectorAll('div')];
          options[Math.floor(Math.random() * options.length)].click();
        }

        const exp = ['jr', 'mid', 'sr'];

        const experienceLevel = document.querySelector('select.form-control');
        const randExpLevel = exp[Math.floor(Math.random() * exp.length)];

        const submitBtn = document.querySelector('[type="submit"]');
        const selectExp = document.querySelector('select.form-control');

        nativeSelectSet.call(selectExp, randExpLevel);

        // Experience selector must be blurred to continue
        selectExp.dispatchEvent(new Event('blur', { bubbles: true }));
      }

      const hero = document.querySelector('.onboarding-hero-header ');

      // Brittle, but we're on Flex Factors
      if (hero.innerText.toLowerCase() === "flex factors") {
        const workStatus = document.querySelectorAll('.questionnaire')[0];
        const statusBtns = [...workStatus.querySelectorAll('.selectable-button')];
        statusBtns[Math.floor(Math.random() * statusBtns.length)].click();

        const workHours = document.querySelectorAll('.questionnaire')[1];
        const workBtns = [...workHours.querySelectorAll('.selectable-button')];
        workBtns[Math.floor(Math.random() * workBtns.length)].click();

        const workLocation = document.querySelectorAll('.questionnaire')[2];
        const workLocationBtns = [...workLocation.querySelectorAll('.selectable-button')];
        workLocationBtns[Math.floor(Math.random() * workLocationBtns.length)].click();
      }
    },
  },
};
