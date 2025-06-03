import React, { useState } from "react";
import { Layout, Button, Space } from "antd";
import { PlusOutlined, ClearOutlined } from "@ant-design/icons";
import { Viewer } from "./components/Viewer/Viewer.tsx";
import { PrimitiveList } from "./components/UI/PrimitiveList.tsx";
import { AddPrimitiveModal } from "./components/UI/AddPrimitiveModal/index.tsx";
import { Primitive, PrimitiveGroup } from "./types/primitive";
import { createPrimitives } from "./utils/geometry.ts";
import styled from "styled-components";

const { Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledContent = styled(Content)`
  background: #f0f2f5;
  padding: 24px;
`;

const StyledSider = styled(Sider)`
  background: white;
  padding: 24px;
  overflow: auto;
`;

const SiderContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PrimitiveListContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const App: React.FC = () => {
  const [primitives, setPrimitives] = useState<Primitive[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddPrimitives = (group: PrimitiveGroup) => {
    const newPrimitives = createPrimitives(group.type, group.parameters, group.count, primitives);
    setPrimitives([...primitives, ...newPrimitives]);
    setIsModalVisible(false);
  };

  const handleSelect = (id: string) => {
    setPrimitives(
      primitives.map((p) => ({
        ...p,
        selected: p.id === id,
      }))
    );
    setSelectedId(id);
  };

  const handleClear = () => {
    setPrimitives([]);
    setSelectedId(undefined);
  };

  return (
    <StyledLayout>
      <Layout>
        <StyledSider width={320}>
          <SiderContent>
            <PrimitiveListContainer>
              <PrimitiveList
                primitives={primitives}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </PrimitiveListContainer>
            <ButtonContainer>
              <Space size='large'>
                <Button
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalVisible(true)}
                >
                  Add Primitive
                </Button>
                <Button icon={<ClearOutlined />} onClick={handleClear}>
                  Clear All
                </Button>
              </Space>
            </ButtonContainer>
          </SiderContent>
        </StyledSider>
        <StyledContent>
          <Viewer primitives={primitives} onPrimitiveClick={handleSelect} />
        </StyledContent>
      </Layout>
      <AddPrimitiveModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleAddPrimitives}
      />
    </StyledLayout>
  );
};

export default App;
