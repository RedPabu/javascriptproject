document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convertButton");
    const resultDiv = document.getElementById("result");

    // Function to fetch currency exchange rates and populate dropdowns
    async function fetchAndPopulateCurrencies() {
        try {
            
            const url = `https://api.exchangeratesapi.io/v1/latest?access_key=8a80a3f376cde5edede89424e3ef9e29`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch exchange rates.");
            }
            const data = await response.json();

            
            const currencies = Object.keys(data.rates);

            
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                fromCurrencySelect.appendChild(option);
            });

            // Populate the "To Currency" dropdown
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                toCurrencySelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            resultDiv.textContent = "Unable to fetch exchange rates. Please try again later.";
        }
    }

    // Function to convert currency based on user input
    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
    
        if (isNaN(amount)) {
            resultDiv.textContent = "Please enter a valid amount.";
            return;
        }

        try {
            
            const url = `https://api.exchangeratesapi.io/v1/latest?access_key=8a80a3f376cde5edede89424e3ef9e29`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch exchange rates.");
            }
            const exchangeRates = await response.json();

            if (fromCurrency === toCurrency) {
                resultDiv.textContent = "Please select different currencies.";
            } else if (!exchangeRates.rates[fromCurrency] || !exchangeRates.rates[toCurrency]) {
                resultDiv.textContent = "Invalid currency selection. Please try again.";
            } else {
                const exchangeRate = exchangeRates.rates[toCurrency] / exchangeRates.rates[fromCurrency];
                const convertedAmount = (amount * exchangeRate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            }
        } catch (error) {
            console.error(error);
            resultDiv.textContent = "Unable to fetch exchange rates. Please try again later.";
        }
    }

    // Add click event listener to the convert button
    convertButton.addEventListener("click", convertCurrency);

    // Populate currency dropdowns
    fetchAndPopulateCurrencies();
});
