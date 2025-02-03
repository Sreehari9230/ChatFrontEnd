<Routes>
      {/* Public Routes */}
      <Route path="/signup" element={!userAuth ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/login" element={!userAuth ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Protected Routes (Only for Logged-in Users) */}
      <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
    </Routes>