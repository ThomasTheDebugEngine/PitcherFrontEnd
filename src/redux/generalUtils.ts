
export function handleNetworkErrors(err: any) {
    if (!err.response) {
        console.error("could not retrieve data, please try again later");
    }
    else {
        switch (err.response.status) { //TODO render the custom pages, throwing error for now
            case "undefined":
                console.log("undefined");
                throw new Error("undefined handled");

            case 403:
                console.log("forbidden");
                throw new Error("forbidden handled");

            case 404:
                console.log("not found");
                console.log(err.response)
                throw new Error(err.response);

            case 400:
                console.log("bad request");
                console.log(err.response)
                console.log(err.response.data.errors)
                throw new Error(err.response.data.errors);

            default:
                throw new Error("unkown error, aborting");
        }
    }
}

export function isPayloadDefined(payload) {
    return payload ? true : false;
}
