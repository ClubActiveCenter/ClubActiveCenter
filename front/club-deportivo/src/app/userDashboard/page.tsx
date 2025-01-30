// src/pages/page.tsx
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import React from "react";

const Page: React.FC = () => {
  // Asegúrate de pasar el ID del usuario correctamente.
  const userId = "user-id-here"; // Esto debe ser el ID del usuario.

  return (
    <>
      <UserDashboard userId={userId} />
    </>
  );
};

export default Page;
