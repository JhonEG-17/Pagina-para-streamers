document.addEventListener("DOMContentLoaded", function() {
    const iconCart = document.querySelector('.icon-cart');
    const cartProducts = document.querySelector('.container-cart-products');

    // Agregar evento de clic al icono del carrito
    iconCart.addEventListener('click', function() {
        // Alternar la clase 'open' para mostrar u ocultar el carrito
        cartProducts.classList.toggle('open');
    });

    // Agregar evento de clic al botón de cerrar en el carrito
    const iconClose = document.querySelector('.icon-close');
    iconClose.addEventListener('click', function() {
        // Ocultar el carrito al hacer clic en el botón de cerrar
        cartProducts.classList.remove('open');
    });
});