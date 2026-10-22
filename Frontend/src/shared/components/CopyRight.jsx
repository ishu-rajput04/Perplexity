import React from "react";

const CopyRight = () => {
  return (
    <p className="mt-6 text-center text-xs text-slate-600">
      © {new Date().getFullYear()} NovaFlow. All rights reserved.
    </p>
  );
};

export default CopyRight;
