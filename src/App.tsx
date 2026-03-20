import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { queryClient } from "@/lib/queryClient";
import { WorkflowProvider } from "@/contexts";
import CyberBackground from "@/components/ui/CyberBackground";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { Navbar } from "@/components/layout";

import {
  LandingPage,
  ServicesPage,
  AuthPage,
  DashboardPage,
  ScanPage,
  RiskAnalysisPage,
  AISolutionPage,
  ReportsPage,
  ContactPage,
  NotFoundPage,
} from "@/features";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkflowProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CyberBackground />
          <FloatingParticles count={30} variant="mixed" />
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/risk" element={<RiskAnalysisPage />} />
            <Route path="/ai-solution" element={<AISolutionPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </WorkflowProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
