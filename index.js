const express = require('express');
const app = express();

app.use(express.json());

/**
* @api {GET} /api Get User Details
* @apiName Get User
* @apiGroup User
* @apiBody  {Object}: {
  * USERNAME      {String} [userName] 
  * EMAIL         {String} [email] 
  * PHONE         {String} [phone] 
}
* @apiSuccess (200) {Object} 'DATA' {Object}
*/

app.get('/api', (req, res) => {
  // data: "name-goes-here, email-goes-here, number-goes-here"
  const { data } = req.body,
    // getting the fields: ["name-goes-here", "email-goes-here", "number-goes-here"]
    fields = data.split(','),
    // Storing values in variables
    [username, email, phone] = fields,
    // Checking each field's validity
    usernameValidity = checkInputValidity(username, { isRequired: true }),
    emailValidity = checkInputValidity(email, { isRequired: true, isEmail: true }),
    phoneValidity = checkInputValidity(phone, { isRequired: true, isValidPhoneIndian: true });

  // Sending back a response based on the data value provided & validity of that field.
  res.status(200).json({
    name: {
      valueProvided: username,
      isValid: usernameValidity,
    },
    email: {
      valueProvided: email,
      isValid: emailValidity,
    },
    mobile: {
      valueProvided: phone,
      isValid: phoneValidity,
    },
  });
});

const checkInputValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.isRequired && isValid) {
    isValid = value.trim() !== '';
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isValidPhoneIndian) {
    const pattern = /^[6789]\d{9}$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

app.listen(8000, () => {
  console.log('listening to port 8000');
});
