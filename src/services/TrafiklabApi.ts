
export default class TrafiklabApi {

    async getBusLineStops(): Promise<any> {
        const url = `/api/busLineStops`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.StatusCode !== 0) {
            throw new Error(`Failed to fetch data. Status: ${data.StatusCode}`);
        }
        return data.ResponseData.Result;
    }
    async getStopNames(): Promise<any> {
        const url = `/api/stopNames`; 
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.StatusCode !== 0) {
            throw new Error(`Failed to fetch data. Status: ${data.StatusCode}`);
        }
        return data.ResponseData.Result;
    }

}