import axios from 'axios'


// Axios Config
export const CommonApi = async (reqmethod: string, apiurl: string, reqbody: any, header: any) => {


    const Config = {

        method: reqmethod,
        url: apiurl,
        data: reqbody,
        headers: header ? header : { 'Content-Type': 'application/json' }

    }

    return await axios(Config).then((res) => res).catch((err) => err)

}