interface TrafiklabConfig {
    apiKey: string;
}

export default class TrafiklabApi {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: TrafiklabConfig) {
        this.apiKey = config.apiKey;
        this.baseUrl = 'https://api.sl.se/api2/LineData.json';
    }

    async getBusLineStops(): Promise<any> {
        const url = `${this.baseUrl}?key=${this.apiKey}&model=jour&DefaultTransportModeCode=BUS`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.StatusCode !== 0) {
                throw new Error(`Failed to fetch bus line stops. Status: ${data.StatusCode}`);
            }
            
            return data.ResponseData.Result;
        } catch (error) {
            console.error("Error fetching bus line stops:", error);
            throw error;
        }
    }

    async getStopNames(): Promise<any> {
        const url = `${this.baseUrl}?key=${this.apiKey}&model=stop&DefaultTransportModeCode=BUS`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.StatusCode !== 0) {
                throw new Error(`Failed to fetch stop names. Status: ${data.StatusCode}`);
            }

            return data.ResponseData.Result;
        } catch (error) {
            console.error("Error fetching stop names:", error);
            throw error;
        }
    }
}
