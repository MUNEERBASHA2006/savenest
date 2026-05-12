/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Targets from './pages/Targets';
import Log from './pages/Log';
import Milestones from './pages/Milestones';
import Profile from './pages/Profile';
import { ProfileProvider, useProfile } from './contexts/ProfileContext';
import { TargetsProvider } from './contexts/TargetsContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
import Onboarding from './components/Onboarding';

import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const auth = useAuth();
  const { profile } = useProfile();

  if (!auth?.user) {
    return <Login />;
  }

  if (!profile.isOnboarded) {
    return <Onboarding />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="targets" element={<Targets />} />
          <Route path="log" element={<Log />} />
          <Route path="milestones" element={<Milestones />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <TargetsProvider>
        <TransactionsProvider>
          <AppContent />
        </TransactionsProvider>
      </TargetsProvider>
    </ProfileProvider>
  );
}