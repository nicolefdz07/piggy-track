import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Layout from "./components/Layout";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { TransactionsProvider } from "./context/TransactionsContext.tsx";
import Budget from "./pages/Budget.tsx";
import Transactions from "./pages/Transactions.tsx";
import TransactionDetails from "./pages/TransactionDetails.tsx";
import AddTrans from "./pages/AddTrans.tsx";
import CreateBudget from "./pages/CreateBudget.tsx";
import EditBudget from "./pages/EditBudget.tsx";
import { BudgetsProvider } from "./context/BudgetsContext.tsx";
import RootRedirect from "./routes/RootRedirect.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Reports from "./pages/Reports.tsx";
import LandingPage from "./pages/LadingPage.tsx";

function App() {
  return (
    <AuthContextProvider>
      <TransactionsProvider>
        <BudgetsProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="budget" element={<Budget />} />
                <Route path="budget/create" element={<CreateBudget />} />
                <Route path="budget/edit/:id" element={<EditBudget />} />
                <Route path="transactions" element={<Transactions />} />
                <Route
                  path="transactions/details/:id"
                  element={<TransactionDetails />}
                />
                <Route path="transactions/add" element={<AddTrans />} />
                <Route path="reports" element={<Reports />} />
              </Route>

              <Route path="/" element={<RootRedirect />} />
              <Route path="signin" element={<Login />} />
              <Route path="landing" element={<LandingPage />} />
              <Route path="signup" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </BudgetsProvider>
      </TransactionsProvider>
    </AuthContextProvider>
  );
}

export default App;
