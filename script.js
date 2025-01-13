async function buscarCotacao() {
    try {
        const btnAtualizar = document.querySelector('.atualizar-btn');
        btnAtualizar.disabled = true;
        btnAtualizar.textContent = 'Atualizando...';

        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const data = await response.json();
        const cotacao = data.USDBRL;

        // Atualiza os elementos na página
        document.getElementById('valorCompra').textContent = parseFloat(cotacao.bid).toFixed(2);
        document.getElementById('valorVenda').textContent = parseFloat(cotacao.ask).toFixed(2);
        
        const variacaoElement = document.getElementById('variacao');
        const variacao = parseFloat(cotacao.pctChange);
        variacaoElement.textContent = variacao.toFixed(2);
        
        // Adiciona classes para colorir a variação
        variacaoElement.className = variacao >= 0 ? 'positivo' : 'negativo';

        document.getElementById('maxima').textContent = parseFloat(cotacao.high).toFixed(2);
        document.getElementById('minima').textContent = parseFloat(cotacao.low).toFixed(2);

        // Formata a data de atualização
        const dataAtualizacao = new Date(cotacao.create_date);
        const dataFormatada = dataAtualizacao.toLocaleString('pt-BR');
        document.getElementById('atualizacao').textContent = dataFormatada;

        // Adiciona animação de fade
        const resultado = document.getElementById('resultado');
        resultado.style.animation = 'none';
        resultado.offsetHeight; // Força um reflow
        resultado.style.animation = 'fadeIn 0.5s ease-out';

    } catch (error) {
        console.error('Erro ao buscar cotação:', error);
        alert('Erro ao buscar a cotação. Tente novamente mais tarde.');
    } finally {
        const btnAtualizar = document.querySelector('.atualizar-btn');
        btnAtualizar.disabled = false;
        btnAtualizar.textContent = 'Atualizar Cotação';
    }
}

// Busca a cotação assim que a página carrega
buscarCotacao(); 