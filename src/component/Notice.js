import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import { apis, axios } from "../api";

export default () => {
  const [list, setList] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(apis.getNotice);
    if (data) {
      setList(
        data
          .filter(notice => ["all", "web"].includes(notice.type))
          .map(notice => notice.content)
      );
    }
  }, []);

  return (
    <Timeline>
      {list.map(notice => (
        <Timeline.Item>
          <div
            dangerouslySetInnerHTML={(__html => ({
              __html
            }))(notice)}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};
