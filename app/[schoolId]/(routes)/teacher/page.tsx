import { redirect } from "next/navigation";
import React from "react";

const TeacherOverView = ({ params }: { params: { schoolId: string } }) => {
  redirect("/" + params.schoolId + "/teacher/books");
  return <div>TeacherOverView</div>;
};

export default TeacherOverView;
