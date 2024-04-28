import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Select,
} from "@chakra-ui/react";

export default function renderFormControl(
  field: any,
  handleEditableChange: Function
) {
  if (field.type === "select") {
    return (
      <Select
        value={field.value}
        onChange={(e) => handleEditableChange(field.id, e.target.value)}
        defaultValue={field.options[field.default]}
      >
        {field.options.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  } else if (field.type === "textarea") {
    return (
      <Editable value={field.value}>
        <EditablePreview
          w="100%"
          minH="50px"
          h="80px"
          overflowY="scroll"
          resize="vertical"
          border="1px solid grey"
          p="5px"
        />
        <EditableTextarea
          p="5px"
          resize="vertical"
          maxH="200px" // Adjust the maximum height as needed
          minH="80px" // Set the minimum height to prevent the textarea from becoming too small
          h="auto"
          onChange={(e) => handleEditableChange(field.id, e.target.value)}
        />
      </Editable>
    );
  } else if (field.type === "singleinput") {
    return (
      <Editable
        value={field.value}
        onChange={(value) => handleEditableChange(field.id, value)}
      >
        <EditablePreview w="100%" h="30px" border="1px solid grey" px="5px" />
        <EditableInput p="5px" />
      </Editable>
    );
  } else {
    return (
      <Editable
        defaultValue={field.value}
        onChange={(value) => handleEditableChange(field.id, value)}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    );
  }
}
