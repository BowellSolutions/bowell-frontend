/*
* @author: Adam Lisichin
* @file: Exports PatientProfile component which is rendered in Next.js page /dashboard/profile
*/
import {Flex} from "@chakra-ui/react";
import {FC, useEffect} from "react";
import {useAppDispatch} from "../../../redux/hooks";
import {retrieveExaminations} from "../../../redux/actions/dashboard";
import ProfileHeader from "../../dashboard/ProfileHeader";
import ProfileForm from "../../dashboard/ProfileForm";


const PatientProfile: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // load examinations on mount
    dispatch(retrieveExaminations(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column">
      <ProfileHeader/>

      <ProfileForm/>
    </Flex>
  );
};

export default PatientProfile;
