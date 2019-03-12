let app = new Vue({
    el: '#app',
    data: {
        number:1,
        loading:true,
        character: {},
        planet:{},
        species:{},
        films:[],
        film_names:[]
    },
    created() {
        this.get_character();
    },
    watch: {
        number(value, oldvalue) {
            if (oldvalue === '') {
                this.max = value;
            } else {
                this.get_character();
            }
        },
    },
    methods: {
        async get_homeworld(url) {
            try {
                const response = await axios.get(url);
                this.planet = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async get_species(url) {
            try {
                const response = await axios.get(url);
                this.species = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async get_films(urls) {
            try {
                this.film_names = [];
                for (url in urls)
                {
                    const response = await axios.get(urls[url]);
                    this.film_names.push(response.data.title);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async get_character() {
            try {
                this.loading = true;
                const response = await axios.get('https://swapi.co/api/people/' + this.number + '/');
                console.log(response);
                this.character = response.data;
                let planet_url = this.character.homeworld;
                this.get_homeworld(planet_url);
                let species_url = this.character.species[0];
                this.get_species(species_url);
                let film_urls = this.character.films;
                this.get_films(film_urls);

                this.loading = false;
            } catch (error) {
                this.number = this.max;
                console.log(error);
            }
        },
        prev_character() {
            this.number = this.number - 1;
            if (this.number < 1)
                this.number = 1;
        },
        next_character() {
            this.number = this.number + 1;
            if (this.number > this.max)
                this.number = this.max
        },
    }
});