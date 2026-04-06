const fs = require('fs');
const https = require('https');
const d3 = require('d3'); // Requires d3

async function run() {
    console.log("Fetching ne_110m_land.json...");
    
    const fetchJson = (url) => new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });

    try {
        const landFeatures = await fetchJson("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json");
        
        console.log("Geometry fetched. Computing dots...");

        const pointInPolygon = (point, polygon) => {
            const [x, y] = point;
            let inside = false;
            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const [xi, yi] = polygon[i];
                const [xj, yj] = polygon[j];
                if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
                    inside = !inside;
                }
            }
            return inside;
        };

        const pointInFeature = (point, feature) => {
            const geometry = feature.geometry;
            if (geometry.type === "Polygon") {
                const coordinates = geometry.coordinates;
                if (!pointInPolygon(point, coordinates[0])) return false;
                for (let i = 1; i < coordinates.length; i++) {
                    if (pointInPolygon(point, coordinates[i])) return false;
                }
                return true;
            } else if (geometry.type === "MultiPolygon") {
                for (const polygon of geometry.coordinates) {
                    if (pointInPolygon(point, polygon[0])) {
                        let inHole = false;
                        for (let i = 1; i < polygon.length; i++) {
                            if (pointInPolygon(point, polygon[i])) {
                                inHole = true;
                                break;
                            }
                        }
                        if (!inHole) return true;
                    }
                }
                return false;
            }
            return false;
        };

        const generateDotsInPolygon = (feature, dotSpacing = 16) => {
            const dots = [];
            const bounds = d3.geoBounds(feature);
            const [[minLng, minLat], [maxLng, maxLat]] = bounds;

            const stepSize = dotSpacing * 0.08;
            for (let lng = minLng; lng <= maxLng; lng += stepSize) {
                for (let lat = minLat; lat <= maxLat; lat += stepSize) {
                    const point = [lng, lat];
                    if (pointInFeature(point, feature)) {
                        // Rounding to save space
                        dots.push([
                            Math.round(lng * 100) / 100, 
                            Math.round(lat * 100) / 100
                        ]);
                    }
                }
            }
            return dots;
        };

        const allDots = [];
        let totalDots = 0;
        
        landFeatures.features.forEach((feature) => {
            const dots = generateDotsInPolygon(feature, 16);
            dots.forEach((dot) => {
                allDots.push(dot); // Array of arrays [lng, lat]
                totalDots++;
            });
        });

        console.log(`Computed ${totalDots} dots.`);
        
        // Save to public dir
        const dataPath = __dirname + '/../public/globe-data.json';
        
        const payload = {
            dots: allDots,
            landFeatures: landFeatures
        };
        
        fs.writeFileSync(dataPath, JSON.stringify(payload));
        console.log("Saved globe-data.json successfully.");
        
    } catch(err) {
        console.error("Failed to generate dots:", err);
    }
}

run();
