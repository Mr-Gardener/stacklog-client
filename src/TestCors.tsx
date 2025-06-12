import { useEffect } from "react";
import axios from "axios";

const TestCors = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/test", { withCredentials: true })
      .then((res) => {
        console.log("✅ Success:", res.data);
      })
      .catch((err) => {
        console.error("❌ Failed:", err);
      });
  }, []);

  return <div>Testing CORS...</div>;
};

export default TestCors;
