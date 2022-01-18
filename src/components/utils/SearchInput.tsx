import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {Flex, FlexProps, Icon, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {AiOutlineSearch} from "react-icons/ai";

interface SearchInputProps extends FlexProps {
  inputId: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchInput: FC<SearchInputProps> = ({inputId, query, setQuery, ...flexProps}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  return (
    <Flex
      maxW={{base: "70%", md: "none"}}
      {...flexProps}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={AiOutlineSearch}/>
        </InputLeftElement>

        <Input
          id={inputId}
          name="search"
          type="search"
          size="md"
          placeholder="Search"
          onChange={handleChange}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
