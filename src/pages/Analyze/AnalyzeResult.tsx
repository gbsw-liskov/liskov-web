import { useLocation } from "react-router-dom";

export default function AnalyzeResult() {
  const location = useLocation();
  const { file, fileName, house } = location.state || {};
  console.log(file, fileName, house);

  return (
    <div className="">
      
    </div>
  )
}
