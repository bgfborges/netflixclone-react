import React, { useEffect, useState } from "react";
import { Tmdb } from "./services/Tmdb";
import { MovieRow } from "./components/MovieRow";
import './App.css';
import { FeaturedMovie } from "./components/FeaturedMovie";

const App = () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeatuedData] = useState(null);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovieList(list); 

            const originals = list.filter( (item, key) => item.slug === 'originals' );
            const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeatuedData(chosenInfo);
        }
        loadAll();
    }, [])

    return(
        <div className="page">
            { featuredData && <FeaturedMovie item={featuredData} /> }
            <section className="lists">
            {movieList.map((item, key) => (
                <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
            </section>
        </div>
    );
}

export default App;