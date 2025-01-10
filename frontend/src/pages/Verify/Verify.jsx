import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext as Store } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(Store);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const res = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (res.data.success) {
      navigate("/my-orders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      <div className="verify">
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Verify;
