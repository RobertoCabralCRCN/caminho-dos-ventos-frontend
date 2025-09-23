import React, { useState } from 'react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ReviewSystemProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
  userCanReview: boolean;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({
  productId,
  reviews,
  onAddReview,
  userCanReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 
      : 0
  }));

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) return;

    onAddReview({
      userId: 'current-user', // Em produção, viria do contexto de auth
      userName: 'Usuário Atual',
      productId,
      rating: newReview.rating,
      comment: newReview.comment,
    });

    setNewReview({ rating: 0, comment: '' });
    setShowReviewForm(false);
  };

  const StarRating: React.FC<{ rating: number; interactive?: boolean; onRatingChange?: (rating: number) => void }> = ({
    rating,
    interactive = false,
    onRatingChange
  }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="umbanda-card p-6">
      <h3 className="umbanda-subtitle mb-6">⭐ Avaliações dos Clientes</h3>

      {/* Resumo das Avaliações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Rating Médio */}
        <div className="text-center">
          <div className="text-4xl font-bold text-ogum-blue mb-2">
            {averageRating.toFixed(1)}
          </div>
          <StarRating rating={Math.round(averageRating)} />
          <p className="text-gray-600 mt-2">
            Baseado em {reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''}
          </p>
        </div>

        {/* Distribuição de Ratings */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Distribuição</h4>
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center">
                <span className="text-sm w-8">{star}⭐</span>
                <div className="flex-1 mx-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botão para Adicionar Avaliação */}
      {userCanReview && (
        <div className="mb-6">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="umbanda-button"
          >
            ✍️ Escrever Avaliação
          </button>
        </div>
      )}

      {/* Formulário de Nova Avaliação */}
      {showReviewForm && (
        <div className="umbanda-card p-6 mb-6 bg-iansa-yellow/10">
          <h4 className="font-semibold text-gray-900 mb-4">Sua Avaliação</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avaliação
              </label>
              <StarRating
                rating={newReview.rating}
                interactive={true}
                onRatingChange={(rating) => setNewReview({...newReview, rating})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Compartilhe sua experiência com este produto..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSubmitReview}
                disabled={newReview.rating === 0 || !newReview.comment.trim()}
                className="umbanda-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📝 Enviar Avaliação
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Avaliações */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Ainda não há avaliações para este produto. Seja o primeiro a avaliar! ⭐
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-ogum-blue text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{review.userName}</h5>
                    <div className="flex items-center">
                      <StarRating rating={review.rating} />
                      {review.verified && (
                        <span className="ml-2 text-green-600 text-sm">✓ Verificado</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <p className="text-gray-700 ml-13">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
