import React from 'react';
import Axios from 'axios';

import CustomMenu from "../components/CustomMenu";
import RecipeTile from "../components/RecipeTile";

function Dashboard() {
    let [suggestions, setSuggestions] = React.useState([]);
    let [history, setHistory] = React.useState([]);

    React.useEffect(() => {
        Axios({
            method: "GET",  
            url: "http://146.169.190.40:5001/summaries"
            // url: "http://172.31.26.187:5001/meta",
        })
            .then(res => {
                console.log(res);
                let recipes = res.data.recipes;
                let temp = [];
                for(let i = 0; i < recipes.length; i++){
                    console.log(recipes[i].title)
                    temp.push(<RecipeTile key={i} id={recipes[i]['sp_id']} cost={1} src={recipes[i].image} title={recipes[i].title} cost={recipes[i].cost} summary={recipes[i]['time required'] + ' minutes'} />)
                }
                setSuggestions(temp);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    React.useEffect(() => {

    }, [])

    return (
        <div className="w-screen h-screen">
            <header>
                <nav className="container font-Loto flex items-center px-11 py-4">
                <div className="py-1">
                    <img className="w-[180px] h-[70px]" src="/logo.jpg" />
                </div>
                    <ul className="hidden sm:flex flex-1 item justify-end items-center gap-12 text-emerald-400 uppercase text-xs">
                        <CustomMenu />
                    </ul>
                </nav>
            </header>

            <section className="mt-8 px-8">
                <h2 className="text-3xl font-extrabold">Your Suggestions:</h2>
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12 gap-8">
                    {
                        suggestions
                    }
                </div>
            </section>

            <section className="mt-8 px-8">
                <h2 className="text-3xl font-extrabold">Past Recipes You Enjoyed:</h2>
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12 gap-8">
                    {/* {
                        history.map(el => {
                            return <RecipeTile src={el.src} title={el.title} cost={el.cost} summary={el.summary} />
                        })
                    } */}
                </div>
            </section>
        </div>
    )
}

export default Dashboard;