// src/AfriPayForm.js
import React, { useState } from 'react';

const AfriPayForm = () => {
  const [formData, setFormData] = useState({
    amount: '200',
    currency: 'RWF',
    comment: 'Order 12',
    client_token: '',
    return_url: '',
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    email: '',
    phone: '',
    app_id: '8162cd37bac0ad629d709bc23d31c25f',
    app_secret: 'JDJ5JDEwJFNqMnBz',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById('afripayform').submit();
  };

  return (
    <form
      action="https://afripay.africa/checkout/index.php"
      method="post"
      id="afripayform"
      onSubmit={handleSubmit}
    >
      {Object.keys(formData).map((key) => (
        <input key={key} type="hidden" name={key} value={formData[key]} />
      ))}
      <p>
        <input
          type="image"
          src="https://afripay.africa/logos/pay_with_afripay.png"
          alt="Pay with AfriPay"
        />
      </p>
    </form>
  );
};

export default AfriPayForm;

