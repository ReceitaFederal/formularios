export class Cotacao {
    static cotacoesCache = {};

    static async DOLAR_DIA_ANTERIOR() {
        // Defina as datas de início e fim como a data de ontem
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 1);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);

        // Formate as datas no formato YYYYMMDD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}${month}${day}`;
        };

        const startDateString = formatDate(startDate);
        const endDateString = formatDate(endDate);
        const periodKey = `${startDateString}-${endDateString}`;

        // Verifica se o período já está em cache
        if (Cotacao.cotacoesCache[periodKey]) {
            return Cotacao.cotacoesCache[periodKey];
        }

        const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/?start_date=${startDateString}&end_date=${endDateString}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const cotacao = data[0];
            // Calcula a média entre bid e ask
            const media = (parseFloat(cotacao.bid) + parseFloat(cotacao.ask)) / 2;
            // Armazena o resultado no cache
            Cotacao.cotacoesCache[periodKey] = media;
            return media;
        } catch (error) {
            console.error('Erro ao buscar a cotação do dólar:', error);
        }
    }
}