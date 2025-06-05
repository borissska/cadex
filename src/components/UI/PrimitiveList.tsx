import React, { useEffect, useRef } from "react";
import { List, Typography } from "antd";
import { Primitive } from "../../types/primitive";
import styled from "styled-components";

const { Text } = Typography;

const StyledListItem = styled(List.Item)<{ selected?: boolean }>`
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? "#e6f7ff" : "transparent")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#e6f7ff" : "#f5f5f5")};
  }
`;

const ColorIndicator = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

interface PrimitiveListProps {
  primitives: Primitive[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export const PrimitiveList: React.FC<PrimitiveListProps> = ({
  primitives,
  selectedId,
  onSelect,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId && selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  return (
    <List
      dataSource={primitives}
      renderItem={(primitive) => (
        <StyledListItem
          ref={primitive.id === selectedId ? selectedRef : null}
          selected={primitive.id === selectedId}
          onClick={() => onSelect(primitive.id)}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <ColorIndicator color={primitive.colors[0]} />
            <div>
              <Text strong>{primitive.type}</Text>
              <br />
              <Text type='secondary' style={{ fontSize: "12px" }}>
                Position: ({primitive.position.map((p) => p.toFixed(2)).join(", ")})
              </Text>
            </div>
          </div>
        </StyledListItem>
      )}
    />
  );
};
