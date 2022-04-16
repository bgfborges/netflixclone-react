import React, { useEffect, useState } from "react";
import { Tmdb } from "./services/Tmdb";
import { MovieRow } from "./components/MovieRow";
import './App.css';
import { FeaturedMovie } from "./components/FeaturedMovie";
import { Header } from "./components/Header";

const App = () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeatuedData] = useState(null);
    const [black, setBlack] = useState(false);

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
    }, []);

    useEffect( () => {
        const scrollEvent = () => {
            if(window.scrollY > 20){
                setBlack(true);
            } else {
                setBlack(false);
            }
        }

        window.addEventListener('scroll', scrollEvent);

        return () => {
            window.removeEventListener('scroll', scrollEvent);
        }
    }, []);

    return(
        <>
        <div className="page">
            <Header black={black} />
            { featuredData && <FeaturedMovie item={featuredData} /> }
            <section className="lists">
            {movieList.map((item, key) => (
                <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
            </section>
            <section className="footer">
                Created with <span role="img" aria-label="heart">❤️</span> by <strong>Gabriel Borges</strong>.<br />
                All rights reserved to Netflix.<br />
                Data from themoviedb.org
            </section>
        </div>
        { movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://i.gifer.com/JM9R.gif" alt="Loading" />
                </div>
        }
        </>
    );
}

export default App;