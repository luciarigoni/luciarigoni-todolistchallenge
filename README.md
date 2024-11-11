# To-Do List App

Este projeto é um aplicativo de lista de tarefas desenvolvido com Expo e React Native. Ele possui funcionalidades como armazenamento assíncrono de tarefas, temas claro e escuro, animações com Lottie, navegação entre telas, e integração com uma API externa para sugestão de itens. 
Confira o design do aplicativo no Figma: [Figma - Todo List](https://www.figma.com/design/xs0rEdaNn93gzsseOq2vXq/Todo-List?node-id=1-2&node-type=frame&t=A9zOcXevT7f7lUkL-0)



https://github.com/user-attachments/assets/791730b7-be31-4885-a043-4ea52cc6856a



## Tecnologias Utilizadas

- **Expo**: Framework utilizado para facilitar o desenvolvimento de aplicações React Native.
- **React Native**: Biblioteca JavaScript utilizada para construir a interface do aplicativo.
- **Async Storage**: Utilizado para armazenamento local de tarefas.
- **Lottie**: Biblioteca para animações, proporcionando uma experiência visual rica ao usuário.
- **React Navigation**: Utilizado para navegação entre telas do aplicativo.
- **Dark Mode**: Tema escuro configurável para melhor experiência do usuário.
- **API**: Integração com várias APIs para fornecer dados e funcionalidades adicionais:

Dummy JSON API

- Uso para Autenticação: A API Dummy JSON foi usada para implementar uma autenticação básica (fake login). Um usuário pode fazer login utilizando o nome de usuário e senha fornecidos pela API.
- Uso para Sugestões de Produtos: A API Dummy JSON também fornece dados de produtos para sugerir itens que podem ser adicionados à lista de tarefas.

Cats API

- Imagens de Gatos: Integração com a Cats API para obter imagens aleatórias de gatos, trazendo um toque de diversão e surpresa ao aplicativo.

Advice Slip API

- Conselhos Aleatórios: Integração com a Advice Slip API para exibir conselhos aleatórios, adicionando uma experiência inspiradora ao usuário.


## Funcionalidades

- Adicionar, editar e remover tarefas.
- Alternar entre modo claro e modo escuro.
- Armazenamento persistente de tarefas usando Async Storage.
- Sugestão de itens para adicionar à lista, utilizando dados da API.
- Navegação fluida entre telas usando React Navigation.
- Animações atraentes com Lottie para tornar o aplicativo mais interativo.

## Como Executar o Projeto

1. **Clone o repositório**:
   ```sh
   git clone <url-do-repositório>
   cd todo-list
   ```

2. **Instale as dependências**:
   ```sh
   npm install
   ```

3. **Inicie o projeto com Expo**:
   ```sh
   npx expo start
   ```

4. **Executar no emulador ou dispositivo**:
   - Para Android: Pressione `a` no terminal para abrir no emulador Android.
   - Para iOS: Pressione `i` no terminal para abrir no emulador iOS.
   - No celular, escaneie o QR code com o aplicativo **Expo Go**.

## Estrutura do Projeto

- **/screens**: Contém as telas principais do aplicativo, como `HomeScreen` e `AddTaskScreen`.
- **/components**: Contém componentes reutilizáveis, como `TaskItem`.
- **/assets**: Inclui as animações Lottie e outros recursos de mídia.
- **/navigation**: Configurações de navegação do aplicativo usando React Navigation.

## Dependências Principais

- **react-navigation/native**: Para navegação entre telas.
- **@react-native-async-storage/async-storage**: Para armazenamento persistente.
- **lottie-react-native**: Para animações.
- **react-native-vector-icons**: Para ícones do aplicativo.

## Comandos Úteis

- **Iniciar o Expo**: `npx expo start`
- **Rodar testes (caso configurado)**: `npm test`
- **Build para produção**: `expo build`

## Contribuição

1. Fork o projeto.
2. Crie uma branch com suas alterações: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Adicionando nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

