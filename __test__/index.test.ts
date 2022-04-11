import { CharacterParameters } from "../src/types"

test("parameters convert to expected query string", () => {

    let expected = "nameStartsWith=spider&comics=1,2,3&orderBy=name";

    let params: CharacterParameters = {
        nameStartsWith: "spider",
        comics: [1, 2, 3],
        orderBy: "name"
    };
    
    function queryString(obj: Object){
        
        return Object.keys(obj).map((key) => {

            let value = obj[key]

            if (Array.isArray(value)){
                value = value.join(",")
            }

            return `${key}=${value}`
        })
        .join("&");
    }
    

    expect(queryString(params)).toMatch(expected);

})