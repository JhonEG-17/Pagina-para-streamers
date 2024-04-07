


//Pertenese a la funcion de login & register



const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup= document.querySelector('.btnLogin-popup');
const iconCloseLogin= document.querySelector('.icon-close-login');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
})

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
})

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
})

iconCloseLogin.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
})

//Pertenece a las funciones de la tienda

// Obtener referencia a los elementos necesarios
const infoCartProduct = document.querySelector('.info-cart-product');
const cartEmptyMessage = document.querySelector('.cart-empty');

// Función para verificar si los elementos dentro de info-cart-product están vacíos
function verificarCarrito() {
    const elementosCarrito = infoCartProduct.querySelectorAll('span');

    // Verificar si al menos un elemento dentro de info-cart-product tiene texto
    const carritoVacio = Array.from(elementosCarrito).every(elemento => elemento.textContent.trim() === '');

    // Mostrar u ocultar el mensaje de carrito vacío según sea necesario
    if (carritoVacio) {
        cartEmptyMessage.classList.remove('hidden'); // Mostrar el mensaje de carrito vacío
    } else {
        cartEmptyMessage.classList.add('hidden'); // Ocultar el mensaje de carrito vacío
    }
}

// Llamar a la función verificarCarrito al cargar la página
window.addEventListener('load', verificarCarrito);

document.addEventListener("DOMContentLoaded", function() {


    //corresponde al menu desplegable par aversiones moviles

    // Seleccionar el botón y el menú
    var btnMenuPopup = document.querySelector('.btnMenu-popup');
    var menu = document.querySelector('.menu');
    var iconCloseMenu = document.querySelector('.icon-close-menu');

    // Agregar evento de clic al botón
    btnMenuPopup.addEventListener('click', function() {
        // Mostrar el menú
        menu.classList.add('show-menu');
    });

    // Agregar evento de clic al ícono de cerrar menú
    iconCloseMenu.addEventListener('click', function() {
        // Ocultar el menú
        menu.classList.remove('show-menu');
    });



    // corresponde a las funciones de la tienda de ropa
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

    // Lista de todos los contenedores de productos
    const productsList = document.querySelector('.container-items');

    // Variable de arreglo de productos
    let allProducts = [];

    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const rowProduct = document.querySelector('.row-product');

    productsList.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart')) {
            const product = e.target.parentElement;

            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h2').textContent,
                price: product.querySelector('.price').textContent,
            };

            const exits = allProducts.some(
                product => product.title === infoProduct.title
            );

            if (exits) {
                const products = allProducts.map(product => {
                    if (product.title === infoProduct.title) {
                        product.quantity++;
                        return product;
                    } else {
                        return product;
                    }
                });
                allProducts = [...products];
            } else {
                allProducts = [...allProducts, infoProduct];
            }

            showHTML();
        }
    });

    rowProduct.addEventListener('click', e => {
        if (e.target.classList.contains('icon-delete')) {
            const product = e.target.parentElement;
            const title = product.querySelector('.titulo-producto-carrito').textContent;

            allProducts = allProducts.filter(
                product => product.title !== title
            );

            showHTML();
        }
    });

    // Función para mostrar HTML
    // define una función llamada showHTML, que se encarga de mostrar los elementos HTML relacionados con los productos en el carrito.
    const showHTML = () => {
        
        //Aquí se realiza una verificación para determinar si el arreglo allProducts está vacío. Si está vacío, se muestra el mensaje "El carrito está vacío" y se oculta la sección que muestra los productos. Si el arreglo contiene elementos, se oculta el mensaje y se muestra la sección de productos.
        if (allProducts.length === 0) {

            cartEmpty.classList.remove('hidden');
            rowProduct.classList.add('hidden');
        } else {
            
            cartEmpty.classList.add('hidden');
            rowProduct.classList.remove('hidden');
        }

        // Limpiar HTML
        //Este código borra el contenido anterior dentro del contenedor de productos del carrito para evitar duplicados al volver a agregar productos.
        rowProduct.innerHTML = '';
        
        //Estas variables se utilizan para calcular el total del precio de todos los productos en el carrito y la cantidad total de productos en el carrito, respectivamente.
        let total = 0;
        let totalOfProducts = 0;

        //Este es un bucle forEach que recorre todos los productos en el arreglo allProducts.
        allProducts.forEach(product => {

            //Aquí se crea un nuevo elemento div para cada producto en el carrito y se le asigna la clase cart-product.
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            // Se omite el contenido del contenedor del producto para mantener la brevedad.
            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-delete"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            `;

            //agrega el contenedor del producto recién creado al contenedor principal de productos del carrito.
            rowProduct.append(containerProduct);

            //Aquí se actualizan las variables total y totalOfProducts sumando el precio total de cada producto y la cantidad total de productos, respectivamente.
            total += parseInt(product.quantity * product.price.slice(1));
            totalOfProducts += product.quantity;
        });

        //se actualiza el texto que muestra el total del precio de todos los productos y la cantidad total de productos en el carrito.
        valorTotal.innerText = `$${total}`;
        countProducts.innerText = totalOfProducts;
    };
});




