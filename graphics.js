/**
 * Generates geometric SVG abstractions for visual interest without stock photos.
 */
function initHeroGraphic() {
    const container = document.getElementById('hero-geo');
    if (!container) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 400 400");
    svg.style.width = "100%";
    svg.style.height = "auto";


    for (let i = 1; i <= 5; i++) {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "200");
        circle.setAttribute("cy", "200");
        circle.setAttribute("r", (i * 35).toString());
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", i === 3 ? "#c8f040" : "#6b6560");
        circle.setAttribute("stroke-width", i === 3 ? "3" : "1");
        circle.setAttribute("opacity", (1.2 - i * 0.2).toString());
        svg.appendChild(circle);
    }


    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", "50");
    line.setAttribute("y1", "350");
    line.setAttribute("x2", "350");
    line.setAttribute("y2", "50");
    line.setAttribute("stroke", "#c4461a");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);

    container.appendChild(svg);
}

document.addEventListener('DOMContentLoaded', initHeroGraphic);
