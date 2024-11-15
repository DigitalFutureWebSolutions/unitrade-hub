import React, { useState, useEffect } from "react";
import { BsArrowLeft } from 'react-icons/bs';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import {  fetchHistory  } from "../../store/actions/homeActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';

const TransactionHistory = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 // Retrieve history data and loading state from Redux store
 const historyData = useSelector((state) => state.apiData.data);
 const transactions = historyData && historyData.history && historyData.history.data 
console.log(transactions);

useEffect(() => {
  const fetchData = async () => {
    try {
      await dispatch(fetchHistory());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };
  fetchData();
}, [dispatch]);

if (loading) {
  return <Loader />;
}

  return (
    <div className="bg-white min-h-screen flex justify-center font-poppins">
      <div className=" bg-black text-white w-full max-w-lg flex flex-col px-4">
        
        {/* Header with Back Button */}
        <div className="flex items-center justify-between py-4">
          <button onClick={() => navigate(-1)} className="text-2xl text-white">
            <BsArrowLeft />
          </button>
          <h2 className="text-xl font-semibold text-center flex-grow">Transaction History</h2>
        </div>
        
        {/* Scrollable Transaction List */}
        <div className="flex-grow overflow-y-auto py-4">
          {/* Sample Data by Date */}
          {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
            <div key={index} className="mb-6">
              {/* Date Label */}
              <p className="text-sm font-semibold text-gray-400 mb-3">
                    {transaction.date_entered ? new Date(transaction.date_entered).toLocaleDateString() : "No Date"}
                  </p>
              {/* Transaction Items as Simple Rows */}
                <div  className="flex items-center justify-between py-3 ">
                  <div className="flex items-center space-x-3">
                    <img
                      className="w-8 h-8"
                      src="/src/Img/rupees.png"
                      alt="Transaction icon"
                    />
                     <h3 className="text-sm font-semibold capitalize">      {transaction.type }</h3>
                  
                        </div>
                        <p className={`text-sm font-medium ${transaction.pending_coin > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.pending_coin > 0 ? `+ ${transaction.pending_coin} Coins` : `${transaction.earn_coin} Coins`}
                    </p>
                </div>
            </div>
           ))
          ) : (
            <p className="text-center text-gray-400">No transactions found.</p>
          )}
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default TransactionHistory;
