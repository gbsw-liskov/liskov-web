import { Routes, Route } from 'react-router'
import * as R from '@/allFiles'

export default function Router(){
  
  return(
    <>
      <Routes>
        <Route path="/" element={<R.Home />} />
        <Route path="/signin" element={<R.SignIn />} />
        <Route path="/signup" element={<R.SignUp />} />
        <Route path="/profile" element={<R.Profile />} />
        <Route path="/profile/setting" element={<R.Setting/>} />
        <Route path="/analyze" element={<R.Analyze />} />
        <Route path="/analyze/result" element={<R.AnalyzeResult />} />
        <Route path="/map" element={<R.MapPage />} />
        <Route path="/checklist/confirm" element={<R.CheckList /> } />
        <Route path="/checklist" element={<R.CheckListMain />} />
        <Route path="/checklist/add" element={<R.CheckListCreate/>} />
        <Route path="/ai/createlist" element={<R.AIGeneratedList />} />
        <Route path="/loan" element={<R.LoanGuide />} />
        <Route path="/loan/result" element={<R.LoanResult />} />
        <Route path="/checklist/ai/report" element={<R.AnalyzeResult />} />
        <Route path="*" element={<R.NotFound />} />
      </Routes>
    </>
  )
}