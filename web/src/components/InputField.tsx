import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

interface InputFieldProps {
  name: string;
  label: string;
  'aria-label'?: string;
  placeholder?: string;
  type?: string;
  onBlur?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <Input {...field} {...props} />
    </FormControl>
  );
};

export default InputField;
