

function RecipeTile(props){
    let costStr = "";
    for(let i = 0; i < props.cost; i++){
        costStr += '£';
    }

    return(
        <div className="w-full h-full flex flex-col justify-center align-center hover:cursor-pointer shadow-xl rounded-lg p-6 border-gray-100 border mb-4"
            onClick={() => {window.location = '/recipe?id=' + props.id}}
        >
            <div className="px-4 py-4 max-h-13">
                <img className="h-[100%] w-[100%]" src={props.src}/>
            </div>
            <div className="mt-6 px-4 mb-4">
                <div className="flex flex-row">
                    <div className="flex-1">
                        <h2 className="font-bold text-2xl">{props.title}</h2>
                    </div>
                    <div>
                        <span className="tracking-widest">{costStr}</span>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-s">{props.summary}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeTile;