const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const WINDOW_SIZE = 10;
const THIRD_PARTY_API_URL = 'https://example.com/api/numbers';
const TIMEOUT = 500;

let numbersWindow = [];

const fetchNumbersFromApi = async (numberId) => {
    try {
        const response = await axios.get(`${THIRD_PARTY_API_URL}/${numberId}`, { timeout: TIMEOUT });
        return response.data.numbers || [];
    } catch (error) {
        return [];
    }
};

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;

    if (!['p', 'f', 'e', 'r'].includes(numberId)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const fetchedNumbers = await fetchNumbersFromApi(numberId);

    const prevState = [...numbersWindow];
    for (const number of fetchedNumbers) {
        if (!numbersWindow.includes(number)) {
            if (numbersWindow.length >= WINDOW_SIZE) {
                numbersWindow.shift();
            }
            numbersWindow.push(number);
        }
    }

    const avg = numbersWindow.length ? (numbersWindow.reduce((sum, num) => sum + num, 0) / numbersWindow.length) : 0;

    const response = {
        windowPrevState: prevState,
        windowCurrState: numbersWindow,
        numbers: fetchedNumbers,
        avg: parseFloat(avg.toFixed(2))
    };

    return res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
