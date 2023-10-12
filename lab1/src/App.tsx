import { useContext } from "react";
import "antd/dist/reset.css";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Button, Input, Menu, Space, Typography } from "antd";
import "./App.css";
import { MainContextValues } from "./context/MainContext";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const { sequenceChange, downloadSequenceFromFile } = useContext(MainContextValues);

  const items1 = ["frequensy", "sequence", "extra", "rsa", "cubic", "additive"].map((key) => ({
    key,
    label: `${key}`,
  }));

  return (
    <Layout>
      <Sider>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
          }}
          onClick={(info) => navigate(info.key)}
          items={items1}
        ></Menu>
      </Sider>
      <Content>
        <Typography>
          <Space direction="vertical">
            <Input
              type="text"
              onChange={sequenceChange}
              addonBefore={"Длина последовательности"}
              placeholder={"Введите длину"}
            />
            <Button type="primary" onClick={downloadSequenceFromFile}>
              Загрузить из файла
            </Button>
            <Outlet />
          </Space>
        </Typography>
      </Content>
    </Layout>
  );
}

export default App;
