import React from "react";
import { Form, InputNumber } from "antd";

interface NumberInputProps {
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  required?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  label,
  min,
  max,
  step = 1,
  required = true,
}) => {
  const [form] = Form.useForm();

  const handleChange = (value: number | null) => {
    if (value && (value < min || value > max)) {
      form.setFieldValue(name, value < min ? min : max);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && (value < min || value > max)) {
      form.setFieldValue(name, value < min ? min : max);
    }
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required, message: `Please input ${label.toLowerCase()}` },
        { type: "number", min, max, message: `${label} must be between ${min} and ${max}` },
      ]}
    >
      <InputNumber
        min={min}
        max={max}
        step={step}
        style={{ width: "100%" }}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Form.Item>
  );
};
