import { Routes, Route } from 'react-router'
import * as R from '@/allFiles'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Router(){
  
  return(
    <>
      <Routes>
        <Route path="/" element={<R.Home />} />
        <Route path="/signin" element={<R.SignIn />} />
        <Route path="/signup" element={<R.SignUp />} />
        <Route path="/profile" element={<ProtectedRoute><R.Profile /></ProtectedRoute>} />
        <Route path="/profile/setting" element={<ProtectedRoute><R.Setting/></ProtectedRoute>} />
        <Route path="/favorite" element={<ProtectedRoute><R.Favorite /></ProtectedRoute>} />
        <Route path="/analyze" element={<ProtectedRoute><R.Analyze /></ProtectedRoute>} />
        <Route path="/analyze/result" element={<ProtectedRoute><R.AnalyzeResult /></ProtectedRoute>} />
        <Route path="/map" element={<R.MapPage />} />
        <Route path="/checklist/confirm" element={<ProtectedRoute><R.CheckList /></ProtectedRoute> } />
        <Route path="/checklist" element={<ProtectedRoute><R.CheckListMain /></ProtectedRoute>} />
        <Route path="/checklist/add" element={<ProtectedRoute><R.CheckListCreate/></ProtectedRoute>} />
        <Route path="/ai/createlist" element={<ProtectedRoute><R.AIGeneratedList /></ProtectedRoute>} />
        <Route path="/loan" element={<ProtectedRoute><R.LoanGuide /></ProtectedRoute>} />
        <Route path="/loan/result" element={<ProtectedRoute><R.LoanResult /></ProtectedRoute>} />
        <Route path="/checklist/ai/report" element={<ProtectedRoute><R.AnalyzeResult /></ProtectedRoute>} />
        <Route path="*" element={<R.NotFound />} />
      </Routes>
    </>
  )
}