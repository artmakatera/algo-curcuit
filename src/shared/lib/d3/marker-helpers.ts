import { type Selection } from "d3";

const ARROW_MARKER_ID = "d3-line-arrow";

const addDefs = (svg: Selection<null, unknown, null, undefined>) => svg.append("defs");

export const addArrowMarker = (defs: Selection<SVGDefsElement, unknown, null, undefined>) =>{
  defs
    .append("marker")
    .attr("id", ARROW_MARKER_ID)
    .attr("viewBox", "0 0 20 10")
    .attr("markerWidth", 15)
    .attr("markerHeight", 10)
    .attr("refX", 30)
    .attr("refY", 5)
    .attr("orient", "auto-start-reverse")
    .attr("markerUnits", "userSpaceOnUse")
    .append("path")
    .attr("d", "M0,0 L10,5 L0,10 Z")
    .attr("fill", "context-stroke")



  return defs
}


export const addDefsAndArrowMarker = (svg: Selection<null, unknown, null, undefined>) => {
  const defs = addDefs(svg);
  addArrowMarker(defs);
  return defs;
}