var from = document.querySelector('#from');
var to = document.querySelector('#to');
var input = document.querySelector('#input');
var output = document.querySelector('#output');

var names = ['AED', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'BBD', 'BDT', 'BGN', 'BHD', 'BRL', 'BSD', 'BWP', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CZK', 'DKK', 'DOP', 'EGP', 'ETB', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'EUR', 'FJD', 'GBP', 'GHS', 'GTQ', 'HKD', 'HNL', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KHR', 'KRW', 'KWD', 'KZT', 'LAK', 'LBP', 'LKR', 'MAD', 'MKD', 'MMK', 'MUR', 'MXN', 'MYR', 'NAD', 'NGN', 'NOK', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'SAR', 'SCR', 'SEK', 'SGD', 'THB', 'TJS', 'TND', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'XAF', 'XAF', 'XAF', 'XAF', 'XAF', 'XAF', 'XCD', 'XOF', 'XOF', 'XOF', 'XOF', 'XOF', 'XOF', 'XOF', 'XOF', 'XPF', 'ZAR', 'ZMW'];
names = new Set(names);
names.forEach((name) => {
    let option = new Option();
    option.value = option.text = name;
    from.appendChild(option);
    to.appendChild(option.cloneNode(true));
});

function updateData() {
    fetch('https://v3.exchangerate-api.com/bulk/c4de3045c5f09f931c7592e4/USD').then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.result === 'success') {
            fx.base = data.from;
            fx.rates = data.rates;
            localStorage.setItem('data', JSON.stringify(data));
        }
    });
}

function retrieveData() {
    var data = localStorage.getItem('data');
    if (data) {
        data = JSON.parse(data);
        fx.base = data.from;
        fx.rates = data.rates;
    } else {
        updateData();
    }
}
retrieveData();

from.onchange = to.onchange = input.onchange = () => {
    output.textContent = fx.convert(Number(input.value), {
        from: from.value,
        to: to.value
    });
}
input.onchange();