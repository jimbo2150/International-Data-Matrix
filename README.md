![TIDM Logo](./client/assets//Branding/logo-no-background.png)

### The Tech Stack -
- [TypeScript](https://www.typescriptlang.org/)
- [JavaScript](https://www.javascript.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [NodeJS](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)
<i>The following npm packages</i>
  - [dotenv](https://github.com/motdotla/dotenv)
  - [nodemon](https://www.npmjs.com/package/nodemon)
  - [Express](https://expressjs.com/)
  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [deepl node](https://www.npmjs.com/package/deepl-node)

- Frontend hosted on [Vercel](https://www.vercel.com/)
- Backend hosted on [Render](https://www.render.com/)

## [The Home Page](https://international-data-matrix.vercel.app/) -
 ###### "Simplistic Design"
 <br>
 - The "View Countries" Button

Located beneath the welcome prompt in the center of the site

 - Nav menu

Located top right of the header


 - Footer Icons
    - [Home](https://international-data-matrix.vercel.app/)
    - [Documentation](https://github.com/SchoolyB/International-Data-Matrix#readme)
    - [Translator](https://international-data-matrix.vercel.app/Translator)
    - [Contact](https://international-data-matrix.vercel.app/Contact)

### The Search Bar
[Header.tsx](https://github.com/SchoolyB/International-Data-Matrix/blob/master/client/src/components/Header.tsx)
```JSX
<form id="countryFilterForm" className="searchForm ">
  <input
    placeholder="Search Countries"
    id="countryFilter"
    name="countryFilter"
    type="text"
    required
    value={search.value}
    onChange={(event) => {
      search.value = event.target.value
    }}
  ></input>
</form>
```

## The View Countries Button -
Will take the user to the [country selection](https://international-data-matrix.vercel.app/Countries) page.

## [Country Selection Page](https://international-data-matrix.vercel.app/Countries) -
Shows a full list of countries currently supported in the application. Shows a country's name and it's flag.

### A Country Page -
Every country that is currently supported in the International Data Matrix has its own "Country Page". The all country pages are generated generated through the [id.tsx](https://github.com/SchoolyB/International-Data-Matrix/blob/master/client/src/pages/Country/%5Bid%5D.tsx) file.


[id.tsx](https://github.com/SchoolyB/International-Data-Matrix/blob/master/client/src/pages/Country/%5Bid%5D.tsx)

```JSX
<div className="overallCountryInfoContainer">
  <div className="countryInfo">
    <h1 id="countryEnglishName">{state.name}</h1>
    <h3 id="countryNativeName">a.k.a {state.nativeName}</h3>
  </div>

    <section className="topic" id="culture">
      <h3>Culture</h3>
      <p>{culture}</p>
    </section>

    <section className="topic" id="religion">
      <h3>Religion</h3>
      <p>{religion}</p>
    </section>

    <section className="topic" id="government">
      <h3>Government</h3>
      <p>{government}</p>
    </section>
  </div>

  <div className="metaDataContainer">
    <img id="countryInfoFlag" src={CurrentCountryFlag} alt={bar} />
    <p className="genInfoRegion">
      <u>{state.name}</u> is located in the
      <u>{state.subregion}</u> subregion of the <u>{state.region}</u>
      <br />
      <p className="genInfoPopulation">
        The Population of <u>{state.name}</u> is is approx.
        <u>{state.population}</u>
      </p>
    </p>
    <p className="genInfoISOCodes ">
      <u>{state.name}'s</u> 2 Digit Alpha code is:
      <u>{state.alpha2Code}</u> and it's 3 Digit Alpha code is:
      <u>{state.alpha3Code}</u>
    </p>

    {/*This comes from the countryWeather component from '../../components/CountryWeather.tsx' */}
    <CountryWeather capital={state.capital} name={state.name} />
    <p className="genInfoCurrency">
      The National Currency of {state.name} Is: <br />
      The <u>{state.name}</u> Represented As:
    </p>
    {/* End of countryWeather component */}

    <p className="genInfoTimezones">
      Timezones: <u>{state.timezones}</u>
    </p>
  </div>
</div>
```

## [The Translator](https://international-data-matrix.vercel.app/Translator) -
Built using the [DeepL](https://www.deepl.com/translator) translator API.  ***NOTE THAT CURRENTLY THE ONLY SUPPORTED INPUT LANGUAGE IS ENGLISH***

[translateRoute.js](https://github.com/SchoolyB/International-Data-Matrix/blob/master/server/src/routes/translateRoute.js)
```JavaScript
const deepl = require("deepl-node");
app.post("/translator", (request, response) => {
  const translator = new deepl.Translator(process.env.TRANSLATION_KEY);

  const sourceText = request.body.sourceText;
  const outputLanguage = request.body.outputLanguage; //the language we want the output to be

  translator
    .translateText(sourceText, null, outputLanguage)
    .then((result) => {
      const responseBody = {
        //if a key in an obj doesn't have a colon and a value JS auto assumes that the value is itself
        // same as writing sourceText: sourceText
        text: result.text, //this
      };
      response.json(responseBody);
    })
    .catch((error) => {
      console.error(error);
    });
});
```

[App.js](https://github.com/SchoolyB/International-Data-Matrix/blob/master/server/src/app.js)

```JavaScript
const deepl = require("deepl-node");

app.post("/translator", (request, response) => {
  const translator = new deepl.Translator(process.env.TRANSLATION_KEY);

  const sourceText = request.body.sourceText;
  const outputLanguage = request.body.outputLanguage;
  translator
    .translateText(sourceText, null, outputLanguage)
    .then(result => {
      console.log(result.text);

      const responseBody = {
        text: result.text
      };

      response.json(responseBody);
    })
    .catch(error => {
      console.error(error);
    });
});
```

## [The Contact Page](https://international-data-matrix.vercel.app/Contact) -
This simple contact page allows users to submit their feedback that will then be sent to The IDM's email. The form uses a POST method and a [Formspree](https://formspree.io/) url as the action to send the data on submit. Feel free to give it a try :)

```HTML
 <form action="https://formspree.io/f/mknelldn" method="POST">
      <label  class="contactLabel"id="contactName">
        <input class="contactInput" type="text" name = "name" placeholder="Enter your name"></input>
      </label>
```

