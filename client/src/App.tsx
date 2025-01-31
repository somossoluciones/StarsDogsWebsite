import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Puppies from "@/pages/Puppies";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/puppies" component={Puppies} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />

      {/* Admin routes */}
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/dashboard" component={Dashboard} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;