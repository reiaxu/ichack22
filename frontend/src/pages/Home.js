import React from 'react';
import Axios from 'axios';

import CustomMenu from "../components/CustomMenu";
import RecipeTile from "../components/RecipeTile";

function Dashboard() {
    let [suggestions, setSuggestions] = React.useState([{
        src: "https://www.foodiecrush.com/wp-content/uploads/2020/05/Penne-Marinara-Sauce-foodiecrush.com-004.jpg",
        title: "Pasta",
        cost: "2",
        summary: "This is pasta"
    }]);
    let [history, setHistory] = React.useState([]);

    React.useEffect(() => {

    }, [])

    return (
        <div className="w-screen h-screen">
            <header>
                <nav className="container font-Loto flex items-center px-11 py-4">
                    <div className="py-1">Educ-ate</div>
                    <ul className="hidden sm:flex flex-1 item justify-end items-center gap-12 text-emerald-400 uppercase text-xs">
                        <CustomMenu />
                    </ul>
                </nav>
            </header>

            <section className="mt-8 px-8">
                <h2 className="text-3xl font-extrabold">Your Suggestions:</h2>
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12 gap-8">
                    {
                        suggestions.map(el => {
                            return <RecipeTile src={el.src} title={el.title} cost={el.cost} summary={el.summary} />
                        })
                    }
                </div>
            </section>

            <section className="mt-8 px-8">
                <h2 className="text-3xl font-extrabold">Past Recipes You Enjoyed:</h2>
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12 gap-8">
                    {
                        history.map(el => {
                            return <RecipeTile src={el.src} title={el.title} cost={el.cost} summary={el.summary} />
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default Dashboard;