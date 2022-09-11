const rates = {
    USD: 1.00,
    GBP: 0.85,
    NGN: 422.20,
    EUR: 1.00
}

const symbols = ['$', '£', '₦', '€'];

 const currencyConverter = {
    availableCurrencies: Object.keys(rates).map((label, i) => ({
            label,
            symbol: symbols[i]
        })),

    convertFromUSD(amount, targetCurrency) {
        return Number((rates[targetCurrency] * amount).toFixed(2));
    }
}

module.exports = currencyConverter
