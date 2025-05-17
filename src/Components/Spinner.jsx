import React from 'react'
import { ClipLoader } from "react-spinners";
export const Spinner = ({size}) => {
  return (
    <div className="flex items-center justify-center">
    <ClipLoader color="#4A90E2" size={size || 50} />
  </div>
  )
}
