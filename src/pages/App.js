
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {

    try {
      const { data } = await api.get(`repos/${currentRepo}`);

      if(data.id){

        const isExist = repos.find(repo => repo.id === data.id);
  
        if(!isExist){
          setRepos(prev => [...prev, data]);
          setCurrentRepo('')
          return
        }
        alert('Repositório já adicionado')
        setCurrentRepo('')
        return
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) { 
          alert('Repositório não encontrado.');
          setCurrentRepo('');
        } else {
            alert(`Erro: ${error.response.status} - ${error.response.data?.message || 'Erro desconhecido'}`);
        }
      } else if (error.request) {
          alert('Erro ao conectar ao servidor.');
      } else {
          alert('Ocorreu um erro desconhecido.');
      }
    }
  }

  const handleRemoveRepo = (id) => {
    const new_repos = repos.filter(repo => repo.id !== id);
    setRepos(new_repos); 
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
