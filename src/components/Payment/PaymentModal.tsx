import React, { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentSuccess: (paymentData: PaymentData) => void;
}

interface PaymentData {
  method: string;
  details: any;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      icon: '💳',
      description: 'Pagamento instantâneo',
      fee: 0,
    },
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      icon: '💳',
      description: 'Visa, Mastercard, Elo',
      fee: 2.99,
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      icon: '💳',
      description: 'Débito online',
      fee: 1.99,
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      icon: '📄',
      description: 'Vencimento em 3 dias',
      fee: 0,
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setLoading(true);
    
    // Simular processamento de pagamento
    setTimeout(() => {
      const paymentData: PaymentData = {
        method: selectedMethod,
        details: paymentDetails,
      };
      
      onPaymentSuccess(paymentData);
      setLoading(false);
      onClose();
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'pix':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">PIX - Pagamento Instantâneo</h4>
              <p className="text-sm text-green-700">
                Após confirmar o pedido, você receberá o código PIX para pagamento.
                O pedido será processado imediatamente após a confirmação.
              </p>
            </div>
          </div>
        );

      case 'credit':
      case 'debit':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número do Cartão
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Validade
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome no Cartão
              </label>
              <input
                type="text"
                placeholder="Nome como está no cartão"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
              />
            </div>
          </div>
        );

      case 'boleto':
        return (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Boleto Bancário</h4>
            <p className="text-sm text-blue-700">
              Após confirmar o pedido, você receberá o boleto para pagamento.
              O pedido será processado após a confirmação do pagamento (até 3 dias úteis).
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="umbanda-card p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="umbanda-subtitle">💳 Forma de Pagamento</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Resumo do Pedido</h3>
          <div className="flex justify-between items-center">
            <span>Total:</span>
            <span className="text-2xl font-bold text-ogum-blue">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Métodos de Pagamento */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                selectedMethod === method.id
                  ? 'border-ogum-blue bg-ogum-blue-light'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{method.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  {method.fee > 0 ? (
                    <span className="text-sm text-gray-600">
                      +R$ {method.fee.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-sm text-green-600 font-semibold">
                      Grátis
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Formulário de Pagamento */}
        {selectedMethod && renderPaymentForm()}

        {/* Botões de Ação */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handlePayment}
            disabled={!selectedMethod || loading}
            className="flex-1 umbanda-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Processando...' : '💳 Confirmar Pagamento'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
