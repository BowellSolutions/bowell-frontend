import {FC, ReactNode} from "react";

interface PatientLayoutProps {
  children: ReactNode;
}

// to do
const PatientLayout: FC<PatientLayoutProps> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default PatientLayout;
