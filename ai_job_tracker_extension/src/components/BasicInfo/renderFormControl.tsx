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
        placeholder={`Select ${field.name}`}
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
      <Editable defaultValue={field.value}>
        <EditablePreview w="100%" minH="50px" />
        <EditableTextarea
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
        <EditablePreview w="100%" />
        <EditableInput />
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
