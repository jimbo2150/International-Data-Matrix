import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store"; //importing everything from "./store" as an object called "store"
import Navigo from "navigo"; //the navigo library is what imports the router.hooks({}):before, router.on(), and .resolve()
import { capitalize } from "lodash";
import axios from "axios";
import * as deepl from "deepl-node";
import { Stream } from "stream";
const dotenv = require("dotenv");

dotenv.config();
const router = new Navigo("/"); //initiating the "router" variable. uses the navigo library

// declaring what the render() will do
function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `

  ${Header(state)}
  ${Main(state)}
  ${Footer(state)}
  `;
  afterRender(state);
  router.updatePageLinks(); //navigo stuff for links
}

function afterRender(state) {
  switch (state.view) {
    case "Translator":
      const form = document.getElementById("fullTranslateContainer");
      const output = document.getElementById("translateOutput");
      form.addEventListener("submit", event => {
        event.preventDefault();
        const inputs = event.target.elements;
        const sourceText = inputs.translateInput.value;
        const outputLanguage = inputs.outputLangSelect.value;
        const requestBody = {
          sourceText,
          outputLanguage
        };
        axios
          .post("http://localhost:4040/translator", requestBody)
          .then(response => {
            store.Translator.outputText = response.data.text;
            console.log(store.Translator.stuffs);
            output.value = response.data.text;
          });
      });
      break;
  }
}

// router hooks({}) need a switch case statement to tell the program to specify what data should appear on what particular view
// router.hooks({}) :before does all the data collection before the render method is executed
// thats why our APIs usually are called within the function
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Australia";
    switch (view) {
      case "Australia":
        axios
          .get("http://localhost:4040/country/australia")
          .then(response => {
            store.Australia.history = response.data.history;
            store.Australia.government = response.data.government;
            store.Australia.demographics = response.data.demographics;
            store.Australia.economy = response.data.economy;
            store.Australia.culture = response.data.culture;
            store.Australia.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/au")
              .then(response => {
                store.Australia.info = response.data;
                store.Australia.info.Alpha2Code = response.data.alpha2Code;
                store.Australia.info.Alpha3Code = response.data.alpha3Code;
                store.Australia.info.CallingCodes = response.data.callingCodes;
                store.Australia.info.Capital = response.data.capital;
                store.Australia.info.Currency = response.data.currencies;
                store.Australia.info.Native = response.data.nativeName;
                store.Australia.info.Name = response.data.name;
                store.Australia.info.Region = response.data.region;
                store.Australia.info.Timezones = response.data.timezones;
                store.Australia.info.SubRegion = response.data.subRegion;
                store.Australia.info.Population = response.data.population;
                // possibly adf native name to a sub heading of country info screen
                // possibly add population to country selection screen
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=australia&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Australia.headlines = response.data.articles;

                    store.Australia.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Belarus":
        axios
          .get("http://localhost:4040/country/belarus")
          .then(response => {
            store.Belarus.history = response.data.history;
            store.Belarus.government = response.data.government;
            store.Belarus.demographics = response.data.demographics;
            store.Belarus.economy = response.data.economy;
            store.Belarus.culture = response.data.culture;
            store.Belarus.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/by")
              .then(response => {
                store.Belarus.info = response.data;
                store.Belarus.info.Alpha2Code = response.data.alpha2Code;
                store.Belarus.info.Alpha3Code = response.data.alpha3Code;
                store.Belarus.info.CallingCodes = response.data.callingCodes;
                store.Belarus.info.Capital = response.data.capital;
                store.Belarus.info.Currency = response.data.currencies;
                store.Belarus.info.Native = response.data.nativeName;
                store.Belarus.info.Name = response.data.name;
                store.Belarus.info.Region = response.data.region;
                store.Belarus.info.Timezones = response.data.timezones;
                store.Belarus.info.SubRegion = response.data.subRegion;
                store.Belarus.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=belarus&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Belarus.headlines = response.data.articles;

                    store.Belarus.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Greece":
        axios
          .get("http://localhost:4040/country/greece")
          .then(response => {
            store.Greece.history = response.data.history;
            store.Greece.government = response.data.government;
            store.Greece.demographics = response.data.demographics;
            store.Greece.economy = response.data.economy;
            store.Greece.culture = response.data.culture;
            store.Greece.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/gr")
              .then(response => {
                store.Greece.info = response.data;
                store.Greece.info.Alpha2Code = response.data.alpha2Code;
                store.Greece.info.Alpha3Code = response.data.alpha3Code;
                store.Greece.info.CallingCodes = response.data.callingCodes;
                store.Greece.info.Capital = response.data.capital;
                store.Greece.info.Currency = response.data.currencies;
                store.Greece.info.Native = response.data.nativeName;
                store.Greece.info.Name = response.data.name;
                store.Greece.info.Region = response.data.region;
                store.Greece.info.Timezones = response.data.timezones;
                store.Greece.info.SubRegion = response.data.subRegion;
                store.Greece.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=greece&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Greece.headlines = response.data.articles;

                    store.Greece.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Japan":
        axios
          .get("http://localhost:4040/country/japan")
          .then(response => {
            store.Japan.history = response.data.history;
            store.Japan.government = response.data.government;
            store.Japan.demographics = response.data.demographics;
            store.Japan.economy = response.data.economy;
            store.Japan.culture = response.data.culture;
            store.Japan.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/jp")
              .then(response => {
                store.Japan.info = response.data;
                store.Japan.info.Alpha2Code = response.data.alpha2Code;
                store.Japan.info.Alpha3Code = response.data.alpha3Code;
                store.Japan.info.CallingCodes = response.data.callingCodes;
                store.Japan.info.Capital = response.data.capital;
                store.Japan.info.Currency = response.data.currencies;
                store.Japan.info.Native = response.data.nativeName;
                store.Japan.info.Name = response.data.name;
                store.Japan.info.Region = response.data.region;
                store.Japan.info.Timezones = response.data.timezones;
                store.Japan.info.SubRegion = response.data.subRegion;
                store.Japan.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=japan&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Japan.headlines = response.data.articles;

                    store.Japan.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Morocco":
        axios
          .get("http://localhost:4040/country/morocco")
          .then(response => {
            store.Morocco.history = response.data.history;
            store.Morocco.government = response.data.government;
            store.Morocco.demographics = response.data.demographics;
            store.Morocco.economy = response.data.economy;
            store.Morocco.culture = response.data.culture;
            store.Morocco.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/ma")
              .then(response => {
                store.Morocco.info = response.data;
                store.Morocco.info.Alpha2Code = response.data.alpha2Code;
                store.Morocco.info.Alpha3Code = response.data.alpha3Code;
                store.Morocco.info.CallingCodes = response.data.callingCodes;
                store.Morocco.info.Capital = response.data.capital;
                store.Morocco.info.Currency = response.data.currencies;
                store.Morocco.info.Native = response.data.nativeName;
                store.Morocco.info.Name = response.data.name;
                store.Morocco.info.Region = response.data.region;
                store.Morocco.info.Timezones = response.data.timezones;
                store.Morocco.info.SubRegion = response.data.subRegion;
                store.Morocco.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=morocco&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Morocco.headlines = response.data.articles;

                    store.Morocco.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Nepal":
        axios
          .get("http://localhost:4040/country/nepal")
          .then(response => {
            store.Nepal.history = response.data.history;
            store.Nepal.government = response.data.government;
            store.Nepal.demographics = response.data.demographics;
            store.Nepal.economy = response.data.economy;
            store.Nepal.culture = response.data.culture;
            store.Nepal.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/np")
              .then(response => {
                store.Nepal.info = response.data;
                store.Nepal.info.Alpha2Code = response.data.alpha2Code;
                store.Nepal.info.Alpha3Code = response.data.alpha3Code;
                store.Nepal.info.CallingCodes = response.data.callingCodes;
                store.Nepal.info.Capital = response.data.capital;
                store.Nepal.info.Currency = response.data.currencies;
                store.Nepal.info.Native = response.data.nativeName;
                store.Nepal.info.Name = response.data.name;
                store.Nepal.info.Region = response.data.region;
                store.Nepal.info.Timezones = response.data.timezones;
                store.Nepal.info.SubRegion = response.data.subRegion;
                store.Nepal.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=nepal&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Nepal.headlines = response.data.articles;

                    store.Nepal.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Sudan":
        axios
          .get("http://localhost:4040/country/sudan")
          .then(response => {
            store.Sudan.history = response.data.history;
            store.Sudan.government = response.data.government;
            store.Sudan.demographics = response.data.demographics;
            store.Sudan.economy = response.data.economy;
            store.Sudan.culture = response.data.culture;
            store.Sudan.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/sd")
              .then(response => {
                store.Sudan.info = response.data;
                store.Sudan.info.Alpha2Code = response.data.alpha2Code;
                store.Sudan.info.Alpha3Code = response.data.alpha3Code;
                store.Sudan.info.CallingCodes = response.data.callingCodes;
                store.Sudan.info.Capital = response.data.capital;
                store.Sudan.info.Currency = response.data.currencies;
                store.Sudan.info.Native = response.data.nativeName;
                store.Sudan.info.Name = response.data.name;
                store.Sudan.info.Region = response.data.region;
                store.Sudan.info.Timezones = response.data.timezones;
                store.Sudan.info.SubRegion = response.data.subRegion;
                store.Sudan.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=sudan&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Sudan.headlines = response.data.articles;

                    store.Sudan.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Usa":
        axios
          .get("http://localhost:4040/country/usa")
          .then(response => {
            store.Usa.history = response.data.history;
            store.Usa.government = response.data.government;
            store.Usa.demographics = response.data.demographics;
            store.Usa.economy = response.data.economy;
            store.Usa.culture = response.data.culture;
            store.Usa.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/us")
              .then(response => {
                store.Usa.info = response.data;
                store.Usa.info.Alpha2Code = response.data.alpha2Code;
                store.Usa.info.Alpha3Code = response.data.alpha3Code;
                store.Usa.info.CallingCodes = response.data.callingCodes;
                store.Usa.info.Capital = response.data.capital;
                store.Usa.info.Currency = response.data.currencies;
                store.Usa.info.Native = response.data.nativeName;
                store.Usa.info.Name = response.data.name;
                store.Usa.info.Region = response.data.region;
                store.Usa.info.Timezones = response.data.timezones;
                store.Usa.info.SubRegion = response.data.subRegion;
                store.Usa.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=us&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Usa.headlines = response.data.articles;

                    store.Usa.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      case "Venezuela":
        axios
          .get("http://localhost:4040/country/venezuela")
          .then(response => {
            store.Venezuela.history = response.data.history;
            store.Venezuela.government = response.data.government;
            store.Venezuela.demographics = response.data.demographics;
            store.Venezuela.economy = response.data.economy;
            store.Venezuela.culture = response.data.culture;
            store.Venezuela.currentEvents = response.data.currentEvents;
            axios
              .get("https://restcountries.com/v2/alpha/ve")
              .then(response => {
                store.Venezuela.info = response.data;
                store.Venezuela.info.Alpha2Code = response.data.alpha2Code;
                store.Venezuela.info.Alpha3Code = response.data.alpha3Code;
                store.Venezuela.info.CallingCodes = response.data.callingCodes;
                store.Venezuela.info.Capital = response.data.capital;
                store.Venezuela.info.Currency = response.data.currencies;
                store.Venezuela.info.Native = response.data.nativeName;
                store.Venezuela.info.Name = response.data.name;
                store.Venezuela.info.Region = response.data.region;
                store.Venezuela.info.Timezones = response.data.timezones;
                store.Venezuela.info.SubRegion = response.data.subRegion;
                store.Venezuela.info.Population = response.data.population;
                axios
                  .get(
                    `https://newsapi.org/v2/everything?q=venezuela&from=2022-11-22&sortBy=relevancy&pageSize=4&apiKey=${process.env.NEWS_KEY}`
                  )
                  .then(response => {
                    store.Venezuela.headlines = response.data.articles;

                    store.Venezuela.author = response.data.articles;

                    console.log(response.data.articles.author);
                    done();
                  });
              });
          })
          .catch(err => console.log(err));
        break;
      default:
        done();
    }
  }
});

// router hooks runs until thew done() function is executed

router //this renders a specific view
  .on({
    "/": () => render(), //telling me that if the URL has no "/" then render the home page
    ":view": params => {
      //telling me that if any views are inside the URL then capitalize the first letter then render the view
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve(); //similar to "listen" method in expressJS.
// essentially says "ok I want to render the page, but first I need to run any 'router.hooks({}) :before' if there are any
// then I can run the render function"
