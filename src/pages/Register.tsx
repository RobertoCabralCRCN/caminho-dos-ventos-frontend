import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";

function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
    rua: "",
    numero: "",
    cidade: "",
    cep: "",
    telefone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (formData.senha !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    // Validar senha conforme regras do backend
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (formData.senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }
    if (!passwordRegex.test(formData.senha)) {
      setError("A senha deve conter pelo menos: 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial (@$!%*?&).");
      setLoading(false);
      return;
    }

    try {
      await authService.register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        rua: formData.rua,
        numero: formData.numero,
        cidade: formData.cidade,
        cep: formData.cep,
        telefone: formData.telefone,
      });
      // Redirect to home after successful register (as requested)
      navigate("/");
    } catch (err: any) {
      console.log("Register error:", err);
      if (err.message?.includes('Network Error') || err.message?.includes('ERR_NETWORK')) {
        setError("Servidor offline. Tente novamente mais tarde.");
      } else if (err.response?.status === 400 || err.response?.status === 409) {
        const errorData = err.response.data;
        if (errorData?.message?.includes('email') || errorData?.message?.includes('Email')) {
          setError("Este email já está cadastrado. Tente fazer login ou use outro email.");
        } else if (errorData?.message?.includes('senha') || errorData?.message?.includes('password')) {
          setError("Senha inválida. Use pelo menos 6 caracteres.");
        } else if (errorData?.message?.includes('nome') || errorData?.message?.includes('name')) {
          setError("Nome é obrigatório.");
        } else {
          setError("Dados inválidos. Verifique os campos e tente novamente.");
        }
      } else if (err.response?.status === 500) {
        setError("Servidor com problemas. Tente novamente mais tarde.");
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-16">
        <div className="max-w-md mx-auto">
          <div className="umbanda-card p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📿</div>
              <h1 className="umbanda-title text-3xl">
                Cadastrar
              </h1>
              <p className="text-gray-600 mt-2">
                Crie sua conta espiritual
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">

                {/* Nome Completo */}
            <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Nome Completo
              </label>
              <input
                type="text"
                    id="nome"
                    name="nome"
                required
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite seu nome completo"
              />
            </div>

                {/* Email */}
            <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    📧 Email
              </label>
              <input
                    type="email"
                    id="email"
                name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite seu email"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    📱 Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                required
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite seu telefone"
              />
            </div>

                {/* Rua/Avenida */}
            <div>
                  <label htmlFor="rua" className="block text-sm font-medium text-gray-700 mb-2">
                    🏠 Rua/Avenida
              </label>
              <input
                    type="text"
                    id="rua"
                    name="rua"
                required
                    value={formData.rua}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite sua rua"
              />
            </div>

                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-2">
                    🔢 Número
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    required
                    value={formData.numero}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite o número"
                  />
                </div>

                {/* Cidade */}
                <div>
                  <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                    🏙️ Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    required
                    value={formData.cidade}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite sua cidade"
                  />
          </div>

                {/* CEP */}
                <div>
                  <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">
                    📍 CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    required
                    value={formData.cep}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite seu CEP"
                  />
                </div>

                {/* Senha */}
                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                    🔒 Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    required
                    value={formData.senha}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite sua senha"
                  />
                  <div className="mt-2 text-xs text-gray-600">
                    <p>A senha deve conter:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li className={formData.senha.length >= 6 ? "text-green-600" : "text-gray-500"}>
                        ✓ Pelo menos 6 caracteres
                      </li>
                      <li className={/[a-z]/.test(formData.senha) ? "text-green-600" : "text-gray-500"}>
                        ✓ 1 letra minúscula
                      </li>
                      <li className={/[A-Z]/.test(formData.senha) ? "text-green-600" : "text-gray-500"}>
                        ✓ 1 letra maiúscula
                      </li>
                      <li className={/\d/.test(formData.senha) ? "text-green-600" : "text-gray-500"}>
                        ✓ 1 número
                      </li>
                      <li className={/[@$!%*?&]/.test(formData.senha) ? "text-green-600" : "text-gray-500"}>
                        ✓ 1 caractere especial (@$!%*?&)
                      </li>
                    </ul>
            </div>
          </div>

                {/* Confirmar Senha */}
          <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    🔒 Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Confirme sua senha"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

            <button
              type="submit"
                disabled={loading}
                className="w-full umbanda-button mt-6 disabled:opacity-50"
            >
                {loading ? "Criando conta..." : "Criar Conta ✨"}
            </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-umbanda-purple hover:underline">
                  Faça login aqui
                </Link>
              </p>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default RegisterPage;