import {NextPage} from "next";
import FileUpload from "../../components/dashboard/FileUpload";
import Layout from "../../components/layout/Layout";

const FilesRoute: NextPage = () => {
  return (
    <Layout
      title="File upload"
      content=""
    >
      <FileUpload/>
    </Layout>
  );
};

export default FilesRoute;
