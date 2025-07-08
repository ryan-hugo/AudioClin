// Este script auxiliar pode ser usado para converter a logo webp em favicon.ico
// Para usar, abra o console do navegador e execute este script

// Função para converter o logo.webp em um favicon.ico
function createFavicon() {
    // Cria um elemento de imagem para carregar o logo.webp
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        // Cria um canvas para desenhar a imagem
        const canvas = document.createElement('canvas');
        canvas.width = 32;  // Tamanho padrão para favicon
        canvas.height = 32;
        
        // Desenha a imagem no canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 32, 32);
        
        // Converte para formato de imagem
        const dataURL = canvas.toDataURL('image/png');
        
        // Cria um link para download
        const link = document.createElement('a');
        link.download = 'favicon.ico';
        link.href = dataURL;
        link.textContent = 'Download Favicon';
        
        // Adiciona o link à página
        document.body.appendChild(link);
        
        console.log('Clique no link que apareceu na página para baixar o favicon');
    };
    
    // Carrega a imagem
    img.src = 'logo.webp';
}

// Executa a função
createFavicon();
