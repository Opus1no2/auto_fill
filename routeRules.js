const pwd = faker.internet.password();
const currentRoute = window.location.pathname;
const submit = document.querySelector('[type="submit"]');

const nativeInputSet = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype, 'value'
).set;

const nativeSelectSet = Object.getOwnPropertyDescriptor(
  window.HTMLSelectElement.prototype, "value"
).set;

const random = (fromArray) => {
  return fromArray[Math.floor(Math.random() * fromArray.length)];
};

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

      // We're on About Me
      if (zipInput) {

        // Trigger React onChange
        nativeInputSet.call(zipInput, zip);
        zipInput.dispatchEvent(new Event('input', { bubbles: true }));

        document.querySelectorAll('.questionnaire').forEach((questions) => {
          const btns = [...questions.querySelectorAll('button')];
          random(btns).click();
        });
      }

      // We're on My Career Story
      if (features.length > 0) {
        const exp = ['jr', 'mid', 'sr'];
        const autoComplete = document.querySelector('.autocomplete-input');
        const randomFeature = random(features);

        randomFeature.querySelector('button').click();

        // The only discernable way to get the capabilities section
        setTimeout(() => {
          const capabilities = document.querySelectorAll('.questionnaire')[1];
          const capabilityBtns = capabilities.querySelectorAll('.selectable-button');
          const btns = [...capabilityBtns];

          // Select at least 3 required capabilities
          for (let i = 0; i < 3; i++) {
            random(btns).click();
          }
        }, 100)

        // Dispatching the click event won't work without this.
        autoComplete.focus();

        const autoCompleteSelected = () => {
          return document.querySelectorAll(
            '[data-testid="autocomplete-selected"]'
          );
        }

        // Form won't submit unless we remove
        // at least one and add it again.
        if (autoCompleteSelected().length === 6) {
          random(autoCompleteSelected()).click();
        }

        const diff = (6 - autoCompleteSelected().length);

        // Form won't submit without all 6. Don't ask me why.
        for (let i = 0; i < diff; i++) {

          // This needs to happen before we select auto-complete options
          autoComplete.dispatchEvent(new Event('click', { bubbles: true }));

          const autoOptions = document.querySelector('.autocomplete-options');
          const options = [...autoOptions.querySelectorAll('div')];
          random(options).click();
        }

        const experienceLevel = document.querySelector('select.form-control');
        const randExpLevel = exp[Math.floor(Math.random() * exp.length)];

        const submitBtn = document.querySelector('[type="submit"]');
        const selectExp = document.querySelector('select.form-control');

        // Trigger react select change
        nativeSelectSet.call(selectExp, randExpLevel);

        // Experience selector must be blurred to continue
        selectExp.dispatchEvent(new Event('blur', { bubbles: true }));
      }

      const hero = document.querySelector('.onboarding-hero-header ');

      // Brittle, but we're on Flex Factors
      if (hero.innerText.toLowerCase() === "flex factors") {
        const workStatus = document.querySelectorAll('.questionnaire')[0];
        const statusBtns = [...workStatus.querySelectorAll('.selectable-button')];
        random(statusBtns).click();

        const workHours = document.querySelectorAll('.questionnaire')[1];
        const workBtns = [...workHours.querySelectorAll('.selectable-button')];
        random(workBtns).click();

        const workLocation = document.querySelectorAll('.questionnaire')[2];
        const workLocationBtns = [...workLocation.querySelectorAll('.selectable-button')];
        random(workLocationBtns).click();
      }
    },
  },
};
