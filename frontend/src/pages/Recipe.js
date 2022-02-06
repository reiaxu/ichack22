import React from 'react';
import Axios from 'axios';

import CustomMenu from '../components/CustomMenu';

function Recipe(props){
    let [ingredients, setIngredients] = React.useState([]);
    let [instructions, setInstructions] = React.useState([]);

    let [recipe, setRecipe] = React.useState({});

    let [calories, setCalories] = React.useState(0);
    let [sodium, setSodium] = React.useState(0);
    let [sugar, setSugar] = React.useState(0);
    let [protein, setProtein] = React.useState(0);
    let [cost, setCost] = React.useState(0);

    const dailyCalorie = 2250;
    const dailySodium = 2300;
    const dailySugar = 30;
    const dailyProtein = 50;

    const caloriePercentage = ((calories / dailyCalorie)*100).toFixed(1);
    const sodiumPercentage = ((props.sodium / dailySodium)*100).toFixed(1);
    const sugarPercentage = ((sugar / dailySugar)*100).toFixed(1);
    const proteinPercentage = ((props.protein/ dailyProtein)*100).toFixed(1);
    const costPercentage = ((cost+1/3)*100).toFixed(1);

    React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");

    Axios({
        method: "GET",
        data: {
          id: id
        },
        withCredentials: true,
        url: "http://172.31.26.187:5001/recipes",
      })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setRecipe(response.data);
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
                    <div className="py-1">Educ-ate</div>
                    <ul className="hidden sm:flex flex-1 item justify-end items-center gap-12 text-emerald-400 uppercase text-xs">
                        <CustomMenu />
                    </ul>
                </nav>
            </header>

            <section className="mt-8 px-16">
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 mt-12 gap-8">
                    <div className="border-2 flex-1 border-gray-300 shadow-xl max-h-72 flex justify-center">
                        <img className="h-full max-w-fit" src="https://www.foodiecrush.com/wp-content/uploads/2020/05/Penne-Marinara-Sauce-foodiecrush.com-004.jpg" />
                    </div>
                    <div className="border-2 border-gray-300 shadow-xl px-4 py-4">
                        <h2 className="text-2xl font-bold">Key Info:</h2>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                🔥
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                    <div className={`w-[${caloriePercentage}%] ` + 'bg-orange-500 rounded-md w-[%] min-h-[100%]'}>
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
                                <div className={`w-[${costPercentage}%] ` + 'bg-orange-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{costPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                £ {cost}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                🧂
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                <div className={`w-[${sodiumPercentage}%] ` + 'bg-orange-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{sodiumPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {props.sodium} mg
                            </div>
                        </div>

                        <div className="grid grid-cols-3 mt-4">
                            <div className='text-xl text-center'>
                                🍬
                            </div>
                            <div>
                                <div className="w-[90%] h-[90%] border border-gray-600 rounded-md">
                                <div className={`w-[${sugarPercentage}%] ` + 'bg-orange-500 rounded-md w-[%] min-h-[100%]'}>
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
                                <div className={`w-[${proteinPercentage}%] ` + 'bg-orange-500 rounded-md w-[%] min-h-[100%]'}>
                                        <p className="text-sm text-gray-700">{proteinPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {props.protein} g
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
                            {
                                ingredients.map(el => {
                                    return <li>{el}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="border-2 border-gray-300 shadow-xl px-4 py-4">
                        <h2 className="text-2xl font-bold">Instructions:</h2>
                        <ol className="list-decimal pl-4 mt-4">
                            {
                                instructions.map(el => {
                                    return <li>{el}</li>
                                })
                            }
                        </ol>
                    </div>
                </div>
            </section>
        </div>
        </div>
    )
}

export default Recipe;