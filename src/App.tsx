import Notes from "./component/Notes";
import CreateContextPro from "./hooks/CreateContextPro";
import { ThemeProvider } from "./hooks/ThemeContext"; 

function App() {
  return (
    <ThemeProvider>
      <CreateContextPro>
        <Notes />
      </CreateContextPro>
    </ThemeProvider>
  );
}

export default App;
