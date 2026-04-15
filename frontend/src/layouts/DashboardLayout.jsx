import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default DashboardLayout;
