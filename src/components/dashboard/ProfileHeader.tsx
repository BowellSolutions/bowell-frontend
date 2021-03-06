/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Hubert Decyusz, Wojciech Nowicki, Gustaw Daczkowski
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
 * @file: Exports ProfileHeader component which is used in users' Profile
 */
import {Avatar, Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {useAppSelector} from "../../redux/hooks";
import {FC} from "react";

const ProfileHeader: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0, 0%, 100%, .8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue("white", "rgba(255, 255, 255, 0.31)");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const user = useAppSelector(state => state.auth.user);

  return (
    <Box
      borderRadius="15px"
      px="0px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      align="center"
      id="profile-header"
    >
      <Box
        w="100%"
        h={{sm: "300px", md: "250px"}}
        borderRadius="25px"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex
          direction={{sm: "column", md: "row"}}
          mx="1.5rem"
          maxH="330px"
          w={{sm: "90%", xl: "95%"}}
          justifyContent={{sm: "center", md: "space-between"}}
          align="center"
          backdropFilter="saturate(200%) blur(50px)"
          position="absolute"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          border="2px solid"
          borderColor={borderProfileColor}
          bg={bgProfile}
          p="24px"
          borderRadius="20px"
          transform={{
            sm: "translateY(40%)",
            md: "translateY(75%)",
            lg: "translateY(60%)",
          }}
        >
          <Flex
            align="center"
            mb={{sm: "10px", md: "0px"}}
            direction={{sm: "column", md: "row"}}
            w={{sm: "100%"}}
            textAlign={{sm: "center", md: "start"}}
          >
            <Avatar
              me={{md: "22px"}}
              src=""
              w="80px"
              h="80px"
              borderRadius="15px"
            />

            <Flex direction="column" maxWidth="100%">
              <Text
                fontSize={{sm: "lg", lg: "xl"}}
                color={textColor}
                fontWeight="bold"
                ms={{sm: "8px", md: "0px"}}
                textTransform="none"
              >
                {user?.first_name} {user?.last_name}
              </Text>

              <Text
                fontSize={{sm: "sm", md: "md"}}
                color={emailColor}
                fontWeight="semibold"
                textTransform="none"
              >
                {user?.email}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
