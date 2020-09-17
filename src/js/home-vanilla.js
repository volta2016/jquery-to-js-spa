// console.log('hola mundo');


//programa seatch movie
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