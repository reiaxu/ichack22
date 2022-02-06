import React from 'react';
import Axios from 'axios';

import CustomMenu from '../components/CustomMenu';

function Recipe(props){
    let [instructions, setInstructions] = React.useState([]);
    let [ingredients, setIngredients] = React.useState([]);

    let [recipe, setRecipe] = React.useState({});

    let [calories, setCalories] = React.useState(362);
    let [sodium, setSodium] = React.useState(5);
    let [sugar, setSugar] = React.useState(1);
    let [protein, setProtein] = React.useState(10);
    let [cost, setCost] = React.useState(1.30);

    const dailyCalorie = 2250;
    const dailySodium = 2300;
    const dailySugar = 30;
    const dailyProtein = 50;

    const caloriePercentage = 32;
    const sodiumPercentage = 15;
    const sugarPercentage = 3;
    const proteinPercentage = 19;
    const costPercentage = 33;

    React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
        console.log(id);
    Axios({
        method: "POST",
        data: {
          sp_id: id
        },
        url: "http://146.169.190.40:5001/recipes"
        // url: "http://172.31.26.187:5001/meta",
      })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setRecipe(response.data);
          let tempIngr = [];

        for(let i = 0; i < response.data.ingredients; i++){
            console.log(response.data.ingredients[i]);
            tempIngr.push(<li>{response.data.ingredients[i]}</li>)
        }

        setIngredients(tempIngr);
        })
        .catch((e) => {
          console.log(e);
        });
    
    }, []);

    return(
        <div>
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

            <section className="mt-8 px-16">
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 mt-12 gap-8">
                    <div className="border-2 flex-1 border-gray-300 shadow-xl max-h-72 flex justify-center">
                        <img className="h-full max-w-fit" src="https://spoonacular.com/recipeImages/631983-312x231.jpg" />
                    </div>
                    <div className="border-2 border-gray-300 shadow-xl px-4 py-4">
                        <h2 className="text-2xl font-bold">Key Info:</h2>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                🔥
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                    <div className={`w-[32%] ` + 'bg-red-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{caloriePercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {calories} kCal
                            </div>
                        </div>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                👛
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                <div className={`w-[${costPercentage}%] ` + 'bg-emerald-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{costPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                £ {cost.toFixed(2)}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                🧂
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                <div className={`w-[15%] ` + 'bg-emerald-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{sodiumPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {sodium} mg
                            </div>
                        </div>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                🍬
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                <div className={`w-[3%] ` + 'bg-emerald-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{sugarPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {sugar} g
                            </div>
                        </div>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                💪
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                <div className={`w-[33%] ` + 'bg-orange-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{proteinPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {protein} g
                            </div>
                        </div>

                        

                    </div>
                </div>
            </section>

            <section className="mt-8 px-16">
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 mt-12 gap-8">
                    <div className="border-2 border-gray-300 shadow-xl px-4 py-4">
                        <h2 className="text-2xl font-bold">Ingredients:</h2>
                        <ul className="list-disc pl-4 mt-4">
                            {console.log(ingredients)}
                            <li>
                            Shrimp
                            </li>
                            <li>
                            Golden Brown Suger
                            </li>
                            <li>
                            Chilli Pepper
                            </li>
                        </ul>
                    </div>
                    <div className="border-2 border-gray-300 shadow-xl px-4 py-4">
                        <h2 className="text-2xl font-bold">Instructions:</h2>
                        <ol className="list-decimal pl-4 mt-4">
                            <li>To serve, set the shrimp on the sauce and garnish with fresh herbs.</li>
                        </ol>
                    </div>
                </div>
            </section>
        </div>
        </div>
    )
}

export default Recipe;