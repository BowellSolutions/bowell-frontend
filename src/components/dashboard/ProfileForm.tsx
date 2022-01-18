/**
 * @author: Adam Lisichin
 * @file: Exports ProfileForm component which is used in patient's Profile
 */
import {FC} from "react";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import {useAppSelector} from "../../redux/hooks";
import {formatDate} from "../views/utils/format";

/**
 * Component which displays existing user data inside the form.
 * Form handling has not been implemented - this is just a basis.
 */
const ProfileForm: FC = () => {
  const user = useAppSelector(state => state.auth.user);

  const labelColor = useColorModeValue("gray.700", "gray.50");
  const formBgColor = useColorModeValue("white", "gray.700");

  return (
    <SimpleGrid
      display={{base: "initial", md: "grid"}}
      columns={{md: 2}}
      spacing={{md: 6}}
      id="profile-form-grid"
    >
      <GridItem mt={[5, null, 0]} colSpan={{md: 2}}>
        <chakra.form
          shadow="base"
          rounded={[null, "md"]}
          overflow={{sm: "hidden"}}
        >
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg={formBgColor}
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="first_name"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  First name
                </FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                  value={user?.first_name}
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="last_name"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  Last name
                </FormLabel>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                  value={user?.last_name}
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 4]}>
                <FormLabel
                  htmlFor="email_address"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  Email address
                </FormLabel>
                <Input
                  type="text"
                  name="email_address"
                  id="email_address"
                  autoComplete="email"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                  value={user?.email}
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  Country
                </FormLabel>

                <Select
                  id="country"
                  name="country"
                  autoComplete="country"
                  placeholder="Select option"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                >
                  {/* to be added */}
                </Select>
              </FormControl>

              <FormControl as={GridItem} colSpan={6}>
                <FormLabel
                  htmlFor="street_address"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  Street address
                </FormLabel>
                <Input
                  type="text"
                  name="street_address"
                  id="street_address"
                  autoComplete="street-address"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                <FormLabel
                  htmlFor="city"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  City
                </FormLabel>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="city"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel
                  htmlFor="state"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  State / Province
                </FormLabel>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="state"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel
                  htmlFor="postal_code"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  ZIP / Postal
                </FormLabel>

                <Input
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  autoComplete="postal-code"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  isDisabled
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="street_address"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  Birth Date
                </FormLabel>
                <Text>
                  {user?.birth_date}
                </Text>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="street_address"
                  fontSize="sm"
                  fontWeight="md"
                  color={labelColor}
                >
                  Join Date
                </FormLabel>
                <Text>
                  {user?.date_joined && formatDate(user.date_joined)}
                </Text>
              </FormControl>
            </SimpleGrid>
          </Stack>

          <Box
            px={{base: 4, sm: 6}}
            py={3}
            textAlign="right"
          >
            <Button
              id="profile-form-submit-btn"
              type="submit"
              colorScheme="teal"
              _focus={{shadow: ""}}
              fontWeight="md"
              isDisabled
            >
              Save
            </Button>
          </Box>
        </chakra.form>
      </GridItem>
    </SimpleGrid>
  );
};

export default ProfileForm;
