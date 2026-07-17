const cron = require("node-cron");
const axios = require("axios");

const {
    getAllApis,
    saveMonitoringResult
} = require("../models/monitoringModel");

cron.schedule("* * * * *", () => {

    console.log("\n========== Scheduler Started ==========");

    getAllApis(async (err, apis) => {

        if (err) {
            console.log(err);
            return;
        }

        console.log(`Found ${apis.length} APIs`);

        for (const api of apis) {

            const startTime = Date.now();

            try {

                const response = await axios({
                    method: api.http_method,
                    url: api.endpoint_url,
                    timeout: 10000
                });

                const responseTime = Date.now() - startTime;

                console.log("--------------------------------");
                console.log("API:", api.api_name);
                console.log("Status:", response.status);
                console.log("Response Time:", responseTime + " ms");

                // Save UP result
                saveMonitoringResult(
                    {
                        api_id: api.id,
                        status_code: response.status,
                        response_time: responseTime,
                        availability: "UP",
                        error_message: null
                    },
                    (err) => {
                        if (err) {
                            console.log("Database Error:", err);
                        } else {
                            console.log("Monitoring result saved.");
                        }
                    }
                );

            } catch (error) {

                console.log("--------------------------------");
                console.log("API:", api.api_name);
                console.log("API DOWN");

                // Save DOWN result
                saveMonitoringResult(
                    {
                        api_id: api.id,
                        status_code: null,
                        response_time: null,
                        availability: "DOWN",
                        error_message: error.message
                    },
                    (err) => {
                        if (err) {
                            console.log("Database Error:", err);
                        } else {
                            console.log("Monitoring result saved.");
                        }
                    }
                );
            }
        }

    });

});