import React from 'react';
import Axios from 'axios';

import ExifReader from 'exifreader';

import { RefreshIcon } from "@heroicons/react/solid";
import { ArrowUpIcon } from '@heroicons/react/solid';

function Upload() {
    let [waiting, setWaiting] = React.useState(false);
    let [readyToSend, setReadyToSend] = React.useState(false);
    let [coords, setCoords] = React.useState({
        lat: 0,
        lng: 0
    })

    const handleFileSelected = async (e) => {
        const files = Array.from(e.target.files)
        console.log("files:", files)
        const file = files[0];
        const tags = await ExifReader.load(file);
        const imageDate = tags['DateTimeOriginal'].description;
        const unprocessedTagValue = tags['DateTimeOriginal'].value;

        console.log(tags, imageDate, unprocessedTagValue);
        // console.log(tags.GPSLongitude, tags.GPSLatitude);
        console.log(tags.GPSLongitude.description.toFixed(6), tags.GPSLatitude.description.toFixed(6));
        setCoords({
            lat: tags.GPSLatitude.description.toFixed(6),
            lng: tags.GPSLongitude.description.toFixed(6)
        });
        setReadyToSend(true);
    }

    const handleUpload = async () => {
        console.log(coords);
        Axios({
            method: "PUT",
            data: {
              lat: 51.494111,
              lng: -0.176555,
            },
            url: "http://146.169.190.40:5001/meta"
            // url: "http://172.31.26.187:5001/meta",
          })
            .then((response) => {
              console.log(response);
              window.location="/home";
            })
            .catch((e) => {
              setWaiting(false);
              console.log(e);
            });
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-emerald-600.svg"
              alt="Workflow"
            /> */}
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Upload a picture
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Give us an idea of what you want to eat!
                    </p>
                </div><form
                    className="container shadow-xl rounded-lg p-6"
                    action="http://localhost:8000/auth/login"
                    method="POST"
                >
                    <div>
                        {/* {error ? (
                <p className="text-red-500 text-center text-sm font-medium">
                  {error}
                </p>
              ) : success ? (
                <p className="text-green-500 text-center text-sm font-medium">
                  {success}
                </p>
              ) : (
                ""
              )} */}
                    </div>
                    {
                        readyToSend ?
                            <p className="text-s text-center">
                                Latitude: {coords.lat}, Longitude: {coords.lng}
                            </p>
                            :
                            (
                                <div className="flex justify-center mt-2 w-full">
                                    <div className="rounded-lg">
                                        <div className="m-4">
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                    <div className="flex flex-col items-center justify-center pt-7">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                                            fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                                clipRule="evenodd" />
                                                        </svg>
                                                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                            Select a photo</p>
                                                    </div>
                                                    <input type="file" className="opacity-0" onChange={handleFileSelected} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }




                    <div className="">
                        {readyToSend ? (
                            <button
                                type="button"
                                className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                onClick={() => {handleUpload()}}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <ArrowUpIcon
                                        className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Upload
                            </button>
                        ) : (
                            <button
                                type="button"
                                disabled
                                className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <ArrowUpIcon
                                        className="h-5 w-5 "
                                        aria-hidden="true"
                                    />
                                </span>
                                Upload
                            </button>
                        )}
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Upload;