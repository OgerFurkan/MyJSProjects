class Currency {
    async exchange(firstAmount, firstCurrency, secondCurrency) {
        const url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_NmCxkSxAYpiY8eUTfkZ07PwXoKv2vYxFxWVtBSlS&base_currency=" + firstCurrency;
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.data[secondCurrency];
        const result = Number(firstAmount) * rate;
        return result;
    }
}


