import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Salvar, Ler, inicializarDb } from "../../../service/repository"; 

const ProdutoItem = ({ item }) => {
  const isNearExpiration = item.dataDeValidade.startsWith("10");
  
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemNome}>{item.nome}</Text>
        <Text style={styles.itemValidade}>
          Validade: <Text style={isNearExpiration ? styles.validadeUrgente : styles.validadeNormal}>{item.dataDeValidade}</Text>
        </Text>
      </View>
      <View style={styles.itemQuantidadeBadge}>
        <Text style={styles.itemQuantidadeText}>{item.quantidade}</Text>
      </View>
    </View>
  );
};

export default function GeladeiraApp() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [data, setData] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [dbReady, setDbReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarProdutos = async () => {
    if (!dbReady) return;
    try {
      setError(null);
      setLoading(true);
      const lista = await Ler(); 
      setProdutos(lista);
      console.log("Produtos carregados com sucesso.");
    } catch (err) {
      setError("Erro ao carregar produtos. Verifique o console.");
      console.error("Erro ao carregar produtos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function setupDatabase() {
      try {
        await inicializarDb();
        setDbReady(true);
      } catch (error) {
        setError("Erro fatal ao inicializar o banco de dados.");
        console.error("Erro ao inicializar o banco de dados:", error);
      } finally {
        setLoading(false);
      }
    }
    setupDatabase();
  }, []);

  useEffect(() => {
    if (dbReady) {
      carregarProdutos();
    }
  }, [dbReady]);

  const salvarProduto = async () => {
    if (!dbReady || loading) return;
    if (!nome || !quantidade || !data) {
        Alert.alert("Erro", "Preencha todos os campos.");
        return;
    }

    const quantidadeNum = parseInt(quantidade);
    const dataObj = new Date(data);
    
    try {
      await Salvar(nome, quantidadeNum, dataObj); 
      setNome("");
      setQuantidade("");
      setData("");
      await carregarProdutos(); 
    } catch (err) {
      Alert.alert("Erro ao Salvar", err.message || "Erro desconhecido ao salvar o produto.");
      console.error("Erro ao salvar produto:", err);
    }
  };

  if (!dbReady && loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Iniciando Banco de Dados...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geladeira Inteligente</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subTitle}>Adicionar Novo Produto</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          placeholder="Nome do produto (ex: Iogurte)"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          placeholder="Data de validade (AAAA-MM-DD)"
          value={data}
          onChangeText={setData}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={salvarProduto}>
            <Text style={styles.buttonText}>Salvar Produto</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listaTitulo}>Produtos na Geladeira ({produtos.length})</Text>
      
      {loading ? (
        <ActivityIndicator size="small" color="#4F46E5" style={{ marginTop: 20 }} />
      ) : produtos.length === 0 ? (
        <Text style={styles.emptyListText}>Nenhum produto encontrado. Adicione um acima!</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item, index) => `${item.nome}-${item.dataDeValidade}-${index}`} 
          renderItem={({ item }) => <ProdutoItem item={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    backgroundColor: '#F7F8FA',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4F46E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    marginBottom: 10, 
    padding: 12, 
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    fontSize: 16,
  },
  button: {
      backgroundColor: '#4F46E5',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 5,
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
  },
  listaTitulo: { 
    marginTop: 10, 
    marginBottom: 10,
    fontWeight: "bold", 
    fontSize: 18,
    color: '#334155',
  },
  listContent: {
      paddingBottom: 50,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#94A3B8',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#4F46E5',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  itemValidade: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  validadeNormal: {
    fontWeight: 'bold',
    color: '#475569',
  },
  validadeUrgente: {
    fontWeight: 'bold',
    color: '#EF4444',
  },
  itemQuantidadeBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  itemQuantidadeText: {
    fontWeight: 'bold',
    color: '#4F46E5',
  },
});
