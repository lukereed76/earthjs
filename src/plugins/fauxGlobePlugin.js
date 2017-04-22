earthjs.plugins.fauxGlobePlugin = function(initOptions={}) {
    function addGlobeDropShadow(planet, options) {
        planet.svg.selectAll('.drop_shadow,.drop_shadow_ellipse').remove();
        if (!options.hideGlobeShadow) {
            var drop_shadow = planet.svg.append("defs").append("radialGradient")
                  .attr("id", "drop_shadow")
                  .attr("cx", "50%")
                  .attr("cy", "50%");
                drop_shadow.append("stop")
                  .attr("offset","20%").attr("stop-color", "#000")
                  .attr("stop-opacity",".5")
                drop_shadow.append("stop")
                  .attr("offset","100%").attr("stop-color", "#000")
                  .attr("stop-opacity","0")
            planet.svg.append("ellipse")
                  .attr("cx", planet.width/2).attr("cy", planet.height-50)
                  .attr("rx", planet.proj.scale()*.90)
                  .attr("ry", planet.proj.scale()*.25)
                  .attr("class", "drop_shadow_ellipse noclicks")
                  .style("fill", "url(#drop_shadow)");
        }
    }

    function addGlobeShading(planet, options) {
        planet.svg.selectAll('#globe_shading,.globe_shading_circle').remove();
        if (!options.hideGlobeShading) {
            var globe_shading = planet.svg.append("defs").append("radialGradient")
                  .attr("id", "globe_shading")
                  .attr("cx", "50%")
                  .attr("cy", "40%");
                globe_shading.append("stop")
                  .attr("offset","50%").attr("stop-color", "#9ab")
                  .attr("stop-opacity","0")
                globe_shading.append("stop")
                  .attr("offset","100%").attr("stop-color", "#3e6184")
                  .attr("stop-opacity","0.3")
            planet.svg.append("circle")
                .attr("cx", planet.width / 2).attr("cy", planet.height / 2)
                .attr("r",  planet.proj.scale())
                .attr("class","globe_shading_circle noclicks")
                .style("fill", "url(#globe_shading)");
        }
    }

    function addGlobeHilight(planet, options) {
        planet.svg.selectAll('#globe_highlight,.globe_highlight_circle').remove();
        if (!options.hideGlobeHilight) {
            var globe_highlight = planet.svg.append("defs").append("radialGradient")
                  .attr("id", "globe_highlight")
                  .attr("cx", "75%")
                  .attr("cy", "25%");
                globe_highlight.append("stop")
                  .attr("offset", "5%").attr("stop-color", "#ffd")
                  .attr("stop-opacity","0.6");
                globe_highlight.append("stop")
                  .attr("offset", "100%").attr("stop-color", "#ba9")
                  .attr("stop-opacity","0.2");
            planet.svg.append("circle")
                .attr("cx", planet.width / 2).attr("cy", planet.height / 2)
                .attr("r",  planet.proj.scale())
                .attr("class","globe_highlight_circle noclicks")
                .style("fill", "url(#globe_highlight)");
        }
    }

    initOptions = Object.assign({
        hideGlobeShadow: false,
        hideGlobeShading: false,
        hideGlobeHilight: false,
    }, initOptions);

    return {
        name: 'fauxGlobePlugin',
        onInit(planet, options) {
            Object.assign(options, initOptions);
            planet.addGlobeDropShadow = addGlobeDropShadow;
            planet.addGlobeHilight = addGlobeHilight;
            planet.addGlobeShading = addGlobeShading;
        },
    }
};
