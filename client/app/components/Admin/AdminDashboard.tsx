import React, { useState } from 'react'
import DashBoadrdHeader from './DashBoadrdHeader'
import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets";

type Props = {
  isDashboard?: boolean
}

const AdminDashboard = ({isDashboard}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DashBoadrdHeader open={open} setOpen={setOpen}/>
      {
        isDashboard && (
          <DashboardWidgets open={open}/>
        )
      }
    </div>
  )
}

export default AdminDashboard