import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "./../../redux/Orders/orders.actions";
import OrderHistory from "./../../components/OrderHistory";
import "./styles.scss";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  console.log("HISTORY!:", orderHistory);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.email));
  }, [currentUser, dispatch]);

  return (
    <div>
      <h1 className="orderHistoryTitel">Orderhistorik</h1>
      <OrderHistory orders={orderHistory} />
    </div>
  );
};

export default Dashboard;