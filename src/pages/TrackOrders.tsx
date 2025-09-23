import React, { useState, useEffect } from "react";
import { orderService } from "../services/api";

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[]; // Pode precisar ser ajustado para corresponder à resposta real da API
  total: number;
  status: "aguardando produção" | "pronto" | "entregue";
  deliveryAddress: string;
  responsible?: string;
}

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "aguardando produção":
      return "bg-yellow-100 text-yellow-800";
    case "pronto":
      return "bg-blue-100 text-blue-800";
    case "entregue":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

function TrackOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders();
        // Assumindo que a API retorna um array de pedidos diretamente
        setOrders(response.data);
      } catch (err) {
        setError("Erro ao carregar pedidos.");
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8 text-xl">
        Carregando pedidos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8 text-xl text-red-500">
        Erro: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Acompanhamento de Pedidos
        </h2>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhum pedido encontrado.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-md p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Pedido #{order.id}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  Cliente: {order.customerName}
                </p>
                <p className="text-gray-600 mb-2">
                  Endereço de Entrega: {order.deliveryAddress}
                </p>
                {order.responsible && (
                  <p className="text-gray-600 mb-2">
                    Responsável: {order.responsible}
                  </p>
                )}
                <div className="mt-4">
                  <p className="font-medium text-gray-700">Itens:</p>
                  <ul className="list-disc list-inside ml-4">
                    {order.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600">
                        {item.name} x {item.quantity} (R${item.price.toFixed(2)}{" "}
                        cada)
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    R${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackOrdersPage;
