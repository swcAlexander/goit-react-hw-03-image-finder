export const App = () => {
  

    searchQuery = '';
    page = 1;
    PER_PAGE = 40;

    async fetchGallery =()=> {
    const axiosOptions = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '35072085-a0b1b3afc3e4ed85b172a35ba',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
      },
    };
    try {
      const response = await axios(axiosOptions);

      this.incrementPage();
      return response.data;
    } catch {
      console.log('Помилка!');
    }
  }

  incrementPage =() => {
    this.page += 1;
  }

  resetPage=() => {
    this.page = 1;
  }

  resetEndOfHits=() => {
    this.endOfHits = false;
  }
  hasMoreImages=() => {
    return this.page === Math.ceil(this.totalPages / this.per_page);
  }

  getquery=() => {
    return this.searchQuery;
  }

  setquery=(newQuery)=> {
    this.searchQuery = newQuery;
  }


  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};
