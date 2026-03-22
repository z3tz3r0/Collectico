import React, { useState, useEffect } from "react";
import ButtonSubmit from "./ButtonSubmit";
// import mockOrderDetails from "../../data/mockOrderDetails";
import StatusTag from "./StatusTag";

const Icons = {
  Close: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Check: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Package: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Truck: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  ),
  CreditCard: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  ),
  Calendar: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
};

// *************** THIS COMPONENT EXPORT FUNCTION APP BELOW ***************//

const OrderDetailsPopup = ({
  orderId,
  onClose,
  total,
  status,
  items,
}) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ในสถานการณ์จริง คุณจะเรียก API ด้วย orderId
    // แต่ในตัวอย่างนี้ เราใช้ข้อมูลจำลอง
    const fetchOrderDetails = async () => {
      setLoading(true);

      // จำลองการเรียก API
      setTimeout(() => {
        // ข้อมูลตัวอย่าง
        const mockOrderDetails = {
          orderId: 5678,
          orderDate: "March 5, 2025",
          status: "Delivered",
          paymentStatus: "PAID",
          total: "$1,250.00",
          customer: {
            name: "Jonathan Richards",
            email: "jonathan.richards@example.com",
            phone: "+1 (555) 123-4567",
          },
          shippingAddress: {
            name: "Jonathan Richards",
            address: "1234 Luxury Lane",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "United States",
          },

          items: [
            {
              id: "P001",
              title: "Modern Portrait in Brown",
              artist: "Sophia Laurent",
              price: "$950.00",
              quantity: 1,
              image: "/api/placeholder/120/120",
            },
            {
              id: "P002",
              title: "Sunset Over Still Waters",
              artist: "Marcus Finley",
              price: "$300.00",
              quantity: 1,
              image: "/api/placeholder/120/120",
            },
          ],
          summary: {
            subtotal: "$1,250.00",
            shipping: "$0.00",
            tax: "$0.00",
            total: "$1,250.00",
          },
        };

        setOrderDetails(mockOrderDetails);
        setLoading(false);
      }, 100); // จำลองการดึงข้อมูล 100ms
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg- bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return null;
  }

  // Helper function สำหรับแสดง status badge
  // const getStatusBadge = (status) => {
  //   switch (status) {
  //     case "Delivered":
  //       return (
  //         <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
  //           <span className="mr-1">
  //             <Icons.Check />
  //           </span>
  //           {status}
  //         </span>
  //       );
  //     case "In Transit":
  //       return (
  //         <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
  //           <span className="mr-1">
  //             <Icons.Truck />
  //           </span>
  //           {status}
  //         </span>
  //       );
  //     case "Processing":
  //       return (
  //         <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
  //           <span className="mr-1">
  //             <Icons.Package />
  //           </span>
  //           {status}
  //         </span>
  //       );
  //     default:
  //       return (
  //         <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
  //           {status}
  //         </span>
  //       );
  //   }
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-[#62483a] flex items-center">
            Order Details
            <span className="ml-2 text-gray-500 font-normal">{orderId}</span>
          </h2>
          <div className="flex items-center space-x-3">
            {/* {getStatusBadge(orderDetails.status)} */}
            <StatusTag statusTag={status} />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close dialog"
            >
              <Icons.Close />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Purchased items section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#62483a] mb-4">
              Purchased Items
            </h3>

            {/* Items Block */}
            <div className="border rounded-lg overflow-hidden">
              {items.productId.map((item) => (
                <div
                  key={item.index}
                  className={"p-4 flex items-center"}
                >
                  <img
                    // src="https://i.pinimg.com/736x/4f/b8/95/4fb8951ee4abaaf4f159d9db98718bfa.jpg"
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">
                      Artist: {item.artist}
                    </p>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-gray-500">
                        Qty: 1
                      </div>
                      <p className="font-medium text-gray-900">
                        $
                        {item.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-medium text-[#62483a] mb-2">
              Order Summary
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>
                  ${(items.totalPrice[0]-items.totalPrice[1]-items.totalPrice[2]).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Shipping ({items.shipping})</span>
                <span>${items.totalPrice[1].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Tax</span>
                <span>${items.totalPrice[2].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}</span>
              </div>
              <div className="border-t my-2 pt-2"></div>
              <div className="flex justify-between text-[#62483a] font-medium">
                <span>Total</span>
                <span>${total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-2 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// -----EXPORT THIS APP -------
const App = ({ orderId, total, subtotal, status, items }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  return (
    <div className="p-4">
      <div className="mt-4 text-right flex justify-end pb-0">
        <ButtonSubmit
          label={"View Order Details"}
          variant="contained"
          height={34}
          width={170}
          // onClick={onViewDetailsClick}
          onClick={() => setShowOrderDetails(true)}
          sx={{
            backgroundColor: "var(--chocolate-color)",
            color: "var(--mainSectionRegister-color)",
            textTransform: "none",
            fontSize: "0.875rem",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "var(--hoverBgButton-color)",
              color: "var(--hoverTextButton-color)",
              border: "1px solid var(--chocolate-color)",
            },
          }}
        />
      </div>
      {showOrderDetails && (
        <OrderDetailsPopup
          orderId={orderId}
          total={total}
          subtotal={subtotal}
          status={status}
          onClose={() => setShowOrderDetails(false)}
          items={items}
        />
      )}
    </div>
  );
};

export default App;
