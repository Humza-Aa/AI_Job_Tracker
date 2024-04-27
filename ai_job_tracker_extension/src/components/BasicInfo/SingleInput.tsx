import {
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";

export default function SingleInput(information: any, handleEditableChange: Function) {
  console.log(information)
  return (
    <>
      {information.information.map((element: any) => {
        return (
          <FormControl id={element.id}>
            <SimpleGrid columns={2} spacing={3}>
              <FormLabel m="0" display="flex" alignItems="center">
                {element.name}
              </FormLabel>
              <Editable
                value={element.value}
                onChange={(value) => handleEditableChange(element.id, value)}
              >
                <EditablePreview w="100%" />
                <EditableInput />
              </Editable>
            </SimpleGrid>
          </FormControl>
        );
      })}
    </>
  );
}
