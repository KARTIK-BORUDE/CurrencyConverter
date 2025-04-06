document.addEventListener('DOMContentLoaded', () => {
    const amount = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const result = document.getElementById('result');
    const convertBtn = document.getElementById('convert');
    const swapBtn = document.getElementById('swap');

    // Function to fetch exchange rates
    async function getExchangeRate(from, to) {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            const data = await response.json();
            return data.rates[to];
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            return null;
        }
    }

    // Function to perform conversion
    async function convert() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const value = parseFloat(amount.value);

        if (isNaN(value)) {
            result.value = 'Please enter a valid number';
            return;
        }

        const rate = await getExchangeRate(from, to);
        if (rate) {
            const convertedValue = (value * rate).toFixed(2);
            result.value = convertedValue;
        } else {
            result.value = 'Error fetching exchange rate';
        }
    }

    // Swap currencies
    function swapCurrencies() {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        convert();
    }

    // Event listeners
    convertBtn.addEventListener('click', convert);
    swapBtn.addEventListener('click', swapCurrencies);
    amount.addEventListener('input', convert);
    fromCurrency.addEventListener('change', convert);
    toCurrency.addEventListener('change', convert);

    // Initial conversion
    convert();
}); 