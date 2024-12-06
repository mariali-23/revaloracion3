// 1. Agrandar imagen al pasar el mouse
const productImages = document.querySelectorAll('.product-image');

productImages.forEach(image => {
    image.addEventListener('mouseover', () => {
        image.style.transform = 'scale(1.2)'; // Agranda la imagen
        image.style.transition = 'transform 0.3s'; // Transición suave
    });

    image.addEventListener('mouseout', () => {
        image.style.transform = 'scale(1)'; // Vuelve al tamaño normal
    });
});

// 2. Copiar descripción al hacer clic en el texto
const descriptions = document.querySelectorAll('.description');

descriptions.forEach(description => {
    description.addEventListener('click', () => {
        navigator.clipboard.writeText(description.textContent) // Copiar texto al portapapeles
            .then(() => {
                alert('Descripción copiada: ' + description.textContent);
            })
            .catch(err => {
                console.error('Error al copiar la descripción: ', err);
            });
    });
});

// 3. Ampliar recuadro del producto al hacer clic
const productContainers = document.querySelectorAll('.product');

productContainers.forEach(container => {
    container.addEventListener('click', () => {
        // Alternar clase para agrandar el contenedor
        container.classList.toggle('expanded');

        // Cambiar el estilo para mostrar más detalles
        if (container.classList.contains('expanded')) {
            container.style.zIndex = '10'; // Asegúrate de que esté por encima
        } else {
            container.style.zIndex = '1'; // Restablecer z-index
        }
    });
});
