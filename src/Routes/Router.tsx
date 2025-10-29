import { Routes, Route } from 'react-router'
import * as R from '@/allFiles'

export default function Router(){
  
  return(
    <>
      <Routes>
        <Route path="/" element={<R.Home />} />
        <Route path="/signin" element={<R.SignIn />} />
        <Route path="/signup" element={<R.SignUp />} />
        <Route path="/analyze" element={<R.Analyze />} />
        <Route path="/checklist" element={<R.ChecklistPage />} />
        <Route path="/profile" element={<R.Profile />} />
        <Route path="/map" element={<R.MapPage />} />
        <Route path="*" element={<R.NotFound />} />
      </Routes>
    </>
  )
}