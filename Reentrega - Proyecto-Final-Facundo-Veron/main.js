class Producto {
    constructor(id,nombre,precio,img){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.img=img;
        this.cantidad=1;
    }
}

const MarDelPlata = new Producto(1,"Mar del Plata",20000,"img/mdp_cuadrada.png");
const PeritoMoreno = new Producto(2,"Glaciar Perito Moreno",30000,"img/glaciar_cuadrada.png");
const Jujuy = new Producto(3,"Jujuy",35000,"img/jujuy_cuadrada.png");
const Dubai = new Producto(4,"Dubai",20000,"img/dubai_cuadrada.png");
const Bahamas = new Producto(5,"Bahamas",20000,"img/bahamas_cuadrada.png");
const Maldivias = new Producto(6,"Maldivia",20000,"img/maldivas_cuadrada.png");

// Creo un array

const productos = [MarDelPlata,PeritoMoreno,Jujuy,Dubai,Bahamas,Maldivias];

//Creo el array del carrito

let carrito = [];

//Cargar carro desde el locaStorage

if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//modifico el DOM para que se vean los productos

const contenedorProductos = document.getElementById("contenedorProductos");

// funcion para crear productos

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-x1-3","col-md-6","col-xs-12");
        card.innerHTML = `
                        <div class="card">
                                <img src="${producto.img}">
                                        <div class ="card-body">
                                            <h5>${producto.nombre}</h5>
                                                <p>${producto.precio}</p>
                                                <button  class="btn btn-danger m-5"id="boton${producto.id}">Agregar al carro</button>
                                        </div>
                        </div>`
        contenedorProductos.appendChild(card);
        //Agrego viajes al carro
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click",() => {
            console.log("Agregaste un viaje a tu carrito")
            agregarAlCarro(producto.id);
        })
 
    });
}

mostrarProductos();

const agregarAlCarro = (id) => {
    const productoCarrito = carrito.find(producto => producto.id === id);
    if(productoCarrito){
        productoCarrito.cantidad++;
    }else{
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
       
    }
     //Agregamos desde el localStorage
     localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

//funcion para ver el carro

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
} )

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML= "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-x1-3","col-md-6","col-xs-12");
        card.innerHTML = `
                        <div class="card">
                                <img src="${producto.img}">
                                        <div class ="card-body">
                                            <h5>${producto.nombre}</h5>
                                                <p>${producto.precio}</p>
                                                <p>${producto.cantidad}</p>
                                                <button class="btn btn-danger m-5" id="eliminar${producto.id}">Eliminar Producto</button>
                                        </div>
                        </div>`
        contenedorProductos.appendChild(card);


        const boton = document.getElementById(`eliminar${producto.id}`)
        boton.addEventListener("click",() => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

    //funcion para eliminar del carrito

   const eliminarDelCarrito = (id) => {
    const producto =  carrito.find (producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();
    //quitamos y guardamos en el localStorage
    localStorage.setItem("carrito",JSON.stringify(carrito));
   }

   //funcion para vaciar el carro
   
   const vaciarCarrito = document.getElementById("vaciarCarrito");

   vaciarCarrito.addEventListener("click", () =>{
    eliminaTodoCarro();
   })

   const eliminaTodoCarro = () => {
    carrito = []
    mostrarCarrito();
    //quitamos todo del localStorage al vaciar el carro
    localStorage.clear();
};

// mostramos total de la  compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

//mostramos alert que le dice al usuario que su compra a sido realizada

const botones = document.getElementById("comprar");
botones.addEventListener("click",() => {
    Swal.fire({
        title:"Usted a adquirido el carrito de compras",
        confirmButtonText:"Aceptar",
        background:"skyblue"
    });
})

//Mostramos la cotizacion del Dolar que se actualiza cada 4 segudos y modificamos el HTML

const criptoYa = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("divDolar");

setInterval(()=>{
    fetch(criptoYa)
        .then(response => response.json())
        .then(({blue,ccb,ccl,mep,oficial,solidario}) => {
            divDolar.innerHTML = `
                <h2>Tipo de Dolar: </h2>
                <p>Dolar Oficial: ${oficial}</p>
                <p>Dolar Solidario: ${solidario}</p>
                <p>Dolar Mep: ${mep}</p>
                <p>Dolar CCL: ${ccl}</p>
                <p>Dolar CCB: ${ccb}</p>
                <p>Dolar Blue: ${blue}</p>
            `
        })
        .catch (error => console.error(error))
},4000); 