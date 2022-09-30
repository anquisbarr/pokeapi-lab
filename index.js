const express = require('express');
const app = express();
const port = 3000;

const axios = require('axios');

var URL = 'https://pokeapi.co/api/v2/pokemon/';

 async function sendLoginEmail() {

  const emailData = {
    personalizations: [
      {
        to: [
          {
            email: "cbalbuena@utec.edu.pe",
          },
        ],
        subject: "Group 2, server error, 500",
      },
    ],
    from: {
      email: "sebastian.quispe.b@utec.edu.pe",
    },
    content: [
      {
        type: "text/html",
        value: `<span>hubo un error en el server del grupo 2</span>`,
      },
    ],
  };

  const options = {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3a7915be9dmsh3eb18fc16ff0937p1a074cjsn29a26fb6341b",
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    data: emailData,
  };

  console.log(emailData);

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

}

app.get('/', (req, res) => {});

app.get('/query', (req, res, next) => {
  try {
    let name = req.query.name;
    axios
      .get(`${URL}${name}`)
      .then((apiRes) => {
        res.send(200, {
          response: {
            tipo: apiRes.data.types,
            habilidades: apiRes.data.abilities,
          },
        });
      })
      .error((error) => {
        sendLoginEmail().then(res=>console.log("correo enviado"))
        next(error)
      });
  } catch (error) {
    sendLoginEmail().then(res=>console.log("correo enviado"))
    next(error)
  }
});

app.listen(port, () => {});
