import React, { useState } from "react";
import { Radio, Table, Icon } from "antd";

export default ({ data }) => {
  const [rank, setRank] = useState(localStorage.getItem("rank") || "meituan");

  Object.keys(data).forEach(key => {
    (data[key] || []).forEach((item, index) => (item.key = index));
  });

  const onChange = event => {
    const { value } = event.target;
    setRank(value);
    localStorage.setItem("rank", value);
  };

  const columns = [
    {
      title: "排名",
      dataIndex: "ranking",
      width: "33%",
      render: value =>
        ~~value < 4 ? (
          <Icon
            type="trophy"
            style={{
              fontSize: [0, 50, 40, 30][value],
              color: [
                "",
                "rgb(242,192,86)",
                "rgb(192,192,192)",
                "rgb(186,110,64)"
              ][value]
            }}
          />
        ) : (
          value
        )
    },
    { title: "uid", dataIndex: "userId", width: "33%" },
    {
      title: rank === "pay" ? "充值金额" : "贡献数量",
      dataIndex: "count",
      width: "33%"
    }
  ];

  if (rank === "eleYesterday") {
    columns.push({ title: "今日赠送美团次数", dataIndex: "number" });
    columns.forEach(column => (column.width = "25%"));
  }

  return (
    <div>
      <div style={{ color: "#dd2323" }}>排行榜数据半小时更新一次</div>
      <div>饿了么昨日排名前N，今日赠送对应的美团次数</div>
      <div style={{ marginTop: 15, marginBottom: 15 }}>
        <Radio.Group onChange={onChange} value={rank}>
          <Radio value="meituan">美团</Radio>
          <Radio value="ele">饿了么</Radio>
          <Radio value="eleYesterday">饿了么昨日</Radio>
          <Radio value="star">饿了么星选</Radio>
          <Radio value="pay">充值</Radio>
        </Radio.Group>
      </div>
      <Table dataSource={data[rank]} columns={columns} pagination={false} />
    </div>
  );
};
