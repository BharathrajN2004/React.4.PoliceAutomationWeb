import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { ACCESSLEVEL } from "variables/static";

const Dashboard = () => {
  const { accessLevel } = useSelector((state) => state.auth);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdDashboard className="h-7 w-7" />}
          title={accessLevel == ACCESSLEVEL[3] ? "Cases Assigned" : accessLevel == ACCESSLEVEL[2] ? "Month Case Count" : "Stations"}
          subtitle={"85"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={accessLevel == ACCESSLEVEL[3] ? "Todays Cases" : accessLevel == ACCESSLEVEL[2] ? "Officers" : "Officers"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={accessLevel == ACCESSLEVEL[3] ? "Cases Completed" : accessLevel == ACCESSLEVEL[2] ? "Todays Cases" : "Cases"}
          subtitle={"$574.34"}
        />
      </div>

      {/* Tables & Charts */}

      {/* Traffic chart & Pie Chart */}
      {accessLevel != ACCESSLEVEL[3] &&
        <div className="mt-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>}

      {
        // accessLevel == ACCESSLEVEL[3] &&
        //   <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        //     {/* Check Table */}
        //     <div>
        //       <CheckTable
        //         columnsData={columnsDataCheck}
        //         tableData={tableDataCheck}
        //       />
        //     </div>
        //   </div>
      }
    </div>
  );
};

export default Dashboard;
