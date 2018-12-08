import React, { useEffect, useRef } from "react";
import echarts from "echarts";

export default ({
  name,
  option,
  group,
  className,
  style,
  onClick,
  onContainerClick,
  ...otherProps
}) => {
  const container = useRef();

  let mouseX = 0;
  let mouseY = 0;
  let clickMoved = false;
  let echart = null;

  const onMouseDown = event => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  };

  const onMouseUp = event => {
    const cp = (a, b) => a + 15 < b || a - 15 > b;
    clickMoved = cp(event.offsetX, mouseX) || cp(event.offsetY, mouseY);
  };

  const onClick2 = event => {
    if (clickMoved || !onClick) {
      return;
    }
    onClick(event);
  };

  const onResize = () => {
    if (echart) {
      echart.resize();
    }
  };

  useEffect(
    () => {
      if (!echart) {
        echart = echarts.init(container.current);
        echart.on("click", onClick2);

        [
          "click",
          "dblclick",
          "mousedown",
          "mouseup",
          "mouseover",
          "mouseout",
          "globalout",
          "legendselectchanged",
          "legendselected",
          "legendunselected",
          "datazoom",
          "datarangeselected",
          "timelinechanged",
          "timelineplaychanged",
          "restore",
          "dataviewchanged",
          "magictypechanged",
          "geoselectchanged",
          "geoselected",
          "geounselected",
          "pieselectchanged",
          "pieselected",
          "pieunselected",
          "mapselectchanged",
          "mapselected",
          "mapunselected",
          "axisareaselected",
          "brush",
          "brushselected"
        ]
          .filter(name => otherProps[name])
          .map(name => echart.on(name, event => otherProps[name](event)));

        container.current.addEventListener("mousedown", onMouseDown);
        container.current.addEventListener("mouseup", onMouseUp);
        window.addEventListener("resize", onResize);
      }

      echart.setOption(option);
      if (group) {
        echart.group = group;
      }

      return () => {
        window.removeEventListener("resize", onResize);
        container.current.removeEventListener("mousedown", onMouseDown);
        container.current.removeEventListener("mouseup", onMouseUp);
      };
    },
    [container, option, group]
  );

  useEffect(onResize, [style]);

  return (
    <div
      ref={container}
      name={name}
      className={className}
      style={style}
      onClick={onContainerClick}
    />
  );
};
