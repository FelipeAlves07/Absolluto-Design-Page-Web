import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CustomFormPage from "./pages/CustomFormPage";
import Portfolio from "./pages/Portfolio";
import SobrePage from "./pages/SobrePage";
import ServicosPage from "./pages/ServicosPage";
import ProcessoPage from "./pages/ProcessoPage";
import BriefingPage from "./pages/BriefingPage";
import ContatoPage from "./pages/ContatoPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/sobre"} component={SobrePage} />
      <Route path={"/servicos"} component={ServicosPage} />
      <Route path={"/processo"} component={ProcessoPage} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/briefing"} component={BriefingPage} />
      <Route path={"/contato"} component={ContatoPage} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/form/:uniqueLink"} component={CustomFormPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
