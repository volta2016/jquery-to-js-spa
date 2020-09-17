// console.log('hola mundo');
const noCambia = 'kuroro';
let cambia = '@kurorolucifer';

function cambiarNombre (nuevoNombre) {
    cambia = nuevoNombre;
}
cambiarNombre('link');

console.log(cambia);


//se declara de esta forma una promesa, esta promesa la podemos guardar dentro de una ::const::
//el argumento que va recibir un promesa es una funcion, y esa funcion que va como parametro
//de la promesa, va recibir a su vez 2 parametros: que son 2 f() que vamos a lanzar en  algún
//momento de esta promesa para saber si todo esta ok o todo esta mal.

//:::claramente ejecutar todo bien o todo mal en algun momemnto de mi funcion deberia depender de
//alguna condicional de algo que ocurra si mi request a mi API mi llamado a internet, mi llamado a la traida 
//de usuarios, se resuelve de una manera correcta - ese mommento voy invocar a la funcion todoBien()
//ahora puedo llamar a getUser abajito 

// const getUserAll = new Promise (function(todoBien, todoMal){
//     //podemos llamar a un Api esto demora n tiempo no lo sabemos o si no podeos forzar
//     //este proceso con un delay de tiempo
//     //va recibir 2 parametros 
//     setTimeout(function(){
//         //luego de 3 segundo va ejecutar lo de acá
//         todoMal('se acabó el tiempo 5');//acá puedes pasar mas parametros con ,
//     }, 5000) 
// })
// const getUser = new Promise (function(todoBien, todoMal){
//     //podemos llamar a un Api esto demora n tiempo no lo sabemos o si no podeos forzar
//     //este proceso con un delay de tiempo
//     //va recibir 2 parametros 
//     setTimeout(function(){
//         //luego de 3 segundo va ejecutar lo de acá
//         todoMal('se acabó el tiempo 3');//acá puedes pasar mas parametros con ,
//     }, 3000) 
// })

//COMO SE QUE EJECUTAR SI TODO ESTA BIEN DENTRO MI APP?
//then - todo se resuelve
//catch - si ocurre un error en mi promesa
//bueno que ocurrre cuando todo esta bien en mi promesa pues recibe una funcion 

// getUser
//  .then(function() {
//      console.log('todo esta bien!');
//  })
//  .catch(function(message) {
//      console.log(message);
//  })

 //bien ya sabemos como funciona una promesa una promesa de agrega con new Promise - esta recibe una función 
 //que a su vez recibe 2 parametros todoBien, todoMal que se va ejecutar en algun momemento dependiendo si mi promesa
 //funciona o no y aca hemos simulado que se llame todo mal dentro de los 3 segundos que mas podemos hacer con las promesas

 //que pasa si Promise envia muchas promesas muchas peticiones
 //creamos una Promise.all[] que recibe un array
 
//  Promise.all([
//     getUser,
//     getUserAll,
//  ])
//  .then(function(message) {
//   console.log(message);
//  })
//  .catch(function(message) {
//   console.log(message);
//  })


//::Promise.race quiere decir que va entrar al .then de la promesa que se resuelva primero 
//::es una carrera de promesa 
//  Promise.race([
//     getUser,
//     getUserAll,
//  ])
//  .then(function(message) {
//   console.log(message);
//  })
//  .catch(function(message) {
//   console.log(message)
//  })

//con ajax en jquery request al servidor.
//esto es jquery con una funcion ajax
//despues de api/puedo agregar 
// $.ajax('https://pokeapi.co/api/v2/', {
//   method: 'GET',//es para trear datos
//   success: function(data) {
//     console.log(data)
//   },
//   error: function(error) {
//       console.log(error)
//   }
// })
//lo que realmente es un XMLHttpRequest  que es una cosa  muy bonita para pedir datos a un servicio externo
//pero en es6 tenemos una manera de hacer esto mejor 

//para tear datos 
//Este metodo de fetch lo que va hacer es devolvieron una promesa
//datos de respuesta response

// fetch('https://randomuser.me/api/')
//     .then(function(response){
//         // console.log(response)
//         return response.json()
//     })
//     .then(function(user) {
//         console.log('user', user.results[0].name.first)
//     })
//     .catch(function(){
//         console.log('algo falló')
//     })
//recuerda que en esto caso tu puedes pintar al user o simplemente poner que algo fallo

// fetch('https://pokeapi.co/api/v2/pokemon-form/132' )
//     .then(function(response){
//         // console.log(response)
//         return response.json()
//     })
//     .then(function(type) {
//         console.log('type', name )
//     })
//     .catch(function(){
//         console.log('algo falló')
//     });


// fetch('https://randomuser.me/api/')
//     .then( response =>  response.json() )
//     .then( user => console.log('user', user.results[0].name.first) ) // datos en formato JSON
//     .catch( () => console.log('algo fallo') )


(async function suggestionsMovie() {
    async function getMovieNew(url) {
        const response = await fetch(url);
        const data = await response.json();
        console.log(response);//
        return data;
    }

    const  {
        data: { movies: suggestions}
    } = await getMovieNew('https://yts.mx/api/v2/list_movies.json?sort=seeds&limit=15');
    
    console.log('suggestions', suggestions)
    function suggestionItemTemplate(movie) {
        //ojo que esto es puro texto debemos pasarlo a element html
        return (
            `<ul class="playlistFriends" id="movieSugestion">
                <li class="playlistFriends-item">
                <a href="#">
                    <img src="${movie.medium_cover_image}" alt="${movie.title}" />
                    <span>
                    ${movie.title}
                    </span>
                </a>
                </li>
            </ul>`
        )
    }

    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }
    const containerSuggestions = document.getElementById('movieSugestion');
    suggestions.forEach((movie) => {
        const HTMLSting = suggestionItemTemplate(movie);
        const suggestionsElement  = createTemplate(HTMLSting);
        containerSuggestions.append(suggestionsElement);

    });

})();



// los parentesis envuelven la funcion asincronoa y hacen que esta se autoejecute(funcion contenedora)
(async function loadUser() {
    //programa donde retorno a mi usuario
    async function getUser(url){
        const response = await fetch(url);
        //la peticion realiza su respuesta tiene un metodo.json()
        const data = await response.json();
        if (data.info.count > 0) {
            return data;
        } else {
            throw new Error ('No se ha encotrado datos')
        }

    }
    //guardamos la URL de la API donde vamos a buscar los datos
    const friendsAPI = 'https://rickandmortyapi.com/api/';
    //guardamos en variable los contenedores de contactos
    const $myPlayList = document.getElementById('myPlaylist');
    const $playListFriends = document.getElementById('playlistFriends');

    //creo mi template para el playlistFriends-item
    function friendItemTemplate(friend) {
        // const nameComplete = `${user.name.first}${user.name.last}`
        //ojo que esto es puro texto debemos pasarlo a element html
        return (
            `<li class="playlistFriends-item">
                <a href="#">
                <img src="https://rickandmortyapi.com/api/character/avatar/${friend.id}.jpeg" alt="${friend.species}"/>
                <span>
                    ${friend.name}
                </span>
                </a>
            </li>`
        )
    }

    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }
   //funcion para insertar el arrayFriends en la seccion de contactos
    function renderFriendList(list, template, $friendsContainer) {
        list.forEach((user) => {
            //generamos el template html
            const HTMLSting = template(user);
            //convertimos a HTML el string
            const userFriend = createTemplate(HTMLSting);
            $friendsContainer.append(userFriend);
        })
    }
    //Traemos la lista de amigos desde la API
    const friendData = await getUser(`${friendsAPI}character/`);
    console.log(friendData);
    //guardamos los datos
    const arrayFriends = []
    friendData.results.forEach(character => {
        arrayFriends.push(character);
    });

    //insertamos los datos del array en el HTML
    renderFriendList(arrayFriends,  friendItemTemplate, $playListFriends);
})();

(async function load() {
    //await
    //action
    //terror
    //animation
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data.movie_count > 0) {
            //aqui se acaba pero si esto no ocurre
            return data;
        }
        //si no hay pelis aqui continua
       throw new Error('no se encontró ningún resultado');
    }
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    const $featuringContainer = document.getElementById('featuring');
    function setAttributes($element, attributes) {
        for (attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute]);
            //preguntamos primero el nombre del atributo y luego me traer el valor de src 
        }
    }

    
    function featuringTemplate (peli) {
        return (
            `
            <div class="featuring">
                <div class="featuring-image">
                    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
                </div>
                <div class="featuring-content">
                    <p class="featuring-title">Pelicula encontrada</p>
                    <p class="featuring-album">${peli.title}</p>
                </div>
            </div>`
        )
    }
    const BASE_API = 'https://yts.mx/api/v2/';

    $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        $home.classList.toggle('search-active');
        $featuringContainer.classList.toggle('hide');
        // $featuringContainer.style.display = "grid";
        const $loader = document.createElement('img');
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width: 50,
          })
        $featuringContainer.append($loader);
        const data = new FormData($form);
        try {
            const {
                data: {
                    movies: pelis
                }
            } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
            const HTMLSting = featuringTemplate(pelis[0]);
            $featuringContainer.innerHTML = HTMLSting;

        } catch(error) {
            alert(error.message);
            $loader.remove();
            $home.classList.remove('search-active');
            $featuringContainer.classList.remove('hide');
        }
    })
        
    
    
    function videoItemTemplate(movie, category) {
        return (
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
            <div class="primaryPlaylistItem-image">
            
                <img src="${movie.medium_cover_image}" alt="${movie.title}">
            </div>
            <h4 class="primaryPlaylistItem-title">
                ${movie.title}
            </h4>
        </div>`
        )
    }
    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0]
    }
    function addEventClick($element) {
        $element.addEventListener('click', () => {
            // alert('click');
             showModal($element)
        })
    }
    
    function renderMovieList(list, $container, category) {
        //actionList.data.movies. Logic para entrar
        $container.children[0].remove();
        list.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie, category);
            const movieElement = createTemplate(HTMLString);
            $container.append(movieElement);
            const image = movieElement.querySelector('img');
            image.addEventListener('load', (event) => {
                event.srcElement.classList.add('fadeIn');
            })
            addEventClick(movieElement);
        })
    }
    async function cacheExist (category) {
        const listName = `${category}List`
        const cacheList = localStorage.getItem(listName)
        if(cacheList) {
          return JSON.parse(cacheList)
        }
        const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
        localStorage.setItem(listName, JSON.stringify(data))
        return data
    }
     
    
    const actionList = await cacheExist('action');
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList, $actionContainer, 'action'); 
    
    const dramaList = await cacheExist('drama');
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList, $dramaContainer, 'drama');
    const  animationList = await cacheExist('animation'); 
    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList, $animationContainer, 'animation');
    
    
    
    
    //selectores que tienen que ver con el modal
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');
    function finById(list, id) {
        return list.find(movie =>  movie.id === parseInt(id, 10));
    }
    function findMovie(id, category) {
        switch (category) {
            case 'action' : {
                return finById(actionList, id)
            }
            case 'drama' : {
                return finById(dramaList, id)
            }
            default: {
                return finById(animationList, id)
            }
        }
        
    }
    function showModal($element) {
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards';
        const id = $element.dataset.id;
        const category = $element.dataset.category
        const data = findMovie(id, category); 
        debugger
        $modalTitle.textContent = data.title;
        $modalImage.setAttribute('src', data.medium_cover_image); 
        $modalDescription.textContent = data.description_full;
    }
    
    $hideModal.addEventListener('click', hideModal);
    function hideModal() {
        $overlay.classList.remove('active');
        $modal.style.animation = 'modalOut .8s forwards';
    } 
   

})()
