import {ReactComponent as Diet} from '../images/diet.svg';
import {ReactComponent as Custom} from '../images/custom.svg';

function Landing(){
    return(
        <>
        <header>
            <nav className="container font-Loto flex items-center px-11 py-4 mt-4 sm:mt-12">
                <div className="py-1">Logo</div>
                <ul className="hidden sm:flex flex-1 item justify-end items-center gap-12 text-emerald-400 uppercase text-xs">
                    <li className="cursor-pointer">Features</li>
                    <li className="cursor-pointer">Purchase</li>
                    <li className="cursor-pointer">Recipes</li>
                    <button type="button" onClick={() => {window.location="/login"}} className="btn btn-emerald px-7 py-3 uppercase">Login</button>
                </ul>
            </nav>
        </header>

        <section className="relative font-Loto">
            <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
                <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h1 className="text-emerald-500 uppercase text-3xl md:text-4xl lg:text-5xl text-center lg:text-left mb-6">
                        Educ-ate
                    </h1>
                    <p className="text-gray-500 text-lg text-center lg:text-left mb-6">
                        Tailored food recommendations to suit you.
                    </p>
                    <div className="flex justify-center flex-wrap gap-6">
                        <button type="button" onClick={() => {window.location="/register"}} className="btn btn-emerald">Get Started</button>
                        <button type="button" className="btn btn-white">See Recipes</button>
                    </div>
                </div>

                <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
                    <Diet className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4" />
                </div>
            </div>
        </section> 

        <section className="bg-gray-200 py-20 font-Loto mt-20 lg:mt-40">
            <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
                <h2 className="text-3xl text-center text-emerald-500">Features</h2>
                <p className="text-center text-gray-600 mt-4">
                    Our services will provide all the tools you need to take back control of your nutrition.
                </p>
            </div>

            <div className="relative mt-20 lg:mt-28">
                <div className="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
                    <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                        <Custom className="w-5/6 h-1/3" />
                    </div>
                    
                    <div className="flex flex-1 flex-col items-center lg:items-start">
                        <h3 className="text-3xl text-bookmark-blue">
                            Fully custom choices
                        </h3>
                        <p className="text-bookmark-grey my-4 text-counter lg:text-left sm:w-3/4 lg:w-full text-gray-600">
                            Eat what you want, but also what your body needs.
                        </p>
                    </div>

                </div>
            </div>

            <div className="relative mt-20 lg:mt-24">
                <div className="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
                    <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                        
                    </div>
                    
                    <div className="flex flex-1 flex-col items-center lg:items-start">
                        <h3 className="text-3xl text-bookmark-blue">
                            
                        </h3>
                        <p className="text-bookmark-grey my-4 text-counter lg:text-left sm:w-3/4 lg:w-full text-gray-600">
                            
                        </p>
                    </div>
                </div>
            </div>

        </section>

        <section className="bg-emerald-400 text-white py-20">
            <div className="container">
                <div className="sm:w-3/4 lg:w-2/4 mx-auto">
                    <div className="font-light upperace text-center mb-8">Mailing List</div>
                    <h4 className="text-3xl text-center">Sign up to receive updates on latest recipes and deals</h4>
                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                        <input type="text" placeholder="Enter your email address:" className="focus:outline-none flex-1 px-2 py-3 rounded-md text-black" />
                        <button className='btn btn-white'>Sign up</button>
                    </div>
                </div>
            </div>
        </section>

        <footer className="bg-emerald-900 py-8">
            <div className="container flex flex-col md:flex-row items-center">
                <div className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12">
                    <div className="py-1">Logo</div>
                    <ul className="flex text-white uppercase gap-12 text-xs">
                        <li className="cursor-pointer">Features</li>
                        <li className="cursor-pointer">Purchase</li>
                        <li className="cursor-pointer"></li>
                    </ul>
                </div>
                <div class="flex gap-10 mt-12 md:mt-0">
                    <li>Icon</li>
                    <li>Icon</li>
                </div>
            </div>
        </footer>
        </>
    );
}

export default Landing;