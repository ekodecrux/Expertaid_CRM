import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import AgreementPage from "@/pages/AgreementPage";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Clients from "./pages/Clients";
import ClientPaymentPlan from "./pages/ClientPaymentPlan";
import ClientCreatePaymentPlan from "./pages/ClientCreatePaymentPlan";
import Quotations from "./pages/Quotations";
import { InvoicePage, ReceiptPage } from "./pages/Billing";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/settings" component={Settings} />
    <Route path="/clients" component={Clients} />
    <Route path="/clients/new" component={ClientCreatePaymentPlan} />
    <Route path="/clients/edit/:id" component={ClientPaymentPlan} />
    <Route path="/quotations" component={Quotations} />
    <Route path="/invoices" component={InvoicePage} />
    <Route path="/receipts" component={ReceiptPage} />
    <Route path="/agreement/:token" component={AgreementPage} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
