import { ArrowRightIcon } from '@heroicons/react/solid';

function SelectRequirements(props) {
    return (
        <form
            className="container shadow-xl rounded-lg p-6"
            action="http://localhost:8000/auth/login"
            method="POST"
        >

            <div>
                <label
                    htmlFor="diet"
                    className="block text-sm font-medium text-gray-700"
                >
                    Dietary Requirements
                </label>
                <select id="diet" onChange={(e) => { console.log(e.target.value); props.addDietReq(e.target.value) }} className="form-multiselect focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    {props.dietary.map((el, i) => {
                        return (<option key={i} value={el}>{el}</option>);
                    })}
                </select>
            </div>
            <div className="mt-4">
                <label
                    htmlFor="allergies"
                    className="block text-sm font-medium text-gray-700"
                >
                    Intolerances / Allergies
                </label>
                <select id="allergies" onChange={(e) => { console.log(e.target.value); props.addAllergyReq(e.target.value) }} className="form-multiselect focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    {props.allergies.map((el, i) => {
                        return (<option key={i} value={el}>{el}</option>);
                    })}
                </select>
            </div>

            <div className="mt-6 text-xs text-gray-400">
                Your Dietary Requirements:
                {props.dietReqs.map(el => {
                    return el + ", ";
                })}
            </div>
            <div className="text-xs text-gray-400">
                Your Allergies / Intolerances:
                {props.allergyReqs.map(el => {
                    return el + ", ";
                })}
            </div>

            <div className="">

                <button
                    type="button"
                    className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={() => { window.location="/upload" }}
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <ArrowRightIcon
                            className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                            aria-hidden="true"
                        />
                    </span>
                    Next
                </button>

            </div>
        </form>
    );
}

export default SelectRequirements;