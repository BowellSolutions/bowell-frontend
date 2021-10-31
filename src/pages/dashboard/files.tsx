import {NextPage} from "next";
import FileUpload from "../../components/dashboard/FileUpload";
import DoctorLayout from "../../components/layouts/DoctorLayout";

const FilesRoute: NextPage = () => {
  return (
    <DoctorLayout
      title="File upload"
      description=""
      brandText="Files upload testing"
    >
      <FileUpload/>
    </DoctorLayout>
  );
};

export default FilesRoute;
