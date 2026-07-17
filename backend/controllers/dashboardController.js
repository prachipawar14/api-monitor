const {
    getTotalApis,
    getHealthyApis,
    getFailedApis,
    getAverageResponseTime,
    getRecentActivity,
    getChartData
} = require("../models/dashboardModel");

const getDashboard = (req, res) => {

    getTotalApis((err, totalResult) => {

        if (err) return res.status(500).json({ message: err.message });

        getHealthyApis((err, healthyResult) => {

            if (err) return res.status(500).json({ message: err.message });

            getFailedApis((err, failedResult) => {

                if (err) return res.status(500).json({ message: err.message });

                getAverageResponseTime((err, avgResult) => {

                    if (err) return res.status(500).json({ message: err.message });

                    getRecentActivity((err, activityResult) => {

                        if (err) return res.status(500).json({ message: err.message });

                        getChartData((err, chartResult) => {

                            if (err) return res.status(500).json({ message: err.message });

                            const total = totalResult[0].total;
                            const healthy = healthyResult[0].healthy;
                            const failed = failedResult[0].failed;

                            const average =
                                Math.round(avgResult[0].average || 0);

                            const uptime =
                                total === 0
                                    ? 0
                                    : Math.round((healthy / total) * 100);

                            res.json({
                                success: true,
                                data: {
                                    totalApis: total,
                                    healthyApis: healthy,
                                    failedApis: failed,
                                    averageResponseTime: average,
                                    uptimePercentage: uptime,
                                    recentActivity: activityResult,
                                    chartData: chartResult
                                }
                            });
                        });
                    });

                });

            });

        });

    });

};

module.exports = {
    getDashboard
};