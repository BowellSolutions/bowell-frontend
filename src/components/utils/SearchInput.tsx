/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Exports SearchInput component - input field with search icon accepting query and setQuery as props
 */
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
