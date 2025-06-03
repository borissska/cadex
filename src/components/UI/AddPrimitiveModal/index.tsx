import React from "react";
import { Modal, Form, Select, Button } from "antd";
import { NumberInput } from "../NumberInput.tsx";
import { AddPrimitiveModalProps } from "./AddPrimitiveModel.props";

export const AddPrimitiveModal: React.FC<AddPrimitiveModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({
          type: values.type,
          parameters: {
            length: values.length,
            width: values.width,
            height: values.height,
          },
          count: values.count,
        });
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Modal
      title='Add Primitive Group'
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Add
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='type'
          label='Primitive Type'
          rules={[{ required: true, message: "Please select a type" }]}
        >
          <Select>
            <Select.Option value='box'>Box</Select.Option>
            <Select.Option value='pyramid'>Pyramid</Select.Option>
          </Select>
        </Form.Item>

        <NumberInput name='length' label='Length' min={0.1} max={5} step={0.1} required={true} />
        <NumberInput name='width' label='Width' min={0.1} max={5} step={0.1} required={true} />
        <NumberInput name='height' label='Height' min={0.1} max={5} step={0.1} required={true} />
        <NumberInput name='count' label='Number of Primitives' min={1} max={10} required={true} />
      </Form>
    </Modal>
  );
};
