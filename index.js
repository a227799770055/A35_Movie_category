(function () {
  // variables
  const base_url = 'https://movie-list.alphacamp.io/'
  const index_url = base_url + 'api/v1/movies'
  const poster_url = base_url + 'posters/'
  const data = []
  const data_panel = document.querySelector('#data_panel')
  const category_btn = document.querySelector('.nav-pills')
  const category = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }



  // connect to api
  axios.get(index_url)
    .then((response) => {
      data.push(...response.data.results)
      // function display_data
      display_data(data)
      category_bars(category)
    })
    .catch()


  //Event Listener

  category_btn.addEventListener('click', event => {
    if (event.target.matches(".nav-link")) {
      const data_temp = []
      data.forEach(item => {
        if (item.genres.some(element => {
          return element === Number(event.target.dataset.id)
        })) {
          data_temp.push(item)
        }
      })
      console.log(data_temp)
      display_data(data_temp)
    }
  })


  // Function 
  // display_data
  function display_data(data) {
    let html_content = ''
    data.forEach(item => {
      html_content += `
      <div class="col-sm-4">
         <div class="card mb-2">
          <img class="card-img-top " src="${poster_url}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h6>
            </div> 
            <div class="card-footer">`
      item.genres.forEach(item => {
        html_content += `<span class="badge badge-secondary">${category[String(item)]}</span>`
      })
      html_content +=
        `</div>
          </div>
        </div>
      `
    })
    data_panel.innerHTML = html_content
  }

  // category bars
  function category_bars(category) {
    html_content = ''
    for (item in category) {
      html_content += `<a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false" data-id="${item}">${category[item]}</a>`
    }
    category_btn.innerHTML = html_content
  }



















































})()