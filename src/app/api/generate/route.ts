import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    
    const {imageUrl} = body;

    let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            authorization: "Token " + process.env.REPLICATE_API_KEY
        },
        body: JSON.stringify({
            version: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
            input: {img: imageUrl, version: "v1.4", scale: 2}
        })
    });
    let jsonStartResponse = await startResponse.json();
    let endpointUrl = jsonStartResponse.urls.get;

    let revivedImage: string | null = null

    while(!revivedImage){
        let finalResponse = await fetch(endpointUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + process.env.REPLICATE_API_KEY
            }
        })

        let jsonFinalResponse = await finalResponse.json();

        if(jsonFinalResponse.status === 'succeeded'){
            revivedImage = jsonFinalResponse.output
        }else if(jsonFinalResponse.status === 'failed'){
            break;
        }else {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }
  
    return NextResponse.json(revivedImage ? revivedImage : "Failed to revive Image", {status: 201});
}