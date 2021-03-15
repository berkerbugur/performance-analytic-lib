class PerformanceAnalyzer {
    constructor(params = {}) {
        if (!params.url)
            throw Error("Please pass the url you want to feed the data to!")

        this.url = params.url;
    }

    analyzeMe() {
        window.addEventListener("load", () => {
            setTimeout(() => {
                //Since window.performance.timing has deprecated, and this is the only way to get performance metrics
                const navData = performance.getEntriesByType('navigation')[0]; //returns PerformanceNavigationTiming array
                const paintData = performance.getEntriesByType('paint').filter((paint => paint.name === 'first-contentful-paint'))[0]; //returns PerformancePaintTiming array for each paint event so we need a filter

                //respected calculations
                const ttfb = navData?.responseStart - navData?.requestStart;
                const fcp = paintData.startTime ? paintData.startTime : 0;
                const domLoad = navData?.domComplete ? navData?.domComplete : 0;
                const windowLoad = navData?.domContentLoadedEventEnd - navData?.domContentLoadedEventStart;

                this.feedData({
                    ttfb,
                    fcp,
                    domLoad,
                    windowLoad
                });
            }, 500);
        })
    }

    feedData(data) {
        const body = {
            ttfb: data.ttfb,
            fcp: data.fcp,
            domLoad: data.domLoad,
            windowLoad: data.windowLoad
        }

        fetch(this.url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then(resp => {
            console.log(`Successfully fed data: ${resp.body}`);
        }).catch(err => {
            console.log(`[PerformanceAnalyzer] Cannot feed data to ${this.url}. Reason: ${err}`)
        })
    }
}

module.exports = PerformanceAnalyzer;