#performance-analytic-lib

A small package for analyzing and feeding your page TTFB, FCP, DomLoad and WindowLoad events.

#Installation

`npm -i performance-analytics-lib`

#Usage

```
import PerformanceAnalyzer from 'performance-analytics-lib'

const perfAnalyzer = new PerformanceAnalyzer({
    url: ${YOUR_API_URL_GOES_HERE}
}).analyzeMe();
```