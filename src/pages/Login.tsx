import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await login(email, password);
      navigate("/"); // Redirecionar para a página inicial após o login
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Verificar se é erro de credenciais inválidas (usuário não cadastrado)
      if (err?.response?.status === 401 || err?.message?.includes('Credenciais inválidas')) {
        setError("Usuário não cadastrado. Clique em 'Cadastrar-se' para criar uma conta.");
      } else if (err?.response?.status === 400) {
        setError("Dados inválidos. Verifique seu email e senha.");
      } else if (err?.response?.status === 500) {
        setError("Servidor com problemas. Use as credenciais de demonstração ou tente novamente mais tarde.");
      } else if (err?.message?.includes('Network Error') || err?.message?.includes('ERR_NETWORK')) {
        setError("Servidor offline. Use as credenciais de demonstração ou tente novamente mais tarde.");
      } else {
        setError("Erro no servidor. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-16">
        <div className="max-w-md mx-auto">
          <div className="umbanda-card p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌟</div>
              <h1 className="umbanda-title text-3xl">
                Entrar
              </h1>
              <p className="text-gray-600 mt-2">
                Acesse sua conta espiritual
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite seu email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    🔒 Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                  {error.includes("não cadastrado") && (
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-ogum-blue hover:text-ogum-blue-light text-sm font-medium underline"
                      >
                        📝 Cadastrar-se agora
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8">
              <button
                type="submit"
                className="umbanda-button w-full"
                disabled={loading}
              >
                {loading ? "🌟 Entrando..." : "🌟 Entrar"}
              </button>

              {/* Demo mode button when backend is offline */}
              <button
                type="button"
                onClick={() => {
                  // Fallback: simulate login while backend is offline
                  localStorage.setItem("accessToken", "demo-token");
                  navigate("/");
                }}
                className="mt-3 w-full bg-white/30 text-white font-medium py-2 px-4 rounded-full hover:bg-white/40 transition-colors"
              >
                Entrar em modo demonstração
              </button>
              
              {/* Demo credentials info */}
              <div className="mt-4 p-3 bg-iansa-yellow/20 border border-iansa-yellow/30 rounded-lg">
                <p className="text-ogum-blue text-sm text-center">
                  <strong>Credenciais de Demonstração:</strong><br/>
                  Super Admin: admin@caminho.com / admin123<br/>
                  Admin: gerente@caminho.com / gerente123<br/>
                  Cliente: cliente@caminho.com / cliente123
                </p>
              </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Ainda não tem uma conta?{" "}
                <Link to="/register" className="text-umbanda-purple hover:text-umbanda-blue font-medium">
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;