import { Axios } from 'axios';
import React from 'react';

import SelectRequirements from '../components/SelectRequirements';

function Setup(){
    let [page, setPage] = React.useState(0);
    let [dietReqs, setDietReqs] = React.useState([]);
    let [allergyReqs, setAllergyReqs] = React.useState([]);

    const dietary = ['None', 'Vegetarian', 'Vegan', 'Gluten Free', 'Pescetarian'];
    const allergies = ['None', 'Dairy', 'Peanut', 'Soy', 'Egg', 'Seafood', 'Gluten'];

    const handleUpload = async () => {
      Axios({
        method: "PUT",
        data: {
          restrictions: allergyReqs,
        },
        withCredentials: true,
        url: "http://172.31.26.187:5001/diet/restrictions",
      })
        .then((response) => {
          console.log(response);
          Axios({
            method: "PUT",
            data: {
              diet: dietReqs
            },
            withCredentials: true,
            url: "http://172.31.26.187:5001/diet"
          })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            })
        })
        .catch((e) => {
          console.log(e);
        });
    }

    const handlePageChange = (val) => {
      if(val == 0 || val == 1){
        setPage(val);
      }
      console.log(val);
    }

    const addDietReq = (requirement) => {
        if(dietReqs.includes(requirement)){
            return;
        }else if(requirement == "None"){
            setDietReqs([]);
            return;
        }
        let temp = [...dietReqs];
        temp.push(requirement);
        setDietReqs(temp);
        console.log(temp);
    }

    const addAllergyReq = (requirement) => {
        if(allergyReqs.includes(requirement)){
            return;
        }else if(requirement == "None"){
            setAllergyReqs([]);
            return;
        }
        let temp = [...allergyReqs];
        temp.push(requirement);
        setAllergyReqs(temp);
        console.log(temp);
    }

    return(
        <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-emerald-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Tell us a bit more about you
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please choose as many as applicable {page}
            </p>
          </div>
          <SelectRequirements dietary={dietary} allergies={allergies} dietReqs={dietReqs} allergyReqs={allergyReqs} addDietReq={addDietReq} addAllergyReq={addAllergyReq} handlePageChange={handlePageChange} />
          
        </div>
      </div>
    </>
    )
}

export default Setup;